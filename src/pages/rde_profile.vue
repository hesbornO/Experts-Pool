<template>
  <dashboard_layout :page_title="`RDE Profile`">
    {{this.rdeProfile}}
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters} from 'vuex'
import api from "@/api";
import dashboard_layout from '../components/layouts/dashboard_layout.vue';
// import data_table from "../../components/layouts/DataTableTemplate";

export default {
  name: "Regions",
  components: {
    // data_table,
    dashboard_layout,
  },
  data() {
    return {
      rdeProfile:{},
      form: {        
      },
    }
  },
  methods:{
    fetchRDEById() {
        return new Promise((resolve, reject) => {            
            let fetchUrl = `/profile/${this.$route.params.rdeId}`
            api.get(fetchUrl).then(resp => {
                this.rdeProfile=resp.data
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
  },
  computed: {
    ...mapGetters(['getErrorMessage'])

  },
  created(){
    this.fetchRDEById()
  }
};
</script>
