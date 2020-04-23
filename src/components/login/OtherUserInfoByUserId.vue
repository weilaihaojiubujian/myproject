<template>
    <div class="hello">
        <div v-if="showCard">
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
                <el-form-item>

                    <el-button  type="primary" @click="handleEvaluation">查看评价列表</el-button>
                </el-form-item>
            </el-form>
        </div>
        <hr>

    </div>
</template>


<script>
    import api from '../../api.js';

    export default {
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
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                userRequest: {
                    projectId: ''
                },
                userResponse: {
                    id: '',
                    loginId: '',
                    userId: '',
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
                showCard:false
            }
        },
        mounted(){   //页面初始化方法
            this.getOtherUserInfoByUserId();
        },
        methods: {

            getOtherUserInfoByUserId() {
                this.userRequest.userId=this.$route.params.userId;
                this.$axios.post(api.otherUserInfoByUserId, JSON.stringify(this.userRequest), {
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
            //查看评价列表
            handleEvaluation() {
                console.log(this.userResponse.userId);
                this.$router.push({ name:'用户评价列表', params:{userId:this.userResponse.userId}});
            }

        }
    }
</script>