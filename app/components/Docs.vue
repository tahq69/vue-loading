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
  <div class="container mt-3">
    <div class="row">
      <div class="order-md-2 col-md-4">
        <div class="card border-primary">
          <div class="card-header bg-primary text-white">
            Documentation
          </div>
          <ul class="list-group list-group-flush">
            <router-link tag="li"
                         :to="{ name: 'root' }"
                         class="list-group-item"
                         active-class="active"
                         exact>
              <a>Default usage</a>
            </router-link>
            <router-link tag="li"
                         :to="{ name: 'configurations' }"
                         class="list-group-item"
                         active-class="active"
                         exact>
              <a>Configurations</a>
            </router-link>
            <router-link tag="li"
                         :to="{ name: 'manual' }"
                         class="list-group-item"
                         active-class="active"
                         exact>
              <a>Manual actions</a>
            </router-link>
            <router-link tag="li"
                         :to="{ name: 'notice' }"
                         class="list-group-item"
                         active-class="active"
                         exact>
              <a>Notifications</a>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="order-md-1 col-md-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

