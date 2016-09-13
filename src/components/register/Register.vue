<template>
    <div class="login">
        <div class="hero">
            <div class="container-fluid padding-0">
                <div class="col-xs-12 col-sm-6 center-align">
                    <div class="content inline max-width-50">
                        <h1>Login</h1>
                        <h2>Please login below to use core features of this app</h2>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 img-background">

                </div>
            </div>
        </div>
        <body-comp/>
    </div>
</template>
<style lang="stylus">
    .max-width-50 {
        max-width:50%;
    }
    .login .img-background {
        background-image:url('https://static.pexels.com/photos/53908/pexels-photo-53908.jpeg');
    }
</style>
<script>
    import Body from './Body.vue'
    export default{
        data(){
            return{
            }
        },
        components:{
            'body-comp':Body
        },
        watch:{
        }
    }
</script>
