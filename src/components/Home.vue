<template>
    <div>
        <button v-on:click="requestTestData">
            Test ReST API
        </button>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    export default{
        data(){
            return{
            }
        },
        components:{
        },
        methods:{
            'requestTestData':function(){
                this.$store.dispatch('FETCH_TEST_DATA', {});
            }
        },
        mounted:function(){
        },
        watch:{
            '$store.getters.getTestData':function(val, old){
                console.log(val.text);
            }
        }
    }
</script>
