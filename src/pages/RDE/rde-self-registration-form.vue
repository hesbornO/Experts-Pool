<template>
  <dashboard_layout :page_title="activeLanguage.store.titles.complete_registration" >
    <button @click="goBack" class="btn btn-blue mb-2 flex flex-row justify-between w-24" >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      {{activeLanguage.store.actions.back}}
    </button>
    <div>
      <FormulateForm v-model="form" @submit="registerRDE">
        <div :class="['px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ']">
          <h3 class="text-blue-400 font-semibold">{{activeLanguage.store.rde_self_registration_form.personal_details}}</h3>
          <!-- name section -->
          <div class="md:grid md:grid-cols-3 gap-6">
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.first_name}}</span>
              <!-- focus-within sets the color for the icon when input is focused -->
              
                <FormulateInput
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
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
              
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.middle_name}}</span>
              <!-- focus-within sets the color for the icon when input is focused -->
             
              <FormulateInput
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  type="text"
                  name="middle_name"
                  placeholder="Joseph"
              />
                
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.last_name}}</span>
                <FormulateInput
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
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
            </label>
          </div>
          <!-- location,religion and gender section -->
          <div class="md:grid md:grid-cols-3 gap-4">
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.gender}}</span>
         
                <select name="gender" class="p-2 block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-md" validation="required"
                v-model="form.gender">
                  <option value="" selected disabled>-- {{activeLanguage.store.actions.click_to_select}} --</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option> 
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
            </label>
            <label class="block mt-4 text-sm">
              <!-- <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.gender}}</span> -->
              <span class="text-gray-700  font font-semibold dark:text-gray-400">Religion</span>
         
                <select name="gender" class="p-2 block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-md" validation="required"
                v-model="form.religion">
                  <option value="" selected disabled>-- {{activeLanguage.store.actions.click_to_select}} --</option>
                  <option value="christian">Christian</option>
                  <option value="muslim">Muslim</option> 
                  <option value="buddhist">Buddhist</option> 
                  <option value="atheist">Atheist</option> 
                  <option value="preferNotToSay">Prefer Not To Say</option>
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
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.region}}</span>
              <!-- focus-within sets the color for the icon when input is focused -->
              <div
                  class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
              >
                <select name="region_of_residence_id" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-md p-2" validation="required" placeholder="select"
                v-model="form.region_of_residence_id" id="region"> 
                  <option value="" disabled selected>--Select region--</option>     
                  <option v-for="(region,index) in regions" :key="index" :value="region.value">{{region.label?region.label:''}}</option>
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
          <div class="md:grid md:grid-cols-3 gap-4">
            <div class="md:grid md:grid-cols-2 gap-3">
              <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.id_type}}</span>
              <!-- focus-within sets the color for the icon when input is focused -->
                <select name="id_type" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2 rounded-md" validation="required" placeholder="select"
                v-model="form.id_type" id="id_type">
                  <option value="" selected disabled>-- {{activeLanguage.store.actions.click_to_select}} --</option>
                  <option value="national_id">National ID</option>                
                  <option value="birth_cert">Birth Certificate</option>
                  <option value="alien_id">Alien ID</option>           
                  <option value="military_id">Military ID</option>                
                  <option value="passport">Passport</option>                
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
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.id_number}}</span>
              <!-- focus-within sets the color for the icon when input is focused -->
                <FormulateInput type="text"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="67234567"
                      name="id_number"
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
            </label>
            </div>
            <label class="block mt-4 text-sm">
              <span class="flex justify-between">              
                <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.phone}}</span>  
                <select v-model="countryCode" @change="mapCountryCode('phone')" class="w-2/3 rounded-md ">
                  <optgroup label="Countries">
                    <option value="" disabled selected class=" place-self-center">--{{activeLanguage.store.actions.select_country}}--</option>
                    <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                    <option data-countryCode="AD" value="376">Andorra (+376)</option>
                    <option data-countryCode="AO" value="244">Angola (+244)</option>
                    <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                    <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                    <option data-countryCode="AR" value="54">Argentina (+54)</option>
                    <option data-countryCode="AM" value="374">Armenia (+374)</option>
                    <option data-countryCode="AW" value="297">Aruba (+297)</option>
                    <option data-countryCode="AU" value="61">Australia (+61)</option>
                    <option data-countryCode="AT" value="43">Austria (+43)</option>
                    <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                    <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                    <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                    <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                    <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                    <option data-countryCode="BY" value="375">Belarus (+375)</option>
                    <option data-countryCode="BE" value="32">Belgium (+32)</option>
                    <option data-countryCode="BZ" value="501">Belize (+501)</option>
                    <option data-countryCode="BJ" value="229">Benin (+229)</option>
                    <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                    <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                    <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                    <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                    <option data-countryCode="BW" value="267">Botswana (+267)</option>
                    <option data-countryCode="BR" value="55">Brazil (+55)</option>
                    <option data-countryCode="BN" value="673">Brunei (+673)</option>
                    <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                    <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                    <option data-countryCode="BI" value="257">Burundi (+257)</option>
                    <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                    <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                    <option data-countryCode="CA" value="1">Canada (+1)</option>
                    <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                    <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                    <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                    <option data-countryCode="CL" value="56">Chile (+56)</option>
                    <option data-countryCode="CN" value="86">China (+86)</option>
                    <option data-countryCode="CO" value="57">Colombia (+57)</option>
                    <option data-countryCode="KM" value="269">Comoros (+269)</option>
                    <option data-countryCode="CG" value="242">Congo (+242)</option>
                    <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                    <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                    <option data-countryCode="HR" value="385">Croatia (+385)</option>
                    <option data-countryCode="CU" value="53">Cuba (+53)</option>
                    <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                    <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                    <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                    <option data-countryCode="DK" value="45">Denmark (+45)</option>
                    <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                    <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                    <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                    <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                    <option data-countryCode="EG" value="20">Egypt (+20)</option>
                    <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                    <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                    <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                    <option data-countryCode="EE" value="372">Estonia (+372)</option>
                    <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                    <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                    <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                    <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                    <option data-countryCode="FI" value="358">Finland (+358)</option>
                    <option data-countryCode="FR" value="33">France (+33)</option>
                    <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                    <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                    <option data-countryCode="GA" value="241">Gabon (+241)</option>
                    <option data-countryCode="GM" value="220">Gambia (+220)</option>
                    <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                    <option data-countryCode="DE" value="49">Germany (+49)</option>
                    <option data-countryCode="GH" value="233">Ghana (+233)</option>
                    <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                    <option data-countryCode="GR" value="30">Greece (+30)</option>
                    <option data-countryCode="GL" value="299">Greenland (+299)</option>
                    <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                    <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                    <option data-countryCode="GU" value="671">Guam (+671)</option>
                    <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                    <option data-countryCode="GN" value="224">Guinea (+224)</option>
                    <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                    <option data-countryCode="GY" value="592">Guyana (+592)</option>
                    <option data-countryCode="HT" value="509">Haiti (+509)</option>
                    <option data-countryCode="HN" value="504">Honduras (+504)</option>
                    <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                    <option data-countryCode="HU" value="36">Hungary (+36)</option>
                    <option data-countryCode="IS" value="354">Iceland (+354)</option>
                    <option data-countryCode="IN" value="91">India (+91)</option>
                    <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                    <option data-countryCode="IR" value="98">Iran (+98)</option>
                    <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                    <option data-countryCode="IE" value="353">Ireland (+353)</option>
                    <option data-countryCode="IL" value="972">Israel (+972)</option>
                    <option data-countryCode="IT" value="39">Italy (+39)</option>
                    <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                    <option data-countryCode="JP" value="81">Japan (+81)</option>
                    <option data-countryCode="JO" value="962">Jordan (+962)</option>
                    <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                    <option data-countryCode="KE" value="254">Kenya (+254)</option>
                    <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                    <option data-countryCode="KP" value="850">Korea North (+850)</option>
                    <option data-countryCode="KR" value="82">Korea South (+82)</option>
                    <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                    <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                    <option data-countryCode="LA" value="856">Laos (+856)</option>
                    <option data-countryCode="LV" value="371">Latvia (+371)</option>
                    <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                    <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                    <option data-countryCode="LR" value="231">Liberia (+231)</option>
                    <option data-countryCode="LY" value="218">Libya (+218)</option>
                    <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                    <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                    <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                    <option data-countryCode="MO" value="853">Macao (+853)</option>
                    <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                    <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                    <option data-countryCode="MW" value="265">Malawi (+265)</option>
                    <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                    <option data-countryCode="MV" value="960">Maldives (+960)</option>
                    <option data-countryCode="ML" value="223">Mali (+223)</option>
                    <option data-countryCode="MT" value="356">Malta (+356)</option>
                    <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                    <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                    <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                    <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                    <option data-countryCode="MX" value="52">Mexico (+52)</option>
                    <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                    <option data-countryCode="MD" value="373">Moldova (+373)</option>
                    <option data-countryCode="MC" value="377">Monaco (+377)</option>
                    <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                    <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                    <option data-countryCode="MA" value="212">Morocco (+212)</option>
                    <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                    <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                    <option data-countryCode="NA" value="264">Namibia (+264)</option>
                    <option data-countryCode="NR" value="674">Nauru (+674)</option>
                    <option data-countryCode="NP" value="977">Nepal (+977)</option>
                    <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                    <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                    <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                    <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                    <option data-countryCode="NE" value="227">Niger (+227)</option>
                    <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                    <option data-countryCode="NU" value="683">Niue (+683)</option>
                    <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                    <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                    <option data-countryCode="NO" value="47">Norway (+47)</option>
                    <option data-countryCode="OM" value="968">Oman (+968)</option>
                    <option data-countryCode="PW" value="680">Palau (+680)</option>
                    <option data-countryCode="PA" value="507">Panama (+507)</option>
                    <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                    <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                    <option data-countryCode="PE" value="51">Peru (+51)</option>
                    <option data-countryCode="PH" value="63">Philippines (+63)</option>
                    <option data-countryCode="PL" value="48">Poland (+48)</option>
                    <option data-countryCode="PT" value="351">Portugal (+351)</option>
                    <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                    <option data-countryCode="QA" value="974">Qatar (+974)</option>
                    <option data-countryCode="RE" value="262">Reunion (+262)</option>
                    <option data-countryCode="RO" value="40">Romania (+40)</option>
                    <option data-countryCode="RU" value="7">Russia (+7)</option>
                    <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                    <option data-countryCode="SM" value="378">San Marino (+378)</option>
                    <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                    <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                    <option data-countryCode="SN" value="221">Senegal (+221)</option>
                    <option data-countryCode="CS" value="381">Serbia (+381)</option>
                    <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                    <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                    <option data-countryCode="SG" value="65">Singapore (+65)</option>
                    <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                    <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                    <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                    <option data-countryCode="SO" value="252">Somalia (+252)</option>
                    <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                    <option data-countryCode="ES" value="34">Spain (+34)</option>
                    <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                    <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                    <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                    <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                    <option data-countryCode="SD" value="249">Sudan (+249)</option>
                    <option data-countryCode="SR" value="597">Suriname (+597)</option>
                    <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                    <option data-countryCode="SE" value="46">Sweden (+46)</option>
                    <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                    <option data-countryCode="SI" value="963">Syria (+963)</option>
                    <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                    <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                    <option data-countryCode="TZ" value="255">Tanzania (+255)</option>
                    <option data-countryCode="TH" value="66">Thailand (+66)</option>
                    <option data-countryCode="TG" value="228">Togo (+228)</option>
                    <option data-countryCode="TO" value="676">Tonga (+676)</option>
                    <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                    <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                    <option data-countryCode="TR" value="90">Turkey (+90)</option>
                    <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                    <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                    <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                    <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                    <option data-countryCode="UG" value="256">Uganda (+256)</option>
                    <option data-countryCode="GB" value="44">UK (+44)</option>
                    <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                    <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                    <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                    <option data-countryCode="US" value="1">USA (+1)</option>
                    <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                    <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                    <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                    <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                    <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                    <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                    <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                    <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                    <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                    <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                    <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                    <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                  </optgroup>
                </select> 
              </span>        
                <FormulateInput type="tel"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="+25470..."
                      name="phone"
                      :validation-rules="{
                        validateLength: ({ value }) => value.length > 5 && value.length<16,
                        validateString:({value})=> value.startsWith('+') 
                      }"
                      :validation-messages="{
                        validateLength: 'Phone number must be between 5 and 16 digits long.',
                        validateString: `'Phone number must start with '+''`,
                      }"
                      error-behavior="live"
                      validation="required|validateLength|validateString"
                      :show-optional="false"
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
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.email}}</span>
              
                <FormulateInput type="email"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="john.doe@gmail.com"
                      name="email"
                      validation="required|email"
                      error-behaviour='live'
                />
                <div
                    class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                </div>
            </label>
            
          </div>
          
          <div class="md:grid md:grid-cols-3 gap-4">
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.occupation}}</span>
              
            <select name="occupation_id" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2 rounded-md" validation="required" placeholder="--select--"
                v-model="form.occupation_id" id="occupation">         
                  <option value="" disabled selected>--Select occupation--</option>     
                  <option v-for="(occupation,index) in occupations" :key="index"  :value="occupation.value">{{occupation.name}}</option>
                </select>

                <span v-if="getErrorMessage['occupation_id']">
                  <span v-if="getErrorMessage['occupation_id'].length>0">
                    <span v-for="(error,index) in getErrorMessage['occupation_id']" :key="index">
                      <span class="text-red-500 animate-pulse">{{error}}</span>
                    </span>
                  </span>
                </span>            
            </label> 

            <label class="block mt-4 text-sm">
              <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.dob}}</span>
                <FormulateInput 
                  type="date"
                  id="datefield"
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder="--pick--"
                  name="date_of_birth"
                  validation="required"
                  max=""
                />   

                <span v-if="getErrorMessage['date_of_birth']">
                  <span v-if="getErrorMessage['date_of_birth'].length>0">
                    <span v-for="(error,index) in getErrorMessage['date_of_birth']" :key="index">
                      <span class="text-red-500 animate-pulse">{{error}}</span>
                    </span>
                  </span>
                </span>            
            </label>          
          </div>

          <!-- Next of kin section -->
          <h3 class="text-blue-400 font-semibold pt-6">{{activeLanguage.store.rde_self_registration_form.next_of_kin_details}}</h3>
          <div class="md:grid md:grid-cols-3 gap-4">
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.full_name}}</span>
                
                <FormulateInput
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Jane Doe"
                    name="next_of_kin_name"
                    validation="required"
                />      
                <span v-if="getErrorMessage['next_of_kin_name']">
                  <span v-if="getErrorMessage['next_of_kin_name'].length>0">
                    <span v-for="(error,index) in getErrorMessage['next_of_kin_name']" :key="index">
                      <span class="text-red-500 animate-pulse">{{error}}</span>
                    </span>
                  </span>
                </span>    
            </label>
            <label class="block mt-4 text-sm">
              <span class="flex justify-between">              
                <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.phone}}</span>
                <select v-model="nextOfKinCountryCode" @change="mapNOKCountryCode('next_of_kin_phone')" class="w-2/3 rounded-md ">
                  <optgroup label="Countries">
                    <option value="" disabled selected>--{{activeLanguage.store.actions.select_country}}--</option>
                    <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                    <option data-countryCode="AD" value="376">Andorra (+376)</option>
                    <option data-countryCode="AO" value="244">Angola (+244)</option>
                    <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                    <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                    <option data-countryCode="AR" value="54">Argentina (+54)</option>
                    <option data-countryCode="AM" value="374">Armenia (+374)</option>
                    <option data-countryCode="AW" value="297">Aruba (+297)</option>
                    <option data-countryCode="AU" value="61">Australia (+61)</option>
                    <option data-countryCode="AT" value="43">Austria (+43)</option>
                    <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                    <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                    <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                    <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                    <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                    <option data-countryCode="BY" value="375">Belarus (+375)</option>
                    <option data-countryCode="BE" value="32">Belgium (+32)</option>
                    <option data-countryCode="BZ" value="501">Belize (+501)</option>
                    <option data-countryCode="BJ" value="229">Benin (+229)</option>
                    <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                    <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                    <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                    <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                    <option data-countryCode="BW" value="267">Botswana (+267)</option>
                    <option data-countryCode="BR" value="55">Brazil (+55)</option>
                    <option data-countryCode="BN" value="673">Brunei (+673)</option>
                    <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                    <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                    <option data-countryCode="BI" value="257">Burundi (+257)</option>
                    <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                    <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                    <option data-countryCode="CA" value="1">Canada (+1)</option>
                    <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                    <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                    <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                    <option data-countryCode="CL" value="56">Chile (+56)</option>
                    <option data-countryCode="CN" value="86">China (+86)</option>
                    <option data-countryCode="CO" value="57">Colombia (+57)</option>
                    <option data-countryCode="KM" value="269">Comoros (+269)</option>
                    <option data-countryCode="CG" value="242">Congo (+242)</option>
                    <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                    <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                    <option data-countryCode="HR" value="385">Croatia (+385)</option>
                    <option data-countryCode="CU" value="53">Cuba (+53)</option>
                    <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                    <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                    <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                    <option data-countryCode="DK" value="45">Denmark (+45)</option>
                    <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                    <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                    <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                    <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                    <option data-countryCode="EG" value="20">Egypt (+20)</option>
                    <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                    <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                    <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                    <option data-countryCode="EE" value="372">Estonia (+372)</option>
                    <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                    <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                    <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                    <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                    <option data-countryCode="FI" value="358">Finland (+358)</option>
                    <option data-countryCode="FR" value="33">France (+33)</option>
                    <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                    <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                    <option data-countryCode="GA" value="241">Gabon (+241)</option>
                    <option data-countryCode="GM" value="220">Gambia (+220)</option>
                    <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                    <option data-countryCode="DE" value="49">Germany (+49)</option>
                    <option data-countryCode="GH" value="233">Ghana (+233)</option>
                    <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                    <option data-countryCode="GR" value="30">Greece (+30)</option>
                    <option data-countryCode="GL" value="299">Greenland (+299)</option>
                    <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                    <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                    <option data-countryCode="GU" value="671">Guam (+671)</option>
                    <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                    <option data-countryCode="GN" value="224">Guinea (+224)</option>
                    <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                    <option data-countryCode="GY" value="592">Guyana (+592)</option>
                    <option data-countryCode="HT" value="509">Haiti (+509)</option>
                    <option data-countryCode="HN" value="504">Honduras (+504)</option>
                    <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                    <option data-countryCode="HU" value="36">Hungary (+36)</option>
                    <option data-countryCode="IS" value="354">Iceland (+354)</option>
                    <option data-countryCode="IN" value="91">India (+91)</option>
                    <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                    <option data-countryCode="IR" value="98">Iran (+98)</option>
                    <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                    <option data-countryCode="IE" value="353">Ireland (+353)</option>
                    <option data-countryCode="IL" value="972">Israel (+972)</option>
                    <option data-countryCode="IT" value="39">Italy (+39)</option>
                    <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                    <option data-countryCode="JP" value="81">Japan (+81)</option>
                    <option data-countryCode="JO" value="962">Jordan (+962)</option>
                    <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                    <option data-countryCode="KE" value="254">Kenya (+254)</option>
                    <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                    <option data-countryCode="KP" value="850">Korea North (+850)</option>
                    <option data-countryCode="KR" value="82">Korea South (+82)</option>
                    <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                    <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                    <option data-countryCode="LA" value="856">Laos (+856)</option>
                    <option data-countryCode="LV" value="371">Latvia (+371)</option>
                    <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                    <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                    <option data-countryCode="LR" value="231">Liberia (+231)</option>
                    <option data-countryCode="LY" value="218">Libya (+218)</option>
                    <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                    <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                    <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                    <option data-countryCode="MO" value="853">Macao (+853)</option>
                    <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                    <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                    <option data-countryCode="MW" value="265">Malawi (+265)</option>
                    <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                    <option data-countryCode="MV" value="960">Maldives (+960)</option>
                    <option data-countryCode="ML" value="223">Mali (+223)</option>
                    <option data-countryCode="MT" value="356">Malta (+356)</option>
                    <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                    <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                    <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                    <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                    <option data-countryCode="MX" value="52">Mexico (+52)</option>
                    <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                    <option data-countryCode="MD" value="373">Moldova (+373)</option>
                    <option data-countryCode="MC" value="377">Monaco (+377)</option>
                    <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                    <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                    <option data-countryCode="MA" value="212">Morocco (+212)</option>
                    <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                    <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                    <option data-countryCode="NA" value="264">Namibia (+264)</option>
                    <option data-countryCode="NR" value="674">Nauru (+674)</option>
                    <option data-countryCode="NP" value="977">Nepal (+977)</option>
                    <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                    <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                    <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                    <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                    <option data-countryCode="NE" value="227">Niger (+227)</option>
                    <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                    <option data-countryCode="NU" value="683">Niue (+683)</option>
                    <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                    <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                    <option data-countryCode="NO" value="47">Norway (+47)</option>
                    <option data-countryCode="OM" value="968">Oman (+968)</option>
                    <option data-countryCode="PW" value="680">Palau (+680)</option>
                    <option data-countryCode="PA" value="507">Panama (+507)</option>
                    <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                    <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                    <option data-countryCode="PE" value="51">Peru (+51)</option>
                    <option data-countryCode="PH" value="63">Philippines (+63)</option>
                    <option data-countryCode="PL" value="48">Poland (+48)</option>
                    <option data-countryCode="PT" value="351">Portugal (+351)</option>
                    <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                    <option data-countryCode="QA" value="974">Qatar (+974)</option>
                    <option data-countryCode="RE" value="262">Reunion (+262)</option>
                    <option data-countryCode="RO" value="40">Romania (+40)</option>
                    <option data-countryCode="RU" value="7">Russia (+7)</option>
                    <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                    <option data-countryCode="SM" value="378">San Marino (+378)</option>
                    <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                    <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                    <option data-countryCode="SN" value="221">Senegal (+221)</option>
                    <option data-countryCode="CS" value="381">Serbia (+381)</option>
                    <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                    <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                    <option data-countryCode="SG" value="65">Singapore (+65)</option>
                    <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                    <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                    <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                    <option data-countryCode="SO" value="252">Somalia (+252)</option>
                    <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                    <option data-countryCode="ES" value="34">Spain (+34)</option>
                    <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                    <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                    <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                    <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                    <option data-countryCode="SD" value="249">Sudan (+249)</option>
                    <option data-countryCode="SR" value="597">Suriname (+597)</option>
                    <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                    <option data-countryCode="SE" value="46">Sweden (+46)</option>
                    <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                    <option data-countryCode="SI" value="963">Syria (+963)</option>
                    <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                    <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                    <option data-countryCode="TZ" value="255">Tanzania (+255)</option>
                    <option data-countryCode="TH" value="66">Thailand (+66)</option>
                    <option data-countryCode="TG" value="228">Togo (+228)</option>
                    <option data-countryCode="TO" value="676">Tonga (+676)</option>
                    <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                    <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                    <option data-countryCode="TR" value="90">Turkey (+90)</option>
                    <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                    <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                    <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                    <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                    <option data-countryCode="UG" value="256">Uganda (+256)</option>
                    <option data-countryCode="GB" value="44">UK (+44)</option>
                    <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                    <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                    <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                    <option data-countryCode="US" value="1">USA (+1)</option>
                    <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                    <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                    <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                    <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                    <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                    <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                    <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                    <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                    <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                    <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                    <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                    <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                  </optgroup>
                </select>
              </span>
                <FormulateInput type="tel" id='next_of_kin_phone'
                      v-model="form.next_of_kin_phone"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="next_of_kin_phone"
                       :validation-rules="{
                        validateLength: ({ value }) => value.length > 5 && value.length<16,
                        validateString:({value})=> value.startsWith('+') 
                      }"
                      :validation-messages="{
                        validateLength: 'Phone number length must be between 5 and 16 digits long.',
                        validateString: `'Phone number must start with '+''`,
                      }"
                      validation="required|validateLength|validateString"
                      placeholder="Please select country"
                      :show-optional="false"
                      disabled
                      error-behavior="live"
                      
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
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.email}}</span>
                <FormulateInput type="email"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="john.doe@gmail.com"
                      name="next_of_kin_email"
                      validation="required|email"
                      v-model="form.next_of_kin_email"
                      error-behavior="live"
                />
                <div
                    class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                </div>
            </label>
          </div>
          <h6 class="text-blue-400 font-semibold pt-6">{{activeLanguage.store.rde_self_registration_form.other_info}}</h6>  

            <div class="md:grid md:grid-cols-3 gap-3">                        
                  <label class="block mt-4 text-sm col-span-2">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.rde_self_registration_form.competencies}}</span>
                      <select name="competencies" class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2 rounded-md" validation="required" placeholder="select"
                      v-model="form.competencies" id="competencies"  multiple rows="10">
                        <option value="" disabled selected>--Select competency--</option>     
                        <option v-for="(competency,index) in competencies_list" :key="index"  :value="competency.id">{{competency.name}}</option>
                      </select>
                      <span v-if="getErrorMessage['competencies']">
                        <span v-if="getErrorMessage['competencies'].length>0">
                          <span v-for="(error,index) in getErrorMessage['competencies']" :key="index">
                            <span class="text-red-500 animate-pulse">{{error}}</span>
                          </span>
                        </span>
                      </span> 
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
                  :class="['uppercase px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue', isLoading?'disabled:opacity-75 cursor-not-allowed':'']" v-bind:disabled="isLoading" type="submit">
                {{isLoading?activeLanguage.store.actions.submit+'...':activeLanguage.store.actions.submit}}
              </button>
            </div>
        </div>  
      
      </FormulateForm>
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

    <!-- min and max date -->
    <!-- https://jsfiddle.net/dae4y126/ -->
    
  </dashboard_layout>
