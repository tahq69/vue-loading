<template>
  <example-section title="Default usage">
    <div class="row">
      <div class="col-xs-12">
        <button
          class="btn btn-primary"
          @click="request"
        >
          Create request
        </button>
      </div>
    </div>

    <hr>

    <pre class="prettyprint lang-js">
      methods: {
        async request() {
          try {
            await axios.get("http://www.fakeresponse.com/api/?sleep=1")
          } catch (error) {
            console.error(error)
          }
        },
      },
    </pre>
  </example-section>
</template>

<script lang="ts">
import axios from "axios"
import Vue from "vue"

import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection },

  methods: {
    async request() {
      try {
        await axios.get(`http://www.fakeresponse.com/api/?sleep=1`)
      } catch (error) {
        console.error(error)
      }
    },
  },
})
</script>
