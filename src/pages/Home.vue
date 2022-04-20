<template>
  <dashboard_layout :page_title="activeLanguage.store.titles.home_page_title">

    <div class="w-full overflow-hidden shadow-xs">
      <div class="w-full overflow-x-auto ">
        
        <!-- Cards -->
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            <div
              class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                ></path>
              </svg>
            </div>
            <div>
              <p
                class="mb-2 text-gray-600 dark:text-gray-400 font-mono font-semibold"
              >
                {{activeLanguage.store.titles.total_rdes}}
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200" v-if="stats.active_deployments>=0 && stats.undeployed_rdes>=0">
                {{(stats.active_deployments+stats.undeployed_rdes)}}                    
              </p>
            </div>
          </div>
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            <div
              class="p-3 mr-4 text-green-500 bg-green-200 rounded-full dark:text-green-100 dark:bg-green-500 animate-pulse"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div v-if="stats">
              <p class="mb-2 text-gray-600 dark:text-gray-400 font-mono font-semibold" >
                {{activeLanguage.store.titles.active_deployments}}
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200" >
                {{stats.active_deployments?stats.active_deployments:''}}
              </p>
            </div>
          </div>
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            <div
              class="p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p
                class="mb-2 text-gray-600 dark:text-gray-400 font-mono font-semibold"
              >
                {{activeLanguage.store.titles.public_health_events}}
              </p>
              <p
                class="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >
                {{allOutbreaks.count}}
              </p>
            </div>
          </div>
          <!-- Card -->
          <div
            class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            <div
              class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
            </div>
            <div>
              <p
                class="mb-2 text-gray-600 dark:text-gray-400 font-mono font-semibold"
              >
                {{activeLanguage.store.titles.partner_states}}
              </p>
              <p
                class="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >
                {{allCountries.length}}
              </p>
            </div>
          </div>
        </div>
        <!-- End of cards -->
        <!-- filters -->
        <br />
        <!-- <div class="w-full flex flex-row bg-gray-50 py-4 p-4 mb-4 rounded-md space-x-4"> -->
          <div>
            <div class="grid grid-cols-8 border-l-4 h-48 overflow-auto bg-white rounded-md p-2">
              <div class="flex justify-between col-span-12 w-full">
                <div class="pl-2">
                  <span class="font-semibold">Region</span><br />
                  <span
                    v-for="(region, index) in regions"
                    :key="index"
                    class="flex col-span-1"
                  >
                    <input
                      type="checkbox"
                      :value="region.id"
                      :ref="`region${region.id}`"
                      :id="`region${region.id}`"
                      @input="addToFilterString('region', region.id)"
                    />
                    <label class="pl-1">{{ region.name }}</label>
                  </span>
                </div>
                <div>
                  <span class="font-semibold">Gender</span><br />
                  <span
                    v-for="(item, index) in gender"
                    :key="index"
                    class="flex col-span-1"
                  >
                    <input
                      type="checkbox"
                      :value="item.value"
                      :ref="`gender${item.value}`"
                      :id="`gender${item.value}`"
                      @input="addToFilterString('gender', item.value)"
                    />
                    <label class="pl-1">{{ item.label }}</label>
                  </span>
                </div>
                <div>
                  <span class="font-semibold">Occupation</span><br />
                  <span v-for="(occupation, index) in occupations" :key="index">
                    <input
                      type="checkbox"
                      :value="occupation.value"
                      :ref="`occupation${occupation.value}`"
                      :id="`occupation${occupation.value}`"
                      @input="addToFilterString('occupation', occupation.value)"
                    />
                    <label class="pl-1">{{ occupation.label }}</label>
                    <br />
                  </span>
                </div>
                <div>
                  <span class="font-semibold">Religion</span><br />
                  <span v-for="(religion, index) in religions" :key="index">
                    <input
                      type="checkbox"
                      :value="religion.value"
                      :ref="`religion${religion.value}`"
                      :id="`religion${religion.value}`"
                      @input="addToFilterString('religion', religion.value)"
                    />
                    <label class="pl-1">{{ religion.label }}</label>
                    <br />
                  </span>
                </div>
                <div>
                  <span class="font-semibold">Application Status</span><br />
                  <div v-for="(status, index) in application_status" :key="index">
                    <input
                      type="checkbox"
                      :label="status.label"
                      :value="status.value"
                      :ref="`application_status${status.value}`"
                      :id="`application_status${status.value}`"
                      @input="addToFilterString('application_status', status.value)"
                    />
                    <label class="pl-1">{{ status.label }}</label>
                  </div>
                </div>
                <div>
                  <span class="font-semibold">Academic Degree</span><br />
                  <div
                    v-for="(degree, index) in academic_degree"
                    :key="index"
                    class="flex col-span-1"
                  >
                    <input
                      type="checkbox"
                      :value="degree.value"
                      :id="`academic_degree${degree.value}`"
                      @input="addToFilterString('academic_degree', degree.value)"
                    />
                    <label class="pl-1">{{ degree.label }}</label>
                  </div>
                </div>
                <div class="pr-2">
                  <span class="font-semibold">Competency</span><br />
                  <div v-for="(competency, index) in competencies" :key="index">
                    <input
                      type="checkbox"
                      :value="competency.value"
                      :ref="`competencies${competency.value}`"
                      :id="`competencies${competency.value}`"
                      @input="addToFilterString('competencies', competency.value)"
                    />
                    <label class="pl-1">{{ competency.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <div class="flex justify-between">  
                <!-- <router-link
                    :to="{name:'saveFilter', params:{outbreakId:$route.params.outbreakId?$route.params.outbreakId:'id',outbreakName:$route.params.outbreakName?$route.params.outbreakName:'name',eligibility_criteria:filterString}}"
                    class="btn btn-blue h-1/2 text-xs m-5"
                    v-if="userHasSelectedFilterItem"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                  <span class="px-1">{{activeLanguage.store.rde_self_profile.save_filter}}</span>
                </router-link>        -->
                <button
                  class="flex text-white bg-blue-400 py-2 px-4 m-5 rounded-md"
                  @click="filterRDES"
                >
                  <svg
                    class="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    ></path>
                  </svg>

                  Filter
                </button>          
              </div>
            </div>
          </div>          
          <router-view></router-view>
        <!-- </div> -->
        <!-- end of filters -->

        <!-- RDE List -->
        <data_table v-bind="$attrs" :table_headings="activeLanguage.store.tables.home_table_headings"  v-if="!userHasSelectedFilterItem">
          <template v-slot="{item}">
            <td class="px-4 py-3 text-sm capitalize">
              <span v-if="item.application_status==='approved_by_partner_state'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
              <span v-if="item.application_status==='approval_complete'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
              
              {{ item.last_name ? item.last_name : ''}}, {{item.first_name ? item.first_name : '' }}
              <span class="text-xs">({{ item.gender==='M' ?'Male':item.gender==='F'?'Female':'Undefined' }})</span>

            </td>
            <td class="px-4 py-3 text-sm capitalize">{{ item.occupation ? item.occupation.name : '' }}</td>
            <td class="px-4 py-3 text-sm capitalize">
              {{ item.region_of_residence ? item.region_of_residence.name: '' }}{{item.region_of_residence.country.name?', '+ item.region_of_residence.country.name:''}}
            </td>
            

            <td class="px-4 py-3 text-sm capitalize">{{ item.active_deployments>0?'Yes' : 'No' }}
            </td>
            <td class="px-4 py-3 text-sm capitalize">
              <span v-if="item.competencies_objects">
                <span v-for="(competency,index) in item.competencies_objects" :key="index">
                  {{ competency.name ? competency.name.replace('_',' ') : '' }}<span
                    v-if="index+1<item.competencies_objects.length">, </span>
                </span>
              </span><br>
            </td>
            <td :class="['capitalize italic px-4 py-3 text-sm leading-tight font-mono rounded-md  font-semibold',item.application_status==='pending_approval'?'text-yellow-700  dark:text-yellow-100':item.application_status==='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':item.application_status==='approval_complete'?'text-green-700  dark:text-green-100':item.application_status==='deployed'?'text-purple-700 dark:text-purple-100':'']">
              {{ item.application_status? item.application_status.replace(/[_-]/g, " ") : '' }}
            </td>
            <td class="px-4 py-3 text-sm flex flex-row space-x-1 text-orange-400 italic font-mono font-semibold">   
              <split-button :optional="createOptional(item)" :primary="createPrimary(item)" class="w-32 md:w-48 bg-blue-100" />                   
              
                 <!-- CV preview modal -->
               <div :class="[viewPdf?'fixed z-1 inset-0':'hidden']" >
                <div class="flex items-end  min-h-full text-center sm:block ">            
                  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                  <!-- This element is to trick the browser into centering the modal contents. -->
                  <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                  <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:max-h-7xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div class="h-96">                 
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Uploaded CV
                          </h3>
                          <div class="h-96" v-if="item.cv">                      
                            <vue-pdf-app :pdf="item.cv" :class="['min-w-7xl min-h-7xl px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']"></vue-pdf-app>                      
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-150 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button></button>
                      <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-red-400 hover:bg-red-600  font-semibold text-lg text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-base uppercase" @click="togglePdfDisplay">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of CV preview modal -->

            </td>
          
          </template>
        </data_table>        
        <!-- end of list -->    

         <!--filtered list  -->
         <span class="text-blue-500 italic font-mono font-semibold " v-if="userHasSelectedFilterItem">{{filtered_rdes && filtered_rdes.results?filtered_rdes.results.length:'0'}} record{{filtered_rdes && filtered_rdes.results?(filtered_rdes.results.length>1?'s':''):''}} found.</span>
         <div v-if="userHasSelectedFilterItem">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="
                  text-xs
                  font-semibold
                  tracking-wide
                  text-left text-gray-500
                  uppercase
                  border border-b border-t border-r
                  dark:border-gray-700
                  bg-gray-50
                  dark:text-gray-400 dark:bg-gray-800
                "
              >
                <th class="px-4 py-3 w-2/12">NAME</th>
                <th class="px-4 py-3 w-2/12">RESIDENCE</th>
                <th class="px-4 py-3 w-2/12">COMPETENCIES</th>
                <th class="px-4 py-3 w-2/12">CONTACT</th>
                <th class="px-4 py-3 w-2/12">STATUS</th>
                <th class="px-4 py-3 w-2/12">ACTION</th>
              </tr>
            </thead>
            <tbody
              v-if="
                filtered_rdes &&
                filtered_rdes.results &&
                filtered_rdes.results.length > 0
              "
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <tr
                class="text-gray-700 dark:text-gray-400 border"
                v-for="(item, index) in filtered_rdes.results"
                :key="index"
              >
                <td class="px-4 py-3 text-sm">
                  {{ item.last_name ? item.last_name + ", " : "" }}
                  {{ item.first_name ? item.first_name : "" }}
                  {{ item.middle_name ? item.middle_name : "" }}
                  <span class="text-xs italic">({{item.gender==='M'?'Male':item.gender==='F'?'Female':'Undefined'}})</span>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ item.region_of_residence.name }},
                  {{ item.region_of_residence.country.name }}
                </td>
                <td class="px-4 py-3 text-sm italic">
                  <div v-if="item.competencies_objects">
                    <span
                      v-for="(competency, index) in item.competencies_objects"
                      :key="index"
                      class="capitalize flex-auto"
                    >
                      {{ competency.name ? competency.name.replace("_", " ") : "" }}
                      <span v-if="index + 1 < item.competencies_objects.length"
                        >,
                      </span>
                    </span>
                  </div>
                </td>

                <td class="px-4 py-3 text-sm">
                  <span class="flex flex-row space-x-1 text-blue-500">
                    <!-- <span v-if="item.phone"><a :href="`tel:${item.phone}`" title="Click to call">{{item.phone}}</a></span>  -->
                    <span v-if="item.email"
                      ><a :href="`mailto:${item.email}`" title="Click to mail">{{
                        item.email
                      }}</a></span
                    >
                  </span>
                </td>
                <td
                  class="
                    px-4
                    py-3
                    text-sm
                    capitalize
                    text-orange-400
                    italic
                    font-mono font-semibold
                  "
                >
                  <span
                    :class="[
                      'capitalize italic px-4 py-3 text-xs leading-tight font-mono rounded-md  font-semibold',
                      item.application_status === 'pending_approval'
                        ? 'text-yellow-700  dark:text-yellow-100'
                        : item.application_status === 'approved_by_partner_state'
                        ? 'text-purple-700  dark:text-purple-100'
                        : item.application_status === 'approval_complete'
                        ? 'text-green-700  dark:text-green-100'
                        : item.application_status === 'deployed'
                        ? 'text-purple-700 dark:text-purple-100'
                        : '',
                    ]"
                    >{{
                      item.application_status
                        ? item.application_status.replace(/[_-]/g, " ")
                        : ""
                    }}</span
                  ><br />
                </td>
                <td
                  class="
                    px-4
                    py-3
                    text-sm
                    capitalize
                    text-orange-400
                    italic
                    font-mono font-semibold
                  "
                >
                  <split-button
                    :optional="createOptional(item)"
                    :primary="createPrimary(item)"
                    class="w-32 md:w-48"
                  />
                </td>
              </tr>
            </tbody>
            <tbody
              v-else
              class="bg-white divide-y w-full dark:divide-gray-700 dark:bg-gray-800"
            >
              <tr class="flex justify-center ">
                <td class="text-orange-500">No records found</td>
              </tr>
            </tbody>
          </table>
        </div>
         <!--end of filtered list  -->

      </div>


    </div>


  </dashboard_layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import api from "@/api";
