import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: () => import("./RouterPage1.vue") },
    { path: "/1", component: () => import("./RouterPage1.vue") },
    { path: "/2", component: () => import("./RouterPage2.vue") },
    { path: "*", redirect: "/" },
  ],
})
