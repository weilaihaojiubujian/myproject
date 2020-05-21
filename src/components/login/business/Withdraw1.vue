<template>
    <div class="hello">
        <div >
            <el-form :model="user" label-width="80px" ref="user">
                <el-form-item label="金额"  >
                    <el-input v-model="user.price"  @keyup="user.price=(user.price).replace(/\D/g,'')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="withdraw">提现</el-button>
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
                    price:''
                },
                showCard:false
            }
        },
        methods: {


            withdraw() {

                this.$axios.post(api.withdraw, JSON.stringify(this.user), {
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
                        this.$axios.get(api.goWithdraw,{
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
                                    this.$message({
                                        message: '提现成功',
                                        type: 'success'
                                    });
                                    this.$router.push( '/business/userInfo')

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
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                        console.log(res);
                    }
                });
            }

        }
    }
</script>