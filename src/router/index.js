
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import register from '@/components/login/register'
import Main from '@/components/login/Main'
import userInfo from '@/components/login/UserInfo'
import forgetPassword from '@/components/login/ForgetPassword'
// import Login from '@/components/page/Login'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/main',
            name: 'Main',
            component: Main
        },
        {
            path: '/userInfo',
            name: 'userInfo',
            changeOrigin: true,//是否允许跨越
            component: userInfo
        },
        {
            path: '/forgetPassword',
            name: 'forgetPassword',
            component: forgetPassword
        }
    ]
})
