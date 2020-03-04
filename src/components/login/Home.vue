<template>
    <div>
        <Header v-on:listenToChildEvent="onclick"></Header>
        <UserLeft></UserLeft>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <UserRight></UserRight>
    </div>
</template>
<script>

    import Header from '@/components/login/Header'
    import UserLeft from '@/components/login/UserLeft'
    import UserRight from '@/components/login/UserRight'
    export default {

        name:'Home',
        data() {
            return {

                }

        },
        components: {
            Header,
            UserLeft,
            UserRight
        },
        methods: {
            onclick(data) {

                            this.$router.push( data);

        }
        }
    }
</script>