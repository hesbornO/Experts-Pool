<template>
  <dashboard_layout :page_title="`Suggested Rapidly Deployable Experts (RDES) for ${$route.params.outbreakName}`">
    <!-- Suggested rdes -->
    <div >
      <span class="md:flex">Filter: {{filterString}}</span>
       <br>

      <div class="grid grid-cols-6 border-l-4  h-60 overflow-auto bg-orange-50">
        <table class=" ml-2  ">
          <thead>
            <th>Region</th>
          </thead> 
          <tbody class=" p-2">
            <tr v-for="(region,index) in regions" :key="index" class="flex">
              <td><FormulateInput type="checkbox" :label="region.name" :value="region.id"  class="flex w-1/4" :id="`region${index}`" @input="addToFilterString('region',index)"/></td>
            </tr>
          </tbody>
        </table>
        <table class=" ">
          <thead>
            <th>Gender</th>
          </thead> 
          <tbody class=" p-2">
            <tr v-for="(item,index) in gender" :key="index" class="flex">
              <td><FormulateInput type="checkbox" :label="item.label" :value="item.value"  class="flex w-1/4" :id="`gender${index}`" @input="addToFilterString('gender',index)"/></td>
            </tr>
          </tbody>
        </table>
        <table class="">
          <thead>
            <th>Occupation</th>
          </thead> 
          <tbody class=" p-2">
            <tr v-for="(occupation,index) in occupations" :key="index">
              <td><FormulateInput type="checkbox" :label="occupation.label" :value="occupation.value"  class="flex w-1/4" :id="`occupation${index}`" @input="addToFilterString('occupation',index)"/></td>
            </tr>
          </tbody>
        </table>
        <table class="">
          <thead>
            <th>Application Status</th>
          </thead> 
          <tbody class=" p-2">
            <tr v-for="(status,index) in application_status" :key="index">
              <td><FormulateInput type="checkbox" :label="status.label" :value="status.value"  class="flex w-1/4" :id="`application_status${index}`" @input="addToFilterString('application_status',index)"/></td>
            </tr>
          </tbody>
        </table>
        <table class="">
          <thead>
            <th>Academic Degree</th>
          </thead> 
          <tbody class=" p-2">
            <tr v-for="(degree,index) in academic_degree" :key="index">
              <td><FormulateInput type="checkbox" :label="degree.label" :value="degree.value"  class="flex w-1/4" :id="`academic_degree${index}`" @input="addToFilterString('academic_degree',index)"/></td>
            </tr>
          </tbody>
        </table>
        <table class="">
          <thead>
            <th>Competency</th>
          </thead> 
          <tbody class=" p-2">
            <tr v-for="(competency,index) in competencies" :key="index">
              <td><FormulateInput type="checkbox" :label="competency.label" :value="competency.value"  class="flex w-1/4" :id="`competencies${index}`" @input="addToFilterString('competencies',index)"/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end">
        
        <button class="flex text-white bg-blue-400 rounded-sm py-2 px-4 m-5">
          <svg class="w-5 h-5  mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          Filter
        </button>
      </div>

    </div>
    <data_table v-bind="$attrs" :show-back=true>
      <template v-slot="{item}">
        <td class="px-4 py-3 text-sm">
          {{ item.last_name?item.last_name +', ':''}}
          {{item.first_name?item.first_name:''}} 
          {{item.middle_name?item.middle_name:''}}
        </td>
        <td class="px-4 py-3 text-sm">{{item.region_of_residence.name}}, {{item.region_of_residence.country.name}}</td>
        <td class="px-4 py-3 text-sm italic">
          <div v-if="item.competencies_objects">
            <span v-for="(competency,index) in item.competencies_objects" :key="index" class="capitalize flex-auto">
              {{competency.name?competency.name.replace('_',' '):''}}
              <span v-if="index+1<item.competencies_objects.length">, </span>
            </span>
          </div>
        <td class="px-4 py-3 text-sm ">
          <span class="flex flex-row space-x-1 text-blue-500">
            <!-- <span v-if="item.phone"><a :href="`tel:${item.phone}`" title="Click to call">{{item.phone}}</a></span>  -->
            <span v-if="item.email"><a :href="`mailto:${item.email}`" title="Click to mail">{{item.email}}</a></span> 
          
          </span>
        </td>
        <td class="px-4 py-3 text-sm  capitalize text-orange-400 italic font-mono font-semibold">
          <span :class="['capitalize italic px-4 py-3 text-xs leading-tight font-mono rounded-md  font-semibold',item.application_status=='pending_approval'?'text-yellow-700  dark:text-yellow-100':item.application_status=='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':item.application_status=='approval_complete'?'text-green-700  dark:text-green-100':item.application_status=='deployed'?'text-purple-700 dark:text-purple-100':'']">{{item.application_status?item.application_status.replace(/[_-]/g, " "):''}}</span><br>
        </td>
        <td class="px-4 py-3 text-sm  capitalize text-orange-400 italic font-mono font-semibold">
          <split-button :optional="createOptional(item)" :primary="createPrimary(item)" class="w-32 md:w-48 " />                 
        </td>
      </template>
    </data_table>
    <!-- End of Suggested rdes -->
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate";
import SplitButton from "../../components/buttons/SplitButton.vue";

