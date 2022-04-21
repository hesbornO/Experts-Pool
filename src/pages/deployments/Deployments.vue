<template>
  <dashboard_layout page_title="Active Deployments">

    <div class="w-full overflow-hidden shadow-xs ">
      <div class="w-full overflow-x-auto ">
        <div class="w-full flex flex-row bg-gray-50 py-4 p-4 mb-4 rounded-md space-x-4">
          <!-- <div class="flex flex-row space-x-8 w-10/12">
             <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Outbreaks</p>
              <select
                 v-model="fetched_outbreaks"
                  :class="['rounded-md border border-gray-300 text-gray-600 py-1 focus:border-blue-100 px-2  form-select w-full']"
                  placeholder="--select country--">
                <option selected value="">All</option> {{this.outbreaks}}
                <option v-for="(outbreak,index) in this.outbreaks.results" :key="index">
                  {{ outbreak.name}}
                </option>
              </select>
            </div>
            <div class="flex-auto flex-col space-y-2">
              <p class="text-gray-600 leading-relaxed text-capitalize">Countries</p>
              <select v-model="fetched_countries"
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
                  @click="filterRDEs()">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <span class="px-1">Filter</span>
              </button>
            </div>
          </div> -->
          
          <router-view></router-view>

        </div>


        <!-- Deployments List -->
         <data_table v-bind="$attrs">
          <template v-slot="{item}" >
            <td class="px-4 py-3 text-sm capitalize" v-if="item.active_deployments>0">
              <span v-if="item.application_status==='approved_by_partner_state'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
              {{ item.last_name ? item.last_name : ''}}, {{item.first_name ? item.first_name : '' }}
            </td>
            <td class="px-4 py-3 text-sm capitalize" v-if="item.active_deployments>0">{{ item.occupation ? item.occupation.name : '' }}</td>
            <td class="px-4 py-3 text-sm capitalize" v-if="item.active_deployments>0">
              {{ item.region_of_residence ? item.region_of_residence.name: '' }}{{item.region_of_residence.country.name?', '+ item.region_of_residence.country.name:''}}
            </td>
            

            <td class="px-4 py-3 text-sm capitalize" v-if="item.active_deployments>0">{{ item.current_deployment?item.current_deployment : 'Unavailable' }}
            </td>
            <td class="px-4 py-3 text-sm capitalize" v-if="item.active_deployments>0">
              <span v-if="item.competencies_objects">
                <span v-for="(competency,index) in item.competencies_objects" :key="index">
                  {{ competency.name ? competency.name : '' }}<span
                    v-if="index+1<item.competencies_objects.length">, </span>
                </span>
              </span><br>
            </td>
            <td :class="['capitalize italic px-4 py-3 text-sm leading-tight font-mono rounded-md  font-semibold',item.application_status=='pending_approval'?'text-yellow-700  dark:text-yellow-100':item.application_status=='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':item.application_status=='approval_complete'?'text-green-700  dark:text-green-100':item.application_status=='deployed'?'text-purple-700 dark:text-purple-100':'']" v-if="item.active_deployments>0">
              {{ item.application_status? item.application_status.replace(/[_-]/g, " ") : '' }}
            </td>
            <td class="px-4 py-3 text-sm flex flex-row space-x-1" v-if="item.active_deployments>0">    
              <!-- <split-button  :primary="createPrimary(item)" class="w-32 md:w-48 bg-blue-100" />                    -->

             
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

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate";


// pdf
// import VuePdfApp from "vue-pdf-app";
// import "vue-pdf-app/dist/icons/main.css";
// import SplitButton from "../../components/buttons/SplitButton.vue";



export default {
  name: "ActiveDeployments",
  components: {

    dashboard_layout,
    data_table,
    // VuePdfApp,
    // SplitButton

  },
  data() {
    return {
      register_prequalified_rde: false,
      search: '',
      status: '',
      fetched_outbreaks: '',
      fetched_countries: '',
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
      outbreaks:[],
      fileUploaded: 0,
      mailto: "mailto:",
			tel: "tel:",



    }
  },
  methods: {
    // ...mapActions(['fetchRDES', 'fetchRDEById']),
    // ...mapGetters(['getCurrentToken']),
    createPrimary(item) {
      return {
        to: { name: "rdeProfileFromDeployments", params: { rdeId:item.id, rdeName: item.last_name } },
        label: "View Profile",
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>`,
      };
    },
    createOptional(item) {
      return [
        {
          to:{name:'EndRDEdeployment', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"End Deployment",
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        }
      ]; 
    },

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
    getOutbreaks() {
      this.$store.dispatch('fetchAllOutbreaks').then(resp => {
        this.outbreaks = resp;
      }).catch(err => {
        console.log(err);
      })
    },
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
    filterByOutbreak(){

    }


  },
  mounted() {
    // this.getRDES()
    // this.getCountries()
    // this.getRegions()
    // this.getOccupations()
    this.getOutbreaks()

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
