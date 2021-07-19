/** 
 *封装axios
 */
import axios from 'axios'
import qs from 'querystring'
import router from '../router/router.js'
import {
    Toast
} from 'vant'

//跳转登录页面
const toLogin = () => {
    this.$router.push({
        path: '/login'
    })
}
let member = localStorage.getItem('member')
if (member == 'undefined' || member == null) {
    // toLogin()
    //alert('没有登陆信息');
    if (router.history.current.path != '/my' && router.history.current.path != '/') {
        toLogin();
    }
    // console.log(router);
}
//错误信息处理
const errorHandle = (status, other) => {
    switch (status) {
        case 400:
            console.log("校验信息错误");
            break;
        case 401:
            toLogin();
            console.log('认证失败')
            break;
        case 404:
            console.log('请求资源不存在')
            break;
        default:
            console.log(other)
            break;
    }
}

//创建axios实例  
var Axios = axios.create({
    timeout: 500000,
    withCredentials: true
});
//Axios.defaults.headers.post['Content-Type'] = 'application/json'
//Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
Axios.interceptors.request.use(function (config) {

    //判断post请求需要qs转化
    if (config.method === 'post') {
        //  config.data = JSON.stringify(config.data)
    }

    let token = ''
    if (JSON.parse(localStorage.getItem('member'))) {
        token = JSON.parse(localStorage.getItem('member')).token
    } //localStorage.getItem('loginman',loginman).token}

    if (token != '') {
        config.headers.token = token
    } else {}
    return config;
}, function (error) {
    return Promise.reject(error)
})

Axios.interceptors.response.use(
    //请求成功  
    res => {
        if (res.data.code === 401) {Toast('未登录'); router.push('/login')}
        return res.status == 200 ? Promise.resolve(res.data) : Promise.reject(res)
    },
    //请求失败
    error => {
        console.log(error, '请求失败');
        const {
            response
        } = error
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response)
        } else {
            console.log('断网了');
        }
    }
)

export default Axios;