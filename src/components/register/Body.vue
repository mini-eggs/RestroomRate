<template>
    <div class="body">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <blockquote>
                        <p>
                            Fill out the form below to register
                        </p>
                    </blockquote>
                </div>
            </div>
            <div class="spacer"/>
            <div class="row">
                <div class="col-xs-12 col-sm-6 offset-sm-2">
                    <div class="card">
                        <h1>Username</h1>
                        <input v-model="username" type="text" placeholder="Example: mini_eggs"/>
                        <div class="spacer"/>
                        <h1>Email</h1>
                        <input v-model="email" type="email" placeholder="Example: evan@crowdhubapps.com"/>
                        <div class="spacer"/>
                        <h1>Password</h1>
                        <input v-model="password" type="password" placeholder="At least try to make it secure"/>
                    </div>
                    <div class="spacer"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 offset-sm-2 pointer" v-on:click="requestRegister">
                    <div class="card blue-background">
                        <h1 class="white-text">Register</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    export default{
        data(){
            return{
                username:null,
                email:null,
                password:null
            }
        },
        components:{
        },
        methods:{
            'requestRegister':function(){
                let self = this;
                if(this.username && this.password && this.email){
                    let user = {
                        username:this.username,
                        email:this.email,
                        password:this.password
                    };
                    this.$store.dispatch('FETCH_REGISTER', user).then(function(status){
                        self.username = null;
                        self.email = null;
                        self.password = null;
                        if(status) {self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Register complete'});}
                        else {self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Register failed'});}
                    });
                } else {
                    this.$store.dispatch('FETCH_USER_MESSAGE', {text:'Fields are invalid'});
                }
            }
        },
        watch:{
        }
    }
</script>
