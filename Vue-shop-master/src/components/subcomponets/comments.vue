<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <audio  autoplay="autoplay" ref="audio">
            <source ref="tts_source" type="audio/mpeg"></source>
        </audio>
        <textarea placeholder="请输入要评论的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list" v-if="comments">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼 &nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-body" ref="i">
                    {{ item.content }}
                    <span class="glyphicon glyphicon-volume-up" aria-hidden="true" @click="play(i)"></span>
                </div>
            </div>

        </div>


        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>




    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            page: 1 ,//默认展示第一页
            comments: [], //所有的评论数据
            msg: '', //输入的评论内容
            url: "http://tts.baidu.com/text2audio/text2audio?lan=zh&ie=UTF-8&spd=4&text="
        };
    },
    created() {
        this.getComments()   
    },
    methods: {
        getComments() {//获取评论
            this.$http.get("comments/" + this.id + "?page="+this.page).then((response) => {
                this.comments = response.data;
            })
        },
        getMore() {
            this.page++;
            this.getComments();
        },
        postComment() {
            // 校验是否为空内容
            if (this.msg.trim().length === 0) {
                return Toast("评论内容不能为空！");
            }
            let token = this.$store.state.token 
            if(!token.length) {
                return Toast("请先登陆！");
            }     
            let param = new URLSearchParams();   
            //param.append("name","admin");
            param.append("id",this.id)
            param.append("username",this.$store.state.user.username)
            param.append("comment",this.msg)
            param.append("token",token)
            //发表评论,将评论数据传回服务端
            this.$http.post("postcomment",param,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=>{
               // console.log(response.status)
               // 发表评论之后，不重新 从 数据库取数据，而是将刚发表的评论作为对象传入，渲染的数组前面
               // 这样可以实现不刷新，但是其实有bug，刚发表的评论的语音播放是前一条的，除非重新刷新页面。暂不处理
                // let token_d = response.data[0]
                // let user = this.$store.state.user
                // if(token_d.username !== user.username){
                //     return Toast("请先登陆！");
                // }
                if (response.status===200){
                    //拼接出一个评论对象
                    
                    var cmt = {
                        // user_name: '匿名用户',
                        user_name: this.$store.state.user.username,
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    //this.getComments();
                    this.msg = "";
                }
            })

        },
        play(i) {
            //console.log(this.$refs.i[i].innerText)
            //lan固定值zh，目前只有中英文，ie文字格式，spd语速0-15，per 发音人 0女生 1男生 3，4情感合成 ，默认为女声
            //var url = "http://tts.baidu.com/text2audio/text2audio?lan=zh&ie=UTF-8&spd=4&text="
        	this.$refs.tts_source.src=this.url + this.$refs.i[i].innerText
        	this.$refs.audio.load()
        }
    },
    props: ["id"]
};
</script>

<style>

.cmt-container h3 {
    font-size: 18px;
}
.cmt-container textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
}
.cmt-list {
    margin: 5px 0;
}
.cmt-item {
    font-size: 13px;
}
.cmt-title {
    line-height: 30px;
    background-color: #ccc;
}
.cmt-body {
    line-height: 35px;
    text-indent: 2em;
}
.glyphicon-volume-up {
    float: right;
    line-height: 35px;
    margin-right: 10px;
    font-size: 18px;
}
</style>