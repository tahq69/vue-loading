<template>
  <div
      class="crip-loading"
      v-if="visible"
      :style="{width: progress, background: color}"
      :class="[`crip-loading--to-${direction}`]"
  ></div>
</template>

<script lang="ts">
export default {
  name: "CripLoadingBar",

  computed: {
    /**
     * Calculate current progress of the loading.
     * @return {string}
     */
    progress() {
      return `${this.width || 0}%`
    },
  },

  data() {
    return {
      color: "",
      direction: "",
      visible: true,
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
  },

  /**
   * Registers recheck of progress in axios loading.
   */
  created() {
    setInterval(this.recheck, 250)
  },
}
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
