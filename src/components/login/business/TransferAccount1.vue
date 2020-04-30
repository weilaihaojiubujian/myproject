<template>
    <div class="hello">
        <div >
            <el-form :model="user" label-width="80px" ref="user">
                <el-form-item label="用户账号"  >
                    <el-input v-model="user.userId"  ></el-input>
                </el-form-item>
                <el-form-item label="金额"  >
                    <el-input v-model="user.price"  @keyup="user.price=(user.price).replace(/\D/g,'')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="transferAccount">转账</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>


<script>
    import api from "@/api";

    export default {
        data() {
            return {
                isReturn: false,
                btn:false,
                user: {
                    userId: '',
                    price:''
                },
                showCard:false
            }
        },
        methods: {


            transferAccount() {

                this.$axios.post(api.transferAccount, JSON.stringify(this.user), {
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
                        this.$message({
                            message: '转账成功',
                            type: 'success'
                        });
                        this.$router.push( '/business/userInfo')
                    } else {
                        this.$message({
                            message: '转账失败',
                            type: 'error'
                        });
                        console.log(res);
                    }
                });
            }

        }
    }
</script>