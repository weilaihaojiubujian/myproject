<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">VanDigLib 后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="loginId">
                    <el-input v-model="ruleForm.loginId" placeholder="loginId">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 求翁老板打分给力鸭</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from '../../api.js';

    export default {
        data: function () {
            return {
                ruleForm: {
                    loginId: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm() {
                this.$axios.interceptors.response.use((res) => {
                    // console.log(res);
                    // 获取服务器的响应头
                    if (res.headers.token) {
                        let token = res.headers.token;
                        localStorage.setItem('token', token)
                    }
                    return res;
                });
                this.$axios.post(api.authenticationUrl, JSON.stringify(this.ruleForm), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    // if (res != null && res.status === 200) {
                    //     this.$axios.get(api.userUrl, {
                    //         headers: {
                    //             'Authorization': localStorage.getItem('token')
                    //         }
                    //     }).then(res => {
                    //         let obj = res.data;
                    //         if (obj.role.filter(r => r === 'ROLE_ADMIN').length === 0) {
                    //             this.$message({
                    //                 type: 'warning',
                    //                 message: '权限不够'
                    //             })
                    //         } else {
                    //             localStorage.setItem('user', JSON.stringify(res.data));
                    //             this.$router.replace('/');
                    //         }
                    //     });
                    // } else {
                    //     console.log(res);
                    // }
                    alert(JSON.stringify(this.ruleForm));
                    alert(res.data.msg);
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #000;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
