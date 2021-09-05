<template>
  <dashboard_layout :page_title= "`Register RDE`">
    
    <div>
      <div :class="['px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']">
        <h3 class="text-blue-400 font-semibold">Personal Details</h3>
        <!-- name section -->
        <div class="grid grid-cols-3 gap-6">
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">First Name</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input
                  v-model="form.first_name"
                  class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  type="text"
                  required
                  placeholder="John"
                  name="first_name"
              /> 
              <span v-if="getErrorMessage['first_name']">
                <span v-if="getErrorMessage['first_name'].length>0">
                  <span v-for="(error,index) in getErrorMessage['first_name']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>  
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Middle Name</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
            <input
                v-model="form.middle_name"
                class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                type="text"
                name="middle_name"
                placeholder="Joseph"
            />
              
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Last Name</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input
                  v-model="form.last_name"
                  class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  type="text"
                  name="last_name"
                  validation="required"
                  placeholder="Doe"
              />  
               <span v-if="getErrorMessage['last_name']">
                <span v-if="getErrorMessage['last_name'].length>0">
                  <span v-for="(error,index) in getErrorMessage['last_name']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>       
            </div>
          </label>
        </div>
        <!-- location and gender section -->
        <div class="grid grid-cols-3 gap-4">
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Gender</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <!-- <input type="text"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="--Pick--"
                    name="gender"
                    :options="gender_types"
              /> -->
              <select name="gender" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required"
              v-model="form.gender">
                <option value="" selected disabled>--select--</option>
                <option value="M">Male</option>
                <option value="F">Female</option> 
                <option value="T">Transgender</option>
                <option value="O">Prefer Not To Say</option>
              </select>
               <span v-if="getErrorMessage['gender']">
                <span v-if="getErrorMessage['gender'].length>0">
                  <span v-for="(error,index) in getErrorMessage['gender']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span> 
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Region</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <select name="region_of_residence_id" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="select"
              v-model="form.region_of_residence_id" id="region"> 
                <option value="" disabled selected>--Select region--</option>     
                <option v-for="(region,index) in regions" :key="index" :value="region.id">{{region.name}}</option>
              </select>
               <span v-if="getErrorMessage['region_of_residence_id']">
                <span v-if="getErrorMessage['region_of_residence_id'].length>0">
                  <span v-for="(error,index) in getErrorMessage['region_of_residence_id']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span> 
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
            </div>
          </label>          
        </div>

        <!-- contact section -->
        <div class="grid grid-cols-3 gap-4">
          <div class="grid grid-cols-2 gap-3">
             <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">ID Type</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <select name="id_type" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="select"
              v-model="form.id_type" id="id_type">
                <option value="" selected disabled>--select--</option>
                <option value="national_id">National ID No.</option>                
                <option value="birth_cert">Birth Certificate No.</option>
                <option value="alien_id">Alien ID</option>           
                <option value="military_id">Military ID No.</option>                
                <option value="passport">Passport.</option>                
              </select>
               <span v-if="getErrorMessage['id_type']">
                <span v-if="getErrorMessage['id_type'].length>0">
                  <span v-for="(error,index) in getErrorMessage['id_type']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span> 
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
              </div>
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">National ID</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input type="text"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="67234567"
                    name="id_number"
                    v-model="form.id_number"
              />
               <span v-if="getErrorMessage['id_number']">
                <span v-if="getErrorMessage['id_number'].length>0">
                  <span v-for="(error,index) in getErrorMessage['id_number']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span> 
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
              </div>
            </div>
          </label>
          </div>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Phone</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input type="tel"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="+25470..."
                    name="phone"
                    validation="required"   
                    v-model="form.phone"                 
              />
               <span v-if="getErrorMessage['phone']">
                <span v-if="getErrorMessage['phone'].length>0">
                  <span v-for="(error,index) in getErrorMessage['phone']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span> 
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Email</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input type="email"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="john.doe@gmail.com"
                    name="email"
                    validation="required"
                    v-model="form.email"
              />
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
              </div>
            </div>
          </label>
          
        </div>
        
        <div class="grid grid-cols-3 gap-4">
           <label class="block mt-4 text-sm">
            <span class="text-gray-700 font font-semibold dark:text-gray-400">Occupation</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
           <select name="region_of_residence_id" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="--select--"
              v-model="form.occupation_id" id="occupation">         
                <option value="" disabled selected>--Select occupation--</option>     
                <option v-for="(occupation,index) in occupations" :key="index"  :value="occupation.id">{{occupation.name}}</option>
              </select>

               <span v-if="getErrorMessage['occupation_id']">
                <span v-if="getErrorMessage['occupation_id'].length>0">
                  <span v-for="(error,index) in getErrorMessage['occupation_id']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>            
            </div>
          </label> 

          <label class="block mt-4 text-sm">
            <span class="text-gray-700 font font-semibold dark:text-gray-400">Date of Birth</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input type="date"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="--pick--"
                    name="date_of_birth"
                    validation="required"
                    v-model="form.date_of_birth"
              />   

               <span v-if="getErrorMessage['date_of_birth']">
                <span v-if="getErrorMessage['date_of_birth'].length>0">
                  <span v-for="(error,index) in getErrorMessage['date_of_birth']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>            
            </div>
          </label>          
        </div>

        <!-- Next of kin section -->
        <h3 class="text-blue-400 font-semibold pt-6">Next of Kin Details</h3>
        <div class="grid grid-cols-3 gap-4">
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Full Name</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input
                  class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Jane Doe"
                  name="next_of_kin_name"
                  validation="required"
                  v-model="form.next_of_kin_name"
              />      
               <span v-if="getErrorMessage['next_of_kin_name']">
                <span v-if="getErrorMessage['next_of_kin_name'].length>0">
                  <span v-for="(error,index) in getErrorMessage['next_of_kin_name']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span>    
            
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Phone</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input type="tel"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="+2547..."
                    name="next_of_kin_phone"
                    validation="required"
                    v-model="form.next_of_kin_phone"
              />
               <span v-if="getErrorMessage['next_of_kin_phone']">
                <span v-if="getErrorMessage['next_of_kin_phone'].length>0">
                  <span v-for="(error,index) in getErrorMessage['next_of_kin_phone']" :key="index">
                    <span class="text-red-500 animate-pulse">{{error}}</span>
                  </span>
                </span>
              </span> 
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Email</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <input type="email"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="john.doe@gmail.com"
                    name="next_of_kin_email"
                    validation="required"
                    v-model="form.next_of_kin_email"
              />
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
              </div>
            </div>
          </label>
        </div>
        <h6 class="text-blue-400 font-semibold pt-6">Other info</h6>  

          <div class="grid grid-cols-3 gap-3">
                         
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
                          accept=".pdf,.doc,.docx,application/msword" 
                          @input="processFile"                
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

               <label class="block mt-4 text-sm col-span-2">
                  <span class="text-gray-700  font font-semibold dark:text-gray-400">Competencies</span>
                  <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">            
                    <select name="competencies_list" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="select"
                    v-model="form.competencies_list" id="competencies_list"  multiple>
                      <option value="" disabled selected>--Select competency--</option>     
                      <option v-for="(competency,index) in competencies" :key="index"  :value="competency.id">{{competency.name}}</option>
                    </select>
                    <span v-if="getErrorMessage['competencies_list']">
                      <span v-if="getErrorMessage['competencies_list'].length>0">
                        <span v-for="(error,index) in getErrorMessage['competencies_list']" :key="index">
                          <span class="text-red-500 animate-pulse">{{error}}</span>
                        </span>
                      </span>
                    </span> 
                  
                  </div>
                </label>              
          </div>
          <div class=" mt-6 text-sm flex justify-between">
            <span v-if="fileUploaded==0"></span>
            <button @click="togglePdfDisplay" 
              class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
              v-if="fileUploaded>0">
              <span v-if="!viewPdf">Preview upload</span>
              <span v-if="viewPdf">Close preview</span>
            </button>
            <button
                class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" @click="registerRDE">
              SUBMIT
            </button>
          </div>
      </div>  

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
                    <div class="h-96" v-if="form.cv">                      
                      <vue-pdf-app :pdf="form.cv" :class="['min-w-7xl min-h-7xl px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']"></vue-pdf-app>                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-150 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm hidden">
                  
                </button>
                <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-red-400 hover:bg-red-600  font-semibold text-lg text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-base uppercase" @click="togglePdfDisplay">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      <!-- end of CV preview modal -->
                        
        
      </div>
  </dashboard_layout>
