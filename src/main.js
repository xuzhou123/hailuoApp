// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/base.css'
import '../static/css/banner.css'
import '../static/js/rem.js'
import '../static/js/svga.js'
import axios from '../static/js/http.js'
import global from '../static/js/global.js'
//import '../static/js/ckplayer.js'
import CryptoJS from 'crypto-js'
import qs from 'qs'
import '../static/css/weui.min.css'//weui样式
// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
//在main.js内
//import VideoPlayer from 'vue-video-player'
//import 'videojs-contrib-hls'
//Vue.use(VideoPlayer);
Vue.prototype.global = global
Vue.prototype.$qs = qs;
Vue.prototype.axios=axios;
Vue.prototype.CryptoJS=CryptoJS;
Vue.use(MintUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    data:{
        Hub:new Vue()
    },
    store,
    axios,
    router,
    methods:{
        entrypt:function(data){//加密
            var dataText='';
            if(typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length){
                //console.log("json")
                dataText=JSON.stringify(data)
            }else{
                //console.log("字符串")
                dataText=data;
            }
            //console.log(dataText)
            //var key  = this.CryptoJS.enc.Latin1.parse('HDXZ@~_^&&123_78');
            var key  = this.CryptoJS.enc.Latin1.parse('THUX@~_^&&983_78');
            var iv   = this.CryptoJS.enc.Latin1.parse('0201080306050704');
            var Crydata=this.CryptoJS.AES.encrypt(dataText, key, {iv:iv,mode:this.CryptoJS.mode.CBC,padding:this.CryptoJS.pad.ZeroPadding}).toString();
            return {data:Crydata}
        },
        getmd5(str){
            var a;
            var md5 = crypto.createHash("md5");
            md5.update(str);
            var a = md5.digest('hex');
            return a
            //47bce5c74f589f4867dbd57e9ca9f808
        },
        login(o){
            var _this=this;
            if(o==99||o==88){
                var redirect = decodeURIComponent(_this.$route.query.redirect || '/login_pwd');
                _this.$router.push({
                    path: redirect
                })
            }
        },
        getBase64(img){
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataURL = canvas.toDataURL();
            return dataURL
        }
    },
    components: { App },
    template: '<App/>'
})

