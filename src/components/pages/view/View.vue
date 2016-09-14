<template>
    <div>
        <template v-if="items">
            <rate-list v-bind:items="items"/>
        </template>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    import rateList from './type/List.vue';
    import rateMap from './type/List.vue';
    export default{
        props:{
            type:String
        },
        data(){
            return{
                items:null
            }
        },
        components:{
            'rate-list':rateList,
            'rate-map':rateMap,
        },
        mounted:function(){
            this.fetchData();
        },
        watch:{
            '$store.getters.getData':function(val, old) {
                this.items = val;
            },
            '$store.getters.getUser':function(val, old){
                this.fetchData();
            }
        },
        methods:{
            'fetchLocation':function(){
                let self = this;
                return new Promise(function(resolve, reject){
                    navigator.geolocation.getCurrentPosition(function(position){
                        self.lat = position.coords.latitude;
                        self.long = position.coords.longitude;
                        resolve();
                    });
                })
            },
            'fetchData':function(){

                if(this.$store.getters.getUser) {

                    let self = this;

                    this.fetchLocation().then(function(){

                        let data = {
                            type: self.type,
                            users_id: self.$store.getters.getUser.data.users_id,
                            lat:self.lat,
                            long:self.long,
                            page: 0,
                            length: 10
                        };

                        self.$store.dispatch('FETCH_DATA', data).then(function (data) {

                            self.$store.dispatch('FETCH_USER_MESSAGE', {text: self.type + ' has been fetched'});

                        }).catch(function (err) {

                            console.log(err);
                            self.$store.dispatch('FETCH_USER_MESSAGE', {text: 'Failed to fetch ' + self.type});

                        });
                    });
                }
            }
        }
    }
</script>
