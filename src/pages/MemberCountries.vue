<template>
  <dashboard_layout page_title="">

    <div class="grid gap-2 mb-1 md:grid-cols-2 xl:grid-cols-4">
      <div class="flex col-span-2 items-center ">
      </div>

      <div class="grid col-span-2 items-center rounded-lg shadow-xs dark:bg-gray-800">
        <div class="flex justify-between">
          <div class=""></div>
          <div class="">
            <button
                class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex"
                @click="displayAddMemberCountryForm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
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

    <!-- Countries List -->
    <data_table v-bind="$attrs">
      <template v-slot="{item}">
        <td class="px-4 py-3 text-sm">{{ item.name }}</td>
        <td class="px-4 py-3 text-sm">+{{ item.phone_code }}</td>
        <td class="px-4 py-3 text-sm">10</td>
        <td class="px-4 py-3 text-sm">10</td>
        <td class="px-4 py-3 text-sm flex flex-row space-x-1">
          <router-link
              :to="{name:'Regions', params:{countryId:item.id, countryName: item.name}}"
              class="btn btn-blue items-center text-xs"
          >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="px-1">View Regions</span>
          </router-link>

          <button
              :to="{name:'Regions', params:{countryId:item.id, countryName: item.name}}"
              class="btn btn-green h-1/2 text-xs" @click="openCountryUpdateModal(item.id)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span class="px-1">Update</span>
          </button>
          <router-link
              :to="{name:'DeleteCountry', params:{countryId:item.id, countryName: item.name}}"
              class="btn btn-red h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span class="px-1">Delete</span>
          </router-link>
        </td>
      </template>
    </data_table>
    <!-- End Countries List-->

    <!-- Add member country modal form-->
    <div :class="[add_member_country?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title"
         aria-modal="true" role="dialog">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div aria-hidden="true" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:max-h-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start ">

              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 id="modal-title" class="text-lg leading-6 font-medium flex justify-center uppercase text-blue-600">
                  Add EAC Member Country
                </h3>
                <div class="mt-2 grid grid-cols-2 gap-4">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">Country Name</span>
                    <!-- focus-within sets the color for the icon when input is focused -->

                    <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <input v-model="form.name"
                             class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                             name="name"
                             placeholder="e.g. Tanzania"
                             type="text"
                             validation="required"
                      />
                      <span v-if="getErrorMessage['name']">
                                  <span v-if="getErrorMessage['name'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['name']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{ error }}</span>
                                    </span>
                                  </span>
                                </span>
                      <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"></path>
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">Phone Code</span>
                    <!-- focus-within sets the color for the icon when input is focused -->

                    <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <input v-model="form.phone_code"
                             class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                             name="phone_code"
                             placeholder="e.g. 255"

                             type="text"

                      />
                      <span v-if="getErrorMessage['phone_code']">
                                  <span v-if="getErrorMessage['phone_code'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['phone_code']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{ error }}</span>
                                    </span>
                                  </span>
                                </span>
                      <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"></path>
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase"
                    type="button"
                    @click="postMemberCountry">
              Submit
            </button>
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto "
                    type="button"
                    @click="closeAddMemberCountryForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of add member country form modal -->

    <!-- Update member country modal form-->
    <div :class="[update_member_country?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title"
         aria-modal="true" role="dialog">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div aria-hidden="true" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:max-h-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start ">

              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 id="modal-title" class="text-lg leading-6 font-medium flex justify-center uppercase text-blue-600">
                  Update EAC Member Country
                </h3>
                <div class="mt-2 grid grid-cols-2 gap-4">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">Country Name</span>
                    <!-- focus-within sets the color for the icon when input is focused -->

                    <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <input v-model="form.name"
                             class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                             name="name"
                             placeholder="e.g. Tanzania"
                             required
                             type="text"
                      />
                      <span v-if="getErrorMessage['name']">
                                  <span v-if="getErrorMessage['name'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['name']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{ error }}</span>
                                    </span>
                                  </span>
                                </span>
                      <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"></path>
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">Phone Code</span>
                    <!-- focus-within sets the color for the icon when input is focused -->

                    <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <input v-model="form.phone_code"
                             class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                             name="phone_code"
                             placeholder="e.g. 255"
                             required
                             type="text"
                      />
                      <span v-if="getErrorMessage['phone_code']">
                                  <span v-if="getErrorMessage['phone_code'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['phone_code']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{ error }}</span>
                                    </span>
                                  </span>
                                </span>
                      <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"></path>
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase"
                    type="button"
                    @click="postCountryUpdateById(form.id)">
              Submit
            </button>
            <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto "
                    type="button"
                    @click="closeUpdateMemberCountryForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of update member country form modal -->
    <!-- END OF COUNTRIES -->


  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import data_table from "../components/layouts/DataTableTemplate";

export default {
  name: "MemberCountries",
  components: {
    data_table,
    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      form: {
        name: '',
        phone_code: ''
      },
      register_prequalified_rde: false,
      transactions: {},
      search: '',
      countries: {},
      delete_country: false,
      add_member_country: false,
      update_member_country: false,
      regions: {},
      add_region: false,
      update_region: false,
      filteredRegions: {},
    }
  },
  methods: {
    ...mapActions(['postCountry', 'fetchCountryById', 'updateCountryById', 'deleteCountryById', 'fetchRegions', 'fetchRegionById', 'updateRegionById', 'deleteRegionById']),
    ...mapGetters(['getCurrentToken', 'allCountries']),
    // countries
    displayAddMemberCountryForm() {
      this.form = {}
      this.add_member_country = true
    },
    closeAddMemberCountryForm() {
      this.add_member_country = false
    },
    displayUpdateMemberCountryForm() {
      this.update_member_country = true
    },

    closeUpdateMemberCountryForm() {
      this.update_member_country = false
    },
    postMemberCountry() {
      // this.add_member_country = false;
      let payload = {
        name: this.form.name,
        phone_code: this.form.phone_code
      }
      this.postCountry(payload).then(resp => {
        this.$store.dispatch('setError', {})
        window.location.replace('/member-countries')
        console.log(resp)
      })
    },
    postCountryUpdateById(countryId) {
      let payload = {
        id: countryId,
        name: this.form.name,
        phone_code: this.form.phone_code
      }
      this.updateCountryById(payload).then(resp => {
        window.location.replace('/member-countries')
        console.log(resp)
      })

    },
    openCountryUpdateModal(countryId) {
      this.update_member_country = true;
      this.form = {}
      this.fetchCountryById(countryId).then(resp => {
        this.form = resp
      })
    },
    // eslint-disable-next-line no-unused-vars
    deleteCountry(countryId) {
      this.delete_country = true
      this.deleteCountryById(countryId)
    },
    // regions
    getRegions() {
      this.$store.dispatch('fetchRegions').then(resp => {
        this.regions = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    // end of regions

  },
  mounted() {
    this.getRegions()
  },
  computed: {
    ...mapGetters(['allRegions', 'getErrorMessage'])
  }
};
</script>
