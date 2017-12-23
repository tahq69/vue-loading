<script lang="ts">
import axios from "axios"
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "ManualActions",

  components: { ExampleSection, CodeSample },

  methods: {
    addRequest() {
      const id = this.$loading.start()
      console.log(`Added request ${id}`)
    },

    completeRequest() {
      this.$loading.complete()
    },

    failRequest() {
      this.$loading.fail()
    },
  },
})
</script>

<template>
  <example-section title="Configurations">
    <div class="row">
      <div class="col-xs-12">
        <p>
          In some cases you need manually add/remove/fail request and it is possible. See code
          samples below for more details.
        </p>

        <button class="btn btn-default"
                @click="addRequest">
          Add request
        </button>
        <button class="btn btn-default"
                @click="completeRequest">
          Complete request
        </button>
        <button class="btn btn-danger"
                @click="failRequest">
          Fail request
        </button>
      </div>
    </div>

    <code-sample>
      import axios from "axios"
      import CripVueLoading from "crip-vue-loading"

      Vue.use(CripVueLoading, { axios })

      Vue.extend({
        methods: {
          addRequest() {
            const id = this.$loading.start()
            console.log(`Added request ${id}`)
          },

          completeRequest() {
            this.$loading.complete()
          },

          failRequest() {
            this.$loading.fail()
          },
        },
      })
    </code-sample>
  </example-section>
</template>
