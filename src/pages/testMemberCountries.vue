<template>
  <dashboard_layout page_title="Member Countries">
    <data_table v-bind="$attrs">
      <template v-slot="{item}">
        <td class="px-4 py-3 text-sm">{{item.name}}</td>
        <td class="px-4 py-3 text-sm">+{{item.phone_code}}</td>
        <td class="px-4 py-3 text-sm">10</td>
        <td class="px-4 py-3 text-sm">10</td>
        <td class="px-4 py-3 text-sm"><router-link
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            :to="{name:'Regions', params:{countryId:item.id, countryName: item.name}}"
        >
          <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 px-4 py-2 text-sm font-medium leading-5 bg-blue-100 text-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:shadow-outline-purple capitalize flex">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <span class="px-1">View Regions</span>
          </button>
        </router-link></td>
      </template>
    </data_table>
  </dashboard_layout>
</template>

<script>
import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import data_table from "../components/layouts/DataTableTemplate";

export default {
  name: "testMemberCountries",
  inheritAttrs : false,
  data(){
    return {

    }
  },
  components:{
    data_table,
    dashboard_layout
  }
}
</script>

<style scoped>

</style>