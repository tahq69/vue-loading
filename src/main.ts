import Vue from "vue"

import { log, setVerbose } from "./help"
import Loading from "./Loading"
import mixin from "./mixin"
import { ILoadingOptions, INoticeOptions, Options } from "./types"

let installed = false
let privateVue: any

export default function install(vue: typeof Vue, options?: ILoadingOptions) {
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
    logLevel: "error",
    verbose: true,
  }

  const settings = Object.assign({}, defaults, options)

  if (settings.verbose) setVerbose(settings.logLevel)

  log("debug", "install", { options, settings })

  const loading = new Loading(vue, settings)

  vue.loading = loading
  vue.prototype.$loading = loading

  mixin(settings)
}

export { ILoadingOptions } from "./types"
