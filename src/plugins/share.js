/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import Axios from 'axios'
// const wxApi = {
//     /**
//      * [wxRegister 微信Api初始化]
//      * @param  {Function} callback [ready回调函数]
//      */
//     wxRegister(option) { //data是微信配置信息，option是分享的配置内容
//     Axios.get("sign/get_signature").then(data=>{
//         wx.config({
//             debug: true, // 开启调试模式
//             appId: data.appId, // 必填，公众号的唯一标识
//             timestamp: data.timestamp, // 必填，生成签名的时间戳
//             nonceStr: data.nonceStr, // 必填，生成签名的随机串
//             signature: data.signature, // 必填，签名，见附录1
//             jsApiList: [
//                 'checkJsApi',
//                 'updateTimelineShareData',
//                 'updateAppMessageShareData',
//                 'onMenuShareQQ',
//                 'onMenuShareWeibo'
//             ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//         })
//     }).catch((error) => {
//         console.log(error)
//       });
//         wx.ready(function(){
//             wx.updateTimelineShareData({
//                 title: option.title, // 分享标题
//                 link: option.link, // 分享链接
//                 imgUrl: option.imgUrl, // 分享图标
//                 desc: option.desc, // 分享描述
//                 success() {
//                     // 用户成功分享后执行的回调函数
//                     option.success()
//                 },
//                 cancel() {
//                     // 用户取消分享后执行的回调函数
//                     option.error()
//                 }
//             });
//             wx.updateAppMessageShareData({
//                 title: option.title, // 分享标题
//                 desc: option.desc, // 分享描述
//                 link: option.link, // 分享链接
//                 imgUrl: option.imgUrl, // 分享图标
//                 success() {
//                     // 用户成功分享后执行的回调函数
//                     option.success()
//                 },
//                 cancel() {
//                     // 用户取消分享后执行的回调函数
//                     option.error()
//                 }
//             })
//         })
//     }
// }
// export default wxApi
export const  commonShare = (_this, shareTitle, shareUrl, shareImg, shareDesc) => {
    let url = window.location.href.split('#')[0];
    console.log('url',url)
    let params = {
        shareUrl: url     //shareUrl是根据你的后台需要的参数名
    };
    Axios.get("api/weixin/initWXJSSDKConfigInfo?shareUrl="+shareUrl).then(datas=>{
        
        let data = JSON.parse(datas.data.data)
        console.log('data',data)
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appid, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, //注意：服务端签名和前端参数名大小写不一致
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage",'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                  
                console.log('触发分享')
                wx.onMenuShareTimeline({
                    title: shareTitle, // 分享标题
                    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        this.$toast.center('分享成功！！！');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        this.$toast.center('取消分享！！！');
                    }
                });
                wx.onMenuShareAppMessage({
                    title: shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: 'http://192.168.110.173:8080/kuaixun?id='+6656, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                    type: "", // 分享类型,music、video或link，不填默认为link
                    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        // Toast('分享成功！！！');
                        this.$toast.center('分享成功！！！');
                        console.log('分享成功')
                    },
                    fail:function(res){
                        console.log('res',res)
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        // Toast('取消分享！！！');
                        this.$toast.center('取消分享！！！');
                    }
                });
            });
        }).catch(err=>{
            console.log("自定义分享失败"+err);
        })
    
};
