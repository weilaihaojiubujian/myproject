<template>
<div id="app">
    <div id="successful">
        <h3 style="text-align: center;margin-top: 80px;margin-bottom: 40px;">注册成功，快去登录吧!</h3>
        <button id="btn" @click="close" >取消</button>
        <button @click="login" >登录</button>
    </div>
    <div class ="now_login">我已注册，现在就<button class="btd_login" @click="login">登录</button></div>
    <div id="app1">
        <label>用户名/邮箱</label><input type="text" placeholder="请设置用户名/请输入邮箱名"  v-model="userInfo.email" class="input" @blur="a"><br>
        <span class="tiShi">{{ tiShi.tishi1 }}</span><br>
        <button id="btn1" @click="getverifyCode" :disabled="btn">获得验证码</button>
        <label>设置密码</label><input type="password" placeholder="请设置登录密码" v-model="userInfo.password" @blur="b"><br>
        <span class="tiShi">{{ tiShi.tishi2 }}</span><br>
        <label>确认密码</label><input type="password" v-model="userInfo.rePassword" @blur="c"><br>
        <span class="tiShi">{{ tiShi.tishi3}}</span><br>
        <label>验证码</label><input type="text" placeholder="请输入验证码"  v-model="userInfo.verifyCode" @blur="e"><br>
        <span class="tiShi">{{ tiShi.tishi5}}</span><br>
        <div class="checkbox"><input type="checkbox" style="margin-right: 10px;" v-model="userInfo.checkbox">阅读并接受<a href="" >《xxx用户协议》</a></div>
        <button id="btd" @click="flag" :disabled="btn">立即注册</button>
    </div>
</div>
</template>

