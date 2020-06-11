<template>
    <div class="Leaderboard">
        <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/?i=0')" alt=""><i>富豪排行榜</i>
      </header>
      <div class="title">
        <div>
          <a @click="liveClick(index)" v-for="(item,index) in live" :class="{active:index==livenow}" href="javasvript:void(0)">{{item.name}}</a>
        </div>
      </div>

      <div class="leader">
        <ul>
          <li v-if="person[0]!=null&&person[0].user!=null">
            <span><img src="../../static/img/no1.png" alt=""></span>
            <i :style="styleobj(person[0])">
              <img src="../../static/img/num1.png" alt="">
            </i>
            <div class="livename">
              <p>{{person[0].user.user_nicename}} <img v-if="person[0].user.sex==1" src="../../static/img/man.png" alt=""><img v-if="person[0].user.sex==2" src="../../static/img/women.png" alt=""></p>
              <p >共送出<em>{{person[0].total_coin}}</em>钻石</p>
            </div>
          </li>

            <li v-if="person[1]!=null&&person[1].user!=null">
            <span><img src="../../static/img/nu2.png" alt=""></span>
            <i  :style="styleobj(person[1])"> <img src="../../static/img/num2.png" alt="">
            </i>
            <div class="livename">
              <p>{{person[1].user.user_nicename}} <img v-if="person[1].user.sex==1" src="../../static/img/man.png" alt=""><img v-if="person[1].user.sex==2" src="../../static/img/women.png" alt=""></p>
             <p >共送出<em>{{person[1].total_coin}}</em>钻石</p>
            </div>
          </li>

            <li v-if="person[2]!=null&&person[2].user!=null">
            <span><img src="../../static/img/no3.png" alt=""></span>
            <i  :style="styleobj(person[2])"> <img src="../../static/img/num3.png" alt="">
            </i>
            <div class="livename">
              <p>{{person[2].user.user_nicename}} <img v-if="person[2].user.sex==1" src="../../static/img/man.png" alt=""><img v-if="person[2].user.sex==2" src="../../static/img/women.png" alt=""></p>
              <p >共送出<em>{{person[2].total_coin}}</em>钻石</p>
            </div>
          </li>

            <li v-for="(item,index) in person" v-if="index>2&&item.user!=null">
            <em style="float: left;display: inline-block;width:0.5rem;text-align: left;color:#00AEFF;font-size: 0.28rem;">{{index+1}}</em>  <i style="margin-left:0"  :style="styleobj(item)">
            </i>
            <div class="livename">
              <p>{{item.user.user_nicename}} <img v-if="item.user.sex==1" src="../../static/img/man.png" alt=""><img v-if="item.user.sex==2" src="../../static/img/women.png" alt=""></p>
             <p >共送出<em>{{item.total_coin}}</em>钻石</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  	import store from '@/store/store'
    import api from '@/constant/api'
    export default {
        name: "Leaderboard",
        data(){
          return{
              arr_month_rich_ranking_list:[],//月榜-富豪榜数据集
              arr_week_rich_ranking_list:[],//周榜-富豪榜数据集
              arr_day_rich_ranking_list:[],//日榜
              livenow:0,
              live:[
                {name:'今日',id:1},
                {name:'周榜',id:2},
                {name:'本月',id:3}
              ],
              person:[],
          }
        },
      mounted(){
          this.getLive()
      },
      methods:{
          styleobj(o){
            if(o.user.avatar!=1){
              return 'background:url("'+o.user.avatar+'")'
            }else{
              return 'background:url("../../static/img/default.jpg")'
            }
          },
          LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          liveClick(o){//周榜月榜
            this.livenow=o
            this.livenum()
          },
          livenum(){
            if(this.livenow==2){//土豪月榜
                  this.person=this.arr_month_rich_ranking_list
            }else if(this.livenow==1){//土豪周榜
                  this.person=this.arr_week_rich_ranking_list
            }else if(this.livenow==0){//土豪日榜单
                  this.person=this.arr_day_rich_ranking_list
            }
          },
        getLive(){
            var _this=this
            this.axios.get(api.ranking_list).then((res)=>{
               //console.log(res.data)
               var data=res.data.content
               _this.arr_month_rich_ranking_list=data.arr_month_rich_ranking_list//月榜-富豪榜数据集
               _this.arr_month_start_ranking_list=data.arr_month_start_ranking_list//月榜-明星榜数据集
               _this.arr_week_rich_ranking_list=data.arr_week_rich_ranking_list//周榜-富豪榜数据集
               _this.arr_week_start_ranking_list=data.arr_week_start_ranking_list//周榜-明星榜数据集
               _this.arr_month_gift_ranking_list=data.arr_month_gift_ranking_list//每月礼物榜数据集
               _this.arr_day_rich_ranking_list=data.arr_day_rich_ranking_list
               _this.livenum()
            })
        }
      }
    }
</script>

<style scoped lang="less">
   header{
          width:7.1rem;
          margin:0 auto;
          height:1.2rem;
          line-height: 1.2rem;
     text-align: center;
        img{
          width:0.26rem;
          float: left;
          margin-top:0.4rem;
        }
        i{
          font-size: 0.4rem;
          color: #2c2c2c;
          margin-left:0.5rem;
        }
      }
    .title{
      width:100%;
      clear: both;
      text-align: center;
      overflow: hidden;
      .title{
        border: 0;
      }
      div{
        width:95%;
        margin:0 auto;
        border:1px solid #00AEFF;
        overflow: hidden;
        margin-top:0.1rem;
      }
      a{
        display: inline-block;
        width:33.3%;
        height:0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size:0.3rem ;
        color:#8b8b8b;
        box-sizing: border-box;
        float: left;
      }
      a.active{
         background: #00AEFF;
         color:#fff;
      }
    }
  .leader{
    ul{
      li{
        width:7rem;
        padding:0.16rem 0.25rem;
        border-top:1px solid #eee;
        overflow: hidden;
      }
    }
    span{
      display: block;
      width:0.54rem;
      float: left;
      margin-top:0.1rem;
      img{
        width:100%;
        vertical-align: middle;
      }
    }
    i{
      display: block;
      width:0.7rem;
      height:0.7rem;
      float: left;
      margin-left:0.4rem;
      border-radius: 50%;
      background-size:cover !important;
      position: relative;
      img{
        width:30%;
        position: absolute;
        top:-0.08rem;
        left:-0.06rem;
        vertical-align: middle;
      }
      .k1{
        width:0.65rem;
        position: absolute;
        top:0.088rem;
        left:0.025rem;
      }
    }
    ul li:nth-of-type(1) i{
      border:0.02rem solid #ffcc00;
    }
    ul li:nth-of-type(2) i{
      border:0.02rem solid #6b99b3;
    }
    ul li:nth-of-type(3) i{
      border:0.02rem solid #ff7c3d;
    }

    ul li.guft i{
      border:0 none !important;
    }
    .livename{
      width:4.5rem;
      overflow: hidden;
      float: left;
      margin-left:0.23rem;
      p:first-child{
        font-size: 0.24rem;
        color:#2c2c2c;
        margin-top:0.05rem;
        img{
          width:0.23rem;
          vertical-align: middle;
        }
      }
      p:last-child{
         font-size: 0.2rem;
        color:#8d8d8d;
        em{
          display: inline !important;
          margin-top: 0;
          float: initial;
          color: #FF0000;
        }
      }
    }
    em{
      display: block;
      width:0.46rem;
      float: right;
      margin-top:0.1rem;
      img{
        width:100%;
      }
    }
  }
</style>
