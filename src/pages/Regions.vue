<template>
  <dashboard_layout page_title="">      
      <router-link
        v-if="$routerHistory.hasPrevious()"
        :to="{ path: $routerHistory.previous().path }">
        GO BACK
    </router-link>
    <!-- REGIONS -->

     <div class="grid col-span-2 items-center rounded-lg shadow-xs dark:bg-gray-800 py-3">          
        <div class="flex justify-between">
          <div class=""></div>             
          <div class="">
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex" @click="openAddRegionForm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="px-1">Add Region</span>
            </button>
          </div>
        </div>
      </div>
    <div v-if="filteredRegions.length>0" class="py-3 w-full ">
    
      <span class="uppercase text-blue-500 font-mono">[CODE:{{filteredRegions[0].country.phone_code}}] Regions in {{filteredRegions[0].country.name}} </span>
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th class="px-4 py-3 w-1/2 border border-l">Name</th>
            <th class="px-4 py-3 w-1/2 border border-l">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 w-full">
          <tr class="text-gray-700 dark:text-gray-400 border" v-for="(region,index) in filteredRegions" :key="index">
            <td class="px-4 py-3 w-1/2 border border-l">              
              <p>
                <span class="px-2">{{index+=1}}. </span>
                <span>{{region.name}}</span>                
              </p>              
            </td>
            <td class="px-4 py-3 w-1/2  flex justify-between gap-4">            
                  <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-green-100 text-green-500 rounded-lg active:bg-green-600 hover:bg-green-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex " @click="getRegionById(region.id)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    <span class="px-1">Update</span>
                  </button>
                  <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-red-300 text-red-500 rounded-lg active:bg-red-600 hover:bg-red-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex" @click="deleteRegion(region.id)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="px-1">Delete</span>
                  </button>
            </td>
          </tr>

        </tbody>

      </table>
    </div>
    <div v-else class="font-semibold text-yellow-500">
      No regions found!! Please add some regions...
    </div>



<!-- REGIONS -->
<!-- Add region modal form-->
      <div :class="[add_region?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:max-h-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start ">
              
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium flex justify-center uppercase text-blue-600" id="modal-title">
                    Add Region
                  </h3>
                  <div class="mt-2 ">
                        <label class="block mt-4 text-sm w-full">
                            <span class="text-gray-700  font font-semibold dark:text-gray-400">Region Name</span>
                            <!-- focus-within sets the color for the icon when input is focused -->
                            
                            <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <input type="text"
                                        class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="e.g. Arusha"
                                        name="name"
                                        validation="required"
                                        v-model="form.name"
                                />
                                <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
                                </div>
                            </div>
                        </label>                       
                </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase" @click="postCountryRegion()">
                Submit
              </button>
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto " @click="closeAddRegionForm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- End of add region form modal -->    
    
    <!-- Update region modal form-->
      <div :class="[update_region?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:max-h-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start ">
              
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium flex justify-center uppercase text-blue-600" id="modal-title">
                    Update Region
                  </h3>
                  <div class="mt-2 grid grid-cols-2 gap-4">
                    <label class="block mt-4 text-sm col-span-1">
                        <span class="text-gray-700  font font-semibold dark:text-gray-400">Region Name</span>
                        <!-- focus-within sets the color for the icon when input is focused -->
                        
                        <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                            <input type="text"
                                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                    placeholder="e.g. Tanzania"                                        
                                    name="name"
                                    validation="required"
                                    v-model="form.name"
                            />
                            <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
                            </div>
                        </div>
                    </label>
                </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase" @click="postRegionUpdateById(form.id)">
                Submit
              </button>
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto " @click="closeUpdateRegionForm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- End of update member country form modal -->
<!-- END OF REGIONS -->

  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
// import Datepicker from 'vuejs-datepicker';

// formulate
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)

import Router from 'vue-router'
import VueRouterBackButton from 'vue-router-back-button'

Vue.use(Router)

const router = new Router({
    routes: []
})

Vue.use(VueRouterBackButton, { router })


export default {
  name: "Regions",
  components: {

    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      form:{
          name:'',
          country_id:''
      },    
      search: '', 
      update_member_country:false,   
      regions: {},
      add_region:false,   
      update_region:false,   
      filteredRegions: [],

    }
  },
  methods: {
    ...mapActions(['postRegion','fetchRegionById','updateRegionById','deleteRegionById']),
    getCurrentRegions(){
        let selectedRegions = []
        selectedRegions = this.allRegions.filter(region=>{
            return region.country.id ===  this.$route.params.countryId
        });
        this.filteredRegions = selectedRegions;
        
    },
    openAddRegionForm(){
      this.add_region = true      
    },
    closeAddRegionForm(){
      this.add_region = false      
    },
    displayUpdateRegionForm(){            
      this.update_region = true
    },    
    closeUpdateRegionForm(){      
      this.update_region = false
    },
    postCountryRegion(){      
      let payload = {
        name:this.form.name,
        country_id:this.$route.params.countryId
      }
      this.postRegion(payload).then(resp=>{
        this.$store.dispatch('setError',{})
        window.location.replace(`/member-countries/${this.$route.params.countryId}/${this.$route.params.countryName}/regions`)
            console.log(resp)
      })      
      this.add_region = false;
    },     
    postRegionUpdateById(regionId){
        let payload = {
          id:regionId,
          name:this.form.name,
          country_id:this.$route.params.countryId
        }
        this.updateRegionById(payload).then(resp=>{
                window.location.replace(`/member-countries/${this.$route.params.countryId}/${this.$route.params.countryName}/regions`)
                console.log(resp)
        })

    }, 
    getRegionById(regionId){
        this.update_region = true;
        this.fetchRegionById(regionId).then(resp=>{            
            this.form= resp
            console.log(this.form)
        })
    },  
    deleteRegion(regionId){         
      console.log('region Id',regionId)
        this.deleteRegionById(regionId).then(
            
        )
    },   
    // end of regions
      
  },
  mounted() {    
    this.getCurrentRegions()
    },
  computed: {
      ...mapGetters(['allRegions','getErrorMessage'])

  }
};
</script>
