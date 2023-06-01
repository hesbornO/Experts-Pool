<template>
  <div>
    <div :class="['fixed z-10 inset-0 overflow-y-auto ']" aria-labelledby="modal-title"
         aria-modal="true" role="dialog" >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">

      <div aria-hidden="true" class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            :class="['inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all',size]">
          <div class="bg-white sm:pb-4 flex flex-col justify-between text-havelock-blue ">
              <div class="flex flex-row justify-between text-center border-b border-gray-200 py-3.5 px-3">
                <div class="flex flex-row">
                  <div class="flex flex-col justify-center"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path></svg> </div>
                  <div class="flex flex-col justify-center"><p class="px-2 ">{{moduleAction==='acceptDeployment'?'Accept':moduleAction==='rejectDeployment'?'Reject':'Create'}} {{object_title}} {{moduleAction==='acceptDeployment'?'Deployment':moduleAction==='rejectDeployment'?'Deployment':''}}</p></div>
                </div>
                <div class="flex flex-col justify-center hover:bg-havelock-blue-100  rounded-full  w-7 h-7">
                  <div class="flex flex-row justify-center">
                  <svg @click="back" class="w-5 h-5 hover:w-4 hover:h-4 hover:cursor-pointer text-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                </div>
              </div>
              <div class="flex flex-col justify-start px-3 py-3">
                <div class="flex justify-center">
                  <loading v-if="loading"></loading>
                </div>
                <FormulateForm v-if="jsonSchema && !loading" class="w-full" v-model="form" :errors="getErrorMessage" :schema="optionsPopulatedSchema" :form-errors="formErrors" invalid-message="Not all fields were filled out properly">
                    <FormulateErrors class="rounded-sm text-xs px-4 py-3 text-red-700 bg-red-100 border border-red-300" />

                </FormulateForm>
                <slot v-else></slot>
              </div>
              <div class="flex flex-row justify-between w-full border-t px-3 pt-3 font-semibold text-white">
                <button class="btn btn-red flex flex-col justify-center filter opacity-60"
                        type="button"
                        @click="back">
                  <div class="flex flex-row justify-between gap-x-2">
                    <p>Cancel</p> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </button>
                <button class="btn btn-green flex flex-col justify-center  "
                        type="button"
                        @click="executeAction">
                  <div class="flex flex-row justify-between gap-x-2">
                    <p>{{moduleAction==='acceptDeployment'?'Accept':moduleAction==='rejectDeployment'?'Reject':moduleAction==='deactivateProfile'?'Confirm':moduleAction==='activateProfile'?'Confirm':'Save'}}</p> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import Loading from "./loading";

