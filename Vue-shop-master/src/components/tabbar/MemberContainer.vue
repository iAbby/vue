<template>
    <div>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell mui-media">
                <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="userinfo.img_head">
                <div class="mui-media-body">
                    Hello MUI
                    <p class='mui-ellipsis'>账号:hellomui</p>
                </div>
            </li>
        </ul>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                用户名<span class="mui-pull-right">{{userinfo.username}}</span>
            </li>
            <!-- <li class="mui-table-view-cell">
                HBuilder账号<span class="mui-pull-right">hbuilder@dcloud.io</span>
            </li> -->
        </ul>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                QQ号<span class="mui-pull-right">{{userinfo.qq}}</span>
            </li>
            <li class="mui-table-view-cell">
                手机号<span class="mui-pull-right">{{userinfo.tel}}</span>
            </li>
            <li class="mui-table-view-cell">
                邮箱地址<span class="mui-pull-right">{{userinfo.email}}</span>
            </li>
        </ul>
        <mt-button type="danger" size="large" @click="outLogin">退出登陆</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userinfo: [],
        };
    },
    created() {
        this.changeRouter(),
        this.getUserInFo()
    },
    methods: {
        getUserInFo() {
            let id = this.$store.state.user.username
            console.log(id)
            this.$http.get("userinfo/" + id).then((response) => {
                this.userinfo = response.data[0];
                console.log(response.data)
            })
        },
        changeRouter() {
            if(!this.$store.state.token.length){
                this.$router.push({name: 'login'});
            }
        },
        outLogin() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.$router.push({name: 'login'});
        }
    },
}
</script>

<style scoped>
.mui-table-view-chevron {
    margin-top: 15px;
}
.mui-table-view {
    margin-bottom: 15px;
}
.mui-table-view .mui-table-view-cell {
    margin-bottom: 15px;
}
.mui-table-view-cell a {
    background-color: red;
}
</style>