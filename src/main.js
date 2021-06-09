import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import "@/assets/styles/tailwind.css";
import store from './store'
// import 'es6-promise/auto'
// import api from './api'

// Vue.prototype.$http = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
