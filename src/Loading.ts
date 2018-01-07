import Vue from "vue"

import LoadingBar from "./components/LoadingBar.vue"
import { log, progress, uuidv4 } from "./help"

import {
  AxiosInstance,
  IConfigureLoadingOptions,
  ILoadingFailOptions,
  INoticeOptions,
  LoadingBarComponent,
  Options,
} from "./types"

type Response<T> = T | Promise<T>
type LoadingBarInstance = LoadingBarComponent & Vue

let loadingBar: LoadingBarInstance | null = null
let privateVue: typeof Vue | null = null

export default class Loading {
  public static version = "__VERSION__"

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
    log("debug", "start()", { id })
    const uuid = id || uuidv4()
    this.requests.push(uuid)
    this.pushRequest(uuid)

    return uuid
  }

  public complete(id?: string): void {
    log("debug", "complete()", { id })
    if (!id || this.requests.indexOf(id) === -1) {
      log("warn", `Crip loading element '${id}' not found to complete.`)
      this.requests.shift()
      this.pushResponse(id || -1)
      return
    }

    const index = this.requests.indexOf(id)
    const [removed] = this.requests.splice(index, 1)
    this.pushResponse(removed)
  }

  public fail(options?: ILoadingFailOptions, axios?: boolean): void {
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

  public configure(options: IConfigureLoadingOptions) {
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
    log("log", "pushRequest()", { config, time, url: (config as any).url })

    this.lastChange = time
    this.total++

    if (loadingBar) loadingBar.width = this.width.toString()

    return config
  }

  private pushResponse<T>(data: T, error = false, time = Date.now()): Response<T> {
    log("log", "pushResponse()", { data, error, time })

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
    const instance = new vue({ render: h => h(LoadingBar) })
    const component = instance.$mount()

    document.body.appendChild(component.$el)
    log("debug", this.options)

    const ref: LoadingBarInstance = instance.$children[0] as any

    ref.init(this.options)
    loadingBar = ref
  }

  private notice(notice?: INoticeOptions) {
    if (!privateVue || !notice) return
    if (!privateVue.notice) return

    privateVue.notice.error(notice)
  }
}
