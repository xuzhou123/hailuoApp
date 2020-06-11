<template>
    <div class="shop">
      <header>
         <mt-navbar v-model="selected"  style="color:#8d8d8d;">
				  <mt-tab-item id="a1" @click.native="car()"  style="margin-left:1.5rem;flex: none;"> <span>座驾</span></mt-tab-item>
           <mt-tab-item id="a1_1"    style="margin-left:1rem;flex: none;"><span>靓号</span> </mt-tab-item>
				  <mt-tab-item id="a2" @click.native="noble()"   style="margin-left:1rem;flex: none;"><span>贵族</span> </mt-tab-item>
				</mt-navbar>
        <img src="../../static/img/payfor.png" alt=""  @click="LinkRouter('/pay')">
      </header>
         <mt-tab-container v-model="selected"   >
			  <mt-tab-container-item id="a1">
			    <ul>
            <li v-for="(item,index) in live" @click="buyGift(item)">
              <img :src="item.thumb" alt="">
              <span>{{item.name}}</span>
              <i>{{item.needcoin}}钻石/月</i>
            </li>
          </ul>
			  </mt-tab-container-item>

            <mt-tab-container-item id="a1_1">
              <div class="search">
                <span><img src="../../static/img/sear.png" alt=""></span>
                <input type="text" v-model="word" placeholder="请输入您想要的靓号">
                <i @click="english(1)">搜索</i>
              </div>
              <div class="numhot">
                <a href="javascript:void(0)" @click="selectvue(0)">
                 靓号位数 <i><img src="../../static/img/bit.png" alt=""> </i>
                </a>
                 <a href="javascript:void(0)"  @click="selectvue(1)">
                 靓号价格 <i><img src="../../static/img/bit.png" alt=""> </i>
                </a>
                 <a href="javascript:void(0)"  @click="selectvue(2)">
                 价格排序 <i><img src="../../static/img/bit.png" alt=""> </i>
                </a>
                <div class="tranitm" v-show="tran">
                  <p v-for="(item,index) in dource" @click="english(item.id)">{{item.name}}</p>
                </div>

                <!--<div class="tranitm">
                  <p v-for="(item,index) in doucny">{{item.name=='0'?'全部':(item.name+'位')}}</p>
                </div>-->
              </div>
              <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll',clear:'both' }">
              <ul class="ulinfo" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <li v-for="(item,index) in liang_list" @click="LinkRouter(`/numbuy?id=${item.id}&coin=${item.coin}&num=${item.name}`)">
                  <img src="../../static/img/ulbg.png" alt="">
                  <span>靓{{item.name}}</span>
                  <p>{{item.coin}}钻石/月</p>
                </li>
              </ul>
             <p v-show="allLoaded" class="page-infinite-loading">
                  <mt-spinner type="fading-circle"></mt-spinner>
                  <i>加载中...</i>
             </p>
                </div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="a2">
          <mt-navbar v-model="selected1"   style="color:#8d8d8d; ">
            <mt-tab-item @click.native="titleInfo(item)" :key="index" v-for="(item,index) in mall_noble_list" :id="item.id.toString()" style="font-size: 0.26rem"> <span>{{item.name}}</span></mt-tab-item>
          </mt-navbar>

        <mt-tab-container v-model="selected1" class="mt-xb"  :style="iteminfo()" >
              <mt-tab-container-item id="1">
                <img src="../../static/img/x1.png" alt="">
              </mt-tab-container-item>

              <mt-tab-container-item id="2">
                   <img src="../../static/img/x2.png" alt="">
              </mt-tab-container-item>

              <mt-tab-container-item id="3">
                <img style="padding-top:0.5rem"  src="../../static/img/x3.png" alt="">
              </mt-tab-container-item>

              <mt-tab-container-item id="4">
                    <img style="padding-top:0.5rem"  src="../../static/img/x4.png" alt="">
              </mt-tab-container-item>

              <mt-tab-container-item id="5">
                   <img   src="../../static/img/x5.png" alt="">
              </mt-tab-container-item>

              <mt-tab-container-item id="6">
                     <img   src="../../static/img/x6.png" alt="">
              </mt-tab-container-item>

        </mt-tab-container>
            <ol>
            <li style="border-left:0;">
              <img src="../../static/img/b1.png" alt="">
              <p>开通通知</p>
              <span>开通时</span>
              <i>全站广播</i>
            </li>
             <li>
              <img src="../../static/img/b2.png" alt="">
              <p>贵族勋章</p>
              <span>彰显贵族</span>
              <i>专属身份荣誉</i>
            </li>
             <li>
              <img src="../../static/img/b3.png" alt="">
              <p>贵族用户名片</p>
              <span>尊贵身份</span>
              <i>以卡识人</i>
            </li>
             <li  style="border-left:0;">

               <img v-if="selected1=='4'||selected1=='5'||selected1=='6'" src="../../static/img/x3_1.png" alt="">
               <img v-else src="../../static/img/b4.png" alt="">
              <p>欢迎进场</p>
              <span>进场显示</span>
              <i>贵族酷炫特效</i>
            </li>
             <li>
               <img v-if="selected1=='5'||selected1=='6'" src="../../static/img/x4_1.png" alt="">
               <img v-else src="../../static/img/b5.png" alt="">
              <p>专属座驾</p>
              <span>专属座驾</span>
              <i>专属身份座驾</i>
            </li>
            <li>
              <img v-if="selected1=='6'" src="../../static/img/x5_1.png" alt="">
              <img v-else src="../../static/img/b6.png" alt="">
              <p>加速升级</p>
              <span>消费额外增加</span>
              <i>20%经验值</i>
            </li>
          </ol>
          <div class="money_month">
            <div class="left">
              <span>首开&nbsp;<em>{{titlemoney}}钻石</em>&nbsp;/月</span>
              <!--<i>续费仅需&nbsp;68元&nbsp;/月</i>-->
            </div>
            <div class="right" @click="flag=true">
              开通贵族
            </div>
          </div>
			  </mt-tab-container-item>
			</mt-tab-container>

       <div class="fmodel" v-if="flag" @click="flag=false"></div>
       <div class="cmodel" v-if="flag">
         <p>应付钻石：<i>{{needcoin}}钻石&nbsp;(首次开通)</i></p>
         <span @click="paymoney()">立即支付</span>
       </div>
        <div class="liang_model" v-if="tran" @click="tran=false"></div>
    </div>
