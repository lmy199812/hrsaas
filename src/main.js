import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directive'

import components from '@/components'
import * as filters from '@/filters'
// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
//统一注册组件
Vue.use(components)
//统一注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 参数1，自定义指令名
//  参数2，配置对象
for (let key in directives) {
  Vue.directive(key, directives[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
