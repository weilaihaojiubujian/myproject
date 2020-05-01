<template>
    <div style="height:500px;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item>
                    <!--                    <el-button type="primary" v-on:click="getUsers">查询</el-button>-->
                    <el-button type="primary" >查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <Table border ref="selection"  @on-selection-change="handleSelectRow()" style="margin-top: 20px;" :columns="columns4" :data="tdata2"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>

        <el-dialog title="上传文件" v-model="editFormVisible" :visible.sync="editFormVisible">
            <el-form :model="bannedUserRequest" label-width="80px"  ref="bannedUserRequest">
                <el-form-item label="封禁用户时间" prop="name">
                    <Select style="width:200px" v-model="bannedUserRequest.second">
                        <Option v-for="item in timeList" :value="item.value" :key="item.value" >{{
                            item.label }}
                        </Option>
                    </Select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="bannedUserSubmit" :loading="editLoading">提交</el-button>
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
                name:'',
                timeList: [
                    {
                        value: '3600',
                        label: '1小时'
                    },
                    {
                        value: '10800',
                        label: '3小时'
                    },
                    {
                        value: '21600',
                        label: '6小时'
                    },
                    {
                        value: '43200',
                        label: '12小时'
                    },
                    {
                        value: '86400',
                        label: '一天'
                    }
                ],
                auditUserListRequest: {
                    pageNo: '',
                    pageSize: ''
                },
                bannedUserRequest: {
                    second: '',
                    description: '',
                    userId: ''
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
                    {title: '用户id',width:170,key: 'userId'},
                    {title: '登陆名',width:100,key: 'loginId'},
                    {title: '手机号',width:100,key:'phone'},
                    {title: '角色',width:100,key:'roleName'},
                    {title: '评价',width:100,key:'evaluation'},
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
                                            this.bannedUser(params,params.index, params.row);
                                        }
                                    }
                                }, '封禁用户'),
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
                                            this.viewUser(params,params.index, params.row);
                                        }
                                    }
                                }, '查看用户信息')

                            ]);
                        }},
                ],

            }
        },
        methods: {

            // 获取历史记录信息
            getAuditUserList() {
                this.$axios.post(api.auditUserList, JSON.stringify(this.auditUserListRequest), {
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
                this.auditUserListRequest.pageNo=index;
                this.$axios.post(api.auditUserList, JSON.stringify(this.auditUserListRequest), {
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
            bannedUserSubmit(){
                for(var i = 0;i<this.timeList.length;i++){
                    //将第i个数组中的artists数组放入tempObj中
                    if(this.bannedUserRequest.second==this.timeList[i].value){
                        this.bannedUserRequest.description=this.timeList[i].label;
                    }
                }
                this.$confirm('确认封禁该用户吗？', '提示', {}).then(() => {
                    this.$axios.post(api.bannedUser, JSON.stringify(this.bannedUserRequest), {
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
                            this.editLoading = false;
                            if (res.data.success) {
                                //NProgress.done();
                                this.$message({
                                    message: '封禁用户成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                                console.log(res);
                            }
                        }
                        else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                            console.log(res);
                        }
                    });
                });
            },
            bannedUser(params,index, row) {
                this.bannedUserRequest.userId=params.row.userId;
                this.editFormVisible = true;

            },
            viewUser(params,index, row){
                this.bannedUserRequest.userId=params.row.userId;
                console.log(this.bannedUserRequest.userId);
                this.$router.push({ name:'查看其它用户信息', params:{userId:this.bannedUserRequest.userId}});
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
            this.getAuditUserList();
        }


    };
</script>
