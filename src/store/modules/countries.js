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
}

const mutations = {
    setCountries: (state, countries) => (state.countries = countries)
}


export default {
    state,
    getters,
    actions,
    mutations,
}