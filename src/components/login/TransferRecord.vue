<template>
    <div style="height:500px;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item label="时间">
                    <el-date-picker
                            v-model="transferRecordRequest.gmtCreate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM"
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
    import utils from "@/components/utils/utils";


    export default {

        data() {
            return{
                transferRecord:{
                    id:'',
                    payUserId:'',
                    receiveUserId:'',
                    price:'',
                    state:'',
                    gmtCreate:'',
                    gmtModified:'',
                    type:''
                },
                userInfo: {
                    loginId: '',
                    password: ''
                },
                transferRecordRequest: {
                    gmtCreate: '',
                    pageNo: '',
                    pageSize: ''
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
                    {title: '转账id',width:170,key: 'id'},
                    {title: '支付者',width:100,key: 'payUserId'},
                    {title: '接收者',width:100,key:'receiveUserId'},
                    {title: '金额',key:'price',width:100,
                        //  这个地方直接复制，修改从后台获取的字段taOrdertype
                        render: (h, params) => {
                            if(params.row.receiveUserId == this.userId && params.row.type != '1'){
                                return h('span',{},'+'+params.row.price)
                                //  中文就是显示在表格里面的数据

                                // 如果这里需要改变颜色，可以参考官网，复制style ,放在{} 这里面
                            }else if(params.row.payUserId == this.userId){
                                return h('span',{},'-'+params.row.price)
                            }
                        }
                    },
                    // //  重点说明一下这里状态，我从后台获取 得到的是  3 2 1 这些数字，但是如何根据不同的数据显示不同的文字，
                    // //  需要用到render 这个函数
                    {title: '支付状态',key:'state',width:100,
                        //  这个地方直接复制，修改从后台获取的字段taOrdertype
                        render: (h, params) => {
                        if(params.row.state == '0'){
                        return h('span',{},'未支付')
                    //  中文就是显示在表格里面的数据

                    // 如果这里需要改变颜色，可以参考官网，复制style ,放在{} 这里面
                    }else if(params.row.state == '1'){
                        return h('span',{},'支付成功')
                    }else if(params.row.state == '3'){
                            return h('span',{},'等待项目完成')
                     }
                    else if(params.row.state == '2'){
                        return h('span',{},'删除')
                    }
                    }
                    },
                    {title: '支付时间',width:100,key:'gmtModified',
                        render: (h, params) => {
                            return h('span', {}, params.row.gmtModified = (!params.row.gmtModified || params.row.gmtModified == '') ? '' : utils.formatDate.format(new  Date(params.row.gmtModified), 'yyyy-MM-dd'))
                        }
                    },
                ],

            }
        },
        methods: {
            // 获取历史记录信息
            getTransferRecord() {
                this.$axios.post(api.transferRecord, JSON.stringify(this.transferRecordRequest), {
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
                this.transferRecordRequest.pageNo=index;
                this.$axios.post(api.transferRecord, JSON.stringify(this.transferRecordRequest), {
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
            select () {

                this.$axios.post(api.transferRecord, JSON.stringify(this.transferRecordRequest), {
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
            this.getTransferRecord();
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