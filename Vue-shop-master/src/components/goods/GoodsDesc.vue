<template>
    <div class="goodsdesc-container">
        <h3> {{ info.title }}</h3>

        <hr>

        <div class="content" v-html="info.img_content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        info: {} // 图文数据
        };
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc() {
            this.$http.get("goodsphoto/" + this.$route.params.id).then((response) => {
               
               this.info = response.data[0]
               console.log(response.data[0].title)
           })
        }
    }
};
</script>

<style scoped>
.goodsdesc-container {
    padding: 4px;
}
.goodsdesc-container h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
}
.goodsdesc-container .content img{
    width: 100%;
}
</style>