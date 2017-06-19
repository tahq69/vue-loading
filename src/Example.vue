<template>
  <div class="container">

    <crip-loading
        :direction="direction"
        color="rgba(88, 91, 169, 1)"
    ></crip-loading>

    <div class="row">
      <div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2">
        <h1>Crip Vue.js axios loading bar.</h1>

        <div class="form-group">
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
        <button class="btn btn-primary" @click="tripleRequest">
          Create triple request
        </button>
      </div>
    </div>

    <small class="pull-right">
      Thanks
      <a href="http://www.fakeresponse.com" target="_blank">FakeResponse</a> and
      <a href="http://www.crip.lv" target="_blank">CRIP</a>
    </small>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'example',

    methods: {
      async request (e, timeout = 0) {
        try {
          let res = await axios.get(
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

      /**
       * Create parallel 3 requests to the server
       */
      tripleRequest () {
        Promise.all([
          this.request(),
          this.request(null, this.timeout + 1),
          this.request(null, this.timeout + 2)
        ])
      }
    },

    data () {
      return {
        direction: 'right',
        timeout: 1
      }
    },
  }
</script>