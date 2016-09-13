<template>
    <header class="second">
        <nav class="navbar">
            <div class="container-fluid">
                <div class="col-xs-12 padding-mobile-0">
                    <div class="col-xs-12 padding-mobile-0">
                        <ul class="nav navbar-nav left">
                            <router-link to="/create"><li class="nav-item">Create Rate</li></router-link>
                            <router-link to="/recent"><li class="nav-item">View Recent</li></router-link>
                            <router-link to="/nearby"><li class="nav-item">View Nearby</li></router-link>
                            <router-link to="/yours"><li class="nav-item">View Yours</li></router-link>
                        </ul>
                        <ul class="nav navbar-nav pull-xs-right right">
                            <router-link to="/about"><li class="nav-item">About</li></router-link>
                            <template v-if="user">
                                <router-link to="/profile"><li class="nav-item">{{user.data.users_username}}</li></router-link>
                                <a v-on:click="requestLogout" href="#"> <li class="nav-item">Logout</li></a>
                            </template>
                            <template v-else>
                                <router-link to="/login"><li class="nav-item">Login</li></router-link>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<style lang="stylus">
    header.second{

    }
    header.second .left li.nav-item {
        margin-right:15px;
    }
    header.second .right li.nav-item {
        margin-left:15px;
    }
    header.second nav.navbar {
        padding-bottom:3px;
    }
    header.second nav li{
        padding:0 10px 0;
        margin-left:-10px;
        padding-bottom:6px;
    }
    header.second nav li:hover{
        border:solid;
        border-color:#50919a;
        border-width: 0;
        border-bottom-width:3px;
        margin-bottom:-3px;
    }
    header.second * {
        -webkit-transition: all 0ms ease-out 0ms;
        -moz-transition: all 0ms ease-out 0ms;
        -o-transition: all 0ms ease-out 0ms;
        transition: all 0ms ease-out 0ms;
    }
</style>
<script>
    export default{
        data:function(){
            return{
                user:this.$store.getters.getUser
            }
        },
        mounted:function(){
        },
        methods:{
            'requestLogout':function(){
                let self = this;
                this.$store.dispatch('FETCH_LOGOUT', this.user).then(function(status){
                    if(status) {self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Logout complete'});}
                    else {self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Logout failed'});}
                });
            }
        },
        watch:{
            '$store.getters.getUser':function(val, old){
                this.user = val;
            }
        }
    }
</script>
