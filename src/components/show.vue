<template>
	<div id="live">
   <div class="header">
      <a class="btn-logo goHome" href="javascript:void(0)" @click="goRouter('/?i=0')">
        <img src="../../static/img/logo.png" alt="">
      </a>
      <a href="javascript:void(0)"  @click="goRouter('/?i=0')" class="btn-openHome goHome">进入首页</a>
   </div>
		<div class="video" style="height:200px;width:100%;"  @click="flag=false"></div>
	 <div class="nav"  @click="flag=false">
      <mt-button size="small" :class="['tab-bu',{'tab-bued':active == 'tab-container1'}]"  @click.native.prevent="active = 'tab-container1'">聊天</mt-button>
      <mt-button size="small" :class="['tab-bu',{'tab-bued':active == 'tab-container2'}]" @click.native.prevent="active = 'tab-container2'">主播</mt-button>
    </div>
    <div class="page-tab-container"  ref="wrapper" :style="sHeight()">
      <mt-tab-container class="page-tabbar-tab-container" style="height: 100%;"  v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1" >
          <div class="text_dm">
              <div class="text_div" ref="scrollInfo" @click="flag=false" >
                <ul >
                  <li   style="font-size: 0.24rem;line-height:0.35rem;color:yellowgreen;font-weight: bold;margin-top:0.1rem;"><i style="display: inline;font-size: 0.24rem;color:#0086FF ">直播间消息：</i>{{warning}}</li>
                  <li  v-for="(item,index) in live" v-if="item.msgtype=='0'"  class="system_li">
                    欢迎 <span class="system">{{item.ct.user_nicename}}</span> 进入频道
                  </li>

                  <li v-for="(item,index) in live" v-if="item.msgtype=='2'" class="a1">
                    <span><img src="../../static/img/level.png" alt="">&nbsp;{{item.level}}</span>
                    <i>{{item.uname}}:</i>
                    <em>{{item.ct}}</em>
                  </li>
                </ul>
              </div>
          </div>
            <div class="c-operate">

            <div class="c-operate-sub c-operate-input-wrap" >
                <input id="js-msg-input" v-model="valueInfo" @focus="infoChange()" class="c-operate-input" placeholder="吐个槽呗~">
                <span ref="send" class="c-operate-sendBtn" @click="Send">发送</span>
            </div>
            <span class="c-operate-sub c-operate-iconCharge"></span>
            <span class="c-operate-sub c-operate-iconGift" @click="getGift()" ></span>

            </div>


              <div class="GiftPanel" v-show="flag">
                <div class="GiftPanel-content">
                    <div class="GiftPanel-content-wrap">

                <div :class="['GiftItem',{selected:index==IndexNum}]" data-id="192" v-for="(item,index) in gift" @click="selectGift(index,item)">
                    <img class="GiftItem-icon" :src="item.gifticon">
                    <span class="GiftItem-name">{{item.giftname}}</span>
                    <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                </div>

            </div>
                </div>

                <div class="GiftPanel-footer">
                    <div class="balance">
                        <i></i>
                        <span>{{locKcoin}}</span>
                    </div>
                    <div class="btn-charge" @click="goRouter('/pay')">充值</div>
                    <div class="btn-send vaild" @click="SendGift">发送</div>
                </div>
            </div>

          <div :class="['Banner',{'active':java}]" data-id="undefined" style="top: 40px;">
                 <i class="Banner-ava" :style="styleObj(amintGit.avatar)" ></i>
                <!--<img class="Banner-ava" :src="amintGit.avatar">-->
                <span class="Banner-text">
                    <span class="Banner-text-nick">{{amintGit.name}}</span>
                    <span class="Banner-text-tip">送出 {{amintGit.gitf}}</span>
                </span>
                <img class="Banner-gift" :src="amintGit.img">

            <span class="Banner-hittimes hit"><span class="nf"></span><span :class="['n','n'+amintGit.num]"></span></span>
          </div>

        </mt-tab-container-item>

        <mt-tab-container-item id="tab-container2">
          <div class="con_live">
            <section>
              <span class="t1" :style="styleObj(liveCt.avatar)"></span>
              <div class="t2">
                <i>{{liveCt.title}}</i>
                <em>{{liveCt.user_nicename}} <img src="../../static/img/file.png" alt=""> <span>2569</span></em>
              </div>
              <div class="t3" style="background: #0086FF" v-if="content.is_attention==0" @click="setFollow(liveCt.uid)"><i class="iconfont">&#xe692;</i>关注</div>
              <div class="t3" v-if="content.is_attention==1" @click="openConfirm(liveCt.uid)">已关注</div>
              <div style="clear: both"></div>
              <p>{{liveCt.title}}</p>
            </section>
            <div class="mysql">
              <p>相关直播</p>
               <ul id="live-list" class="page-infinite-list" >
                <li v-for="(item,index) in arr_my_attention" @click="showRouter(item.touid)"  :style="styleObj(item.users_live.avatar)">
                  <!--<img :src="item.users_live.avatar"  :onerror="onError(item.users_live.avatar_thumb,item)" class="icon-big" >-->
                   <!--<img :src="item.users_live.avatar"   class="icon-big" >-->
                  <div class="h-info">
                    <span class="fans">{{item.users_live.user_nicename}}</span>
                    <span class="live-icon"><i class="iconp">&#xe729;</i>{{item.users_live.nums}}</span>
                  </div>
                  <!--<p v-if="item.users_live.islive==1"><img src="../../static/img/m1.png" alt=""></p>-->
                </li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
	</div>
