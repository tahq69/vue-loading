<script lang="ts">
import axios from "axios"
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  methods: {
    async request() {
      try {
        await axios.get("https://httpstat.us/200?sleep=1000")
      } catch (error) {
        console.error(error)
      }
    },
  },
})
</script>

<template>
  <example-section title="Default usage">
    <p>
      To start using component you need simply register it. Loader will inject in to axios interceptors and
      will show up while response is not received. Press "Create request" button to call 'httpstat.us'
      with axios.
    </p>

    <button class="btn btn-primary"
            @click="request">
      Create request
    </button>

    <code-sample>
      import axios from "axios"
      import CripVueLoading from "crip-vue-loading"

      Vue.use(CripVueLoading, { axios })

      Vue.extend({
        methods: {
          async request() {
            try {
              await axios.get("https://httpstat.us/200?sleep=1000")
            } catch (error) {
              console.error(error)
            }
          },
        },
      })
    </code-sample>
  </example-section>
</template>
