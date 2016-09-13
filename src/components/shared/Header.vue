<template>
    <header class="shadow">
        <nav class="navbar">
            <div class="container-fluid">
                <div class="col-xs-12 padding-mobile-0">
                    <div class="col-xs-12 padding-mobile-0">
                        <ul class="nav navbar-nav">
                            <li class="nav-item">
                                <router-link to="/">Restroom Rate</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <header-secondary/>
    </header>
</template>
<style lang="stylus">
    header a, header a:hover, header a:visited, header a:focus, header a:active {
        color:inherit!important;
        text-decoration:none!important;
    }
    header {
        background-color:#fff;
        color:#50919a;
    }
    header nav {
        border-radius:0px;
    }
    .shadow {
        -webkit-box-shadow: 0px 0px 15px 0px rgba(64,55,55,1);
        -moz-box-shadow: 0px 0px 15px 0px rgba(64,55,55,1);
        box-shadow: 0px 0px 15px 0px rgba(64,55,55,1);
    }
</style>
<script>
    import HeaderTwoComp from './HeaderSecondary.vue';
    export default{
        data:function(){
            return{
            }
        },
        mounted:function(){
        },
        methods:{
        },
        watch:{
        },
        components:{
            'header-secondary':HeaderTwoComp
        }
    }
</script>
