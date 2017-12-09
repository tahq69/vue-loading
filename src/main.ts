import { INoticeOptions } from "crip-vue-notice"
import Vue from "vue"
import Router from "vue-router"

import { progress, uuidv4 } from "./help"
import LoadingBar from "./LoadingBar.vue"

export interface ICripLoadingOption {
  axios?: any
  color: string
  direction: string
  failColor: string
  router?: Router
}

export interface IFailOptions {
  axios?: boolean
  id?: string
  notice?: INoticeOptions
}

let loadingBar = null

class CripLoading {
  private completed = 0
  private total = 0

  private lastChange = Date.now()
  private options: ICripLoadingOption
  private resetTimeout = 1000
  private router?: Router
  private requests: string[] = []

  constructor(vue: typeof Vue, options?: ICripLoadingOption) {
    // TODO: we need to try get router from vue instance instead of options
    // parameters.
    const defaults = {
      color: "#204d74",
      direction: "right",
      failColor: "#ac2925",
      width: 0,
    }

    this.options = Object.assign({}, defaults, options)

    this.intercept(this.options.axios)
    this.router = this.options.router

    const instance = new Vue({
      data: this.options,
      render: h => h(LoadingBar),
    }).$mount()
    document.body.appendChild(instance.$el)
    loadingBar = instance.$children[0]
  }

  /**
   * Overall width of the progress bar.
   * @return {number}
   */
  public get width() {
    return progress(this.total, this.completed)
  }

  public start(id?: string): string {
    const uuid = id || uuidv4()
    this.requests.push(uuid)
    this.pushRequest(uuid)

    return uuid
  }

  public complete(id?: string): void {
    if (!id) {
      this.requests.shift()
      this.pushResponse(-1)
      return
    }

    if (this.requests.indexOf(id) > -1) {
      const index = this.requests.indexOf(id)
      this.requests.splice(index, 1)
      this.pushResponse(index)
    }

    throw Error(`Crip loading element ${id} not found to complete.`)
  }

  public fail(x?: IFailOptions): void {
    if (!x || !x.axios) this.complete(x ? x.id : undefined)
    loadingBar.color = this.options.failColor
  }

  public canResetProgress() {
    const isTimeout = Date.now() - this.lastChange > this.resetTimeout
    const result =
      (this.width > 100 && isTimeout) ||
      (this.total > 0 && this.total === this.completed && isTimeout)

    if (result) {
      this.requests = []
      this.total = this.completed = 0
      loadingBar.width = 0
      loadingBar.color = this.options.color
    }

    return result
  }

  private intercept(axios?) {
    if (!axios) return

    axios.interceptors.request.use(
      config => this.pushRequest(config),
      err => this.pushResponse(err, true)
    )

    axios.interceptors.response.use(
      config => this.pushResponse(config),
      err => this.pushResponse(err, true)
    )
  }

  private pushRequest(config, time = Date.now()) {
    this.lastChange = time
    this.total++

    loadingBar.width = this.width

    return config
  }

  private pushResponse(data, error = false, time = Date.now()) {
    this.lastChange = time
    this.completed++

    loadingBar.width = this.width

    if (error) {
      this.fail({ axios: true })
      return Promise.reject(data)
    }

    return data
  }
}

export default function install(vue: typeof Vue, options?: ICripLoadingOption) {
  const cripLoading = new CripLoading(vue, options)
  vue.component("CripLoading", LoadingBar)

  Object.defineProperties(vue.prototype, {
    $loading: { get: () => cripLoading },
  })
}
