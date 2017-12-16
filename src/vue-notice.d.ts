import { INotice } from "crip-vue-notice"

declare module "vue/types/vue" {
  interface Vue {
    $notice: INotice
  }

  interface VueConstructor {
    notice: INotice
  }
}