</template>
<style >

</style>

<script>

import {mapActions, mapGetters} from 'vuex';
import {app_name} from "@/utils/constants";

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
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
  name: `${app_name}-self-registration-form`,
  components: {
    VuePdfApp,
    dashboard_layout,
    // Datepicker
  },
  props:{
    // signUpData:[Object]
  },
  data() {
    return {
      countryCode:'',
      nextOfKinCountryCode:'',
      form:{        
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        region_of_residence_id:'',
        gender:'',
        id_type:'',
        occupation:'',
        competencies:[],
        next_of_kin_phone:''
       },
      occupations: {},
      countries: {},
      competencies_list:{},
      regions: {},
      search: '',
      status: '',
      gender_types:{
        M:"Male",
        F:"Female",
        O:"Prefer Not To Say"
      },
      id_types:[
        {value:"nationalID", label:"National ID"},
        {value:"passportNo", label:"Passport No"}        
      ],
      religion_types:[
        {value:"christian", label:"Christian"},
        {value:"muslim", label:"Muslim"},       
        {value:"atheist", label:"Atheist"},
        {value:"buddhist", label:"Buddhist"}
      ],
      viewPdf:false,
      fileUploaded:0,
      showModal: false,
      signUpData:{},
      isLoading:false
    }
  },
  methods: {
    ...mapActions(['fetchCountries','fetchRegions','fetchAllOccupations','fetchAllCompetencies','postRDE']),
    ...mapGetters(['allCountries',]),
    
    mapCountryCode(field){
      if(field==='phone') this.form.phone='+'+this.countryCode
            
    },
    mapNOKCountryCode(field){
      if(field==='next_of_kin_phone'){
        document.getElementById('next_of_kin_phone').disabled=false
        this.form.next_of_kin_phone='+'+this.nextOfKinCountryCode
      }      
    },

    registerRDE(){   
      this.isLoading=true   
      let payload = this.form
      this.postRDE(payload).then(resp=>{
        this.$store.dispatch('setError',{})
        this.isLoading=false
        // window.location.replace('/rde-self-profile')
        // window.location.replace('/home')
        this.$router.back()
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
        this.competencies_list = resp;   
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
    getSignUpData(){      
      this.form.first_name=localStorage.getItem('first_name')
      this.form.last_name=localStorage.getItem('last_name')
      this.form.email=localStorage.getItem('email')
      this.form.phone=localStorage.getItem('phone')
      this.form.region_of_residence_id=localStorage.getItem('region_of_residence_id')
      this.setMaxDate()
    },
    filterRegions(selectedCountry){
      console.log('Selected Country', selectedCountry)

    },
    setMaxDate(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10){
              dd='0'+dd
          } 
          if(mm<10){
              mm='0'+mm
          } 

      today = yyyy+'-'+mm+'-'+dd;
      document.getElementById("datefield").setAttribute("max", today);
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
    },
    goBack(){
      this.$router.back()
    },
  },

   mounted() {
    this.getCountries()
    this.getRegions()
    this.getOccupations()    
    this.getCompetencies()   
    this.getSignUpData() 
  },
  
  computed: {
    ...mapGetters(['allRegions','getErrorMessage','activeLanguage'])
  }
};
</script>
