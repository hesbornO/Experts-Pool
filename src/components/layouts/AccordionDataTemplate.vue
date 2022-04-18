<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs" :showBack="showBack" :table_headings="table_headings" :vuex_data_action="vuex_data_action">
    <button v-if="showBack" @click="goBack()" class="btn btn-blue mb-2 flex flex-row justify-between w-24" >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      Back
    </button>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap" id="tblData">
        <thead>
        <tr  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border border-b border-t border-r dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th class="px-4 py-3 w-2/12" v-for="(table_heading, index) in table_headings" :key="index">
              {{ table_heading }}
            </th>
        </tr>
        </thead>
        <tbody v-if="loading">
            <tr class="text-gray-600 dark:text-gray-400 border">
            <td v-for="(heading, index) in Math.ceil(table_headings.length/2) -1 " :key="index"></td>
            <td>
                <loading></loading>
            </td>
            </tr>
        </tbody>
        <!-- <div v-if="pageResult.length > 0 && !loading">
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"  v-for="(item,index) in pageResult" :key="index">
                <tr class="text-gray-700 dark:text-gray-400 border" >
                    <slot v-bind:item="item"></slot>
                </tr>
            </tbody>
        </div> -->
        <tbody v-if="!loading && pageResult.length < 1">
          <tr class="text-gray-600 dark:text-gray-400 border">
            <td v-for="(heading, index) in Math.ceil(table_headings.length/2) -1 " :key="index"></td>
            <td>
              No Data Was Found
            </td>
          </tr>
        </tbody>
          <slot v-bind:results="pageResult.results" v-if="pageResult.results && !loading"></slot> 
      </table>
    </div>
   <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800 ">
        <span class="flex items-center col-span-3" v-if="pageResult.results">
          Showing {{ pageResult.results.length }} of {{ pageResult.results.length }}
        </span>
        <span class="flex items-center col-span-3" v-else-if="pageResult">
          Showing {{ pageResult.length }} of {{ pageResult.length }}
        </span>
      <span class="col-span-2"></span>
      <!-- Pagination -->
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <button :class="['text-gray-700 disabled:text-gray-400  disabled:cursor-not-allowed']" @click="changePage('previous')" :disabled="page===1?true:false"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
        <span class="bg-blue-400 text-white rounded-full px-2">{{page}}</span>  
        <button :class="['text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed']" @click="changePage('next')" :disabled="(pageResult.length<1)?true:false"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>  
      </span>
    </div>
  </div>
</template>

<script>
import Loading from "../utilities/loading";
export default {
  name: "data_table",
  components: {Loading},
  data(){
    return {
      pageResult:[],
      loading : false,
      page:1

    }
  },
  props: {
    object_id: {},
    table_headings: {
      type: Array,
      default: ()=>{return []}
    },
    showBack:{
      type: Boolean,
      default: false
    },
    vuex_data_action: {
      type: String,
      default : ''
    },
  },
  methods:{
    goBack(){
      this.$router.back()
    },
    changePage(where){
      if(where==='previous'){
        this.page-=1
        this.pageResult=[] 
        this.fetchData()
      }
      if(where==='next'){
        this.page+=1
        this.pageResult=[] 
        this.fetchData()
      } 
      
    },  
    fetchData(){
      this.loading = true
      // eslint-disable-next-line no-unused-vars
       this.$store.dispatch(this.vuex_data_action, this.object_id?this.object_id:this.page?this.page:'').then(resp => {
         this.pageResult = resp

       }).catch(err=>{
         this.$store.dispatch('setErrorMsg', err.data)
       }).then(()=>{
         this.loading = false
       })
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    $route: {
      async handler() {
        if (
            this.$route.matched.length === 1 || (this.$route.matched.length > 1 && this.pageResult).length === 0 )
        {
          this.fetchData();
        }
      },
    },
  },
}
</script>

<style scoped>

</style>