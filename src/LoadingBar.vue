<template>
  <div
    class="crip-loading"
    v-if="visible"
    :style="{width: progress, background: color, height}"
    :class="[`crip-loading--to-${direction}`]"
  ></div>
</template>

<script lang="ts">
import Vue from "vue"

import { CripLoadingOptions, Options } from "./contracts"

export default Vue.extend({
  name: "CripLoadingBar",

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

    configure(options: CripLoadingOptions) {
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
</script>

<style lang="scss">
$transition: all 0.9s ease;

.crip-loading {
  background: rgba(88, 91, 169, 1);
  height: 3px;
  opacity: 1;
  position: fixed;
  top: 0;
  transition: $transition;
  z-index: 1101; // on top of the bootstrap elements

  &--to-right {
    left: 0;
  }

  &--to-left {
    right: 0;
  }
}
</style>
