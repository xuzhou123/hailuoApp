<template>
    <div class="daoju">
         <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/daoju')" alt=""><i>我的贵族</i>
      </header>
      <div class="line"></div>
      <div class="noble">
        <span>我的靓号 <em><img src="../../static/img/ulbg.png" alt=""></em>
        <i>靓{{name}}</i>
        </span>
        <span>有效期<em>剩余{{day}}天</em></span>
      </div>

    </div>
</template>

<script>
   import store from '@/store/store'
   import api from '@/constant/api'
   import { Toast } from 'mint-ui'
    export default {
        name: "setting",
        data(){
            return{
              name:'',
              day:''
            }
        },
        mounted(){
            this.getnoble()
            this.name=this.$route.query.name
            this.day=this.$route.query.day
        },
        methods:{
          styleobj(){
            return 'width:100%;height:3.26rem;background: url('+require('../../static/img/az.png')+') center; background-size: cover'
          },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          loginOut(){
              var _this=this;
              this.axios.get(api.loginout)
                .then(function(res){
                  var dat=res.data
                  if(dat.state==0){
                    _this.LinkRouter('/login_pwd')
                  }else{
                    _this.showM(dat.msg)
                  }
              })
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
          getnoble(){
            var _this=this;
            this.axios.post(api.mall_my_noble)
            .then(function(res){
              if(res.data.state==0){
                  _this.my_noble=res.data.content
                }
              })
          },
        }
    }
</script>

<style scoped lang="less">
       .daoju{
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
          margin-left:2.5rem;
        }
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  }
.noble{
  height:1.2rem;
  line-height: 1.2rem;
  padding:0 0.2rem;
  font-size: 0.3rem;
  span{
      position: relative;
    color: #2c2c2c;
      display: inline-block;
    em{
      color: #8d8d8d;
      margin-left:0.1rem;
    }
      i{
          position: absolute;
          right:0.6rem;
          bottom:0rem;
          color: #fff;
      }
  }
  span:first-child{
    float: left;
    width:60%;
      img{
          width:66%;
          margin-top:0.2rem;
      }
  }
   span:last-child{
       width:40%;
    float: right;
       text-align: right;
  }
}

</style>
