<template>
    <div style="height:500px;">

        <Table border ref="selection"  @on-selection-change="handleSelectRow()" style="margin-top: 20px;" :columns="columns4" :data="tdata2"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>
    </div>
</template>
<script>
    import api from "@/api";

    export default {
        name:'upload-file',
        data() {
            return {
                project:{
                    url:'',
                    name:''
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
                    {title: '文件名',width:300,key: 'name'},
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
                                            this.downloadFile(params,params.index, params.row);
                                        }
                                    }
                                }, '文件下载')

                            ]);
                        }},
                ],
            }
        },
        methods:{
            deleFile(i,name){
                this.fileList.splice(i,1);
            },

            downloadFile (params,index, row) {
                this.project.url=params.row.url;
                console.log(this.project.url);
                window.open(this.project.url);

            },
            getFileList(){
                this.project.name=this.$route.params.name;
                console.log(this.project.name);
                var formData = new FormData();
                formData.append("name", this.project.name);
                this.$axios.post(api.listFile, formData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    withCredentials: true,
                    params:{
                        openid: localStorage.getItem("openid")
                    }
                }).then(res => {
                    if (res != null && res.status === 200) {
                        if (res.data.success) {

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
            this.getFileList();
        }
    }
</script>
<style scoped>
    .upload-list{margin:0;padding:0;list-style:none;}
    .upload-list-li{position: relative;margin-top:5px;line-height: 1.8}
    .upload-list-li:hover{background-color: #f5f7fa;}
    .upload-list-li-name{position:relative;margin-right: 40px;display: block;}
    .fa-file-text-o{margin-right:7px;}
    .upload-list-li-label{position:absolute;right:5px;top:0;}
    .file-box{
        padding:5px 15px;
        border-radius:3px;
        background-color:#409eff;
        border-color:#409eff;
        color:#000;display:inline-block;position: relative;
    }
    .file-btn{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        outline: none;
        background-color: transparent;
        filter:alpha(opacity=0);
        -moz-opacity:0;
        -khtml-opacity: 0;
        opacity: 0;
    }
</style>
