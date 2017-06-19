<template>
  <div
      class="crip-loading"
      v-if="visible"
      :style="{width: progressWidth, background: color}"
      :class="[`crip-loading--to-${direction}`]"
  ></div>
</template>

<script>
  export default {
    props: {
      /**
       * The direction of the loading bar.
       * @type {{type: (String), default: (function(): string)}}
       */
      direction: {type: String, default: () => 'right'},
      /**
       * The color of the loading bar.
       * @type {{type: String, default: (function(): string)}}
       */
      color: {type: String, default: () => `rgba(88, 91, 169, 1)`},
    },

    /**
     * Registers interceptors in to axios instance.
     */
    created () {
      this.$cripLoading.axios.interceptors.request.use(
        config => this.pushRequest(config),
        err => this.pushResponse(err)
      )

      this.$cripLoading.axios.interceptors.response.use(
        config => this.pushResponse(config),
        err => this.pushResponse(err)
      )

      setInterval(this.recheck, 250)
    },

    computed: {
      /**
       * Calculate current progress of the loading.
       * @return {string}
       */
      progressWidth () {
        return `${this.width || 0}%`
      },

      /**
       * Overall width of the progress bar.
       * @return {number}
       */
      width () {
        return this.left + this.right
      },

      /**
       * Portion of started progress.
       * More requests are started, less progress of initial is set.
       * @return {number}
       */
      left () {
        if (this.total === 0) {
          return 0
        }

        return 100 / (this.total * 2)
      },

      /**
       * Portion of completed, where one completed takes same as all of started.
       * @return {number}
       */
      right () {
        if (this.left === 0) {
          return 0
        }

        return ((100 - this.left) * this.completed) / this.total
      }
    },

    data () {
      return {
        lastChange: Date.now(),
        total: 0,
        progress: 0,
        completed: 0,
        visible: true,
      }
    },

    methods: {
      /**
       * Add a request and increase total & progress
       * @param {*} config
       * @param {number} time
       * @return {*}
       */
      pushRequest (config, time = Date.now()) {
        this.$emit('crip-request', time)
        this.lastChange = time
        this.total++
        this.progress++
        return config
      },

      /**
       * Add a response and increase completed requests count.
       * @param {*} err
       * @param {number} time
       * @return {*}
       */
      pushResponse (err, time = Date.now()) {
        this.lastChange = time
        this.$emit('crip-response', time)
        this.completed++
        return err
      },

      /**
       * Check progress status and if it is outdated, reset it to 0.
       */
      recheck () {
        if (this.canResetProgress()) {
          this.visible = false
          this.total = this.progress = this.completed = 0
          setTimeout(() => this.visible = true, 100)
        }
      },

      /**
       * All request completed and from last change has passed one second.
       * @return {boolean}
       */
      canResetProgress () {
        return this.total > 0 &&
          this.progress === this.completed &&
          (Date.now() - this.lastChange) > 1000
      }
    },
  }
</script>

<style lang="scss">
  $transition: all .9s ease;

  .crip-loading {
    background: rgba(88, 91, 169, 1);
    height: 3px;
    opacity: 1;
    position: fixed;
    top: 0;
    transition: $transition;
    z-index: 1001; // on top of the bootstrap fixed nav

    &--to-right {
      left: 0;
    }

    &--to-left {
      right: 0;
    }
  }
</style>
