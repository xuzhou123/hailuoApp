<template>
    <div class="Qrcode">
        <!--二维码-->
        <header  >
            <i @click="goHistroy('/?i=2')"><img src="../../static/img/leftx.png" alt="" /></i>邀请好友
        </header>
        <section>
            <!--<p>个人推荐码</p>-->
            <p></p>
            <div class="qd">
                <div id="qrcode" ref="qrcode" ></div>
            </div>
            <span>长按保存二维码</span>
            <i>我的推荐码：<em>{{qrCode}}</em></i>
        </section>
    </div>
</template>

<script>
    import api from '@/constant/api'
    import * as types from '@/store/types'
    import qs from 'qs'
    import store from '@/store/store'
    import QRCode from 'qrcodejs2'
    export default{
        data(){
            return{
                qrCode:'123456'
            }
        },
        mounted(){
            this.$nextTick(function () {
                this.qrCode=this.$route.query.code
                this.qrcode()
            })
        },
        methods:{
            goHistroy(o){
                this.$router.push({
                    path:o
                })
            },
            qrcode () {
                var host = window.location.host;
                var kcp='http://'+host+'/h5/hhhhhhhh/#/resg?person='+this.qrCode
                let qrcode = new QRCode('qrcode', {
                    width:100,  // 设置宽度
                    height:100, // 设置高度
                    text: kcp
                })
            },
        },
        components:{
            QRCode
        }
    }
</script>

<style lang="less" scoped="scoped">

    @rem:0.01rem;
    header{
        width:100%;
        height:108*@rem;
        font-size: 38*@rem;
        line-height: 108*@rem;
        text-align: center;
        color:#2c2c2c;
        position: relative;
        border-bottom: 0.2rem solid #eee;
        i{
            width:30*@rem;
            position: absolute;
            top:25*@rem;
            left:15*@rem;
        }
    }
    section{
        text-align: center;
        p{
            font-size:0.36rem;
            font-weight: bold;
            color:#1e1e1e;
            margin-top: 0.9rem;
        }
        .qd{
            width:4.55rem;
            height:4.55rem;
            margin: 0 auto;
            border:0.02rem solid #bfbfbf;
            margin-top: 0.62rem;
        }
        span{
            font-size:0.3rem;
            color:#646464;
            display: block;
            margin-top: 0.3rem;
        }
        i{
            display: block;
            font-size:0.36rem !important;
            color:#1e1e1e;
            margin-top: 1.06rem;
            em{
                color:#e62b1d;
            }
        }
    }

    #qrcode{
        width:4.04rem;
        height:4.03rem;
        margin:0 auto;
        margin-top:0.26rem;
        /deep/ canvas{
            width:100% !important;
        }
       /deep/ img{
            width:100% !important;
        }
    }

    footer{
        overflow: hidden;
        position: fixed;
        bottom: 0;
        span{
            display: block;
            box-sizing: border-box;
            width:(750/2)*@rem;
            height:0.86rem;
            line-height: 0.86rem;
            text-align: center;
            border-top:0.02rem solid #ccc;
            border-right:0.02rem solid #ccc;
            font-size: 0.36rem;
            color: #333333;
            background: #fff;
            float: left;
            font-weight: bold;
        }
        span:last-child{
            border-right:0 none;
        }
    }
</style>
