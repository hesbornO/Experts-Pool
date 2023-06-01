<template>
  <dashboard_layout :page_title="``" :show-back="false" >
    <span>
      <span class="flex justify-between">
        <span></span>
        <span v-if="loading"> 
          
          <!-- <loading></loading>   -->
        </span>
      </span>
    </span>
    <hr class="pt-2 pb-2">
    <span v-if="loading" class=" mt-5 flex justify-center col-span-3">
      <loading></loading>
    </span>

    <span class="flex justify-between" v-if="!loading">
      <span></span>
      <span>
          <span v-if="rdeSelfProfile && Object.keys(rdeSelfProfile).length === 0" class="pb-2 text-xl">
            <span class="py-5">
              {{activeLanguage.store.rde_self_profile.welcome}} <span class="  text-blue-600 capitalize py-1">{{username}}</span>! {{activeLanguage.store.rde_self_profile.click_below_to_register}}. <br>
            </span>
            <span class="flex justify-between">
              <span></span>
              <router-link
              :to="{name:'RdeSelfRegistrationForm', params:{signUpData:signUpData}}"
              class="btn btn-blue text-lg flex mb-5"            
              title="Click to register"
              >
              <!-- v-if="signUpData.email_confirmed" -->
                <span class="px-1">{{activeLanguage.store.rde_self_profile.create_profile}}</span>
              </router-link> 
              <br/>
                <span></span>
            </span>
              <!-- <span v-if="!signUpData.email_verified" class="text-orange-500 font-mono text-xs">{{activeLanguage.store.sign_up_form.verify_email}} <a :href="`mailto:`+signUpData.email" class="text-blue-500">'{{signUpData.email?signUpData.email:''}}'</a> {{activeLanguage.store.sign_up_form.to_proceed}}</span> -->

          </span>        
      </span>
      <span></span>
    </span>

    <div v-if="rdeSelfProfile && !loading">
      <span class="flex justify-between" v-if="Object.keys(rdeSelfProfile).length >0">
        <span class="flex">
          <span :class="['capitalize italic px-4 py-3 text-sm leading-tight font-mono rounded-md flex flex-wrap font-semibold',this.rdeSelfProfile.application_status==='pending_approval'?'text-yellow-700  dark:text-yellow-100':rdeSelfProfile.application_status==='approved_by_partner_state'?'text-purple-700  dark:text-purple-100':rdeSelfProfile.application_status==='approval_complete'?'text-green-700  dark:text-green-100':rdeSelfProfile.application_status==='deployed'?'text-purple-700 dark:text-purple-100':'']">
                {{activeLanguage.store.rde_self_profile.status}}: {{ this.rdeSelfProfile.application_status ? this.rdeSelfProfile.application_status.replace(/[_-]/g, " ") : '' }}
                
                <span v-if="this.rdeSelfProfile.application_status==='approved_by_partner_state'" class="flex">
                  <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                </span>
                <span v-if="this.rdeSelfProfile.application_status==='approval_complete'" class="flex">
                  <svg class="w-4 h-4 text-green-500 font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" ></path></svg>
                </span>
                <!-- <span class="text-sm text-orange-400 flex">{{rdeSelfProfile.active_deployments>0?'Deployed':''}}</span> -->
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
            <span class="px-1">{{activeLanguage.store.rde_self_profile.update_profile}}</span>
          </router-link>
          <router-link
              :to="{name:'deactivateProfile', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.first_name?this.rdeSelfProfile.first_name.concat(' ').concat(this.rdeSelfProfile.last_name):''}}"
              class="btn btn-orange h-3/4 text-xs"
              v-if="rdeSelfProfile.active"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            <span class="px-1">{{activeLanguage.store.rde_self_profile.deactivate_account}}</span>
          </router-link>
          <router-link
              :to="{name:'activateProfile', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.first_name?this.rdeSelfProfile.first_name.concat(' ').concat(this.rdeSelfProfile.last_name):''}}"
              class="btn btn-blue h-3/4 text-xs"
              v-if="!rdeSelfProfile.active"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            <span class="px-1">{{activeLanguage.store.rde_self_profile.activate_account}}</span>
          </router-link>
        </span>      
      </span>
    
      <hr class="pt-2 pb-4">
      

      <tabs :mode="mode" v-if="rdeSelfProfile && Object.keys(rdeSelfProfile).length > 0">      
        <tab :title="activeLanguage.store.rde_self_profile.personal_details" >
          <span v-if="this.loading" class=" mt-5 flex justify-center">
            <loading></loading>
          </span>
          <div class="md:grid md:grid-cols-3 space-x-4 ">

            <!-- name -->
            <span v-if="this.rdeSelfProfile.last_name" class="col-span-1 px-4 p-2">
              {{activeLanguage.store.rde_self_profile.full_name}}:
              <span class="font-mono font-semibold ">
                {{this.rdeSelfProfile.last_name?this.rdeSelfProfile.last_name:''}} 
                {{this.rdeSelfProfile.first_name?', '+this.rdeSelfProfile.first_name:''}}
                {{this.rdeSelfProfile.middle_name?' '+this.rdeSelfProfile.middle_name:''}}
              </span>
            </span>

            <!-- gender -->
            <span class="col-span-1 flex gap-4" v-if="this.rdeSelfProfile.gender">
              {{activeLanguage.store.rde_self_registration_form.gender}}:
              <span class="font-mono font-semibold">
                {{this.rdeSelfProfile.gender.toLowerCase()==='m'?'Male':this.rdeSelfProfile.gender.toLowerCase()==='f'?'Female':'Undefined'}}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);" v-if="this.rdeSelfProfile.gender.toLowerCase()==='m'"><circle cx="12" cy="4" r="2" ></circle><path d="M15 7H9a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z"></path></svg>
                
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);" v-if="this.rdeSelfProfile.gender.toLowerCase()==='f'"><circle cx="12" cy="4" r="2" ></circle><path d="M14.948 7.684A.997.997 0 0 0 14 7h-4a.998.998 0 0 0-.948.684l-2 6 1.775.593L8 18h2v4h4v-4h2l-.827-3.724 1.775-.593-2-5.999z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);" v-if="this.rdeSelfProfile.gender.toLowerCase()==='t'"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
              </span>        
            </span>

            <!-- id -->
            <span class="col-span-1 flex ">
              <span class="capitalize">
                {{this.rdeSelfProfile.id_type?this.rdeSelfProfile.id_type.replace('_',' ') + ':':''}}
                <span class="font-semibold font-mono">
                  {{this.rdeSelfProfile.id_number?this.rdeSelfProfile.id_number:''}}
                </span>
              </span>
            </span>

            <!-- date of birth -->
            <span class="col-span-1 flex capitalize" v-if="this.rdeSelfProfile.date_of_birth">
                {{activeLanguage.store.rde_self_registration_form.dob}}:
              <span class="flex px-2" >
                <span class="font-semibold font-mono px-3 ">
                  <span class="font-normal text-orange-500 lowercase">{{age}} {{activeLanguage.store.rde_self_profile.years}}</span>
                
                </span>            
              </span>
            </span>
            <!-- Tel -->
            <span class="col-span-1 flex capitalize " v-if="this.rdeSelfProfile.phone">
              {{activeLanguage.store.rde_self_registration_form.phone}}:
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
                {{activeLanguage.store.rde_self_registration_form.email}}:
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
                {{activeLanguage.store.rde_self_profile.location}}:
              </span>
              <span class="flex px-2" >
                <span class="font-semibold font-mono  px-3">
                  {{this.rdeSelfProfile.region_of_residence.name?this.rdeSelfProfile.region_of_residence.name:''}}{{this.rdeSelfProfile.region_of_residence.country.name?', '+this.rdeSelfProfile.region_of_residence.country.name:''}}
                </span>
                <span class="animate-ping pt-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </span>
              </span>
            </span>
          
            <!-- Religion -->
            <span class="col-span-1 flex capitalize " v-if="this.rdeSelfProfile.religion">
                {{activeLanguage.store.rde_self_registration_form.religion}}:
              <span class="flex px-2" >
                <span class="font-semibold font-mono px-3">
                  {{this.rdeSelfProfile.religion?this.rdeSelfProfile.religion:''}}
                </span>
              </span>
            </span>
            
          </div>
          <span v-if="this.rdeSelfProfile.competencies_objects && !this.loading" class="text-green-500 font-mono text-lg capitalize col-span-3">{{activeLanguage.store.rde_self_profile.competencies}}</span> <br>
            <span v-if="this.rdeSelfProfile.competencies_objects && !this.loading" class="col-span-3">
              <span v-if="this.rdeSelfProfile.competencies_objects.length>0">
                <span v-for="(competency,index) in this.rdeSelfProfile.competencies_objects" :key="index">
                  <span>
                    <button class="pill_button">{{competency.name?competency.name.replace('_',' '):''}}</button>              
                  </span>
                </span>            
              </span>
            </span>
            <br>
            <br>
          <!-- next of kin details -->
          <div class="md:grid md:grid-cols-3 space-x-4 ">
            <span class="text-green-500 font-mono text-lg capitalize col-span-3" v-if="this.rdeSelfProfile.next_of_kin.next_of_kin_name || this.rdeSelfProfile.next_of_kin.next_of_kin_email">Next of kin details</span>
            <!-- full name -->
            <span v-if="this.rdeSelfProfile.next_of_kin.next_of_kin_name" class="col-span-1 p-2">
              {{activeLanguage.store.rde_self_profile.full_name}}:
              <span class="font-mono font-semibold text-lg">
                {{this.rdeSelfProfile.next_of_kin.next_of_kin_name?this.rdeSelfProfile.next_of_kin.next_of_kin_name:'Undefined'}}             
              </span>
            </span>


            <!-- next of kin tel -->
            <span class="col-span-1 flex capitalize" v-if="this.rdeSelfProfile.next_of_kin.next_of_kin_phone">
              {{activeLanguage.store.rde_self_registration_form.phone}}:
              <span class="flex px-2" >
                <span class=" font-mono text-md px-1" v-if="this.rdeSelfProfile.next_of_kin.next_of_kin_phone">
                  <a class="flex text-blue-400  " :href="`tel:`+this.rdeSelfProfile.next_of_kin.next_of_kin_phone" target="_blank" title="Click to call">
                    <span class="px-3">
                      {{this.rdeSelfProfile.next_of_kin.next_of_kin_phone?this.rdeSelfProfile.next_of_kin.next_of_kin_phone:'Undefined'}}
                    </span>
                    <span >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </span>
                  </a>                        
                </span>                        
              </span>
            </span>

            <!-- next of kin email -->
            <span class="col-span-1 flex md:w-1/2 capitalize -mt-16" v-if="this.rdeSelfProfile.next_of_kin.next_of_kin_email">
                {{activeLanguage.store.rde_self_registration_form.email}}
              <span class="flex px-2" >
                  <a :href="mailto.concat(this.rdeSelfProfile.next_of_kin.next_of_kin_email)" target="_blank" class="flex font-semibold font-mono text-md px-3 text-blue-400 uppercase">
                    <span class="pr-2">{{this.rdeSelfProfile.next_of_kin.next_of_kin_email?this.rdeSelfProfile.next_of_kin.next_of_kin_email:'Undefined'}}</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </a>
              </span>
            </span>
          </div>
          <!-- end of next of kin section -->        
        </tab>

        <tab :title="activeLanguage.store.routes.Occupations" >
          <span v-if="this.loading" class=" mt-5 flex justify-center">
            <loading></loading>
          </span> 
          <div class="flex justify-end">
            <button :class="[' text-white  justify-end rounded-md text-sm mt-2 p-1 ',displayCompetenciesForm?'bg-orange-400':'bg-blue-400']" @click="toggleCompetenceForm">
              <span class="p-2">
              {{displayCompetenciesForm?'Close':'Add profession'}}
              </span>            
            </button>  
          </div>   
          <br>  

          <div class="md:grid md:grid-cols-2 gap-4  border-blue-200 border-2 p-4 rounded-md" v-if="displayCompetenciesForm">         
            <label class="block mt-4 text-sm">            
              <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.routes.OneHealth}}</span>
              <select name="oneHealthSector" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2 rounded-md" validation="required" placeholder="--select--"
                v-model="form.oneHealthSector" id="oneHealth" @change="fetchProfessions">         
                <option value="" disabled selected>--Select one Health sector--</option>     
                <option v-for="(sector,index) in oneHealthSectors" :key="index"  :value="sector.value">{{sector.label}}</option>
              </select>

              <span v-if="getErrorMessage['oneHealthSector']">
                <span v-if="getErrorMessage['oneHealthSector'].length>0">
                  <span v-for="(error,index) in getErrorMessage['oneHealthSector']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>            
            </label>  

            <label class="block mt-4 text-sm">   
              <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.routes.Occupations}}</span>
              <select name="profession" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2 rounded-md" validation="required" placeholder="--select--"
                v-model="form.profession" id="occupation" @change="fetchSpecializations">         
                <option value="" disabled selected>--Select profession--</option>     
                <option v-for="(profession,index) in professions" :key="index"  :value="profession.value">{{profession.label}}</option>
              </select>

              <span v-if="getErrorMessage['profession']">
                <span v-if="getErrorMessage['profession'].length>0">
                  <span v-for="(error,index) in getErrorMessage['profession']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>            
            </label> 

            <label class="block mt-4 text-sm">  
              <span class="text-gray-700 font font-semibold dark:text-gray-400">Specialization</span>
              <select name="specialization" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2 rounded-md" validation="required" placeholder="--select--"
                v-model="form.specialization" id="specialization" @change="fetchCompetences">         
                <option value="" disabled selected>--Select specialization--</option>     
                <option v-for="(specialization,index) in specializations" :key="index"  :value="specialization.value">{{specialization.label}}</option>
              </select>

              <span v-if="getErrorMessage['specialization']">
                <span v-if="getErrorMessage['specialization'].length>0">
                  <span v-for="(error,index) in getErrorMessage['specialization']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>            
            </label>

            <label class="block mt-4 text-sm">  
            
              <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.routes.Competence}}</span>
              <FormulateInput
                v-model="form.competencies"
                :options="competences"
                type="checkbox"
                class="flex border border-blue-200 p-2 rounded-sm"
                label="Select competences"
              />

              <span v-if="getErrorMessage['competencies']">
                <span v-if="getErrorMessage['competencies'].length>0">
                  <span v-for="(error,index) in getErrorMessage['competencies']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>            
            </label>

            <button
              :class="['block w-full col-span-2 justify-end px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600  focus:outline-none focus:shadow-outline-purple ',isLoading?'cursor-not-allowed bg-purple-300 hover:bg-purple-400':'bg-purple-600 hover:bg-purple-700']" v-bind:disabled="isLoading || (form.competencies && form.competencies.length===0)" type="submit" @click="submitCompetencies">
              <span v-if="!isLoading">{{activeLanguage.store.actions.submit}}</span>
              <span v-if="isLoading" class="flex justify-center"><loading></loading></span>                
            </button>              
          </div>

          <div v-if="rdeSelfProfile && rdeSelfProfile.competencies_objects && rdeSelfProfile.competencies_objects.length>0" class="mt-4 bg-gray-100">
            <table class="w-full p-4 bg-gray-50">
              <thead class=" bg-gray-200">
                <th class="border border-black">{{activeLanguage.store.routes.OneHealth}}</th>
                <th class="border border-black">{{activeLanguage.store.routes.Occupations}}</th>
                <th class="border border-black">{{activeLanguage.store.routes.Specialization}}</th>
                <th class="border border-black">{{activeLanguage.store.routes.Competence}}</th>
              </thead>
              <tbody class="">
                <tr v-for="(competence,index) in rdeSelfProfile.competencies_objects" :key="index">
                  <td class="border border-black p-2">{{competence.occupation_category_name}}</td>
                  <td class="border border-black p-2">{{competence.occupation_name}}</td>
                  <td class="border border-black p-2">{{competence.specialization_name}}</td>
                  <td class="border border-black p-2">{{competence.name}}</td>
                </tr>            
              </tbody>
            </table>
          </div>

          <div v-if="rdeSelfProfile && rdeSelfProfile.competencies_objects && rdeSelfProfile.competencies_objects.length>0" class="mt-8 md:grid md:grid-cols-2 gap-4 border-4 border-sky-500 rounded-sm p-2 bg-gray-100">
            <span class="col-span-2 flex justify-center font-semibold text-lg">{{activeLanguage.store.routes.Experience}}</span>               
            <div class="bg-gray-100 rounded-sm">
              <div class="flex justify-between">
                <div><span class="m-1 p-1 font-semibold text-sm font-mono">Management</span></div>              
                <div class="">
                  <button :class="[' text-white  justify-end rounded-md text-xs m-1 p-1 ',displayManagerialForm?'bg-orange-400':'bg-blue-400']" @click="toggleManagerialForm" v-if="!managerialExperienceExists">
                    <span class="p-2">
                    {{displayManagerialForm?'Close':'Add experience'}}
                    </span>            
                  </button>   
                </div>  
              </div>

              <div class="md:grid md:grid-cols-2 gap-4  border-blue-200 border-2 p-2 m-1 rounded-md" v-if="displayManagerialForm">         
                <label class="block mt-4 text-sm">            
                  <span class="text-gray-700 font font-semibold dark:text-gray-400">Years of experience</span>
                  <FormulateInput
                    v-model="managerialExperience.years_of_experience"
                    :options="[{value:'1-4',label:'1 To 4 Years'},{value:'5-10',label:'5 To 10 Years'},{value:'over-10',label:'Over 10 Years'}]"
                    type="select"
                    placeholder="Select range"
                  />
                  <span v-if="getErrorMessage['years_of_experience']">
                    <span v-if="getErrorMessage['years_of_experience'].length>0">
                      <span v-for="(error,index) in getErrorMessage['years_of_experience']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>            
                </label>  

                <label class="block mt-4 text-sm">   
                  <span class="text-gray-700 font font-semibold dark:text-gray-400">No. of people managed</span>
                
                  
                  <FormulateInput
                    v-model="managerialExperience.no_of_people_managed"
                    :options="[{value:'1-4',label:'1 To 4 People'},{value:'5-10',label:'5 To 10 People'},{value:'10-20',label:'10 to 20 People'},{value:'over-20',label:'Over 20 People'}]"
                    type="select"
                    placeholder="Select range"
                  />

                  <span v-if="getErrorMessage['no_of_people_managed']">
                    <span v-if="getErrorMessage['no_of_people_managed'].length>0">
                      <span v-for="(error,index) in getErrorMessage['no_of_people_managed']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>            
                </label> 
              
                <button
                  :class="['block w-full col-span-2 justify-end px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600  focus:outline-none focus:shadow-outline-purple ',isLoading?'cursor-not-allowed bg-purple-300 hover:bg-purple-400':'bg-purple-600 hover:bg-purple-700']" v-bind:disabled="isLoading" type="submit" @click="submitExperience('managerial')">
                  <span v-if="!isLoading">{{activeLanguage.store.actions.submit}}</span>
                  <span v-if="isLoading" class="flex justify-center"><loading></loading></span>                
                </button>              
              </div>
              <table class=" p-4 w-full bg-gray-50 text-sm" v-if="rdeSelfProfile.detailed_experience && rdeSelfProfile.detailed_experience.length>0">
                <thead class=" bg-gray-200">
                  <th class="border border-black">No. of years</th>
                  <th class="border border-black">No. of people managed</th>
                </thead>
                <tbody class="">
                  <tr v-for="(experience,index) in rdeSelfProfile.detailed_experience" :key="index">
                    <td class="border border-black p-2 capitalize" v-if="experience.experience_type==='managerial_experience'">{{experience.years_of_experience}}</td>
                    <td class="border border-black p-2 capitalize" v-if="experience.experience_type==='managerial_experience'">{{experience.no_of_people_managed}}</td>
                  </tr>            
                </tbody>
              </table>
            </div>
            <div class="bg-gray-100 rounded-sm">
              <div class="flex justify-between ">
                <div><span class="m-1 p-1 font-semibold text-sm font-mono">Professional</span></div>              
                <div class="">
                  <button :class="[' text-white  justify-end rounded-md text-xs m-1 p-1 ',displayProfessionalForm?'bg-orange-400':'bg-blue-400']" @click="toggleProfessionalForm" v-if="!professionalExperienceExists">
                    <span class="p-2">
                    {{displayProfessionalForm?'Close':'Add years'}}
                    </span>            
                  </button>   
                </div>  
              </div>

              <div class="md:grid md:grid-cols-2 gap-4  border-blue-200 border-2 p-2 m-1 rounded-md" v-if="displayProfessionalForm">         
                <label class="block mt-4 text-sm">            
                  <span class="text-gray-700 font font-semibold dark:text-gray-400">Years of experience</span>
                 
                  <FormulateInput
                    v-model="professionalExperience.years_of_experience"
                    :options="[{value:'1-4',label:'1 To 4 Years'},{value:'5-10',label:'5 To 10 Years'},{value:'over-10',label:'Over 10 Years'}]"
                    type="select"
                    placeholder="Select range"
                  />

                  <span v-if="getErrorMessage['years_of_experience']">
                    <span v-if="getErrorMessage['years_of_experience'].length>0">
                      <span v-for="(error,index) in getErrorMessage['years_of_experience']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>            
                </label> 
              
                <button
                  :class="['block w-full col-span-2 justify-end px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600  focus:outline-none focus:shadow-outline-purple ',isLoading?'cursor-not-allowed bg-purple-300 hover:bg-purple-400':'bg-purple-600 hover:bg-purple-700']" v-bind:disabled="isLoading" type="submit" @click="submitExperience('professional')">
                  <span v-if="!isLoading">{{activeLanguage.store.actions.submit}}</span>
                  <span v-if="isLoading" class="flex justify-center"><loading></loading></span>                
                </button>              
              </div>

              <table class=" p-4 w-full bg-gray-50 text-sm" v-if="rdeSelfProfile.detailed_experience && rdeSelfProfile.detailed_experience.length>0">
                <thead class=" bg-gray-200">
                  <th class="border border-black">No. of years</th>
                </thead>
                <tbody class="">
                  <tr v-for="(experience,index) in rdeSelfProfile.detailed_experience" :key="index">
                    <td class="border border-black p-2 capitalize" v-if="experience.experience_type==='professional_experience'">{{experience.years_of_experience}}</td>
                  </tr>            
                </tbody>
              </table>

            </div>
            
            
           
          </div>

          <div v-if="rdeSelfProfile && rdeSelfProfile.languages " class="mt-8 md:grid md:grid-cols-1 gap-4 border-4 border-sky-500 rounded-sm p-2 bg-gray-100">
            <span class="col-span-2 flex justify-center font-semibold text-lg">{{activeLanguage.store.rde_self_registration_form.languages}}</span>               
            <div class="bg-gray-100 rounded-sm">
              <div class="flex justify-end"> 

                <div class="">
                  <button :class="[' text-white  justify-end rounded-md text-xs m-1 p-1 ',displayLanguageForm?'bg-orange-400':'bg-blue-400']" @click="toggleLanguageForm" >
                    <span class="p-2">
                    {{displayLanguageForm?'Close':'Add language'}}
                    </span>            
                  </button>   
                </div>  
              </div>

              <div class="md:grid md:grid-cols-2 gap-4  border-blue-200 border-2 p-2 m-1 rounded-md" v-if="displayLanguageForm">         
                <label class="block mt-4 text-sm">            
                  <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_profile.name}}</span>
                  <FormulateInput
                    v-model="language.language"
                    :options="languages"
                    type="select"
                    placeholder="Select language"
                    required
                  />
                  <span v-if="getErrorMessage['language']">
                    <span v-if="getErrorMessage['language'].length>0">
                      <span v-for="(error,index) in getErrorMessage['language']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>            
                </label>  

                <label class="block mt-4 text-sm">   
                  <span class="text-gray-700 font font-semibold dark:text-gray-400">Proficiency level</span>               
                  
                  <FormulateInput
                    v-model="language.proficiency_level"
                    :options="[{value:'beginner',label:'Beginner'},{value:'intermediate',label:'Intermediate (Read,Write,Speak)'},{value:'fluent',label:'Fluent (Read,Write,Speak)'},{value:'native_speaker',label:'Native Speaker (Read,Write,Speak)'}]"
                    type="select"
                    placeholder="Select proficiency"
                    required
                  />

                  <span v-if="getErrorMessage['proficiency_level']">
                    <span v-if="getErrorMessage['proficiency_level'].length>0">
                      <span v-for="(error,index) in getErrorMessage['proficiency_level']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>            
                </label> 
              
                <button
                  :class="['block w-full col-span-2 justify-end px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600  focus:outline-none focus:shadow-outline-purple ',isLoading?'cursor-not-allowed bg-purple-300 hover:bg-purple-400':'bg-purple-600 hover:bg-purple-700']" v-bind:disabled="isLoading" type="submit" @click="submitLanguage">
                  <span v-if="!isLoading">{{activeLanguage.store.actions.submit}}</span>
                  <span v-if="isLoading" class="flex justify-center"><loading></loading></span>                
                </button>              
              </div>
              <table class=" p-4 w-full bg-gray-50 text-sm" v-if="rdeSelfProfile.languages && rdeSelfProfile.languages.length>0">
                <thead class=" bg-gray-200">
                  <th class="border border-black">Language</th>
                  <th class="border border-black">Proficiency</th>
                </thead>
                <tbody class="">
                  <tr v-for="(language,index) in rdeSelfProfile.languages" :key="index">
                    <td class="border border-black p-2 capitalize" >{{language.language_name}}</td>
                    <td class="border border-black p-2 capitalize" >{{language.proficiency_level}}</td>
                  </tr>            
                </tbody>
              </table>
            </div>                    
                      
          </div>
            
        </tab>

        <tab :title="activeLanguage.store.rde_self_profile.qualifications" class="md:grid md:grid-cols-4 space-x-4">
          <div class="col-span-4 rounded-md border-2 border-green-700">
            <!-- academic qualifications -->
            <div>
              <div class="p-4">
                <div class=" text-green-500 bg-green-500"/>
                <span class="flex justify-between">  
                  <span></span>              
                  <span class="text-yellow-700 font-semibold text-base">{{activeLanguage.store.rde_self_profile.academic_qualifications}}</span>      
                  <span></span>              
                </span> 
              </div>
              <div class="w-full px-4">
                <div v-if="rdeQualifications.length>0">               
                  <table class="w-full p-4 border-black border-b border-t">
                    <thead class="text-sm  font-semibold pb-2 pt-2 border-l   bg-gray-100">
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.name}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.type}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.institution}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.dates}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.rde_self_profile.actions}}</td>                    
                    </thead>
                    <tbody>
                      <tr class=" text-sm border-b border-r border-l border-black" v-for="(qualification,index) in rdeQualifications" :key="index">
                        <td class="p-3 border-l border-black">{{qualification.field_of_study}}</td>
                        <td class="p-3 border-l border-black">{{qualification.qualification_type.degree_level}}</td>
                        <td class="p-3 border-l border-black">{{qualification.institution}}</td>
                        <td class="p-3 border-l border-r border-black text-xs">From {{qualification.start_date}} to {{qualification.end_date}}</td>
                        <td class="p-3  border-black flex">
                          <span>
                            <router-link
                              :to="{name:'updateRDEQualification', params:{qualificationId:qualification.id, qualificationName:qualification.field_of_study}}"
                              class="btn btn-green bg-green-400 hover:bg-green-500 h-full text-md text-white mr-1"
                              title="Update"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </router-link>
                          </span>
                          <span>
                            <router-link
                              :to="{name:'deleteRDEQualification', params:{qualificationId:qualification.id, qualificationName:qualification.field_of_study}}"
                              class="btn btn-red bg-red-400 hover:bg-red-500 h-full text-md text-white"
                              title="Delete"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </router-link>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="text-yellow-500 font-mono">{{activeLanguage.store.rde_self_profile.no_qualifications_added}}.</div>     

                <!-- add qualification button -->
                <button class="flex justify-between w-full px-4 py-2 ">
                  <span></span>
                  <span class="">
                    <span class="flex ">                 
                      <router-link
                        :to="{name:'addRDEQualification', params:{rdeId:rdeSelfProfile.id,rdeName:(rdeSelfProfile.first_name?rdeSelfProfile.first_name:'')+ (rdeSelfProfile.last_name?' '+rdeSelfProfile.last_name:'')}}"
                        class="btn btn-blue bg-blue-400 hover:bg-blue-500 h-1/6 text-md text-white"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="px-1">{{activeLanguage.store.rde_self_profile.add_qualification}}</span>
                      </router-link>
                    </span>
                  </span>                  
                  <span></span>
                </button>
              </div>
            </div>

            <!-- professional experience -->
            <div>
              <span class="p-4"> 
                <hr class="text-green-500 bg-green-500"/>
                <span class="flex justify-between">                
                  <span></span>              
                  <span class="text-yellow-700 font-semibold text-base">{{activeLanguage.store.rde_self_profile.add_experience}}</span>      
                  <span></span>              
                </span> 
              </span> 
              <div class="w-full px-4">
                <div v-if="rdeSelfProfile.professional_experience">               
                  <table class="w-full p-4 border-black border-b border-t">
                    <thead class="text-sm  font-semibold pb-2 pt-2 border-l   bg-gray-100">
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.title}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.description}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.institution}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.rde_self_profile.dates}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.rde_self_profile.actions}}</td>
                    </thead>

                    <tbody>
                      <tr class=" text-sm border-b border-r border-l border-black" v-for="(experience,index) in rdeSelfProfile.professional_experience" :key="index">
                        <td class="p-3 border-l border-black">{{experience.title}}</td>
                        <td class="p-3 border-l border-black">{{experience.description}}</td>
                        <td class="p-3 border-l border-black">{{experience.institution}}</td>
                        <td class="p-3 border-l border-r border-black text-xs">From {{experience.start_date}} to {{experience.end_date}}</td>
                        <td class="p-3  border-black flex">
                          <span>
                            <router-link
                              :to="{name:'updateRDEExperience', params:{experienceName:experience.title?experience.title:'experienceName',
                              rdeName: rdeSelfProfile.first_name,
                              itemIndex: index,
                              objectId: rdeSelfProfile.id
                              }}"
                              class="btn btn-green bg-green-400 hover:bg-green-500 h-full text-md text-white mr-1"
                              title="Update"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </router-link>
                          </span>
                          <span>
                            <router-link
                              :to="{name:'deleteRDEExperience', params:{experienceName:experience.title?experience.title:'experienceName',
                              rdeName: rdeSelfProfile.first_name,
                              itemIndex: index,
                              objectId: rdeSelfProfile.id
                              }}"
                              class="btn btn-red bg-red-400 hover:bg-red-500 h-full text-md text-white"
                              title="Delete"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </router-link>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="text-yellow-500 font-mono">{{activeLanguage.store.rde_self_profile.no_experience_added}}.</div>     

                <!-- add experience button -->
                <button class="flex justify-between w-full px-4 py-2 ">
                  <span></span>
                  <span class="">
                    <span class="flex ">                 
                      <router-link
                        :to="{name:'addRDEExperience', params:{rdeId:rdeSelfProfile.id,rdeName:(rdeSelfProfile.first_name?rdeSelfProfile.first_name:'')+ (rdeSelfProfile.last_name?' '+rdeSelfProfile.last_name:''),allItems:rdeSelfProfile.professional_experience}}"
                        class="btn btn-blue bg-blue-400 hover:bg-blue-500 h-1/6 text-md text-white"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="px-1">{{activeLanguage.store.rde_self_profile.add_experience}}</span>
                      </router-link>
                    </span>
                  </span>                  
                  <span></span>
                </button>
              </div>
            </div>
            <!-- references -->
            <div>
              <span class=" p-4"> 
                <hr class="text-green-500 bg-green-500"/>
                <span class="flex justify-between">
                  <span></span>              
                  <span class="text-yellow-700 font-semibold text-base">{{activeLanguage.store.rde_self_profile.references}}</span>      
                  <span></span>              
                </span> 
              </span> 
              <div class="w-full px-4">
                <div v-if="rdeSelfProfile.references">               
                  <table class="w-full p-4 border-black border-b border-t">
                    <thead class="text-sm  font-semibold pb-2 pt-2 border-l   bg-gray-100">
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.name}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.contact}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.institution}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.rde_self_profile.description}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.rde_self_profile.actions}}</td>
                    </thead>

                    <tbody>
                      <tr class=" text-sm border-b border-r border-l border-black" v-for="(reference,index) in rdeSelfProfile.references" :key="index">
                        <td class="p-3 border-l border-black">{{reference.name}}</td>
                        <td class="p-3 border-l border-black flex justify-between">
                          <span class="pr-3"> <a :href="reference.phone_number">{{reference.phone_number}}</a>
                            </span>
                             <br> 
                          <span><a :h-ref="mailto.concat(reference.email)">{{reference.email}}</a></span> 
                        </td>
                        <td class="p-3 border-l border-black">{{reference.institution}}</td>                        
                        <td class="p-3 border-l border-black">{{reference.description}}</td>  
                        <td class="p-3  border-l border-black flex">
                          <span>
                            <router-link
                                :to="{name:'updateRDEReference', params:{rdeName:rdeSelfProfile.first_name?rdeSelfProfile.first_name:'RDE',
                              objectId: rdeSelfProfile.id,itemIndex: index
                              }}"
                              class="btn btn-green bg-green-400 hover:bg-green-500 h-full text-md text-white mr-1"
                              title="Update"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </router-link>
                          </span>
                          <span>
                            <router-link
                                :to="{name:'deleteRDEReference', params:{rdeName:rdeSelfProfile.first_name?rdeSelfProfile.first_name:'RDE',
                              objectId: rdeSelfProfile.id,itemIndex: index
                              }}"
                              class="btn btn-red bg-red-400 hover:bg-red-500 h-full text-md text-white"
                              title="Delete"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </router-link>
                          </span>
                        </td>                      
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="text-yellow-500 font-mono">{{activeLanguage.store.rde_self_profile.no_reference_listed}}.</div>     

                <!-- add reference button -->
                <button class="flex justify-between w-full px-4 py-2 ">
                  <span></span>
                  <span class="">
                    <span class="flex ">                 
                      <router-link
                        :to="{name:'addRDEReference', params:{rdeName:rdeSelfProfile.first_name?rdeSelfProfile.first_name:'RDE',
                              objectId: rdeSelfProfile.id,
                              }}"
                        class="btn btn-blue bg-blue-400 hover:bg-blue-500 h-1/6 text-md text-white"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="px-1">{{activeLanguage.store.rde_self_profile.add_reference}}</span>
                      </router-link>
                    </span>
                  </span>                  
                  <span></span>
                </button>
              </div>
            </div>    
            <!-- Previous Deployment Experience -->
            <div>
              <span class=" p-4"> 
                <hr class="text-green-500 bg-green-500"/>
                <span class="flex justify-between">
                  <span></span>              
                  <span class="text-yellow-700 font-semibold text-base">{{activeLanguage.store.rde_self_profile.previous_deployment}}</span>      
                  <span></span>              
                </span> 
              </span> 
              <div class="w-full px-4">
                <div v-if="rdeSelfProfile.previous_deployment_experience">               
                  <table class="w-full p-4 border-black border-b border-t">
                    <thead class="text-sm  font-semibold pb-2 pt-2 border-l   bg-gray-100">
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.name}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.sign_up_form.country}}</td>
                      <td class="p-3 border-l border-black border-b">{{activeLanguage.store.rde_self_profile.description}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.sign_up_form.country}}</td>
                      <td class="p-3 border-l border-r border-black border-b">{{activeLanguage.store.rde_self_profile.actions}}</td>
                    </thead>

                    <tbody>
                      <tr class=" text-sm border-b border-r border-l border-black" v-for="(reference,index) in rdeSelfProfile.previous_deployment_experience" :key="index">
                        <td class="p-3 border-l border-black">{{reference.name}}</td>                        
                        <td class="p-3 border-l border-black">{{reference.country}}</td>                        
                        <td class="p-3 border-l border-black">{{reference.description}}</td>  
                        <td class="p-3 border-l border-black">From {{reference.start_date}} to {{reference.end_date}}</td>                        
                        <td class="p-3  border-l border-black flex">
                          <span>
                            <router-link
                                :to="{name:'updatePreviousDeployment', params:{rdeName:rdeSelfProfile.first_name?rdeSelfProfile.first_name:'RDE',
                              objectId: rdeSelfProfile.id,itemIndex: index
                              }}"
                              class="btn btn-green bg-green-400 hover:bg-green-500 h-full text-md text-white mr-1"
                              title="Update"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </router-link>
                          </span>
                          <span>
                            <router-link
                                :to="{name:'deletePreviousDeployment', params:{rdeName:rdeSelfProfile.first_name?rdeSelfProfile.first_name:'RDE',
                              objectId: rdeSelfProfile.id,itemIndex: index
                              }}"
                              class="btn btn-red bg-red-400 hover:bg-red-500 h-full text-md text-white"
                              title="Delete"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </router-link>
                          </span>
                        </td>                      
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="text-yellow-500 font-mono">{{activeLanguage.store.rde_self_profile.no_previous_deployment_listed}}.</div>     

                <!-- add deployment button -->
                <button class="flex justify-between w-full px-4 py-2 ">
                  <span></span>
                  <span class="">
                    <span class="flex ">                 
                      <router-link
                        :to="{name:'addPreviousDeployment', params:{rdeName:rdeSelfProfile.first_name?rdeSelfProfile.first_name:'RDE',
                              objectId: rdeSelfProfile.id,
                              }}"
                        class="btn btn-blue bg-blue-400 hover:bg-blue-500 h-1/6 text-md text-white"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="px-1">{{activeLanguage.store.rde_self_profile.previous_deployment}}</span>
                      </router-link>
                    </span>
                  </span>                  
                  <span></span>
                </button>
              </div>
            </div>    

          </div>

          <!-- CV -->
          <div class="col-start-2 col-end-4 rounded-md border-2 border-green-700 mt-5 ml-20">
            <span v-if="this.loading" class=" mt-5 flex justify-center">
              <loading></loading>
            </span>
            <div class="">          
              <!-- CV exists -->
              <span v-if="this.rdeSelfProfile.cv_upload_status && !this.loading" class="">  
                <span class="flex justify-between p-4">  
                  <span></span>              
                  <span class="text-yellow-700 font-semibold text-base">Curriculum Vitae (CV)</span>      
                  <span></span>              
                </span>  
                <span class="flex justify-between p-4">
                  <span>
                    <button @click="togglePdfDisplay('fetchCV','viewPdf')" 
                      class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
                      >
                      <span>{{activeLanguage.store.actions.view}}</span>
                    </button>
                  </span>
                  <span>
                    <span>
                      <button
                          class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue" 
                          @click="toggleUploadField">
                        {{displayUploadButton?activeLanguage.store.actions.close:activeLanguage.store.actions.update}}
                      </button>
                    </span>
                  </span>
                </span>
                <span v-if="displayUploadButton" class="text-semibold text-orange-300 p-2">
                  <label class="block mt-4 text-sm">
                    <span class="text-gray-700 font font-semibold dark:text-gray-400">Attach CV <span class="text-xs italic">(pdf and word docs)</span></span>
                    <div
                        class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                    >
                      <input  type="file"
                              id="newCV"
                              :name="form.cv"
                              @change="displaySubmit('newCV')"
                              class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                              placeholder="john.doe@gmail.com"
                              validation="required"  
                              accept=".pdf" 
                      />        
                        <span v-if="rdeSelfProfile.cv && getErrorMessage['cv']">
                        <span v-if="rdeSelfProfile.cv && getErrorMessage['cv'].length>0">
                          <span v-for="(error,index) in getErrorMessage['cv']" :key="index">
                            <span class="text-red-500 animate-pulse">{{error}}</span>
                          </span>
                        </span>
                      </span>   
                    </div>
                  </label>  

                  <span class="flex justify-between p-2">
                    <span></span>
                    <span></span>
                    <button class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"  @click="saveCV('newCV')" v-if="fileUploaded"> Submit CV</button>
                  </span>
                </span>
              </span>

              <!-- No CV -->
              <span v-if="!this.rdeSelfProfile.cv_upload_status && !this.loading" class="text-semibold text-orange-300 p-2">
                {{activeLanguage.store.rde_self_profile.no_cv}}
                <label class="block mt-4 text-sm">
                    <span class="text-gray-700 font font-semibold dark:text-gray-400">Attach CV <span class="text-xs italic">(pdf and word docs)</span></span>
                    <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                      <input  
                        type="file"
                        id="noCVFile"
                        :name="form.cv"
                        @change="displaySubmit('noCVFile')"
                        class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                        placeholder="john.doe@gmail.com"
                        validation="required"  
                        accept=".pdf" 
                      />        
                        <span v-if="rdeSelfProfile.cv && getErrorMessage['cv']">
                        <span v-if="rdeSelfProfile.cv && getErrorMessage['cv'].length>0">
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
                    <span></span>
                    <button class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"  
                    @click="saveCV('noCVFile')" v-if="fileUploaded"> {{activeLanguage.store.actions.submit}}</button>
                  </span>
                
              </span>
            </div>
          </div>         
        
        </tab>

        <tab :title="activeLanguage.store.rde_self_profile.recommendations" class="space-x-4 grid grid-cols-3">
          <span v-if="this.loading" class=" mt-5 flex justify-center col-span-3">
            <loading></loading>
          </span>
          <span v-if="rdeSelfProfile.recommendations && !this.loading" class="col-span-2">
            <table class="w-full border border-black p-3" v-if="rdeSelfProfile.recommendations.length>0">
              <thead class="text-lg font-semibold font-mono border border-black p-2 ">
                <th>{{activeLanguage.store.rde_self_profile.recommendations}}</th>
                <th class="border border-black capitalize">{{activeLanguage.store.rde_self_profile.made_by}}</th>
              </thead>
              <tbody>
                <tr v-for="(recommendation, index) in this.rdeSelfProfile.recommendations" :key="index" class="text-md border border-black">
                  <td class="p-2">{{recommendation.comment?recommendation.comment:''}}</td>
                  <td class="border-l border-black p-2 uppercase">{{recommendation.author.username?recommendation.author.username:''}}</td>
                </tr>
              </tbody>
            </table>
            <span v-else class="text-yellow-400 text-xl flex justify-center font-bold animate-pulse">
              {{activeLanguage.store.rde_self_profile.no_recommendations}}.
            </span>
          </span>         
        </tab>      
       
      </tabs>      
    </div> 
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Tab from '../tabs/Tab.vue'
import Tabs from '../tabs/Tabs.vue'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import Loading from "../../components/utilities/loading";

