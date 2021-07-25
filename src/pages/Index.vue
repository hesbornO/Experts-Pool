<template>
  <dashboard_layout page_title="Home">

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
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <span class="px-1">Filter</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col w-2/12 justify-end ">
            <router-link
                :to="{name: 'CreateRDE'}"
                class="btn btn-blue">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="px-1">Add RDE</span>
            </router-link>
          </div>
          <router-view></router-view>

        </div>


        <!-- RDE List -->
        <data_table v-bind="$attrs">
          <template v-slot="{item}">
            <td class="px-4 py-3 text-sm capitalize">
              {{ item.last_name ? item.last_name : ''}}, {{item.first_name ? item.first_name : '' }}
            </td>
            <td class="px-4 py-3 text-sm capitalize">{{ item.occupation ? item.occupation.name : '' }}</td>
            <td class="px-4 py-3 text-sm capitalize">
              {{ item.region_of_residence ? item.region_of_residence.name : '' }}
            </td>
            <td :class="['capitalize px-4 py-3 text-sm leading-tight rounded-md flex flex-wrap font-semibold',item.application_status=='pending_approval'?'text-yellow-700  dark:text-yellow-100':item.application_status=='available'?'text-green-700  dark:text-green-100':item.application_status=='deployed'?'text-purple-700 dark:text-purple-100':'']">
              {{ item.application_status ? item.application_status.replace('_', ' ') : '' }}
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
              <!-- CV preview modal -->
              <div :class="[viewPdf?'fixed z-1 inset-0':'hidden']">
                <div class="flex items-end  min-h-full text-center sm:block ">
                  <div aria-hidden="true" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                  <!-- This element is to trick the browser into centering the modal contents. -->
                  <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                  <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:max-h-7xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div class="h-96">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
                            Uploaded CV
                          </h3>
                          <div class="h-96">
                            <vue-pdf-app
                                :class="['min-w-7xl min-h-7xl px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']"
                                :pdf="item.cv"></vue-pdf-app>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-150 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                          class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm hidden"
                          type="button">

                      </button>
                      <button
                          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-red-400 hover:bg-red-600  font-semibold text-lg text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-base uppercase"
                          type="button"
                          @click="togglePdfDisplay">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of CV preview modal -->

            </td>
            <td class="px-4 py-3 text-sm flex flex-row space-x-1">
              <span v-if="item.cv">
              <!-- <button class="btn btn-blue"
                      @click="togglePdfDisplay">
              <span v-if="!viewPdf">View CV</span>
              <span v-if="viewPdf">Close preview</span>
            </button> -->
            </span>
              <router-link
                  :to="{name:'UpdateRDE', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-green h-1/2 text-xs"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
                </svg>
                <span class="px-1">Update</span>
              </router-link>
              <router-link
                  :to="{name:'DeleteRDE', params:{rdeId:item.id, rdeName: item.last_name}}"
                  class="btn btn-red h-1/2 text-xs"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
                </svg>
                <span class="px-1">Delete</span>
              </router-link>
            </td>
          </template>
        </data_table>
        <!-- end of list -->

      </div>


    </div>


  </dashboard_layout>
</template>

<script>
// import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import data_table from "../components/layouts/DataTableTemplate";


// pdf
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";


export default {
  name: "RDES",
  components: {

    dashboard_layout,
    data_table,
    VuePdfApp
    // Datepicker

  },
  data() {
    return {
      register_prequalified_rde: false,
      search: '',
      status: '',
      countries: '',
      viewPdf: false,
      eac_countries: [
        {text: 'Burundi', value: 'burundi'},
        {text: 'Kenya', value: 'kenya'},
        {text: 'Rwanda', value: 'rwanda'},
        {text: 'South Sudan', value: 'southSudan'},
        {text: 'Tanzania', value: 'tanzania'},
        {text: 'Uganda', value: 'uganda'}
      ],
      RDES: [],
      RDE_specializations: [
        {text: 'ENT', value: 'ent'},
        {text: 'Epidemiology', value: 'epidemiology'},
        {text: 'Dermatology', value: 'dermatology'},
        {text: 'Virology', value: 'virology'},
        {text: 'Osteology', value: 'osteology'},
        {text: 'Surgery', value: 'surgery'}
      ],
      specializations: '',
      form: {},
      update_rde_details: false,
      occupations: {},
      fileUploaded: 0,


    }
  },
  methods: {
    // ...mapActions(['fetchRDES', 'fetchRDEById']),
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
    // submitPreQualifiedRDE() {
    //   this.register_prequalified_rde = false
    //   // alert('RDE registered successfully!!')
    // },
    // getRDES() {
    //   this.$store.dispatch('fetchRDES').then(resp => {
    //     this.RDES = resp;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    // getRDEById(RDEId) {
    //   this.update_rde_details = true
    //   this.fetchRDEById(RDEId).then(resp => {
    //     this.form = resp
    //   })

    // },
    // postRDEUpdateById() {
    //   let payload = {}
    //   this.updateCountryById(payload).then(resp => {
    //     window.location.replace('/member-countries')
    //     console.log(resp)
    //   })
    // },
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
          // this.compress(dataUri);
          this.form.cv = dataUri
          this.fileUploaded += 1
        }
      };
      reader.readAsDataURL(file);
    },
    // registerRDE() {
    //   this.form.competencies_list = [this.form.competencies_list]
    //   this.form.region_of_residence_id = 21
    //   console.log('form', this.form)

    //   let payload = this.form
    //   this.postRDE(payload).then(resp => {
    //     this.$store.dispatch('setError', {})
    //     window.location.replace('/member-countries')
    //     console.log(resp)
    //   })
    // },

    // getOccupations() {
    //   console.log('getting occupations...')
    //   this.$store.dispatch('fetchOccupations').then(resp => {
    //     this.occupations = resp;
    //     // console.log('countries:', this.countries)             
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    // getCountries() {
    //   this.$store.dispatch('fetchCountries').then(resp => {
    //     this.countries = resp;
    //     // console.log('countries:', this.countries)             
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    // getRegions() {
    //   this.$store.dispatch('fetchRegions').then(resp => {
    //     this.regions = resp;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },


  },
  mounted() {
    // this.getRDES()
    // this.getCountries()
    // this.getRegions()
    // this.getOccupations()

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

.btn-blue {
  @apply bg-havelock-blue-200 text-havelock-blue-700 hover:bg-havelock-blue-700 hover:text-white
}

.btn-red {
  @apply bg-red-200 text-red-700 hover:bg-red-700 hover:text-white
}

.btn-green {
  @apply bg-green-200 text-green-700 hover:bg-green-700 hover:text-white
}
</style>
