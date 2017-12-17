import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import RouterPage1 from "./RouterPage1.vue"
import RouterPage2 from "./RouterPage2.vue"

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: RouterPage1 },
    { path: "/1", component: RouterPage1 },
    { path: "/2", component: RouterPage2 },
    { path: "*", redirect: "/" },
  ],
})
