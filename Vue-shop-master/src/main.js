//入口函数
import Vue from 'vue'

//导入axios 和vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//axios.defaults.baseURL = "http://localhost:3100/" //全局设置请求域名的接口，自动加在请求url前面
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = "http://wztweb.top:3100/"
//http://wztweb.top:3100
import 'bootstrap/dist/css/bootstrap.css'

//按需导入 Mint-UI中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);

//全部导入 Mint-UI 中的组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入 引入的字体 的样式  自己的css同理
import './lib/font-awesome/css/font-awesome.css'

// import './lib/mui/css/mui.min.css'

//1.1 导入路由模块
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var token = JSON.parse(localStorage.getItem('token') || '[]')
var user = JSON.parse(localStorage.getItem('user') || '[]')
var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car,
    token: token,
    user: user
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

      // 假设 在购物车中，没有找到对应的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析： 
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    login(state,userinfo) {
      state.token=userinfo.token
      state.user=userinfo.user
      localStorage.setItem('token', JSON.stringify(state.token))
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  getters: { // this.$store.getters.***
     // 相当于 计算属性，也相当于 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      //console.log(o)
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})



//导入时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


//安装图片预览插件
//import VuePreview from 'vue-preview'
// defalut install
//Vue.use(VuePreview)
// // with parameters install
// Vue.use(preview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//导入 MUI 的样式
import './lib/mui/css/mui.min.css'
//导入 MUI 的拓展样式 
import './lib/mui/css/icons-extra.css'


//1.3 导入自己的 router.js 路由模块
import router from './router.js'




//导入App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',//el,将这个实例挂载这个id为app元素上
  render: c => c(app),//在 webpack 中，如果想要通过 vue， 把一个组件放到页面中去展示，可以通过vm 实例中的 render 函数可以实现
  // render: function (createElements) { 	
	// 	return createElements(app)
	// }
  router, //1.4挂载路由对象到 vm 示例上 router:router
  store //挂载store 状态管理对象

})