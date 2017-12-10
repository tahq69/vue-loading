import axios from "axios"
import Vue from "vue"

import loading, { ICripLoadingOptions } from "./../main"
import App from "./Example.vue"

Vue.use<ICripLoadingOptions>(loading, {
  axios,
  color: "rgba(88, 91, 169, 1)",
  height: "3px",
})

import router from "./router"

const app = new Vue({
  router,
  render: h => h(App),
})

app.$mount(document.getElementById("app"))
