<template>
    <div class="daoju">
         <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/daoju')" alt=""><i>我的座驾</i>
           <em  @click="LinkRouter('/?i=4')">续费</em>
      </header>
      <div class="line"></div>
     <div class="noble">
        <span>我的坐骑</span>
        <span>共{{my_car.length}}个</span>
      </div>
      <ul>
        <li v-for="(item,index) in my_car">
          <div class="i">
            <img :src="item.car.thumb"></img>
          </div>
          <div class="t">
            <p>坐骑名称：<em>{{item.car.name}}</em></p>
            <p>购买日期：<em>{{item.addtime}}</em></p>
            <p>有效期：<em>剩余{{item.remain_day}}天</em></p>
          </div>
          <span v-if="item.status==0" @click="setcar(item.id)">装备</span>
          <span v-if="item.status==1" style="background: #ff9000">已装备</span>
        </li>
      </ul>
    </div>
</template>

<script>
   import store from '@/store/store'
   import api from '@/constant/api'
   import { Toast } from 'mint-ui'
    export default {
        name: "setting",
        data(){
          return{
            my_car:[]
          }
        },
        mounted(){
          this.getcar()
        },
        methods:{
           LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          loginOut(){
              var _this=this;
              this.axios.get(api.loginout)
                .then(function(res){
                  var dat=res.data
                  if(dat.state==0){
                    _this.LinkRouter('/login_pwd')
                  }else{
                    _this.showM(dat.msg)
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
           getcar(){
            var _this=this;
            this.axios.post(api.mall_my_car)
            .then(function(res){
              if(res.data.state==0){
                  _this.my_car=res.data.content
                }
              })
          },
          setcar(o){
              var _this=this;
              var json={user_car_id:o};
              this.axios.post(api.mall_use_car,this.$qs.stringify(json))
              .then(function(res){
                var dat=res.data
                if(dat.state==0){
                  _this.getcar()
                }else{
                  _this.showM(dat.msg)
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
        }
    }
</script>

<style scoped lang="less">
       .daoju{
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
          margin-left:2.5rem;
        }
        em{
          font-size: 0.28rem;
          float: right;
          text-decoration: underline;
        }
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  }
  .noble{
  height:0.86rem;
  line-height: 0.86rem;
  padding:0 0.2rem;
  font-size: 0.24rem;
  span:first-child{
    float: left;
    color: #2c2c2c;
  }
   span:last-child{
    float: right;
    color: #8d8d8d;
  }
}
ul{
  li{
    overflow: hidden;
    box-sizing: border-box;
    margin:0 0.1rem;
    box-shadow:0 0 0.2rem #ccc;
    margin-bottom: 0.1rem;
    .i{
      width:2.5rem;
      float: left;
      img{
        width: 100%;
      }

    }
    .t{
      width:3rem;
      float: left;
      font-size: 0.24rem;
      margin-top:0.5rem;
      padding-left: 0.3rem;
      p{
        color: #2c2c2c;
        line-height: 0.45rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        em{
          color: #8d8d8d;
          margin-left:0.1rem;
        }
      }
    }
    span{
      display: block;
      width:1.2rem;
      height:0.36rem;
      float: left;
      line-height: 0.36rem;
      text-align: center;
      color: #fff;
      font-size:0.24rem ;
      background: #b846ff;
      border-radius: 0.1rem;
      margin-top:2rem;
    }
  }
}
</style>
