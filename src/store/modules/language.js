import en from '../../utils/lang/en.json'
import fr from '../../utils/lang/fr.json'

const state = {
    languages: [
        {
            'name': 'english',
            'store': en
        },
        {
            'name': 'français',
            'store': fr
        }
    ],
    active_language: {
        'name': 'english',
        'store': en
    },
}

const getters = {
    allLanguages(state) {
        return state.languages
    },
    activeLanguage(state) {
      return state.active_language
    }
}

const actions = {
    // eslint-disable-next-line no-unused-vars
    retrieveActiveLanguage({commit}, payload){
        let lang = localStorage.getItem('active_language_name')
        let local_storage_lang = state.languages.find(language =>
            lang === language
        )
        if(lang !== null){
            return local_storage_lang
        }else{
            return state.active_language
        }
    },
    switchLanguage({commit}, payload){
        localStorage.setItem('active_language_name', payload)
        commit("setLanguage", payload)
    }
}

const mutations = {
    setLanguage: (state, language_name) => (state.active_language = state.languages.find(language =>
        language.name === language_name
    ))
}


export default {
    state,
    getters,
    actions,
    mutations,
}