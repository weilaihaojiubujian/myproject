<template>
    <div id="pdfContainer" class="container" style="background-color:#fff;overflow:scroll;">
        <div class="hello" id="hello">
            合作协议（个人合作）<br>
            甲方：XXX有限公司<br>
            乙方：＿＿＿＿先生（或女士，下同）<br>
            杭州永良企业管理咨询有限公司（以下简称“甲方”）与＿＿＿＿先生（以下简称“乙方”）经过友好协商，在相互信任、相互尊重和互惠互利的原则基础上，双方达成以下合作协议：<br>
            一、甲乙双方在符合双方共同利益的前提下，就企业管理咨询业务合作等问题，自愿结成战略合作伙伴关系，乙方为甲方提供业务资源，协助甲方促成业务与业绩，实现双方与客户方的多赢局面。<br>
            二、乙方为甲方提供业务机会时，应严格保守甲方与客户方的商业秘密，不得因己方原因泄露甲方或客户方商业秘密而使甲方商业信誉受到损害。<br>
            三、甲方在接受乙方提供的业务机会时，应根据自身实力量力而行，确实无法实施或难度较大、难以把握时应开诚布公、坦诚相告并求得乙方的谅解或协助，不得在能力不及的情况下轻率承诺，从而使乙方客户关系受到损害。<br>
            四、乙方为甲方提供企业管理咨询业务机会并协助达成的，甲方应支付相应的信息资源费用。费用支付的额度视乙方在业务达成及实施过程中所起的作用而定，原则上按实际收费金额的一定百分比执行，按实际到账的阶段与金额支付，具体为每次到账后的若干个工作日内支付。<br>
            五、违约责任：<br>
            1、合作双方在业务实施过程中，如因己方原因造成合作方、客户方商业信誉或客户关系受到损害的，受损方除可立即单方面解除合作关系外，还可提出一定数额的经济赔偿要求。同时，已经实现尚未结束的业务中应该支付的相关费用，受损方可不再支付，致损方则还应继续履行支付义务。<br>
            2、甲方在支付信息资源费用时，如未按约定支付乙方款项的，每延迟一天增加应付金额的5%，直至该笔金额的全额为止。<br>
            六、争议处理：如发生争议，双方应积极协商解决，协商不成的，受损方可向杭州市仲裁委员会申请仲裁处理。<br>
            七、本协议有效期暂定一年，自双方代表（乙方为本人）签字之日起计算，即从＿＿＿＿年＿＿月＿＿日至＿＿＿＿年＿＿月＿＿日止。本协议到期后，甲方应付未付的信息资源费用，应继续按本协议支付。<br>
            八、本协议到期后，双方均未提出终止协议要求的，视作均同意继续合作，本协议继续有效，可不另续约，有效期延长一年。<br>
            九、本协议在执行过程中，双方认为需要补充、变更的，可订立补充协议。补充协议具有同等法律效力。补充协议与本协议不一致的，以补充协议为准。<br>
            十、本协议经双方盖章后生效。本协议一式贰份，甲乙双方各持一份，具有同等法律效力。<br>
            <br><br>
            <br><br>
            <span>甲方:</span>
            <img class="imgCanvas" :src="myimgUrl">
            <br><br>
            <br><br>
            <span>乙方:</span>
            <img class="imgCanvas" :src="imgUrl">
            <br><br>
            <br>
        </div>
        <span>签字:</span>
        <br>
        <section class="signature">
            <div class="signatureBox">
                <div class="canvasBox" ref="canvasHW">
                    <canvas ref="canvasF" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'
                            @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></canvas>
                    <div class="btnBox">
                        <div @click="overwrite">重写</div><br><br>
                        <div @click="commit">提交签名</div><br><br>
                        <div @click="download()">上传合同</div><br><br>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>


    import api from "@/api";
    import html2Canvas from "html2canvas";
    import JsPDF from "jspdf";


    export default {
        data() {
            return {
                stageInfo: '',
                imgUrl: '',
                myimgUrl: '',
                userId: '',
                projectId: '',
                project: {
                    multipartFile: '',
                    name: ''

                },
                multipartFile: '',
                client: {},
                points: [],
                canvasTxt: null,
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
            this.projectId = this.$route.params.id;
            this.userId = this.$route.params.userId
            this.project.name = this.$route.params.name
            console.log(this.project.name);
            this.imgUrl = localStorage.getItem(this.userId + this.projectId);
            let canvas = this.$refs.canvasF
            canvas.height = this.$refs.canvasHW.offsetHeight - 500
            canvas.width = this.$refs.canvasHW.offsetWidth - 50
            this.canvasTxt = canvas.getContext('2d')
            this.stageInfo = canvas.getBoundingClientRect()
        },
        methods: {
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
            //提交签名
            commit() {
                this.myimgUrl = this.$refs.canvasF.toDataURL();
                console.log(this.$refs.canvasF.toDataURL()) //签名img回传后台
            },
            download() {
                // var base64=htmlToPdf.getPdf('hello', '合同', this.project.name)

                let _this =this
                html2Canvas(document.querySelector('#' + 'hello'), {
                    allowTaint: true
                }).then(
                    function (canvas) {
                        let contentWidth = canvas.width
                        let contentHeight = canvas.height
                        let pageHeight = contentWidth / 592.28 * 841.89
                        let leftHeight = contentHeight
                        let position = 0
                        let imgWidth = 595.28
                        let imgHeight = 592.28 / contentWidth * contentHeight
                        let pageData = canvas.toDataURL('image/jpeg', 1.0)
                        let PDF = new JsPDF('', 'pt', 'a4')
                        if (leftHeight < pageHeight) {
                            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                        } else {
                            while (leftHeight > 0) {
                                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                                leftHeight -= pageHeight
                                position -= 841.89
                                if (leftHeight > 0) {
                                    PDF.addPage()
                                }
                            }
                        }
                        PDF.save('合同' + '.pdf')
                        var pdfData = PDF.output('dataurlstring')//获取到base64 的pdf
                        let arr=pdfData.split("base64,")
                        let str=arr[arr.length-1]
                        console.log(str);
                        var formData = new FormData();
                        formData.append("multipartFile", str);
                        formData.append("fileName", '合同.pdf');
                        formData.append("name", _this.project.name);
                        _this.$axios.post(api.uploadPDFFile, formData, {
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                            },
                            withCredentials: true,
                            params: {
                                openid: localStorage.getItem("openid")
                            }
                        }).then(res => {
                            if (res != null && res.status === 200) {
                            } else {
                                console.log(res);
                            }
                        });
                    }

                )


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
