<template>
  <dashboard_layout page_title="Occupations">

    <div class="mb-3 flex flex-row justify-end">      
      <router-link
          :to="{name:'CreateOccupation', params:{}}"
          class="btn btn-blue  text-xs"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
        </svg>
        <span class="px-1">Add Occupation</span>
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
        <td class="px-4 py-3 text-sm capitalize">{{item.name }}</td>
        <td class="px-4 py-3 text-sm capitalize">{{ new Date(item.created_at).toLocaleDateString() +' at '+ new Date(item.created_at).toLocaleTimeString() }}</td>
        <td class="px-4 py-3 text-sm capitalize">{{ new Date(item.updated_at).toLocaleDateString() +' at '+ new Date(item.updated_at).toLocaleTimeString() }}</td>
        <td class="px-4 py-3 text-sm flex flex-row space-x-1">   
          <router-link
              :to="{name:'UpdateOccupation', params:{occupationId:item.id, occupationName: item.name}}"
              class="btn btn-green h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span class="px-1">Update</span>
          </router-link>
          <router-link
              :to="{name:'DeleteOccupation', params:{occupationId:item.id, occupationName: item.name}}"
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
      competencies:{}
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
