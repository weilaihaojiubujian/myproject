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
        <Table border    style="margin-bottom: 20px;" :columns="columns4" :data="tdata2"></Table>
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
                showCard:false,
                // 初始化信息总条数
                tdata2: [],
                columns4: [
// 重点说明：key 里面的值，是和后台的字段相对应的
                    {title: '用户id',width:170,key: 'userId'},
                    {title: '状态',key:'type',width:100,
                        //  这个地方直接复制，修改从后台获取的字段taOrdertype
                        render: (h, params) => {
                            if(params.row.type == '1'){
                                return h('span',{},'创建项目')
                                //  中文就是显示在表格里面的数据

                                // 如果这里需要改变颜色，可以参考官网，复制style ,放在{} 这里面
                            }else if(params.row.type == '2'){
                                return h('span',{},'编辑项目')
                            }else if(params.row.type == '3'){
                                return h('span',{},'接受项目')
                            } else if(params.row.type == '4'){
                                return h('span',{},'删除项目')
                            }
                        }
                    },
                    {title: '编辑时间',width:100,key:'gmtCreate',
                        render: (h, params) => {
                            return h('span',{}, (!params.row.gmtCreate || params.row.gmtCreate == '') ? '' : utils.formatDate.format(new  Date(params.row.gmtCreate), 'yyyy-MM-dd'))

                        }
                    },
                ],
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

                            this.ajaxHistoryData =res.data.data.recordList;
                            this.tdata2 = this.ajaxHistoryData;
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