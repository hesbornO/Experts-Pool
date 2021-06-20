Vue.use(Vuex)

import Vue from 'vue'
import Vuex from 'vuex'
import transaction from './modules/transactions'
import countries from './modules/countries'
import login from './modules/login'

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {},
    getters: {
        layout(state) {
            return state.layout
        }
    },
    modules: {
        transaction,
        countries,
        login
    }
})