<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/search')" alt="">
        <i >更多用户</i>
      </header>
      <div class="line"></div>
      <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">
      <ul  class="page-infinite-list"   v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="(item,index) in live">
          <span :style="styleObj(item.avatar)">
                    <!--<img :src="item.users_live.avatar_thumb" alt="">-->
                  </span>
          <div>
            <p>{{item.user_nicename}}</p>
            <i>{{item.title}}</i>
          </div>
          <i><img  @click="giveattion(item.id)" v-if="item.is_attention==0" size="large" src="../../static/img/ruby2.png" alt=""><img  @click="openConfirm(item.id)" v-if="item.is_attention==1" size="large" src="../../static/img/ruby1.png" alt=""></i>
        </li>
      </ul>

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
import { Toast,MessageBox } from 'mint-ui'
    export default {
        name: "setting",
        data(){
          return{
            live:[],
            loading: false,
            allLoaded: false,
            wrapperHeight:0,
            page:0,
            len:10,
            forflag:'',
            type:'',
            Fans:[],
            manager:[]
          }
        },
        mounted(){
          this.type=this.$route.query.m
          //this.Follow()
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        methods:{
           styleObj(o){
              return  'background:url("'+o+'") center no-repeat;';
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
              this.axios.post(api.cancel_attention,this.$qs.stringify(json))
              .then(function(res){
                var dat=res.data
                _this.$root.login(res.data.state)
                  _this.page=1
                  _this.Follow1()
               // _this.live=res.data.content.show_list
            })
          },
           LinkRouter(o){
             var bu=this.$route.query.t
             if(bu==1){
              var url='/?i=1'
             }else{
              var url=o
             }
            this.$router.push({
              path:url
              })
          },
            giveattion(o){
                var _this=this;
                var json={touid:o};
                this.axios.post(api.give_attention,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        _this.$root.login(res.data.state)
                        _this.page=1
                        _this.Follow1()
                        // _this.live=res.data.content.show_list
                    })
            },
            Follow1(){
                var _this=this;
                var json={page:this.page,length:this.len,key_word:this.$route.query.key};
                this.axios.post(api.index_search_result_more_user,this.$qs.stringify(json))
                    .then(function(res){
                        _this.$root.login(res.data.state)
                        var dat=res.data
                        if(dat.state==0){
                            _this.live=dat.content.user_list
                        }else{
                            _this.showM(dat.msg)
                        }
                    })
            },
           Follow(){
               var _this=this;
                var json={page:this.page,length:this.len,key_word:this.$route.query.key};
              this.axios.post(api.index_search_result_more_user,this.$qs.stringify(json))
                .then(function(res){
                  _this.$root.login(res.data.state)
                  var dat=res.data
                  if(dat.state==0){
                    //_this.live=dat.content.arr_my_attention
                    if(dat.content.user_list.length<=0){
                        _this.loading=true
                      }else{
                        _this.loading=false
                      }
                      _this.live=_this.live.concat(dat.content.user_list)
                      _this.allLoaded=false
                  }else{
                    _this.showM(dat.msg)
                  }
              })
          },
           loadMore() {
            this.loading = true;
            this.allLoaded=true
            var _this=this
            this.forflag=setTimeout(() => {
              _this.page++
                _this.Follow()
            }, 1000);
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
        },
      beforeDestroy(){
          clearInterval(this.forflag)
      },
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
  .setting{
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
  }
  ul{
    li{
      overflow: hidden;
      height:1.48rem;
      line-height: 1.48rem;
      padding:0 0.2rem;
      border-bottom: 1px solid #f3f3f3;
      span{
        width:1rem;
        height:1rem;
        border-radius: 50%;
        overflow: hidden;
        display: block;
        float: left;
        margin-top:0.25rem;
        background-size:cover !important;
        img{
          width:100%;
          vertical-align: middle;
        }
      }
      div{
        width:5.18rem;
        margin-top:0.38rem;
        float: left;
        overflow: hidden;
        padding-left: 0.32rem;
        line-height: 0.43rem;
        p{
          font-size: 0.34rem;
          color: #2c2c2c;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        i{
          width:100%;
           font-size: 0.26rem;
          color: #b8b8b8;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }
      i{
        width:0.44rem;
        display: block;
        float: right;
        img{
          width:100%;
          vertical-align: middle;
        }
      }
    }
  }
</style>
