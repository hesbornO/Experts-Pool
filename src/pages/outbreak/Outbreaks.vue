<template>
  <dashboard_layout page_title="Outbreaks">
<!--    <div class="grid gap-2">-->
<!--      <div class="flex w-56 items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">-->
<!--        <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">-->
<!--          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round"-->
<!--                  stroke-width="2"></path>-->
<!--          </svg>-->
<!--        </div>-->
<!--        <div class="col-span-2">-->
<!--          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">-->
<!--            Total RDEs-->
<!--          </p>-->
<!--          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">-->
<!--            137-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="mb-3 flex flex-row justify-end">      
      <router-link
          :to="{name:'CreateOutbreak', params:{}}"
          class="btn btn-blue  text-xs"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
        </svg>
        <span class="px-1">Add Outbreak</span>
      </router-link>
    </div>
     <div class="grid grid-cols-3">
      <span></span>
      <span class="grid grid-cols-2 ">
      </span>
    </div>
    <!-- Outbreaks List -->
    <data_table v-bind="$attrs">
      <template v-slot="{item}">        
        <td class="px-4 py-3 text-sm">{{item.name }}</td>
        <td class="px-4 py-3 text-sm">{{ item.description }}</td>
        <td class="px-4 py-3 text-sm" v-if="item.competencies">
          <span v-for="(competency,index) in item.competencies" :key="index">
            <span v-if="competency.name" class="capitalize">
              {{index+1 +'. '+ competency.name}}
            </span>
          </span>
        </td>
        <td class="px-4 py-3 text-sm capitalize">{{ item.severity }}</td>
        <td class="px-4 py-3 text-sm" v-if="item.affected_regions">
          <span v-for="(region,index) in item.affected_regions" :key="index">
            <span v-if="region.name" class="capitalize">
              {{index+1 +'. '+region.name}}
            </span>
          </span>
        </td>
        <td class="px-4 py-3 text-sm">{{item.start_date}}</td>
        <td class="px-4 py-3 text-sm">{{item.end_date}}</td>
        <td class="px-4 py-3 text-sm flex flex-row space-x-1">          

          <router-link
              :to="{name:'UpdateOutbreak', params:{outbreakId:item.id, outbreakName: item.name}}"
              class="btn btn-green h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span class="px-1">Update</span>
          </router-link>
          <router-link
              :to="{name:'DeleteOutbreak', params:{outbreakId:item.id, outbreakName: item.name}}"
              class="btn btn-red h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span class="px-1">Delete</span>
          </router-link>
        </td>
      </template>
    </data_table>
    <!-- End Outbreaks List-->
    <router-view></router-view>

  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate";


// import Datepicker from 'vuejs-datepicker';


export default {
  name: "Outbreaks",
  components: {
    data_table,
    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      add_outbreak: false,
      search: '',
      status: '',
      countries: '',
      specializations: '',
      form:{},
      Outbreaks:{}
    }
  },
  methods: {
    ...mapActions([ 'fetchAllOutbreaks','fetchOutbreakById','deleteOutbreakById']),
    ...mapGetters(['getCurrentToken']),
   
    getOutbreaks(){
        this.$store.dispatch('fetchAllOutbreaks').then(resp => {
        this.Outbreaks = resp;  
      }).catch(err => {
        console.log(err);
      })
    },
    getOutBreakById(OutbreakID){    
      this.fetchOutbreakById(OutbreakID).then(resp=>{            
          this.form= resp
      })
    }
    
    

  },
  mounted() {
    this.getOutbreaks()

  },
  computed: {}
};
</script>

<style>
  .btn{
    @apply justify-center transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 text-sm font-medium leading-5  border border-transparent rounded-md focus:outline-none capitalize flex
  }
  .btn-blue{
    @apply bg-havelock-blue-200 text-havelock-blue-700 hover:bg-havelock-blue-700 hover:text-white
  }
  .btn-red{
    @apply bg-red-200 text-red-700 hover:bg-red-700 hover:text-white
  }
  .btn-green{
    @apply bg-green-200 text-green-700 hover:bg-green-700 hover:text-white
  }
</style>