</template>

<script>
import Vue from 'vue'
import store from '@/store/store'
import api from '@/constant/api'
import * as types from '@/store/types'
import { Toast,MessageBox  } from 'mint-ui'
import VueSocketio from 'vue-socket.io';//socket即时通讯
//console.log(api.send_gift)
import domain from '../../untils/config'
Vue.use(VueSocketio,domain.socketDomain);//socket即时通讯
//Vue.use(VueSocketio,'http://www.huidaxinzhi.com:19967/');//socket即时通讯

export default {
  	data() {
	   	return {
	   	   system:[
           {name:'晓东'},
           {name:'晓东'},
           {name:'晓东'}
         ],
	       active: 'tab-container1',
         videoUrl:'',
         live:[
           //{level:'18',name:this.name,text:'法国梵蒂冈梵蒂冈反对改革！'}
         ],
        valueInfo:'',
        amintGit:{
	      avatar:'https://apic.douyucdn.cn/upload/avatar_v3/201810/19ac05725521f31099f38c8c810d435f_middle.jpg',
        name:'堡垒之夜爸爸',
        gitf:'火箭',
        img:'https://gfs-op.douyucdn.cn/dygift/1606/39b578b3cb8645b54f9a1001c392a237.gif',
        num:1
        },//礼物
        gift:[
          /*{img:require('../../static/img/l2.png'),name:'风油精',num:'1',id:2},
          {img:require('../../static/img/l3.png'),name:'水晶鞋',num:'10',id:3},
          {img:require('../../static/img/l4.png'),name:'跑车',num:'10',id:4},
          {img:require('../../static/img/l5.png'),name:'大南瓜',num:'10',id:5},
          {img:require('../../static/img/l1.png'),name:'乌龟',num:'50',id:1},
          {img:require('../../static/img/l8.png'),name:'钻石',num:'66',id:8},
          {img:require('../../static/img/l6.png'),name:'流星',num:'3000',id:6},
          {img:require('../../static/img/l7.png'),name:'游轮',num:'13140',id:7},*/
        ],
        IndexNum:0,
        flag:false,
        name:'',
        level:'',
        arr_my_attention:[],
        wrapperHeight:0,
        liveCt:[],
        content:[],
        java:false,//礼物特效是否显示
        giftname:'风油精',
        giftimg:require('../../static/img/l2.png'),
        avatar:'',
        id:'',
        hls:'',
        uid:'',
        giftid:'',//礼物id
        warning:'',//警告信息
        locKcoin:0

	    };
  	},
    sockets:{
      broadcastingListen:function(o){
          //console.log(o,888)
          for(var i in o){
            //console.log(o[i])
             var data = JSON.parse(o[i]);
            console.log(data)
              var msgObject = data.msg[0];
              var msgtype = msgObject.msgtype;
              var msgaction = msgObject.action;
              var msgmethod = msgObject._method_;
              if(msgmethod=='SendMsg'){ //聊天信息
                //this.sendMsg(msgObject);
               // if(data.msg[0].msgtype==2){//聊天信息
                    //this.live.push({level:data.msg[0].level,name:data.msg[0].uname,text:data.msg[0].ct})
                    this.live.push(data.msg[0])
                    this.$refs.scrollInfo.scrollTop=this.$refs.scrollInfo.scrollHeight;
                //}else if(data.msg[0].msgtype==0){//欢饮信息

                //}else if(data.msg[0].msgtype==4){//系统信息

                //}

              }else if(msgmethod=='SendGift'){ //赠送礼物
               // this.sendGift(msgObject);
                   this.amintGit.avatar=data.msg[0].uhead
                   this.amintGit.name=data.msg[0].uname
                   this.amintGit.gitf=data.msg[0].ct.giftname
                   this.amintGit.img=data.msg[0].ct.gifticon
                   this.amintGit.num=data.msg[0].ct.giftcount
                   this.java=true
                   this.flag=false
                   setTimeout(()=>{
                     this.java=false
                   },2500)
              }else if(msgmethod=='BuyKeeper'){ //购买守护
                //this.buyKeeper(msgObject);
              }else if(msgmethod=='SendHorn'){ //喇叭
                //this.sendHorn(msgObject);
              }else if(msgmethod=='SystemNot'){ //系统信息
                //this.systemNot(msgObject);
                 this.warning=data.msg[0].ct
              }else if(msgmethod=='StartEndLive'){ //开关播
                //this.showEndRecommend(msgObject);
              }else if(msgmethod=='disconnect'){ //关播
                //this.disconnect(msgObject);
              }else if(msgmethod=='requestFans'){ //关播
                //var nums=msgObject.ct.data.info.nums;
                //this.setRoomNums(nums);
              }
          }
      },
      conn:function(o){
        console.log(o,'连接服务器回应')
      },
      error:function(o){
       console.log(o,'错误')
      },
      reconnect:function(o){
       console.log(o,'重连')
      },
      disconnect:function (o) {
        console.log(o,'断开连接')
      }

    },
  	mounted(){
  	  var _this=this
      this.$nextTick(function(){
             this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-200;
            //console.log(document.documentElement.clientHeight,this.$refs.wrapper.offsetTop )
            this.videoUrl=this.$route.query.id
            //this.LinkRouter();
            this.getHome()
            //this.getPerson()
            this.Follow()
            
         

      })
  	},
  	methods:{
        clickButton: function(val){
          //console.log('小时')
            // $socket is socket.io-client instance
            this.$socket.emit('broadcast',val);
            //Socket.emitData('broadcast',msg);
        },
        SendGift(){
            new Promise((resolve,reject)=>{
              this.java=false
             this.getPerson(resolve)
           }).then((e)=>{
             //this.live.push({level:this.level,name:this.name,text:this.valueInfo})
             //this.$refs.scrollInfo.scrollTop=this.$refs.scrollInfo.scrollHeight;
              this.sendgiftname()
           })
        },
       sendgiftname(){
             var _this=this;
             var json={touid:this.liveCt.goodnum,giftid:this.giftid,showid:this.liveCt.showid,num:1}
              this.axios.post(api.send_gift,this.$qs.stringify(json))
              .then(function(res){
                //_this.$root.login(res.data.state)
                var dat=res.data
                _this.$root.login(dat.state)
                if(dat.state==0){
                  //var dataNum=dat.content;
                  function FormatNowDate() {
                    var mDate = new Date();
                    var H = mDate.getHours();
                    var i = mDate.getMinutes();
                    var s = mDate.getSeconds();
                    if (H < 10) {
                        H = '0' + H;
                    }
                    if (i < 10) {
                        i = '0' + i;
                    }
                    if (s < 10) {
                        s = '0' + s;
                    }
                    //return H + ':' + i + ':' + s;
                    return H + ':' + i;
                }
                console.log()
                  var msg = '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"SendGift","evensend":"'+dat.content.evensend+'","action":"0","ct":"'+dat.content.gifttoken+'","msgtype":"1","level":"'+dat.content.level+'","uid":"'+dat.content.uid+'","timestamp":"'+FormatNowDate()+'","uname":"'+_this.name+'","uhead":"'+_this.avatar+'","vip_type":"0","liangname":"'+_this.name+'"}]}';
					         _this.clickButton(msg)

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
        sHeight(){
          return  'height:'+this.wrapperHeight+'px';
        },
  	    styleObj(o){
              return  'background:url("'+o+'") center no-repeat;';
        },
  	   getPerson(o){
             var _this=this;
              this.axios.get(api.person)
              .then(function(res){
                //_this.$root.login(res.data.state)
                var dat=res.data
                _this.$root.login(dat.state)
                if(dat.state==0){
                 _this.name=dat.content.user_info.user_nicename
                 _this.level=dat.content.user_info.level
                 _this.avatar=dat.content.user_info.avatar
                  _this.uid=dat.content.user_info.uid
                  return o('v')
                }else{
                   _this.showM(dat.msg)
                }
            })
       },
       getGift(){
             var _this=this;
              this.axios.get(api.person)
              .then(function(res){
                //_this.$root.login(res.data.state)
                var dat=res.data
                _this.$root.login(dat.state)
                if(dat.state==0){
                  _this.flag=true
                 _this.locKcoin=dat.content.user_info.coin
                }else{
                   _this.showM(dat.msg)
                }
            })
       },
       showRouter(o){
         // console.log(o)
            this.$router.push({
              path:'/show',
              query:{
                id:o
              }
              })
       },
  	  goRouter(o){
            this.$router.push({
              path:o
              })
      },
  	  selectGift(i,d){
  	    this.IndexNum=i
        this.giftname=d.giftname
        this.giftimg=d.gifticon
        this.giftid=d.id
      },
  	  Send(){
  	     new Promise((resolve,reject)=>{
  	       this.getPerson(resolve)
         }).then((e)=>{
           if(this.valueInfo.length>30){
             this.showM('发送信息不得超过30字！')
             return
           }
           if(this.valueInfo.length<1){
             return
           }
           //var msg = '{"msg":[{"_method_":"SystemNot","action":"13","ct":"' + this.valueInfo + '","msgtype":"4","uname":"' + this.name + '","toname":"' + this.name + '","touid":' + this.uid  + ',"uid":' + this.uid + ',"level":' + this.level + ',"vip_type":"0","liangname":"' + this.name + '"}],"retcode":"000000","retmsg":"ok"}';
            var msg = '{"msg":[{"_method_":"SendMsg","action":0,"ct":"' + this.valueInfo + '","msgtype":"2","tougood":"","touid":"","touname":"","ugood":"' + this.uid + '","uid":"' + this.uid + '","uname":"' + this.name + '","level":"' + this.level + '","vip_type":"0","liangname":"' + this.name+ '"}],"retcode":"000000","retmsg":"OK"}';
          this.clickButton(msg)
           this.valueInfo=''
         /*  this.live.push({level:this.level,name:this.name,text:this.valueInfo})
           this.$refs.scrollInfo.scrollTop=this.$refs.scrollInfo.scrollHeight;*/
         })

      },
  	  infoChange(){
          this.$refs.send.style.display='block'
      },
      getHeight(){
        var Height = document.documentElement.clientHeight;
  	    //return 'min-height:150px;height:'+(Height-200-35)+'px'
        console.log('width:100%;'+Height+'px')
        return 'width:100%;height:'+Height+'px'
      },
      inituser(o){
            var _this=this;
            this.axios.get(api.setNodeInfo+'?liveuid='+o)
            .then(function(res){

              if(res.data.state==0){

                  //if(localStorage.getItem('uid')!=''&&localStorage.getItem('uid')!=undefined&&localStorage.getItem('uid')!=null){
                    _this.$socket.emit('conn', {uid:res.data.userinfo.id,roomnum:_this.liveCt.goodnum,stream:_this.liveCt.stream,nickname: res.data.userinfo.user_nicename,equipment: 'pc',token:res.data.userinfo.token});
                    //console.log({uid:res.data.userinfo.id,roomnum: _this.liveCt.goodnum,stream:_this.liveCt.stream,nickname: res.data.userinfo.user_nicename,equipment: 'pc',token:res.data.userinfo.token})
                 // };
                }
              })
      },
      getHome(){
  		   var _this=this;
  		    var json={roomnum:this.videoUrl};
	        this.axios.post(api.home+'?'+this.$qs.stringify(json))
	        .then(function(res){
	          var dat=res.data
	          if(dat.state==0){
	             _this.LinkRouter(dat.content.hls);
	             _this.liveCt=dat.content.liveinfo
              _this.content=dat.content
              _this.hls=dat.content.hls
              _this.gift=dat.content.gift_list
              _this.giftid=dat.content.gift_list[0].id
               _this.inituser(dat.content.liveinfo.uid)

            }
           // _this.live=res.data.content.show_list
	    	})
      },
  		LinkRouter(o){
  			var videoObject = {
				container: '.video',//“#”代表容器的ID，“.”或“”代表容器的class
				variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
				autoplay:true,//自动播放
				live:false,
				poster:'../../static/img/default.jpg',//封面图片
				//video:'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4',//视频地址
          //http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8
        //video:'../../static/mp4.mp4'
        video:o
        //video:'http://31572.liveplay.myqcloud.com/live/31572_21619_1539075450.flv',
			};
			var player=new ckplayer(videoObject);
  		},
       Follow(){
             var _this=this;
             var json={page:1,length:4};
             this.axios.post(api.attention,this.$qs.stringify(json))
              .then(function(res){
                var dat=res.data
                //_this.$root.login(dat.state)
                if(dat.state==0){
                    _this.arr_my_attention=res.data.content.arr_my_attention
                }else{
                  _this.showM(dat.msg)
                }

            })
        },
       setFollow(o){
           var _this=this;
            var json={touid:o};
            this.axios.post(api.give_attention,this.$qs.stringify(json))
            .then(function(res){
              _this.$root.login(res.data.state)
              var dat=res.data
              if(dat.state==0){
                _this.getHome()
              }else{
                _this.showM(dat.msg)
              }

             // _this.live=res.data.content.show_list
          })
        },
        openConfirm(o) {
            var _this=this;
            MessageBox.confirm('确定取消关注?', '提示').then((value)=>{
                  if(value){
                      _this.closeFollow(o)
                  }
            })
          },
           closeFollow(o){
             var _this=this;
              var json={touid:o};
              this.axios.post(api.cancel_attention,this.$qs.stringify(json))
              .then(function(res){
                var dat=res.data
                _this.$root.login(res.data.state)
                _this.getHome()
               // _this.live=res.data.content.show_list
            })
          },
  	}
}
</script>

<style type="text/css" scoped="scoped" lang="less">
@font-face {
  font-family: 'iconfont';  /* project id 862104 */
  src: url('//at.alicdn.com/t/font_862104_38x7fxwclud.eot');
  src: url('//at.alicdn.com/t/font_862104_38x7fxwclud.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_862104_38x7fxwclud.woff') format('woff'),
  url('//at.alicdn.com/t/font_862104_38x7fxwclud.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_862104_38x7fxwclud.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  }
   .mint-tab-container-item{
     .mysql{
       p{
         padding:0 0.2rem;
         font-size: 0.34rem;
         color: #2c2c2c;
         margin-top:0.35rem;
       }
     }
     .con_live{
       position: absolute;
       width:100%;
       height:100%;
       overflow-y: scroll;
     }

    section{
      padding:0.2rem 0.2rem;
      border-bottom: 1px solid #f3f3f3;
      span.t1{
        display: block;
        width:0.8rem;
        height:0.8rem;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        background-size: cover !important;
      }
      div.t2{
        float: left;
        padding-left: 0.3rem;
        i{
          font-size: 0.28rem;
          color: #2c2c2c;
          display: block;
        }
        em{
          font-size: 0.22rem;
          color: #0086FF;
          display: block;
          span{
            color: #ccc;
          }
          img{
            width:0.18rem;
            vertical-align: middle;
            margin-top:-0.05rem;
            margin-left:0.3rem;
          }
        }

      }
      div.t3{
        width:1rem;
        height:0.4rem;
        line-height:0.45rem;
        background: #A2A2A2;
        border-radius: 0.1rem;
        color:#fff;
        font-size: 0.26rem;
        text-align: center;
        float: right;
        margin-top:0.1rem;
      }
      p{
         color:#8d8d8d;
        font-size: 0.22rem;
        margin-top:0.1rem;
      }
    }
  }
  .page-tab-container{

  }
  .text_div{
    ul{
      padding:0 0.2rem;
      padding-bottom: 1.8rem;
      li{
        padding:0.05rem 0;
        span{
          display: inline-block;
          width:0.8rem;
          height:0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #eec186;
          color: #fff;
          font-size:0.24rem;
          /*-webkit-text-stroke: 0.01rem red;*/
          color:#fff;
          border-radius: 0.1rem;
          img{
            width:0.3rem;
            vertical-align: middle;
          }
        }
        i{
          font-size: 0.28rem;
          color: #bbb;
        }
        em{
          font-size: 0.28rem;
          color: #2c2c2c;
        }
      }
      li.system_li{
        font-size: 0.28rem !important;
        color: #666;
        span{
          font-size: 0.28rem !important;
          display: inline;
          color: #0086FF;
          background: transparent;
          font-weight: bold;
          border-radius: 0;
        }
      }
    }
  }
  .c-operate-iconGift{
    background: url(../../static/img/lw.png) 50% no-repeat;
  }
.header{
  width:7.1rem;
  margin:0 auto;
  height:1rem;
  line-height: 1rem;
  img{
    width:35%;
    vertical-align: middle;
  }
  a:last-child{
    display: block;
    float: right;
    width: 1.6rem;
    height:0.5rem;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.28rem;
    color: #333;
    margin-top: 0.23rem;
  }
}

  #live{
    position: relative;
  }
  video{
    position: absolute;
  }
  .video{
    position: absolute;
    z-index: 1;
  }
  .content{
    position: absolute;
    top:20px;
    left:20px;
    font-size: 35px;
    color: red;
    z-index: 10000;
  }

.item {
    display: inline-block;
  }


  .nav {
    padding: 0;
    border-bottom:1px solid #eee;
    text-align:center;
    overflow: hidden;
  }
  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
  .tab-bu{
    background-color:#fff !important;
    border:0 none;
    box-shadow:none;
    padding:0;
    width:50%;
    float: left;
    text-align: center;
    color: #333;
    position: relative;
    box-sizing: border-box;
  }
  .tab-bued{
     color: #0086FF;
  }
  .tab-bued::after{
     opacity: 1 !important;
   }
  .tab-bu::after{
    display: inline-block;
    position: absolute;
    content: " ";
    width: 15px;
    height: 3px;
    background-color: #0086FF;
    bottom: 0 !important;
    left: 50%;
    top:initial;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  //发送弹幕
  .c-operate {
	position: fixed;
	bottom: 0;
	height: 42px;
	width: 100%;
	padding: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
	border-top: 1px solid #eee;
	z-index: 7
}

.c-operate .c-operate-sub {
	float: left
}

.c-operate .c-operate-input-wrap {
	position: relative;
  width:83%;
	height: 32px;
	margin: 5px 0 0 10px;
	background-color: #f7f7f7
}

.c-operate .c-operate-input-wrap .c-operate-input {
	height: 100%;
  width:100%;
	padding: 0 10px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	outline: none;
	border: none;
	font-size: 12px;
	background: transparent
}

.c-operate .c-operate-input-wrap .c-operate-input::-webkit-input-placeholder {
	color: #ddd
}

.c-operate .c-operate-input-wrap .msgTip {
	position: absolute;
	left: 0;
	top: 0;
	padding-left: 10px;
	width: 100%;
	height: 100%;
	line-height: 32px;
	font-size: 14px;
	color: #f70
}

.c-operate .c-operate-input-wrap .c-operate-sendBtn {
	display: none;
	position: absolute;
	top: 4.5px;
	right: 4.5px;
	width: 45px;
	height: 23px;
	line-height: 23px;
	text-align: center;
	font-size: 12px;
	color: #fff;
	background-image: -webkit-gradient(linear,left top,right top,from(#ff4e00),to(#ff8b00));
	background-image: -webkit-linear-gradient(left,#ff4e00,#ff8b00);
	background-image: -moz-linear-gradient(left,#ff4e00 0,#ff8b00);
	background-image: -o-linear-gradient(left,#ff4e00 0,#ff8b00);
	background-image: linear-gradient(90deg,#ff4e00 0,#ff8b00);
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border-radius: 2px
}

.c-operate .c-operate-input-wrap .c-operate-sendBtn.unvaild {
	background-color: #bcc3cf;
	background-image: none
}

.c-operate .c-operate-iconCharge {
	display: none;
	margin: 5px 0 0 7px;
	background: url() 50% no-repeat;
	-moz-background-size: 100% 100%;
	background-size: 100% 100%
}

.c-operate .c-operate-iconCharge,.c-operate .c-operate-iconGift {
	width: 32px;
  box-sizing: border-box;
	height: 32px;
	-webkit-border-radius: 32px;
	-moz-border-radius: 32px;
	border-radius: 32px
}

.c-operate .c-operate-iconGift {
	margin: 5px 0 0 9px;
	-moz-background-size: 100% 100% !important;
	background-size: 100% 100% !important;
}
.text_dm{

  width:100%;
  height:100%;
  box-sizing: border-box;
  .text_div{
    height:100%;
    width:100%;
    position: absolute;
    overflow-y: scroll;
  }
}



.GiftPanel {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 242px;
	background-color: #fff;
	z-index: 10;
	-webkit-box-shadow: 0 0 13px #ccc;
	-moz-box-shadow: 0 0 13px #ccc;
	box-shadow: 0 0 13px #ccc
}

.GiftPanel .GiftPanel-content {
	width: 100%;
	height: 200px;
	overflow: auto;
	-webkit-overflow-scrolling: touch
}

.GiftPanel .GiftPanel-content .GiftItem {
	float: left;
	width: 25%;
	height: 100px;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-moz-box-orient: vertical;
	-moz-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box
}

.GiftPanel .GiftPanel-content .GiftItem.selected {
	border: 2px solid #f70;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-icon {
	width: 30px;
	height: 30px;
	margin-bottom: 5px
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-no-icon {
	display: inline-block;
	width: 30px;
	height: 30px;
	margin-bottom: 5px;
	background: url() no-repeat;
	-moz-background-size: 100% 100%;
	background-size: 100% 100%
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-name {
	color: #333;
	font-size: 12px
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-worth {
	color: #999;
	font-size: 10px;
	margin-top: 6px
}

.GiftPanel .GiftPanel-footer {
	position: relative;
	width: 100%;
	border-top: 1px solid #ddd;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box
}

.GiftPanel .GiftPanel-footer .balance {
	float: left;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 42px
}

.GiftPanel .GiftPanel-footer .balance i {
	display: inline-block;
	width: 20px;
	height: 20px;
	background: url('../../static/img/p7.png') no-repeat;
	-moz-background-size: 100% 100%;
	background-size: 100% 100%;
	margin-left: 13.5px;
	margin-right: 4px
}

.GiftPanel .GiftPanel-footer .balance span {
	font-size: 13px;
	color: #333
}

.GiftPanel .GiftPanel-footer .btn-charge {
	float: left;
	line-height: 42px;
	color: #f70;
	margin-left: 15px;
	font-size: 14px
}

.GiftPanel .GiftPanel-footer .btn-send {
	position: absolute;
	right: 0;
	top: -1px;
	width: 89.5px;
	height: 42px;
	line-height: 42px;
	text-align: center;
	background-color: #bcc3cf;
	background-image: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer
}

.GiftPanel .GiftPanel-footer .btn-send.vaild {
	background-color: #f70;
	color: #fff
}


  //礼物
  .Banner {
	position: absolute;
	left: 0;
	width: 240px;
	height: 40px;
	line-height: 40px;
	background: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-bgd886ae.png) 0 100% no-repeat;
	-moz-background-size: 100% 100%;
	background-size: 100% 100%;
	-webkit-transform: translateX(-100%) translateY(0);
	-moz-transform: translateX(-100%) translateY(0);
	-ms-transform: translateX(-100%) translateY(0);
	-o-transform: translateX(-100%) translateY(0);
	transform: translateX(-100%) translateY(0)
}

.Banner.active {
	-webkit-animation: h .6s ease-in-out;
	-moz-animation: h .6s ease-in-out;
	-o-animation: h .6s ease-in-out;
	animation: h .6s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	-moz-animation-fill-mode: forwards;
	-o-animation-fill-mode: forwards;
	animation-fill-mode: forwards
}

.Banner .Banner-ava {
	float: left;
	width: 32px;
	height: 32px;
	margin: 4px 10px;
	-webkit-border-radius: 32px;
	-moz-border-radius: 32px;
	border-radius: 32px;
  background-size:cover !important;
}

.Banner .Banner-text {
	float: left;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-moz-box-orient: vertical;
	-moz-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	max-width: 146px;
	overflow: hidden;
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
	white-space: nowrap
}

.Banner .Banner-text .Banner-text-nick {
	font-size: 14px;
	line-height: 24px;
	color: #fff
}

.Banner .Banner-text .Banner-text-tip {
	font-size: 12px;
	line-height: 12px;
	color: #fed960
}

.Banner .Banner-gift {
	position: absolute;
	left: 148px;
	bottom: 12px;
	width: 48px;
	height: 48px
}

.Banner .Banner-hittimes {
	position: absolute;
	line-height: 1;
	bottom: 12px;
	left: 200px;
	font-size: 0;
	white-space: nowrap;
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	-o-transform: scale(1);
	transform: scale(1);
	-webkit-transform-origin: left bottom;
	-moz-transform-origin: left bottom;
	-ms-transform-origin: left bottom;
	-o-transform-origin: left bottom;
	transform-origin: left bottom;
	-webkit-animation: i .2s ease-in-out forwards;
	-moz-animation: i .2s ease-in-out forwards;
	-o-animation: i .2s ease-in-out forwards;
	animation: i .2s ease-in-out forwards;
	-webkit-animation-delay: .5s;
	-moz-animation-delay: .5s;
	-o-animation-delay: .5s;
	animation-delay: .5s
}

.Banner .Banner-hittimes.hit {
	-webkit-animation-delay: 0s;
	-moz-animation-delay: 0s;
	-o-animation-delay: 0s;
	animation-delay: 0s
}

.Banner .Banner-hittimes .nf {
	width: 8px;
	height: 8px;
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-flag97ded3.png)
}

.Banner .Banner-hittimes .n,.Banner .Banner-hittimes .nf {
	display: inline-block;
	-moz-background-size: 100% 100%;
	background-size: 100% 100%
}

.Banner .Banner-hittimes .n {
	width: 12px;
	height: 15px
}

.Banner .Banner-hittimes .n.n0 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-09400a9.png)
}

.Banner .Banner-hittimes .n.n1 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-1d7dfc9.png)
}

.Banner .Banner-hittimes .n.n2 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-21892d9.png)
}

.Banner .Banner-hittimes .n.n3 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-3ead898.png)
}

.Banner .Banner-hittimes .n.n4 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-40835c5.png)
}

.Banner .Banner-hittimes .n.n5 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-5fe8d5e.png)
}

.Banner .Banner-hittimes .n.n6 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-6ed3358.png)
}

