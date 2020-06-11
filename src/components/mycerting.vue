<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/certing')" alt=""><i>我的认证</i>
      </header>
      <div class="line"></div>
      <ul>
        <li  @click="sheetVisible = true" size="large">
          <span>证件类型</span>
          <em><img src="../../static/img/right.png" alt=""></em>
          <input type="text" :value="sex" disabled placeholder="选择您的证件类型">
        </li>
        <li>
          <span>证件号</span>
         <input type="text" v-model="auth"  placeholder="填写您的证件号">
        </li>

         <li class="update">
          <span>上传身份证</span>
           <img src="../../static/img/k1.png" alt="">
           <div style="clear: both"></div>
           <ol>
             <li @click="update_fiel('z')" id="z">
               <img ref="zm" src="../../static/img/z1.png" alt="">
               <span>证件正面</span>
             </li>
              <li  @click="update_fiel('f')" id="f">
               <img  ref="fm" src="../../static/img/z2.png" alt="">
               <span>证件反面</span>
             </li>
              <li  @click="update_fiel('s')"  id="s">
               <img  ref="sc" src="../../static/img/z3.png" alt="">
               <span>手持证件照正面</span>
             </li>
           </ol>
        </li>
      </ul>

      <button @click="authsession">完成认证</button>
      <p class="copy">认证即同意 <i>主播协议</i> </p>
      <weui-distpicker v-if="show"  @confirm="onConfirm" @cancel="onCancel"></weui-distpicker>
      <input style="opacity: 0" type="file" name="file" accept="image/*" @change="fileChanged()" ref="file">
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import api from '@/constant/api'
  import WeuiDistpicker from 'weui-distpicker'
  import domain from '../../untils/config'
    export default {
        name: "setting",
        data(){
          return{
             show: false,
             files:[],
             Fobj:{},
             status: 'ready',
             point: {},
             uploading: false,
             percent: 0,
             sex:'身份证',
             sheetVisible: false,
             actions: [],
             auth:'',
             file:{},
             Type:'',
             personInfo:[],
             name:'',
             token:localStorage.getItem('top'),
          }
        },
        mounted(){
          this.personInfo.real_name=this.$route.query.name
          this.personInfo.mobile=this.$route.query.phone
          this.personInfo.card_no=this.$route.query.bankCard
          this.personInfo.bank_name=this.$route.query.bankName
          this.personInfo.sub_branch=this.$route.query.cardName
          this.personInfo.cer_type='居民身份证'

           this.actions = [
            {
              name: '身份证',
              method: this.openAlbum
            }];
        },
        methods:{
          authsession(){
            if(!this.formSet()){
              return
            }
            this.updateInfo()
          },
          formSet(){
              var _this=this
              var i=0
              console.log(typeof this.Fobj)
                for(var x in this.Fobj){
                i++
               }
              var o=this.auth;
              var reg =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            	if(!reg.test(o)){
                  this.showM("请输入正确的身份证号码！");
                return false;
              }
              if(i<3){
                  this.showM("请上传完整的证件照");
                return false;
              }
                return true;
          },
          openAlbum() {
            this.sex='身份证'
          },
          handleChange(value) {
              this.DateTime=this.forDate(value)
          },
           showM:function(o){
           // this.$root.Hub.$emit('child',{msg:o,flag:true});
            Toast({
              message:o,
              iconClass: 'icon icon-success',
              className:'backColor',
              duration:1000
            });
          },
           submit() {
              var _this=this;
              var json={front_view:this.Fobj.zm,back_view:this.Fobj.fm,handset_view:this.Fobj.sc};
              console.log(json)
             // var param= this.$root.entrypt(json);
              this.axios.post(api.auth_image,this.$qs.stringify(json))
              .then(function(res){
                if(res.data.state==0){
                      _this.personInfo.back_view=res.data.content.back_view
                      _this.personInfo.front_view=res.data.content.front_view
                      _this.personInfo.handset_view=res.data.content.handset_view
                      _this.updateInfo()
                  }else{
                    _this.showM(res.data.msg);
                  }
                })
            },
            uploadimg(f,token,key) {
                var _this=this;
                var instance = Toast('图片上传中，请稍后...');
                var Qiniu_upload = function(f, token, key) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST','http://up.qiniu.com', true);
                    var formData, startDate;
                    formData = new FormData();
                    if (key !== null && key !== undefined) formData.append('key', key);
                    formData.append('token', token);
                    formData.append('file', f);
                    var taking;
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            var nowDate = new Date().getTime();
                            taking = nowDate - startDate;
                            var x = (evt.loaded) / 1024;
                            var y = taking / 1000;
                            var uploadSpeed = (x / y);
                            var formatSpeed;
                            if (uploadSpeed > 1024) {
                                formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
                            } else {
                                formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
                            }
                            //var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                            //progressbar.progressbar("value", percentComplete);
                            // console && console.log(percentComplete, ",", formatSpeed);
                        }
                    }, false);

                    xhr.onreadystatechange = function(response) {
                        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                            var blkRet = JSON.parse(xhr.responseText);
                            console && console.log(blkRet);
                            //$("#dialog").html(xhr.responseText).dialog();
                            if(blkRet.key.indexOf("z")>=0){
                                _this.$refs.zm.src=domain.staticDomain+blkRet.key
                                _this.Fobj['zm']=domain.staticDomain+blkRet.key
                                _this.personInfo.back_view=domain.staticDomain+blkRet.key
                            }else if(blkRet.key.indexOf("f")>=0){
                                _this.$refs.fm.src=domain.staticDomain+blkRet.key
                                _this.Fobj['fm']=domain.staticDomain+blkRet.key
                                _this.personInfo.front_view=domain.staticDomain+blkRet.key
                            }else if(blkRet.key.indexOf("s")>=0) {
                                _this.$refs.sc.src=domain.staticDomain+blkRet.key
                                _this.Fobj['sc']=domain.staticDomain+blkRet.key
                                _this.personInfo.handset_view=domain.staticDomain+blkRet.key
                            }
                            instance.close();
                            var iii = Toast('上传成功！');
                            setTimeout(() => {
                                iii.close();
                            }, 1000);

                        } else if (xhr.status != 200 && xhr.responseText) {
                            _this.showM(xhr.responseText);
                        }
                    };
                    startDate = new Date().getTime();
                   // $("#progressbar").show();
                    xhr.send(formData);
                };
               // var token = $("#token").val();
                //if ($("#file")[0].files.length > 0 && token != "") {
                    Qiniu_upload(f, token, key);
                //} else {
                 //   console && console.log("form input error");
                //}
            },
            updateInfo() {
            this.personInfo.cer_no=this.auth
               var _this=this;
              var json=this.personInfo
              console.log(json)
             // var param= this.$root.entrypt(json);
              this.axios.post(api.auth_update,this.$qs.stringify(json))
              .then(function(res){
                _this.$root.login(res.data.state)
                if(res.data.state==0){
                      _this.LinkRouter('/examine_succ')
                  }else{
                    _this.showM(res.data.msg);
                  }
                })
            },
          update_fiel(t){
              //this.update(t)
            this.$refs.file.click()
            this.Type=t
              this.name=t+'3'+Math.random()
          },
          fileChanged() {
              const list = this.$refs.file.files
            /*  for (let i = 0; i < list.length; i++) {
                  if (!this.isContain(list[i])) {
                      const item = {
                          name: list[i].name,
                          size: list[i].size,
                          file: list[i]
                      }
                      this.html5Reader(list[i], item)
                      //this.files.push(item)
                  }
              }*/
            //console.log(list[0])
              this.uploadimg(list[0],this.token,this.name)
             /* this.$refs.file.value = '';
              console.log(this.files)
              this.submit()*/
          },

          html5Reader(file, item){
              const reader = new FileReader()
              reader.onload = (e) => {
                 // this.$set(item, 'src', e.target.result)
                 if(this.Type=='z'){
                    this.$refs.zm.src=e.target.result
                    this.Fobj['zm']=e.target.result
                  }else if(this.Type=='f'){
                    this.$refs.fm.src=e.target.result
                    this.Fobj['fm']=e.target.result
                  }else if(this.Type=='s') {
                    this.$refs.sc.src=e.target.result
                    this.Fobj['sc']=e.target.result
                  }
              }
              console.log(this.files)
              reader.readAsDataURL(file)
          },
          isContain(file) {
            return this.files.find((item) => item.name === file.name && item.size === file.size)
          },
           uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            },
         LinkRouter(o){
          this.$router.push({
            path:o
            })
          },
           onConfirm(data) {
            this.message.province = data[0].label
            this.message.city = data[1].label
            if(data.length>2){
              this.message.area = data[2].label
            }else{
              this.message.area = ''
            }

            this.show = false
          },
          onCancel() {
            this.show = false
          },
        },
      components: { WeuiDistpicker }
    }
