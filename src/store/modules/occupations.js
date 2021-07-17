import api from "@/api";

const state = {
    occupations: [],
    occupation: {},
}

const getters = {
    allOccupations(state) {
        return state.occupations
    }
}

const actions = {
    fetchAllOccupations({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/occupation/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/occupation/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setOccupations", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchOccupationById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/occupation/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/occupation/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setOccupation", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteOccupationById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/occupation/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/occupation/" + payload
            }
            // console.log('payload:',payload)
            api.delete(relative_url).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postOccupation({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/occupation/", payload).then(resp => {
                commit("setOccupation", resp.data)
                resolve(resp.data)
            }).catch(err => {
                if (err.response.status !== 400) {
                    this.$toast.error('an unknown error occurred')
                }
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    updateOccupationById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/occupation/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/occupation/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("setOccupation", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },

}

const mutations = {
    setOccupations: (state, occupations) => (state.occupations = occupations),
    setOccupation: (state, occupation) => (state.occupatio = occupation),
}


export default {
    state,
    getters,
    actions,
    mutations,
}