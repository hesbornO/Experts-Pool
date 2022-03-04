<template>
  <dashboard_layout :page_title="``" :show-back="false" >
    <span v-if="rdeSelfProfile">
      <span class="flex justify-between" v-if="Object.keys(rdeSelfProfile).length > 0">
        <span></span>
        <span>
          
        </span>
      </span>
    </span>
    <hr class="pt-2 pb-2">

    <span class="flex justify-between" >
      <span></span>
      <span>
          <span v-if="rdeSelfProfile && Object.keys(rdeSelfProfile).length === 0" class="pb-2 text-xl">
            <span class="py-5">
              Welcome <span class="  text-gray-600 capitalize py-1">{{username}}</span>! Click below to register. <br>
            </span>
            <span class="flex justify-between">
              <span></span>
              <router-link
              :to="{name:'RdeSelfRegistrationForm', params:{signUpData:signUpData}}"
              class="btn btn-blue text-lg flex mb-5"            
              title="Click to register"
              >
                <span class="px-1">Create Profile</span>
              </router-link> 
                <span></span>
            </span>
          </span>        
      </span>
      <span></span>
    </span>

    <div v-if="rdeSelfProfile">
      <span class="flex justify-between" v-if="Object.keys(rdeSelfProfile).length >0">
        <span class="flex">
          <span :class="['capitalize italic px-4 py-3 text-sm leading-tight font-mono rounded-md flex flex-wrap font-semibold',this.rdeSelfProfile.application_status=='pending_approval'?'text-yellow-700  dark:text-yellow-100':this.rdeSelfProfile.application_status=='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':this.rdeSelfProfile.application_status=='approval_complete'?'text-green-700  dark:text-green-100':this.rdeSelfProfile.application_status=='deployed'?'text-purple-700 dark:text-purple-100':'']">
                Status: {{ this.rdeSelfProfile.application_status ? this.rdeSelfProfile.application_status.replace(/[_-]/g, " ") : '' }}
                
                <span v-if="this.rdeSelfProfile.application_status==='approved_by_partner_state'" class="flex">
                  <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                </span>
                <span v-if="this.rdeSelfProfile.application_status==='approval_complete'" class="flex">
                  <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                  <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                </span>
                <span class="text-sm text-orange-400 flex">{{rdeSelfProfile.active_deployments>0?'Deployed':''}}</span>
          </span>
          <span class="">
      
            <router-link
                :to="{name:'DisapproveRDEfromProfile', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.last_name}}"
                class="btn btn-orange h-1/2 text-xs"
                v-if="this.rdeSelfProfile.application_status === 'approved'"
                title="Click to disapprove"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="px-1">Disapprove</span>
            </router-link>
          </span>        
        </span>
        
        <span class="flex justify-between gap-8">
          <router-link
              :to="{name:'UpdateRDEfromProfile', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.first_name?this.rdeSelfProfile.first_name.concat(' ').concat(this.rdeSelfProfile.last_name):''}}"
              class="btn btn-green h-3/4 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"></path>
            </svg>
            <span class="px-1">Update Profile</span>
          </router-link>
      
          <!-- <router-link
              :to="{name:'UpdateRDEStatus', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.last_name}}"
              class="btn btn-orange h-3/4 text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            <span class="px-1">Update status</span>
          </router-link> -->
         
          <button
            :class="['flex rounded-md focus:outline-none focus:shadow-outline-purple',mode !== 'dark'?'':'']"
            @click='changeStyle()'
            aria-label="Toggle color mode" :title="`${mode==='dark'}`"
          >
            <template v-if="this.mode === 'dark'">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="dark"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
            </template>
            <template v-if="this.mode !== 'dark'">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="orange"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
          </button>

        </span>      
      </span>
    
      <hr class="pt-2 pb-4">
      

      <tabs :mode="mode" v-if="rdeSelfProfile && Object.keys(rdeSelfProfile).length > 0">      
        <!-- {{rdeSelfProfile}} -->
        <tab title="Personal details" class="grid grid-cols-3 space-x-4">
          <span v-if="this.loading" class=" mt-5 flex justify-center">
            <loading></loading>
          </span>
          <!-- name -->
          <span v-if="this.rdeSelfProfile.last_name" class="col-span-1 px-4 p-2">
            Full Name:
            <span class="font-mono font-semibold text-lg">
              {{this.rdeSelfProfile.last_name?this.rdeSelfProfile.last_name:''}} 
              {{this.rdeSelfProfile.first_name?', '+this.rdeSelfProfile.first_name:''}}
              {{this.rdeSelfProfile.middle_name?' '+this.rdeSelfProfile.middle_name:''}}
            </span>
          </span>

          <!-- gender -->
          <span class="col-span-1 flex gap-4" v-if="this.rdeSelfProfile.gender">
            Gender:
            <span class="font-mono font-semibold text-lg">
              {{this.rdeSelfProfile.gender.toLowerCase()==='m'?'Male':this.rdeSelfProfile.gender.toLowerCase()==='f'?'Female':this.rdeSelfProfile.gender.toLowerCase()==='t'?'Transgender':'Undefined'}}
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" v-if="this.rdeSelfProfile.gender.toLowerCase()==='m'"><circle cx="12" cy="4" r="2" ></circle><path d="M15 7H9a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z"></path></svg>
              
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" v-if="this.rdeSelfProfile.gender.toLowerCase()==='f'"><circle cx="12" cy="4" r="2" ></circle><path d="M14.948 7.684A.997.997 0 0 0 14 7h-4a.998.998 0 0 0-.948.684l-2 6 1.775.593L8 18h2v4h4v-4h2l-.827-3.724 1.775-.593-2-5.999z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" v-if="this.rdeSelfProfile.gender.toLowerCase()==='t'"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
            </span>        
          </span>

          <!-- id -->
          <span class="col-span-1 flex ">
            <span class="capitalize">
              {{this.rdeSelfProfile.id_type?this.rdeSelfProfile.id_type.replace('_',' ') + ':':''}}
              <span class="font-semibold font-mono text-lg">
                {{this.rdeSelfProfile.id_number?this.rdeSelfProfile.id_number:''}}
              </span>
            </span>
          </span>

          <!-- date of birth -->
          <span class="col-span-1 flex capitalize " v-if="this.rdeSelfProfile.date_of_birth">
              DOB:
            <span class="flex px-2" >
              <span class="font-semibold font-mono text-lg px-3">
                {{this.rdeSelfProfile.date_of_birth?this.rdeSelfProfile.date_of_birth:'Undefined'}} <span class="font-normal text-orange-300 lowercase">({{age}} years)</span>
              
              </span>            
            </span>
          </span>
          <!-- Tel -->
          <span class="col-span-1 flex capitalize " v-if="this.rdeSelfProfile.phone">
            Tel:
            <span class="flex px-2" >
              <span class=" font-mono text-md px-1" v-if="this.rdeSelfProfile.phone">
                <a class="flex text-blue-400  " :href="`tel:`+this.rdeSelfProfile.phone" target="_blank" title="Click to call">
                  <span class="px-3">
                    {{this.rdeSelfProfile.phone?this.rdeSelfProfile.phone:'Undefined'}}
                  </span>
                  <span >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </span>
                </a>                        
              </span>                        
            </span>
          </span>

          <!-- email -->
          <span class="col-span-1 flex md:w-1/2 capitalize " v-if="this.rdeSelfProfile.email">
              Email:
            <span class="flex px-2" >
                <a :href="mailto.concat(this.rdeSelfProfile.email)" target="_blank" class="flex  font-mono text-md px-3 text-blue-400 lowercase" title="Click to send mail">
                  <span class="pr-2">{{this.rdeSelfProfile.email?this.rdeSelfProfile.email:'Undefined'}}</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
            </span>
          </span>

          <!-- location -->
          <span class="col-span-1 flex capitalize " v-if="this.rdeSelfProfile.region_of_residence">
            <span>
              Location:
            </span>
            <span class="flex px-2" >
              <span class="font-semibold font-mono text-lg px-3">
                {{this.rdeSelfProfile.region_of_residence.name?this.rdeSelfProfile.region_of_residence.name:''}}{{this.rdeSelfProfile.region_of_residence.country.name?', '+this.rdeSelfProfile.region_of_residence.country.name:''}}
              </span>
              <span class="animate-ping pt-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </span>
            </span>
          </span>
          <!-- Occupation -->
          <span class="col-span-1 flex capitalize " v-if="this.rdeSelfProfile.occupation">
              Occupation:
            <span class="flex px-2" >
              <span class="font-semibold font-mono text-lg px-3">
                {{this.rdeSelfProfile.occupation.name?this.rdeSelfProfile.occupation.name:''}}
              </span>
            </span>
          </span>
          <span></span>

          <!-- next of kin details -->
          <!-- full name -->
          <span class="text-green-500  font-semibold text-md capitalize col-span-3" v-if="this.rdeSelfProfile.next_of_kin_name || this.rdeSelfProfile.next_of_kin_email">Next of kin details</span>
          <span v-if="this.rdeSelfProfile.next_of_kin_name" class="col-span-1 p-2">
            Full Name:
            <span class="font-mono font-semibold text-lg">
              {{this.rdeSelfProfile.next_of_kin_name?this.rdeSelfProfile.next_of_kin_name:'Undefined'}}             
            </span>
          </span>


          <!-- next of kin tel -->
          <span class="col-span-1 flex capitalize" v-if="this.rdeSelfProfile.next_of_kin_phone">
            Tel:
            <span class="flex px-2" >
              <span class=" font-mono text-md px-1" v-if="this.rdeSelfProfile.next_of_kin_phone">
                <a class="flex text-blue-400  " :href="`tel:`+this.rdeSelfProfile.next_of_kin_phone" target="_blank" title="Click to call">
                  <span class="px-3">
                    {{this.rdeSelfProfile.next_of_kin_phone?this.rdeSelfProfile.next_of_kin_phone:'Undefined'}}
                  </span>
                  <span >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </span>
                </a>                        
              </span>                        
            </span>
          </span>

          <!-- next of kin email -->
          <span class="col-span-1 flex md:w-1/2 capitalize -mt-16" v-if="this.rdeSelfProfile.next_of_kin_email">
              Email :
            <span class="flex px-2" >
                <a :href="mailto.concat(this.rdeSelfProfile.next_of_kin_email)" target="_blank" class="flex font-semibold font-mono text-md px-3 text-blue-400 uppercase">
                  <span class="pr-2">{{this.rdeSelfProfile.next_of_kin_email?this.rdeSelfProfile.next_of_kin_email:'Undefined'}}</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
            </span>
          </span>

          <span v-if="this.rdeSelfProfile.competencies_objects && !this.loading" class="text-green-500 font-semibold text-lg capitalize col-span-3">Competencies</span>
          <span v-if="this.rdeSelfProfile.competencies_objects && !this.loading" class="col-span-3">
            <span v-if="this.rdeSelfProfile.competencies_objects.length>0">
              <span v-for="(competency,index) in this.rdeSelfProfile.competencies_objects" :key="index">
                <span>
                  <button class="pill_button">{{competency.name?competency.name.replace('_',' '):''}}</button>              
                </span>
              </span>            
            </span>
          </span>

        </tab>

        <tab title="CV" class="grid grid-cols-3 space-x-4">
          <span v-if="this.loading" class=" mt-5 flex justify-center">
            <loading></loading>
          </span>
          <span v-if="this.rdeSelfProfile.cv_upload_status && !this.loading" class="">          
            <span class="flex justify-between">
              <span>
                <button @click="togglePdfDisplay('fetchCV','viewPdf')" 
                  class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
                  >
                  <span v-if="!viewPdf">View uploaded CV</span>
                </button>
              </span>
              <span>
                <span>
                  <button
                      class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue" @click="toggleUploadField">
                    Update CV
                  </button>
                </span>
              </span>
            </span>
            <span v-if="displayUploadButton" class="text-semibold text-orange-300 p-2">
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 font font-semibold dark:text-gray-400">CV Attachment <span class="text-xs italic">(pdf and word docs)</span></span>
                <!-- focus-within sets the color for the icon when input is focused -->
                <div
                    class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input  type="file"
                          id="cvFile"
                          :name="form.cv"
                          class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                          placeholder="john.doe@gmail.com"
                          validation="required"  
                          accept=".pdf" 
                  />        
                    <span v-if="getErrorMessage['cv']">
                    <span v-if="getErrorMessage['cv'].length>0">
                      <span v-for="(error,index) in getErrorMessage['cv']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>   
                </div>
              </label>  

              <span class="flex justify-between p-2">
                <span></span>
                <button @click="togglePdfDisplay('preview new upload','viewPdfToUpload')" 
                  class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
                  v-if="fileUploaded>0">
                  <span class="">Preview upload</span>
                </button>
                <button
                    class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"  @click="saveCV"> Submit CV
                 
                </button>
              </span>
            </span>
          </span>

          <span v-if="!this.rdeSelfProfile.cv_upload_status && !this.loading" class="text-semibold text-orange-300 p-2">

            No CV Uploaded. Please upload CV!
            <label class="block mt-4 text-sm">
                <span class="text-gray-700 font font-semibold dark:text-gray-400">CV Attachment <span class="text-xs italic">(pdf and word docs)</span></span>
                <!-- focus-within sets the color for the icon when input is focused -->
                <div
                    class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input  type="file"
                          id="cvFile"
                          :name="form.cv"
                          class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                          placeholder="john.doe@gmail.com"
                          validation="required"  
                          accept=".pdf" 
                  />        
                    <span v-if="getErrorMessage['cv']">
                    <span v-if="getErrorMessage['cv'].length>0">
                      <span v-for="(error,index) in getErrorMessage['cv']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>   
                </div>
              </label>
            <input  type="text"
                        :name="form.profile_id"
                        class=" hidden"
                        validation="required"  
                        :value="$route.params.rdeId" 
                />  

            <span class="flex justify-between p-2">
                <span></span>
                <button @click="togglePdfDisplay('preview new upload','viewPdfToUpload')" 
                  class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
                  v-if="fileUploaded>0">
                  <span class="">Preview upload</span>
                </button>
                <button
                    class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"  @click="saveCV"> Submit CV
                 
                </button>
              </span>
            
          </span>

        
        </tab>

        <tab title="Recommendations" class="space-x-4 grid grid-cols-3">
          <span v-if="this.loading" class=" mt-5 flex justify-center col-span-3">
            <loading></loading>
          </span>
          <span v-if="rdeSelfProfile.recommendations && !this.loading" class="col-span-2">
            <table class="w-full border border-black p-3" v-if="rdeSelfProfile.recommendations.length>0">
              <thead class="text-lg font-semibold font-mono border border-black p-2 ">
                <th>Recommendation</th>
                <th class="border border-black">Recommended By</th>
              </thead>
              <tbody>
                <tr v-for="(recommendation, index) in this.rdeSelfProfile.recommendations" :key="index" class="text-md border border-black">
                  <td class="p-2">{{recommendation.comment?recommendation.comment:''}}</td>
                  <td class="border-l border-black p-2 uppercase">{{recommendation.author.username?recommendation.author.username:''}}</td>
                </tr>
              </tbody>
            </table>
            <span v-else class="text-yellow-400 text-xl flex justify-center font-bold animate-pulse">
              No recommendations yet.
            </span>
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
                    <!-- <span  class="colspan-1 flex justify-end" v-if="!deployment.end_date">
                        <router-link
                          :to="{name:'EndRDEDeploymentFromProfile', params:{deploymentId:deployment.id, outbreakName:deployment.outbreak.name}}"
                          class="btn btn-blue h-1/6 text-md"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>

                          <span class="px-1">End Deployment</span>
                        </router-link>
                    </span> -->
                  </td>
                </tr>
              </tbody>
            </table>            
            <span v-else class="text-yellow-400 text-xl flex justify-center font-bold animate-pulse">
              No deployments yet.
            </span>
          </span>
          <span class="colspan-1 flex justify-end">
            <!-- <router-link
              :to="{name:'deployRDEfromProfile', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.first_name?this.rdeSelfProfile.first_name.concat(' ').concat(this.rdeSelfProfile.last_name):''}}"
              class="btn btn-blue h-1/6 text-md"
              v-if="(this.rdeSelfProfile.application_status === 'approval_complete' || this.rdeSelfProfile.application_status === 'approved_by_partner_state') && !this.rdeSelfProfile.active_deployments>0"

            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>

              <span class="px-1">Deploy</span>
            </router-link> -->
          </span>
          
        </tab>
      </tabs>      
    </div> 
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Tab from './tabs/Tab.vue'
import Tabs from './tabs/Tabs.vue'

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
import Loading from "../components/utilities/loading";

