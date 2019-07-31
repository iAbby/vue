<template>
    <div>     
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
            </div>
            <div class="mui-input-row">
                <label>确认</label>
                <input id='password_confirm' type="password" class="mui-input-clear mui-input" placeholder="请确认密码" v-model="password1">
            </div>
        </form>
        <div class="mui-content-padded">
            <button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="register">注册</button>
        </div>
        <p>{{ username }}</p>
        <p>{{ password }}</p>
        <p>{{ password1 }}</p>
        <p>{{ message }}</p>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            username:'',
            password: '',
            password1: '',
            message: ''
        };
    },
    methods: {
        register() {
            if(this.password!==this.password1){
                return console.log('密码不一致')
                
            }
            //密码一致
            let param = new URLSearchParams();
            //param.append("name","admin");
            param.append("username",this.username)
            param.append("password",this.password)
            this.$http.post('register',param,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=> {
                console.log(response.data)
                if(response.data.err_code===1){
                    //用户已存在
                    this.message=response.data.message
                }
                if(response.data.err_code===0){
                    //注册成功
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
.mui-input-row {
    margin-bottom: 10px;
}
</style>