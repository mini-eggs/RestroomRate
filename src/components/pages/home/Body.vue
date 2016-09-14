<template>
    <div class="body">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <blockquote>
                        <p>
                            A few of our recent restroom rates
                        </p>
                        <br/>
                        <br/>
                        <p>
                            Navigate to the racent tab to view more, this can be found near the top left
                        </p>
                    </blockquote>
                </div>
            </div>
            <div class="spacer"/>
        </div>
        <div class="home">
            <div class="items">
                <template v-if="items">
                    <rate-list v-bind:items="items"/>
                    <div class="clearfix"/>
                </template>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .body .home .items {
        padding: 0 25px 25px 25px;
    }
</style>
<script>
    import rateList from '../view/type/List.vue'
    export default{
        data(){
            let items = this.$store.getters.getRecent;
            return{
                items:items,
                type:'recent',
                currentPage:0,
                pageSize:3
            }
        },
        components:{
            'rate-list':rateList
        },
        mounted:function(){
            if(!(this.items)) {this.requestData(false);}
        },
        watch:{
            '$store.getters.getRecent':function(val, old) {
                if(this.type == 'recent'){this.items = val;}
            }
        },
        methods:{
            'requestData':function(incrementPage){
                let self = this;
                self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Attempting to fetch ' + self.type});
                if(incrementPage) {
                    self.currentPage++;
                }
                let data = {
                    type: self.type,
                    users_id: null,
                    page: self.currentPage,
                    length: self.pageSize
                };
                self.$store.dispatch('FETCH_DATA', data).then(function (data) {
                    self.$store.dispatch('FETCH_USER_MESSAGE', {text: self.type + ' has been fetched'});
                }).catch(function (err) {
                    self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Failed to fetch ' + self.type});
                });
            },
            'requestRefresh':function(){
                this.items = null;
                this.currentPage = 0;
                this.requestData(false);
            }
        }
    }
</script>
