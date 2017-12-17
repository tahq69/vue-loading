import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import Configurations from "./components/Configurations.vue"
import DefaultUsage from "./components/DefaultUsage.vue"
import ManualActions from "./components/ManualActions.vue"
import Notifications from "./components/Notifications.vue"

const router = new Router({
  routes: [
    { path: "/", name: "root", component: DefaultUsage },
    { path: "/configurations", name: "configurations", component: Configurations },
    { path: "/manual", name: "manual", component: ManualActions },
    { path: "/notice", name: "notice", component: Notifications },
    { path: "*", redirect: "/" },
  ],
})

export default router
