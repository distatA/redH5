import axios from './axios'

const base = {
    baseUrl: '/api',
    banner: '/h5/login',
    detail: '/myMessage/details',
    wallet: '/myWallet/details',
    moneyDetail: '/myWallet/myBill', //资金明细
    cashList: '/myWallet/cashList', //提现记录
    aboutUs: '/myAboutUs/aboutUs',
    myFans: '/myFans/fansList',
    myFollow: '/myFollow/followList',
    upload: '/upload/uploadFile',
    sendCode: '/sms/sendCode',
    savePeopleAuth: '/myRedAuth/peopleAuth/', //个人认证新增申请
    authStatus: '/myRedAuth/authStatus', //点击红人认证，判断红人认证状态
    paySet: '/payPas/resetPayPas', //支付设置
    updateMyMessage: '/myMessage/updateMyMessage', //修改个人信息
    valityMobile: '/myMessage/valityMobile', //修改绑定手机
    details: '/myRedAuth/details', //红人认证查询
    saveComAuth: '/myRedAuth/companyAuth', //企业认证更新
    getItemDetail: '/itemAndDetail/getItemDetail', //交易类型
    shequ: '/myNote/noteList', //我的社区
    cang: '/myCollection/noteCollection', //我的收藏
    post: '/publish/noteAndArticle', //发布快讯
    checktext: '/check/context', //内容检测
    checkimg: '/check/imageCheck', //图片检测
    checkvideo: '/check/videoCheck', //视频检测
    list: '/noteAndArticle/myRecomMend', //快讯列表
    lists: '/noteAndArticle/myFollow', //关注列表
    zan: '/NoteAndArticleComment/commentLike', //点赞
    noteDetail: '/noteAndArticle/myFollowDetails', //笔记、快讯详情
    comment: '/NoteAndArticleComment/addComment', //发布评论
    comList: '/NoteAndArticleComment/commentList', //评论列表
    live: '/live/roomList', //直播列表
    share: '/sign/get_signature', //分享
    vote: '/noteAndArticle/vote', //确认投票
    delVote: '/noteAndArticle/delVote', //取消投票
    lunbo: '/enjoy/homeImage', //轮播图
    search: '/h5Search/search', //搜索
    shang: '/reward/h5Create', //打赏
    mobileCode: '/app/mobileVerifiCode', //获取手机验证码
    mobileLogin: '/app/phoneLogin', //手机登录
    userAgreement: '/enjoy/file', //6是用户协议 4是隐私协议
    myFallow: '/myFollow/follow', //取消关注
    collect: '/myCollection/collection', //收藏接口
    complaintBanner: '/complaint/banner', //投诉banner
    complainNumber: '/complaint/number', //投诉数字
    complainHot: '/complaint/top_list', //投诉最热三条
    complainList: '/complaint/list', //投诉列表
    complainDetail: '/complaint/detail', //投诉详情
    myComplainList: '/complaint/my_list', //我的投诉
    complainShare: '/complaint/share', //H5分享
    complainLike: '/NoteAndArticleComment/commentLike', //H5点赞
    complainForm: '/complaint/push_complaint', //投诉表单
    complainAgreement: '/complaint/agreement', //投诉协议
    centerIn: '/complaint/center_in', //表单入口图片
    activityImg: '/complaint/activity_img', //表单图片
    landPost: '/landSales/add_demand', //土拍表单
    landList: '/landSales/art_list', //土拍列表
    langDetail: '/landSales/art_detail', //土拍详情
    langHotList: '/landSales/scroll_bar', //土拍的滚动栏目
    vrList: '/landSales/vr_list' //土拍VR列表
}
let contentType = {
    headers: {
        "content-type": "application/x-www-form-urlencoded",
    }
}
let imgUrl = 'https://firsthouse.oss-cn-shanghai.aliyuncs.com/'
let userInfo = JSON.parse(localStorage.getItem('member')) ? JSON.parse(localStorage.getItem('member')) : ''
let member_no = ''
let nickName = ''
let headUrl = ''
let city = '合肥市'
if (userInfo) {
    member_no = userInfo.member_no
    nickName = userInfo.nickName
    headUrl = userInfo.headUrl
    city = userInfo.city
}
const upLoad = (params) => {
    return axios.post(
        base.baseUrl + base.upload,
        params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

    )
}
/**
 * 发送短信验证码
 * @param {} params  mobile，tplCode=“SMS_172975116”
 */
