import Vue from "vue"
import Router from "vue-router"
import { AxiosInstance } from "axios"

export interface PluginOption {
  axios: AxiosInstance
}

export const Plugin: (vue: typeof Vue, options?: PluginOption) => void
