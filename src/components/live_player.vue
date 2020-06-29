<template>
    <div id="live">
        <div class="wrapper" ref="wrapper" >
            <div class="video"  >
                <!-- 直播 -->
                <div id="video" class="video-con" @click="videoflag">
                </div>
                <!--<div class="video_ui"  style="display: block" ref="video_ui" @click="playvideo1">
                        <a class="new_play_btn"></a>
                    </div>
    -->
                <div id="chatArea" class="chat_area" ref="chat_area"  @click="videoflag()">
                    <div class="tanmu_scroll" id="tanmuScroll" >
                        <ul>
                            <li class="notice"><span class="nick">系统消息 </span>{{warning}}</li>
                            <li v-for="(item,index) in live"    class="normal">
                                <span  @click="arrkuty({'id':item.ct.id})"   v-if="item.msgtype=='0'" class="nick"><img style="width:40px;"  v-if="item.ct.guizu!=''" :src="guizu2(item.ct.guizu)" alt=""><img v-if="item.ct.liangname!='0'" style="width:20px;" src="../../static/img/y7.png" alt="">&nbsp;<img :src="imgct1(item)" alt=""> <em>{{item.ct.user_nicename}}</em> 进入了直播间！</span>
                                <p  @click="arrkuty({'id':item.uid})"  v-if="item.msgtype=='2'"><img style="width:40px;" v-if="item.guizu!=''"  :src="guizu2(item.guizu)"  alt=""><img v-if="item.liangname!='0'" style="width:20px;" src="../../static/img/y7.png" alt="">&nbsp;<img :src="imgct(item)" alt=""> <span class="nick">{{item.uname}}:</span> {{item.ct}}</p>
                                <span  @click="arrkuty({'id':item.uid})" v-show="item.ct.totalcoin>=260" v-if="item.msgtype=='1'" class="nick"><img style="width:40px;"  v-if="item.guizu!=''"  :src="guizu2(item.guizu)"  alt=""><img v-if="item.liangname!='0'" style="width:20px;" src="../../static/img/y7.png" alt="">&nbsp;<img :src="imgct(item)" alt="">&nbsp;{{item.uname}} <i style="color:#fff;">送出</i> {{item.ct.giftname}}x{{item.ct.giftcount}}</span>
                                <p  @click="arrkuty({'id':item.uid})"  v-if="item.msgtype=='4'"><span class="nick">系统消息:</span> {{item.ct}}</p>

                            </li>

                        </ul>
                    </div>
                </div>
                <div class="video_status video_status_living" @click="catmod=true">贡献：{{catdog}}</div>
                <!--<div class="video_status video_status_living">贡献：0</div>-->
                <img style="display:none;" :src="liveCt.avatar" onload="_yy_firstScreenTime = Date.now();">
                <div class="top_banner">
                    <img class="avatar"  @click="arrkuty({'id':videoUrl})"  style="object-fit: cover;"  :src="liveCt.avatar==1?require('../../static/img/default.jpg'):liveCt.avatar" :alt="liveCt.user_nicename" >
                    <div class="text text_status_living">
                        <p class="nick" style="width:50px">{{liveCt.user_nicename}}</p>
                        <p class="count"><i class="viewer_icon"></i><span class="totalCountP" id="liveCount">@{{liveCt.uid}}</span></p>
                    </div>
                    <div v-if="is_attention<1" @click="setFollow(videoUrl)" style="float: left;display: inline-block;width:25px;margin-top:5px;"><img  src="../../static/img/gzgz.png" alt=""></div>
                    <div style="clear: both;"></div>
                    <!--	<i class="subscribe_btn js-download" appfrom="zhibo/dingyue" v-if="content.is_attention==0" @click="setFollow(liveCt.uid)">关注</i>
                        <i class="subscribe_btn js-download" appfrom="zhibo/dingyue" v-if="content.is_attention==1" @click="openConfirm(liveCt.uid)">已关注</i>-->
                </div>

                <div class="custom">
                    <div class="scroll" >
                        <span v-for="(item,index) in onlone_user" @click="arrkuty(item)" :style="styleobj2(item.avatar)">
                             <img v-if="index==0" src="../../static/img/h1.png" alt="">
                              <img v-if="index==1" src="../../static/img/h2.png" alt="">
                              <img v-if="index==2" src="../../static/img/h3.png" alt="">
                        </span>
                        <!-- <span :style="styleobj('../../static/img/default.jpg')"></span>
                         <span :style="styleobj('../../static/img/default.jpg')"></span>
                         <span :style="styleobj('../../static/img/default.jpg')"></span>-->
                    </div>
                </div>
                <div class="person_number"  @click="lisop=true">{{catperson}}人</div>
                <div class="chat_banner" v-show="!valueinput" v-if="!flag">
                    <i v-show="islive===1" class="chat_ico chat_show_pop_speak js-download" @click="textInfo()"  ></i>
                    <i class="chat_ico1" @click="share=true" ></i>
                    <i v-show="islive===1" class="chat_gift chat_show_pop_gift js-download" @click="textflag()"  ></i>
                    <i class="closegif chat_show_pop_gift js-download" @click="closegif()"></i>
                    <!--<span class="chat_btn js-download" ><span class="huya_icon"></span>打开App参与精彩互动 <i class="icon_arrow"></i></span>-->
                </div>
                <div class="input"  v-if="valueinput">
                    <input type="text" ref="inputshow"   @keypress="CheckInfo" v-model="valueInfo" placeholder="说点什么吧！"><button @click="Send">发送</button>
                </div>

                <!--  <div class="GiftPanel" v-show="flag">
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
                  </div>-->



                <div class="GiftPanel" v-show="flag">
                    <mt-swipe  :auto="300000000" :continuous="false">
                        <mt-swipe-item >
                            <div class="GiftPanel-content">
                                <div class="GiftPanel-content-wrap">

                                    <div :class="['GiftItem',{selected:index==IndexNum}]" data-id="192" v-for="(item,index) in gift" v-if="index<=7" @click="selectGift(index,item)">
                                        <img class="GiftItem-icon" :src="item.gifticon_mini">
                                        <span class="GiftItem-name">{{item.giftname}}</span>
                                        <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                                    </div>

                                </div>
                            </div>

                        </mt-swipe-item>

                        <mt-swipe-item>
                            <div class="GiftPanel-content">
                                <div class="GiftPanel-content-wrap">

                                    <div :class="['GiftItem',{selected:index==IndexNum}]" data-id="192" v-for="(item,index) in gift"  v-if="(index>7&&index<=15)" @click="selectGift(index,item)">
                                        <img class="GiftItem-icon" :src="item.gifticon_mini">
                                        <span class="GiftItem-name">{{item.giftname}}</span>
                                        <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                                    </div>

                                </div>
                            </div>
                        </mt-swipe-item>

                        <mt-swipe-item>
                            <div class="GiftPanel-content">
                                <div class="GiftPanel-content-wrap">

                                    <div :class="['GiftItem',{selected:index==IndexNum}]" data-id="192" v-for="(item,index) in gift"  v-if="index>15" @click="selectGift(index,item)">
                                        <img class="GiftItem-icon" :src="item.gifticon_mini">
                                        <span class="GiftItem-name">{{item.giftname}}</span>
                                        <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                                    </div>

                                </div>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>

                    <div class="GiftPanel-footer">
                        <div class="balance">
                            <i></i>
                            <span>{{locKcoin}}</span>
                        </div>

                        <div class="btn-charge" @click="goRouter('/pay')">充值</div>
                        <div class="btn-gz"  @click="goRouter('/?i=4')"><img src="../../static/img/gzxf.png" alt=""></div>
                        <!--<div class="btn-send vaild" @click="SendGift">发送</div>-->
                        <div class="btn-send">
                            <div class="select_num" @click="sel_n=!sel_n"><i>{{num}}</i>
                                <em v-if="!sel_n"><img src="../../static/img/top_s.png" alt=""> </em>
                                <em v-if="sel_n"><img src="../../static/img/bottom_s.png" alt=""> </em>
                            </div>
                            <span class="vaild"  @click="SendGift">发送</span>
                            <div class="flask_model" v-if="sel_n">
                                <p v-for="(item,index) in num_gift" @click="setfollnum(item.num)"><i>{{item.num}}</i> <em>{{item.name}}</em></p>
                            </div>
                            <div class="flask_site" v-if="sel_n"  @click="sel_n=false"></div>
                        </div>


                    </div>

                </div>





                <div :class="['Banner',{'active':java}]" data-id="undefined" @click="videoflag()">
                    <!--  <i class="Banner-ava" :style="styleObj(amintGit.avatar)" ></i>
                     <span class="Banner-text">
                         <span class="Banner-text-nick">{{amintGit.name}}</span>
                         <span class="Banne'\/.][;[xsa.[dr-text-tip">送出 {{amintGit.gitf}}</span>
                     </span>-->
                    <img class="Banner-gift" :src="amintGit.img">

                    <!--<span class="Banner-hittimes hit"><span class="nf"></span><span :class="['n','n'+amintGit.num]"></span></span>-->
                </div>

                <div :class="['Banner3',{'active':java2}]" style="width:220px;height:40px; position: absolute;bottom:295px;left:0;">
                    <div class="Banner2" data-id="undefined" @click="videoflag()">
                        <i class="Banner-ava" :style="styleObj(gtop.avatar)" ></i>
                        <span class="Banner-text">
             <span class="Banner-text-nick">{{gtop.name}}</span>
             <span class="Banner-text-tip">送出 {{gtop.gitf}}</span>
         </span>
                        <img :src="gtop.img"  class="Banner-gift" alt="">
                        <span class="Banner-hittimes hit">
             <em>x</em>
             <i :class="{'iamcenter':java4}">{{gtop.num}}</i>
         </span>
                    </div>
                </div>

                <div :class="['Banner3',{'active':java3}]" style="width:220px;height:40px; position: absolute;bottom:240px;left:0;">
                    <div class="Banner2" data-id="undefined" @click="videoflag()">
                        <i class="Banner-ava" :style="styleObj(gcenter.avatar)" ></i>
                        <span class="Banner-text">
             <span class="Banner-text-nick">{{gcenter.name}}</span>
             <span class="Banner-text-tip">送出 {{gcenter.gitf}}</span>
         </span>
                        <img :src="gcenter.img"  class="Banner-gift" alt="">
                        <span class="Banner-hittimes hit">
             <em>x</em>
             <i :class="{'iamcenter':java4}">{{gcenter.num}}</i>
         </span>
                    </div>
                </div>


                <div v-if="fswf"  class="swf"><img :src="dswf" alt=""></div>
                <div id="demoCanvas"  @click="videoflag()"  v-show="fswf_svga" style="z-index:1;width:100%;height:100%;position: fixed;left:0;top:0;"></div>
			
                <!--<div v-if="fswf"  class="swf"><img src="../../static/img/555.gif" alt=""></div>-->
            </div>
        </div>
        <model_info :inputname="model_id" v-show="mkop"></model_info>
        <ListInfo v-if="lisop"></ListInfo>
        <list_model v-if="catmod"></list_model>
        <div class="left-scroll" >
            <div ref="demo" class="demo">
                <div class="ul-li" v-if="gift51.name!=undefined"  @click="arrkuty({'id':gift51.id})" >
                    <span class="s1"><img :src="guizu2(gift51.guizu)" alt=""></span>
                    <span class="s2"><img v-if="gift51.liang!='0'" src="../../static/img/y1.png" alt=""></span>
                    <span class="s3" ><img :src="imgct(gift51)" alt=""></span>
                    <p><i>{{gift51.name.length>4?(gift51.name.substring(0,4)+'...'):gift51.name}}</i>&nbsp;送给主播&nbsp;<i>{{gift51.videname}}</i>&nbsp;{{gift51.gitf}}x{{gift51.num}}</p>
                </div>
            </div>
        </div>
        <div class="share_model" v-if="share" @click="share=false"></div>
        <div class="share_info"  v-if="share">
            <h2>分享到</h2>
            <ul>
                <li @click="wxshare('session')">
                    <span><img src="../../static/img/wxk.png" alt=""></span>
                    微信
                </li>
                <li @click="wxshare('timeline')">
                    <span><img src="../../static/img/wxk1.png" alt=""></span>
                    朋友圈
                </li>
                <!-- <li @click="qqgare('QFriend')">
                    <span><img src="../../static/img/qqk.png" alt=""></span>
                    QQ好友
                </li>
                <li @click="qqgare('QZone')">
                    <span><img src="../../static/img/qqk1.png" alt=""></span>
                    QQ空间
                </li> -->
                <li  @click="jqsgare()">
                    <span><img src="../../static/img/fzk.png" alt=""></span>
                    复制链接
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>

            </ul>
            <div class="quxiao" @click="share=false">取消</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store/store'
    import apiy from '@/constant/api'
    import * as types from '@/store/types'
    import model_info from '@/components/model_info'
    import ListInfo from '@/components/ListInfo'
    import list_model from '@/components/list_model'
    import { Toast,MessageBox  } from 'mint-ui'
    import VueSocketio from 'vue-socket.io';//socket即时通讯
    import domain from '../../untils/config'
    Vue.use(VueSocketio,domain.socketDomain);//socket即时通讯
    //Vue.use(VueSocketio,'http://www.huidaxinzhi.com:12886');//socket即时通讯
    export default {
        data() {
            return {
                kickid:0,
                shutid:0,
                pktime:4,
                pkflag:true,
                valueinput:false,
                share:false,
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
                amintGit:{},//礼物
                gift:[
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
                java2:false,//礼物特效是否显示
                java3:false,//礼物特效是否显示
                java4:false,//
                giftname:'风油精',
                giftimg:require('../../static/img/l2.png'),
                avatar:'',
                id:'',
                hls:'',
                uid:'',
                giftid:'',//礼物id
                warning:'',//警告信息
                locKcoin:0,
                arry:[],
                ict:1,
                dswf:'',
                fswf:false,
                forflag:'',
                video:null,
                playing:false,
                arrlike:[],
                mkop:false,
                Width:'',
                lisop:false,
                num:1,//礼物数量
                sel_n:false,
                num_gift:[
                    {name:'一生一世',num:1314},
                    {name:'我爱你',num:520},
                    {name:'要抱抱',num:188},
                    {name:'一切顺利',num:66},
                    {name:'想你',num:30},
                    {name:'十全十美',num:10},
                    {name:'一心一意',num:1},
                ],
                onlone_user:[],//在线用户
                model_id:'',
                catmod:false,
                catdog:'',
                catperson:'',
                MNActionButton:'',
				wx:'',
                webp:'',
                liangname:'0',
                guizu:'',
                gift50:[],
                gift51:{},
                fity_length:0,
                gtop:{},
                gcenter:{},
                phpflag:{},
                userid:'',
                is_attention:0,
                fswf_svga:false,
                islive:1
            };
        },
        sockets:{
            broadcastingListen:function(o){
                //console.log(o,888)
                var _this=this
                for(var i in o){
                    if(typeof o[i]=='string'){
                        var data = JSON.parse(o[i]);
                        var msgObject = data.msg[0];
                        var msgtype = msgObject.msgtype;
                        var msgaction = msgObject.action;
                        var msgmethod = msgObject._method_;
                    }else{
                        var data={};
                        return '';
                    }
                    if(msgmethod=='SendMsg'){ //聊天信息
                        //this.sendMsg(msgObject);
                        // if(data.msg[0].msgtype==2){//聊天信息
                        //this.live.push({level:data.msg[0].level,name:data.msg[0].uname,text:data.msg[0].ct})
                        this.live.push(data.msg[0])
                        this.$refs.chat_area.scrollTop=this.$refs.chat_area.scrollHeight;
                        //}else if(data.msg[0].msgtype==0){//欢迎信息

                        //}else if(data.msg[0].msgtype==4){//系统信息

                        //}
                        if(data.msg[0].ct.car.id!=0){
                             //_this.dswf=data.msg[0].ct.car.swf
                            //_this.fswf=true
                             /*var apiheight=window.screen.height;
                             var apiwidth=window.screen.width;
                             var u = navigator.userAgent;
                            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				            if(isiOS){
				                var webp1 = api.require('webp');
	                           webp1.open({
	                               rect:{
	                                       x: 0,
	                                       y: 0,
	                                       w: apiwidth,
	                                       h: apiheight
	                                   },
	                               path: data.msg[0].ct.car.swf,
	                               fixedOn: api.player,
	                           });
	                            setTimeout(()=>{
	                               // _this.fswf=false
	                                webp1.close();
	                            },parseInt(data.msg[0].ct.car.swftime)*1000)
				           }else{
				           	_this.dswf=data.msg[0].ct.car.swf
				           	_this.fswf=true
				             	setTimeout(()=>{
	                               _this.fswf=false
	                               
	                            },parseInt(data.msg[0].ct.car.swftime)*1000)
				           }*/
				          
				          let img_info=data.msg[0].ct.car.swf
	                  	//let img_info='../../static/css/mghh.svga'
		                  	if(img_info.indexOf('svga')==-1){
		                  		 _this.dswf=img_info
		                     	_this.fswf=true;
		                  	}else{
		                  		_this.getSvga(img_info)
		                  		_this.fswf_svga=true;
		                  	}
		                    
		                    setTimeout(()=>{
		                      _this.fswf=false;
		                      _this.fswf_svga=false;
		                    },parseInt(data.msg[0].ct.car.swftime)*1000)
                        }
                        if(data.msg[0].msgtype==0){//欢迎信息
                            _this.getavatar()
                            _this.getpython()
                        }
                    }else if(msgmethod=='SendGift'){ //赠送礼物
                        // this.sendGift(msgObject);
                        this.live.push(data.msg[0])
                        this.$refs.chat_area.scrollTop=this.$refs.chat_area.scrollHeight;
                        this.arrlike.push({total:data.msg[0].ct.totalcoin,'avatar':data.msg[0].uhead,name:data.msg[0].uname,gitf:data.msg[0].ct.giftname,img:data.msg[0].ct.gifticon,num:data.msg[0].ct.giftcount,gitid:data.msg[0].ct.giftid,gift_run_time:data.msg[0].ct.gift_run_time})


                        /* var db = openDatabase('mylive', '1.0', 'this id mysql', 10 * 1024 * 1024);
                                  db.transaction(function (tx) {
                                  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id, avatar, name, gitf, img, num)');
                                  tx.executeSql('INSERT INTO LOGS (id,avatar,name,gitf,img,num) VALUES (?, ?, ?, ?, ?, ?)', [_this.ict, data.msg[0].uhead, data.msg[0].uname, data.msg[0].ct.giftname, data.msg[0].ct.gifticon, data.msg[0].ct.giftcount]);
                          });
                          _this.ict++*/
                        //this.watchInfo()
                        _this.getcat()
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
                    }else if(msgmethod=='KickUser'){ //踢出直播间
                        //console.log(data.msg[0],'踢出')
                        _this.kickid=data.msg[0].touid
                        if(_this.userid==_this.kickid){
                            _this.showM('你已被踢出直播间！')
                            //_this.goRouter('/')
                            _this.closegif()
                        }

                    }else if(msgmethod=='ShutUpUser'){ //禁言
                        _this.live.push(data.msg[0])
                        //console.log(data.msg[0],'禁言')
                        _this.shutid=data.msg[0].touid
                    }else if(msgmethod=='AllShowLiveSendGiftMsg'){
                        this.gift50.push({videname:data.msg[0].ct.videoname,id:data.msg[0].ct.id,guizu:data.msg[0].ct.guizu,liang:data.msg[0].ct.liangname,name:data.msg[0].ct.name,gitf:data.msg[0].ct.giftname,num:data.msg[0].ct.num,level:data.msg[0].ct.level})
                    }
                }
            },
            conn:function(o){
                console.log(o+'连接服务器回应')
                //this.getHome()
            },
            error:function(o){
                console.log(o+'错误')
                Vue.use(VueSocketio,domain.socketDomain)
            },
            reconnect:function(o){
                console.log(o+'重连')
                Vue.use(VueSocketio,domain.socketDomain)
            },
            disconnect:function (o) {
                console.log(o+'断开连接')
                Vue.use(VueSocketio,domain.socketDomain)
            }

        },
        components:{
            model_info,ListInfo,list_model
        },
        mounted(){
        
            var _this=this
            // H5 plus事件处理
            this.scrollLeft();
            this.$nextTick(function(){
                this.videoUrl=this.$route.query.id
                this.$refs.wrapper.style.height=document.documentElement.clientHeight+'px'
                this.getHome()
                this.getis_attention()
                this.getPerson2()
                this.phpflag=setInterval(()=>{
                    _this.pythonPhp()
                },100)
                this.forflag=setInterval(()=>{
                    _this.giftamite()
                },100)
                var u = navigator.userAgent;
	            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	            if(isiOS){
	                _this.webp = api.require('webp');
	                console.log(JSON.stringify(this.webp),'8541512616')
	           }
            })
            
            setTimeout((e)=>{
                _this.pkflag=false
            },_this.pktime*1000)
        },
        beforeRouteLeave(to, from, next){
            next()
            clearInterval(this.forflag)
            clearInterval(this.phpflag)
        },
        created(){
            var _this=this
            _this.$root.Hub.$on('a2',function(o){
                _this.mkop=false
            })
            _this.$root.Hub.$on('listinfo',function(o){
                _this.lisop=false
            })
            _this.$root.Hub.$on('list_mod',function(o){
                _this.catmod=false
            })
            _this.$root.Hub.$on('shut',function(o){
                _this.clickButton(o)
            })
        },
        methods:{
        	getSvga(url){
	  			var player = new SVGA.Player('#demoCanvas'); 			
				var parser = new SVGA.Parser('#demoCanvas'); // Must Provide same selector eg:#demoCanvas IF support IE6+
				parser.load(url, function(videoItem) {	
				player.setVideoItem(videoItem);			
				player.startAnimation();
				
				})
	  		},
            getPerson2(){
                var _this=this;
                this.axios.get(apiy.person)
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.userid=dat.content.user_info.id
                        }
                    })
            },
            guizu2(e){
                var str=''
                if(e=='男爵'){
                    str=require('../../static/img/y2.png')
                }else if(e=='子爵'){
                    str=require('../../static/img/y1.png')
                }else if(e=='伯爵'){
                    str=require('../../static/img/y5.png')
                }else if(e=='侯爵'){
                    str=require('../../static/img/y4.png')
                }else if(e=='公爵'){
                    str=require('../../static/img/y6.png')
                }else if(e=='皇帝'){
                    str=require('../../static/img/y3.png')
                }else{
                    return ''
                }
                return str
            },
            scrollLeft(){
                var demo  = this.$refs.demo
                var i = 0
                var _this=this
                function Marquee(){
                    if(parseFloat(demo.style.marginRight)>=parseFloat('120%')){
                        ////clearInterval(_this.myvar)
                        i=0
                        demo.style.marginRight='-100%'
                        if(_this.gift50.length>0){
                            _this.gift51=_this.gift50[0]
                            _this.gift50.shift()
                        }else{
                            _this.gift51={}
                        }
                    }
                    else{
                        ++i
                        demo.style.marginRight=(-100+i)+'%'
                    }
                }
                this.myvar=setInterval(Marquee,50);
            },
            jqsgare(){
              this.copyUrl2()
            },
            copyUrl2()
            {
                var Url2=this.liveCt.user_nicename+'正在直播!,打开网址'+apiy.hosturl+'live?id='+this.liveCt.uid+'&code='+localStorage.getItem('code')+'即可观看。[海螺直播]'
                var oInput = document.createElement('input');
                oInput.value = Url2;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display='none';
                alert('已复制到剪切板，请到应用粘贴后分享！');
            },
            qqgare(o){
                var _this=this
                var qq = api.require('QQPlus');
                qq.installed(function(ret, err) {
                    if (ret.status) {
                        _this.qqInfo(o)
                    } else {
                        api.alert({ msg: "当前设备未安装qq客户端" });
                    }
                });
            },
            qqInfo(o){
                var _this=this
                var qq = api.require('QQPlus');
                qq.shareNews({
                    url:domain.domain+'h5/hhhhhhhh/#/'+'live?id='+_this.liveCt.uid+'&code='+localStorage.getItem('code'),
                    title: _this.liveCt.user_nicename+'正在直播！[海螺直播]',
                    description: '好久不见,想念你们，如果你也想看看最近我的改变，欢迎来到我的直播间！',
                    imgUrl:'',
                    type:o
                },function(ret,err){
                    if (ret.status){
                        alert("分享成功！");
                    } else {
                        api.alert({msg: JSON.stringify(err)});
                    }
                });
            },
            wxshare(o){
                var _this=this
                this.wx = api.require('wx');
                this.wx.isInstalled(function(ret, err) {
                    if (ret.installed) {
                        _this.shareInfo(o);
                    } else {
                        alert('当前设备未安装微信客户端');
                    }
                });
			},
            shareInfo(o){
                var _this=this
                this.wx.shareWebpage({
                    apiKey:'wxa735440e647fb660',
                    scene: o,
                    title: _this.liveCt.user_nicename+'正在直播！[海螺直播]',
                    description: '好久不见,想念你们，如果你也想看看最近我的改变，欢迎来到我的直播间！',
                   // thumb: 'widget://image/copy.jpg',
                    thumb: '',
                    contentUrl:domain.domain+'h5/hhhhhhhh/#/'+'live?id='+_this.liveCt.uid+'&code='+localStorage.getItem('code')
                }, function(ret, err) {
                    if (ret.status) {
                        alert('分享成功');
                    } else {
                        alert(err.code);
                    }
                });
			},
            getcat(){
                var _this=this;
                var json={roomnum:this.videoUrl};
                this.axios.post(apiy.home+'?'+this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.catdog=dat.content.show_total_contribution


                        }
                    })
            },
            getpython(){
                var _this=this;
                var json={roomnum:this.videoUrl};
                this.axios.post(apiy.home+'?'+this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.catperson=dat.content.liveinfo.audience_num

                        }
                    })
            },
            getavatar(){
                var _this=this;
                var json={anchor_id:this.videoUrl,page:1,length:20};
                this.axios.post(apiy.live_online_user,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.onlone_user=dat.content
                        }
                    })
            },
            setfollnum(o){
                this.num=o
                this.sel_n=false
            },
            arrkuty(e){
               /* var _this=this
                _this.$root.Hub.$emit('md',e)
                setTimeout(()=>{
                    _this.mkop=true
                },100)*/
                var _this=this
                _this.$root.Hub.$emit('md',{iszb:false,kk:e,stream:_this.liveCt.stream,zid:_this.liveCt.uid,zname:_this.liveCt.user_nicename})
                setTimeout(()=>{
                    _this.mkop=true
                },100)

                //_this.model_id=e
            },
            imgct(o){
                if(o.level==undefined){
                    return ''
                }
                if(parseInt(o.level)>32){
                    return require("../../static/img/32.png")
                }else{
                    return require("../../static/img/"+o.level+".png")
                }

            },
            imgct1(o){
                if(parseInt(o.ct.level)>32){
                    return require("../../static/img/32.png")
                }else{
                    return require("../../static/img/"+o.ct.level+".png")
                }
            },
            giftamite(){
                var apiheight=window.screen.height;
                var apiwidth=window.screen.width;
                var _this=this
                if(_this.arrlike.length>0){
                    var item=_this.arrlike[0]
                 /*   var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                   if(item.total>50) {*/
 						/*if (item.img.indexOf('webp')!=-1 && isiOS) {
                           //if(item.img.indexOf('webp')>=0){
                           	_this.webp = api.require('webp');
                           _this.webp.open({
                               rect:{
                                       x: 0,
                                       y: 0,
                                       w: apiwidth,
                                       h: apiheight
                                   },
                               path: item.img,
                               fixedOn: api.player,
                           });
                       }*/
  					if(item.total>50) {
                       if (item.img.indexOf('svga')!=-1) {
                           _this.getSvga(item.img)
              			   _this.fswf_svga=true
                       } else {
                           _this.amintGit.avatar = item.avatar
                           _this.amintGit.name = item.name
                           _this.amintGit.gitf = item.gitf
                           _this.amintGit.img = item.img
                           _this.amintGit.num = item.num
                           _this.java = true
                       }
                       var time=0
                       clearInterval(this.forflag)
                       this.gifttime(item.gift_run_time*1000)
                   }

                }
            },

            //连击特效《--
            pythonPhp(){
                var _this=this
                if(_this.arrlike.length>0){
                    var item=_this.arrlike[0]
                    if(item.total<=50){
                        _this.zhiboTx(item)//连击特效
                    }

                }
            },
            zhiboTx(item){
                var _this=this;
                var topFlg=JSON.stringify(_this.gtop);
                var centerFlg=JSON.stringify(_this.gcenter);

                if(_this.gtop.gitf==item.gitf&&_this.gtop.name==item.name){
                    _this.gtop.num=item.num+_this.gtop.num
                    _this.arrlike.shift()
                }else if(_this.gcenter.gitf==item.gitf&&_this.gcenter.name==item.name){
                    _this.gcenter.num=item.num+_this.gcenter.num
                    _this.arrlike.shift()
                }else{
                    if(topFlg=='{}'&&centerFlg=='{}'){
                        _this.topFun(item)
                        _this.equalFun2();
                    }else if(topFlg!='{}'&&centerFlg!='{}'){

                    }else if(topFlg!='{}'&&centerFlg=='{}'){
                        _this.centerFun(item)
                        _this.equalFun3();
                    }else if(topFlg=='{}'&&centerFlg!='{}'){
                        _this.topFun(item)
                        _this.equalFun2();
                    }
                }
                this.phpflag=setInterval(()=>{
                    _this.pythonPhp()
                },100)
            },
            equalFun3(){
                var _this=this;
                _this.java3=true
                setTimeout((e)=>{
                    _this.java3=false
                    _this.gcenter={}
                },9000)
            },
            equalFun2(){
                var _this=this;
                _this.java2=true
                setTimeout((e)=>{
                    _this.java2=false
                    _this.gtop={}
                },9000)
            },
            topFun(item){
                var _this=this;
                _this.gtop.avatar=item.avatar
                _this.gtop.gitf=item.gitf
                _this.gtop.name=item.name
                if(item.gitf=='小海螺'){
                    _this.gtop.img=domain.staticDomain+'gift/texiao/1544491137120_icon.png'
                }else if(item.gitf=='打call'){
                    _this.gtop.img=domain.staticDomain+'gift/texiao/1544490954722_icon.png'
                }else{
                    _this.gtop.img=item.img
                }
                _this.gtop.num=item.num
                _this.arrlike.shift()
            },
            centerFun(item){
                var _this=this;
                _this.gcenter.avatar=item.avatar
                _this.gcenter.gitf=item.gitf
                _this.gcenter.name=item.name
                if(item.gitf=='小海螺'){
                    _this.gcenter.img=domain.staticDomain+'gift/texiao/1544491137120_icon.png'
                }else if(item.gitf=='打call'){
                    _this.gcenter.img=domain.staticDomain+'gift/texiao/1544490954722_icon.png'
                }else{
                    _this.gcenter.img=item.img
                }
                _this.gcenter.num=item.num
                _this.arrlike.shift()

            },
            //连击特效--》
            gifttime(o){
                var _this=this
                setTimeout(()=>{
                    /*var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if(isiOS){
                        _this.webp.close();
                    }*/
                    _this.java=false
                    _this.fswf_svga=false
                    _this.arrlike.shift()
                    _this.forflag=setInterval(()=>{
                        _this.giftamite()
                    },100)
                },o)
            },
            textflag(){
                this.flag=true
                this.getPerson('kkk')
            },
            closegif(){
                if(this.webp!=''){
                    this.webp.close();
                }
                //33

                this.sendInfo('closeplayer',{key:''})
            },
            sendInfo(t,o){
                api.sendEvent({
                    name:t,
                    extra:o
                });
            },
            videoflag(){
                this.valueinput=false
                this.flag=false
            },
            styleobj(){
                if(this.liveCt.avatar==1){
                    return  'background:url("'+require("../../static/img/default.jpg")+'") center no-repeat;';
                }else{
                    return 'background: url("'+this.liveCt.avatar+'")'
                }
            },
            styleobj2(o){
                if(o==null||o==''){
                    return  'background:url("'+require("../../static/img/default.jpg")+'") center no-repeat;';
                }else{
                    return 'background: url("'+o+'")'
                }
            },
            CheckInfo() {
                console.log(event.keyCode)
                if (event.keyCode == 13||event.keyCode == 40) {
                    this.valueinput=false
                }
            },
            textInfo(e){
                console.log(this.$refs.inputshow)
                this.valueinput=true
                var _this=this;
                setTimeout(function(){
                    _this.$refs.inputshow.focus()
                },100)
                //this.reload()
            },
            h5live(){
                this.valueInfo=false;
                this.flag=true;
            },
            playvideo(){
                this.$refs.video_ui.style.display='none'
                //this.$refs.html5player.style.display='block'
                this.$refs.html5player.play()
            },
            playvideo1(){
                this.$refs.video_ui.style.display='none'
                var ws=plus.webview.currentWebview();
                ws.parent().evalJS('this.$root.vcdeo.play()')
                //this.$refs.html5player.style.display='block'
                //this.playing?this.video.pause():this.video.play();
            },
            clickButton: function(val){
                //console.log('小时')
                // $socket is socket.io-client instance
                this.$socket.emit('broadcast',val);
                //Socket.emitData('broadcast',msg);
            },
            SendGift(){
                this.sendgiftname()
            },
            login(o){
                var _this=this;
                if(o==99||o==88){

                   this.sendInfo('closeplayer1',{key:''})
                }
            },
            sendgiftname(){
                var _this=this;
                var json={touid:this.liveCt.uid,giftid:this.giftid,showid:this.liveCt.showid,num:this.num}
                // alert(JSON.stringify(dat))
                this.axios.post(apiy.send_gift,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }

                        if(dat.state==0){
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

                            var lwcount = dat.content.liwu;
                            var roomnumq = dat.content.quid; //请求连麦者id
                            var roomnumb = dat.content.buid; //被连麦者id
                            var msg = '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"SendGift","evensend":"'+dat.content.evensend+'","action":"0","ct":"'+dat.content.gifttoken+'","msgtype":"1","level":"'+dat.content.level+'","uid":"'+dat.content.uid+'","timestamp":"'+FormatNowDate()+'","uname":"'+_this.name+'","uhead":"'+_this.avatar+'","vip_type":"0","liangname":"'+_this.liangname+'","guizu":"'+_this.guizu+'"}]}';

                            _this.clickButton(msg)
                            if(dat.content.gift_total_coin>500){//全场广播
                                //this.gift50.push({guizu:data.msg[0].guizu,liang:data.msg[0].liangname,avatar:data.msg[0].uhead,name:data.msg[0].uname,gitf:data.msg[0].ct.giftname,img:data.msg[0].ct.gifticon,num:data.msg[0].ct.giftcount,gitid:data.msg[0].ct.giftid,gift_run_time:data.msg[0].ct.gift_run_time,level:data.msg[0].ct.level})
                                var mvp={
                                    retcode:"000000",
                                    retmsg:"ok",
                                    msg:[{
                                        _method_:"AllShowLiveSendGiftMsg",
                                        action:"5",
                                        msgtype:"0",
                                        ct:{
                                            id:dat.content.uid,
                                            videoname:_this.liveCt.user_nicename,
                                            name:_this.name,
                                            level:dat.content.level,
                                            liangname:_this.liangname,
                                            guizu:_this.guizu,
                                            num:_this.num,
                                            giftname:_this.giftname,
                                        }
                                    }]

                                }
                                mvp=JSON.stringify(mvp)
                                _this.clickButton(mvp)
                            }

                            if (lwcount != '' && roomnumq != 0 && roomnumb != 0) {
                                console.log(_this.liveCt.uid+'-------'+roomnumq);
                                if (_this.liveCt.uid == roomnumq) {
                                    var msg = '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"10","msgtype":"10","roomnum":"' + roomnumb + '","lwcount":"' + lwcount + '",}]}';

                                    _this.clickButton(msg)
                                    var msg2 = '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"2","msgtype":"2","roomnum":"' + roomnumq + '","lwcount":"' + lwcount + '",}]}';

                                    _this.clickButton(msg2)
                                } else {
                                    var msg = '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"10","msgtype":"10","roomnum":"' + roomnumq + '","lwcount":"' + lwcount + '",}]}';
                                    _this.clickButton(msg)
                                    var msg2 = '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"2","msgtype":"2","roomnum":"' + roomnumb + '","lwcount":"' + lwcount + '",}]}';
                                    _this.clickButton(msg2)
                                }


                            }
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
                this.axios.get(apiy.person)
                    .then(function(res){
                        //_this.$root.login(res.data.state)
                        var dat=res.data
                       // _this.$root.login(dat.state)
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        if(dat.state==0){
                            _this.name=dat.content.user_info.user_nicename
                            _this.level=dat.content.user_info.level
                            _this.avatar=dat.content.user_info.avatar
                            _this.uid=dat.content.user_info.uid
                            _this.liangname=dat.content.user_info.liang.name
                            _this.guizu=dat.content.user_info.noble.name
                            _this.locKcoin=dat.content.user_info.coin

                            try{
                                return o('v')
                            }catch(e){
                                //TODO handle the exception
                                //console.log(e)
                            }

                        }else{
                            _this.showM(dat.msg)
                        }
                    })
            },
            getGift(){
                var _this=this;
                this.axios.get(apiy.person)
                    .then(function(res){
                        //_this.$root.login(res.data.state)
                        var dat=res.data
                        //_this.$root.login(dat.state)
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
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
                /*var ws=plus.webview.currentWebview();
                ws.parent().loadURL('http://www.hailuozhibo.com/h5/view/#'+o)
                //ws.parent().loadURL('http://192.168.1.108:8080/#'+o)
                plus.webview.close(ws)*/
                if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                    this.sendInfo('closeplayer3',{key:o})

                }else{
                    this.$router.push({
                        path:'/show',
                        query:{
                            id:o
                        }
                    })
                }

            },
            selectGift(i,d){
                this.IndexNum=i
                this.giftname=d.giftname
                this.giftimg=d.gifticon
                this.giftid=d.id
                //this.SendGift()
            },
            Send(){
                new Promise((resolve,reject)=>{
                    this.getPerson(resolve)
                }).then((e)=>{
                    if(this.valueInfo.length>50){
                        this.showM('发送信息不得超过50字！')
                        return
                    }
                    if(this.valueInfo.length<1){
                        return
                    }
                    //var msg = '{"msg":[{"_method_":"SystemNot","action":"13","ct":"' + this.valueInfo + '","msgtype":"4","uname":"' + this.name + '","toname":"' + this.name + '","touid":' + this.uid  + ',"uid":' + this.uid + ',"level":' + this.level + ',"vip_type":"0","liangname":"' + this.name + '"}],"retcode":"000000","retmsg":"ok"}';
                    //var msg = '{"msg":[{"_method_":"SendMsg","action":0,"ct":"' + this.valueInfo + '","msgtype":"2","tougood":"","touid":"","touname":"","ugood":"' + this.uid + '","uid":"' + this.uid + '","uname":"' + this.name + '","level":"' + this.level + '","vip_type":"0","liangname":"' + this.name+ '"}],"retcode":"000000","retmsg":"OK"}';
                    //this.clickButton(msg)
                    //this.valueInfo=''
                    this.shieldtext();
                })

            },
            shieldtext(){
                var _this=this;
                var json={msg:this.valueInfo,stream:_this.liveCt.stream};
                this.axios.post(apiy.index_shield_msg_content,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.valueInfo=dat.content
                            var msg = '{"msg":[{"_method_":"SendMsg","action":0,"ct":"' + _this.valueInfo + '","msgtype":"2","tougood":"","touid":"","touname":"","ugood":"' + _this.uid + '","uid":"' + _this.uid + '","uname":"' + _this.name + '","level":"' + _this.level + '","vip_type":"0","liangname":"'+_this.liangname+'","guizu":"'+_this.guizu+'"}],"retcode":"000000","retmsg":"OK"}';
                            _this.clickButton(msg)
                            _this.valueInfo=''
                        }else{
                            _this.showM(dat.msg)
                        }
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
                this.axios.get(apiy.setNodeInfo+'?liveuid='+o)
                    .then(function(res){

                        if(res.data.state==0){
                            if(res.data.userinfo.userType!=0){
                                _this.$socket.emit('conn',
                                    {
                                        uid:res.data.userinfo.id,
                                        roomnum:res.data.userinfo.roomnum,
                                        stream:_this.liveCt.stream,
                                        nickname: res.data.userinfo.user_nicename,
                                        equipment: 'pc',token:res.data.userinfo.token,
                                        liangname:res.data.userinfo.liang.name,
                                        guizu:res.data.userinfo.noble.name
                                    });
                            }else{
                                _this.$socket.emit('conn',
                                    {
                                        uid:res.data.userinfo.id,
                                        roomnum:res.data.userinfo.roomnum,
                                        stream:_this.liveCt.stream,
                                        nickname: res.data.userinfo.user_nicename,
                                        equipment: 'pc',token:res.data.userinfo.token,
                                        liangname:'',
                                        guizu:''
                                    });
                            }

                        }
                    })
            },
            getis_attention(){
                var _this=this;
                var json={roomnum:this.videoUrl};
                this.axios.post(apiy.home+'?'+this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.is_attention=dat.content.is_attention
                            console.log(_this.is_attention)

                        }
                    })
            },
            getHome(o){
                var _this=this;
                var json={roomnum:this.videoUrl};
                this.axios.post(apiy.home+'?'+this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        
                        if(dat.state==0) {
                            console.log(JSON.stringify(dat))
                            // _this.LinkRouter(dat.content.hls);
                            _this.liveCt = dat.content.liveinfo
                            _this.content = dat.content
                            _this.hls = dat.content.hls + '?shp_identify=302'
                            _this.gift = dat.content.gift_list
                            _this.giftid = dat.content.gift_list[0].id
                            _this.giftname = dat.content.gift_list[0].giftname
                            _this.inituser(dat.content.liveinfo.uid)
                            _this.catdog = dat.content.show_total_contribution
                            _this.catperson = dat.content.liveinfo.audience_num
                            _this.islive=dat.content.liveinfo.islive
                            if(_this.islive===0)_this.arrkuty({'id':_this.videoUrl})
                            //alert(JSON.stringify(_this.liveCt))
                            //console.log(JSON.stringify(_this.liveCt))
                            //_this.locKcoin=dat.content.user_info.coin
                        }else if(dat.state==20){
                            _this.closegif()
                            _this.showM(dat.msg)
                        }else{
                            _this.showM(dat.msg)
                        }
                        // _this.live=res.data.content.show_list
                        try{
                            return o('succ')
                        }catch (e) {

                        }
                    })
            },
            /*	LinkRouter(o){
                    var videoObject = {
                      container: '.video',//“#”代表容器的ID，“.”或“”代表容器的class
                      variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
                      autoplay:true,//自动播放
                      live:false,
                      poster:'../../static/img/default.jpg',//封面图片
                      //video:'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4',//视频地址
                //http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8
              //video:'../../static/mp4.mp4'
              video:'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4'
              //video:'http://31572.liveplay.myqcloud.com/live/31572_21619_1539075450.flv',
                  };
                  var player=new ckplayer(videoObject);
                },*/
            Follow(){
                var _this=this;
                var json={page:1,length:4};
                this.axios.post(apiy.attention,this.$qs.stringify(json))
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
                this.axios.post(apiy.give_attention,this.$qs.stringify(json))
                    .then(function(res){
                        //_this.$root.login(res.data.state)
                        //alert(JSON.stringify(res))
                        var dat=res.data
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        if(dat.state==0){
                            //_this.getHome()
                            _this.getis_attention()
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
                this.axios.post(apiy.cancel_attention,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        //_this.$root.login(res.data.state)
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        _this.getHome()
                        // _this.live=res.data.content.show_list
                    })
            },
        }
    }
