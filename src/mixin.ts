import Vue from "vue"

import { log, uuidv4 } from "./help"
import { Next, Options, Route } from "./types"

export default function init(options: Options) {
  if (!options.applyOnRouter) return

  Vue.mixin({
    beforeCreate() {
      if (!this.$options.router) return

      this.$options.router.beforeResolve((to: Route, from: Route, next: Next) => {
        const id = to.fullPath
        log("debug", "router.beforeResolve()", { id, to, from })
        this.$loading.start(id)
        next()
      })

      this.$options.router.afterEach((to: Route, from: Route) => {
        const id = to.fullPath
        log("debug", "router.afterEach()", { id, to, from })
        this.$loading.complete(id)
      })
    },
  })
}
