<template>
  <dashboard_layout page_title="Home">
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
    <div class="mb-3 flex flex flex-row justify-end">
      <button
          class="btn btn-blue w-56"
          @click="registerPreQualifiedRDE()">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
        </svg>
        <span class="px-1">add pre-qualified RDE</span>
      </button>
    </div>

    <div class="w-full overflow-hidden shadow-xs ">
      <div class="w-full overflow-x-auto ">
        <div class="w-full flex flex-row bg-gray-50 py-4 p-4 mb-4 rounded-md space-x-4">
          <div class="flex flex-row space-x-8 w-10/12">
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Specialization</p>
              <select
                  v-model="specializations"
                  :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2  form-select w-full']"
                  name="specialization" @change="filterBySpecialization(specialization)">
                <option selected value="">All</option>
                <option v-for="(specialization,index) in RDE_specializations" :key="index">
                  {{ specialization.text }}
                </option>
              </select>
            </div>
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Countries</p>
              <select v-model="countries"
                      :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2 w-full']"
                      name="country" placeholder="--select country--" @change="filterByCountry(country)">
                <option selected value="">All</option>
                <option v-for="(country,index) in eac_countries" :key="index">
                  {{ country.text }}
                </option>
              </select>
            </div>
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Status</p>
              <select v-model="status"
                      :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2 w-full']"
                      name="status" placeholder="select status" @change="filterByStatus(status)">
                <option class="bg-white" selected value="">All</option>
                <option class="bg-white" value="pending_approval">Pending approval</option>
                <option class="bg-white" value="available">Available</option>
                <option class="bg-white" value="deployed">Deployed</option>
              </select>
            </div>
            <div class="flex flex-col justify-end ">
              <button
                  class="btn btn-blue "
                  @click="registerPreQualifiedRDE()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span class="px-1">Filter</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col w-2/12 justify-end ">
            <button
                class="btn btn-blue "
                @click="registerPreQualifiedRDE()">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="px-1">add pre-qualified RDE</span>
            </button>
          </div>

        </div>
        <table id="tblData" class="w-full whitespace-no-wrap">
          <thead class="">
          <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            <th class="px-4 py-3 w-3/12">Name</th>
            <th class="px-4 py-3 w-1/12">Specialization</th>
            <th class="px-4 py-3 w-1/12">Country</th>
            <th class="px-4 py-3 w-2/12">Status</th>
            <th class="px-4 py-3 w-2/12">Current Deployment</th>
            <th class="px-4 py-3 w-3/12">Competencies</th>
            <th class="px-4 py-3 w-3/12">Action</th>
          </tr>
          </thead>

          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <tr v-for="(RDE,index) in RDES.results" :key="index"
            
              class="text-gray-600 dark:text-gray-400 border">
            <td class="px-4 py-4">
              <div class="flex items-center space-x-4 text-sm text-gray-400">
                <div class="flex flex-col space-y-1">
                  <p class="font-semibold text-gray-600">{{RDE.last_name + ', '+ RDE.first_name}}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 font-mono">
                    <!-- {{ RDE.RDENumber }} -->
                  </p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm capitalize" >
              <span v-if="RDE.occupation">
                {{ RDE.occupation.name }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <span v-if="RDE.region_of_residence">
                {{ RDE.region_of_residence.name }}
              </span>
            </td>
            <td class="px-4 py-3 text-xs">
                <span
                    :class="['capitalize leading-tight rounded-md',RDE.application_status=='pending_approval'?'px-2 py-1   text-yellow-700 bg-yellow-100 dark:bg-yellow-100 dark:text-yellow-100':RDE.application_status=='available'?'px-2 py-1 text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100':RDE.application_status=='deployed'?'px-2 py-1 text-purple-700 bg-purple-100  dark:bg-purple-700 dark:text-purple-100':'']"
                >
                  {{ RDE.application_status }}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <!-- <span v-if="Object.keys(RDE.current_deployment).length > 0">{{ RDE.current_deployment.outbreak }}, {{ RDE.current_deployment.country }}</span> -->

            </td>
            <td v-if="RDE.competencies" class="px-4 py-3 text-sm">
              <span v-for="(competency,index) in RDE.competencies" :key="index" class="capitalize">
                {{index+1 +'.'+ ' '+ competency.name}} <br>
              </span>

            </td>
            <td class="px-4 py-3 text-sm">    
                <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-green-100 text-green-500 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex" @click="getRDEById(RDE.id)">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    <span class="px-1">Update</span>
                  </button>         

            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <!-- <span v-if="RDES" class="flex items-center col-span-3">
          Showing {{ RDES.length }} of {{ RDES.length }}
        </span> -->
        <span class="col-span-2"></span>
        <!-- Pagination -->
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul class="inline-flex items-center">
              <li>
                <button
                    aria-label="Previous"
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                >
                  <svg
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                  >
                    <path
                        clip-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  1
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  2
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  3
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  4
                </button>
              </li>
              <li>
                <span class="px-3 py-1">...</span>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  8
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  9
                </button>
              </li>
              <li>
                <button
                    aria-label="Next"
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                >
                  <svg
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                  >
                    <path
                        clip-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div>
      <iframe id="txtArea1" style="display:none"></iframe>
    </div>

    <!-- Pre qualified RDE sign up modal -->
    <div :class="[register_prequalified_rde?'fixed z-10 inset-0 overflow-y-auto':'hidden']"
         aria-labelledby="modal-title" aria-modal="true" role="dialog">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div aria-hidden="true" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:max-h-7xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start h-96">
              <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center  w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 h-96">
                <!-- Heroicon name: outline/exclamation -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900 text-center">
                  Register pre-qualified RDE
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase"
                    type="button"
                    @click="submitPreQualifiedRDE">
              Submit
            </button>
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto "
                    type="button"
                    @click="closeRegisterPreQualifiedRDEModal()">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of pre qualified RDE sign up modal -->


    <!-- Pre qualified RDE sign up modal -->
    <div :class="[update_rde_details?'fixed z-10 inset-0 overflow-y-auto':'hidden']"
         aria-labelledby="modal-title" aria-modal="true" role="dialog">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div aria-hidden="true" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:max-h-7xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start h-96">
              <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center  w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 h-96">
                <!-- Heroicon name: outline/exclamation -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900 text-center">
                  Register pre-qualified RDE
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                  <p class="text-sm text-gray-500">
                    Form Data elements go here!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase"
                    type="button"
                    @click="postRDEUpdateById">
              Submit
            </button>
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto "
                    type="button"
                    @click="closeUpdateRDEModal()">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of pre qualified RDE sign up modal -->
    


  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
// import Datepicker from 'vuejs-datepicker';


export default {
  name: "RDES",
  components: {

    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      register_prequalified_rde: false,
      transactions: {},
      search: '',
      status: '',
      countries: '',
      paymentMethod: '',
      paymentMethods: [
        'M-Pesa',
        'Airtel Money'
      ],
      eac_countries: [
        {text: 'Burundi', value: 'burundi'},
        {text: 'Kenya', value: 'kenya'},
        {text: 'Rwanda', value: 'rwanda'},
        {text: 'South Sudan', value: 'southSudan'},
        {text: 'Tanzania', value: 'tanzania'},
        {text: 'Uganda', value: 'uganda'}
      ],
      RDES:[],
      RDE_specializations: [
        {text: 'ENT', value: 'ent'},
        {text: 'Epidemiology', value: 'epidemiology'},
        {text: 'Dermatology', value: 'dermatology'},
        {text: 'Virology', value: 'virology'},
        {text: 'Osteology', value: 'osteology'},
        {text: 'Surgery', value: 'surgery'}
      ],
      specializations: '',
      form:{},
      update_rde_details:false

    }
  },
  methods: {
    ...mapActions([ 'fetchRDES','fetchRDEById']),
    ...mapGetters(['getCurrentToken']),

    registerPreQualifiedRDE() {
      this.register_prequalified_rde = true
    },
    closeRegisterPreQualifiedRDEModal() {
      this.register_prequalified_rde = false
    },
    closeUpdateRDEModal() {
      this.update_rde_details = false
    },
    submitPreQualifiedRDE() {
      this.register_prequalified_rde = false
      // alert('RDE registered successfully!!')
    },
    getRDES(){
        this.$store.dispatch('fetchRDES').then(resp => {
        this.RDES = resp;  
      }).catch(err => {
        console.log(err);
      })
    },
    getRDEById(RDEId){    
      this.update_rde_details=true  
      this.fetchRDEById(RDEId).then(resp=>{            
          this.form= resp
      })

    },
    postRDEUpdateById(){
       let payload = {
        }
        this.updateCountryById(payload).then(resp=>{
                window.location.replace('/member-countries')
                console.log(resp)
        })
    }
    
    

  },
  mounted() {
    this.getRDES()

  },
  computed: {}
};
</script>

<style>
  .btn{
    @apply justify-center transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1.5 text-sm font-medium leading-5  border border-transparent rounded-md focus:outline-none capitalize flex
  }
  .btn-blue{
    @apply bg-havelock-blue-200 text-havelock-blue-700 hover:bg-havelock-blue-700 hover:text-white
  }
</style>
