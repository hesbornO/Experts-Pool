<template>
  <div>

    <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
      <input v-model="form.name"
             class="block w-full border-2  border-gray-200 rounded-sm p-2 pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
             name="name"
             placeholder="e.g. Tanzania"
             required
             type="text"
      />
      <span v-if="getErrorMessage['name']">
                                  <span v-if="getErrorMessage['name'].length>0">
                                    <span v-for="(error,index) in getErrorMessage['name']" :key="index">
                                      <span class="text-red-500 animate-pulse">{{ error }}</span>
                                    </span>
                                  </span>
                                </span>
      <div class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
        </svg>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "UpdateMemberCountry"
}
</script>

<style scoped>

</style>