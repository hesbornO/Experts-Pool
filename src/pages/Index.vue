<template>
  <dashboard_layout page_title="Dashboard">

       <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
         
         <div
             class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
         >
           <div
               class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
           >
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
           </div>
           <div>
             <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
               Total Rapidly Deployable Experts (RDEs)
             </p>
             <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
               137
             </p>
           </div>
         </div>
         <div
             class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
         >
           <div
               class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
           >
             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
               <path
                   clip-rule="evenodd"
                   d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                   fill-rule="evenodd"
               ></path>
             </svg>
           </div>
           <div>
             <Datepicker placeholder="--Select date--" class="pb-2 pr-6"/>
             <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
               Today's revenue
             </p>
             <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
               KES 1,235.50
             </p>
           </div>
         </div>         
       </div>
    <div class="grid grid-cols-3">
      <!--      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">-->
      <!--        Transactions-->
      <!--      </h2>-->
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
              <button
                  class="px-4 py-2 text-sm font-medium leading-5  text-white transition-colors duration-150 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Export To Excel
              </button>
            </td>
            <td class="w-2/12">
              <button
                  class="px-4 py-2 text-sm font-medium leading-5  text-white transition-colors duration-150 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Send to Email
              </button>
            </td>
            <td class="w-1/12"></td>
            <td class="w-2/12">
              <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select status"
                      @change="filterByStatus(status)" v-model="status" name="status">
                <option class="bg-white" selected value="">All</option>
                <option class="bg-white" value="?transaction_status=initiated">Initiated</option>
                <option class="bg-white" value="?transaction_status=processed">Processed</option>
              </select>
              <span v-if="this.transactions.results" class="px-2">{{ transactions.results.length }}</span>
            </td>
            <td class="w-2/12">
              <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select payment menthod"
                      @change="filterByPaymentMethod(paymentMethod)" v-model="paymentMethod" name="paymentMethod">
                <option class="bg-white" value="">All</option>
                <option class="bg-white" value="?payment_method=1">{{ paymentMethods[0] }}</option>
                <option class="bg-white" value="?payment_method=2">{{ paymentMethods[1] }}</option>
              </select>
              <span v-if="this.transactions.results" class="px-2">{{ transactions.results.length }}</span>
            </td>
            <td class="w-3/12 font-semibold flex justify-between">
              <span class="col-span-1 p-2">From:  <Datepicker placeholder="--Select date--"/></span>             

              <span class="col-span-1 p-2">To: <Datepicker placeholder="--Select date--"/></span>
            </td>
          </tr>
          <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            <th class="px-4 py-3 w-3/12">Transaction ID</th>
            <th class="px-4 py-3 w-1/12">Amount</th>
            <th class="px-4 py-3 w-1/12">Country</th>
            <th class="px-4 py-3 w-2/12">Status</th>
            <th class="px-4 py-3 w-2/12">Payment Method</th>
            <th class="px-4 py-3 w-3/12">Date</th>
          </tr>
          </thead>

          <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
          <tr class="text-gray-700 dark:text-gray-400 border" v-for="(transaction,index) in this.transactions.results"
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
                  ></div>
                </div>
                <div>
                  <p class="font-semibold">{{ transaction.transaction_confirmation_number }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    +{{ transaction.customer_account_number }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm">
              {{ transaction.amount }} {{ transaction.payment_method.currency.short_name }}
            </td>
            <td class="px-4 py-3 text-sm">
              {{ transaction.payment_method.currency.country.name }}
            </td>
            <td class="px-4 py-3 text-xs">
                <span
                    :class="['capitalize italic',transaction.transaction_status=='initiated'?'px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-100 dark:text-yellow-100':transaction.transaction_status=='processed'?'px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100':'']"
                >
                  {{ transaction.transaction_status }}
                </span>
            </td>
            <td :class=" ['text-sm items-center px-2',transaction.payment_method.name =='mpesa'?'text-sm text-green-500 font-semibold capitalize':'text-orange-500']">
              {{ transaction.payment_method.name }}
            </td>
            <td class="px-4 py-3 text-sm">
              {{ new Date(transaction.created_at) }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <span class="flex items-center col-span-3" v-if="this.transactions.results">
          Showing {{ this.transactions.results.length }} of {{ this.transactions.results.length }}
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

  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import Datepicker from 'vuejs-datepicker';


export default {
  name: "Index",
  components: {

    dashboard_layout,
    Datepicker
  },
  data() {
    return {
      transactions: {},
      search: '',
      status: '',
      paymentMethod: '',
      paymentMethods: [
        'M-Pesa',
        'Airtel Money'
      ]

    }
  },
  methods: {
    ...mapActions(['login', 'fetchTransactions']),
    ...mapGetters(['getCurrentToken', 'allTransactions']),

    filterPaymentMethod() {
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
