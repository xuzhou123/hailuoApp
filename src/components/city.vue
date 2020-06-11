<template>
    <div class="page-indexlist">
       <h1 class="page-title" >选择城市
         <img  @click="selectInfo()" src="../../static/img/letop.png" alt="">
       
       </h1>
      <div class="page-indexlist-wrapper">
        <mt-index-list>
        <mt-index-section v-for="(letter,index) in citySortArr" :key="index" :index="letter">
            <mt-cell @click.native="selectcity(cityName.value)"  v-for="(cityName,index) in cityArr" :key="index" v-if="cityName.key == letter" :title="cityName.value "></mt-cell>
        </mt-index-section>
    </mt-index-list>
    </div>
    </div>
</template>

<script>
  import city from "../../static/js/city"//导入所有城市的JSON
  import { makePy } from "../../static/js/pinying"//导入插件获取所有城市中文的大写首字母
    export default {
        name: "city",
          data () {
          return {
              arr: [],//存放初始筛选的城市名称
              cityArr: [],//存放第二次筛选后所有城市名称
              citySort: [],//存放初始获取城市首字母大写的数组
              citySortArr: [],//存放第二次筛选重复，不存在的城市首字母数组
            };
          },
          mounted(){
            //console.log(this.citySort)
          },
         beforeDestroy () {
          //this.$root.Hub.$off('ress')
        },
          methods:{
             selectcity(o){
                localStorage.setItem('city',o)
                this.goRouter('/?i=0&now=2')
             },
             selectInfo(){
               this.goRouter(`/?i=0&now=2`)
             },
             goRouter(o){
                this.$router.push({
                  path:o
                })
             },
          },
          created () {

          /**
           * 将json数据中的无用数据剔除
           */

         /* for (let i in city) {
            if (city[i].name != "请选择") {//将第一层数据中为 “请选择” 的剔除掉
              //this.arr.push(city[i].name);
              for (let j in city[i].sub) {//将第二层数据中为 “请选择 和 其他” 的剔除掉
                if (
                  city[i].sub[j].name != "请选择" &&
                  city[i].sub[j].name != "其他"
                ) {
                  this.arr.push(city[i].sub[j].name);//将处理后的数据存放在数组中，等待第二次筛选处理
                }
              }
            }
          }*/
          for(let i in city.city){
              this.arr=this.arr.concat(city.city[i].lists)
          }

          /**
           * 配置相关数据
           */
          for (let k in this.arr) {
            let cityKey = makePy(this.arr[k])[0].substring(0, 1);//获取每一个市区的首字母
            let cityValue = this.arr[k];//获取所有市区
            this.citySort[cityKey] = cityKey;//利用对象特性，剔除重复的字母，并将剔除后的字母存进对象中

            //将所有市区信息 以（ 字母 - 市区名 ）的格式存在至数组中
            this.cityArr[k] = {
              key: cityKey,
              value: cityValue
            };
          }

          /**
           * 将处理后的首字母数据对象，存放至数组中
           */
          for (let p in this.citySort) {
              this.citySortArr.push(this.citySort[p]);
          }

          /**
           * 将真实存在的市区首字母按A-Z进行排序
           */
          this.citySortArr = this.citySortArr.sort();

        }
    }
</script>

<style scoped lang="less">
.mint-cell-title {
    flex: 0 0 auto;
}

.mint-indexsection-index {
    text-align: left;
}
.page-title{
  font-size: 0.38rem;
  font-weight: normal;
  text-align: center;
  height:0.9rem;
  line-height:0.9rem;
  color: #fff;
  background: #00d2ff;
  position: relative;
  img{
    width:0.4rem;
    position: absolute;
    top:0.25rem;
    left:0.2rem;
  }
}
</style>
