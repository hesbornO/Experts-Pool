<template>
  <dashboard_layout :page_title="``" :show-back="false" >
    <span v-if="rdeSelfProfile">
      <span class="flex justify-between" v-if="Object.keys(rdeSelfProfile).length > 0">
        <span></span>
        <span>
          
        </span>
      </span>
    </span>    

    <div v-if="rdeSelfProfile && Object.keys(rdeSelfProfile).length > 0">
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
            <tbody>
              <div v-if="rdeDeployments.length>0">
                <tr v-for="(deployment, index) in rdeDeployments" :key="index" class="text-md border border-black">
                  <td class="border-l border-black p-2 uppercase font-mono text-orange-500 font-semibold">{{deployment.outbreak.name?deployment.outbreak.name:''}}</td>
                  <td class="border-l border-black p-2 capitalize">{{deployment.outbreak.description?deployment.outbreak.description:''}}</td>
                  <td class="border-l border-black p-2 capitalize">{{deployment.region_object.name}}</td>
                  <td class="border-l border-black p-2 text-xs">{{deployment.start_date?deployment.start_date:''}}</td>
                  <td class="border-l border-black p-2 text-xs">
                    {{deployment.end_date?deployment.end_date:''}}                   
                  </td>
                  <td class="border-l border-black p-2 text-xs flex">
                    <router-link
                        :to="{name:'acceptDeployment', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.first_name?this.rdeSelfProfile.first_name.concat(' ').concat(this.rdeSelfProfile.last_name):''}}"
                        class="btn btn-green h-3/4 text-xs"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span class="px-1">{{activeLanguage.store.rde_self_profile.update_profile}}</span>
                    </router-link>
                    <router-link
                        :to="{name:'rejectDeployment', params:{rdeId:this.rdeSelfProfile.id, rdeName: this.rdeSelfProfile.first_name?this.rdeSelfProfile.first_name.concat(' ').concat(this.rdeSelfProfile.last_name):''}}"
                        class="btn btn-green h-3/4 text-xs"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span class="px-1">{{activeLanguage.store.rde_self_profile.update_profile}}</span>
                    </router-link>
                  </td>
                </tr>
              </div>
            </tbody>
          </table>            
          <div v-if="rdeDeployments.length===0" class="col-span-4 border border-black">
            <span class="text-yellow-400 text-xl flex justify-center  font-bold animate-pulse">
              {{activeLanguage.store.rde_self_profile.no_deployments}}.
            </span>
          </div>
          
        </span>
        <span class="colspan-1 flex justify-end">
        
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

export default {
  name: "Regions",
  components: {
    // data_table,
    dashboard_layout,
    // VuePdfApp,
    Loading
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
      fileUploaded:0,
      loading:false,
      username: '',
      displayUploadButton:false,
      rdeQualifications:[]     

    }
  },
  methods:{
    ...mapActions(['fetchRDEById','fetchRDEcv','fetchRDES','getRDEprofileDeployment','fetchQualificationsById']),
    displaySubmit(field_id){
      if(document.getElementById(field_id).files[0]) this.fileUploaded+=1  
    },
    saveCV(field_id){
      let formData = new FormData()
      formData.append('profile_id',this.rdeSelfProfile.id)
      formData.append('cv', document.getElementById(field_id).files[0])
      this.$store.dispatch('uploadCVById', formData).then(()=>{
        this.$toast.success("uploaded")
        location.reload()
      }).catch(err=>{
        console.log(err)
      })
      // location.reload()
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
      // window.location.reload()
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
