# crip-vue-loading

> A Vue.js project to wrap axios and display global loading bar of http requests.
Take a look to [demo page](http://rawgit.com/tahq69/vue-loading/master/index.html)

## Usage

### Install
```bash
> npm i -S crip-vue-loading
```

### Setup
```javascript
import Vue from 'vue'
import CripLoading from 'crip-vue-loading'

// Install component in to Vue instance
Vue.use(CripLoading)
```

### Display loading bar
```vue
// App.vue
<template>
  <div class="container">

    <crip-loading
        :direction="direction"
        color="rgba(88, 91, 169, 1)"
    ></crip-loading>

    <div class="row">
      <div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2">
        <button class="btn btn-primary" @click="save($event, 2)">Save</button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    methods: {
      async save (e, timeout = 0) {
        try {
          // simply call axios to save or request data and loading bar will 
          // show up while response is not received from server. 
          await axios.get(
            `http://www.fakeresponse.com/api/?sleep=${timeout}`
          )
        } catch (err) {
          console.error(err)
        }
      },
    },
    
    data () {
      return {
        direction: 'right',
      }
    },
  }
</script>
```

## Build Setup

```bash
# install dependencies
> npm install

# serve with hot reload at localhost:8080
> npm run dev

# build for production with minification
> npm run build
```

## Release steps

```bash

# Commit sources to git repository
> git add -A
> git commit -m "[build] v$VERSION"

#update version number
> npm version $VERSION --message "[release] v$VERSION"

# Build assets
> npm run build

# publish
> git push
> npm publish
```
