import Vue from "vue"
import Loading from "./Loading"

declare module "vue/types/vue" {
  interface Vue {
    $loading: Loading
  }

  interface VueConstructor {
    loading: Loading
  }
}
