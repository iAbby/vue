<template>
    <div class="photoinfo-container" v-if="photoinfo[0]">
        <h3>{{ photoinfo[0].title }}</h3>
        <p class="subtitle">
          <span>发表时间：{{  photoinfo[0].add_time | dataFormat }}</span>
          <span>点击：{{  photoinfo[0].click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->

        <!-- <vue-preview :slides="slide1" id="min-img" @close="handleClose"></vue-preview> -->

            <vue-preview
            :list="list"
            :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
            :previewBoxStyle="{border: '1px solid #eee'}"
            :tapToClose="true"
            @close="closeHandler"
            @destroy="destroyHandler"
            />

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo[0].content"></div>

        <!-- 放置一个现成的 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
//导入评论子组件
import comment from '../subcomponets/comments.vue';
export default {
    data() {
        return {
            id: this.$route.params.id, //从路由中获取到的图片id
            photoinfo: {}, //图片详情
            list: []
        };
    },
    created() {
        this.getPhotoInfo();
        this.getMinPhoto()
    },
    methods: {

    closeHandler() {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log('destroyHandler')
    },
        getPhotoInfo() {
            //获取图片的详情
            this.$http.get("photoinfo/" + this.id).then((response) => {
                this.photoinfo = response.data
            })
        },
        getMinPhoto() {
            //获取缩略图
            this.$http.get("minphoto/" + this.id).then((response) => {
                response.data.forEach(item => {
                    item.w=600;
                    item.h=400;
                });
                this.list = response.data
            })
        }
    },
    components: {//注册 评论子组件
        'cmt-box': comment
    }
}
</script>

<style scoped>
.photoinfo-container {
    padding: 3px;
}
.photoinfo-container h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.photoinfo-container .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}
.photoinfo-container .content {
    font-size: 13px;
    line-height: 25px;
}

</style>