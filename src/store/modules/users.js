import api from "@/api";

const state = {
    userGroups: [],
    userGroup: {},
    users: [],
    user: {}
}

const getters = {
    allUserGroups(state) {
        return state.userGroups
    },
    allUsers(state) {
        return state.users
    }
}

const actions = {
    // user groups
    fetchUserGroups({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/user-groups/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/user-groups/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setUserGroups", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchUserGroupById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/user-groups/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/user-groups/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setUserGroups", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteUserGroupById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/user-groups/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/user-groups/" + payload
            }
            api.delete(relative_url).then(resp => {
                commit("setUserGroup", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postUserGroup({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/user-groups/", payload).then(resp => {
                commit("setUserGroup", resp.data)
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
    updateUserGroupById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/user-groups/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/user-groups/" + payload.id + "/"
                console.log('patchUrl', relative_url)
            }
            api.put(relative_url, payload).then(resp => {
                commit("setUserGroup", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    // end of countries


    // users
    fetchUsers({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/users/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/users/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setUsers", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetchUserById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/users/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/users/" + payload
            }
            api.get(relative_url).then(resp => {
                commit("setUser", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteUserById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/users/'

            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/users/" + payload
                console.log('delete url', relative_url)
            }
            api.delete(relative_url).then(resp => {
                commit("setUser", resp.data)
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    postUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("/users/", payload).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
    updateUserById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let relative_url = '/users/'
            if (payload === undefined) {
                payload = ''
            } else {
                relative_url = "/users/" + payload.id + "/"
            }
            api.put(relative_url, payload).then(resp => {
                commit("setUser", resp.data)
                resolve(resp.data)
            }).catch(err => {
                commit("setError", err.response.data)
                reject(err.response.data)
            })
        });
    },
}

const mutations = {
    setUserGroups: (state, userGroups) => (state.userGroups = userGroups),
    setUserGroup: (state, userGroup) => (state.country = userGroup),
    setUsers: (state, users) => (state.users = users),
    setUser: (state, user) => (state.user = user)
}


export default {
    state,
    getters,
    actions,
    mutations,
}