<template>
    <div class="hello">
        <div>
            {{userResponse}}
        </div>
        <hr>
        <button @click="getUserInfo">点击获取数据</button>
    </div>
</template>


<script>

    import api from '../../api.js';
    import Cookies from 'js-cookie'
    export default {


        data() {
            return {
                userRequest: {
                    email: '',
                    password: ''
                },
                userResponse: {
                    id: '',
                    loginId: '',
                    roleName: '',
                    phone: '',
                    lastName: '',
                    firstName: '',
                    sex: '',
                    certType: '',
                    certNo: '',
                    nation: '',
                    money: '',
                    email: ''
                }
            }
        },
        created () {
          this.getUserInfo;
        },

        methods: {
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
                        this.userResponse = res.data.data;
                        // this.$axios.get(api.userUrl, {
                        //     headers: {
                        //         'Authorization': localStorage.getItem('token')
                        //     }
                        // }).then(res => {
                        //     let obj = res.data;
                        //     if (obj.role.filter(r => r === 'ROLE_ADMIN').length === 0) {
                        //         this.$message({
                        //             type: 'warning',
                        //             message: '权限不够'
                        //         })
                        //     } else {
                        //         localStorage.setItem('user', JSON.stringify(res.data));
                        //         this.$router.replace('/');
                        //     }
                        // });

                    } else {
                        console.log(res);
                    }
                    alert(res.data);
                    alert(res.data.msg);
                });
            },
            register(){

                this.$router.push( '/register')

            }
        }
    }
</script>