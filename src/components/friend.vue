<template>
    <div class="c_friend">
          <div class="m_friend" v-if="show"  @click="show=false"></div>
         <div class="friend" v-if="show">
			<p>欢迎来到海螺直播</p>
			<input type="text" placeholder="请输入邀请码" v-model="code"/>
			<div class="info">
				<span @click="linkRouter()"></span>
				<span @click="askInfo()"></span>
			</div>
         </div>
    </div>
</template>

<script>
	import api from '@/constant/api'
	import { Toast,MessageBox } from 'mint-ui'
    export default {
        name: "friend",
        data(){
        	return{
        		show:false,
        		code:''
        	}
        },
        mounted(){
        	//alert(555);
        },
        methods:{
        	askInfo(){
        		if(this.code==""||this.code==null){
        			this.showM('请输入正确的邀请码!');
        			return '';
        		}
        		var _this=this;
                var json={code:this.code};
                this.axios.post(api.index_check_code,this.$qs.stringify(json))
                    .then(function(res){
                        var dat=res.data
                        if(res.data.state==0){
                        	localStorage.setItem("codey",_this.code)
                           _this.show=false;
                        }else{
                        	_this.showM(dat.msg);
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
        	linkRouter(){
        		this.$router.push({
		              path:'/login_pwd'
	             })
        	}
        },
        created(){
        	var _this=this;
        	this.$root.Hub.$on('friend',function(){
        		_this.show=true;
        	})
        	
        }
    }
</script>

<style scoped lang="less">
.m_friend{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	left:0;
	background: rgba(0,0,0,0.5);
	z-index:999;
}
.friend{
	width:5.1rem;
	height:4rem;
	position: fixed;
	top:50%;
	left:50%;
	margin-top: -2rem;
	margin-left: -2.55rem;
	background: url('../../static/img/friend.png') no-repeat center;
	background-size: cover;
	z-index:1000;
	p{
		font-size: 0.38rem;
		color: #ffffff;
		height:1.5rem;
		line-height: 1.5rem;
		text-align: center;
	}
	input{
		border: 0;
		background: transparent;
		width:2.48rem;
		margin:0 auto;
		display: block;
		height:0.7rem;
		line-height: 0.7rem;
		border-bottom: 1px solid #fff;
		color: #fff;
		text-align: center;
	}
	input::-webkit-input-placeholder {
          /* placeholder颜色  */
         color: #fff;
         /* placeholder字体大小  */
         font-size: 0.3rem;
        /* placeholder位置  */
         text-align: center;
     }
	span:first-child{
		display: block;
		width:2.2rem;
		height:0.6rem;
		float: left;
		background: url('../../static/img/r1.png') no-repeat center;
		background-size: cover;
	}
	span:last-child{
		display: block;
		width:2.9rem;
		height:0.6rem;
		float: left;
		background: url('../../static/img/r2.png') no-repeat center;
		background-size: cover;
	}
	.info{
		position: absolute;
		bottom:0;
	}
}
</style>
