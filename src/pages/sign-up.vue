<template>
      <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        class="flex-1 h-full max-w-4xl mx-auto overflow-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 overflow"
      > 
        <div class="flex flex-col overflow-y-auto md:flex-row">          
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div class="w-full">
              <h1
                class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Create account
              </h1>
              <FormulateForm v-model="form" @submit="createUserAccount">               
                <div class="grid grid-cols-3 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">First Name</span>
                    <FormulateInput
                      name="first_name"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Last Name</span>
                    <FormulateInput
                      name="last_name"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Username</span>
                    <FormulateInput
                      name="username"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                </div>
              
                <div class="grid grid-cols-3 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Email</span>
                    <FormulateInput
                      name="email"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="john@example.com"
                      type="email"
                      validation="email|required"
                      error-behavior="value"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Phone number</span>
                    <FormulateInput
                    name="phone_number"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="+25512345678"
                      type="tel"
                      required
                    />
                  </label>
                   <!-- Region -->
                <label class="block mt-4 text-sm">
                  <span class="text-gray-700  font font-semibold dark:text-gray-400">Region of Residence</span>
                  <div
                      class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                  >
                    <select name="attached_region_id" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="select"
                    v-model="form.attached_region_id" id="region"> 
                      <option value="" disabled selected>--Select region--</option>     
                      <option v-for="(region,index) in regions" :key="index" :value="region.id">{{region.name}}</option>
                    </select>
                    <span v-if="getErrorMessage['attached_region_id']">
                      <span v-if="getErrorMessage['attached_region_id'].length>0">
                        <span v-for="(error,index) in getErrorMessage['attached_region_id']" :key="index">
                          <span class="text-red-500 animate-pulse">{{error}}</span>
                        </span>
                      </span>
                    </span> 
                    <div
                        class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
                    >
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                  </div>
                </label> 
                <!-- End of Region -->
                </div>

               


                <div class="grid grid-cols-2 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Password</span>
                    <span class="flex">
                      <FormulateInput
                      name="password"
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="***************"
                        :type="passwordFieldType"
                        validation='between:6,20,length|required'
                      />
                      <button type="password" @click="switchVisibility('password')" class="h-2/3 rounded-md bg-blue-100 pt-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordFieldType==='password'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordFieldType==='text'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                      </button>
                    </span>
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">
                      Confirm password
                    </span>
                    <span class="flex">
                      <FormulateInput
                      name="password_confirm"     
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="***************"
                        :type="passwordConfirmFieldType"
                        validation="required|confirm|between:6,20,length"
                        validation-name="Confirmation"
                        error-behavior="value"
                      />
                      <button type="password" @click="switchVisibility('password_confirm')" class="h-2/3 rounded-md bg-blue-100 pt-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordConfirmFieldType==='password'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordConfirmFieldType==='text'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                      </button>
                    </span>
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
                <div class="flex mt-6 text-sm">
                  <label class="flex items-center dark:text-gray-400">
                    <FormulateInput
                      type="checkbox"
                      v-model="form.privacy_policy"
                      class="text-purple-600 form-checkbox mt-4 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      required

                    />
                    <span class="ml-2 ">
                      I agree to the
                      <span class="underline text-blue-400"><a href="https://www.eac.int/privacy#:~:text=The%20East%20African%20Community%20is%20committed%20to%20user%20privacy.&text=If%20the%20user%20specifically%20provides,be%20published%20for%20general%20access." target="_blank">privacy policy</a></span>
                    </span>
                  </label>
                </div>

                <!-- You should use a button here, as the anchor is only used for the example  -->
                <button
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  type="submit"
                >
                  Create account
                </button>
              </FormulateForm>

              <hr class="my-8" />        
              <p class="mt-4">              
                <router-link class="w-full" to="/"><span class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Already have an account? Login</span></router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {api_url} from "../utils/constants"

const axios = require('axios').default;

export default {
  name:'sign-up',
  components:{
    
  },
  data() {
    return {
      form:{
        groups:[],
        attached_region_id:''
      },
      password:'',
      passwordFieldType:'password',
      passwordConfirmFieldType:'password',
      showSidebar: false,
      regions: [],

    }
  },
  methods: {
    ...mapActions(['signUp','login','fetchRegions']),
    createUserAccount() {
    
      // eslint-disable-next-line no-unused-vars
      this.signUp(this.form).then(resp => {
        // window.location.replace("/rde-self-registration-form")     
        let login_payload = {
          username: this.form.username,
          password: this.form.password
        }
        // eslint-disable-next-line no-unused-vars
        this.login(login_payload).then(resp => {
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

      }).catch(err => {
        console.log(err)
      })

    },
    switchVisibility(field_name){
      if(field_name==='password'){
        this.passwordFieldType = this.passwordFieldType ==='password'?'text':'password';
      }else if(field_name==='password_confirm'){
        this.passwordConfirmFieldType = this.passwordConfirmFieldType ==='password'?'text':'password';
      }else{
        alert('Unknown field type')
      }
    },
     getRegions() {
      axios.get(api_url+'region/')
        .then(resp=>{
          this.regions = resp.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  

  },
  computed:{
    ...mapGetters(['getErrorMessage','getCurrentToken']),
   
  },
  mounted() {
    this.getRegions()

  }
}
</script>