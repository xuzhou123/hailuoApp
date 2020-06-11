<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"   @click="LinkRouter('/?i=2')" alt=""><i>我的认证</i>
      </header>
      <div class="line"></div>
      <div class="example">
        <p><img src="../../static/img/succ.png" alt=""></p>
        <span>提交成功</span>
        <i>认证信息已经提交，请等待审核结果！</i>
      </div>

      <button @click="LinkRouter('/?i=0')">确认</button>
    </div>
</template>

<script>
    export default {
        name: "setting",
        data(){
          return{
          }
        },
        methods:{
           LinkRouter(o){
            this.$router.push({
              path:o
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
.example{
  margin-top:1.5rem;
  p{
    text-align: center;
    img{
      width:1.3rem;
    }
  }
  span{
    font-size: 0.34rem;
    color: #2c2c2c;
    display: block;
    text-align: center;
    margin-top:0.4rem;
    font-weight: bold;
  }
  i{
    font-size: 0.26rem;
    color: #b8b8b8;
    display: block;
    text-align: center;
    margin-top:0.05rem;
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
    margin-top:5rem;
    margin-left:1.8rem;
    background: -webkit-linear-gradient(left, #53acff , #b846ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #53acff, #b846ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #53acff, #b846ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #53acff , #b846ff); /* 标准的语法 */
  }
</style>
