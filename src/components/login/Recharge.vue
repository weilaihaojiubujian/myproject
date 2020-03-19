<template>
    <div class="hello">
        <div >
            <el-input v-model="user.price"  ></el-input>
        </div>
        <hr>
        <button @click="recharge">充值</button>
    </div>
</template>


<script>
    import api from '../../api.js';
    import Cookies from 'js-cookie'
    import createProject from "@/components/login/CreateProject";
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