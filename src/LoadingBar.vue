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

      width () {
        return 100 / this.total * ((this.completed + this.progress) / 2)
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
      pushRequest (params, time = Date.now()) {
        this.$emit('crip-request', time)
        this.lastChange = time
        this.total++
        this.progress++
        return params
      },

      pushResponse (params, time = Date.now()) {
        this.lastChange = time
        this.$emit('crip-response', time)
        this.completed++
        return params
      },

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
    transition: $transition;
    position: fixed;
    top: 0;
    background: rgba(88, 91, 169, 1);
    height: 3px;
    opacity: 1;

    &--to-right, &--to-right .crip-progress {
      left: 0;
    }

    &--to-left, &--to-left .crip-progress {
      right: 0;
    }
  }
</style>
