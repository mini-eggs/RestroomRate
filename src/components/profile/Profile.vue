<template>
    <div class="profile">
        <div class="hero">
            <div class="container-fluid padding-0">
                <div class="col-xs-12 col-sm-6 center-align">
                    <div class="content inline max-width-50">
                        <template v-if="user">
                            <h1>{{user.data.users_username}}</h1>
                        </template>
                        <template v-else>
                            <h1>Not logged in</h1>
                        </template>
                        <h2>Edit your profile here</h2>
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
    .profile .img-background {
        background-image:url('https://static.pexels.com/photos/170560/pexels-photo-170560.jpeg');
    }
</style>
<script>
    import Body from './Body.vue'
    export default{
        data(){
            return{
                user:this.$store.getters.getUser
            }
        },
        components:{
            'body-comp':Body
        },
        watch:{
            '$store.getters.getUser':function(val, old){
                this.user = val;
            }
        }
    }
</script>
