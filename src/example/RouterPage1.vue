<template>
  <div id="page1">Page 1</div>
</template>

<script lang="ts">
export default {
  name: "Page1",

  created() {
    console.log(this.$options.name)
  },
}
</script>

