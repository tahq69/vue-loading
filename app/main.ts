import axios from "axios"
import Vue from "vue"

import CripLoading, { CripLoadingOptions } from "./../main"
import App from "./Example.vue"

Vue.use<CripLoadingOptions>(CripLoading, {
  axios,
  color: "rgba(88, 91, 169, 1)",
  height: "3px",
  verbose: true,
})

import router from "./router"

const app = new Vue({
  render: h => h(App),
  router,
})

app.$mount(document.getElementById("app") || undefined)
