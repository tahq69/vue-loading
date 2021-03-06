<script lang="ts">
import axios from "axios"
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "Configurations",

  components: { ExampleSection, CodeSample },

  methods: {
    async request() {
      try {
        await axios.get("https://httpstat.us/200?sleep=1000")
      } catch (error) {
        console.error(error)
      }
    },

    setDefaults() {
      this.$loading.configure({
        color: "#ffffff",
        direction: "right",
        failColor: "#ac2925",
        height: "5px",
      })

      this.request()
    },

    setCustom() {
      this.$loading.configure({
        color: "#0d8ff3",
        direction: "left",
        failColor: "#0d8ff3",
        height: "2px",
      })

      this.request()
    },
  },
})
</script>

<template>
  <example-section title="Configurations">

    <p>Some configurations are available only in component registration, but any design specific settings
      may be added in runtime and changed any time. More details in sample below.</p>

    <button class="btn btn-default"
            @click="setDefaults()">
      Set defaults
    </button>
    <button class="btn btn-default"
            @click="setCustom()">
      Set custom
    </button>
    <button class="btn btn-primary"
            @click="request()">
      Create request
    </button>

    <code-sample>
      import axios from "axios"
      import CripVueLoading from "crip-vue-loading"

      Vue.use(CripVueLoading, {
        axios: axios,

        // Show loader when vue-router detects route change
        applyOnRouter: true,

        // Default color of loader
        color: "#204d74",

        // Direction of progress: "right" | "left"
        direction: "right",

        // Loader color when request fails
        failColor: "#ac2925",

        // Height of loader
        height: "2px",

        // When set to true - loader will log details in to console
        verbose: false,
      })

      Vue.extend({
        methods: {
          async request() {
            try {
              await axios.get("https://httpstat.us/200?sleep=1000")
            } catch (error) {
              console.error(error)
            }
          },

          setDefaults() {
            this.$loading.configure({
              direction: "right",
              color: "#ffffff",
              failColor: "#ac2925",
              height: "5px",
            })

            this.request()
          },

          setCustom() {
            this.$loading.configure({
              direction: "left",
              color: "soft",
              failColor: "#0d8ff3",
              height: "2px",
            })

            this.request()
          },
        },
      })
    </code-sample>
  </example-section>
</template>
