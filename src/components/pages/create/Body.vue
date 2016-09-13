<template>
    <div class="body">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <blockquote>
                        <p>
                            Please fill out the form below to begin
                        </p>
                    </blockquote>
                </div>
            </div>
            <div class="spacer"/>
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <div class="card">
                        <h1>Name</h1>
                        <input v-model="name" placeholder="Example: Yoke's -- Spokane Valley, WA"/>
                        <div class="spacer"/>
                        <h1>Rate</h1>
                        <input v-model="rate" placeholder="Enter number, 1-5"/>
                        <div class="spacer"/>
                        <h1>Description</h1>
                        <input v-model="desc" placeholder="Talk about it"/>
                        <div class="spacer"/>
                        <h1>Location</h1>
                        <input v-model="location" debounce="500" placeholder="Talk about it"/>
                    </div>
                    <div class="spacer"/>
                    <div class="hidden-xs-down">
                        <div class="card blue-background pointer" v-on:click="requestRate">
                            <h1 class="white-text">Rate</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                    <div class="card padding-0">
                        <label class="fileContainer">
                            <h1>Upload Photo</h1>
                            <input type="text" placeholder="Click here"/>
                            <input v-on:change="requestUpload" type="file"/>
                        </label>
                    </div>
                    <template v-if="file">
                        <div class="spacer"/>
                        <div class="card padding-0">
                            <img class="full" v-bind:src="file" />
                        </div>
                    </template>
                    <div class="hidden-sm-up">
                        <div class="spacer"/>
                        <div class="card blue-background pointer" v-on:click="requestRate">
                            <h1 class="white-text">Rate</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .full {
        width:100%;
    }
</style>
<script>
    export default{
        data(){
            return{
                fileBase64:null,
                file:null,
                name:null,
                rate:null,
                desc:null,
                location:null,
                locationExact:null,
                long:null,
                lat:null
            }
        },
        components:{
        },
        methods:{
            'requestUpload':function() {
                let self = this;
                var file    = document.querySelector('input[type=file]').files[0];
                var reader  = new FileReader();
                reader.addEventListener("load", function () {
                    self.fileBase64 = reader.result;
                }, false);
                if (file) {reader.readAsDataURL(file);}
            },
            'upload':function(file) {
                let self = this;
                var clientId = "a069290170bbd8a";
                file = file.split('base64,')[1];
                var success = function(imgur) {
                    self.file = imgur.data.link
                };
                var error = function(err) {
                    console.log(err);
                };
                $.ajax({
                    url: "https://api.imgur.com/3/upload",
                    type: "POST",
                    datatype: "json",
                    data: {image: file},
                    success: success,
                    error:error,
                    beforeSend: function (xhr) {xhr.setRequestHeader("Authorization", "Client-ID " + clientId);}
                });
            },
            'requestRate':function(){
                let self = this;
                if(this.file && this.name && this.rate && this.desc && this.$store.getters.getUser && this.long && this.lat && this.location){
                    this.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Setting rate...'});
                    this.$store.dispatch('FETCH_CREATE', {
                        file:this.file,
                        name:this.name,
                        rate:this.rate,
                        lat:this.lat,
                        long:this.long,
                        location:this.location,
                        desc:this.desc,
                        users_id:this.$store.getters.getUser.data.users_id
                    }).then(function(){
                        self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Rate has been set'});
                    }).catch(function(err){
                        console.log(err);
                        self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'An error has been encountered setting your rate'});
                    })
                }
            },
            'geocoder':function(location){
                let self = this;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': location}, function(results, status) {
                    if (status === 'OK') {
                        self.lat = results[0].geometry.location.lat();
                        self.long = results[0].geometry.location.lng();
                        self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Location is valid'});
                    } else {
                        self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Location has invalid late/long'});
                    }
                });
            }
        },
        watch:{
            'fileBase64':function(val, old){
                this.upload(val);
            },
            location:function(val, old){
                this.geocoder(val);
            },
            'rate':function(val, old){
                if(val) {
                    if (val.length > 1) {
                        this.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Rate field must be one character'});
                        this.rate = old;
                    } else if (parseInt(val) != val) {
                        this.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Rate field must be an integer'});
                        this.rate = old;
                    } else if (parseInt(val) > 5 || parseInt(val) < 1) {
                        this.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Rate field must be in the range 1-5'});
                        this.rate = old;
                    }
                }
            }
        }
    }
</script>
