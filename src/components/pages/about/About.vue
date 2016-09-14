<template>
    <div class="about">
        <div class="hero">
            <div class="container-fluid padding-0">
                <div class="col-xs-12 col-sm-6 center-align">
                    <div class="content inline max-width-50">
                        <h1>About</h1>
                        <h2>A web app for your rates</h2>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 img-background">

                </div>
            </div>
        </div>
        <about-body/>
    </div>
</template>
<style lang="stylus">
    .about .hero .img-background {
        background-image:url('http://i.imgur.com/PhAbelZ.jpg?2');
    }
</style>
<script>
    import aboutBody from './Body.vue'
    export default{
        data(){
            return{
            }
        },
        components:{
            'about-body':aboutBody
        },
        methods:{
        },
        mounted:function(){
        },
        watch:{
        }
    }
</script>
