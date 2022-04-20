<template>
  <dashboard_layout page_title="Admin Reports">
    

    <div class="w-full overflow-hidden shadow-xs ">
      <div class="w-full overflow-x-auto ">
        <div class="w-full  bg-gray-50 py-4 p-4 mb-4 rounded-md space-x-4">
          <div class="mb-3 flex flex-row justify-end">      
            <button
                class="btn btn-blue  text-xs"
                @click="showUploadSection"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="px-1">Add Report</span>
            </button>
          </div>
          <div v-if="showSection" class="  font-mono capitalize border border-blue-200 bg-gray-100 rounded-md p-2">
            <span class="flex justify-center text-blue-500 ">
              <span></span>
              <span>add report here</span>
              <span></span>
            </span>
            <FormulateForm  v-model="form" @submit="saveReport('noReport')" class="pt-5 ">
                <div class="grid md:grid-cols-2 gap-4">                
                  <label class="block text-sm col-span-1" v-if="!loading">
                    <span class="text-gray-700 dark:text-gray-400">Description</span>
                    <FormulateInput 
                      name="name" 
                      type="textarea"
                      error-behavior='value'
                      rows='5'
                      placeholder="Type here" class="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </label>
                  <label class="block  text-sm col-span-1 -mt-2">
                    <!-- Report -->
                    <div class="col-start-2 col-end-4  ml-20">
                      <span v-if="loading" class=" mt-5 flex justify-center">
                        <loading></loading>
                      </span>
                      <div class="">          
                        <!-- Report exists -->
                        <!-- <span v-if="outbreak.report && !loading" class="">  
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
                                        :name="form.document"
                                        @change="displaySubmitButton('newReport')"
                                        class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        validation="required"  
                                        accept=".pdf" 
                                />    
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
                        </span> -->

                        <!-- No Report -->
                        <span v-if=" !loading" class="text-semibold text-orange-300 ">
                          <label class="block text-sm">
                              <span class="text-gray-700 font font-mono dark:text-gray-400">Add Report <span class="text-xs italic">('.pdf', '.word')</span></span>
                              <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <FormulateInput  
                                  type="file"
                                  id="noReport"
                                  name="document"
                                  @change="displaySubmitButton('noReport')"
                                  class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                  placeholder="john.doe@gmail.com"
                                  validation="required"  
                                  accept=".pdf" 
                                />        
                                  <span v-if="getErrorMessage['document']">
                                  <span v-if="getErrorMessage['document'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['document']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{error}}</span>
                                    </span>
                                  </span>
                                </span>   
                              </div>
                            </label>
                          
                        </span>
                      </div>
                    </div>  
                <!-- End of report -->
                  </label>
                </div>

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

                <!-- You should use a button here, as the anchor is only used for the example  -->
                <span class="flex justify-center">
                  <button 
                :class="['capitalize w-full  md:w-1/2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ',loading?'opacity-75 cursor-not-allowed':'']" 
                type="submit" v-bind:disabled="loading"
                v-if="fileUploaded && form.document && form.name" 
                title="Click to submit">
                  submit
                </button>
                </span>
              </FormulateForm>

          </div>
          
          
          <router-view></router-view>

        </div>


        <!-- Reports List -->
         <data_table v-bind="$attrs">
          <template v-slot="{item}" >
            
            <td class="px-4 py-3 text-sm capitalize" v-if="item.name">{{ item.name ? item.name : '' }}</td>
            <td class="px-4 py-3 text-sm capitalize" v-if="item.document">
              <span v-if="item.document && !loading" class="">  
                  <span class="flex justify-between p-4">  
                    <span></span>              
                    <span class="text-yellow-700 font-semibold text-base"> Report</span>      
                    <span></span>              
                  </span>  
                  <span class="grid grid-cols-1 justify-between p-4">
                    <span class="col-span-1">
                      <button @click="togglePdfDisplay('fetchReport','viewPdf',item.document)" 
                        class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue" 
                        >
                        <span>View</span>
                      </button>
                    </span>
                    <!-- <span class="col-span-1">
                      <span>
                        <button
                            class="hover-animation px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue " 
                            :id="`report${item.id}`"
                            @click="toggleUploadField(`report${item.id}`)">
                          {{displayUploadButton?'Close':'Update'}}
                        </button>
                      </span>
                    </span> -->
                  </span>
                  <span v-if="displayUploadButton" class="text-semibold text-orange-300 p-2 ">
                    <label class="block mt-4 text-sm ">
                      <span class="text-gray-700 font font-semibold dark:text-gray-400">Attach Report <span class="text-xs italic">(pdf and word docs)</span></span>
                      <div
                          class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                      >
                        <input  type="file"
                                id="newReport"
                                :name="form.document"
                                @change="displaySubmitButton('newReport')"
                                class=" w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:b  order-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                validation="required"  
                                accept=".pdf" 
                        />    
                      </div>
                    </label>
                  </span>  
              </span>  
            </td>           
            <td class="px-4 py-3 text-sm flex flex-row space-x-1" v-if="item.name">    
              <split-button  :primary="createPrimary(item)" class="w-32 md:w-48 bg-blue-100" />                   
            </td>
          </template>
        </data_table>
        <!-- end of list -->
      </div>
    </div>
  </dashboard_layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import dashboard_layout from '../../components/layouts/dashboard_layout.vue';
