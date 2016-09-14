<template>
    <div class="">
        <div class="view">
            <div class="hero">
                <div class="container-fluid padding-0">
                    <div class="col-xs-12 col-sm-6 center-align">
                        <div class="content inline max-width-50">
                            <h1>{{firstCharacterToUpperCase(type)}}</h1>
                            <h2>View rates</h2>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 img-background" v-bind:style="'background-image:url(' + background + ')'">

                    </div>
                </div>
            </div>
            <div class="body">
                <div class="items">
                    <template v-if="items">
                        <rate-list v-bind:items="items"/>
                        <div class="clearfix"/>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .view .body {
        padding:0;
        min-height:50vh;
    }
    .view .items{
        padding:25px;
    }
    .view .img-background {
    }
</style>
<script>
    import rateList from './type/List.vue';
    import rateMap from './type/List.vue';
    import {fetchLocation} from '../../../methods/client.js';
    export default{
        props:{
            type:String
        },
        data(){

            var background;
            switch(this.type){
                case"yours":
                    background='https://static.pexels.com/photos/109109/pexels-photo-109109.jpeg';
                    break;
                case"recent":
                    background='https://static.pexels.com/photos/26933/pexels-photo-26933.jpg';
                    break;
                case"nearby":
                    background='https://static.pexels.com/photos/26322/pexels-photo-26322.jpg';
                    break;
            }

            return{
                background:background,
                items:null,
                currentPage:0,
                pageSize:3
            }
        },
        components:{
            'rate-list':rateList,
            'rate-map':rateMap,
        },
        mounted:function(){
            this.requestData(false);
        },
        watch:{
            '$store.getters.getData':function(val, old) {
                this.items = val;
            },
            '$store.getters.getUser':function(val, old){
                this.requestData(false);
            }
        },
        methods:{
            'requestData':function(incrementPage){
                if(this.$store.getters.getUser) {
                    let self = this;
                    if(incrementPage) {self.currentPage++;}
                    fetchLocation().then(function(loc){
                        let data = {
                            type: self.type,
                            users_id: self.$store.getters.getUser.data.users_id,
                            lat:loc.lat,
                            long:loc.long,
                            page: self.currentPage,
                            length: self.pageSize
                        };
                        self.$store.dispatch('FETCH_DATA', data).then(function (data) {
                            self.$store.dispatch('FETCH_USER_MESSAGE', {text: self.type + ' has been fetched'});
                        }).catch(function (err) {
                            self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Failed to fetch ' + self.type});
                        });
                    });
                }
            },
            'firstCharacterToUpperCase':function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }
    }
</script>
