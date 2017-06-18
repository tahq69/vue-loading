<template>
  <div
      class="crip-loading"
      :style="{width: progress, background: color}"
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
    },

    computed: {
      /**
       * Calculate current progress of the loading.
       * @return {string}
       */
      progress () {
        return `${this.width || 0}%`
      },

      width () {
        return this.total / this.inProgress / 2 * 100
      }
    },

    data () {
      return {
        total: 0,
        inProgress: 0
      }
    },

    methods: {
      pushRequest (params, time = Date.now()) {
        this.$emit('crip-request', time)
        this.total++
        this.inProgress++
        return params
      },

      pushResponse (params, time = Date.now()) {
        this.$emit('crip-response', time)
        this.inProgress--
        this.total--
        return params
      },
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
