import api from "@/api";
const state = {
    user:{},
    token:'',
    error:{}
}

const getters ={
    getCurrentUser(state){
        return state.user
    },
    getCurrentToken(state){
        return state.token
    },
    getErrorMessage(state){
        return state.error
    }
}

const actions ={
    login({commit}, payload){
        return new Promise((resolve, reject)=>{
           api.post("/request-token/", payload).then(resp=>{
               let access_token=resp.data.access
               commit("setToken", access_token)
               localStorage.setItem('token', access_token)
               try {
                   let decoded_token = JSON.parse(atob(access_token.split('.')[1]));
                   localStorage.setItem('full_name', decoded_token.full_name)
                   localStorage.setItem('username', decoded_token.username)
                   localStorage.setItem('level', decoded_token.level)
                   localStorage.setItem('region', decoded_token.region)
                   localStorage.setItem('roles', decoded_token.roles)
                   localStorage.setItem('id', decoded_token.id)
                   localStorage.setItem('is_superuser', decoded_token.is_superuser)
                   // eslint-disable-next-line no-empty
               } catch (e) {
               }
               resolve(resp.data)
           }).catch(err=>{
               // console.log("res", err.response.data)
               commit("setError", err.response.data)
               reject(err.response.data)
           })
        });
    },
    // logout({commit}, payload){
    //     return new Promise((resolve, reject)=>{
    //         api.post("/token/", payload).then(resp=>{
    //             commit("removeToken", resp.data.access)
    //             localStorage.removeItem('token', resp.data.access)
    //             resolve(resp.data)
    //         }).catch(err=>{
    //             commit("setError", err.response.data)
    //             reject(err.response.data)
    //         })
    //     });
    // },
    setErrorMsg({commit}, payload){
      commit('setError', payload)
    }
}

const mutations ={
    setUser:(state, user) => (state.user=user),
    setToken:(state, token) => (state.token=token),
    setError:(state, error) => (state.error=error)
}


export default {
    state,
    getters,
    actions,
    mutations,
}