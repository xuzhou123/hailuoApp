<template>
    <div class="model_info">
        <div class="model-content">
            <div class="meun" @click="sheetVisible = true"><img src="../../static/img/menu.png" alt=""></div>
            <div class="avatar" :style="styleobj(content.avatar)"></div>
            <div class="person_info">
                <span>{{content.user_nicename}}</span> <em><b  v-if="content.sex==0" style="font-weight: normal;font-size: 0.25rem;" >保密</b> <img v-if="content.sex==2" src="../../static/img/women.png" alt=""> <img v-if="content.sex==1" src="../../static/img/man.png" alt=""> </em> <i v-if="(content.level_anchor!=null||content.level_anchor!='')"><img  :src='imgct(content.level_anchor)' alt=""> </i>  <i v-if="(content.level!=null||content.level!='')" style="width:1.1rem;"><img :src='imgct1(content.level)' alt=""> </i>
            </div>
            <div class="person_num">
                <span>账号：{{content.id}}</span>
                <span v-if="content.users_liang_name!=''&&content.users_liang_name!=null">&nbsp;靓号：{{content.users_liang_name}}</span>
                <span v-if="content.users_noble_name!=''&&content.users_noble_name!=null">&nbsp;贵族：{{content.users_noble_name}}</span>
                <em v-if="content.province!=''"> <img src="../../static/img/bd.png" alt="">
                </em> {{content.province}}&nbsp;{{content.city}}
            </div>

            <div class="person_p">
                {{content.signature}}
            </div>

            <div class="django" v-if="type==0">
              <span>
                {{content.users_attention_count}}
                <em>关注</em>
              </span>
                <span>
                {{content.users_fans_count}}
                <em>粉丝</em>
              </span>
                <span>
                {{content.get_gift_count}}
                <em>收礼</em>
              </span>
                <span>
                {{content.send_gift_count}}
                <em>送礼</em>
              </span>
            </div>
            <div class="django" v-if="type==-1">
              <span>
                0
                <em>关注</em>
              </span>
                <span>
               0
                <em>粉丝</em>
              </span>
                <span>
                0
                <em>收礼</em>
              </span>
                <span>
                0
                <em>送礼</em>
              </span>
            </div>

            <div class="bottvt">
                <img v-if="content.is_attention==0" @click="setFollow(content.id)"  src="../../static/img/ct.png" alt="">
                <img v-if="content.is_attention==1" @click="openConfirm(content.id)"  src="../../static/img/xk.png" alt="">
            </div>
        </div>
        <div class="model-shadow"  @click="arrkuty()"></div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
    import apiy from '@/constant/api'
    import { Toast,MessageBox } from 'mint-ui'
    export default {
        name: "model_info",
        data(){
            return{
                sheetVisible:false,
                flag:false,
                liveCt:[],
                videoUrl:'',
                content:{},
                myid:'',
                cloudid:'',
                type:0,
                actions: [],
                stream:'',
                zid:'',
                zname:'',
            }
        },
        mounted(){
            var _this=this
            //new Promise(function(resolve, reject){
            _this.getPerson()
            // }).then(()=>{
            //_this.getHome(_this.$route.query.id)
            // })
        },
        created(){
            var _this=this
            this.$root.Hub.$on('md',(e)=>{
                if(e.kk.id>=0){
                    _this.getHome(e.kk.id)
                }else{
                    _this.type=-1
                    _this.content=e.kk
                }
                if(e.iszb){
                    this.actions = [
                        {
                            name: '添加房管',
                            method: this.setabmit
                        },
                        {
                            name: '禁言',
                            method: this.openAlbum
                        },
                        {
                            name: '踢出',
                            method: this.takePhoto
                        }];
                }else{
                    this.actions = [
                        {
                            name: '禁言',
                            method: this.openAlbum
                        },
                        {
                            name: '踢出',
                            method: this.takePhoto
                        }];
                }
                _this.zid=e.zid
                _this.zname=e.zname
                _this.cloudid=e.kk.id
                _this.stream=e.stream
            })
        },
        methods:{
            takePhoto() {//踢出
                var _this=this;
                var json={touid:this.cloudid,stream:this.stream};
                console.log(json)
                this.axios.post(apiy.live_kick_user,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        if(res.data.state==0){
                            //uid操作人ID uname操作人昵称 touid 被禁言人的ID toname被禁言人昵称
                            var msg = '{"msg":[{"_method_":"KickUser","action":"2","ct":"' + _this.content.user_nicename + '被踢出了房间！","msgtype":"4","uid":' + _this.zid + ',"uname":"' + _this.zname + '","touid":' + _this.content.id + ',"toname":"' + _this.content.user_nicename + '","vip_type":"0","liangname":"0"}],"retcode":"000000","retmsg":"ok"}';
                            _this.$root.Hub.$emit('shut',msg)
                        }else{
                            _this.showM(res.data.msg)
                        }
                    })
            },
            openAlbum() {//禁言
                var _this=this;
                var json={touid:this.cloudid,stream:this.stream};
                console.log(json)
                this.axios.post(apiy.live_shut_up_user,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        if(res.data.state==0){
                            //uid操作人ID uname操作人昵称 touid 被禁言人的ID toname被禁言人昵称
                            var msg = '{"msg":[{"_method_":"ShutUpUser","action":"1","ct":"' + _this.content.user_nicename + '被禁言了！","msgtype":"4","uid":' + _this.zid + ',"uname":"' + _this.zname + '","touid":' + _this.content.id + ',"toname":"' + _this.content.user_nicename + '","vip_type":"0","liangname":"0"}],"retcode":"000000","retmsg":"ok"}';
                            _this.$root.Hub.$emit('shut',msg)
                        }else{
                            _this.showM(res.data.msg)
                        }
                    })
            },
            setabmit(){//添加管理
                var _this=this;
                var json={touid:this.cloudid,zhubo_id:this.myid};
                console.log(json)
                this.axios.post(apiy.add_manager,this.$qs.stringify(json))
                    .then(function(res){
                           _this.showM(res.data.msg)
                    })
            },
            login(o){
                var _this=this;
                if(o==99||o==88){

                    this.sendInfo('closeplayer1',{key:''})
                }
            },
            sendInfo(t,o){
                api.sendEvent({
                    name:t,
                    extra:o
                });
            },
            styleobj(o){
                if(o==''){
                    return 'background: url("../../static/img/default.jpg") center'
                }else{
                    return 'background: url('+o+') center'
                }

            },
            imgct(o){
                if(o!=undefined){
                    return require('../../static/img/op'+o+'.png')
                }else{
                    return ''
                }


            },
            imgct1(o){
                if(o!=undefined){
                    return require('../../static/img/'+o+'.png')
                }else{
                    return ''
                }


            },
            arrkuty(){
                var _this=this
                _this.$root.Hub.$emit('a2')
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
            login(o){
                var _this=this;
                if(o==99||o==88){

                    this.sendInfo('closeplayer1',{key:''})
                }
            },
            setFollow(o){
                var _this=this;
                var json={touid:o};
                console.log(json)
                this.axios.post(apiy.give_attention,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        if(dat.state==0){
                            _this.getHome(_this.cloudid)
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
                        if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
                            _this.login(dat.state)
                        }else{
                            _this.$root.login(dat.state)
                        }
                        _this.getHome(_this.cloudid)
                        // _this.live=res.data.content.show_list
                    })
            },
            getHome(e){
                var _this=this;
                var json={user_id:e,my_uid:this.myid};
                this.axios.post(apiy.live_anchor_info,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            // _this.LinkRouter(dat.content.hls);
                            _this.content=dat.content
                            //console.log(_this.content)

                        }
                    })
            },
            getPerson(){
                var _this=this;
                this.axios.post(apiy.person)
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){

                            _this.myid=dat.content.user_info.id

                        }
                    })
            },
        },
    }
