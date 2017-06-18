<template>
  <div>
    <crip-loading :direction="direction" :width="width"></crip-loading>
    <br/>

    <button class="btn btn-default" @click="width = 30">30</button>
    <button class="btn btn-default" @click="width = 50">50</button>
    <button class="btn btn-default" @click="width = 70">70</button>
    <button class="btn btn-default" @click="width = 100">100</button>
    <br/>


    <button class="btn btn-default" @click="direction = 'left'">left</button>
    <button class="btn btn-default" @click="direction = 'right'">right</button>
    <br/>

    <input type="number" class="form-control" v-model="timeout"/>
    <button class="btn btn-primary" @click="request">Create request</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'example',
    methods: {
      async request () {
        try {
          let res = await axios.get(
            `http://www.fakeresponse.com/api/?sleep=${this.timeout}`
          )
          console.log(res.data)
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message)
          } else {
            console.error(err.data)
          }
        }
      }
    },
    data () {
      return {
        width: 50,
        direction: 'right',
        timeout: 2
      }
    },
  }
</script>