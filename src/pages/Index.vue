<template>
  <dashboard_layout page_title="">

       <div class="grid gap-2 mb-1 md:grid-cols-2 xl:grid-cols-4">         
         <div class="flex col-span-2 items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
           <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
           </div>
           <div class="col-span-2">
             <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
               Total Rapidly Deployable Experts (RDEs)
             </p>
             <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
               137
             </p>
           </div>
         </div>                 

         <div class="grid col-span-2 items-center p-4 rounded-lg shadow-xs dark:bg-gray-800">          
           <div class="flex justify-between">
             <div class=""></div>             
             <div class="">
                <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex" @click="registerPreQualifiedRDE()">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span class="px-1">add pre-qualified RDE</span>
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
          <tr>
            <td class="w-2/12">
              <!-- <button
                  class="px-4 py-2 text-sm font-medium leading-5  text-white transition-colors duration-150 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Export To Excel
              </button> -->
            </td>
            <td class="w-2/12">
              <!-- <button
                  class="px-4 py-2 text-sm font-medium leading-5  transition-colors duration-150 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Send to Email
              </button> -->
               <p class="text-xs italic">--Select specialization--</p>
                <!-- <Datepicker placeholder="--Select Country--" class="pb-2 pr-6"/> -->
                <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2 ']"
                        placeholder="--select specialization--"
                        @change="filterBySpecialization(specialization)" v-model="specializations" name="specialization">
                  <option value="" selected>All</option>
                  <option v-for="(specialization,index) in RDE_specializations" :key="index">
                    {{specialization.text}}
                  </option>              
                </select> 
            </td>
            <td class="w-1/12">
                <p class="text-xs italic">--Select country--</p>
                <!-- <Datepicker placeholder="--Select Country--" class="pb-2 pr-6"/> -->
                <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2 ']"
                        placeholder="--select country--"
                        @change="filterByCountry(country)" v-model="countries" name="country">
                  <option value="" selected>All</option>
                  <option v-for="(country,index) in eac_countries" :key="index">
                    {{country.text}}
                  </option>              
                </select> 
            </td>
            <td class="w-2/12">
                <p class="text-xs italic">--Select status--</p>
              <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select status"
                      @change="filterByStatus(status)" v-model="status" name="status">
                <option class="bg-white" selected value="">All</option>
                <option class="bg-white" value="pending_approval">Pending approval</option>
                <option class="bg-white" value="available">Available</option>
                <option class="bg-white" value="deployed">Deployed</option>
              </select>
              <!-- <span v-if="this.transactions.results" class="px-2">{{ transactions.results.length }}</span> -->
            </td>
            <td class="w-2/12">
              <!-- <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select payment menthod"
                      @change="filterByPaymentMethod(paymentMethod)" v-model="paymentMethod" name="paymentMethod">
                <option class="bg-white" value="">All</option>
                <option class="bg-white" value="?payment_method=1">{{ paymentMethods[0] }}</option>
                <option class="bg-white" value="?payment_method=2">{{ paymentMethods[1] }}</option>
              </select>
              <span v-if="this.transactions.results" class="px-2">{{ transactions.results.length }}</span> -->
            </td>
            <td class="w-3/12 font-semibold flex justify-between">
              <!-- <span class="col-span-1 p-2">From:  <Datepicker placeholder="--Select date--"/></span>             

              <span class="col-span-1 p-2">To: <Datepicker placeholder="--Select date--"/></span> -->
            </td>
          </tr>
          <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            <th class="px-4 py-3 w-3/12">Name</th>
            <th class="px-4 py-3 w-1/12">Specialization</th>
            <th class="px-4 py-3 w-1/12">Country</th>
            <th class="px-4 py-3 w-2/12">Status</th>
            <th class="px-4 py-3 w-2/12">Current Deployment</th>
            <th class="px-4 py-3 w-3/12">Competencies</th>
          </tr>
          </thead>

          <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
          <tr class="text-gray-700 dark:text-gray-400 border" v-for="(RDE,index) in RDE_data"
              :key="index">
            <td class="px-4 py-3">
              <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div
                    class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                >
                  <div
                      aria-hidden="true"
                      class="absolute inset-0 rounded-full shadow-inner"
                  >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </div>
                <div>
                  <p class="font-semibold">{{ RDE.name }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ RDE.RDENumber }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm">
              {{RDE.specialization }}
            </td>
            <td class="px-4 py-3 text-sm">
              {{ RDE.country }}
            </td>
            <td class="px-4 py-3 text-xs">
                <span
                    :class="['capitalize italic font-semibold leading-tight rounded-full',RDE.status=='pending_approval'?'px-2 py-1   text-yellow-700 bg-yellow-100 dark:bg-yellow-100 dark:text-yellow-100':RDE.status=='available'?'px-2 py-1 text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100':RDE.status=='deployed'?'px-2 py-1 text-purple-700 bg-purple-100  dark:bg-purple-700 dark:text-purple-100':'']"
                >
                  {{ RDE.status}}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <span v-if="Object.keys(RDE.current_deployment).length > 0">{{ RDE.current_deployment.outbreak}}, {{RDE.current_deployment.country}}</span>
              
            </td>
            <td class="px-4 py-3 text-sm" v-if="RDE.competencies">
              <div v-if="RDE.competencies.length>0">
                <div v-for="(competency,index) in RDE.competencies" :key="index">
                  <span>{{index+1}}.</span>
                  <span class="px-2">{{competency.outbreak}}</span><br>
                  <span class="px-5">{{competency.role}}</span><br>
                  <span class="px-5">{{competency.notes}}</span><br>

                </div>
                <button
                  class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex "
                  >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="px-1">View all</span>
                </button>

              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <span class="flex items-center col-span-3" v-if="RDE_data">
          Showing {{ RDE_data.length }} of {{ RDE_data.length }}
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

    <!-- Pre qualified RDE sign up modal -->
      <div :class="[register_prequalified_rde?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:max-h-7xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start h-96">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center  w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 h-96">
                  <!-- Heroicon name: outline/exclamation -->
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 text-center" id="modal-title">
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
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase" @click="submitPreQualifiedRDE">
                Submit
              </button>
              <button type="button" class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto " @click="closeRegisterPreQualifiedRDEModal()">
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
  name: "Index",
  components: {

    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      register_prequalified_rde:false,
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
          { text: 'Burundi', value: 'burundi' },
          { text: 'Kenya', value: 'kenya' },
          { text: 'Rwanda', value: 'rwanda' },
          { text: 'South Sudan', value: 'southSudan' },
          { text: 'Tanzania', value: 'tanzania' },
          { text: 'Uganda', value: 'uganda' }
        ],
        RDE_data:[
          {
            RDENumber:'RDE001',
            name:"Ahmed Mahmoud",
            specialization:"ENT specialist",
            country:"Kenya",
            status:"available",
            current_deployment:{
             
            },
            years_of_experience:5,
            competencies:[
              {
                outbreak:"Ebola",
                role:"Volunteer",
                notes:"Enhanced..."
              },
              {
                outbreak:"COVID-19",
                role:"First Respondent",
                notes:"Facilitated..."
              }
            ]

          },
          {
            RDENumber:'RDE002',
            name:"Emmanuel Macron",
            specialization:"Dermatology specialist",
            country:"Tanzania",
            status:"deployed",
            current_deployment:{
              outbreak:"COVID-19",
              country:"Burundi"
            },
            years_of_experience:11,
            competencies:[
              {
                outbreak:"COVID-19",
                role:"Volunteer",
                notes:""
              }
            ]

          },
          {
            RDENumber:'RDE003',
            name:"Erling Haaland",
            specialization:"Virology specialist",
            country:"Kenya",
            status:"pending_approval",
            current_deployment:{},
            years_of_experience:3,
            competencies:[
              {
                outbreak:"Spanish Flu",
                role:"Virologist",
                notes:"Research on..."
              },
              {
                outbreak:"COVID-19",
                role:"Front line respondent",
                notes:"Facilitated..."
              }
            ]

          },
          {
            RDENumber:'RDE004',
            name:"Joseph Kabila",
            specialization:"Osteology specialist",
            country:"Rwanda",
            status:"available",
            current_deployment:{},
            years_of_experience:2,
            competencies:[
              {
                outbreak:"Spanish Flu",
                role:"Virologist",
                notes:"Research on..."
              },
              {
                outbreak:"COVID-19",
                role:"Front line respondent",
                notes:"Facilitated..."
              }
            ]

          },
          {
            RDENumber:'RDE005',
            name:"Jadon Sancho",
            specialization:"Surgery specialist",
            country:"Uganda",
            status:"available",
            current_deployment:{},
            years_of_experience:5,
            competencies:[
              {
                outbreak:"Spanish Flu",
                role:"Virologist",
                notes:"Research on..."
              },
              {
                outbreak:"COVID-19",
                role:"Front line respondent",
                notes:"Facilitated..."
              }
            ]

          }
        ], 
        RDE_specializations:[
          { text: 'ENT', value: 'ent' },
          { text: 'Epidemiology', value: 'epidemiology' },
          { text: 'Dermatology', value: 'dermatology' },
          { text: 'Virology', value: 'virology' },
          { text: 'Osteology', value: 'osteology' },
          { text: 'Surgery', value: 'surgery' }
        ],
        specializations:''

    }
  },
  methods: {
    ...mapActions(['login', 'fetchTransactions']),
    ...mapGetters(['getCurrentToken', 'allTransactions']),
    
    registerPreQualifiedRDE(){
      this.register_prequalified_rde = true
    },
    closeRegisterPreQualifiedRDEModal(){
      this.register_prequalified_rde = false
    },
    submitPreQualifiedRDE(){
      this.register_prequalified_rde = false
      // alert('RDE registered successfully!!')
    },  
    filterBySpecialization() {
      // if (this.paymentMethods !== "") {
      // 	this.$router.push({ query: { paymentMethods: this.paymentMethods } });
      // } else {
      // 	this.$router.push({ query: {} });
      // }
    },
    filterByCountry() {
      // if (this.paymentMethods !== "") {
      // 	this.$router.push({ query: { paymentMethods: this.paymentMethods } });
      // } else {
      // 	this.$router.push({ query: {} });
      // }
    },
    filterStatus() {
      // if (this.paymentMethods !== "") {
      // 	this.$router.push({ query: { paymentMethods: this.paymentMethods } });
      // } else {
      // 	this.$router.push({ query: {} });
      // }
    },
    getTransactions() {
      this.$store.dispatch('fetchTransactions').then(resp => {
        this.transactions = resp;
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
    this.getTransactions()
  },
  computed: {}
};
</script>
