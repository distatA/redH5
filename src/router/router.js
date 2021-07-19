import Vue from 'vue' // 引入vue
import VRouter from 'vue-router' // 引入路由
import Person from '@/view/Person.vue'
import My from '@/view/my/My.vue' //我的
import Flash from '@/view/flash/Flash.vue' //快讯
import Live from '@/view/live/Live.vue' //直播
import Note from '@/view/note/Note.vue' //笔记
import Kuaixun from '@/view/kuaixun.vue' //快讯详情
import Post from '@/view/post.vue' //发布快讯
import Vote from '@/view/vote.vue' //发起投票
import PostNote from '@/view/postNote.vue' //发布笔记
import Zanlist from '@/view/zanlist.vue' //赞赏列表
import Search from '@/view/search.vue' //赞赏列表
import page404 from '@/view/Page404'
import Login from '@/view/Login'
import VueRouter from 'vue-router'
import Balance from '@/view/my/AccountBalance'
import MoneyDetail from '@/view/my/moneyDetail'
import WithdrawalRecord from '@/view/my/WithdrawalRecord'
import AboutUs from '@/view/my/AboutUs'
import MyFans from '@/view/my/myFans'
import Tel from '@/view/Tel'
import MyAttention from '@/view/my/MyAttention'
import redConfirmP from '@/view/my/redConfirmP'
import redConfirmC from '@/view/my/redConfirmC'
import chooseAuth from '@/view/my/chooseAuth'
import paySet from '@/view/my/paySet'
import personMes from '@/view/my/personMes'
import changeMobile from '@/view/my/changemobile'
import myCollection from '@/view/my/myCollection'
import myCommunity from '@/view/my/myCommunity'
import UserAgreement from '@/view/UserAgreement'
import PrivacyAgreement from '@/view/PrivacyAgreement'
import tiXian from '@/view/tiXian'
import pageTurn from '@/view/pageTurn'
import complain from '@/view/complain/complain'
import complainPost from '@/view/complainPost'
import myComplain from '@/view/my/myComplain'
import complainDetail from '@/view/complainDetail'
import land from '@/view/land/land'
import landPost from '@/view/landPost'
import landNoticeDetail from '@/view/landNoticeDetail'
import landSell from '@/view/landSell'













Vue.use(VRouter) // vue使用路由

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

