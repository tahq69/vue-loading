<script lang="ts">
import axios from "axios"
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "Notification",

  components: { ExampleSection, CodeSample },

  methods: {
    failRequest() {
      this.$loading.start()
      this.$loading.fail({
        notice: {
          title: "Notification title",
          description: "Notification description content",
        },
      })
    },
  },

  mounted() {
    // tslint:disable-next-line:whitespace
    ;(window as any).PR.prettyPrint()
  },
})
</script>

<template>
  <example-section title="notifications">
    <div class="row">
      <div class="col-xs-12">
        <p>This plugin is compatible with
        <a href="https://github.com/tahq69/vue-notice">crip-vue-notice</a> and
        it is possible call notices directly from loader fail method.</p>

        <button class="btn btn-danger" @click="failRequest">Fail request with notification</button>
      </div>
    </div>

    <code-sample>
      import axios from "axios"
      import CripVueNotice from "crip-vue-notice"
      import CripVueLoading from "crip-vue-loading"

      Vue.use(CripVueNotice)
      Vue.use(CripVueLoading, { axios })

      Vue.extend({
        methods: {
          failRequest() {
            this.$loading.start()
            this.$loading.fail({
              notice: {
                title: "Notification title",
                description: "Notification description content",
              },
            })
          },
        },
      })
    </code-sample>
  </example-section>
</template>
