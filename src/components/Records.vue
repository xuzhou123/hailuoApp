<template>
  <div class="Records">
     <header>
        <img src="../../static/img/leftx.png"   @click="LinkRouter('/mysystemset')" alt=""><i>我的直播记录</i>
      </header>
      <div class="line"></div>
    <div class="stime">
      <i>查询时间</i> <input v-model="stime" type="date" placeholder="请输入开始时间"><em>-</em><input v-model="etime"  type="date" placeholder="请输入结束时间"><span @click="search()"><img src="../../static/img/search.png"
                                                                                                         alt=""></span>
    </div>
     <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">
    <table class="page-infinite-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
      <tr v-for="(item,index) in live">
        <td style="border-left:0;">
          <p>开播 <i>&nbsp;{{item.starttime}}</i> </p>
          <p>结束 <i>&nbsp;{{item.endtime}}</i></p>
        </td>
        <td  width="50">
          一般直播<br/>
          人数 {{item.nums}}
        </td>
        <td style="border-right:0;"  width="120">
            直播标题<br/>
          {{item.title}}
        </td>
      </tr>
    </table>
    <p v-show="allLoaded" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      <i>加载中...</i>
    </p>
  </div>
  </div>
</template>

<script>
import store from '@/store/store'
import api from '@/constant/api'
import * as types from '@/store/types'
import qs from 'qs'
import { Toast } from 'mint-ui'
    export default {
        name: "Records",
        data(){
          return{
            stime:'2018-09-12',
            etime:'2018-11-19',
            loading: false,
            allLoaded: false,
            wrapperHeight:0,
            page:0,
            len:10,
            live:[]
          }
        },
        mounted(){
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
          var myDate = new Date();
          var str=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
          this.stime=str
          this.etime=str
          console.log(str)
          this.search(str)

        },
        methods:{
          // search(){
          //   console.log(this.stime,this.etime)
          // },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
           },
          search(o){
            var _this=this;
            this.live=[]
            var json={page:1,length:10,start_time:this.stime,end_time:this.etime};
            console.log(json)
            this.axios.post(api.my_liverecord,this.$qs.stringify(json))
            .then(function(res){
              if(res.data.state==0){
                   _this.live=_this.live.concat(res.data.content)
                }else{
                  _this.showM(res.data.msg);
                }
              })
          },
          searchInfo(){
            var _this=this;
            console.log(this.page)
            var json={page:this.page,length:this.len,start_time:this.stime,end_time:this.etime};
            this.axios.post(api.my_liverecord,this.$qs.stringify(json))
            .then(function(res){
              if(res.data.state==0){
                    if(res.data.content.length<=0){
                      _this.loading=true
                    }else{
                      _this.loading=false
                    }
                      _this.live=_this.live.concat(res.data.content)
                      _this.allLoaded=false
                }else{
                  _this.showM(res.data.msg);
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
          loadMore() {
            this.loading = true;
            this.allLoaded=true
            var _this=this
            this.forflag=setTimeout(() => {
              _this.page++

              _this.searchInfo()
            }, 1000);
          }
        }
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
        img{
          width:0.26rem;
          vertical-align: middle;
        }
        i{
          font-size: 0.4rem;
          color: #2c2c2c;
          margin-left:0.5rem;
        }
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  .stime{
    padding:0.3rem 0.2rem;
    i{
      font-size:0.34rem;
      color: #2c2c2c;
    }
    input{
      width:2.18rem;
      height:0.62rem;
      border:1px solid #ccc;
      background: #f3f3f3;
      color: #ccc;
      font-size:0.25rem;
      border-radius: 0.13rem;
    }
    span{
      display: inline-block;
      width:0.44rem;
      margin-left: 0.2rem;
      img{
        width:100%;
        vertical-align: middle;
      }
    }
    em{
       color: #ccc;
      margin:0 0.1rem;
    }
  }
  table{
    font-size: 0.24rem;
    color: #2c2c2c;
    width:100%;
    text-align: center;
    i{
      color:#B8B8B8;
    }
  }
</style>
