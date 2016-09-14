<template>
    <div>
        <div class="hidden-lg-down">
            <template v-for="(size, endex) in large">
                <div class="col-xs-3 padding-0">
                    <template v-for="(item, index) in items">
                        <template v-if="((index - large.length - endex) % large.length) == 0">
                            <list-indi v-bind:data="item" />
                        </template>
                    </template>
                </div>
            </template>
        </div>
        <div class="hidden-xl-up hidden-sm-down">
            <template v-for="(size, endex) in medium">
                <div class="col-xs-4 padding-0">
                    <template v-for="(item, index) in items">
                        <template v-if="((index - medium.length - endex) % medium.length) == 0">
                            <list-indi v-bind:data="item" />
                        </template>
                    </template>
                </div>
            </template>
        </div>
        <div class="hidden-md-up">
            <template v-for="(size, endex) in small">
                <div class="col-xs-12 padding-0">
                    <template v-for="(item, index) in items">
                        <template v-if="((index - small.length - endex) % small.length) == 0">
                            <list-indi v-bind:data="item" />
                        </template>
                    </template>
                </div>
            </template>
        </div>
        <div class="clearfix" />
        <div class="spacer" />
        <div class="col-xs-12 padding-0">
            <div class="col-xs-12 col-sm-4 offset-sm-2">
                <div class="card blue-background pointer center-align" v-on:click="requestMore">
                    <h1 class="white-text">Load more</h1>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4">
                <div class="card blue-background pointer center-align" v-on:click="requestRefresh">
                    <h1 class="white-text">Refresh</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    import listIndi from './ListIndividual.vue'
    export default{
        props:{
            items:Array
        },
        data(){
            return{
                large:[0, 1, 2, 3],
                medium:[0, 1, 2],
                small:[0]
            }
        },
        components:{
            'list-indi':listIndi
        },
        methods:{
            'requestMore':function(){
                this.$parent.requestData(true);
            },
            'requestRefresh':function(){
                this.$parent.requestRefresh();
            },
        }
    }
</script>
