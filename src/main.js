import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//自己写的样式
import './style/theme.css'
import './style/character.css'

import './style/vars.scss';
import VueRouter from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
// 注册element-ui
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

// const axios = Axios.create({
//   baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
//   timeout: 5000000, // 请求的超时时间
//   //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
//   // headers: {
//   // "Content-Type": "application/x-www-form-urlencoded"
//   // },
//   withCredentials: true // 允许携带cookie
// })
// axios.defaults.withCredentials = true;
// axios.interceptors.request.use( config => {
//   let data=config.data;
//   let params=new URLSearchParams()
//   for(var key in config.data){
//     params.append(key,data[key])
//   }
//   config.data=params;
//   return config;
// }, error => {
//   console.log(error);
//   return Promise.reject();
// })
Vue.prototype.$axios = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount("#app")


// new Vue({
//   render: h => h(App),
// }).$mount('#app')
