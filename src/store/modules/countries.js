import api from "@/api";

const state = {
    countries: {}
}

const getters = {
    allCountries(state) {
        return state.countries
    }
}

const actions = {
    fetchCountries({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/country/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/country/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setCountries", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchCountryById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/country/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/country/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("getCountry", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteCountryById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/country/'
            console.log('payload', payload)
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/country/" + payload
            }
            api.delete(relative_url).then(resp => {
                commit("getCountry", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postCountry({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/country/", payload).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    postCountryById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/country/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/country/" + payload
                alert('putUrl', relative_url)
                console.log('putUrl', relative_url)
            }
            api.patch(relative_url, payload).then(resp => {
                alert('relative url', relative_url)
                console.log('relative url', relative_url)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
}

const mutations = {
    setCountries: (state, countries) => (state.countries = countries),
    getCountry: (state, country) => (state.country = country)
}


export default {
    state,
    getters,
    actions,
    mutations,
}