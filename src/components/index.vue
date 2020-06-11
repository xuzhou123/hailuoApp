<template>
	<div class="page-tabbar">
    <div :class="['page-wrap',{'pageScroll':!isiOS || (isiOS && urli==2)}]">
         <mainIndex v-if="urli==0"></mainIndex>
         <!--<smallvideo v-if="urli==3"></smallvideo>-->
          <tvvt v-if="urli==3"></tvvt>
          <shop v-if="urli==4"></shop>
          <person v-if="urli==2"></person>
    </div>
    <mt-tabbar v-model="selected" style="color:#5b5b5b; font-size: 12px;border-top:1px solid #eee;" fixed>
      <mt-tab-item id="推荐"  @click.native.prevent="kclick('/?i=0')">
        <i class="iconfont"   ref="t0"     slot="icon">
        	<img v-if="urli==0" src="../../static/img/index1.png" alt="" />
           <img v-else src="../../static/img/index1_1.png" alt="" />
        </i>
       		 首页
      </mt-tab-item>
       <mt-tab-item id="小视频"   @click.native.prevent="kclick('/?i=3')">
         <i class="iconfont"  ref="t3"   slot="icon">
         	<img v-if="urli==3"   src="../../static/img/video1.png" alt="" />
         	<img v-else    src="../../static/img/video1_1.png" alt="" />
         </i>
        	小视频
      </mt-tab-item>

        <mt-tab-item    @click.native.prevent="videosgift()">
            <i class="iconfont" style="width:60px; position: absolute;top:-10px;margin-left:-15px;"     slot="icon">
                <img  src="../../static/img/startvideo.png" alt="" />
            </i>
        </mt-tab-item>
      
      <mt-tab-item id="商城"  @click.native.prevent="kclick('/?i=4')">
         <i class="iconfont"   ref="t4"  slot="icon">
         	<img v-if="urli==4"  src="../../static/img/shop1_1.png" alt="" />
         	<img v-else  src="../../static/img/shop1.png" alt="" />
         </i>
        	商城
      </mt-tab-item>
     
      <mt-tab-item id="我的"  @click.native.prevent="kclick('/?i=2')">
         <i class="iconfont"  ref="t2"  slot="icon">
         	<img v-if="urli==2"  src="../../static/img/my1.png" alt="" />
         	<img v-else src="../../static/img/my1_1.png" alt="" />
         </i>
        	我的
      </mt-tab-item>
    </mt-tabbar>
    
  </div>
</template>

<script>
import store from '@/store/store'
import api from '@/constant/api'
import person from '@/components/person'
import follow from '@/components/follow'
import mainIndex from '@/components/main'
// import smallvideo from '@/components/smallvideo'
import tvvt from '@/components/tvvt'
import shop from '@/components/shop'
import { Range,Toast } from 'mint-ui';
import * as types from '@/store/types'
//import qs from 'qs'
export default {
	name: 'page-tabbar',
  	data() {
	   	return {
	      selected: '推荐',
	      urli:'',
        isiOS:true
	    };
  	},
    mounted(){
      var u = navigator.userAgent;
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.log(this.isiOS,'this.isiOS')
      this.ressDr();
      //this.getCode();
      localStorage.setItem('city','')
    },
  	methods:{
        videosgift(){
           if(window.navigator.userAgent.toLowerCase().indexOf("apicloud")>=0){
               this.goRouter('/aliyunpush')

            }else{
                this.showM("仅只支持app内直播,请微信公众号搜索‘海螺直播'下载对应app!")
            }
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
	    ressDr(){
	      var i=this.$route.query.i
	      this.urli=i;
	      if(i==0||i==''||i==undefined){
            this.$refs.t0.click();
       // }else if(i==1){
        //    this.$refs.t1.click();
        }else if(i==2){
            this.$refs.t2.click();
        }else if(i==3){
            this.$refs.t3.click();
        }else if(i==4){
            this.$refs.t4.click();
        }

      },
      kclick(o){
	      this.goRouter(o)
        var i=this.$route.query.i
        this.urli=i;
      },
      goRouter(o){
	      	this.$router.push({
    			path:o
        	})
      },
      getCode(){
          this.axios.get(api.index_check_code)
          .then(function(res){
              _this.$root.login(res.data.state)
              var dat=res.data
              //_this.$root.login(dat.state)
              if(dat.state==0){
              }else{
                 
              }
          })
      }
  	},
  components:{
	  person,follow,mainIndex,tvvt,shop
  }
}
</script>

<style scoped="scoped" lang="less">
  .search_id{
    border-bottom: 1px solid #f5f5f5;
    overflow: hidden;
  }
  .search{
    width:93%;
    padding:0.8% 0;
    margin:0 auto;
    overflow: hidden;
    font-size: 0.3rem;
    i{
      display: inline-block;
      width:1rem;
      float: left;
      margin-top:3px;
      color:#ccc;
      text-align: center;
    }
    span{
      display: inline-block;
      width:0.5rem;
      float: left;
      font-size: 0.4rem;
    }
  }
  #live-active{
  	overflow: hidden;
	li{
		width:33.3%;
		float: left;
    text-align: center;
    padding:1.8% 0;
    div{
      width:65%;
      float: left;
     // border-right:1px solid #ccc;
      box-sizing: border-box;
    }
		i {
      font-size: 0.5rem;
      display: block;
      width:35%;
      float: left;
      text-align: right;
      font-family: '微软雅黑', tahoma, 'hiragino sans gb', stheiti, 'wenquanyi micro hei', \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, sans-serif;
    }
		span{
			font-size: 0.25rem;
			display: block;
      margin-top:2px;
      color: #2c2c2c;
		}
		em{
			font-size: 0.2rem;
			display: block;
			color: #666;
		}
	}
  }
	 .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    height: 100%;
    padding-bottom: 100px;
  }
  .pageScroll{
    overflow: scroll !important;
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
    
     .iconp{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
    }
@font-face {
  font-family: 'iconfont';  /* project id 862104 */
  src: url('//at.alicdn.com/t/font_862104_g3g2382fbd.eot');
  src: url('//at.alicdn.com/t/font_862104_g3g2382fbd.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_862104_g3g2382fbd.woff') format('woff'),
  url('//at.alicdn.com/t/font_862104_g3g2382fbd.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_862104_g3g2382fbd.svg#iconfont') format('svg');
}
 
      @descendent desc {
        text-align: center;
        color: #666;
        margin-bottom: 5px;
      }
      .mint-swipe {
        height: 130px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        background: gray;
      }
      .mint-swipe-item {
        line-height: 130px;
        img{
          height:130px;
        }
      }
      .mint-tab-item{
        padding:5px 0 !important;
      }
      .slide1 {
        background-color: #0089dc;
        color: #fff;
      }
      .slide2 {
        background-color: #ffd705;
        color: #000;
      }
      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }
      #live-list{
      		box-sizing: border-box;
      		padding-bottom: 58px;
      		overflow: hidden;
      		li{
      			width:49.75%;
      			float: left;
      			box-sizing: border-box;
      			margin-top:0.5%;
      			position: relative;
      			img{
      				width:100%;
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
