/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token:'',
        title: '',
        search:'',
        load:true,
        order:'',
        page:''
    },
    mutations: {
        [types.LOGIN]:function(state,data){
        	console.log(data)
        	localStorage.setItem('token',data);
            state.token =data;
        },
        [types.LOGOUT]:function(state){
            localStorage.removeItem('token');
            state.token = null;
              
        },
        [types.TITLE]:function(state, data){
            state.title = data;
        },
        [types.LOAD]:function(state, data){
            state.load = data;
            //console.log(state.load )
        },
        [types.ORDER]:function(state, data){
            state.order = data;
           // console.log(state.load )
        },
          [types.PAGE]:function(state, data){
            state.page = data;
           // console.log(state.load )
        }
    }
})