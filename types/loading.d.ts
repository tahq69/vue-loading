import { INoticeOptions } from "crip-vue-notice"

export default interface ILoading {
  start(id?: string): string
  complete(id): void
  fail(notice?: INoticeOptions): void
}
