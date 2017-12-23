<script lang="ts">
import Vue from "vue"

import Configurations from "./Configurations.vue"
import DefaultUsage from "./DefaultUsage.vue"

export default Vue.extend({
  name: "CripDocs",

  components: { DefaultUsage, Configurations },
})
</script>

<template>
  <div class="container root">
    <div class="row">
      <div class="col-sm-8">
        <router-view />
      </div>
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading"
               id="default-usage">
            Documentation
          </div>
          <div class="panel-body sidebar">
            <ul class="list-group">
              <li class="list-group-item">
                <router-link :to="{name: 'root'}">Default usage</router-link>
              </li>
              <li class="list-group-item">
                <router-link :to="{name: 'configurations'}">Configurations</router-link>
              </li>
              <li class="list-group-item">
                <router-link :to="{name: 'manual'}">Manual actions</router-link>
              </li>
              <li class="list-group-item">
                <router-link :to="{name: 'notice'}">Notifications</router-link>
              </li>
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

.sidebar {
  padding: 0;

  .list-group {
    margin: 0;
  }
}
</style>
