<template>
    <div style="height:800px;overflow:scroll;">
<!--        <li  v-for="(talk,index) in talks" v-bind:class="{'even':othername!=talk.send_from_id,'odd':othername==talk.send_from_id}">-->
<!--            <span v-show="showTime(index)" :id="index">{{getLocalTime(talk.message_time)}}</span>-->
<!--            <img v-bind:src="../../assets/img/login-bg.jpg" alt="" v-if="othername!=talk.send_from_id">-->
<!--            <img v-bind:src="../../assets/img/login-bg.jpg" alt="" v-else>-->
<!--&lt;!&ndash;            <img v-bind: alt="" v-if="othername!=talk.send_from_id">&ndash;&gt;-->
<!--&lt;!&ndash;            <img v-bind: alt="" v-else>&ndash;&gt;-->
<!--            <b></b>-->
<!--            <div>-->
<!--                <p>{{talk.content}}</p>-->
<!--            </div>-->
<!--        </li>-->




    <ul  v-for="(talk,index) in talks" :key="index">
        <div style="text-align:center;line-height:70px;display:block;">
            <span >{{talk.gmtCreate}}</span>
        </div>
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
    </ul>
        <el-form :model="chat" label-width="80px" ref="project">
            <el-form-item label="" prop="name">
                <el-input v-model="chat.content" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="send">发送</el-button>
            </el-form-item>
        </el-form>
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

            //发送消息
            send(){
                        this.chat.receiveUserId=this.chatListRequest.receiveUserId;
                        this.$axios.post(api.createChat, JSON.stringify(this.chat), {
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

                                    this.$message({
                                        message: '发送消息成功',
                                        type: 'success'
                                    });
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
                                } else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
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
<!--<style>-->

<!--    /*even 偶  odd 奇*/-->
<!--    .content-talk ul li.odd img{width:45px;height:45px;border-radius: 50%;float: left;background: url(../../assets/login/ic_user.png) no-repeat center center;background-size: 45px 45px;}-->
<!--    .content-talk ul li.even img{width:45px;height:45px;border-radius: 50%;float: right;background: url(../../assets/login/ic_user.png) no-repeat center center;background-size: 45px 45px;}-->
<!--    .content-talk ul li.odd .in_talk p{background: #fff;float:left;margin-left: 10px;max-width:60%;font-size: 14px;padding:10px;border-radius: 6px;}-->
<!--    .content-talk ul li.odd b{width:8px;height:14px;display: inline-block;background: url(../../assets/img/login-bg.jpg) no-repeat;background-size: 8px 14px;position: absolute;left:58px;top:8px;}-->
<!--    .content-talk ul li.even .in_talk p{background: #f6fff6;float:right;margin-right: 10px;max-width:60%;border-radius: 6px;font-size: 14px;padding:10px;-->
<!--    }-->
<!--    .content-talk ul li.even b{width:8px;height:14px;display: inline-block;background: url(../../assets/img/login-bg.jpg) no-repeat;background-size: 8px 14px;position: absolute;right:58px;top:8px;}-->


<!--</style>-->