<script>

    import api from "@/api";

    export default{
        // el:'#app',
        data(){
            return {
                isReturn: false,
                btn:false,
                tiShi:{
                    tiShi1:'',
                    tishi2:'',
                    tishi3:'',
                    tishi5:'',
                },
                userInfo:{
                    email:'',
                    password:'',
                    rePassword:'',
                    verifyCode:'',
                    checkbox:true,
                },
                userArr:[]
            }

        },
        methods:{
            //用户名
            a(){
                this.tiShi.tishi1 = '';
                this.isReturn = true;
                var a=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//判断是否是邮箱格式
                if (!this.userInfo.email) this.tiShi.tishi1='用户名不能为空';
                else if(!a.test(this.userInfo.email)){
                    this.isReturn = true;
                    this.tiShi.tishi1="验证不通过"
                }


            },
            //密码
            b (){
                this.tiShi.tishi2 = '';
                this.isReturn = true;
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.password) {
                    this.isReturn = true;
                    this.tiShi.tishi2='密码不能为空';
                }
                else if(!p.test(this.userInfo.password)){
                    this.isReturn = true;
                    this.tiShi.tishi2="由字母+数字组成，字母开头"
                }
            },
            //第二遍密码
            c(){
                this.tiShi.tishi3 = '';
                this.isReturn = true;
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.rePassword) {
                    this.isReturn = true;
                    this.tiShi.tishi3='密码不能为空';
                }
                else if(!p.test(this.userInfo.rePassword)){
                    this.isReturn = true;
                    this.tiShi.tishi3="由字母+数字组成，以字母开头"
                }
                if(this.userInfo.password != this.userInfo.rePassword){
                    this.isReturn = true;
                    this.tiShi.tishi3='两次密码不一致';
                }
            },
            //手机号
            e(){
                this.tiShi.tishi5 = '';
                this.isReturn = true;
                var n=/^[0-9]{6}$/
                if (!this.userInfo.verifyCode)
                {
                    this.tiShi.tishi5='验证码不能为空';
                    this.isReturn = true;
                }
                else if (!n.test(this.userInfo.verifyCode)) {this.tiShi.tishi5='验证码格式不正确';this.isReturn = true;}
            },
            getverifyCode(){
                this.tiShi.tishi1 = '';
                this.isReturn = false;
                var a=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//判断是否是邮箱格式
                if (!this.userInfo.email)
                {
                    this.tiShi.tishi1='用户名不能为空';
                    this.isReturn = true;
                }
                else if(!a.test(this.userInfo.email)){
                    this.isReturn = true;
                    this.tiShi.tishi1="验证不通过"
                }

                this.$axios.post(api.sendRegisterEmail, JSON.stringify(this.userInfo), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res != null && res.status === 200) {
                        // this.$axios.get(api.userUrl, {
                        //     headers: {
                        //         'Authorization': localStorage.getItem('token')
                        //     }
                        // }).then(res => {
                        //     let obj = res.data;
                        //     if (obj.role.filter(r => r === 'ROLE_ADMIN').length === 0) {
                        //         this.$message({
                        //             type: 'warning',
                        //             message: '权限不够'
                        //         })
                        //     } else {
                        //         localStorage.setItem('user', JSON.stringify(res.data));
                        //         this.$router.replace('/');
                        //     }
                        // });
                    } else {
                        console.log(res);
                    }
                    alert(res.data.msg);
                });
            },
            flag (){
                //alert(1)
                this.tiShi.tishi1 = '';
                this.tiShi.tishi2 = '';
                this.tiShi.tishi3 = '';
                this.tiShi.tishi5 = '';
                this.isReturn = false;
                //用户名
                var a=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//判断是否是邮箱格式
                if (!this.userInfo.email)
                {
                    this.tiShi.tishi1='用户名不能为空';
                    this.isReturn = true;
                }
                else if(!a.test(this.userInfo.email)){
                    this.isReturn = true;
                    this.tiShi.tishi1="验证不通过"
                }

                //字母开头 ，由字母+数字组成
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.password) {
                    this.isReturn = true;
                    this.tiShi.tishi2='密码不能为空';
                }
                else if(!p.test(this.userInfo.password)){
                    this.isReturn = true;
                    this.tiShi.tishi2="由字母+数字组成，字母开头"
                }
                //确认密码
                if (!this.userInfo.rePassword) {
                    this.isReturn = true;
                    this.tiShi.tishi3='密码不能为空';
                }
                else if(!p.test(this.userInfo.rePassword)){
                    this.isReturn = true;
                    this.tiShi.tishi3="由字母+数字组成，以字母开头"
                }
                if(this.userInfo.password != this.userInfo.rePassword){
                    this.isReturn = true;
                    this.tiShi.tishi3='两次密码不一致';
                }

                //手机号
                var n=/^[0-9]{6}$/
                if (!this.userInfo.verifyCode)
                {
                    this.tiShi.tishi5='验证码不能为空';
                    this.isReturn = true;
                }
                else if (!n.test(this.userInfo.verifyCode)) {this.tiShi.tishi5='验证码格式不正确';this.isReturn = true;}

                //同意协议
                if (this.userInfo.checkbox!=true) {this.btn=false;alert('是否同意该协议');this.isReturn = true;return}
                //如果有这些提示就return
                if (this.tiShi.tishi1 || this.tiShi.tishi2 ||this.tiShi.tishi3 ||this.tiShi.tishi5) return;
                //if (this.isReturn) return;
                var box=document.getElementById("successful");
                box.style.display='block';

                this.$axios.post(api.register, JSON.stringify(this.userInfo), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res != null && res.status === 200) {
                        localStorage.setItem("openid",JSON.stringify(res.data));
                        // this.$axios.get(api.userUrl, {
                        //     headers: {
                        //         'Authorization': localStorage.getItem('token')
                        //     }
                        // }).then(res => {
                        //     let obj = res.data;
                        //     if (obj.role.filter(r => r === 'ROLE_ADMIN').length === 0) {
                        //         this.$message({
                        //             type: 'warning',
                        //             message: '权限不够'
                        //         })
                        //     } else {
                        //         localStorage.setItem('user', JSON.stringify(res.data));
                        //         this.$router.replace('/');
                        //     }
                        // });
                    } else {
                        console.log(res);
                    }
                    alert(res.data.msg);
                });
            },
            login(){
                this.$router.push( '/')
            },
            close(){
                var box=document.getElementById("successful");
                box.style.display="none";
            }

        }
    }
</script>
<style type="text/css">
    *{margin: 0px;padding: 0px;}
    a{color: black;text-decoration: none;}
    body{font-family:  "宋体";background:  no-repeat;background-size: 100%;color: black;}
    .now_login{font-size: 14px;float: right;}
    .btd_login{height: 38px;width: 50px;border: 1px solid silver;border-radius: 4px;font-size: 16px;cursor: pointer;margin-left: 10px;}
    #app1{width: 300px;margin:100px auto;}
    label{display: inline-block;width:70px;height: 38px;text-align: center;}
    .tiShi{font-size: 12px;color:red;margin:0 0 10px 70px;}
    .input{width: 200px;height: 38px;border-radius: 4px;}
    textarea{resize: none;border-radius: 4px;}
    .checkbox{font-size: 14px;margin-left: 20px;}
    #btd{width: 270px;height: 38px;border-radius: 5px;background:#5B8020;border: 1px solid  silver;color: white;font-size: 18px;;cursor: pointer;margin-top: 10px;}
    #successful{width: 300px;height: 200px;border: 1px solid silver;position: fixed;left: 50%;bottom: 50%;background:#D8D8D8;display: none;}
    #btn{width: 50px;height: 30px;display: inline-block;float: right;margin-right: 15px;}
    #btn1{width: 50px;height: 30px;display: inline-block;float: right;margin-right: 15px;}
</style>