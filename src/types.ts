import { AxiosInstance } from "axios"
import { INoticeOptions } from "crip-vue-notice"
import Vue from "vue"
import Router, { RawLocation } from "vue-router"

import { ILoadingOptions } from "$/index"
import Loading, { IConfigureLoadingOptions, ILoadingFailOptions } from "$/loading"

export { INotice, INoticeOptions } from "crip-vue-notice"
export { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
export { Route } from "vue-router"
export { ILoadingOptions } from "$/index"
export { IConfigureLoadingOptions, ILoadingFailOptions } from "$/loading"

export type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

export interface Options {
  axios: AxiosInstance

  applyOnRouter: boolean
  color: string
  direction: "left" | "right"
  failColor: string
  height: string
  verbose: boolean
  logLevel: "debug" | "log" | "warn" | "error"
}

export interface LoadingBarComponent {
  color: string
  direction: "left" | "right"
  height: string
  visible: boolean
  width: string

  init: (data: Options) => void
  configure: (data: IConfigureLoadingOptions) => void
}
