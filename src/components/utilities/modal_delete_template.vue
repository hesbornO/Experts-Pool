<template>
  <div>
    <div :class="[delete_modal_hidden ?'fixed z-10 inset-0 overflow-y-auto':'hidden']" aria-labelledby="modal-title"
         aria-modal="true" role="dialog" >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

      <div aria-hidden="true" class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:max-h-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 h-48">
            <div class="sm:flex sm:items-start ">

              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <p>Confirm Delete {{object_title}} ? This Action Cannot be UnDone !</p>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between font-semibold text-white">
                <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto uppercase"
                        type="button"
                        @click="executeAction">
                  Confirm
                </button>
                <button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-3 w-full inline-flex justify-center rounded-md border border-red-200 shadow-sm px-4 py-2 bg-red-300 hover:bg-red-500 focus:outline-none uppercase sm:mt-0 sm:ml-3 sm:w-auto "
                        type="button"
                        @click="back">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "modal_delete_template",
  props:{
    vuex_action:{
      type: String,
    },
    vuex_payload:{

    },
    item:{
      type : Object,
      default: ()=>{return {}}
    },
    object_title: {
      type:String,
      default: ''
    }
  },
  data(){
    return {
      delete_modal_hidden: true
    }
  },
  methods:{
    executeAction(){
      this.$store.dispatch(this.vuex_action, this.vuex_payload).then(()=>{
          this.$toast.success(
              ""+ this.object_title + " Deleted Successfully"
          )
          this.hidden = true;
          this.back()
        // eslint-disable-next-line no-unused-vars
      }).catch(err=>{
        this.hidden = true;
        this.back()
      });

    },
    back(){
      this.$router.back()
    }
  },
  created() {
    console.log("created")
  }
}
</script>

<style scoped>

</style>