<template>
  <div class="md:grid md:grid-cols-3 items-center h-screen p-6 bg-gray-50 dark:bg-gray-900 w-full">
    <div class="col-start-2 col-end-">
      <div class="flex-1 h-min max-w-4xl mx-auto overflow-auto bg-white rounded-md shadow-xl dark:bg-gray-800"> 
        <div class="flex flex-col overflow-y-auto md:flex-row rounded-md">        
          <div class="flex items-center justify-center pl-4 sm:p-8 md:w-full">
            <div class="w-full "> 
              <div class="md:text-xs">
                   <div class="flex justify-end">
                     <router-link class="w-full" to="/"><span
                        class="capitalize text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">{{activeLanguage.store.titles.home_page_title}}</span>
                    </router-link>
                     <span class="">
                       <select v-model="selected_language"  name="language" class="bg-blue-50 rounded-sm border border-gray-300 text-gray-600 px-4 focus:border-blue-100 form-select w-28">
                        <option v-for="(language, index) in allLanguages" :key="index" :value="language.name" class="px-2">{{language.name}}</option>
                      </select>
                     </span>
                   </div>
                    <div class="pt-0 flex justify-center">
                     <img class=" w-28" src="../assets/img/eac_logo.png" alt="EAC Logo"/>
                    </div>
                    <div class="text-2xl font-bold py-4 ">
                      <p class="flex items-center justify-center md:text-xs">EAC</p>  
                      <p class="flex items-center justify-center md:text-xs"> Rapidly Deployable Experts</p>
                    </div>

              </div>
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                {{activeLanguage.store.login_form.recover_password}}
              </h1>
              <FormulateForm  v-model="form" @submit="recoverPassword" class="">
                <div class="">                
                  <label class="block text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.login_form.username}}</span>
                    <FormulateInput name="username" type="text"
                          placeholder="" class="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          required
                          />
                  </label>                  
                </div>

                <span class="text-xs text-red-400 mt-6" v-for="(key, index) in Object.keys(getErrorMessage)" :key="index">
                  <span v-if="key!=='detail'">
                    <span v-for="(detail_key, index) in Object.keys(getErrorMessage[key])" :key="index">
                      <span class="capitalize">{{key}}</span> : {{getErrorMessage[key][detail_key]}}
                    </span>
                  </span>
                  <span v-else>
                    {{getErrorMessage.detail}}
                  </span>
                </span>

                <!-- You should use a button here, as the anchor is only used for the example  -->
                <p>{{check_email}}</p>
                <button :class="['block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ',submitting?'opacity-75 cursor-not-allowed':'']" type="submit" v-bind:disabled="submitting" title="Click to recover password">
                  {{activeLanguage.store.login_form.recover_password}}
                </button>
              </FormulateForm>
              <hr class="my-8"/>
              <p class="mt-4">
                
              </p>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      form:{
        username: '',
      },
      passwordFieldType:'password',
      showSidebar: false,
      submitting: false,
      selected_language:'',
      check_email:''
    }
  },
  methods: {
    ...mapActions(['requestPasswordChange']),
    recoverPassword() {
      this.submitting = true  
      // eslint-disable-next-line no-unused-vars
      console.log(this.form)
      this.requestPasswordChange(this.form).then(resp => {
        this.check_email=`Please check the registered email for '${this.form.username}' for further instructions`
        console.log(resp)
      }).catch(err => {
        console.log(err)
      })
      this.submitting = false
    },
    switchVisibility(e){
      e.preventDefault();     
      this.passwordFieldType = this.passwordFieldType ==='password'?'text':'password';
      
    }

  },
  computed:{
    ...mapGetters(['getCurrentToken','getErrorMessage', 'allLanguages', 'activeLanguage']),
  },
  mounted() {
    this.$store.dispatch('switchLanguage', localStorage.getItem('active_language_name'))
    this.selected_language = this.activeLanguage.name
  },
  watch: {
    selected_language: function (){
      this.$store.dispatch('switchLanguage', this.selected_language)
      // window.location.reload()
    }
  },
}
</script>