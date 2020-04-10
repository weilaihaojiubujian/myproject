<template>
    <div class="hello">
        <div >

                <label>用户账号</label><el-input  v-model="user.userId"  ></el-input>
                <label>金额</label><el-input  v-model="user.price"  ></el-input>

        </div>
        <hr>
        <button @click="transferAccount">转账</button>
    </div>
</template>


<script>
    import api from '../../api.js';

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
                        this.$router.push( '/userInfo')
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