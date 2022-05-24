<template>
      <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        class="flex-1 h-full max-w-4xl mx-auto overflow-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 overflow"
      > 
        <div class="flex flex-col overflow-y-auto md:flex-row">          
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div class="w-full">
              <div class="pt-0 flex justify-center">
                <img class=" w-28" src="../assets/img/eac_logo.png" alt="EAC Logo"/>
              </div>
              <div class="text-2xl font-bold py-4 ">
                <p class="flex items-center justify-center">EAC</p>  
                <p class="flex items-center justify-center"> Rapidly Deployable Experts</p>
              </div>
              <div class="flex justify-between">
                <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  {{activeLanguage.store.sign_up_form.create_account}}                  
                </h1>
                <span class="">
                  <select v-model="selected_language"  name="language" class="bg-blue-50 rounded-sm border border-gray-300 text-gray-600 px-4 focus:border-blue-100 form-select w-28">
                    <option v-for="(language, index) in allLanguages" :key="index" :value="language.name" class="px-2">{{language.name}}</option>
                  </select>
                </span>
              </div>
              <FormulateForm v-model="form" @submit="createUserAccount" v-if="!showSignUpMsg">               
                <div class="md:grid md:grid-cols-3 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.sign_up_form.first_name}}</span>
                    <FormulateInput
                      name="first_name"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.sign_up_form.last_name}}</span>
                    <FormulateInput
                      name="last_name"
                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="e.g. John"
                      type="text"
                      required
                    />
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.sign_up_form.username}}</span>
                    <FormulateInput
                      name="username"
                      class="block w-full mt-1 lowercase text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="lowercase e.g. john"
                      @input="toLower"
                      type="text"
                      :help="activeLanguage.store.sign_up_form.username_help"
                      :validation-rules="{
                          validateLength: ({ value }) => value.length > 2 && value.length<20,
                          noSpace:({value})=> !(value.includes(' ')) 
                        }"
                        :validation-messages="{
                          validateLength: 'Username must be between 3 and 20 digits long.',
                          noSpace: `Spaces are not allowed`,
                        }"
                        validation="required|noSpace|validateLength"
                    />
                  </label>
                </div>
              
                <div class="md:grid md:grid-cols-3 gap-2">
                  <!-- Countries -->
                  <label class="block mt-4 text-sm">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.sign_up_form.country}}</span>
                    <div
                        class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                    >
                      <select name="country" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" required placeholder="select"
                      v-model="form.country" id="country" @change="populateRegionAndPhoneCode"> 
                        <option value="" disabled selected>--{{activeLanguage.store.sign_up_form.country}}--</option>     
                        <option v-for="(country,index) in countries" :key="index" :value="country.id">{{country.label}}</option>
                      </select>
                      <span v-if="getErrorMessage['attached_region_id']">
                        <span v-if="getErrorMessage['attached_region_id'].length>0">
                          <span v-for="(error,index) in getErrorMessage['attached_region_id']" :key="index">
                            <span class="text-red-500 animate-pulse">{{error}}</span>
                          </span>
                        </span>
                      </span> 
                      <div
                          class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
                      >
                      </div>
                    </div>
                  </label> 
                  <!-- End of Countries -->
                  <!-- Region -->
                  <label class="block mt-4 text-sm">
                    <span class="text-gray-700  font font-semibold dark:text-gray-400">{{activeLanguage.store.sign_up_form.region_of_residence}}</span>
                    <div
                        class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                    >
                      <select name="attached_region_id" class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" validation="required" required placeholder="select"
                      v-model="form.attached_region_id" id="region"> 
                        <option value="" disabled selected>--{{activeLanguage.store.sign_up_form.select_region}}--</option>     
                        <option v-for="(region,index) in regions" :key="index" :value="region.id">{{region.label}}</option>
                      </select>
                      <span v-if="getErrorMessage['attached_region_id']">
                        <span v-if="getErrorMessage['attached_region_id'].length>0">
                          <span v-for="(error,index) in getErrorMessage['attached_region_id']" :key="index">
                            <span class="text-red-500 animate-pulse">{{error}}</span>
                          </span>
                        </span>
                      </span> 
                      <div
                          class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none"
                      >
                      </div>
                    </div>
                  </label> 
                  <!-- End of Region -->
                 
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400 flex justify-between">
                      {{activeLanguage.store.sign_up_form.phone_number}}
                      <!-- <select v-model="countryCode" @change="mapCountryCode" class="w-1/2 rounded-md ">
                        <optgroup label="Countries">
                          <option value="" disabled selected>{{activeLanguage.store.sign_up_form.select_country}}</option>
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
                          <option data-countryCode="SS" value="211">South Sudan (+211)</option>
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
                          <option data-countryCode="ZB" value="255">Tanzania-Zanzibar (+255)</option>
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
                      </select> -->
                    </span>
                      
                      <FormulateInput
                      v-model="form.countryCode"
                      id="phone_number"
                      name="phone_number"
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="254"
                        :value="`${countryCode}`"
                        :validation-rules="{
                          validateLength: ({ value }) => value.length > 5 && value.length<16,
                          validateString:({value})=> value.startsWith('+') ,
                          noLetter:({value})=> !(/[a-zA-Z]/g.test(value)) 
                        }"
                        :validation-messages="{
                          validateLength: 'Phone number length must be between 5 and 10 digits long.',
                          validateString: `'Phone number must start with '+''`,
                          noLetter: `Letters are not allowed`,
                        }"
                        validation="required|validateLength|validateString|noLetter"
                        :show-optional="false"
                        error-behavior="value"
                        type="tel"
                        required                        
                      />
                  </label>  

                  <label class="block mt-4 text-sm col-span-1">
                      <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.sign_up_form.email}}</span>
                      <FormulateInput
                        name="email"
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="john@example.com"
                        type="email"
                        validation="email|required"
                        error-behavior="value"
                        required
                      />
                    </label>
                </div>             

                <!-- password section -->
                <div class="md:grid md:grid-cols-2 gap-2">
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">{{activeLanguage.store.sign_up_form.password}}</span>
                    <span class="flex">
                      <FormulateInput
                      name="password"
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="***************"
                        :type="passwordFieldType"
                        validation='between:5,20,length|required'
                        onCopy="return false" onDrag="return false" onDrop="return false" onPaste="return false" autocomplete=off
                      />
                      <button type="password" @click="switchVisibility('password')" class="h-2/3 rounded-md bg-blue-100 pt-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordFieldType==='password'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordFieldType==='text'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                      </button>
                    </span>
                  </label>
                  <label class="block mt-4 text-sm col-span-1">
                    <span class="text-gray-700 dark:text-gray-400">
                      {{activeLanguage.store.sign_up_form.confirm_password}}
                    </span>
                    <span class="flex">
                      <FormulateInput
                      name="password_confirm"     
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="***************"
                        :type="passwordConfirmFieldType"
                        validation="required|confirm|between:5,20,length"
                        validation-name="Confirmation"
                        error-behavior="value"
                        onCopy="return false" onDrag="return false" onDrop="return false" onPaste="return false" autocomplete=off
                      />
                      <button type="password" @click="switchVisibility('password_confirm')" class="h-2/3 rounded-md bg-blue-100 pt-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordConfirmFieldType==='password'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="passwordConfirmFieldType==='text'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                      </button>
                    </span>
                  </label>
                </div>
                <!-- End of password section -->
                <span class="text-xs text-red-400 mt-6" v-for="(key, index) in Object.keys(getErrorMessage)" :key="index">

                  <span v-if="key!=='detail'">
                    <span v-for="(detail_key, index) in Object.keys(getErrorMessage[key])" :key="index">
                      <span class="capitalize">{{key}}</span> : {{getErrorMessage[key][detail_key]}}
                    </span>
                  </span>
                  <span v-else>
                    {{getErrorMessage.detail}}
                  </span>
                </span>

                <div class="flex mt-6 text-sm">
                  <label class="flex items-center dark:text-gray-400">
                    <FormulateInput
                      type="checkbox"
                      v-model="form.privacy_policy"
                      class="text-purple-600 form-checkbox mt-4 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      required

                    />
                    <span class="ml-2 ">
                      {{activeLanguage.store.sign_up_form.agree_to}}
                      <span class="underline text-blue-400"><a href="https://www.eac.int/privacy#:~:text=The%20East%20African%20Community%20is%20committed%20to%20user%20privacy.&text=If%20the%20user%20specifically%20provides,be%20published%20for%20general%20access." target="_blank">{{activeLanguage.store.sign_up_form.privacy_policy}}</a></span>
                    </span>
                  </label>
                </div>

                <button
                  :class="['block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600  focus:outline-none focus:shadow-outline-purple ',isLoading?'cursor-not-allowed bg-purple-300 hover:bg-purple-400':'bg-purple-600 hover:bg-purple-700']"
                  type="submit"
                  v-bind:disabled="isLoading"
                >                  
                  <span v-if="!isLoading">{{activeLanguage.store.sign_up_form.create_account}}</span>
                  <span v-if="isLoading" class="flex justify-center"><loading></loading></span>
                  
                </button>
              </FormulateForm>

              <hr class="my-8" /> 
              <p class="p-2 bg-green-500 text-white border-green-200 rounded-md" v-if="showSignUpMsg">{{activeLanguage.store.sign_up_form.check_mail}} <span class="text-blue-900 font-semibold"><a :href="`mailto:${email}`">{{email?email:'no email'}}</a></span>  {{activeLanguage.store.sign_up_form.instructions}}</p>
                     
              <p class="mt-4 flex justify-center" v-if="showSignUpMsg">              
                <router-link class="w-full" to="/login"><span class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"> {{activeLanguage.store.sign_up_form.log_in}}</span></router-link>
              </p>
              <p class="mt-4" v-if="!showSignUpMsg">              
                <router-link class="w-full" to="/login"><span class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">{{activeLanguage.store.sign_up_form.already_have_an_account}}? {{activeLanguage.store.sign_up_form.log_in}}</span></router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {api_url} from "../utils/constants"
