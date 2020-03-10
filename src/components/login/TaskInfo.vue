<template>
    <div class="hello">
        <div v-if="showCard">
            {{task}}
        </div>
        <hr>
        <button @click="projectList">项目列表</button>
    </div>
</template>


<script>
    import api from '../../api.js';
    import Cookies from 'js-cookie'
    import createProject from "@/components/login/CreateProject";
    import utils from "@/components/utils/utils";
    export default {
        data() {
            return {

                task:{
                    id:'',
                    name:'',
                    description:'',
                    estimatedTime:'',
                    projectId:'',
                    gmtCreate:'',
                    gmtModified:'',
                    status:''
                },
                showCard:false
            }
        },

        methods: {

            projectList() {
                this.$router.push( '/projectList')
            },
            taskInfo() {
                this.task.id=this.$route.params.id;
                this.$axios.post(api.taskInfo, JSON.stringify(this.task), {
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
                            this.task = res.data.data;
                            this.task.estimatedTime = (!this.task.estimatedTime || this.task.estimatedTime == '') ? '' : utils.formatDate.format(new  Date(this.task.estimatedTime), 'yyyy-MM-dd');
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
            this.taskInfo();
        }
    }
</script>