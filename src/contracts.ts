import { AxiosInstance } from "axios"
import { INoticeOptions } from "crip-vue-notice"
import Vue from "vue"
import Router from "vue-router"

export { INotice, INoticeOptions } from "crip-vue-notice"
export { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

export interface CripLoadingOptions {
  axios: AxiosInstance

  applyOnRouter?: boolean
  color?: string
  direction?: string
  failColor?: string
  height?: string
  verbose?: boolean
}

export interface Options {
  axios: AxiosInstance

  applyOnRouter: boolean
  color: string
  direction: string
  failColor: string
  height: string
  verbose: boolean
}

export interface FailOptions {
  id?: string
  notice?: INoticeOptions
}

export interface LoadingBarComponent {
  color: string
  direction: string
  height: string
  visible: boolean
  width: string

  init: (data: Options) => void
}

export interface ILoading {
  start(id?: string): string
  complete(id?: string, initial?: boolean): void
  fail(options?: { id?: string; notice?: INoticeOptions }): void

  canResetProgress(): boolean
}

export interface MixinOptions {
  vue: typeof Vue
  options: CripLoadingOptions
  loading: ILoading
}
