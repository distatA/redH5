import Vue from 'vue';
import Vuex from 'vuex'
import apiData from '@/api/apiData'; 
//使用
Vue.use(Vuex)

export default new Vuex.Store({
    //data
    state:{
        num:0,
        count:20,
        msg:'hello',
        name:null,
        member_no:'75EDAD206EB545ADA7C767E65DD068D8',
        userInfo:'',
        postContent:{}
    },
    getters:{
        reverseMsg(state){
            return state.msg.split('').reverse().join('')
        },
        clickreverse(state){
           return (val)=>{           
                return `${val.split('').reverse().join('') + '  ' + state.msg}`
            }
        }
    },
    //methods  在mutations里面处理状态
    mutations:{
        setMemer(state,val){
            state.member_no = val
        },
        addNum(state){
            state.num +=2
        },
        changeCount(state,val){
            state.count = val
        },
        setName(state,val){
            state.name = val.data
        },
        setUserInfo(state,val){
            console.log(val,'val');
            state.userInfo = val 
        },
        setPostContent(state,val){
            console.log(val,'val');
            state.postContent = val 
        }
    },
    //异步方法
    actions:{
        async getName (content){
            const params = {
                dict_name:'audit_status'
            }
            let result  = await apiData.banner.getData(params)
            content.commit('setName',result)
        },
        setMemer(content,val){
            content.commit('setMemer',val)
        }
    },
    //模块
    modules:{}
})