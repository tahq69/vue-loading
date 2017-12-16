import Vue from "vue"
import Router from "vue-router"

import { CripLoadingOptions, INoticeOptions, Options } from "./contracts"
import { log } from "./help"
import Loading from "./Loading"
import mixin from "./mixin"

let installed = false

export default function install(vue: typeof Vue, options?: CripLoadingOptions) {
  if (installed) return
  if (!options) throw new Error("Options with axios instance is required")

  installed = true

  const defaults: Options = {
    applyOnRouter: true,
    axios: options.axios,
    color: "#204d74",
    direction: "right",
    failColor: "#ac2925",
    height: "2px",
    verbose: false,
  }

  const settings = Object.assign({}, defaults, options)

  if (settings.verbose) {
    // tslint:disable-next-line:whitespace
    ;(window as any).__cripVerbose = true
  }

  log("debug", "install", { options, settings })

  const loading = new Loading(vue, settings)

  vue.loading = loading
  vue.prototype.$loading = loading

  mixin({ loading, options: settings, vue })
}

export { CripLoadingOptions } from "./contracts"

// Install component if is in browser and Vue instance is already available.
// This is useful for non bundle usage - if developer adds this packages bundle
// as script tag in markup.
if (typeof window !== "undefined" && (window as any).Vue && (window as any).axios) {
  // tslint:disable-next-line:whitespace
  ;(window as any).Vue.use(install, { axios: (window as any).axios })
}
