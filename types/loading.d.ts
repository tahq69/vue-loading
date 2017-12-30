import { INoticeOptions } from "crip-vue-notice"

export interface IConfigureLoadingOptions {
  color?: string
  direction?: "left" | "right"
  failColor?: string
  height?: string
}

export interface ILoadingFailOptions {
  id?: string
  notice?: INoticeOptions
}

export default interface Loading {
  configure(options: IConfigureLoadingOptions): void
  start(id?: string): string
  complete(id?: string): void
  fail(options?: ILoadingFailOptions): void

  canResetProgress(): void
}