</template>
<style >

</style>

<script>

import {mapActions, mapGetters} from 'vuex';
import {app_name} from "@/utils/constants";

import dashboard_layout from '../components/layouts/dashboard_layout.vue';
// import Datepicker from 'vuejs-datepicker';

// formulate
import Vue from 'vue'

// pdf
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
// modal
import VueTailwind from 'vue-tailwind'
const components = {
  //...
}

Vue.use(VueTailwind, components)


export default {
  name: `${app_name}-self-registration`,
  components: {
    VuePdfApp,
    dashboard_layout,
    // Datepicker
  },
  data() {
    return {
      form:{
        cv:''
       },
      occupations: {},
      countries: {},
      competencies:{},
      regions: {},
      search: '',
      status: '',
      gender_types:{
        M:"Male",
        F:"Female",
        T:"Transgender",
        O:"Prefer Not To Say"
      },
      id_types:[
        {value:"nationalID", label:"National ID"},
        {value:"passportNo", label:"Passport No"}        
      ],
      viewPdf:false,
      fileUploaded:0,
      showModal: false
    }
  },
  methods: {
    ...mapActions(['fetchCountries','fetchRegions','fetchAllOccupations','fetchAllCompetencies','postRDE']),
    ...mapGetters(['allCountries']),

     registerRDE(){
      this.form.competencies_list = [this.form.competencies_list]
      this.form.region_of_residence_id=21
      console.log('form', this.form)

      let payload = this.form
      this.postRDE(payload).then(resp=>{
            this.$store.dispatch('setError',{})
            window.location.replace('/member-countries')
            console.log(resp)
      })      
    }, 
    getOccupations() {
      this.$store.dispatch('fetchAllOccupations').then(resp => {
        this.occupations = resp;   
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
    getCompetencies() {
      this.$store.dispatch('fetchAllCompetencies').then(resp => {
        this.competencies = resp;   
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
    getCountries() {
      this.$store.dispatch('fetchCountries').then(resp => {
        this.countries = resp;   
        // console.log('countries:', this.countries)             
      }).catch(err => {
        console.log(err);
      })
    },
     getRegions() {
      this.$store.dispatch('fetchRegions').then(resp => {
        this.regions = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    filterRegions(selectedCountry){
      console.log('Selected Country', selectedCountry)

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


    
    filterPaymentMethod() {
      // if (this.paymentMethods !== "") {
      // 	this.$router.push({ query: { paymentMethods: this.paymentMethods } });
      // } else {
      // 	this.$router.push({ query: {} });
      // }
    },
    togglePdfDisplay(){
      this.viewPdf=!this.viewPdf;
    },
    filterStatus() {
      // if (this.paymentMethods !== "") {
      // 	this.$router.push({ query: { paymentMethods: this.paymentMethods } });
      // } else {
      // 	this.$router.push({ query: {} });
      // }
    },
    filterByStatus(status) {
      this.paymentMethod = ''
      this.$store.dispatch('fetchTransactions', status).then(resp => {
        this.transactions = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    filterByPaymentMethod(paymentMethod) {
      this.status = '';
      this.$store.dispatch('fetchTransactions', paymentMethod).then(resp => {
        this.transactions = resp;
      }).catch(err => {
        console.log(err);
      })
    },
    exportDataToExcel(tableID, filename = '') {
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

      // Specify file name
      filename = filename ? filename + '.xls' : 'excel_data.xls';

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

    },
    filterCounties(){
        document.ready(function() {

        ("#country").change(function() {
            var val = this.val();
            if (val == "burundi") {
              alert("selected");
                ("#county").html("<option value='test'>item1: burundi 1</option><option value='test2'>item1: burundi 2</option>");
            } else if (val == "item2") {
                ("#county").html("<option value='test'>item2: test 1</option><option value='test2'>item2: test 2</option>");

            } else if (val == "item3") {
                ("#county").html("<option value='test'>item3: test 1</option><option value='test2'>item3: test 2</option>");

            }
        });

    });
    }
  },

   mounted() {
    this.getCountries()
    this.getRegions()
    this.getOccupations()    
    this.getCompetencies()    
  },
  
  computed: {
    ...mapGetters(['allRegions','getErrorMessage'])
  }
};
</script>
