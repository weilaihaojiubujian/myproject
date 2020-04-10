<template>
    <div style="height:1000px;overflow:scroll;">

        <ul  v-for="(talk,index) in talks" :key="index">

            <div style="text-align:center;line-height:70px;display:block;">
                <span >{{talk.gmtCreate}}</span>
            </div>
            <br>
            <div v-if="othername!=talk.sendUserId">
                <!--            <span style="text-align:center;line-height:50px;display:block;">{{talk.message_time}}</span>-->
                <img style="width:45px;height:45px;border-radius: 50%;float: right;background-size: 45px 45px;"  :src="myUserAvatar" />
                <p style="float:right;margin-right: 10px;max-width:60%;border-radius: 6px;font-size: 14px;padding:10px;">{{talk.content}}</p>
            </div>
            <div v-else>
                <!--            <span style="text-align:center;line-height:50px;display:block;">{{talk.message_time}}</span>-->
                <img style="width:45px;height:45px;border-radius: 50%;float: left;background-size: 45px 45px;" :src="otherUserAvatar" />
                <p style="float:left;margin-left: 10px;max-width:60%;font-size: 14px;padding:10px;border-radius: 6px;" >{{talk.content}}</p>
            </div>
            <br>
        </ul>
        <div style="text-align:center;line-height:70px;display:block;">
            <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>
        </div>
<!--        <b style="line-height:100px;"></b>-->
<!--        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>-->
    </div>

</template>


<script>
    import api from '../../api.js';
    import utils from "@/components/utils/utils";
    import imgSrc from "@/assets/img/bg.jpg";

    export default {
        data() {
            return {
                isReturn: false,
                btn:false,
                imgSrc: imgSrc,
                othername:'',
                myUserAvatar: '',
                otherUserAvatar: '',
                talks: [

                ],
                chat: {
                    receiveUserId:'',
                    content:''
                },
                chatListRequest: {
                    receiveUserId:'',
                    pageNo: '',
                    pageSize: ''
                },
                userRequest: {
                    userId: ''
                },
                ajaxHistoryData: [],
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                historyData: [],
                content:'',
                showCard:false
            }
        },
        methods: {


            getChatList() {
                this.chatListRequest.receiveUserId=this.$route.params.userId;
                this.$axios.post(api.chatList, JSON.stringify(this.chatListRequest), {
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
                            for(var i=this.ajaxHistoryData.length-1;i>=0;i--){
                                this.ajaxHistoryData[i].gmtCreate = (!this.ajaxHistoryData[i].gmtCreate || this.ajaxHistoryData[i].gmtCreate == '') ? '' : utils.formatDate.format(new  Date(this.ajaxHistoryData[i].gmtCreate), 'yyyy-MM-dd hh：mm：ss');
                                this.talks.push(this.ajaxHistoryData[i]);
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
                this.chatListRequest.pageNo=index;
                this.$axios.post(api.chatList, JSON.stringify(this.chatListRequest), {
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
                            this.talks =[];
                            // 保存取到的所有数据
                            this.ajaxHistoryData =res.data.data.list;
                            this.dataCount = res.data.data.count;
                            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                            for(var i=this.ajaxHistoryData.length-1;i>=0;i--){
                                this.ajaxHistoryData[i].gmtCreate = (!this.ajaxHistoryData[i].gmtCreate || this.ajaxHistoryData[i].gmtCreate == '') ? '' : utils.formatDate.format(new  Date(this.ajaxHistoryData[i].gmtCreate), 'yyyy-MM-dd hh：mm：ss');
                                this.talks.push(this.ajaxHistoryData[i]);
                            }
                        } else {
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });
            },
            getOtherUserInfoByUserId(){
                this.othername = this.$route.params.userId;
                console.log(this.othername);
                this.userRequest.userId=this.$route.params.userId;
                this.$axios.post(api.otherUserInfoByUserId, JSON.stringify(this.userRequest), {
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

                        this.otherUserAvatar=res.data.data.portraitUrl || this.imgSrc;

                    } else {
                        console.log(res);
                    }
                });
            }


        },
        created() {
            var user = JSON.parse(localStorage.getItem("userInfo"));
            if (user) {
                this.myUserAvatar = user.portraitUrl || this.imgSrc;
                console.log(this.myUserAvatar);
            }
            this.getOtherUserInfoByUserId();
            this.getChatList();
        }



    }
</script>