.Banner .Banner-hittimes .n.n7 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-73d44e6.png)
}

.Banner .Banner-hittimes .n.n8 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-8efc6a7.png)
}

.Banner .Banner-hittimes .n.n9 {
	background-image: url(https://shark.douyucdn.cn/app/douyu-mobile/m-douyu-v3/build/images/Banner-icon-9145a3e.png)
}

@-webkit-keyframes h {
	0% {
		-webkit-transform: translateX(-100%) translateY(0);
		transform: translateX(-100%) translateY(0)
	}

	to {
		-webkit-transform: translateX(0) translateY(0);
		transform: translateX(0) translateY(0)
	}
}

@-moz-keyframes h {
	0% {
		-moz-transform: translateX(-100%) translateY(0);
		transform: translateX(-100%) translateY(0)
	}

	to {
		-moz-transform: translateX(0) translateY(0);
		transform: translateX(0) translateY(0)
	}
}

@-o-keyframes h {
	0% {
		-o-transform: translateX(-100%) translateY(0);
		transform: translateX(-100%) translateY(0)
	}

	to {
		-o-transform: translateX(0) translateY(0);
		transform: translateX(0) translateY(0)
	}
}

@keyframes h {
	0% {
		-webkit-transform: translateX(-100%) translateY(0);
		-moz-transform: translateX(-100%) translateY(0);
		-o-transform: translateX(-100%) translateY(0);
		transform: translateX(-100%) translateY(0)
	}

	to {
		-webkit-transform: translateX(0) translateY(0);
		-moz-transform: translateX(0) translateY(0);
		-o-transform: translateX(0) translateY(0);
		transform: translateX(0) translateY(0)
	}
}

@-webkit-keyframes i {
	0% {
		-webkit-transform: scale(1);
		transform: scale(1)
	}

	20% {
		-webkit-transform: scale(1.7);
		transform: scale(1.7)
	}

	to {
		-webkit-transform: scale(1);
		transform: scale(1)
	}
}

@-moz-keyframes i {
	0% {
		-moz-transform: scale(1);
		transform: scale(1)
	}

	20% {
		-moz-transform: scale(1.7);
		transform: scale(1.7)
	}

	to {
		-moz-transform: scale(1);
		transform: scale(1)
	}
}

@-o-keyframes i {
	0% {
		-o-transform: scale(1);
		transform: scale(1)
	}

	20% {
		-o-transform: scale(1.7);
		transform: scale(1.7)
	}

	to {
		-o-transform: scale(1);
		transform: scale(1)
	}
}

@keyframes i {
	0% {
		-webkit-transform: scale(1);
		-moz-transform: scale(1);
		-o-transform: scale(1);
		transform: scale(1)
	}

	20% {
		-webkit-transform: scale(1.7);
		-moz-transform: scale(1.7);
		-o-transform: scale(1.7);
		transform: scale(1.7)
	}

	to {
		-webkit-transform: scale(1);
		-moz-transform: scale(1);
		-o-transform: scale(1);
		transform: scale(1)
	}
}

 #live-list{
        box-sizing: border-box;
        padding-bottom: 58px;
        overflow: hidden;
        margin-top:0.2rem;
        padding:0 0.2rem;
        li{
          width:49.75%;
          float: left;
          box-sizing: border-box;
          margin-top:0.5%;
          position: relative;
          height:4.5rem;
          background-size:cover !important;
          img{
            width:100%;
          }
          p{
            width:1.2rem;
            position: absolute;
            left:0;
            top:0;
            img{
              width:100%;
            }
          }
        }
        li:nth-of-type(even){
          margin-left:0.5%;
        }
    }
    .h-info{
      	width: 100%;
      	height:25px;
      	line-height: 25px;
      	position: absolute;
      	left:0;
      	bottom:0;
      span{
        display: inline;
      }
      	.fans{
      		font-size: 12px;
      		color: #fff;
      		font-weight: bold;
      		padding-left:5px;
      	}
      	.live-icon{
      		font-size: 12px;
      		color: #fff;
      		float: right;
      		padding-right:5px ;
      	}
      }

</style>
