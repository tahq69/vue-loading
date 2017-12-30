<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CodeSample",

  mounted() {
    const w = window as any
    // tslint:disable-next-line:whitespace
    w.PR.prettyPrint()
  },
})
</script>

<template>
  <div>
    <hr>
    <pre class="prettyprint earthsong lang-js">
      <slot />
    </pre>
  </div>
</template>
