import { INoticeOptions } from "crip-vue-notice"

export default interface ILoading {
  start(id?: string): string
  complete(id?: string): void
  fail(notice?: INoticeOptions): void
}
