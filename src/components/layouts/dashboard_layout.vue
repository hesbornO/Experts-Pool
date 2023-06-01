<template>
  <div id="app" class="flex bg-gray-100 dark:bg-gray-100">
    <Sidebar/>
    <div class="flex flex-col flex-1 w-full ">
      <Navigation/>
      <div class="container px-6 mx-auto grid " :showBack="showBack">
        
        <h2 class="my-6 text-xl font-semibold text-gray-700 dark:text-gray-200">
          {{ page_title }}
        </h2>
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import Navigation from '@/components/Navigation'

export default {
  name: 'dashboard_layout',
  components: {
    Sidebar,
    Navigation
  },
  props:{
    showBack:{
      type: Boolean,
      default: false
    },
    page_title:{
      type:String,
      default:''
    }
  }

}
</script>
