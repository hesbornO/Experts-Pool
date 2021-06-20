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
    // countries
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
                commit("getCountry", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    updateCountryById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/country/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/country/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("getCountry", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // regions
    fetchRegions({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/region/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/region/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setCountries", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchRegionById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/region/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/region/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("getCountry", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteRegionById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/region/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/region/" + payload
            }
            api.delete(relative_url).then(resp => {
                commit("getRegion", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postRegion({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/region/", payload).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    updateRegionById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/region/'
            console.log('id', payload.id)
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/region/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("getRegion", resp.data)
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
    getCountry: (state, country) => (state.country = country),
    getRegions: (state, regions) => (state.regions = regions),
    getRegion: (state, region) => (state.region = region)
}


export default {
    state,
    getters,
    actions,
    mutations,
}