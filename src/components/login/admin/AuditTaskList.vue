<template>
    <div style="height:500px;overflow:scroll;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item label="项目名" prop="name">
                    <el-input v-model="taskListRequest.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="taskListRequest.startTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="taskListRequest.endTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="任务种类" prop="name">
                    <Select style="width:200px" v-model="taskListRequest.taskTypeId">
                        <Option v-for="item in taskTypeIdList" :value="item.value" :key="item.value" >{{
                            item.label }}
                        </Option>
                    </Select>
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
    import utils from '@/components/utils/utils'

    export default {

        data() {
            return{

                task:{
                    id:'',
                    name:'',
                    description:'',
                    estimatedTime:'',
                    projectId:''
                },
                taskTypeIdList: [
                    {
                        value: '',
                        label: '请选择'
                    },
                    {
                        value: '1',
                        label: '需求分析'
                    },
                    {
                        value: '2',
                        label: '原型设计'
                    },
                    {
                        value: '3',
                        label: '文档编写'
                    },
                    {
                        value: '4',
                        label: '编码开发'
                    },
                    {
                        value: '5',
                        label: '测试代码'
                    },
                    {
                        value: '6',
                        label: '修复bug'
                    }
                ],
                taskListRequest: {
                    projectId: '',
                    name:'',
                    startTime:'',
                    endTime:'',
                    taskTypeId:'',
                    pageNo: '',
                    pageSize: ''
                },
                ajaxHistoryData: [],
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                historyData: [],
                tdata2: [],
                columns4: [
// 重点说明：key 里面的值，是和后台的字段相对应的
                    {title: '任务id',width:170,key: 'id'},
                    {title: '任务名',width:100,key: 'name'},
                    {title: '具体描述',width:200,key:'description'},
                    {title: '任务种类',width:100,key:'taskTypeName'},
                    {title: '任务截止时间',width:100,key:'estimatedTime',
                        render: (h, params) => {
                            return h('span', {}, params.row.estimatedTime = (!params.row.estimatedTime || params.row.estimatedTime == '') ? '' : utils.formatDate.format(new  Date(params.row.estimatedTime), 'yyyy-MM-dd'))
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
                                    //  这里就是给表格里面添加一个操作，删除编辑添加啥的，就是在这里了
                                    //  this.Editadd(params.index)      这个是自己取得一个定义的一个方法，我的是编辑，弹出一个框进行编辑
                                    //  里面传 params.index   是当前的下标
                                    on: {
                                        click: () => {
                                            this.auditSuccess(params,params.index, params.row);
                                        }
                                    }
                                }, '审核通过'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '3px'
                                    },
                                    //  这里就是给表格里面添加一个操作，删除编辑添加啥的，就是在这里了
                                    //  this.Editadd(params.index)      这个是自己取得一个定义的一个方法，我的是编辑，弹出一个框进行编辑
                                    //  里面传 params.index   是当前的下标
                                    on: {
                                        click: () => {
                                            this.auditFail(params,params.index, params.row);
                                        }
                                    }
                                }, '审核拒绝'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '3px'
                                    },
                                    //  这里就是给表格里面添加一个操作，删除编辑添加啥的，就是在这里了
                                    //  this.Editadd(params.index)      这个是自己取得一个定义的一个方法，我的是编辑，弹出一个框进行编辑
                                    //  里面传 params.index   是当前的下标
                                    on: {
                                        click: () => {
                                            this.taskInfo(params,params.index, params.row);
                                        }
                                    }
                                }, '任务详情')
                            ]);
                        }},
                ],

            }
        },
        methods: {

            // 获取历史记录信息
            getAuditTaskList() {
                this.$axios.post(api.auditTaskList, JSON.stringify(this.taskListRequest), {
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
                this.taskListRequest.pageNo=index;
                this.$axios.post(api.auditTaskList, JSON.stringify(this.taskListRequest), {
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
            select () {

                this.$axios.post(api.auditTaskList, JSON.stringify(this.taskListRequest), {
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
            //跳到任务详情页
            taskInfo(params,index, row) {
                this.task.id=params.row.id;
                console.log(this.task.id);
                this.$router.push({ name:'审核任务信息', params:{id:this.task.id}});
            },
            //审核失败
            auditFail (params,index, row) {
                this.task.id=params.row.id;
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.task.status = 2;
                    this.$axios.post(api.auditTask, JSON.stringify(this.task), {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        withCredentials: true,
                        params: {
                            openid: localStorage.getItem("openid")
                        }
                    }).then(res => {
                        if (res != null && res.status === 200) {
                            if (res != null && res.status === 200) {
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.getAuditTaskList();
                            } else {
                                console.log(res);
                            }
                            alert(res.data.msg);
                        }
                    });
                });
            },
            //审核成功
            auditSuccess (params,index, row) {
                this.task.id=params.row.id;
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.task.status = 1;
                    this.$axios.post(api.auditTask, JSON.stringify(this.task), {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        withCredentials: true,
                        params: {
                            openid: localStorage.getItem("openid")
                        }
                    }).then(res => {
                        if (res != null && res.status === 200) {
                            if (res != null && res.status === 200) {
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.getAuditTaskList();
                            } else {
                                console.log(res);
                            }
                            alert(res.data.msg);
                        }
                    });
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
            this.getAuditTaskList();
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