import data_table from "../../components/layouts/DataTableTemplate";


// pdf
import "vue-pdf-app/dist/icons/main.css";
import SplitButton from "../../components/buttons/SplitButton.vue";



export default {
  name: "AdminReports",
  components: {

    dashboard_layout,
    data_table,
    SplitButton

  },
  data() {
    return {
      form: {},
      reports:[],
      showSection:false,
      
      displayUploadButton:false,
      fileUploaded:0,
      loading:false
    }
  },
  methods: {
    ...mapActions(['fetchAbstractReports','uploadOutbreakReportById']),
    // ...mapGetters(['getCurrentToken']),
    createPrimary(item) {
      return {
        to: { name: "updateDescription", params: { reportId:item.id?item.id:'',reportName:item.name?item.name:'' } },
        label: "Update Description",
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>`,
      };
    },    
    displaySubmitButton(field_id){
      if(document.getElementById(field_id).files[0]){
        this.fileUploaded+=1
        console.log(document.getElementById(field_id).files[0])
      }   
    },
    saveReport(field_id){
      if(document.getElementById(field_id).files[0]){
        this.loading=true
        var fileInput = document.getElementById(field_id);   
        var newFileName = fileInput.files[0].name.replaceAll(/ |_/g,'');
        const myRenamedFile = new File([fileInput], newFileName);
        let formData = new FormData()
        formData.append('name',this.form.name)
        formData.append('document', myRenamedFile)
        this.$store.dispatch('uploadAdminReport', formData).then(()=>{
          this.$toast.success("uploaded")
          this.getReports()
          location.reload()
          
        }).catch(err=>{
          console.log(err)
        }).then(()=>{
          this.loading=false
          this.displayUploadButton=false
          this.showSection=false
        })
      }
    },
    showUploadSection(){
      this.showSection=!this.showSection
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
    toggleUploadField(id) {
      document.getElementById(id).style.visibility = 'visible'
      this.displayUploadButton = !this.displayUploadButton;
    },
    registerPreQualifiedRDE() {
      this.register_prequalified_rde = true
    },
    closeRegisterPreQualifiedRDEModal() {
      this.register_prequalified_rde = false
    },
    closeUpdateRDEModal() {
      this.update_rde_details = false
    },
    // submitPreQualifiedRDE() {
    //   this.register_prequalified_rde = false
    //   // alert('RDE registered successfully!!')
    // },
    getReports() {
      this.$store.dispatch('fetchAbstractReports').then(resp => {
        this.reports = resp;
      }).catch(err => {
        console.log(err);
      })
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
          this.form.cv = dataUri
          this.fileUploaded += 1
        }
      };
      reader.readAsDataURL(file);
    },
    filterByOutbreak(){

    }


  },
  mounted() {
    this.getReports()

  },
  computed: {
    ...mapGetters(['getErrorMessage','activeLanguage']),
    // ...mapActions(['fetchCountries', 'fetchRegions', 'fetchOccupations', 'postRDE'])
  }
};
</script>

<style>
.btn {
  @apply justify-center transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 text-sm font-medium leading-5  border border-transparent rounded-md focus:outline-none capitalize flex
}

.btn-blue {
  @apply bg-havelock-blue-200 text-havelock-blue-700 hover:bg-havelock-blue-700 hover:text-white
}

.btn-red {
  @apply bg-red-200 text-red-700 hover:bg-red-700 hover:text-white
}

.btn-green {
  @apply bg-green-200 text-green-700 hover:bg-green-700 hover:text-white
}
</style>
