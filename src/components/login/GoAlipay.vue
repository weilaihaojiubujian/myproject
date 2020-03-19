<template>

</template>

<script>
    export default {
        data() {
            return {
                htmls:''
            }
        },
        mounted(){   //页面初始化方法
            this.getAlipay();
        },
        methods: {

            getAlipay() {
                this.htmls=this.$route.params.htmls;
                console.log(this.$route.params.htmls);
                const div = document.createElement('div');
                div.innerHTML = this.$route.params.htmls;
                document.body.appendChild(div);
                document.forms[0].submit();


            }
        }
    }
</script>