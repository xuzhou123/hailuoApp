<template>
    <div class="ListInfo">
        <div class="listcont">
            <div class="title" :style="styleobj1()">
                <span v-for="(item,index) in names" :class="{active:actflag==index}"  @click="kutry(index)">{{item.name}}</span>
                <em><img src="../../static/img/mvp.png" alt=""> <i>第{{sort}}名</i></em>
            </div>
            <ul>
                <li v-for="(item,index) in content" >
                    <em v-if="index<3"><img :src="stylekpo(index)" alt=""></em>
                    <em v-if="index>2">{{index+1}}</em>
                    <i style="margin-left:0"  :style="styleobj(item.send_gift_user.avatar)">
                    </i>
                    <div class="livename">
                        <p >{{item.send_gift_user.user_nicename.length<5?item.send_gift_user.user_nicename:(item.send_gift_user.user_nicename.substring(0,4)+"...")}}
                            <img class="km1"   :src="npng(item.send_gift_user.level)" alt="">
                            <img class="km2"  :src="npng1(item.send_gift_user.anchor_level)" alt="">
                        </p>
                    </div>
                    <div class="person_java">{{item.total_coin}}</div>
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
                actflag:0,
                videoUrl:'',
                show_contribution:'',//本场
                week_contribution:'',//本周
                month_contribution:'',//本月
                all_contribution:'',//总榜
                content:[],
                sort:0,
                names:[
                    {name:'本场'},
                    {name:'本周'},
                    {name:'本月'},
                    {name:'总榜'},
                ]
            }
        },
        mounted(){
            this.videoUrl=this.$route.query.id
            this.getlist()
        },
        methods:{
            stylekpo(o){
                ++o;
                return require('../../static/img/no'+o+'.png')
            },
            npng(o){
                return require('../../static/img/'+o+'.png')
            },
            npng1(o){
                return require('../../static/img/op'+o+'.png')
            },
            kutry(o){
                this.actflag=o
                if(o==0){
                    this.content=this.show_contribution.data
                    this.sort=this.show_contribution.sort
                }else if(o==1){
                    this.content=this.week_contribution.data
                    this.sort=this.week_contribution.sort
                }else if(o==2){
                    this.content=this.month_contribution.data
                    this.sort=this.month_contribution.sort
                }else if(o==3){
                    this.content=this.all_contribution.data
                    this.sort=this.all_contribution.sort
                }
            },
            styleobj1(){
                var str=require('../../static/img/webk.png');
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
                this.$root.Hub.$emit('list_mod')
            },
            getlist(){
                var _this=this;
                var json={anchor_id:this.videoUrl};
                this.axios.post(api.live_show_contribution_billboard,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.show_contribution=dat.content.show_contribution
                            _this.week_contribution=dat.content.week_contribution
                            _this.month_contribution=dat.content.month_contribution
                            _this.all_contribution=dat.content.all_contribution
                            _this.content=dat.content.show_contribution.data
                            _this.sort=dat.content.show_contribution.sort
                        }
                    })
            },
        }
    }
</script>

<style scoped lang="less">
    .title{
        width:80%;
        padding:0 10%;
        height:0.9rem;
        background-size: cover !important;
        text-align: center;
        display:flex;
        position: relative;
        span{
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
            width:0.3rem;
            height:0.05rem;
            background: #FFF;
            position: absolute;
            left:0.55rem;
            bottom:0.03rem;
        }
        em{
            display: block;
            width:1rem;
            position: absolute;
            right:0;
            top:0.3rem;
            img{
                width:100%;
            }
            i{
                position: absolute;
                font-size: 0.2rem;
                color:#fff;
                top:0.025rem;
                right:0.1rem;
            }
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
        padding:0 0.2rem;
        height:6.88rem;
        overflow-y: scroll;
        background: #fff;
        li{
            border-bottom: 1px solid #eee;
            height:1.28rem;
            line-height: 1.28rem;
            overflow: hidden;
            em{
                display: inline-block;
                width:0.5rem;
                float: left;
                margin-right: 0.2rem;
                font-size: 0.3rem;
                color: #00aeff;
                img{
                    margin-top:0.5rem;
                }
            }
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
                width:3.5rem;
                padding-left:0.2rem;
                height:1.28rem;
                line-height: 1.28rem;
                float: left;
                font-size: 0.3rem;
                color: #2c2c2c;
                overflow: hidden;
                p{
                    img{
                        width:25%;
                        vertical-align: middle;
                    }
                    .km2{
                        width:20%;
                        margin-left:0.1rem;
                    }
                }
            }
            .person_java{
                width:1.5rem;
                float: right;
                text-align: right;
                color: #666;
                font-size: 0.28rem;
                padding-left: 0;
            }
        }
    }

</style>
