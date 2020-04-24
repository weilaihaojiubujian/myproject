<template>
    <div style="height:500px;overflow:scroll;">
        <!--工具条-->

        <ul>
            <div style="text-align:center;line-height:70px;display:block;" >
                问题：   <span >{{this.problemAndComment.problemContent}}</span>
            </div>
        </ul>
        <ul  >
            <div   class="myUserAvatar" style="line-height:70px;display:inline-block;" >
                 <p style="float:left;margin-left: 10px;max-width:90%;font-size: 14px; ">{{problemAndComment.content}}</p>
            </div>

        </ul>

    </div>
</template>
<script>
    import api from "@/api";
    import utils from '@/components/utils/utils'
    import imgSrc from "@/assets/img/bg.jpg";

    export default {

        data() {
            return{
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                myUserAvatar: '',
                otherUserAvatar: '',
                imgSrc: imgSrc,

                problemAndComment:{
                    problemContent: '',
                    content:''
                },

                problemAndCommentRequest: {
                    commentId: ''
                },
                ajaxHistoryData: [],
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                historyData: [],


            }
        },
        methods: {

            // 获取历史记录信息
            getProblemAndComment() {
                this.problemAndCommentRequest.commentId=this.$route.params.id;

                this.$axios.post(api.problemAndComment, JSON.stringify(this.problemAndCommentRequest), {
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
                            this.problemAndComment =res.data.data;
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
            this.getProblemAndComment();
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
    .feed-legend-pipe {
        padding-top: 0px;
        padding-right: 5px;
        padding-bottom: 0px;
        padding-left: 5px;
    }
</style>