const sendCode = (params) => {
    params.tplCode = 'SMS_172975116'
    return axios.get(
        base.baseUrl + base.sendCode, {
            params
        },
    )
}

const banner = {
    getData(param) {
        let params = param
        console.log(params)
        return axios.post(
            base.baseUrl + base.banner,
            params,
        )
    }
}
const kuaixun = {
    // 发布笔记、快讯
    getData(params) {
        return axios.post(
            base.baseUrl + base.post,
            params,
        )
    },

    // 检测图片
    getCheckimg(params) {
        return axios.post(
            base.baseUrl + base.checkimg,
            params,
        )
    },
    // 笔记、快讯推荐列表
    getList(params) {
        return axios.get(
            base.baseUrl + base.list, {
                params
            }
        )
    },
    //关注列表
    getLists(params) {
        return axios.get(
            base.baseUrl + base.lists, {
                params
            }
        )
    },
    // 点赞
    getZan(params) {
        return axios.get(
            base.baseUrl + base.zan, {
                params
            }
        )
    },
    //详情
    getDetail(params) {
        return axios.get(
            base.baseUrl + base.noteDetail, {
                params
            }
        )
    },
    //发布评论
    getComment(params) {
        return axios.post(
            base.baseUrl + base.comment,
            params,
        )
    },
    //评论列表
    getComList(params) {
        return axios.get(
            base.baseUrl + base.comList, {
                params
            }
        )
    },

}
const shang = { //打赏
    getShang(params) {
        return axios.post(
            base.baseUrl + base.shang,
            params,
        )
    },
}
const my = {
    getDetail(params) {
        return axios.get(
            base.baseUrl + base.detail, {
                params
            }
        )
    },
    /** * 获取钱包余额信息  * @param {*} params memberno   */
    getWallet(params) {
        return axios.get(base.baseUrl + base.wallet, {
            params
        })
    },
    /** * 获取提现记录  * @param {*} params memberno   */
    cashList(params) {
        return axios.get(base.baseUrl + base.cashList, {
            params
        })
    },
    /**  获取资金明细  */
    moneyDetail(params) {
        return axios.get(base.baseUrl + base.moneyDetail, {
            params
        })
    },
    /** 关于我们  */
    aboutUs() {
        return axios.get(base.baseUrl + base.aboutUs, {})
    },
    /** 获取粉丝信息 */
    getFans(params) {
        return axios.get(base.baseUrl + base.myFans, {
            params
        })
    },
    /** 我的关注 */
    getFollow(params) {
        return axios.get(base.baseUrl + base.myFollow, {
            params
        })
    },
    /** 红人个人认证*/
    savePeopleAuth(params) {
        return axios.post(base.baseUrl + base.savePeopleAuth, params)
    },
    /**是否认证查看 */
    authStatus(params) {
        return axios.get(base.baseUrl + base.authStatus, {
            params
        })
    },
    /**支付设置 */
    paySet(params) {
        return axios.get(base.baseUrl + base.paySet, {
            params
        })
    },
    /**修改个人信息 */
    updateMyMessage(params) {
        return axios.post(base.baseUrl + base.updateMyMessage, params)
    },
    /**修改手机号信息 */
    valityMobile(params) {
        return axios.get(base.baseUrl + base.valityMobile, {
            params
        })
    },
    /**查询红人认证信息 */
    details(params) {
        return axios.get(base.baseUrl + base.details, {
            params
        })
    },
    /**新增更新企业认证信息 */
    saveComAuth(params) {
        return axios.post(base.baseUrl + base.saveComAuth, params)
    },
    /**获得交易类型 */
    getItemDetail(params) {
        return axios.post(base.baseUrl + base.getItemDetail, params)
    },

    /**我的社区 */
    shequ(params) {
        return axios.get(base.baseUrl + base.shequ, {
            params
        })
    },
    /**我的收藏 */
    cang(params) {
        return axios.get(base.baseUrl + base.cang, {
            params
        })
    },




}
const share = { //分享
    getShare() {
        return axios.get(
            base.baseUrl + base.share, {

            }
        )
    }
}
const vote = {
    getVote(params) {
        return axios.get(
            base.baseUrl + base.vote, {
                params
            }
        )
    },
    getDelVote(params) {
        return axios.get(
            base.baseUrl + base.delvote, {
                params
            }
        )
    }
}
const lunbo = {
    getLunbo(params) {
        return axios.get(
            base.baseUrl + base.lunbo, {
                params
            }
        )
    }
}
const live = { //zhibo
    getLiveList(params) {
        return axios.get(
            base.baseUrl + base.live, {
                params
            }
        )
    }
}
const search = {
    getSearch(params) {
        return axios.get(
            base.baseUrl + base.search, {
                params
            }
        )
    }
}
const mobileCode = {
    getMobileCode(params) {
        return axios.get(
            base.baseUrl + base.mobileCode, {
                params
            }
        )
    }
}
const mobileLogin = {
    getMobileLogin(params) {
        return axios.get(
            base.baseUrl + base.mobileLogin, {
                params
            }
        )
    }
}
const userAgreement = {
    getUserAgreement(params) {
        return axios.get(
            base.baseUrl + base.userAgreement, {
                params
            }
        )
    }
}

