<template xmlns:x-transition="http://www.w3.org/1999/xhtml">
  <header class="z-10 py-1.5 shadow-sm border-b dark:bg-gray-800 bg-havelock-blue " >
    <div
      class="container flex items-center justify-between h-full px-6 mx-auto text-white dark:text-purple-300"
    >
      <!-- Mobile hamburger -->
      <button
        class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
        v-on:click="toggleSideMenu"
        aria-label="Menu"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <!--level info-->
      <p class="capitalize">{{region}} <span class="uppercase">({{ user_level }})</span></p>
      <!--end of level info-->
      <!-- Search input -->
      <div class="flex justify-center flex-1 lg:mr-32 md:ml-4">
        <div class="relative w-full max-w-xl mr-6 focus-within:text-white">
          <div class="absolute inset-y-0 flex items-center p-2 ">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              fill="havelock-blue"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
              v-click-outside="hideSearchResults"
              @focus="toggleSearchResults"
              @keyup="searchRdes"
              class="w-full pl-8 pr-2 py-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
              type="text"
              v-model="search_term"
              placeholder="Type to search for RDE..."
              aria-label="Search"
          />
          <div v-if="show_search_results" class="bg-white flex flex-col absolute w-full text-black z-40 shadow-md rounded-md p-2 gap-y-2">
            <router-link :to="{name:'adminRdeProfile', params:{rdeId:result.id ,rdeName: result.first_name}}" v-for="(result, index) in search_results" :key="index"
                         class="cursor-pointer">
              {{result.first_name}} {{result.middle_name}} {{result.last_name}} from {{result.region_of_residence.name}}
            </router-link>
          </div>
        </div>
      </div>

      <ul class="flex items-center flex-shrink-0 space-x-6">
        
        <!-- Notifications menu -->
        <select v-model="selected_language"  class="rounded-sm border border-gray-300 text-gray-600 px-4 focus:border-blue-100 form-select w-28">
          <option v-for="(language, index) in allLanguages" :key="index" :value="language.name" class="px-2">{{language.name}}</option>
        </select>
      
        <!-- Profile menu -->
        <li class="relative">
          
          <button
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none flex gap-3"
            v-on:click="toggleProfileMenu"
            @keydown.escape="closeProfileMenu"
            aria-label="Account"
            aria-haspopup="true"
          >
          <span class="font-semibold pt-1 ">{{username}}</span>
            <span><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
          </button>
          <template v-if="isProfileMenuOpen">
            <ul
              x-transition:leave="transition ease-in duration-150"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
              v-on:click="closeProfileMenu"
              @keydown.escape="closeProfileMenu"
              class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
              aria-label="submenu"
            >
              <!-- <li class="flex">
                <a
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <span>Profile</span>
                </a>
              </li> -->
              <!-- <li class="flex">
                <a
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Settings</span>
                </a>
              </li> -->
              <li class="flex">
                <a
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  @click="userLogout"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <span>{{activeLanguage.store.actions.log_out}}</span>
                </a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Navigation',
  data() {
    return {
      isProfileMenuOpen: false,
      isNotificationsMenuOpen: false,
      isSideMenuOpen: false,
      dark: false,
      username: '',
      password: '',
      user_level:'',
      region: '',
      fullname: '',
      selected_language:'',
      search_term:'',
      search_results:[],
      show_search_results:false
    }
  },
  computed:{
    ...mapGetters(['allLanguages', 'activeLanguage']),
  },
  watch: {
    selected_language: function (){
      this.$store.dispatch('switchLanguage', this.selected_language)
      // window.location.reload()
    }
  },
  methods: {
    hideSearchResults(){
      this.show_search_results = false
    },
    toggleSearchResults(){
      this.show_search_results = !this.show_search_results
    },
    searchRdes(){
      this.$store.dispatch('fetchRDES', `?search=${this.search_term}&no_page`).then(resp=>{
        this.search_results = resp
      }).catch(err=>{
        this.$store.dispatch('setErrorMsg', err.response)
      })

    },
    toggleTheme() {
      this.dark = !this.dark;
    },
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    },
    closeNotificationsMenu() {
      this.isNotificationsMenuOpen = false
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false
    },
    userLogout(){
      localStorage.removeItem('token')
      localStorage.removeItem('full_name')
      localStorage.removeItem('username')
      localStorage.removeItem('level')
      localStorage.removeItem('region')
      localStorage.removeItem('roles')
      localStorage.removeItem('is_superuser')
      window.location.replace("/")

  },
    reloadPage(){
      location.reload()
    },
    getProfileDetails(){
     this.user_level= localStorage.getItem('level')
     this.region= localStorage.getItem('region')
     this.fullname= localStorage.getItem('fullname')
     this.username= localStorage.getItem('username')
    }
},
  directives: {
    ClickOutside
  },
  mounted() {
    this.getProfileDetails()
    this.$store.dispatch('switchLanguage', localStorage.getItem('active_language_name'))
    this.selected_language = this.activeLanguage.name
  }
}
</script>
