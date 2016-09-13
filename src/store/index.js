
import Vue from 'vue';

import Vuex from 'vuex';

import { request, serialize, decrypt } from '../methods/client.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user:null,
        userMessage:null
    },
    actions: {
        FETCH_CREATE: ({ commit, dispatch, state }, Obj) => {
            console.log(Obj);
            return new Promise(function(resolve, reject){
                request({url:'/api/create/?' + serialize(Obj)}).then(function(curr) {
                    if(curr.status == 1) {
                        console.log(curr);
                        resolve();
                    }
                    else {reject();}
                });
                commit('SET_USER', null);
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
        SET_USER_MESSAGE: (state, curr) => {
            state.userMessage = curr;
        },
    },
    getters: {
        getTestData (state) {
            const { testData } = state;
            return testData;
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
