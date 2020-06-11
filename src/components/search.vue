<template>
    <div class="search" >
        <header class="white">
            <div class="hd-s">
                <span  @click="searchInfo"><img src="../../static/img/search8.png"/></span>
                <input type="text" @keyup.enter="searchInfo" name="search" v-model="search" placeholder="请输入您想搜索的昵称或房间号"  value="" />
            </div>
            <em class="xc" @click="goRouter('/')">取消</em>
        </header>
        <div style="height:1.08rem;"></div>
        <div class="content" v-show="flag">
            <p>你可能喜欢</p>
            <div class="ul_tb">
                <ul id="live-list"  class="page-infinite-list"  >
                    <li  :style="styleObj(item.thumb)" v-for="(item,index) in livesite" @click="LinkRouter(item.uid)" >
                        <div class="fanavatar" >
                            <div class="h-info">
                                <span class="fans">{{item.user_nicename}}</span>
                                <span class="live-icon"><i class="iconp">&#xe729;</i>{{item.audience_num}}</span>
                            </div>
                            <!--<p class="p1" v-if="item.islive==1"><img src="../../static/img/m1.png" alt=""></p>-->
                            <div v-if="item.islive==0" class="video_status video_status_living">休息中</div>
                            <div v-if="item.islive==1" class="video_status video_status_living">直播中</div>
                            <div v-if="item.islive==2" class="video_status video_status_living">待播</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


        <!--<div class="content_list page-infinite-wrapper" v-show="!flag"  ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">-->
            <div class="content_list page-infinite-wrapper" v-show="!flag" >
            <div class="title_list">用户</div>
            <ul  class="page-infinite-list"  >
                <li v-for="(item,index) in liveuser" >
                  <span :style="styleObj(item.avatar)">
                    <!--<img :src="item.users_live.avatar_thumb" alt="">-->
                  </span>
                    <div>
                        <p>{{item.user_nicename}}</p>
                        <i>{{item.signature}}</i>
                    </div>
                    <i><img  @click="openConfirm(item.id)" v-if="item.is_attention==1" size="large" src="../../static/img/ruby1.png" alt=""><img  @click="giveattion(item.id)" v-if="item.is_attention==0" size="large" src="../../static/img/ruby2.png" alt=""></i>
                </li>
            </ul>
            <div class="title_more" v-if="liveuser.length>=5" @click="goRouter('/more_person')">更多用户&nbsp;>></div>
            <div class="title_list">直播</div>
            <ul  class="page-infinite-list zhibo" >
                <!--<ul  class="page-infinite-list zhibo" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50"  >-->
                <li v-for="(item,index) in live"  @click="LinkRouter(item.uid)" >
                  <span :style="styleObj(item.avatar)">
                    <!--<img :src="item.users_live.avatar_thumb" alt="">-->
                    <div v-if="item.islive==0" class="video_status video_status_living">休息中</div>
                    <div v-if="item.islive==1" class="video_status video_status_living">直播中</div>
                    <div v-if="item.islive==2" class="video_status video_status_living">待播</div>
                  </span>
                    <div>
                        <p>{{item.user_nicename}}</p>
                        <i>{{item.title}}</i>
                    </div>
                    <i class="lp">{{formatDateTime(item.starttime)}}</i>
                </li>
            </ul>
            <div class="title_more" v-if="live.length>=5" @click="goRouter('/more_live')">更多直播&nbsp;>></div>
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
        name: "search",
        data(){
            return{
                search:'',
                live:[],
                liveuser:[],
                flag:true,
                loading: false,
                allLoaded: false,
                wrapperHeight:0,
                page:1,
                len:10,
                forflag:'',
                livesite:[]
            }
        },
        mounted(){
            //this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            this.getshowlive()
        },
        methods:{
            openConfirm(o) {
                var _this=this;
                MessageBox.confirm('确定取消关注?', '海螺直播').then((value)=>{
                    if(value){
                        _this.closeFollow(o)
                    }
                })
            },
            giveattion(o){
                var _this=this;
                var json={touid:o};
                this.axios.post(api.give_attention,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        _this.$root.login(res.data.state)
                        _this.searchInfo()
                        // _this.live=res.data.content.show_list
                    })
            },
            closeFollow(o){
                var _this=this;
                var json={touid:o};
                this.axios.post(api.cancel_attention,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        _this.$root.login(res.data.state)
                        _this.searchInfo()
                        // _this.live=res.data.content.show_list
                    })
            },
            searchInfo(){
                var _this=this;
                this.flag=false;
                this.page=1;
                this.len=10;
                var json={key_word:this.search,page:this.page,length:this.len};
                this.axios.post(api.index_search_result,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.live=dat.content.show_live_list
                            _this.liveuser=dat.content.user_list
                        }else{
                            _this.showM(dat.msg)
                        }
                    })
            },
            getshowlive(){
                var _this=this;
                this.axios.get(api.index_search_default_show_live)
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.livesite=dat.content.default_show_live
                        }else{
                            _this.showM(dat.msg)
                        }
                    })
            },
            formatDateTime(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                //return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
                return m + '月' + d+'日'+h+':'+minute;
            },
            goRouter(o){
                this.$router.push({
                    path:o,
                    query:{
                        key:this.search
                    }
                })
            },
            LinkRouter(o){
                if(window.plus){
                    var z='/video'
                }else{
                    var z='/live'
                }
                this.$router.push({
                    path:z,
                    query:{
                        id:o
                    }
                })
            },
            styleObj(o){
                if(o==1){
                    return  'background:url("'+require("../../static/img/default.jpg")+'") center no-repeat;';
                }else{
                    return  'background:url("'+o+'") center no-repeat;';
                }
            },
           /* searchInfo2(){
                var _this=this;
                var json={page:this.page,length:this.len,key_word:this.search};
                this.axios.post(api.index_search_result,this.$qs.stringify(json))
                    .then(function(res){
                        _this.$root.login(res.data.state)
                        var dat=res.data
                        if(dat.state==0){
                            if(dat.content.show_live_list.length<=0){
                                _this.loading=true
                            }else{
                                _this.loading=false
                            }
                            _this.live=_this.live.concat(dat.content.show_live_list)
                        }else{
                           // _this.showM(dat.msg)
                        }
                        _this.allLoaded=false
                    })
            },*/
            showM:function(o){
                // this.$root.Hub.$emit('child',{msg:o,flag:true});
                Toast({
                    message:o,
                    iconClass: 'icon icon-success',
                    className:'backColor',
                    duration:1000
                });
            },
           /* loadMore() {
                this.loading = true;
                this.allLoaded=true
                var _this=this
                this.forflag=setTimeout(() => {
                    _this.page++
                    _this.searchInfo2()
                }, 1000);
            },*/
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
    @rem:0.01rem;
    header{
        width:750*@rem;
        height:108*@rem;
        overflow: hidden;
        position: fixed;
        background: #0096ff;
        top:0;
        z-index: 5;
        display: flex;
        text-align: center;
        .xc{
            display: block;
            width:1rem;
            height:0.54rem;
            line-height: 0.54rem;
            text-align: center;
            font-size: 0.34rem;
            color: #fff;
            margin-top:0.25rem;
        }
        .hd-s{
            display: block;
            width:500*@rem;
            height:68*@rem;
            margin-top:18*@rem;
            border-radius: 50*@rem;
            overflow: hidden;
            border: solid 1px #0096ff;
            background: #007eff;
            margin-left:0.5rem;
            margin-right:0.5rem;
            span{
                display: block;
                width:72*@rem;
                text-align: center;
                line-height:68*@rem;
                height:68*@rem;
                float: left;
                img{
                    width:30*@rem;
                    height:30*@rem;
                    vertical-align: middle;
                    margin-top:-7*@rem;
                    margin-left:15*@rem;
                }
            }
            input{
                font-size: 28*@rem;
                border: 0 none;
                display: block;
                width:400*@rem;
                box-sizing: border-box;
                padding-left:10*@rem;
                text-align: center;
                height:68*@rem;
                float: left;
                text-align: left;
                background: transparent;
                color: #fff !important;
            }
            ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                color:    #fff;
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color:    #fff;
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color:    #fff;
            }
            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color:    #fff;
            }
        }
    }
    .content{
        padding:0.2rem 0;
        background: #fff;
        box-shadow:0 0 0.4rem #c1e2ff ;
        margin-top:0.4rem;
        p{
            font-size: 0.3rem;
            color: #2c2c2c;
            padding-left: 0.1rem;
        }

    }
