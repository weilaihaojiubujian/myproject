<template>
    <div id="pdfContainer" class="container" style="background-color:#fff;overflow:scroll;">
        合作协议<br>
        甲方：{{this.getRealNameResponse.realName}}<br>
        乙方：{{this.getRealNameResponse.myRealName}}<br>
        甲方在此委托乙方进行项目的开发。为明确双方责任，经友好协商，双方达成以下协议，以资双方共同遵守：<br>
        一、乙方在充分了解甲方待开发的项目的基本要求，并签定本合同，由甲方向乙方提供该项目的《需求开发说明书》及其他相关文件、资料。<br>
        二、甲、乙双方认定本合同开发费用预计总金额为项目发布时金额。如果乙方在研发中，超过预计是研发费用，在双方协定下解决。<br>
        三、甲乙双方经确定签定此合同之后，即正式承接该项目。如乙方不能按时完成，应在合同约定完工日期前的两个工作日内，以书面形式向甲方提出延期的理由和申请延期<br>
        的具体时间，经甲方批准后方可延期，延期时间以甲方批准的时间为准。延期时间不得超过合作开发时间总长的一倍。若甲方不同意乙方的延期申请，则完工时间不予延长。<br>
        四、乙方必需以提供项目代码 ，让甲方进行验收工作。乙方保证项目模块的功能符合需求的要求<br>
        五、甲方的权利和义务：<br>
        1、提供专人与乙方联络，提供项目所需要的所有资料交给乙方,并保证资料的正确性。<br>
        2、及时支付费用，保证项目的开发费用及时到位。<br>
        3、本合同的相关作品、程序、文件源码的版权属甲方所有。<br>
        六、乙方的权利和义务：<br>
        1、按照项目进度要求及时完成系统的开发,同时保证项目质量。<br>
        2、开发完毕,乙方应将系统的文档、源代码移交给甲方,不得将其应用在其他企业。<br>
        3、不得将甲方开发内容泄露给第三方。<br>
        七、违约责任：<br>
        1、任何一方有证据表明对方已经、正在或将要违约,应及时提醒违约方,若违约方仍然违反本合约，可以解除本合同并要求违约方赔偿损失<br>
        2、因不可抗力而无法承担责任的一方，应在不可抗力发生的3 天内，及时通知另一方。<br>
        八、争议处理：如发生争议，双方应积极协商解决，协商不成的，受损方可向杭州市仲裁委员会申请仲裁处理。<br>
        九、本协议在执行过程中，双方认为需要补充、变更的，可订立补充协议。补充协议具有同等法律效力。补充协议与本协议不一致的，以补充协议为准。<br>
        十、本协议经双方盖章后生效。本协议一式贰份，甲乙双方各持一份，具有同等法律效力。<br>
        <br><br>
        <br><br>
        <span>甲方:</span>
        <img class="imgCanvas" :src="myimgUrl">
        <br><br>
        <br><br>
        <span >乙方:</span>
        <img class="imgCanvas"  :src="imgUrl">
        <br><br>
        <br>
        <span>签字:</span>
        <br>
        <section class="signature">
            <div class="signatureBox">
                <div class="canvasBox" ref="canvasHW">
                    <canvas ref="canvasF" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
                    <div class="btnBox">
                        <div @click="overwrite">重写</div><br>
                        <div @click="commit">提交签名</div><br>
                        <div @click="acceptProject">确定合同签名完成</div><br>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>
    import api from "@/api";

    export default {
        data() {
            return {
                stageInfo:'',
                imgUrl:'',
                myimgUrl:'',
                userId:'',
                projectId:'',
                client: {},
                points: [],
                canvasTxt: null,
                getRealNameRequest: {
                      userId:''
                },
                getRealNameResponse: {
                    realName:'',
                    myRealName:''
                },
                project:{
                    id:''
                },
                startX: 0,
                startY: 0,
                moveY: 0,
                moveX: 0,
                endY: 0,
                endX: 0,
                w: null,
                h: null,
                isDown: false,
                isViewAutograph: this.$route.query.isViews > 0,
                contractSuccess: this.$route.query.contractSuccess
            }
        },
        mounted() {
            this.projectId=this.$route.params.id;
            this.project.id=this.$route.params.id;
            this.userId=localStorage.getItem("userId");
            this.getRealNameRequest.userId=this.$route.params.userId;
            let canvas = this.$refs.canvasF
            canvas.height = this.$refs.canvasHW.offsetHeight - 500
            canvas.width = this.$refs.canvasHW.offsetWidth - 50
            this.canvasTxt = canvas.getContext('2d')
            this.stageInfo = canvas.getBoundingClientRect()
            this.getRealName();
        },
        methods: {
            getRealName(){
                this.$axios.post(api.getRealName, JSON.stringify(this.getRealNameRequest), {
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
                            this.getRealNameResponse.realName =res.data.data.realName;
                            this.getRealNameResponse.myRealName =res.data.data.myRealName;
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                            this.$router.push( '/validationUser');
                            console.log(res);
                        }
                    } else {
                        console.log(res);
                    }
                });

            }  ,
            //mobile
            touchStart(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clienX,
                        y: ev.targetTouches[0].clientY,
                    }
                    this.startX = obj.x
                    this.startY = obj.y
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                }
            },
            touchMove(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stageInfo.left,
                        y: ev.targetTouches[0].clientY - this.stageInfo.top
                    }
                    this.moveY = obj.y
                    this.moveX = obj.x
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.startY = obj.y
                    this.startX = obj.x
                    this.points.push(obj)
                }
            },
            touchEnd(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stageInfo.left,
                        y: ev.targetTouches[0].clientY - this.stageInfo.top
                    }
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                }
            },
            //pc
            mouseDown(ev) {
                ev = ev || event
                ev.preventDefault()
                if (1) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.startX = obj.x
                    this.startY = obj.y
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.isDown = true
                }
            },
            mouseMove(ev) {
                ev = ev || event
                ev.preventDefault()
                if (this.isDown) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.moveY = obj.y
                    this.moveX = obj.x
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.startY = obj.y
                    this.startX = obj.x
                    this.points.push(obj)
                }
            },
            mouseUp(ev) {
                ev = ev || event
                ev.preventDefault()
                if (1) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.points.push({x: -1, y: -1})
                    this.isDown = false
                }
            },
            //重写
            overwrite() {
                this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
                this.points = []
            },
            acceptProject() {
                this.$confirm('确认合同签名完成并报名接受项目吗？', '提示', {}).then(() => {
                    this.$axios.post(api.acceptProject, JSON.stringify(this.project), {
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
                                localStorage.setItem(this.userId+this.projectId,this.imgUrl);
                                this.$message({
                                    message: '投标项目成功',
                                    type: 'success'
                                });

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

            //提交签名
            commit() {
                this.imgUrl=this.$refs.canvasF.toDataURL();
                // localStorage.setItem(this.userId+this.projectId,this.imgUrl);
                console.log(this.$refs.canvasF.toDataURL()) //签名img回传后台
            }
        }
    }
</script>
<style scoped>
    .signatureBox {
        width: 100%;
        height: calc(100% - 50px);
        box-sizing: border-box;
        overflow: hidden;
        background: #fff;
        z-index: 100;
        display: flex;
        flex-direction: column;
    }
    .canvasBox {
        box-sizing: border-box;
        flex: 1;
    }
    canvas {
        border: 1px solid #7d7d7d;
    }
    .btnBox {
        padding: 10px;
        text-align: center;
    }
    .btnBox button:first-of-type {
        background: transparent;
        border-radius: 4px;
        height: 40px;
        width: 80px;
        font-size: 14px;
    }
    .btnBox button:last-of-type {
        background: #71b900;
        color: #fff;
        border-radius: 4px;
        height: 40px;
        width: 80px;
        font-size: 14px;
    }
</style>
