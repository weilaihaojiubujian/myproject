<template>
    <div class="hello">
<!--        <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" top="0px">-->
            <el-form :model="user" label-width="80px" ref="user">
                <el-form-item label="真实姓名"  >
                    <el-input v-model="user.realName" placeholder="请输入真实姓名" auto-complete="off" @blur="a"></el-input>
                    <span class="tiShi">{{ tiShi.tishi1 }}</span><br>
                </el-form-item>
                <el-form-item label="身份证号"  >
                    <el-input  placeholder="请输入身份证号" v-model="user.certNo" @blur="b"></el-input>
                    <span class="tiShi">{{ tiShi.tishi2 }}</span><br>
                </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="validationUser" :loading="editLoading">实名认证</el-button>
            </div>
<!--        </el-dialog>-->
    </div>
</template>


<script>
    import api from '../../api.js';

    export default {
        data() {
            return {
                isReturn: false,
                btn:false,
                editFormVisible: true,//编辑界面是否显示
                editLoading: false,
                tiShi:{
                    tiShi1:'',
                    tishi2:'',
                    tishi3:'',
                    tishi5:''
                },
                user: {
                    realName:'',
                    certNo:''
                },
                showCard:false
            }
        },
        methods: {

            a(){
                this.tiShi.tishi1 = '';
                this.isReturn = true;
                if (!this.user.realName) this.tiShi.tishi1='姓名不能为空';

            },
            //密码
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
            validationUser() {

                this.$refs.user.validate((valid) => {
                    this.tiShi.tishi1 = '';
                    this.tiShi.tishi2 = '';
                    this.isReturn = false;

                    if (!this.user.realName)
                    {
                        this.tiShi.tishi1='姓名不能为空';
                        this.isReturn = true;
                    }

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
                    if (this.tiShi.tishi1 || this.tiShi.tishi2 ) return;
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            this.$axios.post(api.validationUser, JSON.stringify(this.user), {
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
                                    if (res.data.success) {
                                        this.$message({
                                            message: '提交成功',
                                            type: 'success'
                                        });

                                    } else {
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
                    }
                });

            }

        }
    }
</script>