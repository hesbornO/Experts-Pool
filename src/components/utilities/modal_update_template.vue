<template>
  <div>
    <div :class="[modal_hidden ?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title"
         aria-modal="true" role="dialog">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div aria-hidden="true" class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>

        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            :class="['inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all',size]">
          <div class="bg-white sm:pb-4 flex flex-col justify-between text-havelock-blue">
            <div class="w-full flex flex-row justify-between text-center border-b border-gray-200 py-3.5 px-3">
              <div class="flex flex-row">
                <div class="flex flex-col justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div class="flex flex-col justify-center"><p class="px-2">Update {{object_title }}</p></div>
              </div>
              <div class="flex flex-col justify-center hover:bg-havelock-blue-100  rounded-full  w-7 h-7">
                <div class="flex flex-row justify-center">
                  <svg @click="back" class="w-5 h-5 hover:w-4 hover:h-4 hover:cursor-pointer text-center" fill="none"
                       stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div  class="flex flex-col justify-start px-3 py-3">
              <div class="flex justify-center">
                <loading v-if="loading"></loading>
              </div>
              <div v-if="!loading">
                <FormulateForm v-if="jsonSchema" class="w-full"  v-model="form" :errors="getErrorMessage"
                               :schema="optionsPopulatedSchema" :form-errors="formErrors">

                </FormulateForm>

                <slot v-else></slot>
              </div>

            </div>
            <div class="flex flex-row justify-between w-full border-t px-3 pt-3 font-semibold text-white">
              <button class="btn btn-red flex flex-col justify-center filter opacity-60"
                      type="button"
                      @click="back">
                <div class="flex flex-row justify-between gap-x-2">
                  <p>Cancel</p>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </button>
              <button class="btn btn-blue flex flex-col justify-center  "
                      type="button"
                      @click="performUpdateAction">
                <div class="flex flex-row justify-between gap-x-2">
                  <p>Save</p>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
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
import displayServerErrMessage from '@/utils/functions'
import Loading from "./loading";

export default {
  name: "modal_update_template",
  components: {Loading},
  data() {
    return {
      form: {eligibility_criteria:''},
      inputErrors: {},
      formErrors: [],
      modal_hidden: true,
      loading: false,
      fetchedOptionsObject:{},
      fetchedOptions:[],
      fetchOrder:[],
      optionsPopulatedSchema: []
    }
  },
  props: {
    vuex_fetch_action: {
      type: String,
      default: ''
    },
    vuex_save_action:{
      type: String,
    },
    object_id: {},
    object_title: [String, Number],
    jsonSchema: {
      type: Array, default: () => {
        return []
      }
    },
   size: {
      type: String,
      default: "max-w-sm",
    },
    optionsList: { type: Array, default: () => [] },
    moduleName:[String, Number],
    moduleAction:[String, Number]
  },
  methods: {
    performUpdateAction() {
      this.loading = true
      if(this.moduleName==='UpdateOutbreakType'){
        if(this.form.value) this.form.id=this.form.value
      }
      if(this.moduleAction==='UpdateOutbreak'){
        this.form.eligibility_criteria=''
        if(this.form.competencies){
          for(let competency of this.form.competencies) this.form.eligibility_criteria+= '&competencies='+competency
        }
        if(this.form.affected_regions){
          for(let region of this.form.affected_regions) this.form.eligibility_criteria+= '&region='+region
        }

        this.form.eligibility_criteria += this.form.competencies?this.form.competencies:''
        this.form.eligibility_criteria += this.form.affected_regions?this.form.affected_regions:''
      }
      this.$store.dispatch(this.vuex_save_action, this.form).then(() => {
        this.$toast.success(
            "" + this.object_title + " Updated Successfully"
        )
        this.hidden = true;
        this.back()
        // eslint-disable-next-line no-unused-vars
      }).catch(err => {
        this.loading = false
        this.$toast.error(displayServerErrMessage(err))
      }).then(()=>{
        this.loading = false
      });
    },
    fetchObject() {      
      this.loading = true
      this.$store.dispatch(this.vuex_fetch_action, this.object_id).then(resp => {
        this.form = resp
        if(this.moduleName==='occupation'){
          this.form.occupation_category_id=resp.occupation_category.id
        }
        if(this.moduleAction==='updateRDEQualification'){
          if(resp.qualification_type) this.form.qualification_type_id = resp.qualification_type.value
        }
        this.$forceUpdate()
      }).catch(err => {
        displayServerErrMessage(err)
      }).then(()=>{
        if(this.optionsList.length ===0){
          this.loading = false
        }
        //
      })
    },
    fetchOptions() {
      // let schema =[]
      let counter =0
      Promise.all(this.optionsList.map(option=>{this.$store.dispatch(option).then((values)=>{
        this.$set(this.fetchedOptionsObject,option,values);
        this.fetchOrder.push(option)
        counter++
        if(counter === this.optionsList.length){
          this.populateSchema()
        }
      })}))
    },
    populateSchema(){
      this.fetchedOptions = []
      //re order options
      this.optionsList.forEach((action, index)=>{
        this.fetchedOptions[index]=this.fetchedOptionsObject[action]
      })
      let schema = JSON.stringify(this.jsonSchema)
      this.fetchedOptions.map((option, index)=>{
        schema= schema.replace(`"options":[${index}]`, `"options":${JSON.stringify(option)}`)
      })
      this.optionsPopulatedSchema = JSON.parse(schema)
      this.$forceUpdate()
      this.loading = false
    },
    tryOptions(){
      if (this.optionsList.length>0){
        this.fetchOptions()
      }else{
        this.optionsPopulatedSchema = this.jsonSchema
      }
    },
    back() {
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters(['getErrorMessage']),
    currentRouteName() {
        return this.$route.name;
    }
  },
  mounted() {
    this.tryOptions()
    this.fetchObject()
  }
}
</script>

<style scoped>

</style>