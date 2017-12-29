import { INoticeOptions } from "crip-vue-notice"

export interface Options {
  color?: string
  direction?: string
  failColor?: string
  height?: string
}

export default interface Loading {
  configure(options: Options): void
  start(id?: string): string
  complete(id?: string): void
  fail(options?: { id?: string; notice?: INoticeOptions }): void

  canResetProgress(): void
}
