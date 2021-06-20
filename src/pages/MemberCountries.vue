<template>
  <dashboard_layout page_title="">

       <div class="grid gap-2 mb-1 md:grid-cols-2 xl:grid-cols-4">         
         <div class="flex col-span-2 items-center ">           
           
         </div>                 

         <div class="grid col-span-2 items-center p-4 rounded-lg shadow-xs dark:bg-gray-800">          
           <div class="flex justify-between">
             <div class=""></div>             
             <div class="">
                <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex" @click="displayAddMeberCountryForm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span class="px-1">Add Member Country</span>
                </button>
              </div>
           </div>
         </div>                 
                  
       </div>
    <div class="grid grid-cols-3">   
      <span></span>
      <span class="grid grid-cols-2 ">
      </span>
    </div>

    <!-- New Table -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap" id="tblData">
          <thead>        
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th class="px-4 py-3 w-3/12">Name</th>
            <th class="px-4 py-3 w-1/12">Phone Code</th>
            <th class="px-4 py-3 w-2/12">Registered RDEs</th>
            <th class="px-4 py-3 w-3/12">Pending RDEs</th>
          </tr>
          </thead>

          <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
          <tr class="text-gray-700 dark:text-gray-400 border" v-for="(country,index) in countries"
              :key="index">
            <td class="px-4 py-3">
              <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div class="px-2 font-bold">
                  <div aria-hidden="true" class="">
                    {{ index+1}}.
                  </div>
                </div>
                <div>
                  <span class="text-md text-gray-600 dark:text-gray-400 uppercase font-bold">
                    {{ country.name }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm">
              {{country.phone_code }}
            </td>
            <td class="px-4 py-3 text-sm">
              20
            </td>
            <td class="px-4 py-3 text-xs">
                <span :class="['capitalize italic font-semibold leading-tight rounded-full']" >
                  27
                </span>
            </td>
            <!-- <td class="px-4 py-3 text-sm">
              <span v-if="Object.keys(RDE.current_deployment).length > 0">{{ RDE.current_deployment.outbreak}}, {{RDE.current_deployment.country}}</span>
              
            </td> -->
            
          </tr>
          </tbody>
        </table>
      </div>
      <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <span class="flex items-center col-span-3" v-if="countries">
          Showing {{ countries.length }} of {{ countries.length }}
        </span>
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

    <!-- Add member country modal form-->
      <div :class="[add_member_country?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:max-h-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start ">
              
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium flex justify-center uppercase text-blue-600" id="modal-title">
                    Add EAC Member Country
                  </h3>
                  <div class="mt-2 grid grid-cols-2 gap-4">
                        <label class="block mt-4 text-sm col-span-1">
                            <span class="text-gray-700  font font-semibold dark:text-gray-400">Country Name</span>
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

                        <label class="block mt-4 text-sm col-span-1">
                            <span class="text-gray-700  font font-semibold dark:text-gray-400">Phone Code</span>
                            <!-- focus-within sets the color for the icon when input is focused -->
                            
                            <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <input type="text"
                                        class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="e.g. 255"
                                        name="phone_code"
                                        validation="required"
                                        v-model="form.phone_code"
                                />
                                <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                            </div>
                        </label>
                </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase" @click="postMemberCountry">
                Submit
              </button>
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto " @click="closeAddMeberCountryForm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- End of add member country form modal -->

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


export default {
  name: "MemberCountries",
  components: {

    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      form:{
          name:'',
          phone_code:''
      },
      register_prequalified_rde:false,
      transactions: {},
      search: '',
      countries: {},
      add_member_country:false,
    

    }
  },
  methods: {
    ...mapActions(['fetchCountries','postCountry']),
    ...mapGetters(['getCurrentToken', 'allCountries']),
    
    displayAddMeberCountryForm(){
      this.add_member_country = true
    },
    closeAddMeberCountryForm(){
      this.add_member_country = false
    },
    postMemberCountry(){
      this.add_member_country = false;
      let payload = {
          name:this.form.name,
          phone_code:this.form.phone_code
      }
      this.postCountry(payload).then(resp=>{
            window.location.replace('/member-countries')
            console.log(resp)
      })      
    }, 
   
    filterByCountry() {
      // if (this.paymentMethods !== "") {
      // 	this.$router.push({ query: { paymentMethods: this.paymentMethods } });
      // } else {
      // 	this.$router.push({ query: {} });
      // }
    },
  
    getCountries() {
      this.$store.dispatch('fetchCountries').then(resp => {
        this.countries = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    filterByStatus(status) {
      this.paymentMethod = ''
      this.$store.dispatch('fetchTransactions', status).then(resp => {
        this.transactions = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    filterByPaymentMethod(paymentMethod) {
      this.status = '';
      this.$store.dispatch('fetchTransactions', paymentMethod).then(resp => {
        this.transactions = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    exportDataToExcel(tableID, filename = '') {
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

      // Specify file name
      filename = filename ? filename + '.xls' : 'excel_data.xls';

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

    },
    sendDataToEmail() {

    }

  },
  mounted() {
    this.getCountries()
  },
  computed: {}
};
</script>
