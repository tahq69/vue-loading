# crip-vue-loading

> A Vue.js project to wrap axios and display global loading bar of http requests.

## Usage

### Install
```bash
npm i -S crip-vue-loading
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
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
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
