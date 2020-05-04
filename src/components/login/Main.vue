<template>

    <div class="container-fuild">
        <main role="main">
            <article>
                <div id="myCarousel" class="carousel slide">
                    <!-- 轮播（Carousel）指标 -->
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" v-for="(item,index) in dataList" :key="index" @click="gotoPage(index)" :class="{'current':currentIndex == index}">{{index+1}}</li>
                    </ol>
                    <!-- 轮播（Carousel）项目 -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <img :src="dataList[currentIndex]" alt="First slide">
                        </div>
<!--                        <div class="item active">-->
<!--                            <img src="../../assets/img/bk5.png" alt="First slide">-->
<!--                        </div>-->
<!--                        <div class="item">-->
<!--                            <img src="../../assets/img/bk2.png" alt="Second slide">-->
<!--                        </div>-->
<!--                        <div class="item">-->
<!--                            <img src="../../assets/img/bk3.png" alt="Third slide">-->
<!--                        </div>-->
                    </div>

                    <!-- 轮播（Carousel）导航 -->
                    <a class="left carousel-control"  @click="gotoPage(prevIndex)" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" @click="gotoPage(nextIndex)" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </article>
            <article>
                <div class="introduce-1">
                    <div class="introduce-top">
                        <div>
                            <i  class="icon-suitcase icon-3x"></i>
                            <div>
                                <h3>更方便</h3>
                                <p>一可以选择用户来完成项目</p>
                            </div>
                        </div>
                        <div>
                            <i  class="icon-group icon-3x"></i>
                            <div>
                                <h3>更省钱</h3>
                                <p>随时随地可以发布项目，不用专门养项目团队</p>
                            </div>
                        </div>
                        <div>
                            <i  class="icon-road icon-3x"></i>
                            <div>
                                <h3>更独特</h3>
                                <p>全网真实项目平台，学生在线学习</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>人力与项目外包服务平台为您提供专业的项目众包服务</h1>
                        <p class="lead">服务人员实名认证，任务人员随你挑选</p>
                    </div>
                </div>
            </article>
            <article class="introduce-2">
                <section>
                    <div class="img1"></div>
                    <div class="right-text">
                        <h3>没有真实上线项目经历？</h3>

                    </div>
                </section>
                <section>
                    <div class="img2"></div>

                    <div class="right-text">
                        <h3> 空闲时间想要兼职赚钱？</h3>

                    </div>
                </section>
                <section>
                    <div class="img3"></div>
                    <div class="right-text">
                        <h3>企业想要省钱完成项目？</h3>

                    </div>
                </section>
                <section>
                    <div class="img4"></div>

                    <div class="right-text">
                        <h3>人力与项目外包服务平台，包君满意。</h3>

                    </div>
                </section>
            </article>
        </main>
        <aside role="complementary"></aside>
        <footer role="contentinfo">
            <div class="contact">
                <section class="contactItem1">
                    <h2>Contact</h2>
                    <ul>
                        <li><i class="icon-envelope"></i>Email:12345678901@qq.com</li>
                        <li><i class="icon-phone"></i>Tel:12345678901</li>
                        <li><i class="icon-map-marker"></i>Address:浙江省 杭州市 浙江科技学院</li>
                    </ul>
                </section>
                <section class="contactItem2">
                    <h2>Special Thanks</h2>
                    <p>
                        本项目由 浙江科技学院软工 161 汪宏斌完成 <br>
                    </p>
                </section>

            </div>
            <div>
                Copyright &copy; 2020.5.1 Design By 人力与项目外包服务平台
            </div>
        </footer>
    </div>




</template>

<script>
    import api from '../../api.js';
    import imgSrc from "@/assets/img/bg.jpg";
    import imgSrc1 from "@/assets/img/bk5.png";
    import imgSrc2 from "@/assets/img/bk2.png";
    import imgSrc3 from "@/assets/img/bk3.png";
    export default {
        data() {
            return {
                dataList:[imgSrc1,imgSrc2,imgSrc3],
                currentIndex: 0,   //默认显示图片
                imgSrc: imgSrc,
                isReturn: false
            }
        },
        computed: {
            //上一张
            prevIndex() {
                if(this.currentIndex == 0) {
                    return this.dataList.length - 1;
                }else{
                    return this.currentIndex - 1;
                }
            },
            //下一张
            nextIndex() {
                if(this.currentIndex == this.dataList.length - 1) {
                    return 0;
                }else {
                    return this.currentIndex + 1;
                }
            }
        },
        methods: {
            gotoPage(index) {
                this.currentIndex = index;
                console.log(index);
            },
           ga () { ga.q.push(arguments)
               ga.q = []; ga.l = +new Date;
               ga('create', 'UA-XXXXX-Y', 'auto'); ga('send', 'pageview')


           }
        }
    }



</script>
<style>
   @import "../../assets/css/normalize.css";
   @import "../../assets/css/main.css";
   @import "../../assets/css/font-awesome.min.css";
   @import "../../assets/css/buttons.css";
   @import "../../assets/css/mainPage.css";
   @import "https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
</style>

