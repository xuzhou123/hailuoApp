<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"  @click="LinkRouter('/?i=2')" alt=""><i>我的认证</i>
      </header>
      <div class="line"></div>
      <ul>
         <li>
          <span>真实姓名</span>
         <input type="text" disabled  :placeholder="sessInfo.real_name">
        </li>
         <li>
          <span>手机号码</span>
         <input type="text"  disabled :placeholder="sessInfo.mobile">
        </li>
         <li>
          <span>银行卡号</span>
         <input type="text" disabled :placeholder="sessInfo.card_no">
        </li>
        <li>
          <span>开户银行</span>
         <input type="text" disabled  :placeholder="sessInfo.bank_name">
        </li>
        <li>
          <span>支行名称</span>
         <input type="text" disabled  :placeholder="sessInfo.sub_branch">
        </li>
        <li>
          <span>证件类型</span>
         <input type="text" disabled  :placeholder="sessInfo.cer_type">
        </li>
        <li style="border-bottom: 0">
          <span>证件号</span>
         <input type="text" disabled :placeholder="sessInfo.cer_no">
        </li>
         <li class="update">
           <div style="clear: both"></div>
           <ol>
             <li >
               <img ref="zm" :src="sessInfo.front_view" alt="">
               <span>证件正面</span>
             </li>
              <li  >
               <img  ref="fm" :src="sessInfo.back_view" alt="">
               <span>证件反面</span>
             </li>
              <li  >
               <img  ref="sc" :src="sessInfo.handset_view" alt="">
               <span>手持证件照正面</span>
             </li>
           </ol>
        </li>
      </ul>
      <div class="recote" @click="LinkRouter('/certing')">重新认证</div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import api from '@/constant/api'
    export default {
        name: "setting",
        data(){
          return{
            sessInfo:[]

          }
        },
        mounted(){
          this.getCerting()
        },
        methods:{
         LinkRouter(o){
          this.$router.push({
            path:o
            })
          },
          getCerting(){
             var _this=this;
              this.axios.get(api.my_authentication)
              .then(function(res){
                _this.$root.login(res.data.state)
                var dat=res.data
                if(dat.state==0){
                  _this.sessInfo=dat.content
                }
            })
          },
        }
    }
</script>

<style scoped lang="less">
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
    overflow: hidden;
    padding-bottom: 1rem;
    li{
      border-bottom: 1px solid #f3f3f3;
      padding:0.2rem 0.2rem;
      overflow: hidden;
      height:0.5rem;
      line-height: 0.5rem;
      input{
        width:5rem;
        text-align:right;
         float: right;
         font-size: 0.34rem;
        border:0 none;
        margin-top:0.06rem;
        background: #fff;
      }
      input::-webkit-input-placeholder {
          /* placeholder颜色  */
         color: #b8b8b8;
     }
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
          margin-top:-0.15rem;
        }
      }
    }
    li.update{
      border-bottom: 0;
      overflow: visible;
      img{
        width:2.91rem;
        float: right;
        vertical-align: middle;
        margin-top:0.05rem;
      }
       ol{
        overflow: hidden;
        li{
          width:2.1rem;
          padding:0;
          float: left;
          height:auto;
          margin-left:0.35rem;
          text-align: center;
          img{
            width:100%;

          }
          span{
            font-size: 0.28rem;
            color: #b8b8b8;
            display: block;
            height:1rem;
            line-height: 1rem;
            text-align: center;
            width:100%;
          }
        }
        li:first-child{
          margin-left:0;
        }
      }
    }

  }
  button{
    width:3.7rem;
    height:0.8rem;
    outline: none;
    border:0 none;
    font-size:0.34rem ;
    color: #fff;
    border-radius: 0.5rem;
    position: fixed;
    left:1.8rem;
    bottom:1.5rem;
    background: -webkit-linear-gradient(left, #53acff , #b846ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #53acff, #b846ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #53acff, #b846ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #53acff , #b846ff); /* 标准的语法 */
  }
  .copy{
    width:100%;
    text-align: center;
    height:1rem;
    line-height: 1rem;
    font-size: 0.24rem;
    color:#2c2c2c;
      position: fixed;
    bottom:0.6rem;
    i{
      color:#53acff;
    }
  }
  .recote{
    padding:0 0.2rem;
    overflow: hidden;
    text-align: right;
    text-decoration: underline;
    color:#2c2c2c;
    font-size: 0.24rem;
  }
</style>
