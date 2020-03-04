<template>
    <div id="app">
        <div id="successful">
            <h3 style="text-align: center;margin-top: 80px;margin-bottom: 40px;">创建项目成功</h3>
            <button id="btn" @click="close" >取消</button>
            <button @click="login" >登录</button>
        </div>
        <div class ="now_login">我已注册，现在就<button class="btd_login" @click="login">登录</button></div>
        <div id="app1">
            <label>项目名</label><input type="text" placeholder="请输入项目名"  v-model="project.name" class="input" ><br>
            <span class="tiShi">{{ tiShi.tishi1 }}</span><br>
            <label>描述：</label><input type="text" placeholder="请输入项目具体描述" v-model="project.description" ><br>
            <span class="tiShi">{{ tiShi.tishi2 }}</span><br>
            <label>文件</label><input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" ><br>
            <span class="tiShi">{{ tiShi.tishi3}}</span><br>
            <label>文件名</label><input type="text" v-model="file.fileName" ><br>
            <span class="tiShi">{{ tiShi.tishi5}}</span><br>
            <label>价格</label><input type="number" v-model="project.price"  @keyup="handleInput"><br>
            <span class="tiShi">{{ tiShi.tishi4}}</span><br>
            <div class="checkbox"><input type="checkbox" style="margin-right: 10px;" v-model="checkbox">阅读并接受<a href="" >《人力资源项目协议》</a></div>
            <button id="btd" @click="createProject" :disabled="btn">创建项目</button>
        </div>
    </div>
</template>

<script>

    import api from "@/api";
    import qs from 'qs'
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
                    tishi4:'',
                },
                project:{
                    name:'',
                    description:'',
                    price:'',
                    url:''
                },
                file:{
                    multipartFile:'',
                    fileName:''

                },
                files:'',
                checkbox:true,
                userArr:[]
            }

        },
        methods:{
            getFile(event){
                // var file = event.target.files;
                // console.log(file);
                // this.project.multipartFile=file;
                this.file.multipartFile = event.target.files[0];
                console.log(this.file.multipartFile);
                this.files= event.target.files;

            },

            createProject (){
                //alert(1)
                this.tiShi.tishi1 = '';
                this.tiShi.tishi2 = '';
                this.tiShi.tishi3 = '';
                this.tiShi.tishi5 = '';
                this.tiShi.tishi4 = '';
                this.isReturn = false;
                //用户名

                //同意协议
                if (this.checkbox!=true) {this.btn=false;alert('是否同意该协议');this.isReturn = true;return}
                //if (this.isReturn) return;
                var box=document.getElementById("successful");
                box.style.display='block';

                var formData = new FormData(this.files);
                formData.append("multipartFile", this.file.multipartFile);
                formData.append("fileName", this.file.fileName);
                // formData.append("price", this.project.price);
                // formData.append("name", this.project.name);
                // formData.append("description", this.project.description);


                // let postData= new URLSearchParams()
                // postData.append("multipartFile", this.project.multipartFile);
                // postData.append("name", this.project.name);
                // postData.append("description", this.project.description);
                // postData.append("fileName", this.project.fileName);
                // postData.append("price", this.project.price);

                this.$axios.post(api.fileUpload, formData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    withCredentials: true,
                    params:{
                        openid: localStorage.getItem("openid")
                    }
                }).then(res => {
                    if (res != null && res.status === 200) {

                        this.project.url=res.data.data;
                        this.$axios.post(api.createProject, JSON.stringify(this.project), {
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

                            } else {
                                console.log(res);
                            }
                            alert(res.data.msg);
                        });
                    } else {
                        console.log(res);
                    }
                    alert(res.data.msg);
                });

            },
            login(){
                this.$router.push( '/')
            },
            handleInput(e) {

                // log(e.target.value)

                e.target.value = e.target.value.replace(/[^\d]/g, "");

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