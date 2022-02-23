<template>
  <dashboard_layout page_title="Outbreaks">
    <div class="mb-3 flex flex-row justify-end">      
      <router-link
          :to="{name:'CreateOutbreak', params:{}}"
          class="btn btn-blue  text-xs"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
        </svg>
        <span class="px-1">Add Outbreak</span>
      </router-link>
    </div>
     <div class="grid grid-cols-3">
      <span></span>
      <span class="grid grid-cols-2 ">
      </span>
    </div>
    <!-- Outbreaks List -->
    <accordion-data-template v-bind="$attrs">
      <template v-slot="{results}">
                  
         <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"  v-for="(item, index) in results" :key="index">
          <tr>
              <td class="px-4 py-3 w-1/6 ">
                <span class="uppercase text-md font-mono text-orange-400 font-semibold">{{item.name?item.name:'' }} </span>
                <span class="text-black font-normal italic text-xs">{{item.severity?'(SEVERITY:'+item.severity+')':''}}</span>
              </td>
              <td class="px-4 py-3 text-sm w-2/6">
                <span class="">{{item.description?item.description:''}}</span>
                <br>
                <span class=" flex" v-if="item.competencies">
                <h5 class="text-pink-400 italic  transition rounded-md font-mono focus:outline-none transform hover:-translate-y-px hover:scale-110">Requires:</h5>
                <span v-for="(competency,index) in item.competencies_objects" :key="index" class="italic px-1 font-extralight">
                  <span v-if="competency.name" class="capitalize">
                    {{competency.name}}<span v-if="index+1<item.competencies.length">,</span>
                  </span>
                </span>
                </span>
              </td>
            
              <td class="px-4 py-3 text-xs w-1/6 capitalize font-semibold">
                <span class="flex">
                  <span class="flex">
                    <span v-if="item.start_date">From  
                      <span class="text-red-400"> {{item.start_date?' '+item.start_date:''}}</span>
                    </span>
                    <br/>
                    <span v-if="item.end_date" class="px-2 lowercase">to 
                      <span class="text-blue-400"> {{item.end_date?' '+item.end_date:''}}</span>
                    </span>
                  </span>
                  <span v-if="!item.end_date" class="px-2">
                    <router-link
                      :to="{name:'OutbreakEndDate', params:{outbreakId:item.id, outbreakName: item.name}}"
                        class="btn btn-blue h-full text-xs"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span class="px-1">End Date</span>
                    </router-link>  
                  </span>
                </span>
              </td>
              
              <td class="px-4 py-3 text-sm flex flex-row space-x-1 w-1/6">      
                <split-button :optional="createOptional(item,index)" :primary="createPrimary(item)" class="w-32 md:w-48 " />                 
              </td>
          </tr>
          <tr>
              <td colspan="4" v-if="showData">
                    <div class="px-4 py-3 text-sm w-1/6" v-if="item.affected_regions">
                    <span v-for="(region,index) in item.affected_regions_objects" :key="index">
                      <span v-if="region.name" class="capitalize">
                        {{region.name}} <span v-if="index+1 < item.affected_regions.length">, </span>
                      </span>
                    </span>
                  </div>
              </td>
          </tr>
          <tr>

          </tr>
         </tbody>
      </template>
    </accordion-data-template>
    <!-- End Outbreaks List-->
    <router-view></router-view>

  </dashboard_layout>
</template>

<script>
import AccordionDataTemplate from '../../components/layouts/AccordionDataTemplate.vue';

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';

import SplitButton from "../../components/buttons/SplitButton.vue";
import {mapActions} from 'vuex';

export default {
  name: "Outbreaks",
  components: {
    // data_table,
    dashboard_layout,
    AccordionDataTemplate,
    // Datepicker,
    SplitButton

  },
  data() {
    return {
      form:{},
      Outbreaks:{},
      showData:false,
      competencies:[],
      affectedRegions:[]
    }
  },
  methods: {
    ...mapActions(['fetchAllOutbreaks']),

    createPrimary(item) {
      return {
        to: { name: "DeploymentsPerOutbreak", params: { outbreakId:item.id, outbreakName: item.name } },
        label: "View Deployments",
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
      };
    },
    createOptional(item,index) {
      return [
        {
          to:{name:'SuggestedRDESPerOutbreak', params:{outbreakId:item.id, outbreakName: item.name, competencies:this.competencies[index]}},
          label:'Suggested RDES',
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
        },
        {
          to:{name:'AffectedRegionsPerOutbreak', params:{outbreakName:item.name, affectedRegions:item.affected_regions_objects}},
          label:'Affected Regions',
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>'
        },
        {divider:true},
        {
          to:{name:'UpdateOutbreak', params:{outbreakId:item.id, outbreakName: item.name}},
          label:'Update',
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
        },
        
             
      ];   
    },
    fetchOutbreaks() {
      this.$store.dispatch('fetchAllOutbreaks').then(resp => {
        this.Outbreaks = resp.results;   
        for(let outbreak of this.Outbreaks){
          this.competencies.push(outbreak.competencies)
        }  
    // store outbreaks in localstorage, pass index/id in route and use to filter affected regions

      }).catch(err => {
        console.log(err);
      })
    },
  },
  mounted() {
    this.fetchOutbreaks()
  },
  computed: {}
};
</script>

<style>
  .btn{
    @apply justify-center transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 text-sm font-medium leading-5  border border-transparent rounded-md focus:outline-none capitalize flex
  }
  .btn-blue{
    @apply bg-havelock-blue-200 text-havelock-blue-700 hover:bg-havelock-blue-700 hover:text-white
  }
  .btn-red{
    @apply bg-red-200 text-red-700 hover:bg-red-700 hover:text-white
  }
  .btn-green{
    @apply bg-green-200 text-green-700 hover:bg-green-700 hover:text-white
  }
</style>