</script>

<style type="text/css" scoped="scoped" lang="less">
    .pkstart{
        width:2.1rem;
        position: absolute;
        z-index: 10;
        top:3rem;
        left:0.2rem;
        text-align: center;
        span{
            width:1.5rem;
            height:0.5rem;
            line-height: 0.5rem;
            border-radius: 0.3rem;
            display: inline-block;
            background: rgba(0,0,0,0.5);
            font-size: 0.28rem;
            color: #fff;
        }
        img{
            width: 2.1rem;
            margin-top:0.05rem;

        }
        .pks1{
            position: absolute;
            z-index: 11;
            top:0.85rem;
            overflow: hidden;
            img{
                width:0.7rem;
                height:0.7rem;
                border-radius: 50%;
                object-fit: cover;
                vertical-align: middle;
                margin-left:0.2rem;
            }
            i{
                font-size: 0.28rem;
                margin-left: 0.1rem;
            }
            p{
                font-size: 0.28rem;
                text-align: left;
                padding-left: 0.2rem;
                line-height: 0.55rem;
                height:0.55rem;
                img{
                    width:0.4rem;
                    vertical-align: middle;
                    margin-left: 0;
                    margin-top:-0.05rem;
                }
            }
        }
        .pks2{
            top:2.8rem;
            img{
                margin-left:0.2rem;
            }
        }
    }
    .pk{
        position: absolute;
        width:100%;
        height:100%;
        left:0;
        top:0;
        z-index: 14;
        img{
            width: 100%;
            margin-top:3rem;
        }
        .pk1{
            position: absolute;
            top:4.85rem;
            left:0.8rem;
            img{
                width:1rem;
                float: left;
                border-radius: 50%;
                object-fit: cover;
                margin-top:0;
            }
            p{
                float: left;
                width:2.5rem;
                overflow: hidden;
                font-size: 0.28rem;
                margin-left:0.2rem;
                i{
                    display: block;
                }
            }
        }
        .pk2{
            left:2.6rem;
            top:6.5rem;
            img{
                float: right;
                margin-left:0.2rem;
            }
            p{
                float: right;
                margin-left:0;
                text-align: right;
            }
        }
    }
    .left-scroll{
        width:100%;
        position: fixed;
        z-index: 300;
        left:0;
        top:1.8rem;
        overflow-x: scroll;
        .ul-scroll{
            width:100000000000px;
        }
        .d1{
            float: right;
        }
        .d2{
            float: left;
        }
        .demo{
            width:7.5rem;
            height:0.6rem;
            float: right;
            margin-right: -100%;
            overflow: hidden;
        }
        .ul-li{
            overflow: hidden;
            width:7.5rem;
            height:0.6rem;
            padding:0 0.2rem;
            background: rgba(0,0,0,0.5);
            border-radius: 0.5rem;
            overflow: hidden;
            span{
                display: inline-block;
                width:0.8rem;
                float: left;
                img{
                    width:100%;
                    vertical-align: middle;
                }
            }
            span.s2{
                width:0.45rem;
                margin-right:0.1rem;
            }
            span.s3{
                width:0.9rem;
                margin-right:0.1rem;
            }
            p{
                font-size: 0.28rem;
                color:#fff;
                float:left;
                margin-top:0.1rem;
                margin-left:0.1rem;
                i{
                    color: greenyellow;
                }
            }
        }
    }
    .mint-swipe{
        height:160px;
    }
    .top_banner{
        left:3%;
        z-index: 3;
    }
    .video_status{
        top: 50px;
        left: 3%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 3;
    }
    .video_status.video_status_living:before{
        display: none;
    }
    .video_status.video_status_living{
        width:100px;
    }
    .closegif{
        background: url('../../static/img/ic_room_btn_close_pressed.png');
        background-size: cover;
        display: inline-block;
        width:0.8rem;
        height:0.8rem;
        float: right;
        margin-right:0.2rem;
    }
    .input{
        position: absolute;
        z-index: 5;
        bottom:0;
        left:0;
        input{
            width:5.4rem;
            padding-left:0.5rem;
            height:1rem;
            background:rgba(0,0,0,0.5);
            float: left;
            display: block;
            color:#fff ;
        }
        input::-moz-placeholder{
            color:#fff ;
        }
        input::-ms-input-placeholder{
            color:#fff ;
        }
        input::-webkit-input-placeholder{
            color:#fff ;
        }
        button{
            display: block;
            border: 0 none;
            width:1.6rem;
            height:1rem;
            background:#B94CFF;
            float: left;
            color: #fff;
            outline: 0;
        }
    }
    @import '../../static/css/style.css';
    .vjs-custom-skin > .video-js .vjs-big-play-button{
        background-color: rgba(0,0,0,0.45);
        font-size: 3.5em;
        border-radius: 50%;
        height: 2em !important;
        line-height: 2em !important;
        margin-top: -1em !important;
        width: 2em;
    }
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
        width:100%;
        height:100%;
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
        height: 202px;
        background:rgba(0,0,0,0.5);
        z-index: 10;
        -webkit-box-shadow: 0 0 13px #ccc;
        -moz-box-shadow: 0 0 13px #ccc;
        box-shadow: 0 0 13px #ccc
    }

    .GiftPanel .GiftPanel-content {
        width: 100%;
        height: 160px;
        overflow: auto;
        -webkit-overflow-scrolling: touch
    }

    .GiftPanel .GiftPanel-content .GiftItem {
        float: left;
        width: 25%;
        height: 80px;
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
        color: #fff;
        font-size: 12px
    }

    .GiftPanel .GiftPanel-content .GiftItem .GiftItem-worth {
        color: #fff;
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
        margin-left: 5px;
        margin-right: 4px
    }

    .GiftPanel .GiftPanel-footer .balance span {
        font-size: 13px;
        color: #fff
    }

    .GiftPanel .GiftPanel-footer .btn-charge {
        float: left;
        line-height: 42px;
        color: #f70;
        margin-left: 5px;
        font-size: 14px
    }


    .GiftPanel .GiftPanel-footer  .btn-gz{
        float: left;
        width:45px;
        line-height: 42px;
        color: #f70;
        font-size: 14px;
        img{
            width:100%;
            margin-top:12px;
        }
    }
    @media screen and (min-width: 340px) {
        .GiftPanel .GiftPanel-footer  .btn-gz{
            margin-left:10px;
            img{
                width:100%;
                margin-top:12px;
            }
        }
    }
    .GiftPanel .GiftPanel-footer .select_num{
        width:70px;
        height:42px;
        line-height: 42px;
        box-sizing: border-box;
        float: left;
        text-align: center;
        border:2px solid #ffa200;
        font-size: 14px;
        em{
            display: inline-block;
            width:18px;
            margin-left:0.1rem;
            img{
                width:100%;
                margin-top:13px;
            }
        }
    }
    .GiftPanel .GiftPanel-footer .btn-send {
        position: absolute;
        right: 0;
        top: -1px;
        width:139.5px;
        span{
            display: block;
            width: 69.5px;
            float: left;
            height: 42px;
            line-height: 42px;
            text-align: center;
            background-color: #ffa200;
            background-image: none;
            color: #fff;
            font-size: 14px;
            cursor: pointer
        }
    }

    .GiftPanel .GiftPanel-footer .btn-send .vaild {
        background-color: #ffa200;
        color: #fff
    }

    .GiftPanel .GiftPanel-footer .btn-send  .flask_model{
        position: absolute;
        right:30px;
        z-index: 220;
        bottom: 42px;
        width:150px;
        background: rgba(0,0,0,0.8);
        p{
            font-size: 14px;
            height:35px;
            line-height: 35px;
            overflow: hidden;
            text-align: center;
            i{
                float: left;
                color:#ffa200;
                width:50px;
                height:35px;
                display: block;
                line-height: 35px;
            }
            em{
                float: right;
                color: #ccc;
                display: block;
                width:80px;
                height:35px;
                line-height: 35px;
            }
        }
    }

    .flask_site{
        width: 100%;
        height:100%;
        position: fixed;
        bottom: 0;
        left:0;
        z-index: 219;
    }
    //礼物
    .Banner {
        position: fixed;
        top:0;
        left:0;
        text-align: center;
        width:100%;
        height: 100%;
        -moz-background-size: 100% 100%;
        background-size: 100% 100%;
        -webkit-transform: translateX(-150%) translateY(0);
        -moz-transform: translateX(-150%) translateY(0);
        -ms-transform: translateX(-150%) translateY(0);
        -o-transform: translateX(-150%) translateY(0);
        transform: translateX(-150%) translateY(0)
    }

    .Banner.active {
        -webkit-animation: h .5s ease-in-out;
        -moz-animation: h .5s ease-in-out;
        -o-animation: h .5s ease-in-out;
        animation: h .5s ease-in-out;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        -o-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }


    .Banner .Banner-gift {
        position: absolute;
        left:0;
        right:0 ;
        top:0 ;
        bottom:0 ;
        margin:auto;

    }


    @-moz-keyframes h {
        0% {
            -moz-transform: translateX(-150%) translateY(0);
            transform: translateX(-150%) translateY(0)
        }

        to {
            -moz-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0)
        }
    }

    @-o-keyframes h {
        0% {
            -o-transform: translateX(-150%) translateY(0);
            transform: translateX(-150%) translateY(0)
        }

        to {
            -o-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0)
        }
    }

    @keyframes h {
        0% {
            -webkit-transform: translateX(-150%) translateY(0);
            -moz-transform: translateX(-150%) translateY(0);
            -o-transform: translateX(-150%) translateY(0);
            transform: translateX(-150%) translateY(0)
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
    .swf{
        position: absolute;
        width:7.5rem;
        top:0;
        z-index:1;
        img{
            width:100%;
            vertical-align: middle;
        }
    }

    .custom{
        width:2.6rem;
        height:1rem;
        position: absolute;
        top:0.18rem;
        left:3.3rem;
        /*border:1px solid #fff;*/
        overflow-x: scroll;
        z-index: 3;
        .scroll{
            width:19.5rem;
            overflow: hidden;
        }
        span{
            display: block;
            width:0.8rem;
            height:0.8rem;
            float: left;
            border-radius: 50%;
            margin-top:0.06rem;
            margin-left: 0.1rem;
            background-size: cover !important;
        }
    }
    .person_number{
        width:1.3rem;
        height:0.65rem;
        line-height: 0.65rem;
        float: left;
        color: #fff;
        border-radius: 0.3rem;
        position: absolute;
        top:0.32rem;
        right:0.2rem;
        text-align: center;
        font-size: 0.28rem;
        background:rgba(0,0,0,0.5) ;
        z-index: 3;
    }
    .chat_gift{
        background: url("../../static/img/giftc.png") !important;
        background-size: cover !important;
        margin-left:2rem !important;
    }
    .chat_banner .chat_gift:after{
        background: transparent !important;
    }

    .video_status_start{
        width:1.5rem !important;
        height:0.5rem;
        line-height: 0.5rem;
        margin-top:0.6rem;
        img{
            width:20%;
            vertical-align: middle;
            margin-right:0.1rem;
        }

    }
    .chat_ico1{
        display: inline-block;
        margin-left: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .45);
    }
    .chat_ico1:after {
        content: '';
        display: block;
        margin: 9px 0 0 10px;
        width: 20.5px;
        height: 20.5px;
        background-image: url('../../static/img/share.png');
        background-size: 100% 100%;
    }
    .share_model{
        background: rgba(0,0,0,0.5);
        position: fixed;
        bottom: 0;
        left:0;
        width:100%;
        height:100%;
        z-index: 600;
    }
    .share_info{
        background: #ecf1f7;
        position: fixed;
        bottom: 0;
        left:0;
        width:100%;
        height:4rem;
        z-index: 600;
        ul{
            width:92%;
            padding:0 4%;
            display: flex;
            text-align: center;
            overflow: hidden;
            li{
                display: block;
                width:3rem;
                height:2rem;
                color:#2c2c2c;
                font-size: 0.25rem;
                margin-left:0.3rem;
                span{
                    display: block;
                    margin-bottom: 0.2rem;
                }

            }
            li:first-child{
                margin-left:0;
            }
        }
        h2{
            font-size: 0.35rem;
            text-align: center;
            height:1rem;
            line-height: 1rem;
            color:#666;
            clear: both;
        }
        .quxiao{
            font-size: 0.3rem;
            text-align: center;
            height:1rem;
            line-height: 1rem;
            color:#2c2c2c;
            background: #fff;
        }
    }
</style>

