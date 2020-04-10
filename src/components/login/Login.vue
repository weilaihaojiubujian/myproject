<template>
    <div>
        <div class="outer_label">
            <img class="inner_label login_logo" src="../../assets/logo.png">
        </div>
        <div class="login_form">
            <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="ruleForm.loginId">
            <input type="password"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="ruleForm.password">
            <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
            <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
            <div style="margin-top: 10px">
                <span style="color: #000099;" @click="register">注册用户</span><span style="float: right;color: #A9A9AB"@click="forgetPassword">忘记密码？</span>
            </div>
        </div>
    </div>
</template>



<script>

    import api from '../../api.js';
    import Cookies from 'js-cookie'
    export default {


        data() {
            return {
                ruleForm: {
                    loginId: '',
                    portraitUrl: '',
                    password: ''
                },
                isBtnLoading: false
            }
        },
        // created () {
        //     if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).loginId){
        //         this.loginId = JSON.parse( localStorage.getItem('user')).loginId;
        //         this.password = JSON.parse( localStorage.getItem('user')).password;
        //     }
        // },
        computed: {
            btnText() {
                if (this.isBtnLoading) return '登录中...';
                return '登录';
            }
        },
        methods: {
            login() {
                if (!this.ruleForm.loginId) {
                    this.$message.error('请输入用户名');
                    return;
                }
                if (!this.ruleForm.password) {
                    this.$message.error('请输入密码');
                    return;
                }

                this.$axios.post(api.login, JSON.stringify(this.ruleForm), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    withCredentials: true
                }).then(res => {
                    if (res != null && res.status === 200) {
                        if (res.data.success) {
                            localStorage.setItem("openid",res.data.data.openId);
                            console.log(res.data.data.openId);
                            localStorage.setItem("userId",res.data.data.userId);
                            console.log(res.data.data.userId);
                            this.ruleForm.portraitUrl=res.data.data.portraitUrl;
                            localStorage.setItem("userInfo",JSON.stringify(this.ruleForm));
                            console.log(JSON.parse(localStorage.getItem("userInfo")).loginId);
                            if(res.data.data.roleId=='1'){
                                this.$router.push( '/home1/main');
                            }else if(res.data.data.roleId=='2'){
                                this.$router.push( '/home2/main');
                            }else{
                                this.$router.push( '/main');
                            }

                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });
            },
            register(){

                this.$router.push( '/register')

            },
            forgetPassword(){

                this.$router.push( '/forgetPassword')

            }
        }
    }
</script>
<style>
    .login_form {
        padding-top: 10%;
        padding-left: 10%;
        padding-right: 10%;
    }
    .qxs-ic_user {
        background: url("../../assets/login/ic_user.png") no-repeat;
        background-size: 13px 15px;
        background-position: 3%;
    }
    .qxs-ic_password {
        background: url("../../assets/login/ic_password.png") no-repeat;
        background-size: 13px 15px;
        background-position: 3%;
        margin-bottom: 20px;
    }
    .login_logo {
        height: 100%;
    }
    .login_btn {
        width: 100%;
        font-size: 16px;
        background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
        filter: brightness(1.4);
    }
</style>
