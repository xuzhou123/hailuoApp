<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/?i=4')" alt=""><i>购买靓号</i>
        <img style="width:0.9rem;float: right;margin-top:0.4rem;" src="../../static/img/payfor.png" alt=""  @click="LinkRouter('/pay')">
      </header>
      <div class="line"></div>
      <ul>
        <li>购买账号：<em>{{userid}}</em><span @click="openPrompt('请填写账号！')">给他人充值 <img src="../../static/img/pydj.png" alt=""> </span></li>
        <li>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<em>{{nick}}</em></li>
      </ul>
      <div class="line" style="border-top: 0.1rem solid #eee"></div>
      <div class="pl">
        <span><img src="../../static/img/ulbg.png" alt="">
          <i>靓&nbsp;{{num}}</i>
        </span>
        <p>账户余额：<em>{{moneycoin}}钻石</em></p>
        <p>购买时长：<em>30天</em></p>
        <p>应付金额：<em>{{coin}}钻石</em></p>
      </div>
      <div class="pay_z" @click="Follow()"><img src="../../static/img/klpy.png" alt=""></div>
    </div>
</template>

<script>
  import store from '@/store/store'
  import api from '@/constant/api'
  import { Toast,MessageBox  } from 'mint-ui'
    export default {
        name: "setting",
        data(){
            return{
                nick:'',
                userid:'',
                coin:'',
                moneycoin:'',
                num:'',
                id:""
            }
        },
        mounted(){
              this.getuser()
              this.coin=this.$route.query.coin
              this.num=this.$route.query.num
              this.id=this.$route.query.id
        },
        methods:{
           LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          openPrompt(o) {
              var _this=this;
              MessageBox.prompt(' ',o).then(({ value }) => {
                  if (value) {
                      _this.setInfo(value)
                  }
              });
          },
           setInfo(o){
                var _this=this;
               var json={user_login:o};
               console.log(json)
                this.axios.post(api.mall_user_search,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.nick=dat.content.user_nicename
                            _this.userid=dat.content.id
                        }else{
                            _this.showM(dat.msg)
                        }
                    })
            },
          getuser(){
              var _this=this;
              this.axios.post(api.person)
              .then(function(res){
                  var dat=res.data
                  _this.$root.login(res.data.state)
                  if(dat.state==0){
                      _this.nick=dat.content.user_info.user_nicename
                      _this.userid=dat.content.user_info.id
                      _this.moneycoin=dat.content.user_info.coin
                  }else{
                      _this.showM(dat.msg)
                  }
              })
          },
          Follow(){
              var _this=this;
              var json={liang_id:this.id,to_uid:this.userid};
              console.log(json)
              this.axios.post(api.mall_buy_liang,this.$qs.stringify(json))
                  .then(function(res){
                      var dat=res.data
                      if(dat.state==0){
                          //_this.showM(dat.msg)
                          _this.LinkRouter('/?i=4')
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
.pay_z{
   width:6.1rem;
   height:0.66rem;
   margin:0 auto;
   margin-top:2rem;
   clear: both;
 }
  ul{
    font-size: 0.34rem;
    color: #2c2c2c;
    li{
      padding:0 0.2rem;
      height:1.13rem;
      line-height: 1.13rem;
      border-bottom: 1px solid #eee;
      img{
        width:0.4rem;
        vertical-align: middle;
      }
      span{
        font-size: 0.28rem;
        color:#808080 ;
        float: right;
      }
      em{
        color:#808080 ;
      }
    }

  }

  .pl{
    span{
      display: block;
      position: relative;
      margin-top:0.42rem;
      margin-left:0.2rem;
      img{
        width:2.1rem;
      }
      i{
        display: block;
        width:2.1rem;
        text-align: center;
        position: absolute;
        top:0.1rem;
        left:0;
        color: #fff;
        font-size: 0.24rem;
      }
    }
    p{
      height:1rem;
      padding-left: 0.2rem;
      line-height: 1rem;
      font-size: 0.34rem;
      color: #2c2c2c;
      em{
        color: #808080;
      }
    }
  }
</style>
