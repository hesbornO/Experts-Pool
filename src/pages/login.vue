<template>
  <div class="grid grid-cols-3 items-center h-screen p-6 bg-gray-50 dark:bg-gray-900 w-full">
    <div class="col-start-2 col-end-">
      <div class="flex-1 h-min max-w-4xl mx-auto overflow-auto bg-white rounded-md shadow-xl dark:bg-gray-800"> 
        <div class="flex flex-col overflow-y-auto md:flex-row rounded-md">        
          <div class="flex items-center justify-center pl-4 sm:p-8 md:w-full">
            <div class="w-full "> 
              <div class="">
                  <!-- <div class="pt-0 flex justify-center">-->
                  <!-- <img class=" w-28" src="../assets/img/eac_logo.png"-->
                  <!--  alt="EAC Logo"-->
                  <!--  />-->
                  <!--  </div>-->
                  <!-- <div class="text-2xl font-bold py-4 flex items-center justify-center">EAC RDE</div>-->

              </div>
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form @submit.prevent="userLogin">
                <label class="block text-sm ">
                  <span class="text-gray-700 dark:text-gray-400">Username</span>
                  <input v-model="username" type="text"
                        placeholder="Jane Doe" class="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        />
                </label>
                <label class="block mt-4 text-sm">
                  <span class="text-gray-700 dark:text-gray-400">Password</span>
                  <input v-model="password"
                        class="block w-full mt-1 text-sm rounded-md dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray "
                        placeholder=""
                        type="password"
                        required
                        />
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
                <button class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" @click="userLogin">
                  Log in
                </button>
              </form>
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
      username: '',
      password: '',
      transactions:[],
      showSidebar: false
    }
  },
  methods: {
    ...mapActions(['login']),
    userLogin() {
      let payload = {
        username: this.username,
        password: this.password
      }
      // eslint-disable-next-line no-unused-vars
      this.login(payload).then(resp => {
        window.location.replace("/home")
      }).catch(err => {
        console.log(err)
      })

    }

  },
  computed:{
    ...mapGetters(['getCurrentToken','getErrorMessage']),
  },
  mounted() {
  }
}
</script>