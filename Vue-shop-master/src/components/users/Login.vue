<template>
    <div>
        <form id='login-form' class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
            </div>
        </form>
        <div class="mui-content-padded">
            <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login">登录</button>
            <div class="link-area"><router-link id='reg' to="/home/register">注册账号</router-link> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
            </div>
        </div>
        <p>{{ username }}</p>
        <p>{{ password }}</p>
        <p>{{ message }}</p>

    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password: '',
            message:'',
        };
    },
    methods: {
        login() {
            let param = new URLSearchParams();
            //param.append("name","admin");
            param.append("username",this.username)
            param.append("password",this.password)
            this.$http.post('login',param,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                console.log(response.data)
                if(response.data.err_code===1){
                    //没有查询到
                    this.message=response.data.message
                }
                if(response.data.err_code===0){
                    //查询成功
                    this.message=response.data.message
                    //this.username=this.username;
                    let user = {"username": this.username,"password": this.password}
                    let token = response.data.token
                    this.$store.commit("login",{token,user});
                    console.log(token)
                    this.$router.push({name: 'home'});
                }
            })
        }    
    },
}
</script>

<style scoped>
.area {
    margin: 20px auto 0px auto;
}

.mui-input-group {
    margin-top: 10px;
}

.mui-input-group:first-child {
    margin-top: 20px;
}

.mui-input-group label {
    width: 22%;
}

.mui-input-row label~input,
.mui-input-row label~select,
.mui-input-row label~textarea {
    width: 78%;
}

.mui-checkbox input[type=checkbox],
.mui-radio input[type=radio] {
    top: 6px;
}

.mui-content-padded {
    margin-top: 25px;
}

.mui-btn {
    padding: 10px;
}

.link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
}

.spliter {
    color: #bbb;
    padding: 0px 8px;
}

.oauth-area {
    position: absolute;
    bottom: 20px;
    left: 0px;
    text-align: center;
    width: 100%;
    padding: 0px;
    margin: 0px;
}

.oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
}

.oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
}

.oauth-area .oauth-btn.disabled {
    background-color: #ddd;
}
</style>