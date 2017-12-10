import { INoticeOptions } from "crip-vue-notice"

export { INoticeOptions } from "crip-vue-notice"

export interface ICripLoadingOptions {
  applyOnRouter?: boolean
  axios?: any
  color?: string
  direction?: string
  failColor?: string
  height?: string
  verbose?: boolean

  [key: string]: any
}

export interface IFailOptions {
  id?: string
  notice?: INoticeOptions
}
