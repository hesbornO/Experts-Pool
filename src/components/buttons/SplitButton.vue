<template>
  <div class="relative">
    <div class="w-full bg-white dark:bg-gray-800 dark:border-gray-700 flex justify-between border border-primary-300 rounded cursor-pointer" data-menu>
      <router-link :to="primary.to" tabindex="0" custom class="text-primary-600 flex-1 cursor-pointer hover:bg-blue-100 truncate hover:text-blue-500 rounded-l tracking-normal text-normal leading-3 py-2 px-2 flex items-center">
        <span v-if="primary.icon" v-html="primary.icon"></span>
        <span class="ml-2">
          {{ primary.label }}
        </span>
      </router-link>
      <div v-click-outside="onClose" @click="showPopup = !showPopup" class="bg-white text-primary-600 items-center flex rounded-r border-primary-300 border-l hover:bg-blue-100 hover:text-blue-500">
        <div class="cursor-pointer   mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <transition appear @beforeEnter="beforeEnter" @enter="enter" :css="false">
              <polyline points="6 15 12 9 18 15" v-if="showPopup" />
              <polyline points="6 9 12 15 18 9" v-else />
            </transition>
          </svg>
        </div>
      </div>
    </div>
    <transition appear @beforeEnter="beforeEnter" @enter="enter" :css="false">
      <ul v-show="showPopup" class="z-50 bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-full absolute">
        <li v-for="(link, i) in optional" :key="i">
          <hr v-if="link.divider" class="border-gray-200 dark:border-gray-700 my-1" />
          <router-link v-else :to="link.to" custom class="transition cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-blue-100 hover:text-blue-500 px-3 flex items-center">
            <span v-if="link.icon" v-html="link.icon"></span>
            <span class="ml-2 font-normal">{{ link.label }}</span>
          </router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import gsap from "gsap";
import ClickOutside from "vue-click-outside";
export default {
  name: "SplitButton",
  mounted() {
    //this.main();
  },
  props: {
    primary: { type: Object },
    optional: { type: Array },
  },
  directives: {
    ClickOutside,
  },
  data: () => ({ showPopup: false }),
  methods: {
    beforeEnter(el) {
      el.style.opacity = 1;
      // el.style.height = 1;
    },
    enter(el, done) {
      gsap.from(el, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.easeOut",
        onComplete: done,
      });
    },
    onClose() {
      this.showPopup = false;
    },
  },
};
</script>
