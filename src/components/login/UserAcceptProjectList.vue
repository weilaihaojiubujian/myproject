<template>
    <div style="height:500px;overflow:scroll;">
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

        <el-dialog title="上传文件" v-model="fileFormVisible" :visible.sync="fileFormVisible">
            <el-form :model="project" label-width="80px"  ref="project">
                <el-form-item label="文件">
                    <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" accept=".zip,.rar" ><br>
                    <!--                    <el-input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input"  ></el-input>-->
                    <a>只支持.zip,.rar</a><br />
                </el-form-item>
                <el-form-item label="文件名">
                    <el-input type="textarea" v-model="project.fileName" @change="getZipFileName"></el-input>
                    <a>文件名需要加后缀</a><br />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fileFormVisible = false">取消</el-button>
                <el-button type="primary" @click="fileSubmit" :loading="fileLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import api from "@/api";


    export default {

        data() {
            return{
                fileFormVisible: false,//文件界面是否显示
                fileLoading: false,
                project:{
                    id:'',
                    name:'',
                    description:'',
                    price:'',
                    url:'',
                    multipartFile:'',
                    fileName:''
                },

                projectListRequest: {
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
                    {type: 'selection',width: 60,align: 'center'},  //这里是复选框
                    {title: '项目id',width:100,key: 'id'},
                    {title: '项目名',width:100,key: 'name'},
                    {title: '创建者',width:100,key:'userId'},
                    {title: '价格',width:100,key:'price'},
                    {title: '完成进度',width:100,key:'progress'},
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
                                }, '项目详情'),
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
                                            this.taskList(params,params.index, params.row);
                                        }
                                    }
                                }, '任务列表')
                                ,
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
                                            this.getFileList(params,params.index, params.row);
                                        }
                                    }
                                }, '项目文件列表'),
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
                                            this.handleFile(params,params.index, params.row);
                                        }
                                    }
                                }, '上传项目代码')
                            ]);
                        }},
                ],

            }
        },
        methods: {
            getFile(event){
                // var file = event.target.files;
                // console.log(file);
                // this.project.multipartFile=file;
                // this.file.multipartFile = event.target.file;
                this.project.multipartFile = event.target.files[0];
                console.log(this.project.multipartFile);
                // let extName = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf(".")).toLowerCase();
                // let AllUpExt = ".rar|.zip|.doc|.docx|.xls|.xlsx|.pdf|";
                // if(AllUpExt.indexOf(extName + "|") == "-1"){
                //     this.$message(this, "error", "文件格式不正确!");
                // }else{
                //     // 操作
                // }

            },
            getFileName(){
                var index= this.project.fileName.lastIndexOf(".");
                //获取后缀
                var ext = this.project.fileName.substr(index+1);
                let AllUpExt = ".doc|.docx|";
                if(AllUpExt.indexOf(ext+ "|") == "-1"){
                    // this.$message(this, "error", "文件格式不正确!");
                    this.$message({
                        message: '文件格式不正确',
                        type: 'error'
                    });
                }else{
                    // 操作
                    this.$message({
                        message: '文件格式正确',
                        type: 'success'
                    });
                }
            },
            getZipFileName(){
                var index= this.project.fileName.lastIndexOf(".");
                //获取后缀
                var ext = this.project.fileName.substr(index+1);
                let AllUpExt = ".zip|.rar|";
                if(AllUpExt.indexOf(ext+ "|") == "-1"){
                    // this.$message(this, "error", "文件格式不正确!");
                    this.$message({
                        message: '文件格式不正确',
                        type: 'error'
                    });
                }else{
                    // 操作
                    this.$message({
                        message: '文件格式正确',
                        type: 'success'
                    });
                }
            },
            // 获取历史记录信息
            getUserAcceptProjectList() {

                this.$axios.post(api.userAcceptProjectList, JSON.stringify(this.projectListRequest), {
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
                var _start = (index - 1) * this.pageSize;
                var _end = index * this.pageSize;
                this.tdata2 = this.ajaxHistoryData.slice(_start, _end);
            },
            //跳到项目详情页
            projectInfo(params,index, row) {
                this.project.id=params.row.id;
                console.log(this.project.id);
                this.$router.push({ name:'项目详情', params:{id:this.project.id}});
            },
            taskList(params,index, row) {
                this.project.id=params.row.id;
                console.log(this.project.id);
                this.$router.push({ name:'任务列表', params:{id:this.project.id}});
            },
            getFileList(params,index, row) {
                this.project.name=params.row.name;
                console.log(this.project.name);
                this.$router.push({ name:'文件列表', params:{name:this.project.name}});
            },
            //显示上传文件界面
            handleFile (params,index, row) {
                this.project.name=params.row.name;
                console.log(this.project.name);
                this.fileFormVisible = true;
                this.project = Object.assign({}, row);
                console.log(this.project);
            },
            fileSubmit() {
                this.$refs.project.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.fileLoading = true;
                            var formData = new FormData();

                            let AllUpExt = ".zip|.rar|";
                            if(AllUpExt.indexOf(this.project.fileName + "|") == "-1"){
                                this.$message(this, "error", "文件格式不正确!");
                            }else{
                                // 操作
                            }
                            formData.append("multipartFile", this.project.multipartFile);
                            formData.append("fileName", this.project.fileName);
                            formData.append("name", this.project.name);
                            this.$axios.post(api.uploadFile, formData, {
                                headers: {
                                    'Access-Control-Allow-Origin': '*'
                                    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                },
                                withCredentials: true,
                                params:{
                                    openid: localStorage.getItem("openid")
                                }
                            }).then(res => {
                                if (res != null && res.status === 200) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.fileFormVisible = false;
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
            this.getUserAcceptProjectList();
        }


    };
</script>
