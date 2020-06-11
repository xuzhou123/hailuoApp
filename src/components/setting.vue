<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/?i=2')" alt=""><i>个人设置</i>
      </header>
      <div class="line"></div>
      <ul>
        <li @click="imageinfo">
          <span>头像</span>
            <em><img src="../../static/img/right.png" alt=""></em>
         <i  :style="styleObj(live.avatar)">
           <!--<img :src="live.avatar" alt="">-->
         </i>
        </li>
        <li  @click="openPrompt('请填写您的昵称')" size="large">
          <span>昵称</span>
            <em><img src="../../static/img/right.png" alt=""></em>
         <i>{{live.user_nicename}}</i>
        </li>
        <li  @click="sheetVisible = true" size="large">
          <span>性别</span>
            <em><img src="../../static/img/right.png" alt=""></em>
         <i v-if="live.sex==0">保密</i>
         <i v-if="live.sex==1">男</i>
         <i v-if="live.sex==2">女</i>
        </li>
         <li @click="open('picker4')" size="large">
          <span>生日</span>
            <em><img src="../../static/img/right.png" alt=""></em>
         <i>{{live.birthday}}</i>
        </li>
        <li  @click="openPrompo('请填写您的个性签名')" size="large">
          <span>签名</span>
            <em><img src="../../static/img/right.png" alt=""></em>
         <i>{{live.signature}}</i>
        </li>
      </ul>
      <input style="opacity: 0" type="file" name="file" accept="image/*" @change="fileChanged" ref="file">
       <mt-datetime-picker
      ref="picker4"
      type="date"
      v-model="value4"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleChange">
    </mt-datetime-picker>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
    import store from '@/store/store'
    import api from '@/constant/api'
  import { Toast,MessageBox } from 'mint-ui'
    export default {
        name: "setting",
        data(){
          return{
             value: null,
             value4: null,
             DateTime:'选择日期',
             startDate: new Date('1960-1-1'),
             endDate: new Date(),
             sheetVisible: false,
             actions: [],
             sex:'保密',
             live:{}
          }
        },
        mounted(){
          this.getSetting()
            this.actions = [
            {
              name: '保密',
              method: this.openAlbum1
            },
            {
              name: '男',
              method: this.takePhoto
            }, {
              name: '女',
              method: this.openAlbum
            }];
        },
        methods:{
          styleObj(o){
              return  'background:url("'+o+'") center no-repeat;';
          },
          imageinfo(){
            this.$refs.file.click()
          },
          fileChanged(){
            var _this=this;
            var file = this.$refs.file.files[0];
       /*     console.log(file)
            var formData=new FormData();
            formData.append('img', this.$refs.file.files[0]);
            console.log(formData)
            let config = {
		            headers:{'Content-Type':'multipart/form-data'}
		        };
             this.axios.post(api.my_setting_eidt,formData,config)
            .then(function(res){
              _this.$root.login(res.data.state)

              })*/

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
              _this.live.avatar_thumb=this.result
              _this.live.avatar=this.result
                //console.log(this.result)
              _this.setInfo()

            }

          },
          getBase64Image(img) {
               var canvas = document.createElement("canvas");
               canvas.width = img.width;
               canvas.height = img.height;
               var ctx = canvas.getContext("2d");
               ctx.drawImage(img, 0, 0, img.width, img.height);
               var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
               var dataURL = canvas.toDataURL("image/"+ext);
               return dataURL;
          },
          getImage(img){
            let srcr = img
            if(srcr.indexOf('base64,')>-1){
                return srcr
            }
            var image = new Image();
            image.crossOrigin = '';
            image.src = img;
            image.onload = function(){
              var base64 = this.getBase64Image(image);
              return base64
            }
          },
           getSetting(){
             var _this=this;
              this.axios.get(api.my_setting)
              .then(function(res){
                _this.$root.login(res.data.state)
                var dat=res.data
                if(dat.state==0){
                  _this.live=res.data.content
                }else{
                  _this.showM(dat.msg)
                }

            })
          },
          takePhoto() {
            this.sex='男'
            this.live.sex='1';
            this.setInfo()
          },
          openAlbum() {
            this.sex='女'
            this.live.sex='2';
            this.setInfo()
          },
          openAlbum1() {
            this.sex='保密'
            this.live.sex='0';
            this.setInfo()
          },
          open(picker) {
            this.$refs[picker].open();
          },
          handleChange(value) {
              this.DateTime=this.forDate(value)
              this.live.birthday=this.forDate(value)
              this.setInfo()
          },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          forDate(o){
              var date = new Date(o);
              return date.getFullYear() + '-' + ((date.getMonth() + 1)>9?(date.getMonth() + 1):'0'+(date.getMonth() + 1)) + '-' + (date.getDate()>9?date.getDate():'0'+date.getDate());
          },
          openPrompt(o) {
             var _this=this;
              MessageBox.prompt(' ',o).then(({ value }) => {
                if (value) {
                  _this.live.user_nicename=value;
                  _this.setInfo()
                  //MessageBox.alert(`你的名字是 ${ value }`, '输入成功');
                }
              });
          },
           openPrompo(o) {
             var _this=this;
              MessageBox.prompt(' ',o).then(({ value }) => {
                if (value) {
                  _this.live.signature=value;
                  _this.setInfo()
                  //MessageBox.alert(`你的名字是 ${ value }`, '输入成功');
                }
              });
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
          setInfo(){
            var _this=this;

            var json={avatar:this.getImage(this.live.avatar),user_nicename:this.live.user_nicename,sex:this.live.sex,birthday:this.live.birthday,signature:this.live.signature};
            console.log(json)
           // var param= this.$root.entrypt(json);
            this.axios.post(api.my_setting_eidt,this.$qs.stringify(json))
            .then(function(res){
              _this.$root.login(res.data.state)
              if(res.data.state==0){
                  _this.getSetting()
                }else{
                  _this.showM(res.data.msg);
                }
              })
          },
        }
    }
</script>

<style scoped lang="less">

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
          margin-top:-0.12rem;
        }
      }
    }
    li:first-child{
      height:1.3rem;
      line-height: 1.3rem;
       i{
        width:1.2rem;
        height:1.2rem;
         background-size:cover !important;
        border-radius: 50%;
         overflow: hidden;
      }
    }
  }
</style>
