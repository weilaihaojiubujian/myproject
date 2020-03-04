<template>
    <div>
        <div class="topbar-logo topbar-btn">
            <a href="../../assets/logo.png"></a>
        </div>
        <div class="topbar-title topbar-btn">
            <span>后台管理系统</span>
        </div>
        <div class="topbar-account topbar-btn">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{sysUserName}}  <i class="iconfont icon-down"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="userinfo">个人信息</el-dropdown-item>
                    <el-dropdown-item @click="editpwd">修改密码</el-dropdown-item>
                    <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from "@/api";

    export default {
        data() {
            return {
                sysUserName: '',
                sysUserAvatar: '',
                collapsed: false,
            }
        },
        mounted() {
            var userInfo = localStorage.getItem("userInfo");
            if(userInfo) {
                this.sysUserName = userInfo.loginId ;
            }
        },
        methods: {
            //退出
            logout() {
                this.$confirm('确认要退出吗？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {

                    // confirmCallBack:({confirmButtonTextClose,close})=> {
                    this.$axios.post(api.loginout, JSON.stringify(), {
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
                            if (res.data.success) {
                                this.$router.push( '/');
                            } else {
                                console.log(res.data.msg);
                            }

                        } else {
                            console.log(res);
                        }
                        alert(res.data.msg);
                    });
                    // }
                }).catch(() => {

                });
            },
            //个人信息
            userinfo() {
                this.$router.push('/userinfo');
            },
            //修改密码
            editpwd() {
                this.$router.push('/changePassword');
            }
        }
    }
</script>