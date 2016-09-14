
import Vue from 'vue';

import Vuex from 'vuex';

import { request, serialize, decrypt, fetchLocation } from '../methods/client.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user:null,
        userMessage:null,
        yours:null,
        nearby:null,
        recent:null,
        location:null
    },
    actions: {
        FETCH_DATA: ({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                var theThing = function(){
                    Obj.lat = state.location.lat;
                    Obj.long = state.location.long;
                    request({url:'/api/data/?' + serialize(Obj)}).then(function(curr) {
                        if(curr.status == 1) {
                            if(Obj.page != 0) {
                                let currentData = state[Obj.type];
                                for(let e = 0; e < curr.data.length; e++) {
                                    currentData.push(curr.data[e]);
                                }
                                commit('SET_DATA_'+Obj.type.toUpperCase(), currentData);
                            } else {
                                commit('SET_DATA_'+Obj.type.toUpperCase(), curr.data);
                            }
                            resolve();
                        }
                        else {
                            commit('SET_DATA_'+Obj.type.toUpperCase(), null);
                            reject();
                        }
                    });
                };
                if(state.location) {
                    theThing();
                } else {
                    commit('SET_USER_MESSAGE', {text:'Fetching location'});
                    fetchLocation().then(function (loc) {
                        commit('SET_USER_MESSAGE', {text:'Location has been caught'});
                        commit('SET_LOCATION', loc);
                        theThing();
                    });
                }
            });
        },
        FETCH_CREATE: ({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                request({url:'/api/create/?' + serialize(Obj)}).then(function(curr) {
                    if(curr.status == 1) {resolve();}
                    else {reject();}
                });
            });
        },
        FETCH_LOGOUT: ({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                let user = {
                    username:Obj.data.users_username,
                };
                request({url:'/api/logout/?' + serialize(user)}).then(function(curr) {
                    if(curr.status == 1) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
                commit('SET_USER', null);
            });
        },
        FETCH_LOGIN:({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                request({url:'/api/login/?' + serialize(Obj)}).then(function(curr) {
                    if (curr.status == 1) {
                        commit('SET_USER', curr);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        },
        FETCH_CHECK_LOGIN:({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                let data = {
                    bogus:'placeholder'
                };
                request({url:'/api/checkLogin/?' + serialize(data)}).then(function(curr) {
                    if (curr.status == 1) {
                        commit('SET_USER', curr);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        },
        FETCH_REGISTER:({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                request({url:'/api/register/?' + serialize(Obj)}).then(function(curr) {
                    if (curr.status == 1) {
                        commit('SET_USER', curr);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            })
        },
        FETCH_USER_MESSAGE: ({ commit, dispatch, state }, Obj) => {
            commit('SET_USER_MESSAGE', Obj);
        }
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_DATA_YOURS: (state, user) => {
            state.yours = user;
        },
        SET_DATA_NEARBY: (state, user) => {
            state.nearby = user;
        },
        SET_DATA_RECENT: (state, user) => {
            state.recent = user;
        },
        SET_USER_MESSAGE: (state, curr) => {
            state.userMessage = curr;
        },
        SET_LOCATION: (state, curr) => {
            state.location = curr;
        }
    },
    getters: {
        getData (state) {
            const { data } = state;
            return data;
        },
        getYours (state) {
            const { yours } = state;
            return yours;
        },
        getNearby (state) {
            const { nearby } = state;
            return nearby;
        },
        getRecent (state) {
            const { recent } = state;
            return recent;
        },
        getUserMessage (state) {
            const { userMessage } = state;
            return userMessage;
        },
        getUser(state){
            const {user} = state;
            return user;
        }
    }
});

export default store
