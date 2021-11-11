<template>
  <div>
    <aside
        class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block h-full"
    >
      <div class="text-gray-500 dark:text-gray-400">
        <div class=" py-3  text-center flex flex-row justify-between border-b bg-havelock-blue" >
          <router-link
              class="ml-6 text-lg font-semibold text-white dark:text-gray-200 flex flex-row justify-items-end"
              :to="{name:'home'}">
            <p>EAC RDE</p>
            <img alt="EAC Logo" class=" w-7 ml-3"
                 src="../assets/img/eac_logo.png"
            />
          </router-link>
        </div>

        <ul class="mt-6"></ul>
        <ul v-for="(fetched_route, index) in fetched_routes" :key="index" class="mt-2">
          <router-link v-slot="{href, route, navigate, isActive }"
                       :to={name:fetched_route.name}>
            <li class="relative px-6 py-3">
              <span v-if="isActive" aria-hidden="true"
                    class="absolute inset-y-0 left-0 w-1 bg-havelock-blue rounded-tr-lg rounded-br-lg"></span>
              <a :class="['inline-flex items-center w-full text-sm font-semibold ' +
                  'transition-colors duration-150 hover:text-gray-800 ' +
                   'dark:hover:text-gray-200 dark:text-gray-100', isActive ? 'text-gray-800': 'text-gray-500']" :href="href"
                 @click="navigate">
                <svg v-if="!fetched_route.icon" aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor"
                     stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                  <path
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span v-html="fetched_route.icon"></span>
                <span :class="['ml-2']">{{
                    fetched_route.verboseName ? fetched_route.verboseName : (route.name).replace(/([A-Z])/g, " $1")
                  }}</span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
// import {app_name} from "@/utils/constants";

export default {
  name: "Sidebar",
  components: {
    // app_name
  },
  data() {
    return {
      isPagesMenuOpen: false,
      isSideMenuOpen: false,
      fetched_routes: []
    };
  },
  methods: {
    togglePagesMenu() {
      if (this.isPagesMenuOpen) {
        this.isPagesMenuOpen = false;
      } else {
        this.isPagesMenuOpen = true;
      }
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
    },
  },
  created() {
    this.$router.options.routes.forEach(route => {
      if (route.showInLeftBar !== false) {
        let user_assigned_roles_string = localStorage.getItem('roles')
        let user_assigned_roles = []
        if (user_assigned_roles_string === ''){
         //if the route has no specified roles, default to rde
          user_assigned_roles.push('rde')
        }else{
          // console.log('assigned roles:', user_assigned_roles_string)
          user_assigned_roles = user_assigned_roles_string.split(',')
        }
       
        // console.log("user roles", user_assigned_roles)
        
         let matches
          
          if(route.roles === undefined){
            matches = []
          }else{
            matches = user_assigned_roles.filter(function(n) {
              return route.roles.indexOf(n) !== -1;
            });
          }
          if(matches.length > 0){
            this.fetched_routes.push({
              name: route.name,
              verboseName: route.verboseName,
              path: route.path,
              icon: route.icon,
            })
          }

      }
    })
  }
};
</script>
