
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
import withdraw from '@/components/login/Withdraw'
import goAlipay from '@/components/login/GoAlipay'
import transferAccount from '@/components/login/TransferAccount'
import transferRecord from '@/components/login/TransferRecord'
// import Login from '@/components/page/Login'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            hidden: true
        },
        {
            path: '/forgetPassword',
            name: '忘记密码',
            component: forgetPassword,
            hidden: true
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            hidden: true
        },
        {
            path: '/',
            name: '',
            component: Home,
            hidden: true,
            children: [
                {
                    path: '/main',
                    name: '主页',
                    component: Main,
                },

            ]
        }
       ,
        {
            path: '/goAlipay/:htmls',
            name: 'goAlipay',
            changeOrigin: true,//是否允许跨越
            component: goAlipay,
            hidden: true
        },
        {
            path: '/',
            name: '任务管理',
            component: Home,
            hidden: true,
            children: [
                {
                    path: '/taskInfo/:id',
                    name: '任务信息',
                    changeOrigin: true,//是否允许跨越
                    component: taskInfo,
                    hidden: true
                },
                {
                    path: '/taskList/:id',
                    name: '任务列表',
                    changeOrigin: true,//是否允许跨越
                    component: taskList,
                    hidden: true
                }

            ]
        }
        ,
        {
            path: '/',
            name: '支付管理',
            component: Home,
            children: [
                {
                    path: '/recharge',
                    name: '充值',
                    changeOrigin: true,//是否允许跨越
                    component: recharge
                },
                {
                    path: '/withdraw',
                    name: '提现',
                    changeOrigin: true,//是否允许跨越
                    component: withdraw
                },
                {
                    path: '/transferAccount',
                    name: '转账',
                    changeOrigin: true,//是否允许跨越
                    component: transferAccount
                },
                {
                    path: '/transferRecord',
                    name: '转账记录',
                    changeOrigin: true,//是否允许跨越
                    component: transferRecord
                },


            ]
        }
        ,
        {
            path: '/',
            name: '审核管理',
            component: Home,
            children: [
                {
                    path: '/auditTaskList',
                    name: '审核任务列表',
                    changeOrigin: true,//是否允许跨越
                    component: auditTaskList
                },
                {
                    path: '/auditProductList',
                    name: '审核项目列表',
                    changeOrigin: true,//是否允许跨越
                    component: auditProductList
                },

            ]
        }
        ,
        {
            path: '/',
            name: '用户管理',
            component: Home,
            children: [

                {
                    path: '/changePassword',
                    name: '改变密码',
                    component: changePassword
                },
                {
                    path: '/userInfo',
                    name: '用户信息',
                    changeOrigin: true,//是否允许跨越
                    component: userInfo
                },
            ]
        }
        ,
        {
            path: '/',
            name: '项目管理',
            component: Home,
            children: [
                { path: '/projectList', component: projectList, name: '项目列表' },
                { path: '/createProject', component: createProject, name: '创建项目' },
                {
                    path: '/projectInfo/:id',
                    name: '项目详情',
                    changeOrigin: true,//是否允许跨越
                    component: projectInfo,
                    hidden: true
                },
            ]
        }
        ,
        {
            path: '/header',
            name: 'Header',
            component: Header,
            hidden: true
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
