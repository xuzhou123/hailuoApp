<template>
    <div class="aliyunpush"></div>
</template>

<script>
    import apiy from '@/constant/api'
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                stream:'',
                aliyunLive:'',
                videoUrl:'',
                title:'',
                beautyWhite:1,//美白
                beautyBuffing:1,//磨皮
                beautyRuddy:1,//红润
                beautyCheekPink:1,//瘦脸
                beautyThinFace:1,//收下巴
                beautyShortenFace:1,//腮红
                beautyBigEye:1,//大眼
                password:""
            }
        },
        mounted(){
            this.getVideoUrl()
        },
        methods:{
            goRouter(o){
                this.$router.push({
                    path:o
                })
            },
            //4001001288
            eventInfo(){
                var _this=this;
                api.addEventListener({//设置标题
                    name: 'title'
                }, function(ret, err) {
                    _this.title=ret.value.key
                });
                api.addEventListener({//开始推流
                    name: 'start'
                }, function(va, err) {
                    _this.aliyunLive.startPush({url:_this.videoUrl},function(ret){
                        if(ret.status==true){
                           /* api.closeFrame({
                                name: 'main2'
                            });*/
                            //_this.openUrl(apiy+'alive?id='+va.key)
                        _this.openDoor()
                            //_this.showM('推流成功！')
                        }else{
                            _this.showM(ret.errorMsg)
                        }
                    });
                });
                api.addEventListener({//重新推流
                    name: 'resetVideo'
                }, function(va, err) {
                    _this.resetVideo();
                });
                api.addEventListener({//重新推流
                    name: 'resetVideo1'
                }, function(va, err) {
                    _this.resetVideo1();
                });

                api.addEventListener({//关闭
                    name: 'close'
                }, function(ret, err) {
                    api.closeFrame({
                        name: 'main2'
                    });
                    api.closeFrame({
                        name: 'main3'
                    });
                   // _this.aliyunLive.stopPush()
                    _this.aliyunLive.destroy()
                    //window.location.href=apiy.hosturl
                    _this.goRouter('/')
                });



                api.addEventListener({//切换摄像头
                    name: 'switchCamera'
                }, function(ret, err) {
                    _this.aliyunLive.switchCamera()
                });

                api.addEventListener({//美白
                    name: 'beautyWhite'
                }, function(ret, err) {
                    _this.beautyWhite=ret.value.key
                    _this.setFace()
                });

                api.addEventListener({//磨皮
                    name: 'beautyBuffing'
                }, function(ret, err) {
                    _this.beautyBuffing=ret.value.key
                    _this.setFace()
                });

                api.addEventListener({//红润
                    name: 'beautyRuddy'
                }, function(ret, err) {
                    _this.beautyRuddy=ret.value.key
                    _this.setFace()
                });

                api.addEventListener({//瘦脸
                    name: 'beautyCheekPink'
                }, function(ret, err) {
                    _this.beautyCheekPink=ret.value.key
                    _this.setFace()
                });

                api.addEventListener({//收下巴
                    name: 'beautyThinFace'
                }, function(ret, err) {
                    _this.beautyThinFace=ret.value.key
                    _this.setFace()
                });
                api.addEventListener({//腮红
                    name: 'beautyShortenFace'
                }, function(ret, err) {
                    _this.beautyShortenFace=ret.value.key
                    _this.setFace()
                });

                api.addEventListener({//大眼
                    name: 'beautyBigEye'
                }, function(ret, err) {
                    _this.beautyBigEye=ret.value.key
                    _this.setFace()
                });
                api.addEventListener({//大眼
                    name: 'password'
                }, function(ret, err) {
                    _this.password=ret.value.key
                });
            },
            showM(o){
                // this.$root.Hub.$emit('child',{msg:o,flag:true});
                Toast({
                    message:o,
                    iconClass: 'icon icon-success',
                    className:'backColor',
                    duration:1000
                });
            },
            openDoor(){
                var _this=this;
                let type_val=this.password;
                let type=0;
                if(this.password!==''){
                    type=1
                }
                var json={title:this.title,stream:this.stream,type:type,type_val,type_val};
                this.axios.post(apiy.pc_show_createroom,this.$qs.stringify(json))
                    .then(function(res){
                        if(res.data.state==0){
                            alert('创建房间成功！')
                        }
                    })
            },
            setFace(){
                var _this=this
               
                this.aliyunLive.setBeautyValues({
                    beautyWhite:_this.beautyWhite,//美白
                    beautyBuffing:_this.beautyBuffing,//磨皮
                    beautyRuddy:_this.beautyRuddy,//红润
                    beautyCheekPink:_this.beautyCheekPink,//瘦脸
                    beautyThinFace:_this.beautyThinFace,//收下巴
                    beautyShortenFace:_this.beautyShortenFace,//腮红
                    beautyBigEye:_this.beautyBigEye,//大眼
                });
            },
            getVideoUrl(){
                var _this=this;
                this.axios.post(apiy.live_get_tx_pull_url)
                    .then(function(res){
                        var dat=res.data
                        _this.$root.login(dat.state)
                        if(dat.state==0){
                            _this.stream=dat.content.stream
                            _this.videoUrl=dat.content.rtmp_pull_url
                            _this.createvideo()

                        }else{
                            _this.showM(dat.msg)
                            _this.goRouter('/')
                        }
                    })
            },
            createvideo(){
                var _this=this;
                api.setKeepScreenOn({
                    keepOn: true
                });
                api.openFrame({
                    name: 'main3',
                    url: '',
                    preload:true,
                    rect: { // 推荐使用Margin布局，用于适配屏幕的动态变化
                        marginTop: 0, // main页面距离win顶部的高度
                        marginBottom: 0, // main页面距离win底部的高度
                        w: 'auto', // main页面的宽度 自适应屏幕宽度
                    }
                });
                var aliyunLive = api.require('alivcLivePusher');
                this.aliyunLive=aliyunLive
                var apiheight=window.screen.height
                var apiwidth=window.screen.width
                aliyunLive.initPusher({
                    resolution:'720P',
                    initialVideoBitrate:'1500k',//初始化码率
                    targetVideoBitrate:'1800k',//目标码率
                    minVideoBitrate:'600k',//最小码率
                    qualityMode:'ResolutionFirst',//码控
                    beautyMode:'professional',//专业版，具备人脸识别功能。可以调节含瘦脸、大眼、小脸、腮红等。
                    beautyEnable:true,//是否开启美颜 (ios 不支持)
                    fps:25,//帧率
                    videoOnly:false,//纯视频推流 (如果设置为false则为纯音频推流)注意:1.如果不调用startPreview接口进行预览的话,推流会失败 2.与 audioOnly互斥 3.如果videOnly和audioOnly都设置为false，则视频和音频都可以推流
                    waterMarkImage:{
                        path: '',               //字符串类型，图片的路径，支持fs://,widget://（android 不支持widget://）
                        coordX: 0.1,            //数字类型，水印左上顶点x的相对坐标，默认0.1 取值范围：[0,1]
                        coordY: 0.1,            //数字类型，水印左上顶点y的相对坐标，默认0.1 取值范围：[0,1]
                        width:0.3
                    },
                    cameraType:'front',
                },function(ret) {
                    //alert(JSON.stringify(ret));
                });
                aliyunLive.startPreview({
                    fixedOn:'main3',
                    fixed:true,
                    rect:{
                        x:0,
                        y:0,
                        w:apiwidth,
                        h:apiheight
                    }
                },function(ret){
                    if(ret.status==true){
                        _this.eventInfo()
                    }
                })
                this.setFace()
                aliyunLive.setpreviewDisplayMode({displayModel:2},function(ret){
                    //alert(JSON.stringify(ret));
                });
                aliyunLive.setAutoFocus({
                    isAutoFocus:true
                });
                this.openUrl(apiy.hosturl+'openVideo2')

            },
            resetVideo() {
                var _this=this;
                api.setFrameAttr({
                    name:'main3',
                    rect:{
                        x:0,    //会被忽略
                        y:0,    //会被忽略
                        w:0,
                        h:0
                    }
                });
                // _this.aliyunLive.startPreview({
                //     fixedOn:'main3',
                //     fixed:true,
                //     rect:{
                //         x:0,
                //         y:0,
                //         w:100,
                //         h:100
                //     }
                // },function(ret){
                //     if(ret.status==true){
                //         _this.aliyunLive.reconnectPush();
                //         alert(333)
                //     }
                // })
            },
            resetVideo1() {
                var _this=this;
                var apiheight=window.screen.height
                var apiwidth=window.screen.width
                api.setFrameAttr({
                    name:'main3',
                    rect:{
                        x:0,    //会被忽略
                        y:0,
                        w:apiwidth,
                        h:apiheight
                    }
                });
            },
            openUrl(o){
                api.openFrame({
                    name: 'main2',
                    url: o,
                    preload:false,
                    bgColor: 'rgba(0,0,0,0.0)',
                    rect: { // 推荐使用Margin布局，用于适配屏幕的动态变化
                        marginTop: 24, // main页面距离win顶部的高度
                        marginBottom: 0, // main页面距离win底部的高度
                        w: 'auto' // main页面的宽度 自适应屏幕宽度
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>