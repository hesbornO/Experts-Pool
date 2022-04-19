import api from "@/api";

const state = {
    OutbreakOptions: [],
    Outbreaks: [],
    Outbreak: {},
    deployments: [],
    outbreakTypes: [],
    outbreakType: {},
    outbreakTypeOptions: {},
}

const getters = {
    allOutbreaks(state) {
        return state.Outbreaks
    },
    allDeployments(state) {
        return state.deployments
    },
    allOutbreakTypes(state) {
        return state.outbreakTypes
    }
}

const actions = {
    fetchAllOutbreaks({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + '?page='+payload
            }
            api.get(relative_url).then(resp => {
                commit("setOutbreaks", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchOutbreakOptions({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak_options/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak_options/" + payload
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
    fetchDeploymentsPerOutbreak({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload+'/get_rdes'
            }
            api.get(relative_url).then(resp => {
                commit("deployments", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteOutbreakById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload
            }
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
                if (err.response.status !== 400) {
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
    updateOutbreakItemById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, payload).then(resp => {
                commit("setOutbreak", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    uploadOutbreakReportById({ commit }, payload) {
        console.log('payload',payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak-report/'
            
            api.post(relative_url, payload, {headers:{'Content-Type':'multipart/form-data'}}).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },

    // outbreak types
    fetchAllOutbreakTypes({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak-type/'
            if (payload === undefined) {
                payload = ''
            } 
            else {
                relative_url = "/outbreak-type/" + '?page='+payload
            }
            api.get(relative_url).then(resp => {
                commit("setOutbreakTypes", resp.data)
                resolve(resp.data.results)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchOutbreakTypeById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak-type/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak-type/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setOutbreakType", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteOutbreakTypeById({commit},payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak-type/'
            
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak-type/" + payload
            }
            api.delete(relative_url).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject(err)
                console.log(commit)
            })
        })
    },
    postOutbreakType({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/outbreak-type/", payload).then(resp => {
                commit("setOutbreakType", resp.data)
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
    updateOutbreakTypeById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/outbreak-type/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/outbreak-type/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("setOutbreakType", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // fetchAcademicQualificationTypeOptions({ commit }, payload) {
    //     return new Promise((resolve, reject) => {
    //         let relative_url = '/outbreak-type-options/'
    //         if (payload === undefined) {
    //             payload = ''
    //         } else {
    //             relative_url = "/outbreak-type-options/" + payload
    //         }
    //         api.get(relative_url).then(resp => {
    //             commit("setAcademicQualificationTypeOptions", resp.data)
    //             resolve(resp.data)
    //         }).catch(err => {
    //             reject(err)
    //         })
    //     })
    // },

    // end of outbreak types

}

const mutations = {
    setOutbreakOptions: (state, OutbreakOptions) => (state.OutbreakOptions = OutbreakOptions),
    setOutbreaks: (state, Outbreaks) => (state.Outbreaks = Outbreaks),
    setOutbreak: (state, Outbreak) => (state.Outbreak = Outbreak),
    setDeployments: (state, deployments) => (state.deployments = deployments),
    setOutbreakTypes: (state, outbreakTypes) => (state.outbreakTypes = outbreakTypes),
    setOutbreakType: (state, outbreakType) => (state.outbreakType = outbreakType),
}


export default {
    state,
    getters,
    actions,
    mutations,
}