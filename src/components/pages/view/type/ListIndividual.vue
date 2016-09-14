<template>
    <router-link class="no-link" v-bind:to="'/rate/' + data.rate_id">
        <div class="individual animated fadeIn">
            <div class="">
                <img class="full" v-bind:src="data.rate_file" />
                <div class="sm-spacer"/>
                <div class="padding-50 blue-background white-text">
                    <h1>{{data.rate_name}}</h1>
                    <h4>{{data.rate_desc}}</h4>
                    <div class="spacer"/>
                    <h4 class="f-right">{{data.rate_rate}}/5</h4>
                </div>
            </div>
        </div>
    </router-link>
</template>
<style lang="stylus">
    .f-right {
        float:right;
    }
    .individual {
        padding:25px!important;
    }
    .sm-spacer {
        width:100%;
        height:5px;
    }
</style>
<script>
    export default{
        props:{
            data:Object
        },
        data(){
            return{
            }
        },
        mounted:function(){
        },
        components:{
        }
    }
</script>
