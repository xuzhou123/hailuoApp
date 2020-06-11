<template>
    <div class="daoju">
         <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/?i=2')" alt=""><i>我的道具</i>
      </header>
      <div class="line"></div>
       <ul>
        <li  v-if="user_car.length!=0" @click="LinkRouter('/mycar')">
          <span>我的座驾</span>
           <em><img src="../../static/img/right.png" alt=""></em>
          <div>
            <p>当前座驾：{{user_car.car.name}}</p>
            <p>有效期：剩余{{user_car.remain_day}}天</p>
          </div>
        </li>

          <li  v-if="user_car.length==0" >
          <span>我的座驾</span>
           <em><img src="../../static/img/right.png" alt=""></em>
          <div>
            <p>当前座驾：无</p>
            <p>请在商城购买后查看</p>
          </div>
        </li>

         <li v-if="user_noble.length!=0"  @click="LinkRouter('/mynoble')">
          <span>我的贵族</span>
           <em><img src="../../static/img/right.png" alt=""></em>
          <div>
            <p>{{user_noble.noble.name}}</p>
            <p>有效期：剩余{{user_noble.remain_day}}天</p>
          </div>
        </li>

        <li v-if="user_noble.length==0">
          <span>我的贵族</span>
           <em><img src="../../static/img/right.png" alt=""></em>
          <div>
            <p>无</p>
            <p>请在商城购买后查看</p>
          </div>
        </li>

           <li v-if="user_liang.length!=0"  @click="LinkRouter(`/myliang?name=${user_liang.name}&day=${user_liang.remain_day}`)">
               <span>我的靓号</span>
               <em><img src="../../static/img/right.png" alt=""></em>
               <div>
                   <p>靓号：{{user_liang.name}}</p>
                   <p>有效期：剩余{{user_liang.remain_day}}天</p>
               </div>
           </li>

           <li v-if="user_liang.length==0">
               <span>我的靓号</span>
               <em><img src="../../static/img/right.png" alt=""></em>
               <div>
                   <p>无</p>
                   <p>请在商城购买后查看</p>
               </div>
           </li>
      </ul>
    </div>
</template>

<script>
   import store from '@/store/store'
  import api from '@/constant/api'
    export default {
        name: "setting",
        data(){
          return{
            user_car:{
              car:{

              }
            },//坐骑
            user_noble:{
              noble:{}
            },//贵族
          user_liang:{
          },
          }
        },
        mounted(){

        },
        created(){
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
            this.axios.post(api.mall_my_prop)
            .then(function(res){
              _this.$root.login(res.data.state)
              if(res.data.state==0){
                  _this.user_car=res.data.content.user_car
                  _this.user_noble=res.data.content.user_noble
                  _this.user_liang=res.data.content.user_liang
                }
              })
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
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  }
  ul{
    li{
      border-bottom: 1px solid #f3f3f3;
      padding:0.2rem 0.2rem;
      overflow: hidden;
      height:0.7rem;
      line-height: 0.7rem;
      span{
        font-size: 0.34rem;
        color: #2c2c2c;
        float: left;
      }
      i{
        display: inline-block;
        float: right;
         font-size: 0.34rem;
        color: #b8b8b8;
        img{
          width:100%;
           vertical-align: middle;
        }
      }
       em{
         float: right;
        display: inline-block;
        width:0.23rem;
         margin-left:0.2rem;
        img{
          width:100%;
           vertical-align: middle;
          margin-top:-0.12rem;
        }
      }
      div{
        width:4rem;
        float: right;
        font-size: 0.24rem;
        color: #8d8d8d;
        text-align: right;
        p{
          line-height: 0.4rem;
        }
      }
    }
  }
  .button{
    width:3.7rem;
    height:0.8rem;
    outline: none;
    border:0 none;
    font-size:0.34rem ;
    color: #fff;
    margin:0 auto;
    margin-top:2rem;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.5rem;
    background: -webkit-linear-gradient(left, #53acff , #b846ff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #53acff, #b846ff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #53acff, #b846ff); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #53acff , #b846ff); /* 标准的语法 */
  }
</style>
