
import Vue from 'vue';

import Vuex from 'vuex';

import { request, serialize, decrypt } from '../methods/client.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        testData:null,
        user:null,
        userMessage:null
    },
    actions: {
        FETCH_LOGOUT: ({ commit, dispatch, state }, Obj) => {
            let user = {
                username:Obj.data.users_username,
            };
            return new Promise(function(resolve, reject){
                request({url:'/api/logout/?' + serialize(user)}).then(function(curr) {
                    resolve();
                });
                commit('SET_USER', null);
            });
        },
        FETCH_LOGIN:({ commit, dispatch, state }, Obj) => {
            console.log(Obj);
        },
        FETCH_REGISTER:({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                request({url:'/api/register/?' + serialize(Obj)}).then(function(curr) {
                    if (curr.status == 1) {
                        let user = {
                            data:curr.data
                        };
                        commit('SET_USER', user);
                    } else if (curr.status == 0 ) {
                        commit('SET_USER_MESSAGE', curr);
                    }
                    resolve();
                });
            })
        },
        FETCH_TEST_DATA: ({ commit, dispatch, state }, Obj) => {
            request({url:'/api/example/?random=123'}).then(function(curr) {
                if (curr.status > 0) {
                    commit('SET_TEST_DATA', {curr});
                }
            });
        },
        FETCH_USER_MESSAGE: ({ commit, dispatch, state }, Obj) => {
            commit('SET_USER_MESSAGE', Obj);
        }
    },
    mutations: {
        SET_TEST_DATA: (state, { curr }) => {
            state.testData = curr;
        },
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
