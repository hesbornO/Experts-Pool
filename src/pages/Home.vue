<template>
  <dashboard_layout page_title="Home">

    <div class="w-full overflow-hidden shadow-xs ">
      <div class="w-full overflow-x-auto ">
        <div class="w-full flex flex-row bg-gray-50 py-4 p-4 mb-4 rounded-md space-x-4">
          <div class="flex flex-row space-x-8 w-10/12">
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Occupation</p>
              <select
                  v-model="selected_occupation"
                  :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2  form-select w-full']"
                  name="occupation" @change="addQueryParams('occupation', selected_occupation)">
                <option selected value="">All</option>
                <option v-for="(occupation,index) in allOccupations" :value="occupation.id" :key="index">
                  {{ occupation.label }}
                </option>
              </select>
            </div>
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Country</p>
              <select v-model="selected_country"
                      :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2 w-full']"
                      name="country" placeholder="--select country--" @change="addQueryParams('country', selected_country)"> 
                <option selected value="">All</option>
                <option v-for="(country,index) in allCountries" :key="index" :value="country.value">
                  {{ country.label }}
                </option>
              </select>
            </div>
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Status</p>
              <select v-model="selected_status"
                      :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2 w-full']"
                      name="status" placeholder="select status" @change="addQueryParams('status', selected_status)">
                <option class="bg-white" selected value="">All</option>
                <option v-for="(status,index) in approvalStatuses" :key="index" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>
            <div class="flex flex-col justify-end ">
              <button
                  class="btn btn-blue "
                  @click="filter()">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <span class="px-1">Filter</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col w-2/12 justify-end ">
            <!-- <router-link
                :to="{name: 'CreateRDE'}"
                class="btn btn-blue">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="px-1">Add RDE</span>
            </router-link> -->
          </div>
          <router-view></router-view>

        </div>


        <!-- RDE List -->
        <data_table v-bind="$attrs">
          <template v-slot="{item}">
            <td class="px-4 py-3 text-sm capitalize">
              <span v-if="item.application_status==='approved_by_partner_state'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
              <span v-if="item.application_status==='approval_complete'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
              
              {{ item.last_name ? item.last_name : ''}}, {{item.first_name ? item.first_name : '' }}
            </td>
            <td class="px-4 py-3 text-sm capitalize">{{ item.occupation ? item.occupation.name : '' }}</td>
            <td class="px-4 py-3 text-sm capitalize">
              {{ item.region_of_residence ? item.region_of_residence.name: '' }}{{item.region_of_residence.country.name?', '+ item.region_of_residence.country.name:''}}
            </td>
            

            <td class="px-4 py-3 text-sm capitalize">{{ item.current_deployment ? item.current_deployment : 'None' }}
            </td>
            <td class="px-4 py-3 text-sm capitalize">
              <span v-if="item.competencies_objects">
                <span v-for="(competency,index) in item.competencies_objects" :key="index">
                  {{ competency.name ? competency.name : '' }}<span
                    v-if="index+1<item.competencies_objects.length">, </span>
                </span>
              </span><br>
            </td>
            <td :class="['capitalize italic px-4 py-3 text-sm leading-tight font-mono rounded-md  font-semibold',item.application_status=='pending_approval'?'text-yellow-700  dark:text-yellow-100':item.application_status=='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':item.application_status=='approval_complete'?'text-green-700  dark:text-green-100':item.application_status=='deployed'?'text-purple-700 dark:text-purple-100':'']">
              {{ item.application_status? item.application_status.replace(/[_-]/g, " ") : '' }}
            </td>
            <td class="px-4 py-3 text-sm flex flex-row space-x-1">   
              <split-button :optional="createOptional(item)" :primary="createPrimary(item)" class="w-32 md:w-48 " />                   
         <!-- BUTTTOOOOOONS -->
                
              <!-- <router-link
                  :to="{name:'rdeProfile', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-indigo items-center text-xs"
              >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>
                  <span class="px-1">View Profile</span>
              </router-link> -->
              <!-- <router-link
                  :to="{name:'partnerStateApproval', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-blue h-1/2 text-xs"
                  v-if="item.application_status === 'pending_approval'"

              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="px-1">Partner State approval</span>
              </router-link> -->
              
              <!-- <router-link
                  :to="{name:'eacApproval', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-blue h-1/2 text-xs"
                  v-if="item.application_status === 'approved_by_partner_state'"

              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="px-1">EAC Approval</span>
              </router-link> -->
              <!-- <router-link
                  :to="{name:'eacDisapproval', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-orange h-1/2 text-xs"
                  v-if="item.application_status === 'approval_complete'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="px-1">EAC Disapproval</span>
              </router-link> -->
              <!-- <router-link
                  :to="{name:'partnerStateDisapproval', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-orange h-1/2 text-xs"
                  v-if="item.application_status === 'approved_by_partner_state'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="px-1">Partner State Disapproval</span>
              </router-link> -->
              
              
                 <!-- CV preview modal -->
               <div :class="[viewPdf?'fixed z-1 inset-0':'hidden']" >
                <div class="flex items-end  min-h-full text-center sm:block ">            
                  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                  <!-- This element is to trick the browser into centering the modal contents. -->
                  <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                  <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:max-h-7xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div class="h-96">                 
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Uploaded CV
                          </h3>
                          <div class="h-96" v-if="item.cv">                      
                            <vue-pdf-app :pdf="item.cv" :class="['min-w-7xl min-h-7xl px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']"></vue-pdf-app>                      
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-150 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button></button>
                      <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-red-400 hover:bg-red-600  font-semibold text-lg text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-base uppercase" @click="togglePdfDisplay">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of CV preview modal -->

            </td>
          
          </template>
        </data_table>
        <!-- end of list -->

      </div>


    </div>


  </dashboard_layout>
