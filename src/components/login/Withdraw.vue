<template>
    <div class="hello">
        <div >
            <el-input v-model="user.price"  ></el-input>
        </div>
        <hr>
        <button @click="withdraw">提现</button>
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

                        this.$router.push( '/userInfo')
                    } else {
                        console.log(res);
                    }
                });
            }

        }
    }
</script>