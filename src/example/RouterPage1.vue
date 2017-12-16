<template>
  <div id="page1">Page 1</div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Page1",

  created() {
    console.log(this.$options.name)
  },
})
</script>

