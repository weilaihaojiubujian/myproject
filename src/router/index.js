
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import register from '@/components/login/register'
import Main from '@/components/login/Main'
import userInfo from '@/components/login/UserInfo'
import projectInfo from '@/components/login/ProjectInfo'
import forgetPassword from '@/components/login/ForgetPassword'
import Home from '@/components/login/Home'
import changePassword from '@/components/login/ChangePassword'
import createProject from '@/components/login/CreateProject'
import projectList from '@/components/login/ProjectList'
import taskList from '@/components/login/TaskList'
import taskInfo from '@/components/login/TaskInfo'
import recharge from '@/components/login/Recharge'
import withdraw from '@/components/login/Withdraw'
import goAlipay from '@/components/login/GoAlipay'
import transferAccount from '@/components/login/TransferAccount'
import transferRecord from '@/components/login/TransferRecord'
import listFile from '@/components/login/ListFile'
import userProjectList from '@/components/login/UserProjectList'
import userAcceptProjectList from '@/components/login/UserAcceptProjectList'
import projectUserList from '@/components/login/ProjectUserList'
import otherUserInfo from '@/components/login/OtherUserInfo'

import Main1 from '@/components/login/admin/Main'
import Home1 from '@/components/login/admin/Home1'
import auditProjectList from '@/components/login/admin/AuditProjectList'
import auditTaskList from '@/components/login/admin/AuditTaskList'

import Main2 from '@/components/login/business/Main'
import Home2 from '@/components/login/business/Home2'
import projectList1 from '@/components/login/business/ProjectList1'
import userProjectList1 from '@/components/login/business/UserProjectList1'
// import projectUserList1 from '@/components/login/business/ProjectUserList1'
import taskList1 from '@/components/login/business/TaskList1'
// import otherUserInfo1 from '@/components/login/business/OtherUserInfo1'

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
            path: '/listFile/:name',
            name: '文件列表',
            changeOrigin: true,//是否允许跨越
            component: listFile,
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
                {
                    path: '/otherUserInfo/:id',
                    name: '其他用户信息',
                    changeOrigin: true,//是否允许跨越
                    component: otherUserInfo,
                    hidden: true
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
                { path: '/userProjectList', component: userProjectList, name: '我创建的项目列表' },
                { path: '/userAcceptProjectList', component: userAcceptProjectList, name: '我接受的项目列表' },
                { path: '/createProject', component: createProject, name: '创建项目' },
                {
                    path: '/projectInfo/:id',
                    name: '项目详情',
                    changeOrigin: true,//是否允许跨越
                    component: projectInfo,
                    hidden: true
                },
                {
                    path: '/projectUserList/:id',
                    name: '想要接受项目的用户列表',
                    changeOrigin: true,//是否允许跨越
                    component: projectUserList,
                    hidden: true
                },
            ]
        }
        ,


        //管理员端
        {
            path: '/',
            name: '审核管理',
            c: true,
            hidden: true,
            component: Home1,
            children: [
                {
                    path: '/auditTaskList',
                    name: '审核任务列表',
                    changeOrigin: true,//是否允许跨越
                    c: true,
                    component: auditTaskList
                },
                {
                    path: '/auditProjectList',
                    name: '审核项目列表',
                    changeOrigin: true,//是否允许跨越
                    c: true,
                    component: auditProjectList
                },

            ]
        }
        ,
        {
            path: '/',
            name: '',
            component: Home1,
            c: false,
            hidden: true,
            children: [
                {
                    path: '/home1/main',
                    name: '主页',
                    component: Main1
                },

            ]
        },
        {
            path: '/',
            name: '',
            component: Home1,
            c: false,
            hidden: true,
            children: [
                {
                    path: '/home1/projectInfo/:id',
                    name: '审核项目详情',
                    changeOrigin: true,//是否允许跨越
                    component: projectInfo,
                    c: false
                },

            ]
        }
        ,
        {
            path: '/',
            name: '',
            component: Home1,
            c: false,
            hidden: true,
            children: [
                {
                    path: '/home1/taskInfo/:id',
                    name: '审核任务信息',
                    changeOrigin: true,//是否允许跨越
                    component: taskInfo,
                    c: false
                }

            ]
        }
        ,

        // 企业端
        {
            path: '/',
            name: '',
            component: Home2,
            b: false,
            hidden: true,
            children: [
                {
                    path: '/home2/main',
                    name: '主页',
                    component: Main2
                },

            ]
        }
        ,
        {
            path: '/',
            name: '用户管理',
            component: Home2,
            b: true,
            hidden: true,
            children: [
                {
                    path: '/home2/userInfo',
                    name: '用户信息',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: userInfo
                },
                {
                    path: '/home2/otherUserInfo/:id',
                    name: '项目其他用户信息',
                    changeOrigin: true,//是否允许跨越
                    component: otherUserInfo,
                    b: false
                },
            ]
        }
        ,
        {
            path: '/',
            name: '项目管理',
            component: Home2,
            b: true,
            hidden: true,
            children: [
                {
                    path: '/home2/projectList',
                    component: projectList1,
                    b: true,
                    name: '项目列表'
                },
                {
                    path: '/home2/userProjectList',
                    component: userProjectList1,
                    b: true,
                    name: '我创建的项目列表'
                },
                {
                    path: '/home2/projectInfo/:id',
                    name: '企业项目详情',
                    changeOrigin: true,//是否允许跨越
                    component: projectInfo,
                    b: false
                },
                {
                    path: '/home2/projectUserList/:id',
                    name: '投标项目的用户列表',
                    changeOrigin: true,//是否允许跨越
                    component: projectUserList,
                    b: false
                },
            ]
        }
        ,
        {
            path: '/',
            name: '任务管理',
            component: Home2,
            b: false,
            hidden: true,
            children: [
                {
                    path: '/home2/taskInfo/:id',
                    name: '任务具体信息',
                    changeOrigin: true,//是否允许跨越
                    component: taskInfo,
                    b: false
                },
                {
                    path: '/home2/taskList/:id',
                    name: '项目任务列表',
                    changeOrigin: true,//是否允许跨越
                    component: taskList1,
                    b: false
                }

            ]
        },
        {
            path: '/',
            name: '支付管理',
            component: Home2,
            b: true,
            hidden: true,
            children: [
                {
                    path: '/recharge',
                    name: '充值',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: recharge
                },
                {
                    path: '/withdraw',
                    name: '提现',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: withdraw
                },
                {
                    path: '/transferAccount',
                    name: '转账',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: transferAccount
                },
                {
                    path: '/transferRecord',
                    name: '转账记录',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: transferRecord
                },


            ]
        }
        //程序员端

    ]
})
