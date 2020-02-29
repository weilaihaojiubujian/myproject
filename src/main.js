import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//自己写的样式
import './style/theme.css'
import './style/character.css'

// 注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount("#app")


// new Vue({
//   render: h => h(App),
// }).$mount('#app')
