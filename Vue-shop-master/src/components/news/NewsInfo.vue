<template>
    <div class="newsinfo-container" v-if="newsinfo[0]"> 
        <!-- 大标题 -->
        <!-- 下面会包渲染成功，但会报错，因为如果 newsinfo[0]为空就会取不到news_title，所以 在上面加v-if判断 -->
        <h3 class="newtitle">{{ newsinfo[0].news_title }}</h3>

        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo[0].news_time | dataFormat('YYYY-MM-DD') }}</span>
            <span>点击：{{ newsinfo[0].new_click }}次</span>
        </p>

        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo[0].content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>

    </div>
</template>


<script>
//导入子组件
import comment from '../subcomponets/comments.vue';
export default {
    data() {
        return {
            id: this.$route.params.id, //将url传递过来的id值挂载在data身上，方便调用

            newsinfo: {}
        };
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            this.$http.get("newscontent/" + this.id).then((response) => {
                //console.log(response.data)
                this.newsinfo = response.data;
            })
        }
    },
    components: {
        "comment-box": comment
    }
}
</script>

<style>
.newsinfo-container{
    padding: 0 4px;
}
.newsinfo-container .newtitle{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
}
.newsinfo-container .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}

.content img {
    width: 100%;
}
.content .goods {
    display: flex;
    justify-content: space-between;
    background-color: #ccc;
}
.content .goods img {
    width: 100%;
}
.content .goods_info {
    background-color: #ccc;
}
.content .goods_info h1 {
    font-size: 14px;
}
.content .goods_info span {
    color: red;
    font-weight: 700;
    font-size: 14px;
}
.content .goods_info button {
    background-color: red;
    color: #fff;
}
</style>
