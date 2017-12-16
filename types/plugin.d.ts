import Vue from "vue"
import Router from "vue-router"
import { AxiosInstance } from "axios"

export interface PluginOptions {
  axios: AxiosInstance

  applyOnRouter?: boolean
  color?: string
  direction?: string
  failColor?: string
  height?: string
  verbose?: boolean
}

export const Plugin: (vue: typeof Vue, options?: PluginOptions) => void
