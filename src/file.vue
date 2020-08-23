<template>
  <div class="index">
  <h1>文件</h1>
  <input type="input" id="url"  v-model="url"><br/>
  <div class="block"  v-on:click="getBase64File"></div>
  <div class="block1" v-on:click="getCommonFile"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name: 'App',
    data(){
      return{
        filename:'',
        url:"",
        fileText:"",
        fileType:"",
        result:"",
        file:"",
        name:""
      }
    },
    methods: {
      getBase64(url, params1) {
            axios.get("http://localhost:8090" + url, {params:params1}
            ).then(resp => {
              this.data = resp.data
              if (this.data.retCode == "1") {
              this.result=this.data.result,
              this.fileType=this.result.fileType,
              this.file=this.result.file,
              this.name=this.result.name
              var bstr = window.atob(this.file)
              this.downloadFile(bstr,this.name,"application/vnd.ms-excel")    　        　
              } else {
                //alert(resp.data.retMsg);
              }
            }).catch(err => {
              console.log('请求失败：' + err.status + ',' + err.statusText);
            });
          },
      getBase64File() {
        this.getBase64('/file/downLoad/fileBase64', {
          url: this.url
        })
      },
        getCommon(url, params1) {
                  axios.get("http://localhost:8090" + url, {params:params1}
                  ).then(resp => {
                    this.data = resp.data
                    if (this.data.retCode == "1") {
                    this.result=this.data.result,
                    this.fileType=this.result.fileType,
                    this.file=this.result.file,
                    this.name=this.result.name
                    //var bstr = window.atob(this.file)
                    this.downloadFile(this.file,this.name,"application/vnd.ms-excel")    　        　
                    } else {
                      //alert(resp.data.retMsg);
                    }
                  }).catch(err => {
                    console.log('请求失败：' + err.status + ',' + err.statusText);
                  });
                },
          getCommonFile() {
              this.getCommon('/file/downLoad/file', {
                url: this.url
              })
            },
      alertflag(){
        alert("test")
      },
       downloadFile(res, fileName,type) {
        let n=res.length
        let u8arr = new Uint8Array(n)
        while(n--){
        u8arr[n]=res.charCodeAt(n)
       }
       let blob=new Blob([u8arr],{type:type})
      if(window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(blob,fileName)
      }else{
         var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                window.URL.revokeObjectURL(link.href)
            }
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
   display: inline-block

  }
   .block1{
      height:20px;
      width: 100px;
      background-color:yellow;
     display: inline-block

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
