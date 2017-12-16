import Vue from "vue"
import Router from "vue-router"

import "./assets/styles.scss"
import { CripLoadingOptions, INoticeOptions, Options } from "./contracts"
import { log, setVerbose } from "./help"
import Loading from "./Loading"
import mixin from "./mixin"

let installed = false
let privateVue: any

export default function install(vue: typeof Vue, options?: CripLoadingOptions) {
  console.log({ vue, options })
  if (installed && privateVue === vue) return
  if (!options) throw new Error("Options with axios instance is required")

  installed = true
  privateVue = vue

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
    setVerbose()
  }

  log("debug", "install", { options, settings })

  const loading = new Loading(vue, settings)

  vue.loading = loading
  vue.prototype.$loading = loading

  mixin({ loading, options: settings, vue })
}

export { CripLoadingOptions } from "./contracts"
