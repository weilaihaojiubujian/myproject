<template>
    <div id="app">
        <div id="successful">
            <h3 style="text-align: center;margin-top: 80px;margin-bottom: 40px;">修改密码成功</h3>
            <button id="btn" @click="close" >取消</button>
            <button @click="login" >登录</button>
        </div>
        <div id="app1">
            <label>老密码</label><input type="text" placeholder="请输入老密码"  v-model="userInfo.oldPassword" class="input" @blur="a"><br>
            <span class="tiShi">{{ tiShi.tishi1 }}</span><br>
            <label>新密码</label><input type="password" placeholder="请设置登录密码" v-model="userInfo.newPassword" @blur="b"><br>
            <span class="tiShi">{{ tiShi.tishi2 }}</span><br>
            <label>确认密码</label><input type="password" v-model="userInfo.reNewPassword" @blur="c"><br>
            <span class="tiShi">{{ tiShi.tishi3}}</span><br>
            <button id="btd" @click="flag" :disabled="btn">修改密码</button>
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
                },
                userInfo:{
                    oldPassword:'',
                    newPassword:'',
                    reNewPassword:'',
                    loginId:'',
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
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.oldPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi1='老密码不能为空';
                }
                else if(!p.test(this.userInfo.oldPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi1="由字母+数字组成，字母开头"
                }


            },
            //密码
            b (){
                this.tiShi.tishi2 = '';
                this.isReturn = true;
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.newPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi2='密码不能为空';
                }
                else if(!p.test(this.userInfo.newPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi2="由字母+数字组成，字母开头"
                }
                if(this.userInfo.newPassword == this.userInfo.oldPassword){
                    this.isReturn = true;
                    this.tiShi.tishi2='新旧密码一致，请重新输入';
                }
            },
            //第二遍密码
            c(){
                this.tiShi.tishi3 = '';
                this.isReturn = true;
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.reNewPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi3='密码不能为空';
                }
                else if(!p.test(this.userInfo.reNewPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi3="由字母+数字组成，以字母开头"
                }
                if(this.userInfo.newPassword != this.userInfo.reNewPassword){
                    this.isReturn = true;
                    this.tiShi.tishi3='两次密码不一致';
                }
            },
            flag (){
                //alert(1)
                this.tiShi.tishi1 = '';
                this.tiShi.tishi2 = '';
                this.tiShi.tishi3 = '';
                this.isReturn = false;
                //字母开头 ，由字母+数字组成
                var a=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.oldPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi1='老密码不能为空';
                }
                else if(!a.test(this.userInfo.oldPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi1="由字母+数字组成，字母开头"
                }

                //字母开头 ，由字母+数字组成
                var p=/[a-zA-Z]\w[z0-9]/;
                if (!this.userInfo.newPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi2='密码不能为空';
                }
                else if(!p.test(this.userInfo.newPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi2="由字母+数字组成，字母开头"
                }
                if(this.userInfo.newPassword == this.userInfo.oldPassword){
                    this.isReturn = true;
                    this.tiShi.tishi2='新旧密码一致，请重新输入';
                }
                //确认密码
                if (!this.userInfo.reNewPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi3='密码不能为空';
                }
                else if(!p.test(this.userInfo.reNewPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi3="由字母+数字组成，以字母开头"
                }
                if(this.userInfo.newPassword != this.userInfo.reNewPassword){
                    this.isReturn = true;
                    this.tiShi.tishi3='两次密码不一致';
                }



                //如果有这些提示就return
                if (this.tiShi.tishi1 || this.tiShi.tishi2 ||this.tiShi.tishi3 ) return;
                //if (this.isReturn) return;
                var box=document.getElementById("successful");
                box.style.display='block';
                this.userInfo.loginId= localStorage.getItem("userInfo").loginId;
                this.$axios.post(api.changepasswd, JSON.stringify(this.userInfo), {
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