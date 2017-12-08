import LoadingBar from './LoadingBar.vue'

export default {
  install(Vue, options) {
    Vue.component('crip-loading', LoadingBar)
    Vue.prototype.$cripLoading = options
  }
}
