Vue.use(Vuex)

import Vue from 'vue'
import Vuex from 'vuex'

import transaction from './modules/transactions'
import countries from './modules/countries'
import login from './modules/login'
import signup from './modules/signup'
import RDE from './modules/RDE'
import occupations from './modules/occupations'
import outbreaks from './modules/outbreaks'
import competencies from './modules/competencies'
import qualificationTypes from './modules/academic_qualification_types'
import users from './modules/users'


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
        login,
        signup,
        RDE,
        occupations,
        outbreaks,
        competencies,
        qualificationTypes,
        users
    }
})