// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/index.css'
import VueLazyload from 'vue-lazyload'
import errImg from './assets/img/404.png'
import loadingImg from './assets/img/loading-spin.svg'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errImg,
  loading: loadingImg,
  attempt: 1
})
Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
