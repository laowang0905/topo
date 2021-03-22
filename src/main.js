import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import $ from 'jquery'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
