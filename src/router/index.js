
import Vue from 'vue';

import Home from '../components/Home.vue'

import Create from '../components/pages/create/Create.vue'

import Login from '../components/login/Login.vue'

import Register from '../components/register/Register.vue'

import Profile from '../components/profile/Profile.vue'

import Error from '../components/Error.vue'

import Router from 'vue-router';

if(typeof window != 'undefined'){

    var VueHead = require('vue-head');

    Vue.use(VueHead);

    var VueLazyload = require('vue-lazyload');

    Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: 'https://placeholdit.imgix.net/~text?txtsize=22&txt=error&w=100&h=75',
        loading: 'https://placeholdit.imgix.net/~text?txtsize=22&txt=loading&w=100&h=75',
        try: 3
    });
}

Vue.use(Router);

var routes = [];

routes.push({path: '/', component: Home});
routes.push({path: '/login', component: Login});
routes.push({path: '/register', component: Register});
routes.push({path: '/profile', component: Profile});
routes.push({path: '/create', component: Create});
routes.push({path: '*', component: Error});

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
});