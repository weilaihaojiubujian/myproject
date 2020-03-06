<template>
    <div class="hello">
        <div v-if="showCard">
            {{userResponse}}
        </div>
        <hr>
        <button @click="getUserInfo">点击获取数据</button>
        <button @click="changepasswd">修改密码</button>
        <button @click="createProject">创建项目</button>
        <button @click="projectList">项目列表</button>
    </div>
</template>


<script>
    import api from '../../api.js';
    import Cookies from 'js-cookie'
    import createProject from "@/components/login/CreateProject";
    export default {
        data() {
            return {
                userRequest: {
                    email: '',
                    password: ''
                },
                userResponse: {
                    id: '',
                    loginId: '',
                    roleName: '',
                    phone: '',
                    lastName: '',
                    firstName: '',
                    sex: '',
                    certType: '',
                    certNo: '',
                    nation: '',
                    money: '',
                    email: ''
                },
                showCard:false
            }
        },
        mounted(){   //页面初始化方法
        this.getUserInfo();
    },
        methods: {
            getUserInfo() {

                this.$axios.post(api.userInfo, JSON.stringify(this.userRequest), {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    withCredentials: true,
                    params:{
                        openid: localStorage.getItem("openid")
                    }

                }).then(res => {
                    if (res != null && res.status === 200) {
                        this.showCard = true;
                        this.userResponse = res.data.data;

                    } else {
                        console.log(res);
                    }
                });
            },
             changepasswd() {
                this.$router.push( '/changePassword')
            },
            createProject() {
                this.$router.push( '/createProject')
            },
    projectList() {
        this.$router.push( '/projectList')
    }
        }
    }
</script>