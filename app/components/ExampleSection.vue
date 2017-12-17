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
  <div class="panel panel-primary">
    <div class="panel-heading">{{ title }}</div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>
