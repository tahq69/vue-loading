import Vue from "vue"
import { RawLocation, Route } from "vue-router"

import { MixinOptions } from "./contracts"
import { uuidv4 } from "./help"

type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

export default function init(settings: MixinOptions) {
  if (!settings.options.applyOnRouter) return

  settings.vue.mixin({
    beforeCreate() {
      if (!this.$options.router) return

      this.$options.router.beforeEach((to: Route, from: Route, next: Next) => {
        settings.loading.start(uuidv4())
        next()
      })

      this.$options.router.afterEach((to: Route, from: Route) => {
        settings.loading.complete()
      })
    },
  })
}
