import axios from "axios";
import {baseUrl} from "../../utils/constants"
const state = {
    user: {},
    token: '',
    error: {}
}


const getters = {
    // getCurrentUser(state) {
    //     return state.user
    // },
    // getCurrentToken(state) {
    //     return state.token
    // },
    // getErrorMessage(state) {
    //     return state.error
    // }
}

const actions = {

    signUp({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post(baseUrl+"api/users/", payload).then(resp => {
                commit("setToken", resp.data.access)
                localStorage.setItem('token', resp.data.access)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },

    setErrorMsg({ commit }, payload) {
        commit('setError', payload)
    }
}

const mutations = {
    setUser: (state, user) => (state.user = user),
    setToken: (state, token) => (state.token = token),
    setError: (state, error) => (state.error = error)
}


export default {
    state,
    getters,
    actions,
    mutations,
}