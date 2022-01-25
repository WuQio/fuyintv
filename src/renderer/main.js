import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
const {resolve} = require('path')
import 'video.js/dist/video-js.css'

Vue.use(Element)

Vue.config.productionTip = false

console.log(__dirname) // src\renderer
console.log(resolve('./')) // D:\jsprojects\fuyintv

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')

