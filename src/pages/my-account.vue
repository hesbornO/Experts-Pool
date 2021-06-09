<template>
  <dashboard_layout page_title="My Account">
    <div
        :class="['px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ', payment_refund_form_open? 'block': 'hidden']"
    >
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Name</span>
        <!-- focus-within sets the color for the icon when input is focused -->
        <div
            class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input
              class="block w-full border-2 border-purple-50 border-gray-400 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Peter Mwangi"
          />
          <div
              class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Phone</span>
        <!-- focus-within sets the color for the icon when input is focused -->
        <div
            class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input type="tel"
                 class="block w-full border-2 border-purple-50 border-gray-400 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                 placeholder="+25470..."
          />
          <div
              class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">ID Number</span>
        <!-- focus-within sets the color for the icon when input is focused -->
        <div
            class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input type="number"
                 class="block w-full border-2 border-purple-50 border-gray-400 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                 placeholder="24361291"
          />
          <div
              class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
      </label>

      <div class="mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Type
                </span>
        <div class="mt-2">
          <label
              class="inline-flex items-center text-gray-600 dark:text-gray-400"
          >
            <input v-model="payment_type"
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                name="accountType"
                value="payment"
            />
            <span class="ml-2">Payment</span>
          </label>
          <label
              class="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400"
          >
            <input v-model="payment_type"
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                name="accountType"
                value="refund"
            />
            <span class="ml-2">Refund</span>
          </label>
        </div>
      </div>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Amount </span>
        <!-- focus-within sets the color for the icon when input is focused -->
        <div
            class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
        >
          <input
              class="block w-full border-2 border-purple-50 border-gray-400 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray "
              placeholder="3000"
          />
          <div
              class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
          >
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
      </label>

      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">Reason</span>
        <textarea
            class="block border rounded-sm p-3 w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            rows="3"
            placeholder="Enter some long form content."
        ></textarea>
      </label>

      <div class="flex mt-6 text-sm">
        <button @click="toggleForm"
            class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
          Save
        </button>
      </div>
    </div>
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <!-- <divs -->
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
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Current balance
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            KES 46,760.89
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
              <button @click="toggleForm"
                  class="px-2 py-2 text-sm font-medium leading-5 transition-colors duration-150 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple hover:text-white">
                New Payment
              </button>
            </td>
            <td class="w-2/12">
              <button @click="toggleForm"
                  class="px-2 py-2 text-sm font-medium leading-5   transition-colors duration-150 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple hover:text-white">
                New refund
              </button>
            </td>
            <td class="w-1/12">
              <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select payment menthod"
                      @change="filterPaymentReason(reason)" v-model="paymentReason" name="paymentReason">
                <option class="bg-white" value="">All</option>
                <option class="bg-white" value="">Refund</option>
                <option class="bg-white" value="">Salary</option>
              </select>
            </td>

            <td class="w-2/12">
              <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select payment menthod"
                      @change="filterByPaymentMethod(paymentMethod)" v-model="paymentMethod" name="paymentMethod">
                <option class="bg-white" value="">All</option>
                <option class="bg-white" value="">{{ paymentMethods[0] }}</option>
                <option class="bg-white" value="">{{ paymentMethods[1] }}</option>
              </select>
            </td>
            <td class="w-2/12">
              <select :class="['rounded-xl  border border-gray-300 font-semibold focus:border-blue-100 px-2']"
                      placeholder="select status"
                      @change="filterByStatus(status)" v-model="status" name="status">
                <option class="bg-white" selected value="">All</option>
                <option class="bg-white" value="?transaction_status=initiated">Initiated</option>
                <option class="bg-white" value="?transaction_status=processed">Processed</option>
              </select>
            </td>
            <td class="w-3/12 font-semibold flex justify-between">
              <span class="col-span-1 p-2">From: <Datepicker class="" placeholder="--Select date--"/></span>
              <span class="col-span-1 p-2">To:  <Datepicker placeholder="--Select date--"/></span>
            </td>
          </tr>
          <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            <th class="px-4 py-3 w-3/12">Transaction ID</th>
            <th class="px-4 py-3 w-1/12">Amount ($)</th>
            <th class="px-4 py-3 w-2/12">Reason</th>
            <th class="px-4 py-3 w-2/12">Payment Method</th>
            <th class="px-4 py-3 w-1/12">Status</th>
            <th class="px-4 py-3 w-2/12">Date</th>
          </tr>
          </thead>

          <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
          <tr class="text-gray-700 dark:text-gray-400 border" v-for="(transaction,index) in this.accountTransactions"
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
                  <p class="font-semibold">{{ transaction.transactionId }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ transaction.phoneNumber }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm">
              {{ transaction.amount }}
            </td>
            <td class="px-4 py-3 text-sm capitalize">
              {{ transaction.reason }}
            </td>
            <td class="px-4 py-3 text-sm">
              {{ transaction.paymentMethod }}
            </td>
            <td class="px-4 py-3 text-xs">
                <span
                    :class="['capitalize italic px-2 py-1 font-semibold rounded-full leading-tight',transaction.status=='initiated'?'px-2 py-1  leading-tight text-yellow-700 bg-yellow-100  dark:bg-yellow-100 dark:text-yellow-100':transaction.status=='processing'?'text-blue-700 bg-blue-100  dark:bg-blue-700 dark:text-blue-100':transaction.status=='processed'?' text-green-700 bg-green-100  dark:bg-green-700 dark:text-green-100':'']"
                >
                  {{ transaction.status }}
                </span>
            </td>
            <td class="px-4 py-3 text-sm">
              {{ new Date(transaction.date) }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div
          class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <span class="flex items-center col-span-3" v-if="this.accountTransactions">
          Showing {{ this.accountTransactions.length }} of {{ this.accountTransactions.length }} transactions
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
      accountTransactions: [
        {
          transactionId: 'MGX506Q7B',
          amount: 120,
          phoneNumber: '+254745327809',
          reason: 'salary',
          paymentMethod: 'M-Pesa',
          status: 'initiated',
          date: new Date()
        },
        {
          transactionId: 'MGX506Q7Z',
          amount: 150,
          phoneNumber: '+254756987256',
          reason: 'salary',
          status: 'processing',
          paymentMethod: 'Airtel Money',
          date: new Date()
        },
        {
          transactionId: 'MGX509Q7Q',
          amount: 25,
          phoneNumber: '+2547565127256',
          reason: 'refund',
          status: 'processed',
          paymentMethod: 'M-Pesa',
          date: new Date()
        },
        {
          transactionId: 'MGX504Q7A',
          amount: 16,
          phoneNumber: '+254756517653',
          reason: 'refund',
          status: 'processed',
          paymentMethod: 'M-Pesa',
          date: new Date()
        }
      ],
      search: '',
      status: '',
      paymentReason: '',
      paymentMethod: '',
      paymentMethods: [
        'M-Pesa',
        'Airtel Money'
      ],
      payment_refund_form_open: false,
      payment_type:'refund'
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
    toggleForm(){
      this.payment_refund_form_open=!this.payment_refund_form_open;
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
