import Vue from "vue"
import Router from "vue-router"

export interface IPluginOption {
  axios: any
  router: Router
}

export const Plugin: (vue: typeof Vue, options?: IPluginOption) => void
