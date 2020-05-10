
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
import chat from '@/components/login/Chat'
import chatRecord from '@/components/login/ChatRecord'
import validationUser from '@/components/login/ValidationUser'
import evaluationList from '@/components/login/EvaluationList'
import otherUserInfoByUserId from '@/components/login/OtherUserInfoByUserId'
import problemList from '@/components/login/ProblemList'
import commentList from '@/components/login/CommentList'
import userProblemList from '@/components/login/UserProblemList'
import userCommentList from '@/components/login/UserCommentList'
import problemAndComment from '@/components/login/ProblemAndComment'
import signature from '@/components/login/Signature'

import Main1 from '@/components/login/admin/Main'
import Home1 from '@/components/login/admin/Home1'
import auditProjectList from '@/components/login/admin/AuditProjectList'
import auditTaskList from '@/components/login/admin/AuditTaskList'
import completeProjectList from '@/components/login/admin/CompleteProjectList'
import otherUserInfoByUserId2 from '@/components/login/admin/OtherUserInfoByUserId2'
import auditUserList from '@/components/login/admin/AuditUserList'

import Main2 from '@/components/login/business/Main'
import Home2 from '@/components/login/business/Home2'
import projectList1 from '@/components/login/business/ProjectList1'
import userProjectList1 from '@/components/login/business/UserProjectList1'
import listFile1 from '@/components/login/business/ListFile1'
import signature1 from '@/components/login/business/Signature1'
import withdraw1 from '@/components/login/business/Withdraw1'
import transferAccount1 from '@/components/login/business/TransferAccount1'
import commentList1 from '@/components/login/business/CommentList1'
// import projectUserList1 from '@/components/login/business/ProjectUserList1'
import taskList1 from '@/components/login/business/TaskList1'
import chat1 from '@/components/login/business/Chat1'
import userInfo1 from '@/components/login/business/UserInfo1'
import otherUserInfoByUserId1 from '@/components/login/business/OtherUserInfoByUserId1'
import otherUserInfo1 from '@/components/login/business/OtherUserInfo1'
import problemList1 from '@/components/login/business/ProblemList1'
import userProblemList1 from '@/components/login/business/UserProblemList1'
import userCommentList1 from '@/components/login/business/UserCommentList1'

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
            name: '用户管理',
            component: Home,
            children: [

                {
                    path: '/userInfo',
                    name: '用户信息',
                    changeOrigin: true,//是否允许跨越
                    component: userInfo
                },
                // {
                //     path: '/otherUserInfo/:id',
                //     name: '其他用户信息',
                //     changeOrigin: true,//是否允许跨越
                //     component: otherUserInfo,
                //     hidden: true
                // },
                {
                    path: '/chat',
                    name: '聊天',
                    hidden: true,
                    changeOrigin: true,//是否允许跨越
                    component: chat
                },
                {
                    path: '/chatRecord',
                    name: '聊天记录',
                    hidden: true,
                    changeOrigin: true,//是否允许跨越
                    component: chatRecord
                },
                {
                    path: '/validationUser',
                    name: '实名认证',
                    changeOrigin: true,//是否允许跨越
                    hidden: true,
                    component: validationUser
                },
                {
                    path: '/evaluationList',
                    name: '评价列表',
                    changeOrigin: true,//是否允许跨越
                    hidden: true,
                    component: evaluationList
                },
                {
                    path: '/otherUserInfoByUserId',
                    name: '通过id查看其它用户信息',
                    changeOrigin: true,//是否允许跨越
                    hidden: true,
                    component: otherUserInfoByUserId
                } ,
                {
                    path: '/listFile',
                    name: '文件列表',
                    changeOrigin: true,//是否允许跨越
                    component: listFile,
                    hidden: true
                } ,
                {
                    path: '/signature',
                    name: '合同签名',
                    changeOrigin: true,//是否允许跨越
                    hidden: true,
                    component: signature
                }
            ]
        }
        ,
        {
            path: '/',
            name: '项目管理',
            component: Home,
            children: [
                { path: '/projectList', component: projectList, name: '项目列表' },
                // { path: '/userProjectList', component: userProjectList, name: '我创建的项目列表' },
                { path: '/userAcceptProjectList', component: userAcceptProjectList, name: '我接受的项目列表' },
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
        {
            path: '/',
            component: Home,
            name: '问题管理',
            children: [

                { path: '/problemList', component: problemList, name: '问题列表' },
                { path: '/userProblemList', component: userProblemList, name: '我的问题' },
                { path: '/userCommentList', component: userCommentList, name: '我的评论' }
            ]
        },
        {
            path: '/',
            name: '评论管理',
            component: Home,
            hidden: true,
            children: [
                {
                    path: '/commentList',
                    name: '评论列表',
                    changeOrigin: true,//是否允许跨越
                    component: commentList,
                    hidden: true
                },
                {
                    path: '/problemAndComment',
                    name: '问题与评论',
                    changeOrigin: true,//是否允许跨越
                    component: problemAndComment,
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
            c: true,
            hidden: true,
            leaf: true,//只有一个节点
            component: Home1,
            children: [
                {
                    path: '/completeProjectList',
                    name: '完成项目列表',
                    changeOrigin: true,//是否允许跨越
                    c: true,
                    component: completeProjectList
                }

            ]
        } ,
        {
            path: '/',
            name: '',
            c: true,
            hidden: true,
            leaf: true,//只有一个节点
            component: Home1,
            children: [
                {
                    path: '/auditUserList',
                    name: '审核用户列表',
                    changeOrigin: true,//是否允许跨越
                    c: true,
                    component: auditUserList
                }

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
                    path: '/admin/main',
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
                    path: '/admin/projectInfo/:id',
                    name: '审核项目详情',
                    changeOrigin: true,//是否允许跨越
                    component: projectInfo,
                    c: false
                },
                {
                    path: '/admin/otherUserInfoByUserId',
                    name: '查看其它用户信息',
                    changeOrigin: true,//是否允许跨越
                    c: false,
                    component: otherUserInfoByUserId2
                },
                {
                    path: '/admin/evaluationList',
                    name: '管理员评价列表',
                    changeOrigin: true,//是否允许跨越
                    c: false,
                    component: evaluationList
                }

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
                    path: '/admin/taskInfo/:id',
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
                    path: '/business/main',
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
                    path: '/business/userInfo',
                    name: '用户信息',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: userInfo1
                },
                {
                    path: '/business/otherUserInfo/:id',
                    name: '项目其他用户信息',
                    changeOrigin: true,//是否允许跨越
                    component: otherUserInfo1,
                    b: false
                },
                {
                    path: '/business/listFile/:name',
                    name: '项目文件列表',
                    changeOrigin: true,//是否允许跨越
                    component: listFile1,
                    b: false
                }
                ,
                {
                    path: '/business/chat',
                    name: '用户聊天',
                    b: false,
                    changeOrigin: true,//是否允许跨越
                    component: chat1
                },
                {
                    path: '/business/chatRecord',
                    name: '用户聊天记录',
                    b: false,
                    changeOrigin: true,//是否允许跨越
                    component: chatRecord
                },
                {
                    path: '/business/validationUser',
                    name: '实名认证',
                    changeOrigin: true,//是否允许跨越
                    b: false,
                    component: validationUser
                },
                {
                    path: '/business/evaluationList',
                    name: '用户评价列表',
                    changeOrigin: true,//是否允许跨越
                    b: false,
                    component: evaluationList
                },
                {
                    path: '/business/otherUserInfoByUserId',
                    name: '通过用户id查看其它用户信息',
                    changeOrigin: true,//是否允许跨越
                    b: false,
                    component: otherUserInfoByUserId1
                },
                {
                    path: '/business/signature',
                    name: '企业合同签名',
                    changeOrigin: true,//是否允许跨越
                    b: false,
                    component: signature1
                }
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
                    path: '/business/projectList',
                    component: projectList1,
                    b: true,
                    name: '项目列表'
                },
                {
                    path: '/business/userProjectList',
                    component: userProjectList1,
                    b: true,
                    name: '我创建的项目列表'
                },
                {
                    path: '/business/projectInfo/:id',
                    name: '企业项目详情',
                    changeOrigin: true,//是否允许跨越
                    component: projectInfo,
                    b: false
                },
                {
                    path: '/business/projectUserList/:id',
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
                    path: '/business/taskInfo/:id',
                    name: '任务具体信息',
                    changeOrigin: true,//是否允许跨越
                    component: taskInfo,
                    b: false
                },
                {
                    path: '/business/taskList/:id',
                    name: '项目任务列表',
                    changeOrigin: true,//是否允许跨越
                    component: taskList1,
                    b: false
                }

            ]
        },
        {
            path: '/',
            component: Home2,
            name: '问题管理',
            b: true,
            hidden: true,
            children: [

                { path: '/business/problemList',
                    component: problemList1,
                    b: true,
                    name: '问题列表'
                },
                { path: '/business/userProblemList',
                    component: userProblemList1,
                    b: true,
                    name: '我的问题'
                },
                { path: '/business/userCommentList',
                    component: userCommentList1,
                    b: true,
                    name: '我的评论'
                }
            ]
        },
        {
            path: '/',
            name: '评论管理',
            component: Home2,
            b: false,
            hidden: true,
            children: [
                {
                    path: '/business/commentList',
                    name: '问题评论列表',
                    changeOrigin: true,//是否允许跨越
                    component: commentList1,
                    hidden: true
                },
                {
                    path: '/business/problemAndComment',
                    name: '问题和评论',
                    changeOrigin: true,//是否允许跨越
                    component: problemAndComment,
                    hidden: true
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
                    path: '/business/recharge',
                    name: '充值',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: recharge
                },
                {
                    path: '/business/withdraw',
                    name: '提现',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: withdraw1
                },
                {
                    path: '/business/transferAccount',
                    name: '转账',
                    changeOrigin: true,//是否允许跨越
                    b: true,
                    component: transferAccount1
                },
                {
                    path: '/business/transferRecord',
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
