<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2">
        <h1>Crip Vue.js axios loading bar.</h1>

        <router-view></router-view>
        <br>

        <div class="form-group">
          <router-link to="/1" class="btn btn-default">Page 1</router-link>
          <router-link to="/2" class="btn btn-default">Page 2</router-link>

          <button
            class="btn btn-default"
            @click="direction = 'left'"
            :disabled="direction == 'left'"
          >
            Direction Left
          </button>

          <button
            class="btn btn-default"
            @click="direction = 'right'"
            :disabled="direction == 'right'"
          >
            Direction Right
          </button>
        </div>

        <div class="form-group">
          <label for="timeout">Request timeout</label>
          <input
            type="number"
            class="form-control"
            v-model="timeout"
            id="timeout"
          />
        </div>

        <button class="btn btn-primary" @click="request">Create request</button>
        <button class="btn btn-primary" @click="tripleRequest">Create triple request</button>
        <button class="btn btn-default" @click="manualRequest">Manual request</button>
        <button class="btn btn-default" @click="manualResponse">Manual response</button>
        <button class="btn btn-danger" @click="fail">Fail</button>
        <button class="btn btn-danger" @click="failNotice">Fail with notification</button>
      </div>
    </div>

    <small class="pull-right">
      Thanks
      <a href="http://www.fakeresponse.com" target="_blank">FakeResponse</a> and
      <a href="http://www.crip.lv" target="_blank">CRIP</a>
    </small>

  </div>
</template>

<script lang="ts">
import axios from "axios"
import Vue from "vue"

export default Vue.extend({
  name: "example",

  data() {
    return {
      direction: "right",
      timeout: 1,
    }
  },

  methods: {
    async request(timeout = 0) {
      try {
        const res = await axios.get(
          `http://www.fakeresponse.com/api/?sleep=${timeout || this.timeout}`
        )
        console.log(res.data)
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        } else {
          console.error(err.data)
        }
      }
    },

    manualRequest() {
      const id = this.$loading.start()
      console.log("manualRequest", { id })
    },

    manualResponse() {
      this.$loading.complete()
    },

    fail() {
      this.$loading.fail()
    },

    failNotice() {
      this.$loading.fail({ notice: { title: "Request failed notification" } })
    },

    /**
     * Create parallel 3 requests to the server
     * @returns {void}
     */
    tripleRequest() {
      Promise.all([this.request(), this.request(this.timeout + 1), this.request(this.timeout + 2)])
    },
  },

  watch: {
    direction(direction) {
      this.$loading.configure({ direction })
    },
  },
})
</script>
