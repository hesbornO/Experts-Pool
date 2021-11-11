<template>
  <dashboard_layout :page_title="`${$route.params.outbreakName} Deployments`">

    <!-- Deployments -->
    <data_table v-bind="$attrs" :show-back=true>
      <template v-slot="{item}">
        <td class="px-4 py-3 text-sm">
          {{ item.profile.last_name?item.profile.last_name +', ':''}}
          {{item.profile.first_name?item.profile.first_name:''}} 
          {{item.profile.middle_name?item.profile.middle_name:''}}
        </td>
        <td class="px-4 py-3 text-sm">{{item.profile.region_of_residence.name}}, {{item.profile.region_of_residence.country.name}}</td>
        <td class="px-4 py-3 text-sm italic">
          <span v-if="item.start_date">From <span class="text-pink-400"> {{item.start_date}}</span> </span>
          <span v-if="item.end_date"> to <span class="text-pink-400">{{item.end_date}}</span></span>
        <td class="px-4 py-3 text-sm  capitalize text-orange-400 italic font-semibold">{{item.status?item.status:''}}</td>
        <td class="px-4 py-3 text-sm flex flex-row space-x-1 text-blue-500">
          <span v-if="item.profile.phone"><a :href="`tel:${item.profile.phone}`" title="Click to call">{{item.profile.phone}}</a> | </span> 
          <span v-if="item.profile.email"><a :href="`mailto:${item.profile.email}`" title="Click to mail">{{item.profile.email}}</a></span> 
        </td>
      </template>
    </data_table>
    <!-- End of deployments -->
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
  methods:{
   
  },
  computed: {
    ...mapGetters(['getErrorMessage'])

  }
};
</script>
