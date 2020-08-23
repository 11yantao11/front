<template>
  <div class="index">
  <h1>首页</h1>
  <input type="input" id="phoneId"  v-model="phone"><br/>
  <div class="block" v-on:click="getCode"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name: 'App',
    data(){
      return{
        name:'',
        phone:""
      }
    },
    methods: {
      post(url, params, name,header,functionName) {
        axios.post("http://192.168.203.1:8090"+url, params,
          header
        ).then(resp => {
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
      getCode() {
        console.log( sessionStorage.getItem("token"))
        this.post('/nans/code/getCode', {
          phoneId: this.phone
        }, "创建验证码成功",{
          headers: {'Authorization': sessionStorage.getItem("token")}
        },this.alertflag)
      },
      alertflag(){
        alert("test")
      }
    }}
</script>
<style scoped>
  #button{
    width: 100px;
  }
  .block{
    height:20px;
    width: 100px;
    background-color:blue;

  }
  .disenabled{
    color:black;
    background-color: grey;
  }
  .enabled{
    color:white;
    background-color: blue;
  }

</style>
