import Loading from "./loading"

declare module "vue/types/vue" {
  interface Vue {
    $loading: Loading
  }

  interface VueConstructor {
    loading: Loading
  }
}
