<template>
    <div>
        <template v-for="(item, index) in items">
            <div>
                {{item.rate_name}}
            </div>
        </template>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    export default{
        props:{
            items:Array
        },
        data(){
            return{
            }
        },
        components:{
        }
    }
</script>
