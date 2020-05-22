<template>
    <div style="height:500px;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item label="项目名" prop="name">
                    <el-input v-model="projectListRequest.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="name">
                    <el-input v-model="projectListRequest.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目完成开始时间">
                    <el-date-picker
                            v-model="projectListRequest.startTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="项目完成结束时间">
                    <el-date-picker
                            v-model="projectListRequest.endTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <!--                    <el-button type="primary" v-on:click="getUsers">查询</el-button>-->
                    <el-button type="primary" @click="select">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <Table border ref="selection"  @on-selection-change="handleSelectRow()" style="margin-top: 20px;"  no-data-text="暂无数据"
               :columns="columns4" :data="tdata2" highlight-row></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>



    </div>
</template>
<script>
    import api from "@/api";
    import signature from "@/components/login/Signature";
    import utils from "@/components/utils/utils";


    export default {

        data() {
            return{
                fileFormVisible: false,//文件界面是否显示
                fileLoading: false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                project:{
                    id:'',
                    name:'',
                    description:'',
                    price:'',
                    url:'',
                    multipartFile:'',
                    userId: '',
                    fileName:''
                },

                projectListRequest: {
                    name:'',
                    userId: '',
                    startTime: '',
                    endTime: '',
                    pageNo: '',
                    pageSize: ''
                },
                deleteProjectRequest: {
                    id: ''
                },
                userId: '',
                ajaxHistoryData: [],
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                historyData: [],
                tdata2: [],
                columns4: [
// 重点说明：key 里面的值，是和后台的字段相对应的
                    {title: '项目id',width:100,key: 'id'},
                    {title: '项目名',width:100,key: 'name'},
                    {title: '创建者',width:100,key:'userId'},
                    {title: '价格',width:100,key:'price'},
                    {title: '完成时间',width:100,key:'gmtModified',
                        render: (h, params) => {
                            return h('span', {}, params.row.gmtModified = (!params.row.gmtModified || params.row.gmtModified == '') ? '' : utils.formatDate.format(new Date(params.row.gmtModified), 'yyyy-MM-dd'))
                        }
                    },
                    // //  重点说明一下这里状态，我从后台获取 得到的是  3 2 1 这些数字，但是如何根据不同的数据显示不同的文字，
                    // //  需要用到render 这个函数
                    // {title: '状态',key:'taOrdertype',width:100,
                    //     //  这个地方直接复制，修改从后台获取的字段taOrdertype
                    //     render: (h, params) => {
                    //     if(params.row.taOrdertype == '3'){
                    //     return h('span',{},'已发包')
                    // //  中文就是显示在表格里面的数据
                    //
                    // // 如果这里需要改变颜色，可以参考官网，复制style ,放在{} 这里面
                    // }else if(params.row.taOrdertype == '2'){
                    //     return h('span',{},'已申请发包')
                    // }else if(params.row.taOrdertype == '1'){
                    //     return h('span',{},'未申请发包')
                    // }
                    // }
                    // },
                    {title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '3px'
                                    },
                                    on: {
                                        click: () => {
                                            this.projectInfo(params,params.index, params.row);
                                        }
                                    }
                                }, '项目详情')

                            ]);


                        }},
                ],

            }
        },
        methods: {

            // 获取历史记录信息
            getCompleteProjectList() {

                this.$axios.post(api.completeProjectList, JSON.stringify(this.projectListRequest), {
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
                            this.userId=localStorage.getItem("userId");
                            console.log(this.userId);
                            // 保存取到的所有数据
                            this.ajaxHistoryData =res.data.data.list;
                            this.dataCount = res.data.data.count;
                            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                            if (this.dataCount < this.pageSize) {
                                this.tdata2 = this.ajaxHistoryData;
                            } else {
                                this.tdata2 = this.ajaxHistoryData.slice(0, this.pageSize);
                            }
                        } else {
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });



            },
            changepage(index) {
                // var _start = (index - 1) * this.pageSize;
                // var _end = index * this.pageSize;
                // this.tdata2 = this.ajaxHistoryData.slice(_start, _end);
                this.projectListRequest.pageNo=index;
                this.$axios.post(api.completeProjectList, JSON.stringify(this.projectListRequest), {
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
                            this.userId=localStorage.getItem("userId");
                            console.log(this.userId);
                            // 保存取到的所有数据
                            this.ajaxHistoryData =res.data.data.list;
                            this.dataCount = res.data.data.count;
                            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                            if (this.dataCount < this.pageSize) {
                                this.tdata2 = this.ajaxHistoryData;
                            } else {
                                this.tdata2 = this.ajaxHistoryData.slice(0, this.pageSize);
                            }
                        } else {
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });
            },
            //跳到项目详情页
            projectInfo(params,index, row) {
                this.project.id=params.row.id;
                console.log(this.project.id);
                this.$router.push({ name:'审核项目详情', params:{id:this.project.id}});
            },



            select () {
                this.$axios.post(api.completeProjectList, JSON.stringify(this.projectListRequest), {
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
                            this.userId=localStorage.getItem("userId");
                            console.log(this.userId);
                            // 保存取到的所有数据
                            this.ajaxHistoryData =res.data.data.list;
                            this.dataCount = res.data.data.count;
                            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                            if (this.dataCount < this.pageSize) {
                                this.tdata2 = this.ajaxHistoryData;
                            } else {
                                this.tdata2 = this.ajaxHistoryData.slice(0, this.pageSize);
                            }
                        } else {
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });

            },
            handleSelectRow(){
                //这里是获取点击的这一行的数据，
                const a = this.$refs.selection.getSelection()
                console.log(a);
                // 不明白是什么自己打印一下
                //下面 的代码就是根据这一条数据，for循环是为了获取它的id  （这里根据自己的要求来定）
                // 涉及到多条数据的查询，后台给我的要求每个id 之间是用 ' , ' 隔开，所以我直接把当前的id 和 之前的获取到的id 一并放到一起
                // 出现的就是   1111,2222,3333,4444,
                //     然后在for外面拿一个变量接收这个b      ~ 感觉表达不太对
                var b = '';
                for(var i  = 0;i <a.length;i++ ){
                    this.daifaid = a[i].id
                    if(a.length > 1){
                        b  = this.daifaid +','+ b
                    }else{
                        b  = this.daifaid
                    }
                }
                this.daifaid = b
                console.log(this.daifaid);
            }

        },
        created() {
            this.getCompleteProjectList();
        }


    };
</script>
<style>

    .ivu-table-row-hover td {
        background-color: #d63333!important;
    }
    .ivu-table-row-highlight td {
        background-color: #d63333!important;
    }

</style>
