import api from "@/api";
import axios from "axios";
import {api_url} from "@/utils/constants";

const state = {
    user: {},
    token: '',
    error: {}
}


const getters = {
    getCurrentUser(state) {
        return state.user
    },
    getCurrentToken(state) {
        return state.token
    },
    getErrorMessage(state) {
        return state.error
    }
}

const actions = {
    login({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.post("/request-token/", payload).then(resp => {
                let access_token = resp.data.access
                commit("setToken", access_token)
                localStorage.setItem('token', access_token)
                localStorage.setItem('active_language_name','english')
                commit('switchLanguage', 'english')
                try {
                    let decoded_token = JSON.parse(atob(access_token.split('.')[1]));
                    localStorage.setItem('full_name', decoded_token.full_name)
                    localStorage.setItem('username', decoded_token.username)
                    localStorage.setItem('level', decoded_token.level)
                    localStorage.setItem('region', decoded_token.region)
                    localStorage.setItem('roles', decoded_token.roles)
                    localStorage.setItem('id', decoded_token.id)
                    localStorage.setItem('is_superuser', decoded_token.is_superuser)
                    // eslint-disable-next-line no-empty
                } catch (e) {
                }
                resolve(resp.data)
            }).catch(err => {
                // console.log("res", err.response.data)
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // eslint-disable-next-line no-unused-vars
    requestPasswordChange({commit}, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = api_url+'request-password-change/'
            if (payload === undefined) {
                payload = ''
            } else {
                // console.log('url+payload:', relative_url)
            }            
            console.log('payload:',payload)
            axios.post(relative_url, 
                payload
              )
              .then(function (response) {
                resolve(response.data)
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
                reject(error.response.data)

              });
        });
    },
    // eslint-disable-next-line no-unused-vars
    completePasswordChange({commit}, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = api_url+'complete-password-change/'
            if (payload === undefined) {
                payload = ''
            } else {
                // console.log('url+payload:', relative_url)
            }            
            console.log('payload:',payload)
            axios.post(relative_url, 
                payload
              )
              .then(function (response) {
                resolve(response.data)
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
                reject(error.response.data)

              });
        });
    },
  
    setErrorMsg({commit}, payload) {
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