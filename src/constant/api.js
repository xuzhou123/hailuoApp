/**
 * author:cwj
 * title:商城api
 * time:25/05/18
 */

export default {
  index: '/h5/index.php/zhibo_live',//1.首页直播列表api
  home:'/h5/index.php/zhibo_live_detail',//2.H5页面直播间信息接口
  login:'/h5/index.php/login',//3.H5页面用户登录接口
  register:'/h5/index.php/register',//4.H5页面用户注册接口
  send:'/h5/index.php/send_phone_code',//5.H5页面发送验证码接口
  login_code:'/h5/index.php/phone_code_login',//H5页面手机验证码登录接口
  person:'/h5/index.php/user_personal',//个人中心信息
  wantpwd:'/h5/index.php/forget_password',//忘记密码
  loginout:'/h5/index.php/login_out',//退出登录
  attention:'/h5/index.php/my_attention',//关注列表
  auth_image:'/h5/index.php/upload_user_auth_imgage',//图片上传
  auth_update:'/h5/index.php/submit_auth',//认证提交
  give_attention:'/h5/index.php/give_attention',//关注
  cancel_attention:'/h5/index.php/cancel_attention',//取消关注
  my_setting:'/h5/index.php/my_setting',//个人设置
  my_setting_eidt:'/h5/index.php/my_setting_eidt',//个人设置编辑
  my_authentication:'/h5/index.php/my_authentication',//我的认证接口
  my_liverecord:'/h5/index.php/my_liverecord',//我的直播纪录接口
  my_fans:'/h5/index.php/my_fans',//我的粉丝
  my_manager:'/h5/index.php/my_manager',//我的管理员
  my_charge_record:'/h5/index.php/my_charge_record',//充值明细
  my_reward_record:'/h5/index.php/my_reward_record',//打赏明细
  cash_centre:'/h5/index.php/cash_centre',//提现中心
  withdraw_cash:'/h5/index.php/withdraw_cash',//提现
  send_gift:'/h5/index.php/send_gift',//打赏
  setNodeInfo:'/h5/index.php/set_node_info',//设置node
  h5:'/h5/index.php/index_tt',
  same_city_live_show:'/h5/index.php/same_city_live_show',//同城直播
  ranking_list:'/h5/index.php/ranking_list',//排行榜
  hot_small_video:'/h5/index.php/hot_small_video',//小视频
  mall_car_list:'/h5/index.php/mall_car_list',//坐骑列表
  user_small_video_like:'/h5/index.php/user_small_video_like',//点赞接口
  user_small_video_cancel_like:'/h5/index.php/user_small_video_cancel_like',//取消点赞
  mall_buy_car:'/h5/index.php/mall_buy_car',//坐骑购买
  mall_noble_list:'/h5/index.php/mall_noble_list',//贵族列表
  mall_buy_noble:'/h5/index.php/mall_buy_noble',//贵族购买
  mall_my_prop:'/h5/index.php/mall_my_prop',//mall_my_prop
  mall_my_car:'/h5/index.php/mall_my_car',//我的座驾
  mall_my_noble:'/h5/index.php/mall_my_noble',//我的贵族
  mall_use_car:'/h5/index.php/mall_use_car',//启用坐骑
  zhibo_live_hot:'/h5/index.php/zhibo_live_hot',//热门
  zhibo_live_recent:'/h5/index.php/zhibo_live_recent',//最新
  zhibo_live_recommend:'/h5/index.php/zhibo_live_recommend',//推荐
  mall_liang_search:'/h5/index.php/mall_liang_search',//搜索条件接口
  mall_liang_list:'/h5/index.php/mall_liang_list',//靓号列表接口（可购买的）
  mall_buy_liang:'/h5/index.php/mall_buy_liang',//购买靓号接口
  mall_user_search:'/h5/index.php/mall_user_search',//查找用户
  live_anchor_info:'/h5/index.php/live_anchor_info',//主播信息
  live_online_user_billboard:'/h5/index.php/live_online_user_billboard',//在线用户榜单接口
  live_online_user:'/h5/index.php/live_online_user',//在线用户
  live_show_contribution_billboard:'/h5/index.php/live_show_contribution_billboard',//贡献
  index_search_default_show_live:'/h5/index.php/index_search_default_show_live',//推荐接口
  index_search_result:'/h5/index.php/index_search_result',//搜索
  index_search_result_more_user:'/h5/index.php/index_search_result_more_user',//更多用户
  index_search_result_more_show_live:'/h5/index.php/index_search_result_more_show_live',//更多直播
  //index_search_result_more_user:'/h5/index.php/index_search_result_more_user',//更多用户
  pc_show_createroom:'/h5/index.php/live_create_show_live_room',//创建直播
  live_get_tx_pull_url:'/h5/index.php/live_get_tx_pull_url',//获取推流地址直播
  live_edit_show_live_room_title:'/h5/index.php/live_edit_show_live_room_title',//修改直播间标题
  live_close_show_live_room:'/h5/index.php/live_close_show_live_room',//关闭直播间
  index_shield_msg_content:'/h5/index.php/index_shield_msg_content',//
  index_charge_rules_list:'/h5/index.php/index_charge_rules_list',//
  index_banner_list:'/h5/index.php/index_banner_list',//
  hi_my_attention:'/h5/index.php/hi_my_attention',//我的关注
  live_kick_user:'/h5/index.php/live_kick_user',//踢出
  live_shut_up_user:'/h5/index.php/live_shut_up_user',//禁言
  add_manager:'/h5/index.php/add_manager',//添加管理员
  del_manager:'/h5/index.php/del_manager',//取消管理员
  live_link_show_live:'/h5/index.php/live_link_show_live',//连麦
  live_unlink_show_live:'/h5/index.php/live_unlink_show_live',//断麦
  live_pk_link_list:'/h5/index.php/live_pk_link_list',//pk列表
  index_check_code:'/h5/index.php/index_check_code',//打开软件填写邀请码
  live_get_beauty_params:'/h5/index.php/live_get_beauty_params',//获取美颜参数
  live_set_beauty_params:'/h5/index.php/live_set_beauty_params',//设置美颜参数
  live_check_liveroom_password:'/h5/index.php/live_check_liveroom_password',
  pay_h5_alipay:'/h5/index.php/pay_h5_alipay',//h5支付宝支付
  pay_h5_wxpay:'/h5/index.php/pay_h5_wxpay',//h5微信支付
  pay_wechat_wxpay:'/h5/index.php/pay_wechat_wxpay',//微信公众号支付
  live_gift_list:'/h5/index.php/live_gift_list',//特效文件接口
  hosturl:'/h5/hhhhhhhh/#/',
  //x-pk
  show_pk_link_list:'/h5/index.php/show_pk_link_list', // 获取pk列表
  show_search_pklink_list:'/h5/index.php/show_search_pklink_list', // 搜索PK主播
  show_agree_pk:'/h5/index.php/show_agree_pk', // 同意PK
  pk_active_data:'/h5/index.php/pk_active_data', // PK实时数据
  show_end_pk:'/h5/index.php/show_end_pk', // 结束pk
  register_success_download:'/h5/index.php/register_success_download', // 非app中注册后跳转到下载app链接
 // hosturl:'http://192.168.31.102:8080/#/'

}
