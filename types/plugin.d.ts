import Vue from "vue"
import Router from "vue-router"
import { AxiosInstance } from "axios"

export interface ILoadingOptions {
  axios: AxiosInstance

  applyOnRouter?: boolean
  color?: string
  direction?: "left" | "right"
  failColor?: string
  height?: string
  verbose?: boolean
  logLevel?: "debug" | "log" | "warn" | "error"
}

export const Plugin: (vue: typeof Vue, options?: ILoadingOptions) => void
