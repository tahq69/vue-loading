<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "CodeSample",

  mounted() {
    // tslint:disable-next-line:whitespace
    ;(window as any).PR.prettyPrint()
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
