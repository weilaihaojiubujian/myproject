<template>
    <div class="hello">
        <div >
            <el-form :model="user" label-width="80px" ref="user">
                <el-form-item label="金额"  >
                    <el-input v-model="user.price"  @keyup="user.price=(user.price).replace(/\D/g,'')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="recharge">充值</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                    price:''
                },
                showCard:false
            }
        },

        methods: {


            recharge() {

                this.$axios.post(api.recharge, JSON.stringify(this.user), {
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
                        this.$axios.get(api.goAlipay,{
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            withCredentials: true,
                            params:{
                                openid: localStorage.getItem("openid")
                            }

                        }).then(res => {
                            console.log(res);
                            console.log(res.data);
                            // let routeData = this.$router.resolve({ path: 'goAlipay/${userId}', query: { htmls: res.data.data }});
                             this.$router.push({name: 'goAlipay',params:{ htmls: res.data }});
                            // this.$router.push({ name:'goAlipay', params:{htmls:this.project.id}});
                            // let routeData = this.$router.resolve({ path: '/goAlipay', query: { htmls: res.data.data }});
                            // window.open(routeData.href, '_blank');


                            // localStorage.removeItem('callbackHTML');
                            // localStorage.setItem('callbackHTML',res.data.data);
                            // window.open('callBack.html')
                            // window.location.href = 'callBack.html';



                        });

                    } else {
                        console.log(res);
                    }
                });
            }

        }
    }
</script>