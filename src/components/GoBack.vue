<template>
    <span class="go-back">
        <button @click="goBack" class="text-blue-700 ">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back
        </button>
      </span>
</template>

<script>
export default {
methods:{
    goBack(){
      return this.$router.go(-1)
    },
}
}
</script>

<style>


</style>vue