.ul_tb{
    width:100%;
    overflow-x: scroll;
}
    #live-list{
        box-sizing: border-box;
        overflow: hidden;
        margin-top:0.1%;
        width:16rem;
        li{
            width:3rem;
            height:3rem;
            float: left;
            margin-top:0.6%;
            position: relative;
            margin-left:0.1rem;
            background-size:cover !important;
            img{
                width:100%;
            }
            /*		.fanavatar{
                        width:100%;
                        height:4.2rem;
                        background-size:cover !important;
                    }*/
            .p1 {
                width:1.2rem;
                position: absolute;
                left:0;
                top:0;
                img{
                    width:100%;
                }
            }
            p{
                span{
                    display: block;
                    font-size: 0.28rem;
                    color: #2c2c2c;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                i{
                    display: block;
                    font-size: 0.24rem;
                    color: #8f8f8f;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
        }
      /*  li:nth-of-type(even){
            margin-left: 0.6%;
        }*/
        /*li:nth-of-type(even){
            margin-left:0.5%;
        }*/
    }
    .h-info{
        width: 100%;
        height:25px;
        line-height: 25px;
        position: absolute;
        left:0;
        bottom:0.1rem;
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

    .video_status.video_status_living{
        width: 60px;
    }
    .video_status{
        position: absolute;
        top: 2%;
        right: 2%;
        width: 1.1rem !important;
        height: 0.4rem;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.23rem;
        color: #fff;
    }

    .video_status{
        background: rgba(0, 0, 0, .45);
    }

    .content_list{
        .title_list{
            height:.7rem;
            padding-left: 0.2rem;
            background:#f2f2f2 ;
            line-height: 0.7rem;
            color: #2c2c2c;
            font-size: 0.3rem;
        }
        .title_more{
            height:.8rem;
            background:#fff ;
            line-height: 0.8rem;
            color: #2c2c2c;
            font-size: 0.3rem;
            text-align: center;
            border-bottom: 1px solid  #eee;
        }
        ul{
            li{
                overflow: hidden;
                height:1.3rem;
                line-height: 1.3rem;
                padding:0 0.2rem;
                border-bottom: 1px solid #f3f3f3;
                span{
                    width:1rem;
                    height:1rem;
                    border-radius: 50%;
                    overflow: hidden;
                    display: block;
                    float: left;
                    margin-top:0.15rem;
                    background-size:cover !important;
                    img{
                        width:100%;
                        vertical-align: middle;
                    }
                }
                div{
                    width:5.18rem;
                    margin-top:0.25rem;
                    float: left;
                    overflow: hidden;
                    padding-left: 0.32rem;
                    line-height: 0.43rem;
                    p{
                        font-size: 0.34rem;
                        color: #2c2c2c;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    i{
                        width:100%;
                        font-size: 0.26rem;
                        color: #b8b8b8;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
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
        .zhibo{
            li{
                padding-bottom: 0.2rem;
                padding-top: 0.1rem;
            }

            div{
                width:3rem;
                margin-top:0.15rem;
                p{
                    height:0.75rem;
                    font-size: 0.32rem;
                    line-height: 0.37rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                i{
                    font-size: 0.26rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }


            }
            i.lp{
                width:2rem;
                font-size: 0.28rem;
                color: #aaa;
                text-align: right;
                line-height: 2.2rem;
                text-overflow: initial;
                white-space: initial;
            }
            span{
                width:1.7rem;
                height:1.1rem;
                border-radius: 0.15rem;
                position: relative;
            }

        }
    }

    .video_status{
        position: absolute;
        margin-top:0.08rem !important;
        right: 5%;
        width: 0.7rem !important;
        height: 0.25rem;
        border-radius: 0.2rem !important;
        text-align: center;
        line-height: 0.25rem !important;
        font-size: 0.14rem !important;
        color: #fff;
        padding-left: 0 !important;
    }

    .video_status{
        background: rgba(0, 0, 0, .45);
    }
</style>