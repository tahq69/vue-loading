import Vue from "vue"
import Router from "vue-router"

import { ICripLoadingOptions, IFailOptions, INoticeOptions } from "./contracts"
import Loading from "./Loading"
import mixin from "./mixin"

let installed = false

export { ICripLoadingOptions } from "./contracts"

export default function install(vue: typeof Vue, options?: ICripLoadingOptions) {
  if (installed) return
  installed = true

  console.log(1, options)

  const defaults: ICripLoadingOptions = {
    applyOnRouter: true,
    color: "#204d74",
    direction: "right",
    failColor: "#ac2925",
    height: "2px",
    width: 0,
  }

  const settings = Object.assign({}, defaults, options)

  console.log(2, settings)

  const loading = new Loading(vue, settings)

  Object.defineProperty(vue.prototype, "$loading", { get: () => loading })
  mixin({ loading, options: settings, vue })
}
