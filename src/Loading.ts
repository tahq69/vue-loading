import Vue from "vue"
import Router from "vue-router"

import LoadingBar from "./components/LoadingBar"
import { log, progress, uuidv4 } from "./help"

import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ConfigureOptions,
  CripLoadingOptions,
  FailOptions,
  INotice,
  INoticeOptions,
  LoadingBarComponent,
  Options,
} from "./contracts"

type Response<T> = T | Promise<T>
type LoadingBarVue = LoadingBarComponent & Vue

let loadingBar: LoadingBarVue | null = null
let privateVue: typeof Vue | null = null

export default class Loading {
  public version = "__VERSION__"

  private completed = 0
  private total = 0

  private lastChange = Date.now()
  private options: Options
  private resetTimeout = 1000
  private requests: string[] = []

  constructor(vue: typeof Vue, options: Options) {
    privateVue = vue
    this.options = options
    this.intercept(this.options.axios)
    this.createInstance(vue)
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

  public fail(options?: FailOptions, axios?: boolean): void {
    if (this.total !== 0) {
      if (!axios) this.complete(options ? options.id : undefined)
      if (loadingBar) loadingBar.color = this.options.failColor
    }

    if (!options) return

    // Add crip notification if it is possible.
    this.notice(options.notice)
  }

  public canResetProgress() {
    const isTimeout = Date.now() - this.lastChange > this.resetTimeout
    const result =
      (this.width > 100 && isTimeout) ||
      (this.total > 0 && this.total === this.completed && isTimeout)

    if (result) {
      this.requests = []
      this.total = this.completed = 0
      if (loadingBar) {
        loadingBar.width = "0"
        loadingBar.color = this.options.color
      }
    }

    return result
  }

  public configure(options: ConfigureOptions) {
    if (loadingBar) loadingBar.configure(options)
    if (options.failColor) this.options.failColor = options.failColor
  }

  private intercept(axios?: AxiosInstance) {
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

  private pushRequest<T>(config: T, time = Date.now()): T {
    this.lastChange = time
    this.total++

    if (loadingBar) loadingBar.width = this.width.toString()

    return config
  }

  private pushResponse<T>(data: T, error = false, time = Date.now()): Response<T> {
    this.lastChange = time
    this.completed++

    // Ensure we do not overfit when to much responses received.
    if (this.completed > this.total) {
      log("warn", "Response count exceeds maximum count", {
        requests: this.total,
        responses: this.completed,
      })

      this.completed = this.total
    }

    if (loadingBar) loadingBar.width = this.width.toString()

    if (error) {
      this.fail(undefined, true)
      return Promise.reject(data)
    }

    return data
  }

  private createInstance(vue: typeof Vue) {
    const instance = LoadingBar(vue).$mount()
    document.body.appendChild(instance.$el)
    console.log(this.options)
    instance.init(this.options)
    loadingBar = instance
  }

  private notice(notice?: INoticeOptions) {
    if (!privateVue || !notice) return
    if (!privateVue.notice) return

    privateVue.notice.error(notice)
  }
}
