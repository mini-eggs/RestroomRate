<template>
    <div class="homepage">
        <div class="hero">
            <div class="container-fluid padding-0">
                <div class="col-xs-12 col-sm-6 center-align">
                    <div class="content inline max-width-50">
                        <h1>Welcome</h1>
                        <h2>View some of our recent rates below, check out the about tab at the top right to learn more</h2>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 img-background">

                </div>
            </div>
        </div>
        <home-body/>
    </div>
</template>
<style lang="stylus">
    .homepage .hero .img-background {
        background-image:url('http://i.imgur.com/TaE1Vy1.jpg?2');
    }
</style>
<script>
    import homeBody from './Body.vue'
    export default{
        data(){
            return{
            }
        },
        components:{
            'home-body':homeBody
        },
        methods:{
        },
        mounted:function(){
        },
        watch:{
        }
    }
</script>
