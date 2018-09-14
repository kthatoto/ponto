// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(VCalendar, {
  firstDayOfWeek: 1,
  popoverVisibility: 'visible',
  paneWidth: 350
})
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
