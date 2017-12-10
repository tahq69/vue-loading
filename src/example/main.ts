import axios from "axios"
import Vue from "vue"

import CripLoading, { ICripLoadingOptions } from "./../main"
import App from "./Example.vue"

Vue.use<ICripLoadingOptions>(CripLoading, {
  axios,
  color: "rgba(88, 91, 169, 1)",
  height: "3px",
  verbose: true,
})

import router from "./router"

const app = new Vue({
  router,
  render: h => h(App),
})

app.$mount(document.getElementById("app"))
