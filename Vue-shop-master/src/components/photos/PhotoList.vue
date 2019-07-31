<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll"  >
                    <a :class="['mui-control-item', item.id == 1 ? 'mui-active' : '']"  v-for="item in photoclass" :key="item.id">
                        {{ item.class_name }}
                    </a>
                </div>
            </div>

        </div>
        
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
              <img v-lazy="item.img_url">
              <div class="info">
                  <h1 class="info-title">{{ item.img_title }}</h1>
                  <div class="info-body">{{ item.main_content }}</div>
              </div>
            </router-link>
        </ul>



    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data() {
        return {
            photoclass: [], //所有分类的列表数组
            list: [] //图片列表的数组
        };
    },
    mounted() {
        // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
        // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
        // 2. 初始化滑动控件
        mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created() {
        this.getPhotoCalss()
        this.getPhotoList(1)
    },
    methods: {
        getPhotoCalss() {
            //获取所有图片分类
            this.$http.get('imgclass').then((response) => {
                //console.log(response.data[0].url)
                // response.data.unshift({ class_name: "全部", id: 0});
                this.photoclass = response.data;
                //console.log(response.data)
            })
        },
        getPhotoList(cateId) {
            //根据分类id 获取图片列表
            this.$http.get('photolist/'+ cateId).then((response) => {
                this.list = response.data
                console.log(response.data)
            })
        }
    }

};
</script>

<style scoped>
* {
    touch-action: pan-y;
}
.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
}
.photo-list li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
}
.photo-list li img {
    width: 100%;
    vertical-align: middle;
}
.photo-list li img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list .info {
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    max-height: 84px;
}
.photo-list .info-title {
    font-size: 14px;
}
.photo-list .info-body {
    font-size: 13px;
}

</style>