<template>
  <dashboard_layout :page_title="`${$route.params.outbreakName} admin report`">
    <button @click="goBack()" class="btn btn-blue mb-2 flex flex-row justify-between w-24" >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      Back
    </button>
    <div v-if="outbreak" class="flex justify-center">
      <!-- Report -->
      <div class="col-start-2 col-end-4  mt-5 ml-20">
        <span v-if="loading" class=" mt-5 flex justify-center">
          <loading></loading>
        </span>
        <div class="">          
          <!-- Report exists -->
          <span v-if="outbreak.report && !loading" class="">  
            <span class="flex justify-between p-4">  
              <span></span>              
              <span class="text-yellow-700 font-semibold text-base">{{outbreak.name}} Report</span>      
              <span></span>              
            </span>  
            <span class="grid grid-cols-2 justify-between p-4">
              <span class="col-span-1">
                <button @click="togglePdfDisplay('fetchReport','viewPdf',outbreak.report)" 
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
            <span v-if="displayUploadButton" class="text-semibold text-orange-300 p-2  ">
              <label class="block mt-4 text-sm ">
                <span class="text-gray-700 font font-semibold dark:text-gray-400">Attach Report <span class="text-xs italic">(pdf and word docs)</span></span>
                <div
                    class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input  type="file"
                          id="newReport"
                          :name="form.report"
                          @change="displaySubmitButton('newReport')"
                          class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                          validation="required"  
                          accept=".pdf" 
                  />        
                    <!-- <span v-if="getErrorMessage['report']">
                    <span v-if="getErrorMessage['report'].length>0">
                      <span v-for="(error,index) in getErrorMessage['report']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span> 
                  </span>   -->
                </div>
              </label>  

              <span class="flex justify-between p-2">
                <span></span>
                <span></span>
                <button 
                :class="['hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue',loading?'cursor-not-allowed':'']"  
                @click="saveReport('newReport', outbreak.id)" 
                v-if="fileUploaded"> 
                  <span v-if="loading"> <Loading /> </span>
                  <span v-else>{{activeLanguage.store.actions.submit}}</span>  
                  
                </button>
              </span>
            </span>
          </span>

          <!-- No Report -->
          <span v-if="!outbreak.report && !loading" class="text-semibold text-orange-300 p-2">
            <span>No report uploaded. Kindly upload.</span>
            <label class="block mt-4 text-sm">
                <span class="text-gray-700 font font-semibold dark:text-gray-400">{{activeLanguage.store.actions.upload_report}} <span class="text-xs italic">('.pdf', '.word')</span></span>
                <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input  
                    type="file"
                    id="noReport"
                    :name="form.report"
                    @change="displaySubmitButton('noReport')"
                    class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="john.doe@gmail.com"
                    validation="required"  
                    accept=".pdf" 
                  />        
                    <span v-if="getErrorMessage['report']">
                    <span v-if="getErrorMessage['report'].length>0">
                      <span v-for="(error,index) in getErrorMessage['report']" :key="index">
                        <span class="text-red-500 animate-pulse">{{error}}</span>
                      </span>
                    </span>
                  </span>   
                </div>
              </label>
            

            <span class="flex justify-between p-2">
                <span></span>
                <span></span>
                <button 
                :class="['hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue',loading?'cursor-not-allowed':'']"  
                @click="saveReport('noReport',outbreak.id)" v-if="fileUploaded"> 
                  <span v-if="loading"> <Loading /> </span>
                  <span v-else>{{activeLanguage.store.actions.submit}}</span>
                </button>
              </span>
            
          </span>
        </div>
      </div>  
      <!-- End of report -->
    </div>
   
    <router-view></router-view>
  </dashboard_layout>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Loading from "../../components/utilities/loading";
// import {  baseUrl } from '../../utils/constants';



import dashboard_layout from '../../components/layouts/dashboard_layout.vue';

export default {
  name: "OutbreakReport",
  components: {
    dashboard_layout,
    Loading
  },
  props:{
    affectedRegions:[],
    showBack:{
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      report:'',
      outbreak:{},
      form: {
        report:''
      },
      viewPdf: false,
      loading:false,
      displayUploadButton:false,
      fileUploaded:0,




    }
  },
  methods:{
    ...mapActions(['fetchOutbreakById','uploadOutbreakReportById']),

    goBack(){
      this.$router.back()
    },
    saveReport(field_id,outbreak_id){
      if(document.getElementById(field_id).files[0]){
        this.loading=true
        var fileInput = document.getElementById(field_id);   
        var newFileName = fileInput.files[0].name.replaceAll(/ |_/g,'');
        const myRenamedFile = new File([fileInput], newFileName);
        let formData = new FormData()
        formData.append('outbreak_id',outbreak_id)
        formData.append('report', myRenamedFile)
        this.$store.dispatch('uploadOutbreakReportById', formData).then(()=>{
          this.$toast.success("uploaded")
          this.fetchOutbreak()
          this.loading=false
          this.displayUploadButton=false
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    displaySubmitButton(field_id){
      if(document.getElementById(field_id).files[0]){
        this.fileUploaded+=1
        console.log(document.getElementById(field_id).files[0])
      }   
    },
    togglePdfDisplay(action, pdf_bool,report) {
      if(pdf_bool==='viewPdf'){
        this.viewPdf = !this.viewPdf;
      }
      if(pdf_bool==='viewPdfToUpload'){
        this.viewPdfToUpload = !this.viewPdfToUpload;
      }
      if(action==='fetchReport'){
        console.log('fetching report')
        this.loading=true
        
          this.loading=false
          let relative_url=report.replace('/media/media','/media')
          console.log(relative_url)
          window.open(relative_url, '_blank')
      }

    },
    toggleUploadField() {
      this.displayUploadButton = !this.displayUploadButton;
    },
    fetchOutbreak() {
      this.$store.dispatch('fetchOutbreakById',this.$route.params.outbreakId).then(resp => {
        this.outbreak = resp;   
         
    // store outbreaks in localstorage, pass index/id in route and use to filter affected regions

      }).catch(err => {
        console.log(err);
      })
    }, 
   
  },
  mounted() {
    this.fetchOutbreak()
  },
  computed: {
    ...mapGetters(['getErrorMessage', 'allLanguages', 'activeLanguage']),


  }
};
</script>
