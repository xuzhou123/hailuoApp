<template>
	<div id="live">

					<video autoplay="autoplay"   ref="html5player" preload="auto" x5-video-player-type="h5" x-webkit-airplay="true" :poster="video+'?vframe/jpg/offset/1'" webkit-playsinline="true"  playsinline="true"  :src="video"></video>
     <span ref="span">
       <img src="../../static/img/ic_room_btn_close_pressed.png" id="pptv"  @click="goRouter('/?i=3')" alt="">
     </span>
    	<div class="video_ui" v-if="playrt"  style="display: block" ref="video_ui" @click="playvideo">
					<a class="new_play_btn"></a>
				</div>
	</div>
</template>

<script>
import Vue from 'vue'
import store from '@/store/store'
import api from '@/constant/api'
import * as types from '@/store/types'
import { Toast,MessageBox  } from 'mint-ui'
export default {
  	data() {
	   	return {
         video:'',
         playrt:true
	    };
  	},
  	mounted(){
  	  var _this=this
      this.$nextTick(function(){
          if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
              this.playrt=false
          }
         this.video=this.$route.query.id
        /* if(window.plus){
            this.$refs.video_ui.style.display='none'
         }*/
      })
  	},
    methods: {
     goRouter(o) {
         //window.location.href='http://www.hailuozhibo.com/h5/hhhhhhhh/#/'
         this.$router.push({
           path: o
        })
     },
      playvideo(){
          this.$refs.html5player.play()
          this.playrt=false
      },
   }
}
</script>

<style type="text/css" scoped="scoped" lang="less">
  #live{
    width:100%;
    height:100%;
    position: fixed;
    bottom: 0;
	left:0
  }
  video{
	position: fixed;
    width:100%;
    height:100%;
  }
  span{
    position: absolute;
    left:0.3rem;
    top:0.3rem;
    display: block;
    img{
      width:0.8rem;
      vertical-align: middle;
    }
  }
.video_ui{
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	overflow: hidden;
	z-index: 15
}
.video_ui .new_play_btn{
	position: absolute;
	left: 50%;
	top: 50%;
	width: 81.5px;
	height: 81.5px;
	margin: -40.75px 0 0 -40.75px;
	background-image: url(data:image/png;base64,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);
	background-size: 100% 100%
}

</style>
