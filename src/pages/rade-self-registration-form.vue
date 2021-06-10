<template>
  <dashboard_layout page_title="EAC RADE Sign Up">
    <div
        :class="['px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']"
    >
      <FormulateForm  v-model="form">
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput type="text" name="firstName" label="First Name" validation="required" />
          <FormulateInput type="text" name="middleName" label="Middle Name" />
          <FormulateInput type="text" name="lastName" label="Last Name" validation="required" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput type="text" name="gender" label="Gender" placeholder="Type to select "  validation="required" />
          <FormulateInput type="picker" placeholder="Pick" name="birthDate" label="Date of Birth" validation="required" />
          <div class="grid grid-cols-2 gap-2">
            <FormulateInput type="date"  name="age" label="Date of Birth" />
            <FormulateInput type="dropdown"  name="ageUnits" label="Religion" placeholder="Select"   />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 items-baseline">
          <FormulateInput name="primaryPhone" label="Main Phone" placeholder="Main Contact" validation="required" type="tel" />
          <FormulateInput name="secondaryPhone" label="Other Phone" placeholder="Other Contact" type="tel" />
          <FormulateInput type="email" name="emailAddress" label="Email Address" validation="email|optional" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput name="identificationType" type="text" label="ID Number"  validation="required" placeholder="Type to choose... " />
          <FormulateInput name="identificationNumber" label="ID Number" validation="required" placeholder="123456789"/>							
          <FormulateInput name="bloodGroup" label="Blood Group" type="text" placeholder="Type..."  />
        </div>
      </FormulateForm>

    </div>
  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
// import Datepicker from 'vuejs-datepicker';
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate)


export default {
  name: "rade-self-registration",
  components: {

    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      form:{},
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
    // this.getTransactions()
  },
  computed: {}
};
</script>
