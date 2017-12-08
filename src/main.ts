import { INoticeOptions } from "crip-vue-notice"
import Vue from "vue"
import Router from "vue-router"

import LoadingBar from "./LoadingBar.vue"

export interface ICripLoadingOption {
  axios?: any
  router?: Router
}

class CripLoading {
  private router?: Router
  private axios?: any

  constructor(vue: typeof Vue, options?: ICripLoadingOption) {
    // TODO: we need to try get router from vue instance instead of options
    // parameters.
    if (!options) return

    this.axios = options.axios
    this.router = options.router
  }

  public start(id?: string): string {
    return ""
  }

  public complete(id): void {
    return
  }

  public fail(notice?: INoticeOptions): void {
    return
  }
}

export default function install(vue: typeof Vue, options?: ICripLoadingOption) {
  const cripLoading = new CripLoading(vue, options)
  vue.component("CripLoading", LoadingBar)

  Object.defineProperties(vue.prototype, {
    $loading: { get: () => cripLoading },
  })
}