import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import data_table from "../components/layouts/DataTableTemplate";
import SplitButton from "../components/buttons/SplitButton.vue";



// pdf
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";


export default {
  name: "Home",
  components: {

    dashboard_layout,
    data_table,
    VuePdfApp,
    SplitButton

  },
  data() {
    return {
      allOccupations:[],
      register_prequalified_rde: false,
      search: '',
      selected_status: '',
      selected_country: '',
      selected_occupation:'',
      query_list:[],
      my_argument:'',
      viewPdf: false,
      stats: [],
      allOutbreaks: [],
      allCountries: [],
      approvalStatuses: [
        {label: 'Pending Approval', value: 'pending_approval'},
        {label: 'Approved by Partner State', value: 'approved_by_partner_state'},
        {label: 'Approval Complete', value: 'approval_complete'},
      ],
      
      specializations: '',
      form: {},
      update_rde_details: false,
      fileUploaded: 0,
      query:{my_key:''},
      user_level:'',
      eligibility_criteria: '',
      religions: [
        {
          label: "Christian",
          value: "christian",
        },
        {
          label: "Muslim",
          value: "muslim",
        },
        {
          label: "Buddhist",
          value: "buddhist",
        },
        {
          label: "Atheist",
          value: "atheist",
        },
      ],
      application_status: [
        {
          label: "Pending Approval",
          value: "pending_approval",
        },
        {
          label: "Approved",
          value: "approval_complete",
        },
        {
          label: "Rejected",
          value: "rejected",
        },
      ],
      gender: [
        {
          label: "Male",
          value: "M",
        },
        {
          label: "Female",
          value: "F",
        },
      ],
      regions: [],
      userHasSelectedFilterItem: false,
      
      initial_competencies: [],
      initial_regions: [],
      filtered_rdes: [],
      academic_degree: [],
      competencies: [],
      occupations: [],
      filterString:''
    }
  },
  methods: {
    ...mapActions["fetchRegions",
      "fetchAllOccupations", "fetchAllCompetencies", "fetchAllQualificationTypes"],
    createPrimary(item) {      
      return {
          to:{name:'adminRdeProfile', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"View Profile",
          icon:'<svg class="w-5 h-" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>'
        };
    },
    createOptional(item) {
      const options= [
             
      ];   
    
      if(this.user_level==='eac' && item.application_status==='pending_approval'){
        options.push({
          to:{name:'eacApproval', params:{rdeId:item.id, rdeName: item.last_name}},
          label:"EAC Approval",
          icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
        })
      }
      // if(item.application_status === 'approval_complete' && this.user_level==='eac'){
      //   options.push({divider:true},{
      //     to:{name:'eacDisapproval', params:{rdeId:item.id, rdeName: item.last_name}},
      //     label:"EAC Disapproval",
      //     icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      //   })
      // }
      
      
      return options
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
    getAllCountries(){
       this.$store.dispatch('fetchCountries').then(resp => {
         this.allCountries = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },
    getAllOccupations(){
       this.$store.dispatch('fetchAllOccupations').then(resp => {
         this.allOccupations = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },

    // filters
    addQueryParams(my_argument, query_param){
     
      this.query_list.push({query:{my_argument: query_param}})
      // this.$router.push({path:'filter', query:{country:country_id}})
    },
    filter(){
     console.log(this.query_list)
    },
    fetch_stats() {
    // stats
      this.$store.dispatch('fetchStats').then(resp => {
        this.stats = resp;   
      }).catch(err => {
        console.log(err);
      })
    // all outbreaks
      this.$store.dispatch('fetchAllOutbreaks').then(resp=>{
        this.allOutbreaks=resp;
      }).catch(err=>{
        console.log(err);
      })
    // all countries
    this.$store.dispatch('fetchCountries').then(resp=>{
      this.allCountries=resp;
    }).catch(err=>{
      console.log(err);
    })
    this.user_level= localStorage.getItem('level')
    },

  // filter
    getFilterOptions() {
      // regions
      this.$store
        .dispatch("fetchRegions")
        .then((resp) => {
          this.regions = resp;
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          // occupations
          this.$store
            .dispatch("fetchAllOccupations")
            .then((resp) => {
              this.occupations = resp;
            })
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              // competencies
              this.$store
                .dispatch("fetchAllCompetencies")
                .then((resp) => {
                  this.competencies = resp;
                })
                .catch((err) => {
                  console.log(err);
                })
                .then(() => {
                  // academic_degree
                  this.$store
                    .dispatch("fetchAllQualificationTypes")
                    .then((resp) => {
                      this.academic_degree = resp;
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .then(() => {
                      let initial_filter ='';
                      console.log('filterString',this.filterString)  
                      console.log(initial_filter);
                      for (let id of initial_filter) {
                        // this.$refs.id.checked=true
                        console.log("id", id);
                        document.getElementById(id).checked = true;
                      }
                    });
                });
            });
        });
    },
    addToFilterString(label, value) {
      let region = document.getElementById(`${label}${value}`).value;
      if (document.getElementById(`${label}${value}`).checked) {
        if (!this.filterString)
          this.filterString = this.filterString.concat(`${label}=${region}`);
        else {
          if(this.filterString.length===1) this.filterString = this.filterString.concat(`${label}=${region}`);
          else{
            this.filterString = this.filterString.concat(`&${label}=${region}`);
          }
        }

        // console.log('filter string:',this.filterString)
      } else {
        if (this.filterString.includes(`&${label}=${region}`))
          this.filterString = this.filterString.replace(
            `&${label}=${region}`,
            ""
          );
        else {
          if (this.filterString.includes(`${label}=${region}&`))
            this.filterString = this.filterString.replace(
              `${label}=${region}&`,
              ""
            );
          else {
            this.filterString = this.filterString.replace(
              `${label}=${region}`,
              ""
            );
          }
        }
        // console.log('filter string:',this.filterString)
      }
    },
    filterRDES() {
      if (this.filterString) {
        console.log('fs',this.filterString)        
        this.userHasSelectedFilterItem = true;
        return new Promise((resolve, reject) => {
          api
            .get("/profile/?" + this.filterString)
            .then((resp) => {
              this.filtered_rdes = resp.data;
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        this.filtered_rdes = [];
        this.userHasSelectedFilterItem = false;
      }
    },

    
  },
  mounted() {
    this.fetch_stats()
    this.getAllOccupations()
    this.getFilterOptions();


  },
  computed: {
    ...mapGetters(['activeLanguage',]),
    ...mapActions(['fetchRDES','fetchStats','fetchAllOutbreaks','fetchCountries','fetchAllOccupations'])
  }
};
</script>

<style>
.btn {
  @apply justify-center transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 text-sm font-medium leading-5  border border-transparent rounded-md focus:outline-none capitalize flex
}
.hover-animation{
  @apply transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105
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
.btn-orange {
  @apply bg-orange-200 text-orange-700 hover:bg-orange-700 hover:text-white
}
.btn-indigo {
  @apply bg-indigo-200 text-indigo-700 hover:bg-indigo-700 hover:text-white
}
.btn-yellow {
  @apply bg-yellow-200 text-yellow-700 hover:bg-yellow-700 hover:text-white
}
</style>
