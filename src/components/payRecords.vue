<template>
  <div class="Records">
     <header>
        <img src="../../static/img/leftx.png"   @click="LinkRouter('/mysystemset')" alt=""><i>充值明细</i>
      </header>
      <div class="line"></div>
    <p>近期充值明细如下</p>
     <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">
    <table class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
     <tr>
       <th>充值方式</th>
       <th>充值时间</th>
       <th>充值金额</th>
       <th>获得钻石</th>
     </tr>
      <tr v-for="(item,index) in live">
        <td >
          {{stype(item.type)}}
        </td>
        <td  >
         {{item.addtime}}
        </td>
         <td  >
         {{item.money}}
        </td>
        <td   >
         {{item.coin+item.coin_give}}
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


        },
        methods:{
          stype(o){
            if(o=='1'){
               return '支付宝'
            }else if(o=='2'){
               return '微信'
            }else if(o=='3'){
               return '苹果支付'
            }

          },
          // search(){
          //   console.log(this.stime,this.etime)
          // },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
           },
          searchInfo(){
            var _this=this;
            console.log(this.page)
            var json={page:this.page,length:this.len};
            this.axios.post(api.my_charge_record,this.$qs.stringify(json))
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
    width:7.1rem;
    margin:0 auto;
    text-align: center;
    border:1px solid #ccc;
    i{
      color:#B8B8B8;
    }
    td{
      border: 0 none !important;
      font-size: 0.24rem;
    }
    th{
       border: 0 none !important;
      background: #e9f4ff;
      font-size: 0.3rem;
    }
  }

  table tr{

    border-bottom: 1px solid #ccc;
  }
  p{
    width:7.1rem;
    margin:0 auto;
    height:0.8rem;
    line-height: 0.8rem;
    font-size: 0.24rem;
    color:#8d8d8d;
  }
</style>
