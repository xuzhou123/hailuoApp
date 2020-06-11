/**
 * Created by chang on 18/5/23.
 * http配置
 */

import axios from 'axios'
import store from '@/store/store'
import * as types from '@/store/types'
import router from '@/router'

let baseUrl='/api'
if(process.env.NODE_ENV === 'production'){
    baseUrl='/'
}
console.log(process.env.NODE_ENV)
axios.defaults.timeout = 8000;
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(
    config => {
        //if (localStorage.getItem('token')) {
            //config.headers={'Token':localStorage.getItem('token'),'Req-Type':'APP','Content-Type':'application/x-www-form-urlencoded'};
            config.headers={'Token':localStorage.getItem('login_token'),'Req-Type':'APP','Content-Type':'application/x-www-form-urlencoded'};

            //}
        //console.log("数据请求")
         store.commit(types.LOAD,true);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
    	//console.log("请求成功",response.data.data)
    	//store.state.load=false;
    	 store.commit(types.LOAD,false);
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: '/login_pwd',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios
