<template>
  <div class="index">
  <h1>创建展示html</h1>
  <div>时间<input type="input" id="times" v-model="times"></div>
  <div>文本<input type="input" id="content" v-model="content"></div>
  <div>文本1<input type="input" id="content1" v-model="content1"></div>
  <div>文本2<input type="input" id="content2" v-model="content2"></div>
  <div class="block" v-on:click="createHtml"></div>
  <input type="input" id="downName" v-model="downName"><br/>
  <div class="block" v-on:click="downHtml"></div>
  <div class="block1" v-on:click="testGet1"></div>
  <div>用户名<input type="input" id="userId" v-model="userId"></div>
  <div class="block2" v-on:click="getCode"></div>
  <div>验证码<input type="input" id="code" v-model="code"><span  v-on:click="getCode">刷新</span></div>
  <img v-if="imgCode" :src="imgCode" style="width: 130px;height: 53px;"/>
  <div class="block2" v-on:click="judgeCode"></div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'App',
    data() {
      return {
        times: '',
        content: '',
        content1: '',
        content2: '',
        downName: '',
        code: "",
        userId: "",
        flag: true,
        code1: "",
        imgCode: ""
      }
    },
    methods: {
      post(url, params, name, header, functionName) {
        if (this.flag != false) {
          this.flag = false
          axios.post("http://192.168.203.1:8090" + url, params,
            header
          ).then(resp => {
            this.data = resp.data
            this.flag = true
            if (this.data.retCode == "1") {
              this.code1 = this.data.result.code
              if(this.data.result.base64!=null) {
                this.imgCode = "data:image/png;base64," + this.data.result.base64
              }
              alert(name+"成功")
              //functionName()
            } else {
              alert(name+"失败")
              //alert(resp.data.retMsg);
            }
          }).catch(err => {
            console.log('请求失败：' + err.status + ',' + err.statusText);
          });
        }
      },
      post1(url, params, name, header, functionName) {
        axios.post("http://192.168.203.1:8090" + url, params,
          header
        ).then(resp => {
          this.data = resp.data
          functionName()
        }).catch(err => {
          console.log('请求失败：' + err.status + ',' + err.statusText);
        });
      },
      createHtml() {
        this.post('/love/html/create', {
          times: this.times,
          content: this.content,
          content1: this.content1,
          content2: this.content2
        }, "生成html成功", {})
      },
      get(url, params, name, header, functionName) {
        axios.get("http://192.168.203.1:8090" + url, params,
          header
        ).then(resp => {
          this.data = resp.data
          alert(this.data)

          if (this.data.retCode == "1") {
            functionName()
          } else {
            //alert(resp.data.retMsg);
          }
        }).catch(err => {
          console.log('请求失败：' + err.status + ',' + err.statusText);
        });
      },
      testGet1() {
        this.downName = 'LOVE'
        axios.get('http://192.168.203.1:8090/love/html/down1', {
          params: {
            downName: 'LOVE'
          }
        })
          .then(resp => {
            //this.windowMethod() //用open的方式对get请求再发一次请求会下载html
            alert(resp.data)
            //this.test=resp.data
            //
            let result = this.dataToExcelFile({data: resp.data, type: 'application/img', fileName: 'LOVE.img'}) //用流的操作写入到文件中
            // let result = this.dataToExcelFile({data: resp.data, type: 'application/html', fileName: 'LOVE.html'}) //用流的操作写入到文件中
            //let result1=this.dataToFile({data: resp.data, type: 'application/html', fileName: 'LOVE.html'})
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      testGet() {
        this.post1('/love/html/down', {
          downName: this.downName
        }, "下载成功", {}, this.windowMethod)
      },
      downHtml() {
        this.post1('/love/html/down', {
          downName: this.downName
        }, "下载成功", {}, this.windowMethod)
      },
      getCode() {
        this.post('/nans/code/setVerfyCode', {
          userId: this.userId
        }, "创建验证码", {})
      },
      judgeCode() {
        this.post('/nans/code/jugeVerfyCode', {
          userId: this.userId,
          code: this.code
        }, "校验验证码", {})
      },
      windowMethod() {
        window.location.href = "http://192.168.203.1:8090/love/html/down1?downName=" + this.downName
      },

      dataToExcelFile(param) {
        let data = param.data;
        let type = param.type;
        let fileName = param.fileName;
        let blob = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = "none";
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        }
        return '0'
      },
      dataToFile(param) {
        let data = param.data;
        let type = param.type;
        let fileName = param.fileName;
        if (typeof data == 'string') {
          let bstr = data;
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          let blob = new Blob([u8arr], {type: type});
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, fileName);
          } else {
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement('a');
            alert(url);
            window.open(url);
          }
          return '0'
        } else {
          return '1'
        }
      }
    }
  }
</script>
<style scoped>
  .block {
    height: 20px;
    width: 100px;
    background-color: blue;
    margin: 0 auto;
  }

  .block1 {
    height: 20px;
    width: 100px;
    background-color: blanchedalmond;
    margin: 0 auto;
  }

  .block2 {
    height: 20px;
    width: 100px;
    background-color: blueviolet;
    margin: 0 auto;
  }

  .white {
    height: 200px;
    width: 400px;
    background-color: white;
    margin: 0 auto;
  }

</style>
