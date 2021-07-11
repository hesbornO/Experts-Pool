<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900" id="app">
    <div class="flex flex-col flex-1 w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

// import Login from '@/pages/Login'
import api from "@/api";
import axios from "axios";
import router from "@/routes";
export default {
  name: 'App',
  components: {
  //  Login,
  },
  created: function () {    
    //check if user is logged in
    api.interceptors.request.use((config) => {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
      return config;
    });
    api.interceptors.response.use( undefined, function (err) {
      return new Promise(function () {
        if (err.response.status === 401) {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          console.log("redirect")
          router.push('/login')
        }
        throw err;
      });
    });
  },
}
</script>
