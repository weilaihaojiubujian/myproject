<template>
    <div class="hello">
        <div v-if="showCard">
            {{project}}

        </div>
        <hr>
        <button @click="changepasswd">修改密码</button>
        <button @click="createProject">创建项目</button>
        <button @click="projectList">项目列表</button>
        <button @click="handleEdit">查看文件</button>
    </div>
</template>


<script>
    import api from '../../api.js';
    import Cookies from 'js-cookie'
    import createProject from "@/components/login/CreateProject";
    export default {
        data() {
            return {

                project:{
                    id:'',
                    name:'',
                    description:'',
                    price:'',
                    url:'',
                    gmtCreate:'',
                    gmtModified:'',
                    userId:''
                },
                showCard:false
            }
        },

        methods: {
            handleEdit() {

                    // 不是pdf格式
                    window.open(
                        "https://view.officeapps.live.com/op/view.aspx?src=" + this.project.url
                    );

            },
            changepasswd() {
                this.$router.push( '/changePassword')
            },
            createProject() {
                this.$router.push( '/createProject')
            },
            projectList() {
                this.$router.push( '/projectList')
            },
            projectInfo() {
                this.project.id=this.$route.params.id;
                this.$axios.post(api.projectInfo, JSON.stringify(this.project), {
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
                            this.showCard = true;
                            this.project = res.data.data;
                        } else {
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });


            }

        }
        ,
        created() {
            this.projectInfo();
        }
    }
</script>