<script lang="ts">
import Vue from "vue"

import DefaultUsage from "./DefaultUsage.vue"

export default Vue.extend({
  name: "CripDocs",

  components: { DefaultUsage },
})
</script>

<template>
  <div class="container root">
    <div class="row">
      <div class="col-sm-8">
        <default-usage id="default-usage" />
      </div>
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading" id="default-usage">Examples</div>
          <div class="panel-body">
            <ul class="list-group">
              <li class="list-group-item"><a href="#default-usage">Default usage</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.root.container {
  margin-top: 101px;
}
</style>

