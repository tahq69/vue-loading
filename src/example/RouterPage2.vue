<template>
  <div id="page2">Page 2</div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Page2",

  created() {
    console.log(this.$options.name)
  },
})
</script>

