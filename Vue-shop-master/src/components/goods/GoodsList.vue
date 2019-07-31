<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.goods_id" @click="goDetail(item.goods_id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
    // data 是往自己组件内部，挂载一些私有数据的
        return {
            pageindex: 1, // 分页的页数
            goodslist: [] // 存放商品列表的数组
        };
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
        // 获取商品列表
            this.$http.get("goodslist?pageindex="+this.pageindex).then((response) => {
                
                //console.log('输出成功')
                this.goodslist = response.data;
                console.log(this.goodslist)
            })
        },
        getMore() {
          this.pageindex++;
          this.getGoodsList();
        },
        goDetail(id) {
          // 使用JS的形式进行路由导航

          // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
          // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
          // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

          //console.log(this);
          // 1. 最简单的
          // this.$router.push("/home/goodsinfo/" + id);
          // 2. 传递对象
          // this.$router.push({ path: "/home/goodsinfo/" + id });
          // 3. 传递命名的路由
          this.$router.push({ name: "goodsinfo", params: { id } });
        }
    }
}
</script>


<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
}
.goods-list .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 263px;
}
.goods-item img {
    width: 100%;
}
.goods-item .title {
    font-size: 14px;
}
.goods-item .info {
    background-color: #eee;
}
.goods-item .info p{
    margin: 0;
    padding: 5px;
}
.info .price .now{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
.info .price .old {
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
.goods-item .info .sell {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

</style>