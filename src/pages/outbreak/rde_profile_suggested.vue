<template>
  <dashboard_layout :page_title="`${$route.params.rdeName}'s Profile`" :show-back=true>
    <span class="flex justify-between">
      <button @click="goBack()" class="btn btn-blue mb-2 flex flex-row justify-between w-24" >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Back
      </button>
      <span>
        <button class='flex justify-end p-1 px-2 rounded-md bg-blue-400 hover:bg-blue-600 hover:animate-pulse text-white' @click='changeStyle()'>Switch theme</button>
      </span>
    </span>
    <hr class="pt-2 pb-2">
    
    <span class="flex justify-between">
      <span class="flex">
        <span :class="['capitalize italic px-4 py-3 text-sm leading-tight font-mono rounded-md flex flex-wrap font-semibold',this.rdeProfile.application_status=='pending_approval'?'text-yellow-700  dark:text-yellow-100':this.rdeProfile.application_status=='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':this.rdeProfile.application_status=='approval_complete'?'text-green-700  dark:text-green-100':this.rdeProfile.application_status=='deployed'?'text-purple-700 dark:text-purple-100':'']">
              Status: {{ this.rdeProfile.application_status ? this.rdeProfile.application_status.replace(/[_-]/g, " ") : '' }}
              
              <span v-if="this.rdeProfile.application_status==='approved_by_partner_state'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
              <span v-if="this.rdeProfile.application_status==='approval_complete'" class="flex">
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
              </span>
        </span>
        <span class="">
          <!-- <router-link
            :to="{name:'ApproveRDEfromProfile', params:{rdeId:this.rdeProfile.id, rdeName: this.rdeProfile.last_name}}"
            class="btn btn-green h-1/2 text-xs"
            v-if="this.rdeProfile.application_status === 'pending_approval'"
            title="Click to approve"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span class="px-1">Approve</span>
          </router-link> -->

          <router-link
              :to="{name:'DisapproveRDEfromProfile', params:{rdeId:this.rdeProfile.id, rdeName: this.rdeProfile.last_name}}"
              class="btn btn-orange h-1/2 text-xs"
              v-if="this.rdeProfile.application_status === 'approved'"
              title="Click to disapprove"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="px-1">Disapprove</span>
          </router-link>
        </span>        
      </span>
      
      <span class="flex justify-between gap-8">
       
        <!-- <router-link
            :to="{name:'DeleteRDEfromProfile', params:{rdeId:this.rdeProfile.id, rdeName: this.rdeProfile.last_name}}"
            class="btn btn-red h-3/4 text-xs"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
          </svg>
          <span class="px-1">Deactivate Profile</span>
        </router-link> -->

      </span>      
    </span>
    
    <hr class="pt-2 pb-4">

    <tabs :mode="mode">      
      
      <tab title="Personal details" class="grid grid-cols-3 space-x-4">
        <span v-if="this.loading" class=" mt-5 flex justify-center">
          <loading></loading>
        </span>
        <!-- name -->
        <span v-if="this.rdeProfile.last_name" class="col-span-1 px-4 p-2">
          Full Name:
          <span class="font-mono font-semibold text-lg">
            {{this.rdeProfile.last_name?this.rdeProfile.last_name:''}} 
            {{this.rdeProfile.first_name?', '+this.rdeProfile.first_name:''}}
            {{this.rdeProfile.middle_name?' '+this.rdeProfile.middle_name:''}}
          </span>
        </span>

        <!-- gender -->
        <span class="col-span-1 flex gap-4" v-if="this.rdeProfile.gender">
          Gender:
          <span class="font-mono font-semibold text-lg">
            {{this.rdeProfile.gender.toLowerCase()==='m'?'Male':this.rdeProfile.gender.toLowerCase()==='f'?'Female':'Undefined'}}
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" v-if="this.rdeProfile.gender.toLowerCase()==='m'"><circle cx="12" cy="4" r="2" ></circle><path d="M15 7H9a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z"></path></svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" v-if="this.rdeProfile.gender.toLowerCase()==='f'"><circle cx="12" cy="4" r="2" ></circle><path d="M14.948 7.684A.997.997 0 0 0 14 7h-4a.998.998 0 0 0-.948.684l-2 6 1.775.593L8 18h2v4h4v-4h2l-.827-3.724 1.775-.593-2-5.999z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" v-if="this.rdeProfile.gender.toLowerCase()==='t'"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
          </span>        
        </span>

        <!-- id -->
        <span class="col-span-1 flex ">
          <span class="capitalize">
            {{this.rdeProfile.id_type?this.rdeProfile.id_type.replace('_',' ') + ':':''}}
            <span class="font-semibold font-mono text-lg">
              {{this.rdeProfile.id_number?this.rdeProfile.id_number:''}}
            </span>
          </span>
        </span>

        <!-- date of birth -->
        <span class="col-span-1 flex capitalize " v-if="this.rdeProfile.date_of_birth">
            DOB:
          <span class="flex px-2" >
            <span class="font-semibold font-mono text-lg px-3">
              {{this.rdeProfile.date_of_birth?this.rdeProfile.date_of_birth:'Undefined'}} <span class="font-normal text-orange-300 lowercase">({{age}} years)</span>
             
            </span>            
          </span>
        </span>
        <!-- Tel -->
        <span class="col-span-1 flex capitalize " v-if="this.rdeProfile.phone">
          Tel:
          <span class="flex px-2" >
            <span class=" font-mono text-md px-1" v-if="this.rdeProfile.phone">
              <a class="flex text-blue-400  " :href="`tel:`+this.rdeProfile.phone" target="_blank" title="Click to call">
                <span class="px-3">
                  {{this.rdeProfile.phone?this.rdeProfile.phone:'Undefined'}}
                </span>
                <span >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </span>
              </a>                        
            </span>                        
          </span>
        </span>

        <!-- email -->
        <span class="col-span-1 flex md:w-1/2 capitalize " v-if="this.rdeProfile.email">
            Email:
          <span class="flex px-2" >
              <a :href="mailto.concat(this.rdeProfile.email)" target="_blank" class="flex  font-mono text-md px-3 text-blue-400 lowercase" title="Click to send mail">
								<span class="pr-2">{{this.rdeProfile.email?this.rdeProfile.email:'Undefined'}}</span>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
							</a>
          </span>
        </span>

        <!-- location -->
        <span class="col-span-1 flex capitalize " v-if="this.rdeProfile.region_of_residence">
          <span>
            Location:
          </span>
          <span class="flex px-2" >
            <span class="font-semibold font-mono text-lg px-3">
              {{this.rdeProfile.region_of_residence.name?this.rdeProfile.region_of_residence.name:''}}{{this.rdeProfile.region_of_residence.country.name?', '+this.rdeProfile.region_of_residence.country.name:''}}
            </span>
            <span class="animate-ping pt-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </span>
          </span>
        </span>
        <!-- Occupation -->
        <span class="col-span-1 flex capitalize " v-if="this.rdeProfile.occupation">
            Occupation:
          <span class="flex px-2" >
            <span class="font-semibold font-mono text-lg px-3">
              {{this.rdeProfile.occupation.name?this.rdeProfile.occupation.name:''}}
            </span>
          </span>
        </span>
        <span></span>

        <!-- next of kin details -->
         <!-- full name -->
        <span class="text-green-500  font-semibold text-md capitalize col-span-3" v-if="(this.rdeProfile.next_of_kin && this.rdeProfile.next_of_kin.next_of_kin_name) || (this.rdeProfile.next_of_kin && this.rdeProfile.next_of_kin.next_of_kin_email)">Next of kin details</span>
        <span v-if="(this.rdeProfile.next_of_kin && this.rdeProfile.next_of_kin.next_of_kin_name)" class="col-span-1 p-2">
          Full Name:
          <span class="font-mono font-semibold text-lg">
            {{this.rdeProfile.next_of_kin.next_of_kin_name?this.rdeProfile.next_of_kin.next_of_kin_name:'Undefined'}}             
          </span>
        </span>


        <!-- next of kin tel -->
        <span class="col-span-1 flex capitalize" v-if="(this.rdeProfile.next_of_kin && this.rdeProfile.next_of_kin.next_of_kin_phone)">
          Tel:
          <span class="flex px-2" >
            <span class=" font-mono text-md px-1" v-if="this.rdeProfile.next_of_kin.next_of_kin_phone">
              <a class="flex text-blue-400  " :href="`tel:`+this.rdeProfile.next_of_kin.next_of_kin_phone" target="_blank" title="Click to call">
                <span class="px-3">
                  {{this.rdeProfile.next_of_kin.next_of_kin_phone?this.rdeProfile.next_of_kin.next_of_kin_phone:'Undefined'}}
                </span>
                <span >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </span>
              </a>                        
            </span>                        
          </span>
        </span>

        <!-- next of kin email -->
        <span class="col-span-1 flex md:w-1/2 capitalize -mt-16" v-if="(this.rdeProfile.next_of_kin && this.rdeProfile.next_of_kin.next_of_kin_email)">
            Email :
          <span class="flex px-2" >
              <a :href="mailto.concat(this.rdeProfile.next_of_kin.next_of_kin_email)" target="_blank" class="flex font-semibold font-mono text-md px-3 text-blue-400 uppercase">
								<span class="pr-2">{{this.rdeProfile.next_of_kin.next_of_kin_email?this.rdeProfile.next_of_kin.next_of_kin_email:'Undefined'}}</span>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
							</a>
          </span>
        </span>

        <span v-if="this.rdeProfile.competencies_objects && !this.loading" class="text-green-500 font-semibold text-lg capitalize col-span-3">Competencies</span>
        <span v-if="this.rdeProfile.competencies_objects && !this.loading" class="col-span-3">
          <span v-if="this.rdeProfile.competencies_objects.length>0">
            <span v-for="(competency,index) in this.rdeProfile.competencies_objects" :key="index">
              <span>
                <button class="pill_button">{{competency.name?competency.name.replace('_',' '):''}}</button>              
              </span>
            </span>            
          </span>
        </span>

      </tab>

      <tab title="Recommendations" class="space-x-4 grid grid-cols-3">
         <span v-if="this.loading" class=" mt-5 flex justify-center col-span-3">
          <loading></loading>
        </span>
        <span v-if="rdeProfile.recommendations && !this.loading" class="col-span-2">
          <table class="w-full border border-black p-3" v-if="rdeProfile.recommendations.length>0">
            <thead class="text-lg font-semibold font-mono border border-black p-2 ">
              <th>Recommendation</th>
              <th class="border border-black">Made By</th>
            </thead>
            <tbody>
              <tr v-for="(recommendation, index) in this.rdeProfile.recommendations" :key="index" class="text-md border border-black">
                <td class="p-2">{{recommendation.comment?recommendation.comment:''}}</td>
                <td class="border-l border-black p-2 ">{{recommendation.author.username?recommendation.author.username:''}}</td>
              </tr>
            </tbody>
          </table>
          <span v-else class="text-yellow-400 text-xl flex justify-center font-bold animate-pulse">
            No recommendations yet.
          </span>
        </span>
        
        <span class="colspan-1 flex justify-end" v-if="this.rdeProfile">
          <router-link
            :to="{name:'makeRDErecommendation', params:{rdeId:this.rdeProfile.id, rdeName: this.rdeProfile.first_name?this.rdeProfile.first_name.concat(' ').concat(this.rdeProfile.last_name):''}}"
            class="btn btn-blue h-1/6 text-md"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            <span class="px-1">Make recommendation</span>
          </router-link>
        </span>
        
      </tab>
      
      <tab title="Deployments" class="space-x-4 grid grid-cols-4">
         <span v-if="this.loading" class=" mt-5 flex justify-center col-span-3">
          <loading></loading>
        </span>
        <span v-if="!this.loading && rdeDeployments" class="col-span-3">            
          <table class="w-full col-span-3 border border-black p-3" v-if="rdeDeployments.length>0">
            <thead class="text-lg font-semibold font-mono border border-black p-2 ">
              <th class="border border-black">Outbreak</th>
              <th class="border border-black">Description</th>
              <th class="border border-black">Region</th>
              <th class="border border-black">Start date</th>
              <th class="border border-black">End date</th>
            </thead>
            <tbody>
              <tr v-for="(deployment, index) in rdeDeployments" :key="index" class="text-md border border-black">
                <td class="border-l border-black p-2 uppercase font-mono text-orange-500 font-semibold">{{deployment.outbreak.name?deployment.outbreak.name:''}}</td>
                <td class="border-l border-black p-2 capitalize">{{deployment.outbreak.description?deployment.outbreak.description:''}}</td>
                <td class="border-l border-black p-2 capitalize">{{deployment.region_object.name}}</td>
                <td class="border-l border-black p-2 text-xs">{{deployment.start_date?deployment.start_date:''}}</td>
                <td class="border-l border-black p-2 text-xs">
                  {{deployment.end_date?deployment.end_date:''}}
                  <span  class="colspan-1 flex justify-end" v-if="!deployment.end_date">
                      <router-link
                        :to="{name:'EndRDEDeploymentFromProfile', params:{deploymentId:deployment.id, outbreakName:deployment.outbreak.name}}"
                        class="btn btn-blue h-1/6 text-md"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>

                        <span class="px-1">End Deployment</span>
                      </router-link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>            
          <span v-else class="text-yellow-400 animate-pulse">
            No deployments yet.
          </span>
        </span>
        <span class="colspan-1 flex justify-end">
          <router-link
            :to="{name:'DeployFromSuggestions', params:{rdeId:this.rdeProfile.id, rdeName: this.rdeProfile.first_name?this.rdeProfile.first_name.concat(' ').concat(this.rdeProfile.last_name):''}}"
            class="btn btn-blue h-1/6 text-md"
            v-if="(this.rdeProfile.application_status === 'approval_complete' || this.rdeProfile.application_status === 'approved_by_partner_state') && !this.rdeProfile.active_deployments>0"

          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>

            <span class="px-1">Deploy</span>
          </router-link>
        </span>
        
      </tab>
    </tabs>
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Tab from '../tabs/Tab.vue'
import Tabs from '../tabs/Tabs.vue'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import Loading from "../../components/utilities/loading";

