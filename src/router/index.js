
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import register from '@/components/login/register'
import Main from '@/components/login/Main'
import userInfo from '@/components/login/UserInfo'
import forgetPassword from '@/components/login/ForgetPassword'
import Header from '@/components/login/Header'
import UserLeft from '@/components/login/UserLeft'
import UserRight from '@/components/login/UserRight'
import Home from '@/components/login/Home'
import changePassword from '@/components/login/ChangePassword'
import createProject from '@/components/login/CreateProject'
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
        ,
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
        ,
        {
            path: '/header',
            name: 'Header',
            component: Header
        }
        ,
        {
            path: '/userLeft',
            name: 'UserLeft',
            component: UserLeft
        }
        ,
        {
            path: '/userRight',
            name: 'UserRight',
            component: UserRight
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: changePassword
        },
        {
            path: '/createProject',
            name: 'createProject',
            component: createProject
        }
    ]
})