</script>

<style scoped lang="less">
    .class1{width:135px;height:135px;float:left;}
    .class2{width:135px;height:135px;float:left;text-align: center;line-height:135px;font-size: 20px;}
    .class3{clear:both;}
  .setting{
      header{
          width:7.1rem;
          margin:0 auto;
          height:1.2rem;
          line-height: 1.2rem;
        img{
          width:0.26rem;
          vertical-align: middle;
        }
        i{
          font-size: 0.4rem;
          color: #2c2c2c;
          margin-left:0.5rem;
        }
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  }
  ul{
    li{
      border-bottom: 1px solid #f3f3f3;
      padding:0.2rem 0.2rem;
      overflow: hidden;
      height:0.7rem;
      line-height: 0.7rem;
      input{
        width:5rem;
        text-align:right;
         float: right;
         font-size: 0.34rem;
        border:0 none;
        margin-top:0.06rem;
        background: #fff;
      }
      input::-webkit-input-placeholder {
          /* placeholder颜色  */
         color: #b8b8b8;
     }
      span{
        font-size: 0.34rem;
        color: #2c2c2c;
        float: left;
      }
      i{
        display: inline-block;
        float: right;
         font-size: 0.34rem;
        color: #b8b8b8;
        img{
          width:100%;
           vertical-align: middle;
        }
      }
       em{
         float: right;
        display: inline-block;
        width:0.23rem;
         margin-left:0.2rem;
        img{
          width:100%;
           vertical-align: middle;
          margin-top:-0.15rem;
        }
      }
    }
    li.update{
      border-bottom: 0;
      overflow: visible;
      img{
        width:2.91rem;
        float: right;
        vertical-align: middle;
        margin-top:0.05rem;
      }
       ol{
        overflow: hidden;
         margin-top:0.6rem;
        li{
          width:2.1rem;
          padding:0;
          float: left;
          height:auto;
          margin-left:0.35rem;
          text-align: center;
          img{
            width:2.1rem;
            height:1.4rem;
          }
          span{
            font-size: 0.28rem;
            color: #b8b8b8;
            display: block;
            height:1rem;
            line-height: 1rem;
            text-align: center;
            width:100%;
          }
        }
        li:first-child{
          margin-left:0;
        }
      }
    }

  }
  button{
    width:3.7rem;
    height:0.8rem;
    outline: none;
    border:0 none;
    font-size:0.34rem ;
    color: #fff;
    border-radius: 0.5rem;
    position: fixed;
    left:1.8rem;
    bottom:1.5rem;
    background: -webkit-linear-gradient(left, #53acff , #b846ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #53acff, #b846ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #53acff, #b846ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #53acff , #b846ff); /* 标准的语法 */
  }
  .copy{
    width:100%;
    text-align: center;
    height:1rem;
    line-height: 1rem;
    font-size: 0.24rem;
    color:#2c2c2c;
      position: fixed;
    bottom:0.6rem;
    i{
      color:#53acff;
    }
  }
</style>
