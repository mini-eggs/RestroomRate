<template>
    <header class="second">
        <nav class="navbar">
            <div class="container-fluid">
                <div class="col-xs-12 padding-mobile-0">
                    <div class="col-xs-12 padding-mobile-0">
                        <ul class="nav navbar-nav">
                            <li class="nav-item">
                                <router-link to="/create">Create Rate</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/recent">View Recent</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/nearby">View Nearby</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/yours">View Yours</router-link>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav pull-xs-right ">
                            <li class="nav-item">
                                <router-link to="/about">About</router-link>
                            </li>
                            <template v-if="user">
                                <li class="nav-item">
                                    <router-link to="/profile">{{user.data.users_username}}</router-link>
                                </li>
                                <li class="nav-item">
                                    <a v-on:click="requestLogout" href="#">Logout</a>
                                </li>
                            </template>
                            <template v-else>
                                <li class="nav-item">
                                    <router-link to="/login">Login</router-link>
                                </li>
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
                this.$store.dispatch('FETCH_LOGOUT', this.user);
            }
        },
        watch:{
            '$store.getters.getUser':function(val, old){
                this.user = val;
            }
        }
    }
</script>
