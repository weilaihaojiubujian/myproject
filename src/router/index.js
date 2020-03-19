
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import register from '@/components/login/register'
import Main from '@/components/login/Main'
import userInfo from '@/components/login/UserInfo'
import projectInfo from '@/components/login/ProjectInfo'
import forgetPassword from '@/components/login/ForgetPassword'
import Header from '@/components/login/Header'
import Home from '@/components/login/Home'
import changePassword from '@/components/login/ChangePassword'
import createProject from '@/components/login/CreateProject'
import projectList from '@/components/login/ProjectList'
import taskList from '@/components/login/TaskList'
import taskInfo from '@/components/login/TaskInfo'
import auditProductList from '@/components/login/AuditProductList'
import auditTaskList from '@/components/login/AuditTaskList'
import recharge from '@/components/login/Recharge'
import goAlipay from '@/components/login/GoAlipay'
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
            path: '/auditProductList',
            name: 'auditProductList',
            changeOrigin: true,//是否允许跨越
            component: auditProductList
        },
        {
            path: '/recharge',
            name: 'recharge',
            changeOrigin: true,//是否允许跨越
            component: recharge
        },
        {
            path: '/goAlipay/:htmls',
            name: 'goAlipay',
            changeOrigin: true,//是否允许跨越
            component: goAlipay
        },
        {
            path: '/auditTaskList',
            name: 'auditTaskList',
            changeOrigin: true,//是否允许跨越
            component: auditTaskList
        },
        {
            path: '/projectInfo/:id',
            name: 'projectInfo',
            changeOrigin: true,//是否允许跨越
            component: projectInfo
        },
        {
            path: '/taskInfo/:id',
            name: 'taskInfo',
            changeOrigin: true,//是否允许跨越
            component: taskInfo
        },
        {
            path: '/taskList/:id',
            name: 'taskList',
            changeOrigin: true,//是否允许跨越
            component: taskList
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
                { path: '/projectList', component: projectList, name: 'projectList' },
                { path: '/createProject', component: createProject, name: 'createProject' },

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
        }
        // ,
        // {
        //     path: '/createProject',
        //     name: 'createProject',
        //     component: createProject
        // }
        // ,
        // {
        //     path: '/projectList',
        //     name: 'projectList',
        //     component: projectList
        // }
    ]
})
