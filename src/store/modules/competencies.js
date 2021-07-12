import api from "@/api";

const state = {
    competencies: [],
    competency: {},
}

const getters = {
    allCompetencies(state) {
        return state.competencies
    }
}

const actions = {
    fetchAllCompetencies({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/competence/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/competence/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setCompetencies", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchCompetencyById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/competence/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/competence/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setCompetency", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteCompetencyById({commit},payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/competence/'
            
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/competence/" + payload
            }
            // console.log('payload:',payload)
            api.delete(relative_url).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postCompetence({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/competence/", payload).then(resp => {
                commit("setCompetency", resp.data)
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
    updateCompetenceById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/competence/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/competence/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("setCompetency", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },

}

const mutations = {
    setCompetencies: (state, competencies) => (state.Outbreaks = competencies),
    setCompetency: (state, competency) => (state.Outbreak = competency),
}


export default {
    state,
    getters,
    actions,
    mutations,
}