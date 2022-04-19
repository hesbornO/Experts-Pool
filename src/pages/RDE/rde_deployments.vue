<template>
  <dashboard_layout :page_title="``" :show-back="false" >
    <span v-if="rdeSelfProfile">
      <span class="flex justify-between" v-if="Object.keys(rdeSelfProfile).length > 0">
        <span></span>
        <span>
          
        </span>
      </span>
    </span>    

    <div>
      <div :title="activeLanguage.store.rde_self_profile.deployments" class="space-x-4 md:grid md:grid-cols-4">
        <span v-if="this.loading" class=" mt-5 flex justify-center col-span-3">
          <loading></loading>
        </span>
        <span v-if="!this.loading && rdeDeployments" class="col-span-4">            
          <table class="w-full col-span-3 border border-black p-3" >
            <thead class="text-lg font-semibold font-mono border border-black p-2 ">
              <th class="border border-black">{{activeLanguage.store.titles.public_health_events}}</th>
              <th class="border border-black">{{activeLanguage.store.rde_self_profile.description}}</th>
              <th class="border border-black">{{activeLanguage.store.rde_self_registration_form.region}}</th>
              <th class="border border-black">{{activeLanguage.store.rde_self_profile.start_date}}</th>
              <th class="border border-black">{{activeLanguage.store.rde_self_profile.end_date}}</th>
              <th class="border border-black">{{activeLanguage.store.rde_self_profile.actions}}</th>
            </thead>
            <tbody v-if="rdeDeployments.length>0">
                <tr v-for="(deployment, index) in rdeDeployments" :key="index" class="text-md border border-black">
                  <td class="border-l border-black p-2 uppercase font-mono text-blue-500 font-semibold">{{deployment.outbreak.name?deployment.outbreak.name:''}}</td>
                  <td class="border-l border-black p-2 capitalize">{{deployment.outbreak.description?deployment.outbreak.description:''}}</td>
                  <td class="border-l border-black p-2 capitalize">{{deployment.region_object.name}}</td>
                  <td class="border-l border-black p-2 text-xs">{{deployment.start_date?deployment.start_date:''}}</td>
                  <td class="border-l border-r border-black p-2 text-xs">
                    {{deployment.end_date?deployment.end_date:''}}                   
                  </td>
                  <td class=" border-black p-2 text-xs grid grid-cols-1 ">
                    <span class="flex justify-between" v-if="!deployment.accepted_by_user">
                      <router-link
                          :to="{name:'acceptDeployment', params:{deploymentId:deployment.id,rdeId:rdeSelfProfile.id, outbreakName: deployment.outbreak.name?deployment.outbreak.name:''}}"
                          class="btn btn-green text-xs text-white col-span-1 bg-green-500"
                          v-if="!deployment.accepted_by_user && !deployment.rejected_by_user"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="px-1">{{activeLanguage.store.rde_self_profile.accept_request}}</span>
                      </router-link>
                      <router-link
                          :to="{name:'rejectDeployment', params:{deploymentId:deployment.id, rdeId:rdeSelfProfile.id, outbreakName: deployment.outbreak.name?deployment.outbreak.name:''}}"
                          class="btn btn-red text-xs text-white col-span-1 bg-red-400"
                          v-if="!deployment.accepted_by_user && !deployment.rejected_by_user"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="px-1">{{activeLanguage.store.rde_self_profile.reject_request}}</span>
                      </router-link>
                    </span>
                    <!-- Report -->
                    <div class="col-start-2 col-end-4  mt-5 ml-20" v-if="deployment.status='ended'">
                      <span v-if="loading" class=" mt-5 flex justify-center">
                        <loading></loading>
                      </span>
                      <div class="">          
                        <!-- Report exists -->
                        <span v-if="deployment.deployment_report && !loading" class="">  
                          <span class="flex justify-between p-4">  
                            <span></span>              
                            <span class="text-yellow-700 font-semibold text-base">Deployment Report</span>      
                            <span></span>              
                          </span>  
                          <span class="grid grid-cols-2 justify-between p-4">
                            <span class="col-span-1">
                              <button @click="togglePdfDisplay('fetchCV','viewPdf',deployment.deployment_report)" 
                                class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
                                >
                                <span>View</span>
                              </button>
                            </span>
                            <span class="col-span-1">
                              <span>
                                <button
                                    class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue" @click="toggleUploadField">
                                  {{displayUploadButton?'Close':'Update'}}
                                </button>
                              </span>
                            </span>
                          </span>
                          <span v-if="displayUploadButton" class="text-semibold text-orange-300 p-2">
                            <label class="block mt-4 text-sm">
                              <span class="text-gray-700 font font-semibold dark:text-gray-400">Attach Report <span class="text-xs italic">(pdf and word docs)</span></span>
                              <div
                                  class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                              >
                                <input  type="file"
                                        id="newCV"
                                        :name="form.deployment_report"
                                        @change="displaySubmit('newCV')"
                                        class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="john.doe@gmail.com"
                                        validation="required"  
                                        accept=".pdf" 
                                />        
                                  <!-- <span v-if="getErrorMessage['deployment_report']">
                                  <span v-if="getErrorMessage['deployment_report'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['deployment_report']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{error}}</span>
                                    </span>
                                  </span> 
                                </span>   -->
                              </div>
                            </label>  

                            <span class="flex justify-between p-2">
                              <span></span>
                              <span></span>
                              <button :class="['hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue',loading?'cursor-not-allowed':'']"  @click="saveReport('newCV', deployment.id)" v-if="fileUploaded"> 
                                <span v-if="loading"> <Loading /> </span>
                                <span v-else>{{activeLanguage.store.actions.submit}}</span>  
                                
                              </button>
                            </span>
                          </span>
                        </span>

                        <!-- No Report -->
                        <span v-if="!deployment.deployment_report && deployment.accepted_by_user && !loading" class="text-semibold text-orange-300 p-2">
                          <label class="block mt-4 text-sm">
                              <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.actions.upload_report}} <span class="text-xs italic">('.pdf', '.word')</span></span>
                              <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <input  
                                  type="file"
                                  id="noCVFile"
                                  :name="form.deployment_report"
                                  @change="displaySubmit('noCVFile')"
                                  class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                  placeholder="john.doe@gmail.com"
                                  validation="required"  
                                  accept=".pdf" 
                                />        
                                  <span v-if="getErrorMessage['deployment_report']">
                                  <span v-if="getErrorMessage['deployment_report'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['deployment_report']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{error}}</span>
                                    </span>
                                  </span>
                                </span>   
                              </div>
                            </label>
                          

                          <span class="flex justify-between p-2">
                              <span></span>
                              <span></span>
                              <button :class="['hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue',loading?'cursor-not-allowed':'']"  @click="saveReport('noCVFile',deployment.id)" v-if="fileUploaded"> 
                                <span v-if="loading"> <Loading /> </span>
                                <span v-else>{{activeLanguage.store.actions.submit}}</span>
                              </button>
                            </span>
                          
                        </span>
                      </div>
                    </div>  
                    <!-- End of report -->
                  </td>
                </tr>
            </tbody>
            <div class="flex justify-center text-orange-500 font-mono col-span-3" v-else> No deployments yet</div>
          </table>            
          <div v-if="rdeDeployments.length===0" class="col-span-4 border border-black">
            <span class="text-yellow-400 text-xl flex justify-center  font-bold animate-pulse">
              {{activeLanguage.store.rde_self_profile.no_deployments}}.
            </span>
          </div>
          
        </span>
        
      </div>
    </div>  
        
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import Loading from "../../components/utilities/loading";

