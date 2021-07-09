<template>
  <div>
    <modal_create_template :vuex_action="`postCountry`" :object_title="`Country`"
                           :vuex_payload="form">
      <div class="flex flex-col space-y-3 text-gray-600">
        <FormulateForm class="w-full" v-model="form" :errors="getErrorMessage" :schema="jsonSchema" :form-errors="formErrors">

        </FormulateForm>
      </div>
    </modal_create_template>

  </div>

</template>

<script>
import modal_create_template from "../../components/utilities/modal_create_template";
import {mapGetters} from "vuex";
export default {
  name: "CreateMemberCountry",
  components: {modal_create_template},
  data (){
    return {
      form: {},
      inputErrors:{},
      formErrors: [],
      jsonSchema: [
        {
          "type":"text",
          "label":"Country Name",
          "name":"name",
          "validation":"required"
        },
        {
          "type":"tel",
          "label":"Phone Code",
          "name":"phone_code",
          "validation":"required"
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getErrorMessage'])
  }
}
</script>

<style scoped>

</style>