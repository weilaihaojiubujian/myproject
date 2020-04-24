<template>
    <div style="height:500px;overflow:scroll;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item label="任务名" prop="name">
                    <el-input v-model="taskListRequest.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态"  >
                    <Select style="width:200px" v-model="taskListRequest.status">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value" >{{
                            item.label }}
                        </Option>
                    </Select>
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
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <Table border ref="selection"  @on-selection-change="handleSelectRow()" style="margin-top: 20px;"  no-data-text="暂无数据"
               :columns="columns4" :data="tdata2" highlight-row></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" top="0px">
            <el-form :model="task" label-width="80px"  ref="task">
                <el-form-item label="任务名" prop="name">
                    <el-input v-model="task.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务具体描述">
                    <el-input  type="textarea" v-model="task.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务完成时间">
                    <el-date-picker
                            v-model="task.estimatedTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible">
            <el-form :model="task" label-width="80px"  ref="task">
                <el-form-item label="任务名" prop="name">
                    <el-input v-model="task.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务具体描述">
                    <el-input  type="textarea" v-model="task.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务完成时间">
                    <el-date-picker
                            v-model="task.estimatedTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="任务种类" prop="name">
                    <Select style="width:200px" v-model="task.taskTypeId">
                        <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" >{{
                            item.label }}
                        </Option>
                    </Select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import api from "@/api";
    import utils from '@/components/utils/utils'

    export default {

        data() {
            return{
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
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
                taskTypeList: [
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
                task:{
                    id:'',
                    name:'',
                    description:'',
                    estimatedTime:'',
                    projectId:'',
                    status:''
                },
                taskListRequest: {
                    projectId: '',
                    name:'',
                    startTime:'',
                    endTime:'',
                    status:'',
                    taskTypeId:'',
                    pageNo: '',
                    pageSize: ''
                },
                statusList: [
                    {
                        value: '',
                        label: '请选择'
                    },
                    {
                        value: '1',
                        label: '未完成'
                    },
                    {
                        value: '3',
                        label: '完成'
                    }
                ],
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
                    {title: '任务截止时间',width:100,key:'estimatedTime',
                        render: (h, params) => {
                            return h('span', {}, params.row.estimatedTime = (!params.row.estimatedTime || params.row.estimatedTime == '') ? '' : utils.formatDate.format(new  Date(params.row.estimatedTime), 'yyyy-MM-dd'))
                        }
                    },
                    {title: '任务种类',width:100,key:'taskTypeName'},
                    // //  重点说明一下这里状态，我从后台获取 得到的是  3 2 1 这些数字，但是如何根据不同的数据显示不同的文字，
                    // //  需要用到render 这个函数
                    {title: '任务状态',key:'status',width:100,
                        //  这个地方直接复制，修改从后台获取的字段taOrdertype
                        render: (h, params) => {
                        if(params.row.status == '3') {
                            return h('span', {}, '完成')
                            //  中文就是显示在表格里面的数据
                        }else if(params.row.status == '1'){
                        return h('span',{},'未完成')
                    }
                    }
                    },
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
                                            this.handleEdit(params,params.index, params.row);
                                        }
                                    }
                                }, '编辑'),
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
                                }, '任务详情'),
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
                                            this.completeTask(params,params.index, params.row);
                                        }
                                    }
                                }, '完成任务')
                            ]);
                        }},
                ],

            }
        },
        methods: {

            // 获取历史记录信息
            getTaskList() {
                this.taskListRequest.projectId=this.$route.params.id;
                this.$axios.post(api.taskList, JSON.stringify(this.taskListRequest), {
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
                this.$axios.post(api.taskList, JSON.stringify(this.taskListRequest), {
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
                this.$router.push({ name:'任务信息', params:{id:this.task.id}});
            },
            //跳到完成任务
            completeTask(params,index, row) {
                this.task.id=params.row.id;
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.$axios.post(api.completeTask, JSON.stringify(this.task), {
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
                        if (res != null && res.status === 200) {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.getTaskList();
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                            console.log(res);
                        }

                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                        console.log(res);
                    }
                });
                });
            },
            select () {

                this.$axios.post(api.taskList, JSON.stringify(this.taskListRequest), {
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
            //显示编辑界面
            handleEdit (params,index, row) {
                this.task.id=params.row.id;
                console.log(this.task.id);
                this.editFormVisible = true;
                this.task = Object.assign({}, row);
                this.task.estimatedTime = (!this.task.estimatedTime || this.task.estimatedTime == '') ? '' : utils.formatDate.format(new  Date(this.task.estimatedTime), 'yyyy-MM-dd');
                console.log(this.task);
            },
            //显示新增界面
            handleAdd () {
                this.addFormVisible = true;
                this.task= {
                    name:'',
                    description:'',
                    estimatedTime:''
                };

            },
            //编辑
            editSubmit () {
                this.$refs.task.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            this.task.projectId=this.taskListRequest.projectId;
                            this.task.estimatedTime = (!this.task.estimatedTime || this.task.estimatedTime == '') ? '' : utils.formatDate.format(new  Date(this.task.estimatedTime), 'yyyy-MM-dd');
                            this.$axios.post(api.editTask, JSON.stringify(this.task), {
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
                                        if (res != null && res.status === 200) {
                                            this.editLoading = false;
                                            //NProgress.done();
                                            this.$message({
                                                message: '提交成功',
                                                type: 'success'
                                            });
                                            this.$refs['task'].resetFields();
                                            this.editFormVisible = false;

                                        } else {
                                            console.log(res);
                                        }

                                } else {
                                    console.log(res);
                                }
                                alert(res.data.msg);
                            });
                        });
                    }
                });
            },

            //新增
            addSubmit() {
                this.$refs.task.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            this.task.projectId=this.taskListRequest.projectId;
                            this.task.estimatedTime = (!this.task.estimatedTime || this.task.estimatedTime == '') ? '' : utils.formatDate.format(new  Date(this.task.estimatedTime), 'yyyy-MM-dd');
                            this.$axios.post(api.createTask, JSON.stringify(this.task), {
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
                                        if (res != null && res.status === 200) {
                                            this.addLoading = false;
                                            //NProgress.done();
                                            this.$message({
                                                message: '提交成功',
                                                type: 'success'
                                            });
                                            this.$refs['task'].resetFields();
                                            this.addFormVisible = false;
                                        } else {
                                            console.log(res);
                                        }
                                } else {
                                    console.log(res);
                                }
                            });
                        });
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
            this.getTaskList();
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