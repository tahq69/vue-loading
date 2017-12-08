import ILoading from "./loading"

declare module "vue/types/vue" {
  interface Vue {
    $loading: ILoading
  }
}