const myFallow = {
    delMyFallow(params) {
        return axios.get(
            base.baseUrl + base.myFallow, {
                params
            }
        )
    }
}
const collect = {
    myCollect(params) {
        return axios.post(
            base.baseUrl + base.collect, params

        )
    }
}
// 检测文字
const getChecktext = {
    gct(params) {
        return axios.post(
            base.baseUrl + base.checktext,
            params, contentType
        )
    }
}
const complaintBanner = {
    cb(params) {
        return axios.post(
            base.baseUrl + base.complaintBanner,
            params, contentType
        )
    }
}
const complainNumber = {
    complainNum(params) {
        return axios.post(
            base.baseUrl + base.complainNumber,
            params, contentType
        )
    }
}

const complainHot = {
    hotList(params) {
        return axios.post(
            base.baseUrl + base.complainHot,
            params, contentType
        )
    }
}
const complainList = {
    list(params) {
        return axios.post(
            base.baseUrl + base.complainList,
            params, contentType
        )
    }
}

const complainDetail = {
    detail(params) {
        return axios.post(
            base.baseUrl + base.complainDetail,
            params, contentType
        )
    }
}
const myComplainList = {
    list(params) {
        return axios.post(
            base.baseUrl + base.myComplainList,
            params, contentType
        )
    }
}
const complainShare = {
    share(params) {
        return axios.get(
            base.baseUrl + base.complainShare, {
                params
            }

        )
    }
}
const complainLike = {
    like(params) {
        return axios.get(
            base.baseUrl + base.complainLike, {
                params
            }
        )
    }
}
const complainForm = {
    form(params) {
        return axios.post(
            base.baseUrl + base.complainForm,
            params,
        )
    }
}
const complainAgreement = {
    agreement(params) {
        return axios.post(
            base.baseUrl + base.complainAgreement,
            params,
        )
    }
}

const activityImg = {
    img(params) {
        return axios.post(
            base.baseUrl + base.activityImg,
            params,
        )
    }
}
const centerIn = {
    centerImg(params) {
        return axios.post(
            base.baseUrl + base.centerIn,
            params,
        )
    }
}
const landPost = {
    landForm(params) {
        return axios.post(
            base.baseUrl + base.landPost,
            params,
        )
    }
}
const landList = {
    list(params) {
        return axios.post(
            base.baseUrl + base.landList,
            params,
        )
    }
}
const langDetail = {
    detail(params) {
        return axios.post(
            base.baseUrl + base.langDetail,
            params,
        )
    }
}
const langHotList = {
    list(params) {
        return axios.post(
            base.baseUrl + base.langHotList,
            params,
        )
    }
}
const vrList = {
    list(params) {
        return axios.post(
            base.baseUrl + base.vrList,
            params,
        )
    }
}



export default {
    userInfo,
    banner,
    upLoad,
    sendCode,
    my,
    kuaixun,
    member_no,
    city,
    nickName,
    headUrl,
    imgUrl,
    live,
    share,
    vote,
    lunbo,
    search,
    shang,
    mobileCode,
    mobileLogin,
    userAgreement,
    myFallow,
    collect,
    complaintBanner,
    complainNumber,
    complainHot,
    complainList,
    complainDetail,
    getChecktext,
    myComplainList,
    complainShare,
    complainLike,
    complainForm,
    complainAgreement,
    centerIn,
    activityImg,
    landPost,
    landList,
    langDetail,
    langHotList,
    vrList
}