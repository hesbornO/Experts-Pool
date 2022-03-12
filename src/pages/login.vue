<template>
  <div class="grid grid-cols-3 items-center h-screen p-6 bg-gray-50 dark:bg-gray-900 w-full">
    <div class="col-start-2 col-end-">
      <div class="flex-1 h-min max-w-4xl mx-auto overflow-auto bg-white rounded-md shadow-xl dark:bg-gray-800"> 
        <div class="flex flex-col overflow-y-auto md:flex-row rounded-md">        
          <div class="flex items-center justify-center pl-4 sm:p-8 md:w-full">
            <div class="w-full "> 
              <div class="">
                   <div class="pt-0 flex justify-center">
                   <img class=" w-28" src="../assets/img/eac_logo.png"
                    alt="EAC Logo"
                    />
                    </div>
                    <div class="text-2xl font-bold py-4 ">
                      <p class="flex items-center justify-center">EAC</p>  
                      <p class="flex items-center justify-center"> Rapidly Deployable Experts</p>
                    </div>

              </div>
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <FormulateForm  v-model="form" @submit="userLogin">
                <label class="block text-sm ">
                  <span class="text-gray-700 dark:text-gray-400">Username</span>
                  <FormulateInput name="username" type="text"
                        placeholder="Jane Doe" class="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        />
                </label>
                <label class="block mt-4 text-sm">
                  <span class="text-gray-700 dark:text-gray-400">Password</span>
                  <span class="flex pt-3">
                    <FormulateInput name="password"
                          class="block w-full mt-1 text-sm rounded-md dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray "
                          placeholder="**************"
                          :type="passwordFieldType"
                          validation="required|between:5,20,length"
                          />
                    <button type="password" @click="switchVisibility" class="h-2/3 rounded-md bg-purple-300 pt-2" title="View/Hide password">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordFieldType==='password'" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordFieldType==='text'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                      </button>
                  </span>
                </label>

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
                <button :class="['block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ',submitting?'opacity-75 cursor-not-allowed':'']" type="submit" v-bind:disabled="submitting" title="Click to login">
                  {{submitting?'Logging in...':'Log in'}}
                </button>
              </FormulateForm>
              <hr class="my-8"/>
              <p class="mt-4">
                <router-link class="w-full" to="/forgot-password"><span
                    class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Forgot your password?</span>
                </router-link>
              </p>
              <p class="mt-1">
                <router-link class="w-full" to="/sign-up"><span
                    class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Don't have an account? Sign Up</span>
                </router-link>
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
        password: '',
      },
      passwordFieldType:'password',
      showSidebar: false,
      submitting: false
    }
  },
  methods: {
    ...mapActions(['login']),
    userLogin() {
      this.submitting = true  
      // eslint-disable-next-line no-unused-vars
      this.login(this.form).then(resp => {
        let user_assigned_roles_string = localStorage.getItem('roles')
        let user_assigned_roles = []
        if (user_assigned_roles_string === ''){
          //if the route has no specified roles, default to rde
          user_assigned_roles.push('rde')
        }else{
          // console.log('assigned roles:', user_assigned_roles_string)
          user_assigned_roles = user_assigned_roles_string.split(',')
        }
       
        if(user_assigned_roles.includes('rde')&& user_assigned_roles.length==1){
          window.location.replace("/rde-self-profile")
        }else{
          window.location.replace("/home")
        }
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
    ...mapGetters(['getCurrentToken','getErrorMessage']),
  },
  mounted() {
  }
}
</script>