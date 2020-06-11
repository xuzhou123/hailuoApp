<template>
    <div class="follow">
      <div class="nowText" >
        <span><img src="../../static/img/area.png" alt="" />同城推荐</span>
        <!--<em @click="active = 'tab-container1'">合肥&nbsp;<i><img src="../../static/img/right.png" alt=""></i></em>-->
        <em @click="setactive()">合肥&nbsp;<i><img src="../../static/img/right.png" alt=""></i></em>

      </div>
      <div class="item_list" style="border-top:1px solid #f5f5f5">
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">
          <ul id="live-list" class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <li v-for="(item,index) in arr_my_attention" @click="LinkRouter(item.touid)"  :style="styleObj(item.users_live.avatar)">
              <!--<img :src="item.users_live.avatar"  :onerror="onError(item.users_live.avatar_thumb,item)" class="icon-big" >-->
               <!--<img :src="item.users_live.avatar"   class="icon-big" >-->
              <div class="h-info">
                <span class="fans">{{item.users_live.user_nicename}}</span>
                <span class="live-icon"><i class="iconp">&#xe729;</i>{{item.users_live.nums}}</span>
              </div>
              <p v-if="item.users_live.islive==1"><img src="../../static/img/m1.png" alt=""></p>
            </li>
          </ul>
         <p v-show="allLoaded" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              <i>加载中...</i>
         </p>
        </div>
      </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import api from '@/constant/api'
    import { Toast } from 'mint-ui'
    export default {
        name: "follow",
        data(){
           return{
             live:[//直播列表数据集
             ],
           arr_my_attention:[],//我的关注数据集
           arr_recommend:[],//推荐数据
            loading: false,
            allLoaded: true,
            wrapperHeight:0,
            page:1,
            len:10,
            forflag:''
           }
        },
      mounted(){
           this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
           this.Follow()
      },
      methods:{
          setactive(){
            this.$root.Hub.$emit('act',{active:'tab-container2'})
          },
          styleObj(o){
              return  'background:url("'+o+'") center no-repeat;';
          },
          onError(i,o){
            return o.users_live.avatar_thumb=i
          },
          LinkRouter(o){
            this.$router.push({
              path:'/live',
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
          Follow(o){
             if(o=='e'){
              this.arr_my_attention=[]
            }
               var _this=this;
               var json={page:this.page,length:this.len};
              this.axios.post(api.attention,this.$qs.stringify(json))
                .then(function(res){
                  var dat=res.data
                  _this.$root.login(dat.state)
                  if(dat.state==0){
                  _this.arr_recommend=dat.content.arr_recommend
                 // _this.arr_my_attention=dat.content.arr_my_attention
                      if(dat.content.arr_my_attention.length<=0){
                        _this.loading=true
                      }else{
                        _this.loading=false
                      }
                      _this.arr_my_attention=_this.arr_my_attention.concat(res.data.content.arr_my_attention)
                      _this.allLoaded=false
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
                _this.showM(dat.msg)
               // _this.live=res.data.content.show_list
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
         loadMore() {
            this.loading = true;
            var _this=this
            this.forflag=setTimeout(() => {
              _this.page++
              _this.allLoaded=true
              _this.Follow()
            }, 1000);
          }
      },
     /* created(){
          var _this=this;
          this.$root.Hub.$on('follow',function(o){
            _this.Follow(o)
          })
      },
      beforeDestroy () {
        this.$root.Hub.$off('follow')
        clearInterval(this.forflag)
      },*/
       beforeRouteLeave(to, from, next){
        next()
        clearInterval(this.forflag)
      },
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
  header{
          width:7.1rem;
          margin:0 auto;
          height:1.2rem;
          line-height: 1.2rem;
        text-align: center;

        i{
          font-size: 0.4rem;
          color: #2c2c2c;
          font-weight: bold;
        }
      }
   .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  .nowText{
     width:7.1rem;
     margin:0 auto;
    height:1rem;
    line-height: 1rem;
    span{
      font-size: 0.34rem;
      color: #2c2c2c;
      float: left;
      display: inline-block;
      img{
      	width:0.38rem;
      	margin-right:0.1rem;
      }
      

    }
    em{
    	float: right;
    	font-size: 0.34rem;
    }
    i{
      width:0.19rem;
      display: inline-block;
      
    }
    img{
      width:100%;
      vertical-align: middle;
      margin-top:-0.1rem;
    }
  }
.zb_live {
  ul {
    display: inline;
    li {
      width: 1rem;
      text-align: center;
      float: left;
      position: relative;
      margin-left:0.25rem;
      .bm {
        width: 0.3rem;
        position: absolute;
        top: 0.6rem;
        right: 0.2rem;
      }
      p {
        width: 0.9rem;
        height: 0.9rem;
        margin: 0 auto;
        box-sizing: border-box;
        border: 2px solid #0ac9ff;
        border-image: -webkit-linear-gradient(#0ac9ff, #6a04ff) 0.3rem 0.3rem;
        border-image: -moz-linear-gradient(#0ac9ff, #6a04ff) 0.3rem 0.3rem;
        border-image: linear-gradient(#0ac9ff, #6a04ff) 0.3rem 0.3rem;
        border-radius: 50%;
        overflow: hidden;
        background-size:cover !important;
        img {
          width: 100%;
        }
      }
      span {
        display: block;
        font-size: 0.22rem;
        color: #2c2c2c;
        text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      }
      i {
        display: block;
        font-size: 0.16rem;
        color: #8f8e8e;
      }

    }
  }
}
  .kinr{
    width:0.06rem;
    height:0.6rem;
    background: #f3f3f3;
    margin:0 0.1rem;
    float: left;
    margin-top:0.15rem;
  }
  .zb_live{
    width:100%;
    overflow:scroll;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 0.25rem;
    .zb_sc{
      width:10000000000000000000000px;
      overflow: hidden;
    }
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
    src: url('//at.alicdn.com/t/font_862104_vrdovhmupn.eot');
    src: url('//at.alicdn.com/t/font_862104_vrdovhmupn.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_862104_vrdovhmupn.woff') format('woff'),
    url('//at.alicdn.com/t/font_862104_vrdovhmupn.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_862104_vrdovhmupn.svg#iconfont') format('svg');
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