const router = new VRouter({ // 创建路由
    mode: 'history', // 去掉链接中的#
    routes: [ // 此处写路由
        {
            path: '/', // 链接中的显示路劲
            // name: 'login', // 名字
            component: My,
            redirect: '/note',
            meta: {
                title: "第一房",
            }
        },
        {
            path: '/login', // 链接中的显示路劲
            name: 'Login', // 名字
            component: Login,
            meta: {
                title: "登录",
            }
        },
        {
            path: '/flash', // 链接中的显示路劲
            component: Flash,
            meta: {
                title: "第一房",
            }
        },
        {
            path: '/tel', // 链接中的显示路劲
            name: 'Tel',
            component: Tel,
            meta: {
                title: "登录",
            }
        },
        {
            path: '/my', // 链接中的显示路劲
            name: 'My', // 名字
            component: My,
            meta: {
                title: "第一房",
            }
        },
        {
            path: '/balance', // 账户余额
            name: 'balance',
            component: Balance,
            meta: {
                title: "账户余额",
            }
        },
        {
            path: '/moneyDetail', // 资金明细
            name: 'moneyDetail',
            component: MoneyDetail,
            meta: {
                title: "资金明细",
            }
        },
        {
            path: '/withdrawalRecord',
            name: 'withdrawalRecord',
            component: WithdrawalRecord,
            meta: {
                title: "提现记录",
            }
        },
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: AboutUs,
            meta: {
                title: "关于我们",
            }
        },
        {
            path: '/myFans',
            name: 'myFans',
            component: MyFans,
            meta: {
                title: "我的粉丝",
            }
        },
        {
            path: '/myAttention',
            name: 'myAttention',
            component: MyAttention,
            meta: {
                title: "我的关注",
            }
        },
        { //我的收藏
            path: '/myCollection',
            name: 'myCollection',
            component: myCollection,
            meta: {
                title: "我的收藏",
            }
        },
        { //我的社区
            path: '/myCommunity',
            name: 'myCommunity',
            component: myCommunity,
            meta: {
                title: "我的社区",
            }
        },
        {
            path: '/redConfirmP', //红人个人认证
            name: 'redConfirmP',
            component: redConfirmP,
            meta: {
                title: "红人个人认证",
            }
        },
        {
            path: '/redConfirmC', //红人个人认证
            name: 'redConfirmC',
            component: redConfirmC,
            meta: {
                title: "红人个人认证",
            }
        },
        {
            path: '/chooseAuth', //红人认证选择
            name: 'chooseAuth',
            component: chooseAuth,
            meta: {
                title: "红人认证",
            }
        },
        {
            path: '/paySet', //红人认证选择
            name: 'paySet',
            component: paySet,
            meta: {
                title: "支付设置",
            }
        },
        {
            path: '/personMes', //红人认证选择
            name: 'personMes',
            component: personMes,
            meta: {
                title: "红人认证",
            }
        },
        {
            path: '/changeMobile', //红人认证选择
            name: 'changeMobile',
            component: changeMobile,
            meta: {
                title: "红人认证",
            }
        },
        {
            path: '/live', // 链接中的显示路劲
            name: 'Live', // 名字
            component: Live,
            meta: {
                title: "直播",
            }
        },
        {
            path: '/note', // 链接中的显示路劲
            name: 'Note', // 名字
            component: Note,
            meta: {
                title: "第一房",
            }
        },
        {
            path: '/kuaixun', // 快讯详情
            name: 'Kuaixun', // 名字
            component: Kuaixun,
            meta: {
                title: "快讯详情",
            }
        },
        {
            path: '/post', // 发布快讯
            name: 'Post', // 名字
            component: Post,
            meta: {
                title: "发布快讯",
            }
        },
        {
            path: '/postNote', // 发布笔记
            name: 'PostNote', // 名字
            component: PostNote,
            meta: {
                title: "发布笔记",
            }

        },
        {
            path: '/vote', // 发起投票
            name: 'Vote', // 名字
            component: Vote,
            meta: {
                title: "发起投票",
            }
        },
        {
            path: '/zanlist', // 赞赏列表
            name: 'Zanlist', // 名字
            component: Zanlist,
            meta: {
                title: "赞赏列表",
            }
        },
        {
            path: '/search', // 赞赏列表
            name: 'Search', // 名字
            component: Search,
            meta: {
                title: "赞赏列表",
            }
        },
        {
            path: '/userAgreement', // 用户协议
            name: 'UserAgreement', // 名字
            component: UserAgreement,
            meta: {
                title: "用户协议",
            }
        },
        {
            path: '/privacyAgreement', // 用户隐私协议
            name: 'PrivacyAgreement', // 名字
            component: PrivacyAgreement,
            meta: {
                title: "用户隐私协议",
            }
        },
        {
            path: '/tiXian', // 用户隐私协议
            name: 'tiXian', // 名字
            component: tiXian,
            meta: {
                title: "用户隐私协议",
            }
        },
        {
            path: '/pageTurn', // 用户隐私协议
            name: 'pageTurn', // 名字
            component: pageTurn,
            meta: {
                title: "用户隐私协议",
            }
        },
        {
            path: '/complain', // 维权315首页
            name: 'complain', // 名字
            component: complain,
            meta: {
                title: "第一房",
            }
        },
        {
            path: '/complainPost', // 维权315表单上传
            name: 'complainPost', // 名字
            component: complainPost,
            meta: {
                title: "维权315",
            }
        },
        {
            path: '/myComplain', // 我的投诉
            name: 'myComplain', // 名字
            component: myComplain,
            meta: {
                title: "我的投诉",
            }
        },
        {
            path: '/complainDetail', // 投诉详情
            name: 'complainDetail', // 名字
            component: complainDetail,
            meta: {
                title: "投诉详情",
            }
        },
        {
            path: '/land', // 投诉详情
            name: 'land', // 名字
            component:  land,
            meta: {
                title: "第一房",
            }
        },
        {
            path: '/landPost', // 投诉详情
            name: 'landPost', // 名字
            component:  landPost,
            meta: {
                title: "土地并购",
            }
        },
        {
            path: '/landNoticeDetail', // 投诉详情
            name: 'landNoticeDetail', // 名字
            component:  landNoticeDetail,
            meta: {
                title: "土地推介公告详情",
            }
        },
        {
            path: '/landSell', // 投诉详情
            name: 'landSell', // 名字
            component:  landSell,
            meta: {
                title: "土地推介",
            }
        },
      
        
        {
            path: '/person', // 链接中的显示路劲
            name: 'Person', // 名字
            component: Person, // 引入的路由名称，必须与import里的名称一样
            beforeEnter: (to, from, next) => {
                console.log(`独享守卫person`);
                next()
            },
            meta: {
                needLogin: true,
                content: '这是首页'
            }
        },
        {
            path: '/login', // 链接中的显示路劲
            name: 'login', // 名字
            component: Login // 引入的路由名称，必须与import里的名称一样
        },
        {
            path: '*',
            component: page404
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     // console.log(to,from);
//     next()
//     // console.log(to)  // 到哪个页面去？
//     // console.log(`前置路由`);
//     // let login = true;
//     // //判断是否需要登录&&是否已经登录
//     // if (to.meta.needLogin && !login) {
//     //     next({ path: '/login' })
//     // } else {
//     //     next()
//     // }

// })
//main.js里面的代码  
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
});

export default router;