// import VuePdfApp from "vue-pdf-app";
// import "vue-pdf-app/dist/icons/main.css";
import {  baseUrl } from '@/utils/constants';

export default {
  name: "RDESelfProfile",
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
        cv:'',
        oneHealthSector:'',
        profession:'',
        specialization:'',
        competencies:[]
      },
      managerialExperience:{
        no_of_people_managed:0,
        years_of_experience:0
      },
      professionalExperience:{
        years_of_experience:0
      },
      language:{language:'',proficiency_level:''},
      managerialExperienceExists:false,
      professionalExperienceExists:false,
      mode: 'light',
      mailto: "mailto:",
			tel: "tel:",
      viewPdf: false,
      viewPdfToUpload: false,
      RDEcv:'',
      fileUploaded:0,
      loading:false,
      isLoading:false,
      username: '',
      displayUploadButton:false,
      rdeQualifications:[],
      rde_id:'',
      oneHealthSectors:[],
      professions:[],
      specializations:[],
      competences:[],
      displayCompetenciesForm:false,
      displayManagerialForm:false,
      displayProfessionalForm:false,
      displayLanguageForm:false,
      languages:[]
        

    }
  },
  methods:{
    ...mapActions(['fetchRDEById','fetchRDEcv','fetchRDES','getRDEprofileDeployment','fetchQualificationsById','fetchAllLanguages']),
    displaySubmit(field_id){
      if(document.getElementById(field_id).files[0]) this.fileUploaded+=1  
    },
    toggleCompetenceForm(){
      this.displayCompetenciesForm=!this.displayCompetenciesForm
    },
    toggleManagerialForm(){
      this.displayManagerialForm=!this.displayManagerialForm
    },
    toggleProfessionalForm(){
      this.displayProfessionalForm=!this.displayProfessionalForm
    },
    toggleLanguageForm(){
      this.displayLanguageForm=!this.displayLanguageForm
    },
    submitCompetencies(){      
      this.isLoading=true
      let payload={}
      payload.id=this.rdeSelfProfile.id
      payload.competencies=this.form.competencies

      // eslint-disable-next-line no-unused-vars
      this.$store.dispatch('updateRDEById',payload).then(resp => {
        this.fetchRDEData() 
        this.displayCompetenciesForm=false   
        // location.reload()      
      }).catch(err => {
        console.log(err);
        // eslint-disable-next-line no-unused-vars
      }).then(resp=>{this.isLoading=false})
    },
    submitExperience(type){      
      this.isLoading=true
      let payload={
        profile:this.rdeSelfProfile.id,
        occupation:this.rdeSelfProfile.competencies_objects[0].occupation_id
      }
      if(type==='managerial'){        
        payload.years_of_experience=this.managerialExperience.years_of_experience,
        payload.no_of_people_managed=this.managerialExperience.no_of_people_managed,
        payload.experience_type='managerial_experience'
      } 
      else if(type==='professional'){
        payload.years_of_experience=this.professionalExperience.years_of_experience,
        payload.experience_type='professional_experience'
      }
      else console.log('Undefined experience type')

      // eslint-disable-next-line no-unused-vars
      this.$store.dispatch('postExperience',payload).then(resp => {
        this.fetchRDEData() 
        this.displayManagerialForm=false  
        this.displayProfessionalForm=false 
        this.managerialExperience={}
        this.professionalExperience={}
        // location.reload()      
      }).catch(err => {
        console.log(err);
        // eslint-disable-next-line no-unused-vars
      }).then(resp=>{this.isLoading=false})
    },
    submitLanguage(){      
      this.isLoading=true
      let payload=this.language
      payload.profile=this.rdeSelfProfile.id
      // eslint-disable-next-line no-unused-vars
      this.$store.dispatch('postLanguage',payload).then(resp => {
        this.fetchRDEData() 
        this.displayLanguageForm=false 
        this.language={}
        // location.reload()      
      }).catch(err => {
        console.log(err);
        
        // eslint-disable-next-line no-unused-vars
      }).then(resp=>{this.isLoading=false})
    },
    fetchOneHealthSectors(){
      this.$store.dispatch('fetchAllOneHealthSectors').then(resp => {
        this.oneHealthSectors = resp;   
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
    fetchProfessions(){
      this.$store.dispatch('fetchOccupationsBySector',this.form.oneHealthSector).then(resp => {
        this.professions = resp;   
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
    fetchSpecializations(){
      this.$store.dispatch('fetchSpecializationByProfession',this.form.profession).then(resp => {
        this.specializations = resp;   
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
    fetchCompetences(){
      this.$store.dispatch('fetchCompetenceBySpecialization',this.form.specialization).then(resp => {
        this.competences = resp;  
        
        for(let competence of this.competences){
          delete competence.id
          delete competence.created_at
          delete competence.updated_at
          delete competence.type
          delete competence.specialization
          delete competence.description
          delete competence.name
        }
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
    saveCV(field_id){
      if(document.getElementById(field_id).files[0]){
        let fileInput = document.getElementById(field_id).files[0];
        let formData = new FormData()
        formData.append('profile_id',this.rdeSelfProfile.id)
        formData.append('cv', fileInput)
        this.$store.dispatch('uploadCVById', formData).then(()=>{
          this.$toast.success("uploaded")
          this.fetchRDEData()
          this.getProfileDetails()
          this.displayUploadButton=false  
        }).catch(err=>{
          console.log(err)
        })
      }
      
    },
    getProfileDetails(){
      this.loading=true
     this.user_level= localStorage.getItem('level')
     this.region= localStorage.getItem('region')
     this.fullname= localStorage.getItem('fullname')
     this.username= localStorage.getItem('username')
     this.signUpId= localStorage.getItem('id')
     if(this.rdeSelfProfile && Object.keys(this.rdeSelfProfile).length === 0){
       this.fetchSignUpData(this.signUpId)
     }
     this.loading=false
     this.fetchRDEData()
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
      this.$store.dispatch('fetchRDES',`?page=1`).then(resp => {
        if(resp.results.length > 0) {
          this.rdeSelfProfile = resp.results[0]
          this.rde_id=''
          this.rde_id+=this.rdeSelfProfile.id
          this.fetchRDEdeployments(this.rdeSelfProfile.id)
         localStorage.setItem('rdeId', this.rdeSelfProfile.id)
         if(this.rdeSelfProfile){
          if(this.rdeSelfProfile.detailed_experience && this.rdeSelfProfile.detailed_experience.length>0){
            let managerialExperience=this.rdeSelfProfile.detailed_experience.filter(v=>v.experience_type==='managerial_experience')
            let professionalExperience=this.rdeSelfProfile.detailed_experience.filter(v=>v.experience_type==='professional_experience')
            if(managerialExperience.length>0) this.managerialExperienceExists=true
            if(professionalExperience.length>0) this.professionalExperienceExists=true

          }
         }

        }
        }).catch(err=>{
          this.$store.dispatch('setErrorMsg', err.data)
        }).then(()=>{
          this.loading = false
          const qs = require('qs');
          const query = qs.stringify({
            profile:  this.rde_id,
            })
          this.$store.dispatch('fetchQualificationsById',this.rde_id?query:'id').then(resp => {
            if(resp.results.length > 0) {
              this.rdeQualifications = resp.results
        }
        }).catch(err=>{
          this.$store.dispatch('setErrorMsg', err.data)
        }).then(()=>{
          this.loading = false
      })

      })

      //fetch academic RDE qualifications   
         
      

    },
    fetchRDEdeployments(rde_id){
      this.$store.dispatch('getRDEprofileDeployment',rde_id).then(resp => {
        console.log()
         this.rdeDeployments = resp
       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    },
    fetchLanguages(){
      this.$store.dispatch('fetchAllLanguages').then(resp => {
        let tempLanguages=resp
        for(let language of tempLanguages){
          console.log('temp',language.name)
          let myObj={}
          myObj.value=language.id
          myObj.label=language.name    
          this.languages.push(myObj)      
        }
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
    ...mapGetters(['getErrorMessage', 'allLanguages', 'activeLanguage']),
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
    },
    selected_language: function (){
      this.$store.dispatch('switchLanguage', this.selected_language)
    }
  },

  mounted(){
    // this.fetchRDEData()
    this.fetchOneHealthSectors()
    this.getProfileDetails()
    this.fetchLanguages()
    this.selected_language = this.activeLanguage.name

  }
};
</script>
<style lang="css">
* {
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
  }

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
