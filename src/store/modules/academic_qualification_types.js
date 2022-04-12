import api from "@/api";

const state = {
    qualificationTypes: [],
    qualificationType: {},
    academicQualificationTypeOptions: {},
}

const getters = {
    allQualifications(state) {
        return state.qualificationTypes
    }
}

const actions = {
    fetchAllQualificationTypes({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/academic-qualification-type/'
            if (payload === undefined) {
                payload = ''
            } 
            // else {
            //     relative_url = "/academic-qualification-type/" + payload
            // }
            api.get(relative_url).then(resp => {
                commit("setQualificationTypes", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchQualificationTypeById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/academic-qualification-type/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/academic-qualification-type/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setQualificationType", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteQualificationTypeById({commit},payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/academic-qualification-type/'
            
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/academic-qualification-type/" + payload
            }
            // console.log('payload:',payload)
            api.delete(relative_url).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postQualificationType({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/academic-qualification-type/", payload).then(resp => {
                commit("setQualificationType", resp.data)
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
    updateQualificationTypeById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/academic-qualification-type/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/academic-qualification-type/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("setQualificationType", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    fetchAcademicQualificationTypeOptions({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/academic-qualification-type-options/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/academic-qualification-type-options/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setAcademicQualificationTypeOptions", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

}

const mutations = {
    setQualificationTypes: (state, qualificationTypes) => (state.qualificationTypes = qualificationTypes),
    setQualificationType: (state, qualificationType) => (state.qualificationType = qualificationType),
    setAcademicQualificationTypeOptions: (state, academicQualificationTypeOptions) => (state.academicQualificationTypeOptions = academicQualificationTypeOptions),
}


export default {
    state,
    getters,
    actions,
    mutations,
}