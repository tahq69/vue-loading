import Vue from 'vue'
import axios from 'axios'
import loading from './main'
import App from './Example.vue'

Vue.use(loading, {axios})

new Vue({
  el: '#app',
  render: h => h(App)
})
