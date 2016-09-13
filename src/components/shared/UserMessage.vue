<template>
    <div>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    export default{
        name:'user-message-comp',
        data(){
            return{
            }
        },
        watch:{
            '$store.getters.getUserMessage':function(val, old){
                console.log(val.text);
            }
        }
    }
</script>