import "vue-pdf-app/dist/icons/main.css";

export default {
  name: "Regions",
  components: {
    // data_table,
    dashboard_layout,
    Tab,
    Tabs,
    Loading
  },
  data() {
    return {
      rdeProfile:{},
      rdeDeployments:{},
      form: {   
      },
      mode: 'light',
      mailto: "mailto:",
			tel: "tel:",
      viewPdf: false,
      viewPdfToUpload: false,
      RDEcv:'',
      fileUploaded:0,
      loading:false,
      displayUploadButton:false

    }
  },
  methods:{
    
    fetchRDEData(){
      this.loading = true
      // eslint-disable-next-line no-unused-vars
       this.$store.dispatch('fetchRDEById',this.$route.params.rdeId).then(resp => {
         this.rdeProfile = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
       this.fetchRDEdeployments(this.$route.params.rdeId)
    },
    fetchRDEdeployments(rde_id){
      this.$store.dispatch('getRDEprofileDeployment',rde_id).then(resp => {
         this.rdeDeployments = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },
    changeStyle () {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    },
     togglePdfDisplay(action, pdf_bool) {
      if(pdf_bool==='viewPdf'){
        this.viewPdf = !this.viewPdf;
      }
      if(pdf_bool==='viewPdfToUpload'){
        this.viewPdfToUpload = !this.viewPdfToUpload;
      }
      if(action==='fetchCV'){
        this.loading=true
        this.$store.dispatch('fetchRDEcv', this.$route.params.rdeId).then(resp=>{
          this.RDEcv = resp
        }).catch(err=>{
          this.$store.dispatch('setErrorMsg',err.data)
        }).then(()=>{
          this.loading=false
        })
      }

    },
     toggleUploadField() {
      this.displayUploadButton = !this.displayUploadButton;
    },
    goBack(){
      this.$router.back()
    },

    // saveCV(){
    //   let formData = new FormData()
    //   formData.append('profile_id',this.rdeProfile.id)
    //   formData.append('cv', this.$refs.cvFile.files[0])
    //   this.$store.dispatch('uploadCVById', formData).then(()=>{
    //     this.$toast.success("uploaded")
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    //   // location.reload()
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
                // this.compress(dataUri);
                this.form.cv = dataUri    
                this.fileUploaded+=1                    
            }
        };
        reader.readAsDataURL(file);
    },
  },
  computed: {
    ...mapGetters(['getErrorMessage']),
    ...mapActions(['fetchRDEById','getRDEprofileDeployment','fetchRDEcv']),
    age:function()
    {
        var today = new Date();
        var birthDate = new Date(this.rdeProfile.date_of_birth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

  },
  watch:{
     $route(){
        this.fetchRDEData()
        this.displayUploadButton=false
    }
  },

  mounted(){
    this.fetchRDEData()
  }
};
</script>
<style lang="css">
* {
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
  }
  .wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
    margin: 0;
    padding: 20px;
  }

  .change__style {
    background-color: #eee;
    font-size: 1em;
    margin-bottom: 10px;
    padding: 5px;
  }
  /* spinner */

  .pill_button {
  background-color: rgba(179, 162, 11, 0.596);
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform:capitalize;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}

.pill_button:hover {
  background-color: rgba(179, 162, 11, 0.295);
}
  
</style>
