<template>
    <div>
        <br />
        <div id="pusher"
             style="width:300px;height:400px;background-color:#000000;margin:auto"></div>
        <br />
        <div style="text-align:center; margin:auto;">
            <input id="path"
                   type="text"
                   value="rtmp://testlivesdk.v0.upaiyun.com/live/upyunb"
                   placeholder="请输入直播服务器地址(rtmp)" />
            <div style="clear: both"></div>
            <button id="pp"
                    v-on:click="ppPusher()">开始</button>
        </div>
        <div class="button"
             v-on:click="switchCamera()">切换摄像头</div>
        <div class="button"
             v-on:click="modef(0)">标清</div>
        <div class="button"
             v-on:click="modef(1)">高清</div>
        <div class="button"
             v-on:click="modef(2)">超清</div>
        <div class="button"
             v-on:click="auto_focus()">自动聚焦</div>
        <div class="button"
             v-on:click="whiteness(0)">美白(0级)</div>
        <div class="button"
             v-on:click="whiteness(1)">美白(1级)</div>
        <div class="button"
             v-on:click="whiteness(2)">美白(2级)</div>
        <div class="button"
             v-on:click="whiteness(3)">美白(3级)</div>
        <div class="button"
             v-on:click="whiteness(4)">美白(4级)</div>
        <div class="button"
             v-on:click="whiteness(5)">美白(5级)</div>
        <div class="button"
             v-on:click="beauty(1)">美颜</div>
        <div class="button"
             v-on:click="beauty(0)">取消美颜</div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                bstart: false,
                pusher: null
            }
        },
        mounted(){
           // document.addEventListener("plusready", this.plusReady(), false);
        },
        methods: {
            switchCamera () {
                this.pusher.switchCamera();
            },
            plusReady () {
                var _this=this
                // 创建直播推流控件
                this.pusher = new plus.video.LivePusher("pusher", {
                    url: "rtmp://testlivesdk.v0.upaiyun.com/live/upyunb",
                    whiteness: 5
                });
                // 监听状态变化事件
                this.pusher.addEventListener(
                    "statechange",
                    function (e) {
                        console.log("statechange: " + JSON.stringify(e));
                    },
                    false
                );
                plus.key.addEventListener('backbutton', function() {
                    // 事件处理
                    _this.pusher.close()

                }, false);
            },
            ppPusher () {
                if (this.bstart) {
                    this.pusher.stop();
                    this.bstart = false;
                } else {
                    var path = document.getElementById("path").value;
                    if (path && path.length > 0) {
                        this.pusher.setStyles({ url: path });
                        this.pusher.start();
                        this.bstart = true;
                    } else {
                        plus.nativeUI.toast("请输入直播服务器地址");
                    }
                }
                var pp = document.getElementById("pp");
                pp.innerText = this.bstart ? "停止" : "开始";
            },
            modef(p){//
                if(p==0){
                    this.pusher.setStyles({ mode: 'SD'});
                }else if(p==1){
                    this.pusher.setStyles({ mode: 'HD' });
                }else if(p==2){
                    this.pusher.setStyles({ mode: 'FHD' });
                }
            },
            auto_focus(){
                //this.pusher.setStyles({ auto-focus : true });
            },
            beauty(o){
                this.pusher.setStyles({ beauty: o });
            },
            whiteness(o){
                this.pusher.setStyles({ whiteness: o });
            },

        }
    }
</script>
<style scoped lang="less">
    input {
        width: 70%;
        font-size: 16px;
        padding: 0.2em 0.2em;
        border: 1px solid #00b100;
        -webkit-user-select: text;
    }
    .button, button {
        width: 20%;
        margin: 6px 0 6px 6px;
        font-size:0.28rem;
        color: #fff;
        background-color: #00cc00;
        border: 1px solid #00b100;
        padding: 0.2em 0em;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        float: left;
        text-align: center;
    }
</style>