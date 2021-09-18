<template>
  <dashboard_layout page_title="Outbreaks">
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
      <template v-slot="{item}" >        
        <td class="px-4 py-3 w-1/6 ">
          <span class="uppercase text-md font-mono text-orange-400 font-semibold">{{item.name?item.name:'' }} </span>
          <span class="text-black font-normal italic text-xs">{{item.severity?'(SEVERITY:'+item.severity+')':''}}</span>
        </td>
        <td class="px-4 py-3 text-sm w-2/6">
          <span class="">{{item.description?item.description:''}}</span>
           <br>
          <span class=" flex-wrap" v-if="item.competencies">
          <h5 class="text-pink-400 capitalize italic">Required Competencies</h5>
            <span v-for="(competency,index) in item.competencies_objects" :key="index">
              <span v-if="competency.name" class="capitalize">
                {{competency.name}}<span v-if="index+1<item.competencies.length">,</span>
              </span>
            </span>
          </span>
        </td>
        <td class="px-4 py-3 text-sm w-1/6" v-if="item.affected_regions">
          <span v-for="(region,index) in item.affected_regions_objects" :key="index">
            <span v-if="region.name" class="capitalize">
              {{region.name}} <span v-if="index+1 < item.affected_regions.length">, </span>
            </span>
          </span>
        </td>
        <td class="px-4 py-3 text-xs w-1/6 capitalize font-semibold">
          <span class="text-red-400">{{item.start_date?'Started on: '+item.start_date:''}}</span><br>
          <span class="text-green-400">{{item.end_date?'Ended on: '+item.end_date:''}}</span>
           
          
          <span v-if="!item.end_date">
            <router-link
              :to="{name:'OutbreakEndDate', params:{outbreakId:item.id, outbreakName: item.name}}"
                class="btn btn-green h-1/2 text-xs"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span class="px-1">Add End Date</span>
            </router-link>  
          </span>
        </td>
        
        <td class="px-4 py-3 text-sm flex flex-row space-x-1 w-1/6">          

          <router-link
              :to="{name:'ViewOutbreakDeployments', params:{outbreakId:item.id, outbreakName: item.name}}"
              class="btn btn-blue h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <span class="px-1">View Deployments</span>
          </router-link>
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

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate.vue";


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
      form:{},
      Outbreaks:{}
    }
  },
  methods: {
  },
  mounted() {

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