// import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import {  baseUrl } from '../utils/constants';

export default {
  name: "Regions",
  components: {
    // data_table,
    dashboard_layout,
    Tab,
    Tabs,
    // VuePdfApp,
    Loading
  },
  data() {
    return {
      rdeSelfProfile:{},
      rdeDeployments:{},
      signUpData:{},
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
      username: '',
      displayUploadButton:false

    }
  },
  methods:{
    ...mapActions(['fetchRDEById','fetchRDEcv','fetchRDES','getRDEprofileDeployment']),
    saveCV(){
      let formData = new FormData()
      formData.append('profile_id',this.rdeSelfProfile.id)
      formData.append('cv', document.getElementById('cvFile').files[0])
      this.$store.dispatch('uploadCVById', formData).then(()=>{
        this.$toast.success("uploaded")
      }).catch(err=>{
        console.log(err)
      })
      location.reload()
    },
    getProfileDetails(){
     this.user_level= localStorage.getItem('level')
     this.region= localStorage.getItem('region')
     this.fullname= localStorage.getItem('fullname')
     this.username= localStorage.getItem('username')
     this.signUpId= localStorage.getItem('id')
     if(this.rdeSelfProfile && Object.keys(this.rdeSelfProfile).length === 0){
       this.fetchSignUpData(this.signUpId)
     }
    },
    fetchSignUpData(sign_up_id){
      this.loading = true
      // eslint-disable-next-line no-unused-vars
       this.$store.dispatch('fetchSignUpDataById',sign_up_id).then(resp => {         
         this.signUpData=resp         
         localStorage.setItem('first_name', this.signUpData.first_name)
         localStorage.setItem('last_name', this.signUpData.last_name)
         localStorage.setItem('email', this.signUpData.email)
         localStorage.setItem('phone', this.signUpData.phone_number)
         localStorage.setItem('region_of_residence_id', this.signUpData.attached_region)
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
      //  this.fetchRDEdeployments(this.$route.params.rdeId)
    },
    fetchRDEData(){
      this.loading = true
      // eslint-disable-next-line no-unused-vars
       this.$store.dispatch('fetchRDES','').then(resp => {

      if(resp.results.length > 0) {
        this.rdeSelfProfile = resp.results[0]
        this.fetchRDEdeployments(this.rdeSelfProfile.id)
      }

       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },
    fetchRDEdeployments(rde_id){
      console.log('fetching rde deployments')
      this.$store.dispatch('getRDEprofileDeployment',rde_id).then(resp => {
        console.log()
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
        console.log('fetching cv')
        this.loading=true
        this.$store.dispatch('fetchRDEcv', this.rdeSelfProfile.id).then(resp=>{
          this.RDEcv = resp
          console.log("response", resp)
          let relative_url=resp.cv.replace('/media/media','media')
          window.open(baseUrl+relative_url, '_blank')
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
    age:function()
    {
        var today = new Date();
        var birthDate = new Date(this.rdeSelfProfile.date_of_birth);
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
    this.getProfileDetails()  
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
