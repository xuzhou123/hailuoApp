<template>
    <div class="open" id="pusher">

    </div>
</template>

<script>
    export default {
        data () {
            return {
                bstart: false,
                pusher: null,
                wsub:null,
                VG:null,
            }
        },
        mounted(){
           // document.addEventListener("plusready", this.plusReady(), false);
        },
        created(){
            var _this=this
            this.$root.Hub.$on('call',(o)=>{
                console.log('87464694');
                _this.beauty(o)
            })
        },
       /* methods: {
            plusReady () {
                var _this=this
                // 创建直播推流控件
                this.pusher = new plus.video.LivePusher("pusher", {
                    url: "rtmp://testlivesdk.v0.upaiyun.com/live/upyunb",
                    whiteness: 5
                });
                this.pusher.preview();


                this.createSubview()
                plus.key.addEventListener('backbutton', function() {
                    // 事件处理
                    _this.pusher.close()

                }, false);
            },
            createSubview(){
                var _this=this
                //console.log('http://192.168.1.107:8081/#/?id='+_this.$route.query.id)
                if(!this.wsub) {
                    var topoffset = document.getElementById('pusher').offsetTop;
                    //this.wsub=plus.webview.create('http://www.hailuozhibo.com/h5/view/app/#/?id='+_this.$route.query.id,'sub',{top:topoffset,height:'100%',position:'absolute',scrollIndicator:'none',background:'transparent'},{Token:localStorage.getItem('login_token'),kt:_this.$route.query.id});
                    this.wsub=plus.webview.create('http://192.168.1.108:8080/#/openVideo2','sub',{top:topoffset,height:'100%',position:'absolute',scrollIndicator:'none',background:'transparent'},{Token:localStorage.getItem('login_token')});

                    plus.webview.currentWebview().append(this.wsub);
                }
                this.wsub.isVisible()?this.wsub.hide():this.wsub.show();
                this.wsub.onclose=function(){
                    _this.pusher.close()
                }
                var b = new plus.video.getLivePusherById('pusher');
                console.log(JSON.stringify(b))
                //b.setStyles({ beauty: 1 });

            },
            beauty(o){//开启美颜
                this.pusher.setStyles({ beauty: o });
            },

        }*/
    }
</script>

<style scoped lang="less">
.open {
    background: #ddd;
    position: fixed;
    bottom:0;
    width:7.5rem;
    height: 100%;
}
</style>