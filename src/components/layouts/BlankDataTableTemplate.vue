<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs" >
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap filter blur-sm" id="tblData">
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
        <tbody v-if="pageResult.length > 0 && !loading" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
        <tr class="text-gray-700 dark:text-gray-400 border" v-for="(item,index) in pageResult"
            :key="index">
          <slot v-bind:item="item"></slot>
        </tr>
        </tbody>
        <tbody v-if="!loading && pageResult.length < 1">
          <tr class="text-gray-600 dark:text-gray-400 border">
            <td v-for="(heading, index) in Math.ceil(table_headings.length/2) -1 " :key="index"></td>
            <td>
              No Data Was Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span class="flex items-center col-span-3 filter blur-sm" v-if="pageResult">
          Showing {{ pageResult.length }} of {{ pageResult.length }}
        </span>
      <span class="col-span-2"></span>
      <!-- Pagination -->
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul class="inline-flex items-center filter blur-sm">
              <li>
                <button
                    aria-label="Previous"
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                >
                  <svg
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                  >
                    <path
                        clip-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  1
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  2
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  3
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  4
                </button>
              </li>
              <li>
                <span class="px-3 py-1">...</span>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  8
                </button>
              </li>
              <li>
                <button
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                >
                  9
                </button>
              </li>
              <li>
                <button
                    aria-label="Next"
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                >
                  <svg
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                  >
                    <path
                        clip-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
    </div>
  </div>
</template>

<script>
import Loading from "../utilities/loading";
export default {
  name: "blank_data_table_template",
  components: {Loading},
  data(){
    return {
      pageResult:[],
      loading : false,
      table_headings: ['Heading 1', 'Heading 2', 'Heading 3']
    }
  },
  methods:{
    goBack(){
      this.$router.back()
    },

  },
}
</script>

<style scoped>

</style>