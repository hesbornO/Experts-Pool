import api from "@/api";

const state ={
    transactions:{}
}

const getters ={
    allTransactions(state){
        return state.transaction
    }
}

const actions ={
    fetchTransactions({commit}, payload){
        return new Promise((resolve, reject)=>{
            let relative_url = '/transaction/'
            if (payload === undefined){
                payload=''
            }else{
                relative_url="/transaction/"+payload
            }
            api.get(relative_url).then(resp=>{
                commit("setTransactions", resp.data)
                resolve(resp.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

const mutations ={
    setTransactions:(state, transactions) => (state.transactions=transactions)
}


export default {
    state,
    getters,
    actions,
    mutations,
}