</template>

<script>
  import api from '@/constant/api'
  import { Toast } from 'mint-ui'
    export default {
        name: "shop",
        data(){
          return{
             liang_length:[],
             liang_price:[],
             liang_sort:[],
             live:[
                {name:'白马',img:require('../../static/img/s1.png'),coin:'588'},
                {name:'蓝狮',img:require('../../static/img/s2.png'),coin:'788'},
                {name:'神龙',img:require('../../static/img/s3.png'),coin:'988'},
                {name:'黑摩托',img:require('../../static/img/s4.png'),coin:'588'},
                {name:'私人飞机',img:require('../../static/img/s5.png'),coin:'788'},
                {name:'航母战舰',img:require('../../static/img/s6.png'),coin:'988'},
              ],
             title:[
                {id:'a',name:'男爵',money:'98'},
                {id:'b',name:'子爵',money:'198'},
                {id:'c',name:'伯爵',money:'598'},
                {id:'d',name:'侯爵',money:'998'},
                {id:'e',name:'公爵',money:'5998'},
                {id:'f',name:'皇帝',money:'9998'},
             ],
             selected:'a1',
             selected1:'1',
             flag:false,
             zjid:'1',
             zjbuy:'1',
             needcoin:'',
             type:'mon',
             titlemoney:'1000',
             mall_noble_list:[],
             numberInfo:'',
             loading: false,
             allLoaded: true,
             wrapperHeight:0,
             page:0,
             len:10,
             arr_recommend:[],
             dource:[
             ],
            tran:false,
              length:1,
              price:1,
              sort:1,
              word:'',
              type:'',
              liang_list:[]
          }
        },
      mounted(){
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
          this.getcarlist()
          this.getnoblelist()
          this.getnumberinfo()
      },
      methods:{
          getnumberinfo(){
              var _this=this;
              this.axios.post(api.mall_liang_search)
                  .then(function(res){
                      if(res.data.state==0){
                              _this.liang_length=res.data.content.liang_length
                              _this.liang_price=res.data.content.liang_price
                              _this.liang_sort=res.data.content.liang_sort
                      }
                  })
          },
          english(o){
              this.tran=false
              if(this.type==0){
                  this.length=o
              }else if(this.type==1){
                  this.price=o
              }else if(this.type==2){
                  this.sort=o
              }
        /*      if(o=='res'){
                  this.length=1
                  this.price=1
                  this.sort=1
              }*/
              this.page=0
              this.Follow1()
          },
          selectvue(o){
              this.tran=!this.tran
              this.type=o
              if(o==0){
                this.dource=this.liang_length
              }else if(o==1){
                  this.dource=this.liang_price
              }else if(o==2){
                  this.dource=this.liang_sort
              }
          },
          iteminfo(){
            return "width:100%;height:3.26rem;background: url('"+require('../../static/img/az.png')+"') center; background-size: cover"
          },
          car(){
            this.type='mon'
            this.zjid='1'
            this.zjbuy='1'
            this.selected='a1'
          },
          noble(){
            this.type='jue'
            this.zjid='1'
            this.zjbuy='1'
            this.selected1='1'
            this.titlemoney='100'
            this.needcoin='100'
          },
          titleInfo(o){
            this.type='jue'
            this.zjid=o.id.toString()
            this.zjbuy='1'
            this.needcoin=o.needcoin
            this.titlemoney=o.needcoin
          },
          buyGift(o){
            this.type='mon'
            this.flag=true
            this.zjid=o.id
            this.zjbuy=o.buy_type
            this.needcoin=o.needcoin
          },
          paymoney(){
            var url=''
            if(this.type=='mon'){
               url=api.mall_buy_car
               var json={car_id:this.zjid,buy_type:this.zjbuy};
            }else{
               url=api.mall_buy_noble
               var json={noble_id:this.zjid,buy_type:this.zjbuy};
            }
            var _this=this;
            this.axios.post(url,this.$qs.stringify(json))
            .then(function(res){

                if(res.data.state==0){
                      _this.flag=false
                      _this.showM('购买'+res.data.msg+'，请在我的道具查看！')

                }else{
                  _this.showM(res.data.msg)
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
          LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          getcarlist(){
            var _this=this;
            this.axios.post(api.mall_car_list)
            .then(function(res){
              if(res.data.state==0){
                  _this.live=res.data.content
                }
              })
          },
          getnoblelist(){
            var _this=this;
            this.axios.post(api.mall_noble_list)
            .then(function(res){
              if(res.data.state==0){
                  _this.mall_noble_list=res.data.content
                }
              })
          },
          Follow(){
               var _this=this;
               var json={liang_length:this.length,liang_price:this.price,liang_sort:this.sort,key_word:this.word,page:this.page,length:this.len};
              this.axios.post(api.mall_liang_list,this.$qs.stringify(json))
                .then(function(res){
                  var dat=res.data
                  if(dat.state==0){
                      if(dat.content.length<=0){
                        _this.loading=true
                      }else{
                        _this.loading=false
                      }
                          _this.liang_list=_this.liang_list.concat(res.data.content)
                      _this.allLoaded=false
                  }else{
                    _this.showM(dat.msg)
                  }
              })
          },
          Follow1(){
              var _this=this;
              var json={liang_length:this.length,liang_price:this.price,liang_sort:this.sort,key_word:this.word,page:this.page,length:this.len};
              console.log(json)
              this.axios.post(api.mall_liang_list,this.$qs.stringify(json))
                  .then(function(res){
                      var dat=res.data
                      if(dat.state==0){
                          _this.liang_list=res.data.content
                      }else{
                          _this.showM(dat.msg)
                      }
                  })
          },
         loadMore() {
            this.loading = true;
            this.allLoaded = true
            var _this=this
            this.forflag=setTimeout(() => {
              _this.page++
              _this.Follow()
            }, 1000);
          }
      }
    }
</script>

<style scoped lang="less">
  .page-infinite-loading{
        text-align: center;
        height: 50px;
        line-height: 50px;
        padding-bottom: 50px;
        span{
          display: inline-block;
          vertical-align: middle;
        }
        div{
          display: inline-block;

          margin-right: 5px;
        }
        i{
          color: #ccc;
          vertical-align: middle;
        }
 }
  .search{
    height:0.7rem;
    width:7.1rem;
    border-radius: 0.5rem;
    border:1px solid #eee;
    box-shadow: 0 2px 0.1rem #ddd;
    margin:0.15rem auto;
    span{
      display: block;
      width: 0.32rem;
      float: left;
      margin-left:0.4rem;
      img{
        width:100%;
        margin-top:0.21rem;
      }
    }
    input{
      display: block;
      border: 0;
      width:5.1rem;
      height:0.7rem;
      float: left;
      color:#b6b6b6;
      font-size: 0.28rem;
      margin-left:0.2rem;
    }
    i{
      display: block;
      width:1rem;
      height:0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.28rem;
      color: #306AFF;
      border-radius: 0.5rem;
      float: left;
    }

  }

  .numhot{
    text-align: center;
    border:1px solid #eee;
    border-left: 0;
    border-right: 0;
  position: relative;
    a{
      display: block;
      width:2.5rem;
      float: left;
      text-align: center;
      font-size:0.34rem;
      color: #2c2c2c;
      height:0.76rem;
      line-height: 0.76rem;
    }
    i{
      width:0.35rem;
      display: inline-block;
      img{
        width:100%;
        vertical-align: middle;
      }
    }
    .tranitm{
      width: 100%;
      position: absolute;
      left:0;
      top:0.76rem;
      z-index: 101;
      background: #fff !important;
      overflow: hidden;
      p{
        background: #FFF;
        border-bottom: 1px solid  #eee;
        height:0.76rem;
        line-height: 0.76rem;
        font-size: 0.28rem;
        color: #2c2c2c;
        padding:0 0.3rem;
        text-align: left;
      }
    }
  }
  .liang_model{
      width:100%;
      height:100%;
      left:0;
      bottom: 0;
      position: fixed;
      z-index: 100;
  }
  .ulinfo{
    box-sizing: border-box;
    li{
      width:2.5rem;
      float: left;
      text-align: center;
      position: relative;
      height: auto;
      margin-left:0 !important;
      margin-top: 0 !important;
      padding:0.3rem 0 0.1rem 0;
      border-bottom: 1px solid #eee;
      img{
        width:2.1rem;
        margin:0 auto;
      }
      span{
        width: 100%;
         position: absolute;
        display: block;
         font-size: 0.24rem;
         color: #fff;
        top:0.41rem;
      }
      p{
        font-size: 0.24rem;
        color: #8d8d8d;
        height:0.6rem;
        line-height: 0.6rem;
      }
    }
    li:nth-child(3n+1) {
        padding-left: 0.2rem;
    }
    li:nth-child(3n+3) {
        padding-right: 0.2rem;
    }
  }
  .fmodel{
    width:7.5rem;
    height:100%;
    position: fixed;
    top:0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
  }
  .cmodel{
     width:7.5rem;
    height:3rem;
    background: #fff;
    position: fixed;
    bottom:0;
    z-index: 11;
    p{
      height:1.3rem;
      line-height: 1.3rem;
      padding:0 0.3rem;
      border-bottom: 1px solid #eee;
      font-size: 0.3rem;
      color: #2c2c2c;
      i{
        color: #306AFF;
      }
    }
    span{
      display: block;
      width:6.1rem;
      height:0.66rem;
      text-align: center;
      line-height: 0.66rem;
      background: #306AFF;
      color: #fff;
      font-size:0.3rem ;
      margin:0 auto;
      margin-top:0.5rem;
      border-radius: 0.1rem;
    }
  }
  .mint-navbar .mint-tab-item{
    padding: 0.33rem 0;
  }
  .mt-xb{
    text-align: center;
    img{
      width:4.27rem;
      padding-top:0.2rem;
    }
  }
    header{
      height:1rem;
      line-height: 1rem;
      font-size: 0.36rem;
      color: #2c2c2c;
      padding:0 0.2rem;
      border-bottom: 1px solid #eee;
      position: relative;
      overflow: hidden;
      img{
        width:0.84rem;
        float: right;
        vertical-align: middle;
        margin-top:0.2rem;
        position: absolute;
        top:0.1rem;
        right:0.2rem;
      }
    }
  ul{
    overflow: hidden;
    li{
      width:2.32rem;
      height:3.12rem;
      float: left;
      font-size: 0.24rem;
      text-align: center;
      margin-left:0.06rem;
      box-sizing: border-box;
      margin-top:0.1rem;
      img{
        width:100%;
        background: #f5f5f5;
      }
      span{
        display: block;
        color: #2c2c2c;
      }
      i{
        display: block;
        color:#8d8d8d ;
      }

    }
    li:nth-child(3n+1){
      margin-left:0.2rem;
    }
  }
  ol{
    overflow: hidden;
    margin-top:-0.18rem;
    li{
      width:2.5rem;
      height:2.58rem;
      border-left: 1px solid #eee;
      border-bottom: 1px solid #eee;
      float: left;
      text-align: center;
      box-sizing: border-box;
      img{
        width:1.06rem;
        margin-top:0.15rem;
      }
      p{
        font-size: 0.24rem;
        color: #2c2c2c;
      }
      span{
        display: block;
        font-size: 0.22rem;
        color: #8d8d8d;
      }
      i{
        display: block;
        font-size: 0.22rem;
        color: #8d8d8d;
      }
    }
  }
  .money_month{
    height:1.15rem;
    width:100%;
    overflow: hidden;
    padding:0 0.3rem;
     box-sizing: border-box;
    line-height: 0.3rem;
    box-shadow: 0 -0.1rem 0.15rem #eee;
    position: fixed;
    bottom:1rem;
    .left{
      width:60%;
      float: left;
      span{
        display: block;
      font-size:0.24rem ;
        color:#2c2c2c;
        margin-top:0.4rem;
        em{
          color: #306AFF;
        }
      }
      i{
        font-size:0.22rem ;
         color:#8d8d8d;
      }
    }
    .right{
      width:40%;
      float: right;
      width:1.2rem;
      height:0.4rem;
      margin-top:0.35rem;
      border-radius: 0.1rem;
      background: #306AFF;
      color:#fff;
      font-size:0.22rem ;
      text-align: center;
      line-height: 0.4rem;
      display: block;
    }

  }
.mint-navbar .mint-tab-item.is-selected{
  border:0 none;
}
/deep/ .mint-tab-item-label{
  font-size:0.34rem !important;
}
 
</style>
