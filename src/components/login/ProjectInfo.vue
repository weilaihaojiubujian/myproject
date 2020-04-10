<template>
    <div class="hello">
        <div v-if="showCard">
            <el-form :model="project"  >
                <el-form-item label="项目id"  >
                    {{project.id}}
                </el-form-item>
                <el-form-item label="项目名"  >
                    {{project.name}}
                </el-form-item>
                <el-form-item label="项目具体描述"  >
                    {{project.description}}
                </el-form-item>
                <el-form-item label="项目价格"  >
                    {{project.price}}
                </el-form-item>
                <el-form-item label="创建时间"  >
                    {{project.gmtCreate}}
                </el-form-item>
                <el-form-item label="修改时间"  >
                    {{project.gmtModified}}
                </el-form-item>
                <el-form-item label="项目状态"  >
                    <template v-if="project.status=='1'">
                        未完成
                    </template>
                    <template v-else>
                        已完成
                    </template>
                </el-form-item>
                <el-form-item label="创建者"  >
                    {{project.userId}}
                </el-form-item>
            </el-form>
        </div>
        <hr>
        <button @click="handleEdit">查看需求文件</button>
        <br />
        <br /><strong><label>日志</label></strong>
        <Table border    style="margin-bottom: 20px;" :columns="columns4" :data="tdata2"></Table>
    </div>
</template>


<script>
    import api from '../../api.js';
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
                    userId:'',
                    status:''
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
                            this.project.gmtCreate=(!this.project.gmtCreate || this.project.gmtCreate == '') ? '' : utils.formatDate.format(new  Date(this.project.gmtCreate), 'yyyy-MM-dd');
                            this.project.gmtModified=(!this.project.gmtModified || this.project.gmtModified == '') ? '' : utils.formatDate.format(new  Date(this.project.gmtModified), 'yyyy-MM-dd');
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