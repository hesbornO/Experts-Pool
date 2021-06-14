<template>
  <dashboard_layout page_title= "EAC RDE Sign Up">
    <!-- <div
        :class="['px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']"
    >
      <FormulateForm  v-model="form"
        class="grid grid-rows-modal"
        autocomplete="off" :errors="errors"
        :form-errors="serverError"
      >
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput type="text" name="first_name" label="First Name" placeholder="John " validation="required" />
          <FormulateInput type="text" name="middle_name" label="Middle Name" placeholder="Joseph" />
          <FormulateInput type="text" name="last_name" label="Last Name" validation="required" placeholder="Doe"/>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput type="text" name="gender" label="Gender" placeholder="Type to select "  validation="required" />
          <FormulateInput type="date" placeholder="Pick" name="date_of_birth" label="Date of Birth" validation="required" />      
        </div>
        <div class="grid grid-cols-3 gap-3 items-baseline">
          <FormulateInput name="phone " label="Mobile Phone Number" placeholder="+254 71234567" validation="required" type="tel" />
          <FormulateInput name="email" label="Email address" placeholder="john@gmail.com" type="tel" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput name="nationality" type="text" label="Country of Origin" placeholder="EAC countries dropdown" validation="required"/>
          <FormulateInput name="location" type="text" label="Location" validation="required" placeholder="Type to choose filtered country locations/sub-locations... " />        
        </div>
          <h3 class="text-blue-500 font-semibold">Next of Kin Details</h3>
        <div class="grid grid-cols-3 gap-3">
          <FormulateInput name="next_of_kin_name" class="border" type="text" label="ID Number" placeholder="Jane Doe" validation="required"/>
          <FormulateInput name="next_of_kin_email" type="text" label="Email Address" placeholder="JaneDoe@gmail.com" validation="required"/>
        </div>
        <FormulateErrors class="rounded-sm text-xs px-4 py-3 text-red-700 bg-red-100 border border-red-300" />
      </FormulateForm>

    </div> -->
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
                  validation="required"
                  placeholder="John"
                  name="first_name"
              />         
            
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="prefer_not_to_say">Prefer Not To Say</option>
              </select>
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Country of Residence</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div
                class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
            >
              <!-- <input type="text"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="--Pick--"
              /> -->
              <select name="nationality" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="select"
              v-model="form.nationality" id="country" :options="eac_countries">
                <option value="" selected disabled>--select--</option>
                <option value="burundi">Burundi</option>
                <option value="kenya">Kenya</option>
                <option value="rwanda">Rwanda</option>
                <option value="tanzania">Tanzania</option>
                <option value="uganda">Uganda</option>
                <option value="south_sudan">South Sudan</option>
              </select>
              <div
                  class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
            </div>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Location</span>
            <!-- focus-within sets the color for the icon when input is focused -->
            <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
              <!-- <input type="text"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="--Pick--"
                    name="location"
                    v-model="form.location"
              /> -->
              <select name="location" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" placeholder="select"
              v-model="form.location" id="county">
                <option value="" selected disabled>--select--</option>
                <option value="Bubanza">Bubanza</option>
                <option value="Bujumbura Mairie"> Bujumbura Mairie</option>
                <option value="Bujumbura Rural"> Bujumbura Rural</option>
                <option value="Bururi">Bururi</option>
                <option value="Cankuzo">Cankuzo</option>
                <option value="Cibitoke">Cibitoke</option>
                <option value="Gitega">Gitega</option>
                <option value="Karuzi">Karuzi</option>
                <option value="Kayanza">Kayanza</option>
                <option value="Kirundo">Kirundo</option>
                <option value="Makamba">Makamba</option>
                <option value="Muramvya">Muramvya</option>
                <option value="Muyinga">Muyinga</option>
                <option value="Mwaro">Mwaro</option>
                <option value="Ngozi">Ngozi</option>
                <option value="Rumonge">Rumonge</option>
                <option value="Rutana">Rutana</option>
                <option value="Ruyigi">Ruyigi</option>
              </select>
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
              <input type="text"
                    class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="67234567"
                    name="nationalID"
                    v-model="form.nationalID"
              />
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
                    name="nationalID"
                    v-model="form.nationalID"
              />
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
                  placeholder="John"
                  name="next_of_kin_name"
                  validation="required"
                  v-model="form.next_of_kin_name"
              />         
            
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
          <!-- <label class="block mt-4 text-sm">
            <span class="text-gray-700  font font-semibold dark:text-gray-400">Notes</span>
            <textarea
                class="block border rounded-sm p-3 w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                rows="3"
                placeholder="Enter some long form content."
                name="notes"   
                v-model="form.notes"             
            ></textarea>
          </label> -->

          <div class="flex justify-between">
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 font font-semibold dark:text-gray-400">CV Attachment <span class="text-xs italic">(.pdf only)</span></span>
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
                class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
              Save
            </button>
          </div>
        </div>  
        <vue-pdf-app :pdf="form.cv" :class="['px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ', viewPdf? 'block': 'hidden']"></vue-pdf-app>
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
import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)
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
      transactions: {},
      eac_countries:{
        burundi:"Burundi",
        kenya:"Kenya"
      },
      accountTransactions: [
        {
          transactionId: 'MGX506Q7B',
          amount: 120,
          phoneNumber: '+254745327809',
          reason: 'salary',
          paymentMethod: 'M-Pesa',
          status: 'initiated',
          date: new Date()
        },
        {
          transactionId: 'MGX506Q7Z',
          amount: 150,
          phoneNumber: '+254756987256',
          reason: 'salary',
          status: 'processing',
          paymentMethod: 'Airtel Money',
          date: new Date()
        },
        {
          transactionId: 'MGX509Q7Q',
          amount: 25,
          phoneNumber: '+2547565127256',
          reason: 'refund',
          status: 'processed',
          paymentMethod: 'M-Pesa',
          date: new Date()
        },
        {
          transactionId: 'MGX504Q7A',
          amount: 16,
          phoneNumber: '+254756517653',
          reason: 'refund',
          status: 'processed',
          paymentMethod: 'M-Pesa',
          date: new Date()
        }
      ],
      search: '',
      status: '',
      paymentReason: '',
      paymentMethod: '',
      gender_types:{
        male:"Male",
        female:"Female",
        transgender:"Transgender",
        preferNotToSay:"Prefer Not To Say"
      },
      paymentMethods: [
        'M-Pesa',
        'Airtel Money'
      ],
      id_types:[
        {value:"nationalID", label:"National ID"},
        {value:"passportNo", label:"Passport No"}        
      ],
      payment_refund_form_open: false,
      payment_type:'refund',
      viewPdf:false,
      fileUploaded:0,
      showModal: false
    }
  },
  methods: {
    ...mapActions(['login', 'fetchTransactions']),
    ...mapGetters(['getCurrentToken', 'allTransactions']),

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
// compress(src) {
//             const img = new Image();
//             img.src = src;
//             img.onload = () => {
//                 const elem = document.createElement("canvas");
//                 const ctx = elem.getContext("2d");
//                 let width = img.width;
//                 if (width > 1080) {
//                     width = 1080;
//                     const scaleFactor = width / img.width;
//                     elem.width = width;
//                     elem.height = img.height * scaleFactor;
//                     ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
//                 } else {
//                     const height = img.height;
//                     elem.width = width;
//                     elem.height = height;
//                     ctx.drawImage(img, 0, 0, width, height);
//                 }

//                 this.form.passportPhoto = elem.toDataURL("image/jpeg", 0.8);
//             };
//         }


// reader.addEventListener("load", function () {
//     // convert image file to base64 string
//     preview.src = reader.result;
//   }, false);








    getFileBase64(){
      // var file = document.getElementById('cvFile');
      var x = document.getElementById("cvFile");
      var txt = "";
      if ('files' in x) {
        if (x.files.length == 0) {
          txt = "Select one or more files.";
        } else {
          for (var i = 0; i < x.files.length; i++) {
            txt += "<br><strong>" + (i+1) + ". file</strong><br>";
            var file = x.files[i];
            // document.getElementById('uploadedFile').innerHTML = file;
            if ('name' in file) {
              txt += "name: " + file.name + "<br>";
            }
            // if ('size' in file) {
              //   txt += "size: " + file.size + " bytes <br>";
            // }
          }
        }
      }
      // this.getFileBase64(file);
      document.getElementById('fileSection').innerHTML = 'File Name';
      document.getElementById('fileName').innerHTML = txt;
      // alert(txt);
      // console.log(txt);      
      // this.getBase64(file); 

    },
    getBase64(file){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
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
    getTransactions() {
      this.$store.dispatch('fetchTransactions').then(resp => {
        this.transactions = resp;
      }).catch(err => {
        console.log(err);
      })
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
    sendDataToEmail() {

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
    // this.getTransactions()
    // this.filterCounties()
  },
  computed: {}
};
</script>