</template>

<script>
import {mapActions} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import data_table from "../components/layouts/DataTableTemplate";
import SplitButton from "../components/buttons/SplitButton.vue";



// pdf
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";


export default {
  name: "RDES",
  components: {

    dashboard_layout,
    data_table,
    VuePdfApp,
    SplitButton

  },
  data() {
    return {
      register_prequalified_rde: false,
      search: '',
      selected_status: '',
      selected_country: '',
      selected_occupation:'',
      query_list:[],
      my_argument:'',
      viewPdf: false,
      allCountries: [],
      allOccupations: [],
      RDES: [],
      approvalStatuses: [
        {label: 'Pending Approval', value: 'pending_approval'},
        {label: 'Approved by Partner State', value: 'approved_by_partner_state'},
        {label: 'Approval Complete', value: 'approval_complete'},
      ],
      
      specializations: '',
      form: {},
      update_rde_details: false,
      fileUploaded: 0,
      query:{my_key:''}


    }
  },
  methods: {
    createPrimary(item) {
      return {
        to: { name: "rdeProfile", params: { rdeId:item.id, rdeName: item.last_name } },
        label: "View Profile",
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>`,
      };
    },
    createOptional(item) {
      const options= [
             
      ];   
      if(item.application_status === 'pending_approval'){
        options.push({
          to:{name:'partnerStateApproval', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"PS approval",
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
        })
      }
      if(item.application_status === 'approved_by_partner_state'){
        options.push({
          to:{name:'eacApproval', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"EAC Approval",
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
        })
      }
      if(item.application_status === 'approval_complete'){
        options.push({divider:true},{
          to:{name:'eacDisapproval', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"EAC Disapproval",
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        })
      }
      if(item.application_status === 'approved_by_partner_state'){
        options.push({divider:true},{
          to:{name:'partnerStateDisapproval', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"PS Disapproval",
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        })
      }
      
      return options
    },

    ...mapActions(['fetchCountries']),
    // ...mapGetters(['getCurrentToken']),

    togglePdfDisplay() {
      this.viewPdf = !this.viewPdf;
    },
    registerPreQualifiedRDE() {
      this.register_prequalified_rde = true
    },
    closeRegisterPreQualifiedRDEModal() {
      this.register_prequalified_rde = false
    },
    closeUpdateRDEModal() {
      this.update_rde_details = false
    },
  
    processFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const file = files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const dataUri = e.target.result;
        if (dataUri) {
          this.form.cv = dataUri
          this.fileUploaded += 1
        }
      };
      reader.readAsDataURL(file);
    },   
    getAllCountries(){
       this.$store.dispatch('fetchCountries').then(resp => {
         this.allCountries = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },
    getAllOccupations(){
       this.$store.dispatch('fetchAllOccupations').then(resp => {
         this.allOccupations = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },

    // filters
    addQueryParams(my_argument, query_param){
     
      this.query_list.push({query:{my_argument: query_param}})
      // this.$router.push({path:'filter', query:{country:country_id}})
    },
    filter(){
     console.log(this.query_list)
    }

    


  },
  mounted() {
    this.getAllCountries()
    this.getAllOccupations()


  },
  computed: {
    // ...mapGetters(['allCountries', 'allRegions', 'getErrorMessage']),
    // ...mapActions(['fetchCountries', 'fetchRegions', 'fetchOccupations', 'postRDE'])
  }
};
</script>

<style>
.btn {
  @apply justify-center transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 text-sm font-medium leading-5  border border-transparent rounded-md focus:outline-none capitalize flex
}
.hover-animation{
  @apply transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105
}

.btn-blue {
  @apply bg-havelock-blue-200 text-havelock-blue-700 hover:bg-havelock-blue-700 hover:text-white 
}

.btn-red {
  @apply bg-red-200 text-red-700 hover:bg-red-700 hover:text-white
}

.btn-green {
  @apply bg-green-200 text-green-700 hover:bg-green-700 hover:text-white
}
.btn-orange {
  @apply bg-orange-200 text-orange-700 hover:bg-orange-700 hover:text-white
}
.btn-indigo {
  @apply bg-indigo-200 text-indigo-700 hover:bg-indigo-700 hover:text-white
}
.btn-yellow {
  @apply bg-yellow-200 text-yellow-700 hover:bg-yellow-700 hover:text-white
}
</style>
