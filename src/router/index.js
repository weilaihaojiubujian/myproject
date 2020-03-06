
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import register from '@/components/login/register'
import Main from '@/components/login/Main'
import userInfo from '@/components/login/UserInfo'
import forgetPassword from '@/components/login/ForgetPassword'
import Header from '@/components/login/Header'
import Home from '@/components/login/Home'
import changePassword from '@/components/login/ChangePassword'
import createProject from '@/components/login/CreateProject'
import projectList from '@/components/login/ProjectList'
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
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                { path: '/projectList', component: projectList, name: 'projectList' }

            ]
        }
        ,
        {
            path: '/header',
            name: 'Header',
            component: Header
        }
        ,

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
        // ,
        // {
        //     path: '/projectList',
        //     name: 'projectList',
        //     component: projectList
        // }
    ]
})
