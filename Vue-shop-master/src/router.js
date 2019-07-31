import VueRouter from 'vue-router'

//导入对应的路由
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import Login from './components/users/Login.vue'
import Register from './components/users/Register.vue'
import Feedback from './components/nocomplete/Feedback.vue'
import Video from './components/nocomplete/Video.vue'
import Callme from './components/nocomplete/Callme.vue'

//创建路由对象
var router = new VueRouter({

    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer, name: 'home' },
        { path: '/member/:id', component: MemberContainer, name: 'member' },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component:NewsInfo},
        { path: '/home/photolist', component: PhotoList},
        { path: '/home/photoinfo/:id', component: PhotoInfo},
        { path: '/home/goodslist', component: GoodsList},
        { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'},
        { path: '/home/goodsdesc/:id', component:GoodsDesc, name: 'goodsdesc'  },
        { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' },
        { path: '/home/login', component: Login, name: 'login'},
        { path: '/home/register', component: Register, name: 'register'},
        { path: '/home/feedback',component: Feedback},
        { path: '/home/video',component: Video},
        { path: '/home/callme',component: Callme}
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认为 router-link-active
})


//把路由对象暴露出去
export default router