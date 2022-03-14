
const state = {
    languages: [
        {
            'name':'english',
            'store':'en.json'
        },
        {
            'name':'français',
            'store':'fr.json'
        }
    ],
    active_language: {
        'name':'english',
        'store':'en.json'
    },
}

const getters = {
    allLanguages(state) {
        return state.countries
    },
    activeLanguage(state){
        return state.active_language
    }
}

const actions = {
    // switchLanguage({commit}, payload){
    //     new Promise((resolve, reject)=>{
    //
    //     }).catch({
    //
    //     })
    // }
}

const mutations = {
    setLanguage: (state, language)=>(state.active_language= language)
}


export default {
    state,
    getters,
    actions,
    mutations,
}