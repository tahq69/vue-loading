import { INoticeOptions } from "crip-vue-notice"

export default interface Loading {
  start(id?: string): string
  complete(id?: string): void
  fail(options?: { id?: string; notice?: INoticeOptions }): void
}