export default {
  name: "Regions",
  components: {
    data_table,
    dashboard_layout,
    SplitButton,
  },
  data() {
    return {
      filterString:'',
      regions:[],
      gender:[
        {
          label:'Male',
          value:'M'
        },
        {
          label:'Female',
          value:'F'
        }
      ],
      occupations:[],
      application_status:[
        {
          label:'Complete',
          value:'approval_complete'
        },
        {
          label:'Done',
          value:'done'
        }
      ],
      academic_degree:[],
      competencies:[],
      religion:[],
      form: {
        name: '',
        country_id: ''
      },
    }
  },
  methods:{
    ...mapActions(['fetchRegions','fetchAllOccupations','fetchAllCompetencies','fetchAllQualificationTypes']),
    getFilterOptions() {
      // regions
      this.$store.dispatch('fetchRegions').then(resp => {
        this.regions = resp;   
      }).catch(err => {
        console.log(err);
      })
      // occupations
      this.$store.dispatch('fetchAllOccupations').then(resp => {
        this.occupations = resp;   
      }).catch(err => {
        console.log(err);
      })
      // competencies
      this.$store.dispatch('fetchAllCompetencies').then(resp => {
        this.competencies = resp;   
      }).catch(err => {
        console.log(err);
      })
      // academic_degree
      this.$store.dispatch('fetchAllQualificationTypes').then(resp => {
        this.academic_degree = resp;   
      }).catch(err => {
        console.log(err);
      })
    },
    addToFilterString(label,index){
      let region = document.getElementById(`${label}${index}`).value
      if(document.getElementById(`${label}${index}`).checked){
        if(!this.filterString)this.filterString = this.filterString.concat(`${label}=${region}`)
        else{this.filterString = this.filterString.concat(`&${label}=${region}`)}
        
        console.log('filter string:',this.filterString)
      }else{
        if(this.filterString.includes(`&${label}=${region}`))this.filterString= this.filterString.replace(`&${label}=${region}`,'')
        else{
          if(this.filterString.includes(`${label}=${region}&`)) this.filterString= this.filterString.replace(`${label}=${region}&`,'')
          else{this.filterString= this.filterString.replace(`${label}=${region}`,'')}
        }
        console.log('filter string:',this.filterString)
      }
    },
    createPrimary(item) {
      return {
        to: { name: "ViewProfileFromSuggestions", params: { rdeId:item.id,rdeName:item.last_name?item.last_name:''+item.first_name?item.first_name:''+item.middle_name?item.middle_name:'' } },
        label: "View Profile",
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
      };
    },
    createOptional(item) {
      const options = []
      if(item.active_deployments!=1){
        options.push({
          to:{name:'DeployFromSuggestions', params:{rdeId:item.id, rdeName:item.last_name?item.last_name:''+item.first_name?item.first_name:''+item.middle_name?item.middle_name:'' }},
          label:'Deploy',
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>'
        })
      }
        
      return options
        
      ;   
    },
  },
  mounted(){
    this.getFilterOptions()
  },
  computed: {
    ...mapGetters(['getErrorMessage', 'activeLanguage'])

  }
};
</script>
