<template>
      <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        class="flex-1 h-full max-w-4xl mx-auto overflow-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 overflo"
      > 
        <div class="flex flex-col overflow-y-auto md:flex-row">          
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div class="w-full">
              <h1
                class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Create account
              </h1>
              <form @submit.prevent="createUserAccount">               
                <div class="grid grid-cols-3 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">First Name</span>
                    <input
                      v-model="first_name"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Last Name</span>
                    <input
                      v-model="last_name"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Username</span>
                    <input
                      v-model="username"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                </div>
              
                <div class="grid grid-cols-2 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Email</span>
                    <input
                      v-model="email"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="***************"
                      type="email"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Phone number</span>
                    <input
                    v-model="phone_number"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="***************"
                      type="tel"
                      required
                    />
                  </label>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">Password</span>
                    <input
                    v-model="password"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="***************"
                      type="password"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">
                      Confirm password
                    </span>
                    <input
                    v-model="password_confirm"                  
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="***************"
                      type="password"
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
                <div class="flex mt-6 text-sm">
                  <label class="flex items-center dark:text-gray-400">
                    <input
                      type="checkbox"
                      class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      required
                    />
                    <span class="ml-2">
                      I agree to the
                      <span class="underline">privacy policy</span>
                    </span>
                  </label>
                </div>

                <!-- You should use a button here, as the anchor is only used for the example  -->
                <button
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  @click="createUserAccount"
                >
                  Create account
                </button>
              </form>

              <hr class="my-8" />        
              <p class="mt-4">              
                <router-link class="w-full" to="/login"><span class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Already have an account? Login</span></router-link>
              </p>
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
      first_name: 'Jane',
      last_name: 'Doe',
      username: 'JaneDoe',
      phone_number: '0712345678',
      email: 'jane.doe@gmail.com',
      password: 'jane',
      password_confirm:'jane',
      groups: [],
      showSidebar: false
    }
  },
  methods: {
    ...mapActions(['signUp']),
    createUserAccount() {
      let payload = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        phone_number: this.phone_number,
        email: this.email,
        groups: this.groups,
        staff_number: this.staff_number,
        password: this.password
      }
      // eslint-disable-next-line no-unused-vars
      this.signUp(payload).then(resp => {
        window.location.replace("/rde-self-registration-form")
      }).catch(err => {
        console.log(err)
      })

    }

  },
  computed:{
    ...mapGetters(['getErrorMessage','getCurrentToken']),
  },
  mounted() {
  }
}
</script>