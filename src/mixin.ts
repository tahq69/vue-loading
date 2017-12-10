import Vue from "vue"

import { ICripLoadingOptions } from "./contracts"
import { uuidv4 } from "./help"
import Loading from "./Loading"

interface IMixinOptions {
  vue: typeof Vue
  options: ICripLoadingOptions
  loading: Loading
}

export default function init(settings: IMixinOptions) {
  if (!settings.options.applyOnRouter) return

  settings.vue.mixin({
    beforeCreate() {
      const router = settings.options.router || this.$options.router
      if (!router) return

      router.beforeEach((to, from, next) => {
        settings.loading.start(uuidv4())
        next()
      })

      router.afterEach((to, from) => {
        settings.loading.complete()
      })
    },
  })
}
