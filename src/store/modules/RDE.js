import api from "@/api";

const state = {
    RDES: [],
    RDE: {},
    deployments: [],
    deployment: {}
}

const getters = {
    allRDES(state) {
        return state.RDES
    }

}

const actions = {
    fetchRDES({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setRDES", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchRDEById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteRDEById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload
            }
            api.delete(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postRDE({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/profile/", payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    deployRDE({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/deployment/", payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    endRDEdeployment({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/deployment/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/deployment/" + payload + "/"
                    // payload = { application_status: 'approved' }
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setDeployment", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    fetchRDEDeployments({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/deployment/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/deployment/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setDeployments", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateRDEById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    approveRDEById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload + "/"
                payload = { application_status: 'approved_by_partner_state' }
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    eac_approveRDEById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload + "/"
                payload = { application_status: 'approval_complete' }
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    eac_disapproveRDEById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload + "/"
                payload = { application_status: 'approved_by_partner_state' }
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    uploadCVById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.rdeId + "/"
                payload = { cv: payload.cv }
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    disapproveRDEById({ commit }, payload) {
        console.log('payload 2:', payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload + "/"
                payload = { application_status: 'pending_approval' }
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },


}

const mutations = {
    setRDES: (state, RDES) => (state.RDES = RDES),
    setRDE: (state, RDE) => (state.RDE = RDE),
    setDeployments: (state, deployments) => (state.deployments = deployments),
    setDeployment: (state, deployment) => (state.deployment = deployment),
}


export default {
    state,
    getters,
    actions,
    mutations,
}