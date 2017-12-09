import axios from "axios"
import Vue from "vue"

import loading from "./../main"
import App from "./Example.vue"

Vue.use(loading, { axios, color: "rgba(88, 91, 169, 1)" })

const app = new Vue({
  render: h => h(App),
})

app.$mount(document.getElementById("app"))
