<template>
  <dashboard_layout page_title="Regions">
    <!-- REGIONS -->
    <div class="flex justify-end">
      <div class="grid col-span-2 items-center rounded-lg shadow-xs dark:bg-gray-800 py-3">
        <div class="flex justify-between">
          <div class="">
            <router-link :to="{name:'CreateRegion'}"
                         class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="px-1">Add Region</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Regions List -->
    <data_table v-bind="$attrs" :show-back=true>
      <template v-slot="{item}">
        <td class="px-4 py-3 text-sm">{{ item.name }}</td>
        <td class="px-4 py-3 text-sm">+{{ item.country.name }}</td>
        <td class="px-4 py-3 text-sm flex flex-row space-x-1">
          <router-link
              :to="{name:'UpdateRegion', params:{regionId:item.id, regionName: item.name}}"
              class="btn btn-green h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span class="px-1">Update</span>
          </router-link>

          <router-link
              :to="{name:'DeleteRegion', params:{regionId:item.id, regionName: item.name}}"
              class="btn btn-red h-1/2 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span class="px-1">Delete</span>
          </router-link>
        </td>
      </template>
    </data_table>
    <!-- End Regions List -->
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters} from 'vuex'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate";

export default {
  name: "Regions",
  components: {
    data_table,
    dashboard_layout,
  },
  data() {
    return {
      form: {
        name: '',
        country_id: ''
      },

    }
  },
  computed: {
    ...mapGetters(['getErrorMessage'])

  }
};
</script>
