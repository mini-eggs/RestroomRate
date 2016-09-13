<template>
    <div class="body">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <blockquote>
                        <p>
                            Fill out the form below to login
                        </p>
                    </blockquote>
                </div>
            </div>
            <div class="spacer"/>
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <div class="card">
                        <h1>Username</h1>
                        <input v-model="username" type="text" placeholder="Example: mini_eggs"/>
                        <div class="spacer"/>
                        <h1>Password</h1>
                        <input v-model="password" type="password" placeholder="At least try to make it secure"/>
                    </div>
                    <div class="spacer"/>
                </div>
                <div class="col-xs-12 col-sm-3">
                    <router-link class="no-link" to="/register">
                        <div class="card padding-50">
                            <h1>Or Create an Account</h1>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2 pointer" v-on:click="requestLogin">
                    <div class="card blue-background">
                        <h1 class="white-text">Login</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .blue-background {
        background-color:#50919a;
    }
    .white-text{
        color:#fff;
    }
    .padding-50 {
        padding:50px;
    }
    .pointer {
        cursor:pointer;
    }
    .no-link, .no-link:hover, .no-link:active, .no-link:visited, .no-link:focus {
        color:inherit!important;
        text-decoration:none!important;
    }
</style>
<script>
    export default{
        data(){
            return{
                username:null,
                password:null
            }
        },
        components:{
        },
        methods:{
            'requestLogin':function(){
                let self = this;
                if(this.username && this.password){
                    let user = {
                        username:this.username,
                        password:this.password
                    };
                    this.$store.dispatch('FETCH_LOGIN', user).then(function(status){
                        self.username = null;
                        self.password = null;
                        if(status) {self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Login complete'});}
                        else {self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Login failed'});}
                    });
                } else {
                    this.$store.dispatch('FETCH_USER_MESSAGE', {text:'Fields are invalid'});
                }
            }
        },
        watch:{
            '$store.getters.getUser':function(){

            }
        }
    }
</script>
