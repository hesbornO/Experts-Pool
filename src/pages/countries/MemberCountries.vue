<template>
  <dashboard_layout page_title="Member Countries">

    <div class="grid gap-2 mb-1 md:grid-cols-2 xl:grid-cols-4">
      <div class="flex col-span-2 items-center ">
      </div>

      <div class="grid col-span-2 items-center rounded-lg shadow-xs dark:bg-gray-800">
        <div class="flex justify-between">
          <div class=""></div>
          <div class="">
            <router-link
                class="btn btn-blue"
               :to="{name: 'CreateCountry'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="px-1">Add Member Country</span>
            </router-link>
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

          <router-link
              :to="{name:'UpdateCountry', params:{countryId:item.id, countryName: item.name}}"
              class="btn btn-green h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span class="px-1">Update</span>
          </router-link>
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
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate";

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
      countries: {},
      regions: {},
    }
  },
  methods: {
    
  },
  mounted() {
  },
  computed: {
  }
};
</script>
