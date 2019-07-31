<template>
    <div>
        <!-- 轮播图区域 -->
        <!-- <swiper :lunbotuList="lunbotuList" ></swiper> -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>


        <!-- 九宫格区域 -->

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">商品推荐</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/feedback">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/video">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/callme">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></router-link></li>
            
        </ul> 

    </div>
</template>

<script>
// import swiper from "../subcomponents/swiper.vue";
import swiper from '../subcomponets/swiper.vue';
export default {
    data() {
        return {
            lunbotuList: []
        };
    },
    created() {
    this.getLunbotu();
    },
    methods: {
        getLunbotu() {
            //vue借助 Axios库来发送Ajax请求，获取数据

            this.$http.get('lunbo').then((response) => {
                console.log(response.data)
                this.lunbotuList = response.data;
            })
            // this.axios.get('http://localhost:3100/lunbo').then((response) => {
            //     // console.log(response.data)
            //     console.log(response.data)
            // });
        }
    },
    components: {
        swiper
    }
}
</script>

<style scoped>
    .mint-swipe {
        height: 200px;
    }
    .mint-swipe-item {
        background-color: pink;
    }
    .mint-swipe-item img {
        width: 100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: 0;
    }
    .mui-grid-view.mui-grid-9 img{
        width: 60px;       
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }

</style>