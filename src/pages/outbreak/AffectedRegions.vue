<template>
  <dashboard_layout :page_title="`Regions affected by ${$route.params.outbreakName}`">
    <button @click="goBack()" class="btn btn-blue mb-2 flex flex-row justify-between w-24" >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      Back
    </button>

    <table v-if="affectedRegions" class="w-full whitespace-no-wrap" >
      <thead class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        <th class="px-4 py-3 ">Name</th>
        <th class="px-4 py-3 ">Country</th>
        <th class="px-4 py-3 ">Outbreak</th>
      </thead>
      <tbody v-if="affectedRegions.length>0" class="">
        <tr v-for="(region,index) in affectedRegions" :key="index" class="text-gray-700 dark:text-gray-400 border ">
          <td class="px-4 py-3 w-1/6 font-mono">{{region.name}}</td> 
          <td class="px-4 py-3 w-1/6 font-mono">{{region.country.name}}({{region.country.phone_code}})</td> 
          <td class="px-4 py-3 w-1/6 font-mono">{{$route.params.outbreakName}}</td> 

        </tr>

        
      </tbody>
    
    </table>
    
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters} from 'vuex'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';

export default {
  name: "AffectedRegions",
  components: {
    dashboard_layout,
  },
  props:{
    affectedRegions:[Object],
    showBack:{
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form: {
        name: '',
        country_id: ''
      },

    }
  },
  methods:{
    goBack(){
      this.$router.back()
    },
   
  },
  computed: {
    ...mapGetters(['getErrorMessage'])

  }
};
</script>
