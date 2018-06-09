<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Section",

  props: {
    title: { type: String, required: true },
  },
})
</script>

<template>
  <div class="card border-primary">
    <div class="card-header bg-primary text-white">{{ title }}</div>
    <div class="card-body">
      <slot>
        <!-- default slot -->
      </slot>
    </div>
  </div>
</template>