export default {
  name: "modal_create_template",
  components: {Loading},
  data (){
    return {
      form: {},
      inputErrors:{},
      formErrors: [],
      modal_hidden: true,
      loading: false,
      fetchedOptions:[],
      optionsPopulatedSchema: []
    }
  },
  props:{
    vuex_action:{
      type: String,
    },
    vuex_payload:{
      
    },
    object_title: {
      type: String,
      default: ''
    },
    jsonSchema: {
      type: Array, default: ()=>{return []}
    },
    size: {
				type: String,
				default: "max-w-sm",
			},
    optionsList: { type: Array, default: () => [] },
    country_id:[String, Number],
    object_id:[String, Number],
    profile:[String, Number],
    moduleName:[String, Number],
    moduleAction:[String],
    currentItem:[String,Array,Object],
    currentItemIndex:[String,Array,Object,Number],
    allItems:[String,Array],

  },
  created(){
    this.tryOptions();
  },
  methods:{
    executeAction(){
      this.loading = true
      let payload = {}
      if(this.profile){
        this.form.profile=this.profile
      }
      this.form.country_id = this.country_id
      console.log("reached", this.vuex_payload, this.moduleAction, this.form)
      if (this.vuex_payload){
        payload = this.vuex_payload
        if(this.moduleAction==='addRDEReference' || this.moduleAction==='postRDEExperienceById'){
          if(this.form.profile) delete this.form.profile
          delete this.country_id
          payload={professional_experience:payload}

          if(this.moduleAction ==='postRDEExperienceById'){
            
            payload=[{professional_experience:[payload]}]
          } 
          
          if(this.moduleAction ==='addRDEReference'){
            payload=[{references:[payload]}]
          } 

          payload.id=this.object_id        
        } 
      }else{
        payload = this.form
        if(this.moduleAction==='addRDEReference' || this.moduleAction==='postRDEExperienceById' || this.moduleAction==='acceptDeployment' || this.moduleAction==='rejectDeployment' || this.moduleAction==='deactivateProfile' || this.moduleAction==='activateProfile'){
          if(this.form.profile) delete payload.profile
          
          if(this.moduleAction ==='postRDEExperienceById'){
            payload=[payload]
            payload=[...payload,...this.allItems]
            payload={professional_experience:payload}
          } 
          
          
          if(this.moduleAction ==='addRDEReference'){
            payload=[payload]
            payload=[...payload,...this.allItems]
            payload={references:payload}
          } 

          payload.id=this.object_id
        } 
        
      }
      payload.eligibility_criteria =''
      if(this.moduleAction==='CreateOutbreak'){
        if(payload.competencies){
          for(let competency of payload.competencies) payload.eligibility_criteria+= '&competencies='+competency
        }
        if(payload.affected_regions){
          for(let region of payload.affected_regions) payload.eligibility_criteria+= '&region='+region
        }
        payload.eligibility_criteria=payload.eligibility_criteria.replace('&','?')
        if(payload.workCompetencies || payload.languageCompetencies){
          payload.competencies=[...payload.workCompetencies,...payload.languageCompetencies]
          delete payload.workCompetencies
          delete payload.languageCompetencies
        }
      }
      if(this.moduleAction==='updateRDEexperience' || this.moduleAction==='updateRDEReference'){
        payload={}
        payload.id=this.object_id
        this.allItems[this.currentItemIndex]=this.form
        if(this.moduleAction==='updateRDEexperience') payload.professional_experience=this.allItems
        else if(this.moduleAction==='updateRDEReference') payload.references=this.allItems
      }
      if(this.moduleAction==='acceptDeployment' || this.moduleAction==='rejectDeployment'){
        
          delete payload.eligibility_criteria
        
          console.log('payloddad',payload)
      }
      console.log('vuex_action',this.vuex_action)
      this.$store.dispatch(this.vuex_action, payload).then(()=>{
          this.$toast.success(
              ""+ this.object_title + (this.moduleAction==='activateProfile'?' activated':this.moduleAction==='deactivateProfile'?' deactivated':'Created')+ "  Successfully"
          )
          this.hidden = true;
          this.back()
        // eslint-disable-next-line no-unused-vars
      }).catch(err=>{
        this.loading = false
        console.log(err)
      }).then(()=>{
        // this.loading = false
      });
    },
    back(){
      this.$router.back()
    },
    tryOptions(){
      if(this.moduleAction==='updateRDEQualification' || this.moduleAction==='deleteRDEQualification' || this.moduleAction==='updateRDEexperience' || this.moduleAction==='deleteRDEexperience' || this.moduleAction==='updateRDEReference' || this.moduleAction==='deleteRDEReference'){
        this.form=this.currentItem
        if(this.moduleAction==='updateRDEQualification' || this.moduleAction==='deleteRDEQualification'){
          if(this.currentItem.qualification_type) this.form.qualification_type_id=this.currentItem.qualification_type.value
        } 
        this.$forceUpdate()
        console.log('form',this.form)
      }
      if (this.optionsList.length>0){
        this.fetchOptions()
      }else{
        this.optionsPopulatedSchema = this.jsonSchema
      }
       if(this.moduleAction=='addRDEQualification'){        
        this.form.profile_id=this.$route.params.rdeId      
      } 

      // prefill form if reference or experience
      

    },
    async fetchOptions() {
      // let schema =[]
      this.loading=true
      let promises = []
      this.optionsList.map((option)=>{
          promises.push(this.$store.dispatch(option))
        })
    Promise.all(promises ).then((values)=>{
          this.fetchedOptions = values;
         this.populateSchema()
         this.loading=false
      })

      
      // console.log("has finished", this.optionsList,"fetched opts", this.fetchedOptions)

    
    },
    populateSchema(){
        let schema = JSON.stringify(this.jsonSchema)
        for(var index=0;index<this.fetchedOptions.length;index++){
          if(this.fetchedOptions[index].results) this.fetchedOptions[index] =this.fetchedOptions[index].results
        }
        this.fetchedOptions.map((option, index)=>{
             schema= schema.replace(`"options":[${index}]`, `"options":${JSON.stringify(option)}`)
        })
        this.optionsPopulatedSchema = JSON.parse(schema)
        this.loading = false
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
      document.getElementById("start_date_field").setAttribute("max", today);
    },
  },
  computed: {
    ...mapGetters(['getErrorMessage'])
  }
}
</script>

<style scoped>

</style>