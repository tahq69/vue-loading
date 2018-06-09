import axios from "axios"
import Vue from "vue"

import CripLoading from "@/main"
import App from "./components/Docs.vue"

Vue.use(CripLoading, {
  axios,
  color: "#fff",
  height: "5px",
  logLevel: "debug",
  verbose: true,
})

import router from "./router"

const app = new Vue({
  render: h => h(App),
  router,
})

app.$mount(document.getElementById("app") || undefined)
