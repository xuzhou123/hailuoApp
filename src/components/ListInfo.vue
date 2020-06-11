<template>
    <div class="ListInfo">
        <div class="listcont">
            <div class="title" :style="styleobj1()">
                <span :class="{active:actflag}"  @click="kutry(true)">贵族席位</span>
                <span :class="{active:!actflag}" @click="kutry(false)">在线用户</span>
            </div>
            <ul>
                <li v-for="(item,index) in content" >
                    <i style="margin-left:0"  :style="styleobj(item.avatar)">
                    </i>
                    <div class="livename">
                        <p >{{item.user_nicename}}
                            <img class="km1"   :src="npng(item.level)" alt="">
                            <img class="km2"  :src="npng1(item.level_anchor)" alt="">
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="listmodel" @click="listmuth()"></div>
    </div>
</template>

<script>
    import api from '@/constant/api'
    export default {
        name: "ListInfo",
        data(){
            return{
                actflag:true,
                videoUrl:'',
                noble_list:'',//在线贵族
                audience_list:'',//在线用户
                content:[],
            }
        },
        mounted(){
            this.videoUrl=this.$route.query.id
            this.getlist()
        },
        methods:{
            npng(o){
                return require('../../static/img/'+o+'.png')
            },
            npng1(o){
                return require('../../static/img/op'+o+'.png')
            },
            kutry(o){
                this.actflag=o
                if(o){
                    this.content=this.noble_list
                }else{
                    this.content=this.audience_list
                }
            },
            styleobj1(){
                     var str=require('../../static/img/webc.png');
                     return `background:url(${str})`;
            },
            styleobj(o){
                if(o==null||o==''){
                    //return 'background:url("'+o.user.avatar+'")'
                    return 'background:url("../../static/img/default.jpg")'
                }else{
                    return `background:url(${o})`;
                }

            },
            listmuth(){
                this.$root.Hub.$emit('listinfo')
            },
            getlist(){
                var _this=this;
                var json={anchor_id:this.videoUrl};
                this.axios.post(api.live_online_user_billboard,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            // _this.LinkRouter(dat.content.hls);
                            //_this.content=dat.content
                            _this.noble_list=dat.content.noble_list
                            _this.audience_list=dat.content.audience_list
                            _this.content=dat.content.noble_list
                        }
                    })
            },
        }
    }
</script>

<style scoped lang="less">
    .title{
        width:100%;
        height:0.9rem;
        background-size: cover !important;
        text-align: center;
        span{
            display: inline-block;
            width:2.5rem;
            color: #fff;
            height:0.9rem;
            line-height: 0.9rem;
            font-size: 0.34rem;
            position: relative;
        }
        span.active:after{
            display: inline-block;
            content: '';
            width:0.5rem;
            height:0.05rem;
            background: #FFF;
            position: absolute;
            left:0.9rem;
            bottom:0.05rem;
        }
    }
    .listmodel{
        width:7.5rem;
        height:100%;
        position: fixed;
        top:0;
        background: rgba(0,0,0,0.5);
        z-index: 260;
    }
    .listcont{
        width:7.18rem;
        height:7.78rem;
        position: absolute;
        bottom:0.16rem;
        left:0.16rem;
        /*background: #fff;*/
        z-index: 261;
        border-radius: 0.1rem;
    }
    ul{
        padding-left:0.6rem;
        height:6.88rem;
        overflow-y: scroll;
        background: #fff;
        li{
            border-bottom: 1px solid #eee;
            height:1.28rem;
            line-height: 1.28rem;
            i{
                display: inline-block;
                width:0.8rem;
                height:0.8rem;
                border-radius: 50%;
                background-size: cover !important;
                float: left;
                margin-top:0.25rem;

            }
            div{
                width:5.3rem;
                padding-left:0.2rem;
                height:1.28rem;
                line-height: 1.28rem;
                float: left;
                font-size: 0.34rem;
                color: #2c2c2c;
                p{
                    img{
                        width:20%;
                        vertical-align: middle;
                    }
                    .km2{
                        width:15%;
                        margin-left:0.1rem;
                    }
                }
            }
        }
    }

</style>