</script>

<style scoped lang="less">
    .meun{
        width:0.5rem;
        position: absolute;
        top:0.1rem;
        left:0.3rem;
        img{
            width:100%;
        }
    }
    .model-content{
        position: fixed;
        width:7.18rem;
        height:6.2rem;
        background: #fff;
        bottom:0.1rem;
        left:0.16rem;
        z-index: 200;
        border-radius: 0.2rem 0.2rem 0 0;
        .avatar{
            width:1.86rem;
            height:1.86rem;
            border-radius: 50%;
            border:1px solid #fff;
            position: absolute;
            left:2.66rem;
            top:-0.9rem;
            background-size: cover !important;
        }
        .person_info{
            text-align: center;
            overflow: hidden;
            margin-top:1.56rem;
            font-size:0.36rem ;
            color: #2c2c2c;
            font-weight: bold;
            em{
                display: inline-block;
                width: 0.34rem;
                margin-left: 0.1rem;
                img{
                    width:100%;
                    vertical-align: middle;
                }
            }

            i{
                display: inline-block;
                width: 0.9rem;
                margin-left: 0.1rem;
                img{
                    width:100%;
                    vertical-align: middle;
                }
            }
        }
        .person_p{
            font-size: 0.24rem;
            color: #8d8d8d;
            text-align: left;
            overflow: hidden;
            margin:0 0.3rem;
            margin-top:0.2rem;
        }
        .person_num{
            font-size: 0.3rem;
            color: #8d8d8d;
            text-align: center;
            overflow: hidden;
            margin-top:0.39rem;
            em{
                display: inline-block;
                width:0.27rem;
                margin-left:0.3rem;
                img{
                    width:100%;
                    vertical-align: middle;
                    margin-top:-0.05rem;
                }
            }

        }
    }
    .model-shadow{
        position: fixed;
        width:7.5rem;
        height:100%;
        background: rgba(0,0,0,0.5);
        bottom: 0;
        z-index: 199;
    }

    .django{
        width:6.9rem;
        display: flex;
        text-align: center;
        font-size: 0.3rem;
        margin-top:0.5rem;
        span{
            display: block;
            width:3rem;
            color: #2c2c2c;
            font-weight: bold;
            em{
                color: #8d8d8d;
                display: block;
                font-weight: normal;
            }
        }
    }
    .bottvt{
        position: absolute;
        width: 100%;
        bottom: 0;
        img{
            width: 100%;
        }

    }
</style>
