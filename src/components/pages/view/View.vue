<template>
    <div class="">
        <div class="view">
            <div class="hero">
                <div class="container-fluid padding-0">
                    <div class="col-xs-12 col-sm-6 center-align">
                        <div class="content inline max-width-50">
                            <h1>{{firstCharacterToUpperCase(type)}}</h1>
                            <h2>View rates</h2>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 img-background" v-bind:style="'background-image:url(' + background + ')'">

                    </div>
                </div>
            </div>
            <div class="body">
                <div class="items">
                    <template v-if="items">
                        <rate-list v-bind:items="items"/>
                        <div class="clearfix"/>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .view .body {
        padding:0;
        min-height:50vh;
    }
    .view .items{
        padding:25px;
    }
    .view .img-background {
    }
</style>
<script>
    import rateList from './type/List.vue';
    import rateMap from './type/List.vue';
    import {fetchLocation} from '../../../methods/client.js';
    export default{
        props:{
            type:String
        },
        data(){

            var background;
            var items;
            switch(this.type){
                case"yours":
                    items = this.$store.getters.getYours;
                    background='http://i.imgur.com/RTtVz6n.jpg?1';
                    break;
                case"recent":
                    items = this.$store.getters.getRecent;
                    background='http://i.imgur.com/0mGbW20.jpg?1';
                    break;
                case"nearby":
                    items = this.$store.getters.getNearby;
                    background='http://i.imgur.com/KvPUj7l.jpg?1';
                    break;
            }

            return{
                background:background,
                items:items,
                currentPage:0,
                pageSize:3
            }
        },
        components:{
            'rate-list':rateList,
            'rate-map':rateMap,
        },
        mounted:function(){
            if(!(this.items)) {this.requestData(false);}
        },
        watch:{
            '$store.getters.getYours':function(val, old) {
                if(this.type == 'yours'){this.items = val;}
            },
            '$store.getters.getNearby':function(val, old) {
                if(this.type == 'nearby'){this.items = val;}
            },
            '$store.getters.getRecent':function(val, old) {
                if(this.type == 'recent'){this.items = val;}
            },
            '$store.getters.getUser':function(val, old){
                this.requestData(false);
            }
        },
        methods:{
            'requestData':function(incrementPage){
                let self = this;
                self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Attempting to fetch ' + self.type});
                if(this.$store.getters.getUser || self.type != 'yours') {
                    if(incrementPage) {
                        self.currentPage++;
                    }
                    let data = {
                        type: self.type,
                        users_id: (self.$store.getters.getUser) ? self.$store.getters.getUser.data.users_id : null,
                        page: self.currentPage,
                        length: self.pageSize
                    };
                    self.$store.dispatch('FETCH_DATA', data).then(function (data) {
                        self.$store.dispatch('FETCH_USER_MESSAGE', {text: self.type + ' has been fetched'});
                    }).catch(function (err) {
                        self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Failed to fetch ' + self.type});
                    });
                } else {
                    self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'You must be logged in for this action'});
                }
            },
            'firstCharacterToUpperCase':function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            'requestRefresh':function(){
                this.items = null;
                this.currentPage = 0;
                this.requestData(false);
            }
        }
    }
</script>
