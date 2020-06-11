import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import show from '@/components/show'
import login from '@/components/login'
import login_pwd from '@/components/login_pwd'
import resg from '@/components/resg'
import want_pwd from '@/components/want_pwd'
import setting from '@/components/setting'
import certing from '@/components/certing'
import mycerting from '@/components/mycerting'
import pay from '@/components/pay'
import myfollow from '@/components/myfollow'
import systemset from '@/components/systemset'
import modify from '@/components/modify'
import examine from '@/components/examine'
import examine_succ from '@/components/examine_succ'
import mycerting_result from '@/components/mycerting_result'
import Records from '@/components/Records'
import payRecords from '@/components/payRecords'
import mysystemset from '@/components/mysystemset'
import Reward from '@/components/Reward'
import forward from '@/components/forward'
import live from '@/components/live'
import alive from '@/components/alive'
import city from '@/components/city'
import smallvideo from '@/components/smallvideo'
import follow from '@/components/follow'
import daoju from '@/components/daoju'
import mynoble from '@/components/mynoble'
import mycar from '@/components/mycar'
import videoy from '@/components/videoy'
import numbuy from '@/components/numbuy'
import Leaderboard from '@/components/Leaderboard'
import Leaderstatr from '@/components/Leaderstatr'
import live_video from '@/components/live_video'
import myliang from '@/components/myliang'
import search from '@/components/search'
import more_person from '@/components/more_person'
import pusherVideo from '@/components/pusherVideo'
import more_live from '@/components/more_live'
import openVideo from '@/components/openVideo'
import imgcode from '@/components/imgcode'
import openVideo2 from '@/components/openVideo2'
import aliyunpush from '@/components/aliyunpush'
import live_player from '@/components/live_player'
import platform_Introduction from '@/components/platform-Introduction'
import store from '@/store/store'//vuex数据管理
import * as types from '@/store/types'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
    	path:'/show',
    	name:'show',
    	component:show
    },
     {
    	path:'/login',
    	name:'login',
    	component:login
    },
     {
    	path:'/login_pwd',
    	name:'login_pwd',
    	component:login_pwd
    },
     {
    	path:'/resg',
    	name:'resg',
    	component:resg
    },
     {
    	path:'/want_pwd',
    	name:'want_pwd',
    	component:want_pwd
    },
     {
    	path:'/setting',
    	name:'setting',
    	component:setting
    },
   {
    	path:'/certing',
    	name:'certing',
    	component:certing
    },
    {
    	path:'/mycerting',
    	name:'mycerting',
    	component:mycerting
    },
     {
    	path:'/pay',
    	name:'pay',
    	component:pay
    },
     {
    	path:'/myfollow',
    	name:'myfollow',
    	component:myfollow
    },
    {
    	path:'/platform_Introduction',
    	name:'platform_Introduction',
    	component:platform_Introduction
    },
    {
    	path:'/systemset',
    	name:'systemset',
    	component:systemset
    },
    {
    	path:'/modify',
    	name:'modify',
    	component:modify
    },
     {
    	path:'/examine',
    	name:'examine',
    	component:examine
    },
    {
    	path:'/examine_succ',
    	name:'examine_succ',
    	component:examine_succ
    },
    {
    	path:'/mycerting_result',
    	name:'mycerting_result',
    	component:mycerting_result
    },
    {
    	path:'/Records',
    	name:'Records',
    	component:Records
    },
    {
    	path:'/payRecords',
    	name:'payRecords',
    	component:payRecords
    },
    {
    	path:'/mysystemset',
    	name:'mysystemset',
    	component:mysystemset
    },
    {
    	path:'/Reward',
    	name:'Reward',
    	component:Reward
    },
    {
    	path:'/forward',
    	name:'forward',
    	component:forward
    },
    {
    	path:'/live',
    	name:'live',
    	component:live
    },
    {
    	path:'/alive',
    	name:'alive',
    	component:alive
    },
     {
    	path:'/city',
    	name:'city',
    	component:city
    },
     {
    	path:'/smallvideo',
    	name:'smallvideo',
    	component:smallvideo
    },
    {
    	path:'/follow',
    	name:'follow',
    	component:follow
    },
    {
    	path:'/daoju',
    	name:'daoju',
    	component:daoju
    },
     {
    	path:'/mynoble',
    	name:'mynoble',
    	component:mynoble
    },
     {
    	path:'/mycar',
    	name:'mycar',
    	component:mycar
    },
    {
    	path:'/videoy',
    	name:'videoy',
    	component:videoy
    },
     {
    	path:'/numbuy',
    	name:'numbuy',
    	component:numbuy
    },
     {
    	path:'/Leaderboard',
    	name:'Leaderboard',
    	component:Leaderboard
    },
    {
    	path:'/Leaderstatr',
    	name:'Leaderstatr',
    	component:Leaderstatr
    },
    {
    	path:'/live_video',
    	name:'live_video',
    	component:live_video
    },
  	{
	  path:'/myliang',
	  name:'myliang',
	  component:myliang
 	 },
 	 {
          path:'/search',
          name:'search',
          component:search
      },
      {
          path:'/more_person',
          name:'more_person',
          component:more_person
      },
      {
          path:'/pusherVideo',
          name:'pusherVideo',
          component:pusherVideo
      },
      {
          path:'/more_live',
          name:'more_live',
          component:more_live
      },
      {
          path:'/openVideo',
          name:'openVideo',
          component:openVideo
      },
      {
          path:'/imgcode',
          name:'imgcode',
          component:imgcode
      },
      {
          path:'/openVideo2',
          name:'openVideo2',
          component:openVideo2
      },
      {
          path:'/aliyunpush',
          name:'aliyunpush',
          component:aliyunpush
      },
      {
          path:'/live_player',
          name:'live_player',
          component:live_player
      },

  ]
})

