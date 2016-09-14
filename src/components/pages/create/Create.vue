<template>
    <div class="create">
        <div class="hero">
            <div class="container-fluid padding-0">
                <div class="col-xs-12 col-sm-6 center-align">
                    <div class="content inline max-width-50">
                        <h1>Create Rate</h1>
                        <h2>Description/How-To Here</h2>
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
    .padding-0 {
        padding:0;
    }
    .hero .img-background {
        background-image:url('http://i.imgur.com/gZqwVKL.jpg?1');
        background-size:cover;
        background-position:center center;
        height:500px;
    }
    .center-align {
        text-align:center;
    }
    .hero {
        background-color:#a50303;
        text-align:center;
        color:#fff;
    }
    .hero .content {
        text-align:left;
        padding:100px 0;
    }
    .inline {
        display:inline-block;
    }
    .hero .container-fluid .col {
        height:25vh;
    }
    .hero h1, .hero h2 {
        margin:0;
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
        }
    }
</script>