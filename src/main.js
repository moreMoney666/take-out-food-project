import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
<<<<<<< HEAD
=======
// import '@/plugins/element-ui'

>>>>>>> 89388a11d6aa50d96793760c5131b3ac80dd9dbd
import App from './App'
import store from './store'
import router from './router'

import  * as API from '@/api'

import '@/icons' // icon
import '@/permission' // permission control
<<<<<<< HEAD
// 引入准备全局注册的组件
import CategorySelector from '@/components/CategorySelector'
=======
import '@/plugins/element-ui'
>>>>>>> 89388a11d6aa50d96793760c5131b3ac80dd9dbd

// 注册全局组件
Vue.component('CategorySelector', CategorySelector)
// Vue.prototype.$api = api
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
<<<<<<< HEAD
// Vue.use(ElementUI)
Vue.prototype.$API = API
=======
Vue.use(ElementUI)
>>>>>>> 89388a11d6aa50d96793760c5131b3ac80dd9dbd

Vue.config.productionTip = false


// 安装全局事件总线
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el: '#app',
  router,
  store,
  render: h => h(App)
})
