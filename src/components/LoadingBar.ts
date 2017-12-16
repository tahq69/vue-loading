import Vue, { VNode } from "vue"

import { ConfigureOptions, Options } from "./../contracts"

export default function(vue: typeof Vue) {
  return new vue({
    name: "CripLoadingBar",

    render(h): VNode {
      if (this.visible) {
        return h("div", {
          class: {
            "crip-loading": true,
            [`crip-loading--to-${this.direction}`]: true,
          },
          style: {
            width: this.progress,
            background: this.color,
            height: this.height,
          },
        })
      }

      return h("div")
    },

    computed: {
      /**
       * Calculate current progress of the loading.
       * @return {string}
       */
      progress(): string {
        return `${this.width || 0}%`
      },
    },

    data() {
      return {
        color: "",
        direction: "",
        height: "",
        visible: false,
        width: "",
      }
    },

    methods: {
      /**
       * Check progress status and if it is outdated, reset it to 0.
       */
      recheck() {
        if (this.$loading.canResetProgress()) {
          this.visible = false
          setTimeout(() => (this.visible = true), 100)
        }
      },

      init(data: Options) {
        this.color = data.color
        this.direction = data.direction
        this.height = data.height
        this.visible = true
      },

      configure(options: ConfigureOptions) {
        if (options.color) this.color = options.color
        if (options.direction) this.direction = options.direction
        if (options.height) this.height = options.height
      },
    },

    /**
     * Registers recheck of progress in axios loading.
     */
    created() {
      setInterval(this.recheck, 250)
    },
  })
}
