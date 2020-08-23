<template>
  <div class="hello">
  <h1>首页</h1>
  <input type="input" id="name" @change="changeName" v-model="name"><br/>
  <div class="block"></div>
  <input type="input" id="password" @change="changePassword" v-model="password"><br/>
  <div class="block" broder="1"></div>
  <button class="disenabled" v-if="disenabled" v-on:click="regist" :disabled="disenabled">注册</button>
  <button class="enabled" v-if="!disenabled" v-on:click="regist" :disabled="disenabled">注册</button>
  <button class="disenabled" v-if="disenabled" v-on:click="login" :disabled="disenabled">登录</button>
  <button class="enabled" v-if="!disenabled" v-on:click="login" :disabled="disenabled">登录</button>
  </div>
</template>

<script>
  //用于处理post请求
  import axios from 'axios'
  export default {
    name: 'App',
    data() {
      return {
        name: '',
        password: '',
        disenabled: true,
        nextStep: false,
        data: ''
      }
    },
    methods: {
      //发送post的公共方法
      post(url, params, name, functionName,tokens) {
        axios.post("http://192.168.203.1:8090"+url, params,tokens).then(resp => {
          this.data = resp.data
          if (this.data.retCode == "1") {
            functionName()
          } else {
            alert(2 + resp.data.retMsg);
          }
        }).catch(err => {
          console.log('请求失败：' + err.status + ',' + err.statusText);
        }); 
      },
      //注册方法
      regist() {
        this.post('/nans/user/create', {
          userName: this.name, password: this.password,
          phone: 15000000000, userId: Math.round(Math.random() * 1000)
        }, "注册成功")
      },
      //登陆方法，顺便去下个页面
      login() {
        this.post('/nans/user/login', {
          userName: this.name,
          password: this.password
        }, "登录成功", this.goToNextPage)
      },
      //去下个页面的方法
      goToNextPage() {
        if (this.data.retCode == "1") {
          sessionStorage.setItem("token",this.data.result.Authorization)
          this.$router.push("/index")
        }
      },
      changeName() {
        if (this.name == "") {
          alert("姓名不能为空")
        }
        this.changeButton()
      },
      changePassword() {
        if (this.password == "") {
          alert("密码不能为空")
        }
        this.changeButton()
      },
      changeButton() {
        if (this.name == "" || this.password == "") {
          this.disenabled = true
        } else {
          this.disenabled = false
        }
      }
    }
  }
</script>
<style scoped>
  #button {
    width: 100px;

  }

  .block {
    height: 20px;
    width: 100px;
  }

  .disenabled {
    color: black;
    background-color: grey;
  }

  .enabled {
    color: white;
    background-color: blue;
  }
</style>
