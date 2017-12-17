import axios from "axios"
import Vue from "vue"

import "./assets/styles.scss"

import CripLoading from "@/main"
import App from "./components/Docs.vue"

Vue.use(CripLoading, {
  axios,
  color: "#fff",
  height: "5px",
  verbose: true,
})

import router from "./router"

const app = new Vue({
  render: h => h(App),
  router,
})

app.$mount(document.getElementById("app") || undefined)