// import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import {  baseUrl } from '../../utils/constants';
// import Loading from '../../components/utilities/loading.vue';

export default {
  name: "Regions",
  components: {
    // data_table,
    dashboard_layout,
    // VuePdfApp,
    Loading,
  },
  data() {
    return {
      rdeSelfProfile:{},
      rdeDeployments:{},
      signUpData:{},
      form: {   
        cv:''
      },
      mode: 'light',
      mailto: "mailto:",
			tel: "tel:",
      viewPdf: false,
      viewPdfToUpload: false,
      RDEcv:'',
      report:'',
      fileUploaded:0,
      loading:false,
      username: '',
      displayUploadButton:false,
      rdeQualifications:[]     

    }
  },
  methods:{
    ...mapActions(['uploadReportById','fetchReport','fetchRDES','getRDEprofileDeployment','fetchQualificationsById']),
    displaySubmit(field_id){
      if(document.getElementById(field_id).files[0]) this.fileUploaded+=1  
      this.displaySubmit=false
    },
    saveReport(field_id,deployment_id){
      this.loading=true
      let formData = new FormData()
      formData.append('profile_deployment_id',deployment_id)
      formData.append('deployment_report', document.getElementById(field_id).files[0])
      this.$store.dispatch('uploadReportById', formData).then(()=>{
        this.$toast.success("uploaded")
        this.fetchRDEData()
        this.loading=false
        this.displayUploadButton=false
      }).catch(err=>{
        console.log(err)
      })
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
          // this.fetchRDEdeployments(localStorage.getItem('rdeId'))
          // this.fetchRDEData()
       })
    },
    fetchRDEData(){
      this.loading = true
      this.$store.dispatch('fetchRDES',1).then(resp => {
        if(resp.results.length > 0) {
          this.rdeSelfProfile = resp.results[0]
          this.fetchRDEdeployments(this.rdeSelfProfile.id)
        }
        }).catch(err=>{
          this.$store.dispatch('setErrorMsg', err.data)
        }).then(()=>{
          this.loading = false
      })

      //fetch academic RDE qualifications      
      this.$store.dispatch('fetchQualificationsById',this.rdeSelfProfile.id).then(resp => {
        console.log('id:',this.rdeSelfProfile.id)
        if(resp.results.length > 0) {
          this.rdeQualifications = resp.results
        }
        }).catch(err=>{
          this.$store.dispatch('setErrorMsg', err.data)
        }).then(()=>{
          this.loading = false
      })

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
    changeStyle () {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    },
     togglePdfDisplay(action, pdf_bool,deployment_report) {
      if(pdf_bool==='viewPdf'){
        this.viewPdf = !this.viewPdf;
      }
      if(pdf_bool==='viewPdfToUpload'){
        this.viewPdfToUpload = !this.viewPdfToUpload;
      }
      if(action==='fetchCV'){
        console.log('fetching cv')
        this.loading=true
        
          this.loading=false
          let relative_url=deployment_report.replace('/media/media','media')
          window.open(baseUrl+relative_url, '_blank')
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
    this.fetchRDEData()
    this.getProfileDetails()  
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
