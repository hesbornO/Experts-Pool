import api from "@/api";

const state = {
    stats: [],
    RDES: [],
    RDE: {},
    signUpData: {},
    deployments: [],
    deployment: {},
    qualification:{},
    experience:{},
    reference:{}
}


const getters = {
    allRDES(state) {
        return state.RDES
    },
    signUpInfo(state) {
        return state.signUpData
    }

}

const actions = {
    // stats
    fetchStats({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/fetch_stats/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/fetch_stats/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setStats", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // rde CRUD
    fetchRDES({ commit }, payload) {
        console.log('homepayload',payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/"+payload
            }
            api.get(relative_url).then(resp => {
                commit("setRDES", resp.data)
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
    // 
    postExperience({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/detailed-experience/", payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    fetchAllLanguages({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/language/'
            if (payload === undefined) {
                payload = ''
            }
             else {
                relative_url = "/language/" + '?page='+payload
                
            }
            api.get(relative_url).then(resp => {
                commit("setCompetencies", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postLanguage({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/profile-language/", payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
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
    downloadCSV({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                if(payload) relative_url = "/profile/?" + payload+'&output=csv'
            }
            api.get(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchSignUpDataById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/users/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/users/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setSignUpData", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    suggestRDES({ commit }, payload) {
        return new Promise((resolve, reject) => {
            // let relative_url = '/suggest_rdes/'
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                // relative_url = "/suggest_rdes/" + '?page='+payload
                relative_url = "/profile/"+payload
            }
            api.get(relative_url).then(resp => {
                commit("setRDE", resp.data)
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
                console.log('putURL', relative_url)
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
    activateORdeactivateRDEById({ commit }, payload) {
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
                window.location.replace("/home")

            }).catch(err => {
                reject(err)
            })
        })
    },
    // CV
    uploadCVById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile_cv/'
            
            api.post(relative_url, payload, {headers:{'Content-Type':'multipart/form-data'}}).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    fetchRDEcv({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile_cv/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile_cv/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // deployment report
    // eslint-disable-next-line no-unused-vars
    uploadReportById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/deployment-report/'
            
            api.post(relative_url, payload, {headers:{'Content-Type':'multipart/form-data'}}).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // eslint-disable-next-line no-unused-vars
    fetchReport({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/deployment-report/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/deployment-report/" + payload
            }
            api.get(relative_url).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    
    // deployments
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
    deployRDEAfterPreProcessing({ commit }, payload) {
        console.log('payload:',payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/deployment/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/deployment/" + payload.deploymentId+'/'
            }
            delete payload.outbreak_id
            delete payload.deploymentId
            delete payload.profile_id
            api.patch(relative_url, payload).then(resp => {
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
                relative_url = "/deployment/" + payload.deployment_id + "/"
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
    getRDEprofileDeployment({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/get_profile_deployments/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/get_profile_deployments/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    
    //approvals
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
                console.log('')
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
    
    // recommendations
    recommendToRDE({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/recommendation/'
            if (payload === undefined) {
                payload = ''
            } else {
                console.log('patchUrl', relative_url)
            }
            api.post(relative_url, payload).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
      // academic qualifications
    postRDEQualification({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile-academic-qualification/'
            if (payload === undefined) {
                payload = ''
            } else {
                console.log('patchUrl', relative_url)
            }
            api.post(relative_url, payload).then(resp => {
                commit("setQualification", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    fetchRDEQualificationById({ commit }, payload) {
        console.log('payload',payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/profile-academic-qualification/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile-academic-qualification/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setQualification", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    updateRDEQualificationById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile-academic-qualification/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile-academic-qualification/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, payload).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // eslint-disable-next-line no-unused-vars
    deleteRDEQualificationById({ commit }, payload) {
        console.log('payload',payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/profile-academic-qualification/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile-academic-qualification/" + payload
            }
            api.delete(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
                window.location.replace("/rde-self-profile")

            }).catch(err => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    fetchQualificationsById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile-academic-qualification/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = '/profile-academic-qualification/?'+payload 
            }
            api.get(relative_url).then(resp => {
                commit("setRDE", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // experience
    // eslint-disable-next-line no-unused-vars
    postRDEExperienceById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            console.log("reached")
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.id + "/"
                delete payload.id
            }
            api.patch(relative_url, {'professional_experience':payload.data}).then(resp => {
                commit("setExperience", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
     // eslint-disable-next-line no-unused-vars
     updateRDEExperienceById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, payload).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // eslint-disable-next-line no-unused-vars
    deleteRDEExperienceById({ commit }, payload) {
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
                window.location.replace("/rde-self-profile")

            }).catch(err => {
                reject(err)
            })
        })
    },

    // reference
    postRDEReferenceById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, {'references':payload.data}).then(resp => {
                commit("setReference", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    postRDEPreviousDeploymentById({ commit }, payload) {
        console.log('deployment',payload)
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, {'previous_deployment_experience':payload.data}).then(resp => {
                commit("setReference", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // eslint-disable-next-line no-unused-vars
    updateRDEReferenceById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/profile/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/profile/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.patch(relative_url, payload).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // eslint-disable-next-line no-unused-vars
    deleteRDEReferenceById({ commit }, payload) {
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
                window.location.replace("/rde-self-profile")

            }).catch(err => {
                reject(err)
            })
        })
    },
    // accept or reject deployment
    // eslint-disable-next-line no-unused-vars
    acceptOrRejectDeploymentById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            console.log("payload:",payload)
            let relative_url = '/deployment/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/deployment/" + payload.id + "/"
                delete payload.id
            }            
            console.log(relative_url)
            // 
            api.patch(relative_url, 
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


}

const mutations = {
    setStats: (state, stats) => (state.stats = stats),
    setRDES: (state, RDES) => (state.RDES = RDES),
    setRDE: (state, RDE) => (state.RDE = RDE),
    setSignUpData: (state, signUpData) => (state.signUpData = signUpData),
    setDeployments: (state, deployments) => (state.deployments = deployments),
    setDeployment: (state, deployment) => (state.deployment = deployment),
    setQualification: (state, qualification) => (state.qualification = qualification),
    setExperience: (state, experience) => (state.experience = experience),
    setReference: (state, reference) => (state.reference = reference),
}


export default {
    state,
    getters,
    actions,
    mutations,
}