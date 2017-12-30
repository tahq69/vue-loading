import Vue from "vue"

import { uuidv4 } from "./help"
import { Next, Options, Route } from "./types"

export default function init(options: Options) {
  if (!options.applyOnRouter) return

  Vue.mixin({
    beforeCreate() {
      if (!this.$options.router) return

      this.$options.router.beforeEach((to: Route, from: Route, next: Next) => {
        this.$loading.start(uuidv4())
        next()
      })

      this.$options.router.afterEach((to: Route, from: Route) => {
        this.$loading.complete()
      })
    },
  })
}
