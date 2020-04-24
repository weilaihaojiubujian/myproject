<template>
    <div class="hello">
        <div v-if="showCard">
<!--            {{userResponse}}-->
            <el-form :model="userResponse"  ref="EditorUserForms">
                <el-form-item label="登陆名"  >
                    {{userResponse.loginId}}
                </el-form-item>
                <el-form-item label="角色"  >
                    {{userResponse.roleName}}
                </el-form-item>
                <el-form-item label="手机号"  >
                    {{userResponse.phone}}
                </el-form-item>
                <el-form-item label="真实姓名"  >
                    {{userResponse.realName}}
                </el-form-item>
                <el-form-item label="性别"  >
                    <template v-if="userResponse.sex=='0'">
                      男
                    </template>
                    <template v-else>
                       女
                    </template>
                </el-form-item>
                <el-form-item label="证件类型"  >
                    <template v-if="userResponse.certType=='0'">
                        身份证
                    </template>
                    <template v-else>
                        护照
                    </template>
                </el-form-item>
                <el-form-item label="证件号码"  >
                    {{userResponse.certNo}}
                </el-form-item>
                <el-form-item label="国籍"  >
                    {{userResponse.nation}}
                </el-form-item>
                <el-form-item label="邮箱"  >
                    {{userResponse.email}}
                </el-form-item>
                <el-form-item label="用户评价"  >
                    {{userResponse.evaluation}}
                </el-form-item>
                <el-form-item label="金额"  >
                    {{userResponse.money}}
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleEdit" >编辑</el-button>
                    <el-button  type="primary" @click="handleChangePassword">改变密码</el-button>
                    <el-button  type="primary" @click="handleFile">上传头像</el-button>
                    <template v-if="userResponse.realName==null">
                        <el-button  type="primary" @click="validationUser">实名验证</el-button>
                    </template>
                    <el-button  type="primary" @click="handleEvaluation">查看评价列表</el-button>
                </el-form-item>
            </el-form>
        </div>
        <hr>
        <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" top="0px">
            <el-form :model="user" label-width="80px" ref="userResponse">
                <el-form-item label="登陆名"  >
                    <el-input v-model="user.loginId" auto-complete="off" @blur="a"></el-input>
                    <span class="tiShi">{{ tiShi.tishi1 }}</span><br>
                </el-form-item>
                <el-form-item label="角色"  >
                    <Select style="width:200px" v-model="sendValue">
                        <Option v-for="item in stateList" :value="item.value" :key="item.value" name="sendValue">{{
                            item.label }}
                        </Option>
                    </Select>
                </el-form-item>
                <el-form-item label="手机号"  >
                    <el-input v-model="user.phone" @blur="e"></el-input>
                    <span class="tiShi">{{ tiShi.tishi5}}</span><br>
                </el-form-item>
                <el-form-item label="性别"  >
                    <Select style="width:200px" v-model="sexValue">
                        <Option v-for="item in sexList" :value="item.value" :key="item.value" name="sexValue">{{
                            item.label }}
                        </Option>
                    </Select>
                </el-form-item>
                <el-form-item label="证件类型"  >
                    <Select style="width:200px" v-model="certTypeValue">
                        <Option v-for="item in certTypeList" :value="item.value" :key="item.value" name="certTypeValue">{{
                            item.label }}
                        </Option>
                    </Select>
                </el-form-item>
                <el-form-item label="证件号码"  >
                    <el-input v-model="user.certNo"  @blur="b"></el-input>
                    <span class="tiShi">{{ tiShi.tishi2 }}</span><br>
                </el-form-item>
                <el-form-item label="国籍"  >
                    <el-input v-model="user.nation" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改密码" v-model="changePasswordFormVisible" :visible.sync="changePasswordFormVisible" top="0px">
            <el-form :model="userInfo" label-width="80px" ref="userInfo">
                <el-form-item label="老密码"  >
                    <el-input v-model="userInfo.oldPassword" auto-complete="off" @blur="c" placeholder="请输入老密码" type="password"></el-input>
                    <span class="tiShi">{{ tiShi.tishi1 }}</span><br>
                </el-form-item>
                <el-form-item label="新密码"  >
                    <el-input v-model="userInfo.newPassword" @blur="d" placeholder="请设置登录密码" type="password"></el-input>
                    <span class="tiShi">{{ tiShi.tishi2 }}</span><br>
                </el-form-item>
                <el-form-item label="确认密码"  >
                    <el-input v-model="userInfo.reNewPassword"  @blur="f" type="password"></el-input>
                    <span class="tiShi">{{ tiShi.tishi3}}</span><br>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePasswordFormVisible = false">取消</el-button>
                <el-button type="primary" @click="changePasswordSubmit" :loading="changePasswordLoading">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="上传头像" v-model="fileFormVisible" :visible.sync="fileFormVisible">
            <el-form :model="file" label-width="80px"  ref="file">
                <el-form-item label="文件">
                    <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" accept=".jpg,.png,.gif" ><br>
                    <!--                    <el-input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input"  ></el-input>-->
                    <a>只支持.jpg,.png,.gif</a><br />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fileFormVisible = false">取消</el-button>
                <el-button type="primary" @click="fileSubmit" :loading="fileLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import api from "@/api";

    export default {
        inject: ['reload'], // 引入方法
        data() {
            return {
                isReturn: false,
                btn:false,
                tiShi:{
                    tiShi1:'',
                    tishi2:'',
                    tishi3:'',
                    tishi5:'',
                },
                sendValue: '',
                stateList: [
                    {
                        value: '2',
                        label: '企业'
                    },
                    {
                        value: '3',
                        label: '大学生'
                    },
                    {
                        value: '4',
                        label: '工作的程序员'
                    }
                ],
               sexList: [
                   {
                       value: '0',
                       label: '男'
                   },
                   {
                       value: '1',
                       label: '女'
                   }
               ],
                certTypeList: [
                    {
                        value: '0',
                        label: '身份证'
                    },
                    {
                        value: '1',
                        label: '护照'
                    }
                ],
                sexValue: '',
                certTypeValue: '',
                changePasswordFormVisible: false,//修改密码界面是否显示
                changePasswordLoading: false,
                fileFormVisible: false,//文件界面是否显示
                fileLoading: false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                userRequest: {
                    email: '',
                    password: ''
                },
                userResponse: {
                    id: '',
                    loginId: '',
                    roleName: '',
                    phone: '',
                    realName: '',
                    evaluation: '',
                    sex: '',
                    certType: '',
                    certNo: '',
                    nation: '',
                    money: '',
                    email: '',
                    roleId: ''
                },
                user: {
                    id: '',
                    loginId: '',
                    roleName: '',
                    phone: '',
                    sex: '',
                    certType: '',
                    certNo: '',
                    nation: '',
                    money: '',
                    email: '',
                    roleId: ''
                },
                userInfo:{
                    oldPassword:'',
                    newPassword:'',
                    reNewPassword:'',
                    loginId:'',
                    checkbox:true,
                },
                file:{
                    multipartFile:''
                },
                portraitUrl: '',
                showCard:false
            }
        },
        mounted(){   //页面初始化方法
        this.getUserInfo();
    },
        methods: {
            a(){
                this.tiShi.tishi1 = '';
                this.isReturn = true;
                var a=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//判断是否是邮箱格式
                if (!this.user.loginId) this.tiShi.tishi1='登陆名不能为空';
                else if(!a.test(this.user.loginId)){
                    this.isReturn = true;
                    this.tiShi.tishi1="登陆名为邮箱格式，验证不通过"
                }
            },
            b (){
                this.tiShi.tishi2 = '';
                this.isReturn = true;
                var p=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/;
                var x=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if (!this.user.certNo) {
                    this.isReturn = true;
                    this.tiShi.tishi2='证件号不能为空';
                }
                else if(!p.test(this.user.certNo) && this.user.certNo.length==15){
                    this.isReturn = true;
                    this.tiShi.tishi2="证件号有误，验证不通过"
                }
                else if(this.user.certNo.length==18 && !x.test(this.user.certNo) ){
                    this.isReturn = true;
                    this.tiShi.tishi2="证件号有误，验证不通过"
                }
            },
            //老密码
            c(){
                this.tiShi.tishi1 = '';
                this.isReturn = true;
                var p=/^[A-Za-z][A-Za-z0-9]{5,11}$/;
                if (!this.userInfo.oldPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi1='老密码不能为空';
                }
                else if(!p.test(this.userInfo.oldPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi1="由字母+数字组成，字母开头，6-12位"
                }


            },
            //新密码
            d (){
                this.tiShi.tishi2 = '';
                this.isReturn = true;
                var p=/^[A-Za-z][A-Za-z0-9]{5,11}$/;
                if (!this.userInfo.newPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi2='密码不能为空';
                }
                else if(!p.test(this.userInfo.newPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi2="由字母+数字组成，字母开头，6-12位"
                }
                if(this.userInfo.newPassword == this.userInfo.oldPassword){
                    this.isReturn = true;
                    this.tiShi.tishi2='新旧密码一致，请重新输入';
                }
            },
            //第二遍密码
            f(){
                this.tiShi.tishi3 = '';
                this.isReturn = true;
                var p=/^[A-Za-z][A-Za-z0-9]{5,11}$/;
                if (!this.userInfo.reNewPassword) {
                    this.isReturn = true;
                    this.tiShi.tishi3='密码不能为空';
                }
                else if(!p.test(this.userInfo.reNewPassword)){
                    this.isReturn = true;
                    this.tiShi.tishi3="由字母+数字组成，字母开头，6-12位"
                }
                if(this.userInfo.newPassword != this.userInfo.reNewPassword){
                    this.isReturn = true;
                    this.tiShi.tishi3='两次密码不一致';
                }
            },
            //手机号
            e(){
                this.tiShi.tishi5 = '';
                this.isReturn = true;
                var n=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
                if (!this.user.phone)
                {
                    this.tiShi.tishi5='手机号不能为空';
                    this.isReturn = true;
                }
                else if (!n.test(this.user.phone)) {this.tiShi.tishi5='手机号码格式不正确';this.isReturn = true;}
            },
            //显示编辑界面
            handleEdit () {
                this.editFormVisible = true;
                // this.userResponse = Object.assign({}, row);
                // console.log(this.userResponse);
            },
            //显示修改密码界面
            handleChangePassword() {
                this.changePasswordFormVisible = true;

            },
            //查看评价列表
            handleEvaluation() {
                var userId = localStorage.getItem("userId");
                console.log(userId);
                this.$router.push({ name:'用户评价列表', params:{userId:userId}});
            },
            //显示上传头像界面
            handleFile () {
                this.fileFormVisible = true;
            },
            //实名验证
            validationUser() {
                this.$router.push( '/business/validationUser');
            },
            //编辑
            editSubmit () {
                this.$refs.userResponse.validate((valid) => {
                    this.tiShi.tishi1 = '';
                    this.tiShi.tishi2 = '';
                    this.tiShi.tishi5 = '';
                    this.isReturn = false;
                    //用户名
                    var a=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//判断是否是邮箱格式
                    if (!this.user.loginId)
                    {
                        this.tiShi.tishi1='登陆名不能为空';
                        this.isReturn = true;
                    }
                    else if(!a.test(this.user.loginId)){
                        this.isReturn = true;
                        this.tiShi.tishi1="登陆名为邮箱格式，验证不通过"
                    }
                    var n=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
                    if (!this.user.phone)
                    {
                        this.tiShi.tishi5='手机号不能为空';
                        this.isReturn = true;
                    }
                    else if (!n.test(this.user.phone)) {this.tiShi.tishi5='手机号码格式不正确';this.isReturn = true;}

                    var p=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/;
                    var x=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                    if (!this.user.certNo) {
                        this.isReturn = true;
                        this.tiShi.tishi2='证件号不能为空';
                    }
                    else if(!p.test(this.user.certNo) && this.user.certNo.length==15){
                        this.isReturn = true;
                        this.tiShi.tishi2="证件号有误，验证不通过"
                    }
                    else if(this.user.certNo.length==18 && !x.test(this.user.certNo) ){
                        this.isReturn = true;
                        this.tiShi.tishi2="证件号有误，验证不通过"
                    }
                    //如果有这些提示就return
                    if (this.tiShi.tishi1 || this.tiShi.tishi2 ||this.tiShi.tishi5) return;
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            this.user.roleId=this.sendValue;
                            console.log(this.user.roleId);
                            this.user.sex=this.sexValue;
                            console.log(this.user.sex);
                            this.user.certType=this.certTypeValue;
                            console.log(this.user.certType);
                            this.$axios.post(api.editUser, JSON.stringify(this.user), {
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

                                    this.editLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    // this.$refs['userResponse'].resetFields();
                                    this.editFormVisible = false;
                                    if (res.data.success) {
                                        this.getUserInfo();
                                    } else {
                                        console.log(res);
                                    }
                                } else {
                                    console.log(res);
                                }
                            });
                        });
                    }
                });
            },
            changePasswordSubmit(){
                this.$refs.userInfo.validate((valid) => {
                        this.changePasswordLoading = true;
                        this.tiShi.tishi1 = '';
                        this.tiShi.tishi2 = '';
                        this.tiShi.tishi3 = '';
                        this.isReturn = false;
                        //字母开头 ，由字母+数字组成
                        var a=/^[A-Za-z][A-Za-z0-9]{5,11}$/;
                        if (!this.userInfo.oldPassword) {
                            this.isReturn = true;
                            this.tiShi.tishi1='老密码不能为空';
                        }
                        else if(!a.test(this.userInfo.oldPassword)){
                            this.isReturn = true;
                            this.tiShi.tishi1="由字母+数字组成，字母开头，6-12位"
                        }

                        //字母开头 ，由字母+数字组成
                        var p=/^[A-Za-z][A-Za-z0-9]{5,11}$/;
                        if (!this.userInfo.newPassword) {
                            this.isReturn = true;
                            this.tiShi.tishi2='密码不能为空';
                        }
                        else if(!p.test(this.userInfo.newPassword)){
                            this.isReturn = true;
                            this.tiShi.tishi2="由字母+数字组成，字母开头，6-12位"
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
                            this.tiShi.tishi3="由字母+数字组成，字母开头，6-12位"
                        }
                        if(this.userInfo.newPassword != this.userInfo.reNewPassword){
                            this.isReturn = true;
                            this.tiShi.tishi3='两次密码不一致';
                        }



                        //如果有这些提示就return
                        if (this.tiShi.tishi1 || this.tiShi.tishi2 ||this.tiShi.tishi3 ) return;
                        //if (this.isReturn) return;

                        this.userInfo.loginId= JSON.parse(localStorage.getItem("userInfo")).loginId;
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
                                if (res.data.success) {
                                    this.changePasswordLoading = false;
                                    this.$message({
                                        message: '修改密码成功',
                                        type: 'success'
                                    });
                                    this.changePasswordFormVisible = false;
                                }else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                    console.log(res);
                                }

                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                                console.log(res);
                            }
                        });
                });
            },
            getFile(event)
            {
                this.file.multipartFile = event.target.files[0];
                console.log(this.file.multipartFile);

            },
            fileSubmit() {
                this.$refs.file.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.fileLoading = true;
                            var formData = new FormData();

                            formData.append("multipartFile", this.file.multipartFile);
                            this.$axios.post(api.uploadPicture, formData, {
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
                                    var user = JSON.parse(localStorage.getItem("userInfo"));
                                    if (user) {

                                        this.portraitUrl =res.data.data;
                                        console.log(res.data.data);
                                        user.portraitUrl =this.portraitUrl;
                                        localStorage.setItem("userInfo",JSON.stringify(user));
                                    }
                                    this.$message({
                                        message: '上传头像成功',
                                        type: 'success'
                                    });
                                    this.fileFormVisible = false;
                                    this.reload();
                                } else {
                                    console.log(res);
                                }
                            });
                        });
                    }
                });
            },
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


        }
    }
</script>