import Loading from "../components/utilities/loading";


const axios = require('axios').default;

export default {
  name:'SignUpForm',
  components:{
    Loading
  },
  data() {
    return {
      countryCode:'',
      form:{
        countryCode:'',
        groups:[],
        attached_region_id:'',
      },
      email:'',
      password:'',
      passwordFieldType:'password',
      passwordConfirmFieldType:'password',
      showSidebar: false,
      regions: [],
      countries: [],
      selected_language:'',
      showSignUpMsg:false,
      isLoading:false
    }
  },
  methods: {
    ...mapActions(['signUp','login','fetchRegions']),   
    toLower(){
      this.form.username = this.form.username.toLowerCase()
    },
    onSelect({name, iso2, dialCode}) {
       console.log(name, iso2, dialCode);
     },
    populateRegionAndPhoneCode(){
      let selectedCountry = this.countries.filter(x=>x.value==document.getElementById('country').value)
      this.form.countryCode='+'+selectedCountry[0].phone_code
      this.getRegions(selectedCountry[0].value)
    },
    mapCountryCode(){
      document.getElementById('phone_number').disabled=false
      this.form.countryCode='+'+this.countryCode
    },
    createUserAccount() {
      this.isLoading=true
      // eslint-disable-next-line no-unused-vars
      this.signUp(this.form).then(resp => {
        this.showSignUpMsg=true
        
        this.email = this.form.email
        // window.location.replace("/rde-self-registration-form")     
        // let login_payload = {
        //   username: this.form.username,
        //   password: this.form.password
        // }
        // eslint-disable-next-line no-unused-vars
        // this.login(login_payload).then(resp => {
        //   let user_assigned_roles_string = localStorage.getItem('roles')
        //   let user_assigned_roles = []
        //   if (user_assigned_roles_string === ''){
        //   //if the route has no specified roles, default to rde
        //     user_assigned_roles.push('rde')
        //   }else{
        //     // console.log('assigned roles:', user_assigned_roles_string)
        //     user_assigned_roles = user_assigned_roles_string.split(',')
        //   }
        
        //   if(user_assigned_roles.includes('rde')&& user_assigned_roles.length==1){
        //     window.location.replace("/rde-self-profile")
        //   }else{
        //     window.location.replace("/home")
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })

      }).catch(err => {
        console.log(err)
        this.showSignUpMsg=false
        // eslint-disable-next-line no-unused-vars
      }).then(resp=>{this.isLoading=false})

    },
    switchVisibility(field_name){
      if(field_name==='password'){
        this.passwordFieldType = this.passwordFieldType ==='password'?'text':'password';
      }else if(field_name==='password_confirm'){
        this.passwordConfirmFieldType = this.passwordConfirmFieldType ==='password'?'text':'password';
      }else{
        alert('Unknown field type')
      }
    },
     getCountries() {
      axios.get(api_url+'country/')
        .then(resp=>{
          this.countries = resp.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
     getRegions(country_id) {
      axios.get(api_url+'region/?country='+country_id)
        .then(resp=>{
          this.regions = resp.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  

  },
  computed:{
    ...mapGetters(['getErrorMessage','getCurrentToken', 'allLanguages', 'activeLanguage']),
   
  },
  mounted() {
    this.getCountries()
    // this.getRegions()
    this.$store.dispatch('switchLanguage', localStorage.getItem('active_language_name'))
    this.selected_language = this.activeLanguage.name
  },
  watch: {
    selected_language: function (){
      this.$store.dispatch('switchLanguage', this.selected_language)
      // window.location.reload()
    }
  },
}
</script>