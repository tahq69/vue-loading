import Vue from "vue"
import Router from "vue-router"

import { ICripLoadingOptions, IFailOptions, INoticeOptions } from "./contracts"
import { log, progress, uuidv4 } from "./help"
import LoadingBar from "./LoadingBar.vue"

let loadingBar = null
let private_vue = null

export default class Loading {
  private completed = 0
  private total = 0

  private lastChange = Date.now()
  private options: ICripLoadingOptions
  private resetTimeout = 1000
  private router?: Router
  private requests: string[] = []

  constructor(vue: typeof Vue, options?: ICripLoadingOptions) {
    private_vue = vue
    this.options = options
    this.intercept(this.options.axios)
    this.router = this.options.router

    const instance = new vue({ render: h => h(LoadingBar) }).$mount()
    document.body.appendChild(instance.$el)
    loadingBar = instance.$children[0]
    loadingBar.init(this.options)
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

  public complete(id?: string, initial?: boolean): void {
    if (initial) return

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

  public fail(x?: IFailOptions, axios?: boolean): void {
    if (this.total !== 0) {
      if (!axios) this.complete(x ? x.id : undefined)
      loadingBar.color = this.options.failColor
    }

    // Add crip notification if it is possible.
    const notice = private_vue.$notice || private_vue.notice
    if (notice && x && x.notice) {
      notice.error(x.notice)
    }

    if (!notice && x && x.notice) {
      log(
        "warn",
        "Notifications available only when installed vue-notice: " +
          "https://github.com/tahq69/vue-notice#install"
      )
    }
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

    // Ensure we do not overfit when to much responses received.
    if (this.completed > this.total) {
      log("warn", "Response count exceeds maximum count", {
        requests: this.total,
        responses: this.completed,
      })

      this.completed = this.total
    }

    loadingBar.width = this.width

    if (error) {
      this.fail(undefined, true)
      return Promise.reject(data)
    }

    return data
  }
}
