import api from "@/api";

const state = {
    Outbreaks: [],
    Outbreak: {},
}

const getters = {
    allOutbreaks(state) {
        return state.Outbreaks
    }
}

const actions = {
    fetchAllOutbreaks({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setOutbreaks", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchOutbreakById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setOutbreak", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteOutbreakById({commit},payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload
            }
            console.log('payload:',payload)
            api.delete(relative_url).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postOutbreak({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/outbreak/", payload).then(resp => {
                commit("setOutbreak", resp.data)
                resolve(resp.data)
            }).catch(err => {
                if(err.response.status !== 400){
                    this.$toast.error('an unknown error occurred')
                }
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    updateOutbreakById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("setOutbreak", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },

}

const mutations = {
    setOutbreaks: (state, Outbreaks) => (state.Outbreaks = Outbreaks),
    setOutbreak: (state, Outbreak) => (state.Outbreak = Outbreak),
}


export default {
    state,
    getters,
    actions,
    mutations,
}