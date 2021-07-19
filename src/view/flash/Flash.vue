<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 搜索框 -->
      <mytop @event="change($event)"></mytop>

      <div class="content">
        <van-swipe
          :autoplay="3000"
          indicator-color="#914CDF054"
          v-if="images.length > 0"
        >
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image.imgUrl" />
          </van-swipe-item>
        </van-swipe>
        <!-- 快讯 -->
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="100" 
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, index) in list" :key="index">
            <template v-if="item.type == 5 || item.type == 6">
              <!-- <kuaixun :item="item" @event="change($event)"></kuaixun> -->
              <div class="list">
                <!-- 打赏 -->
                <div class="zz" v-if="display == 1">
                  <div class="zz-box" style="width: 310px">
                    <div class="clos" @click="closeZz">
                      <img
                        src="../../assets/index-img/cha.png"
                        style="
                          width: 20px;
                          height: 20px;
                          display: block;
                          margin: 0;
                        "
                      />
                    </div>
                    <div class="box-title">我要打赏</div>
                    <img
                      :src="redheadUrl"
                      alt=""
                      style=" 
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin: 10px auto;
                        display: block;
                      "
                    />
                    <div class="box-name">{{ rednickName }}</div>
                    <div v-if="!otherTrue">
                      <div class="box-item">
                        <div
                          class="box-list"
                          v-for="(item, index) in moneyist"
                          :key="index"
                          @click="pay(item, '1')"
                        >
                          {{ item }}元
                        </div>
                      </div>
                      <div class="other" @click="other">其他金额</div>
                    </div>
                    <div v-if="otherTrue">
                      <div class="custom">
                        <input
                          type="number"
                          style="text-align: center; width: 78px"
                          v-model="moneyValue"
                          @keydown="handleInput"
                        />
                        <div style="color: #914CDF054">元</div>
                      </div>
                      <div class="other" style="margin: 20px 0" @click="back">
                        固定金额
                      </div>
                      <div class="box-foot" @click="pay('', '2')">确定</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="top">
                    <div class="left">
                      <div class="headimg">
                        <img :src="item.headUrl" alt="" />
                      </div>
                      <div>
                        <div class="nickname">
                          <div>{{ item.nickName }}</div>
                          <img
                            src="../../assets/index-img/huiyuan.png"
                            alt=""
                          />
                        </div>
                        <div class="time">{{ item.create_time }}</div>
                      </div>
                    </div>
                    <div class="right">
                      <img
                        src="../../assets/index-img/shang.png"
                        alt=""
                        @click="daShang(item.id, item.nickName, item.headUrl)"
                      />
                    </div>
                  </div>
                  <div @click="jump(item.id)">
                    <div class="title">
                      <div class="kuaixun">
                        <img src="../../assets/index-img/kuaixun.png" alt=""  style="width:40px;height:15px" />
                      </div>
                      <div class="biaoti">{{ item.title }}</div>
                    </div>
                    <div class="main">{{ item.memberNoteArticle.content }}</div>
                  </div>
                  <!-- :style="{
                      'border-bottom':
                        item.nickNames.length > 0 ||
                        item.memberNoteAndArticleComments.length > 0
                          ? '1px solid #F8F8F8'
                          : '0',
                    }" -->
                  <div class="bottom">
                    <!-- <div class="shareBox" @click="shareAticle(item)">
                      <img src="../../assets/images/share.png" alt="" />
                      <span>分享</span>
                    </div> -->
                    <!-- <div class="left" @click="shareFriend"><img src="../assets/index-img/share.png" alt=""><div>分享</div></div> -->
                    <div class="right" @click="clickZan(item)">
                      <img src="../../assets/index-img/isview.png" alt="" />
                    </div>
                    <div class="yinBox" v-show="item.isView">
                      <div class="left" @click="jump(item.id)">
                        <img src="../../assets/index-img/com.png" alt="" />
                        <div class="right">评论</div>
                      </div>
                      <div class="xian"></div>
                      <div class="left" @click="zan(item)">
                        <img
                          src="../../assets/index-img/iszan.png"
                          alt=""
                          style="width: 14px; height: 13px"
                        />
                        <div class="right" v-show="item.flag == 0">喜欢</div>
                        <div class="right" v-show="item.flag == 1">取消</div>
                      </div>
                    </div>
                  </div>
                  <!-- 点赞、评论 -->
                  <div
                    class="box"
                    v-show="
                      item.nickNames.length > 0 ||
                      item.memberNoteAndArticleComments.length > 0
                    "
                  >
                    <div class="zan" v-show="item.nickNames.length > 0">
                      <div class="left">
                        <img src="../../assets/index-img/zan.png" alt="" />
                      </div>
                      <div
                        class="name"
                        v-for="(its, ids) in item.nickNames"
                        :key="ids"
                      >
                        {{ its }}
                      </div>
                    </div>
                    <div
                      class="comment"
                      v-show="item.memberNoteAndArticleComments.length > 0"
                    >
                      <div class="left">
                        <img src="../../assets/index-img/comment.png" alt="" />
                      </div>
                      <div>
                        <div
                          class="right"
                          v-for="(
                            its, ids
                          ) in item.memberNoteAndArticleComments"
                          :key="ids"
                        >
                          <div class="name">{{ its.nick_name }}：</div>
                          <div class="pinglun">{{ its.context }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </van-list>
        <!-- 发布快讯按钮 -->
        <div class="post" @click="post">
          <img src="../../assets/index-img/post1.png" alt="" />
        </div>
      </div>
    </van-pull-refresh>
    <router-view></router-view>
    <Tabbar :selected="selected"></Tabbar>
    <!-- <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    /> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import Tabbar from "@/components/Tabbar";
import mytop from "@/components/mytop";
import kuaixun from "@/components/kx";
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import wxapi from "@/plugins/share.js";
import apiData from "@/api/apiData";
import { location } from "@/plugins/map.js";
export default {
  inject: ["reload"],
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      selected: "flash",
      images: [],
      kuaixunList: [],
      list: [],
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      isShuaxin: true,
      moneyValue: "",
      display: 2, //打赏弹窗
      otherTrue: false, //是否自定义打赏金额
      pid: "", //文章id
      redheadUrl: "",
      rednickName: "",
      moneyist: [0.01, 6.66, 18.88, 66.66, 100, 1.88],
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        // { name: "微博", icon: "weibo" },
        // { name: "复制链接", icon: "link" },
        // { name: "分享海报", icon: "poster" },
        // { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  components: {
    Tabbar,
    mytop,
    kuaixun,
  },
  //生命周期 - 创建完成（访问当前this实例） 
  created() {
    this.$api.member_no = JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member")).member_no
      : "";
    this.getList(); // 获取快讯列表
    this.getLunbo(); //轮播图
  },
  mounted() {
    this.createdLoca();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    /**获取地图定位*/                      
    getLocation() {
      let _that = this;
      let geolocation = location.initMap("map-container"); //定位
      AMap.event.addListener(geolocation, "complete", (result) => {
        _that.lat = result.position.lat;
        _that.lng = result.position.lng;
        _that.province = result.addressComponent.province;
        apiData.city = result.addressComponent.city;
        console.log("位置", result.addressComponent);
        _that.district = result.addressComponent.district;
      });
    },
    //上拉加载
    onLoad() {
      // 异步更新数据
      this.page++;
      this.getList();
    }, 
    // 发布快讯
    post() {
      this.$router.push({ path: "/post" });
    },
    //获取轮播图
    async getLunbo() {
      const params = {
        city: apiData.city, 
        bySource: 14, //快讯
      };
      var result = await apiData.lunbo.getLunbo(params);
      if (result.code == 200) {
        this.images = result.data;
      }
    },
    // 获取快讯列表
    async getList(loadMore = false) { 
      const params = {
        cityName: apiData.city,
        member_no: apiData.member_no,
        type: 0, //0快讯 1笔记
        searchName: "",
        pageIndex: this.page,
        pageSize: this.pageSize,
      };
      const result = await apiData.kuaixun.getList(params);
      var newArr = result.data.list;
      //由于后台数据问题,创建时间比真实创建时间慢了八小时
      for (let i = 0; i < newArr.length; i++) {
        newArr[i].isView = false;
        if (newArr[i].memberNoteAndArticleComments) {
          newArr[i].memberNoteAndArticleComments = newArr[
            i
          ].memberNoteAndArticleComments.slice(0, 2);
        }
        if (newArr[i].nickNames) {
          newArr[i].nickNames = newArr[i].nickNames
            .map(function (obj, index) {
              return obj;
            })
            .join("，");
        }
      }
      this.loading = false;
      this.total = result.data.total;
      if (newArr == null || newArr.length === 0) {
        // 加载结束
        this.finished = true;
        return;
      } 
      if (this.total <= this.list.length) {
        this.finished = true;
        this.list = newArr;
      } else if (loadMore) { 
        this.list = newArr;
      } else if (!loadMore) {
        this.list = [...this.list, ...newArr];
      }
    },
    // 下拉刷新 
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
         this.getList(); // 获取快讯列表
      }, 1000); 
    },
    //打赏
    daShang(id, name, head) {
      this.display = 1;
      this.rednickName = name;
      this.redheadUrl = head; 
      this.pid = id;
    },
    //关闭弹窗
    closeZz() {
      this.display = 2;
      this.otherTrue = false;
    },
    //自定义金额
    other() {
      this.otherTrue = true;
    },
    //固定金额
    back() {
      this.otherTrue = false;
      
    },
    //支付 
    async pay(id, type) {
      console.log(id, type);
      const params = {
        type: 2, //1给红人打赏 2给笔记打赏
        article_id: this.pid,
        price: type == 1 ? id : this.moneyValue, //金额
        reward_member_no: this.$api.member_no, //我的
        member_no_other: "", //红人的
      };
      const result = await this.$api.shang.getShang(params);
      console.log(result);
      if (result.code == 200) {
        window.location.href = result.data.wxPayMpOrderResult.mwebUrl
      }
      // Axios.post('api/reward/h5Create',params).then(data=>{
      //     console.log(data.data.code)
      //     if(data.data.code==200){
      //         location.href=data.data.data.wxPayMpOrderResult.mwebUrl
      //     }
      //     wx.chooseWXPay({
      //         timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //         nonceStr: '', // 支付签名随机串，不长于 32 位
      //         package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //         signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //         paySign: '', // 支付签名
      //         success: function (res) {
      //           // 支付成功后的回调函数
      //         }
      //       });
      // }).catch(err=>{
      //     console.log(err)
      // })
    },
    //输入金额最多保留两位小数
    handleInput(e) {
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null;
    },
    //分享
    async shareFriend() {
      const option = {
        title: "么么哒", // 分享标题
        link: "www.58hongren.com/", // 分享链接
        imgUrl:
          "http://imgb9.photophoto.cn/20150804/banjialunbotu-27194589_3.jpg", // 分享图标
        desc: "哈哈哈", // 分享描述
      };
      //    this.commonShare(this,"么么哒",window.location.href,"http://imgb9.photophoto.cn/20150804/banjialunbotu-27194589_3.jpg","面对疾风吧");
      // const result = await apiData.share.getShare()
      // console.log(result)
      // this.axios.get('/api/sign/get_signature?url=' ).then((res) => {
      //     console.log(res)
      //     wx.config({
      //         debug: true, // 开启调试模式
      //         appId: res.data.appId, // 必填，公众号的唯一标识
      //         timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      //         nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      //         signature: res.data.signature,// 必填，签名
      //         jsApiList: [
      //         "updateAppMessageShareData",//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
      //         "updateTimelineShareData",//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
      //         "onMenuShareWeibo",//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      //         ] // 必填，需要使用的JS接口列表
      //     })
      //     }).catch((error) => {
      //         console.log(error)
      //     });
    },
    // 展示点赞
    clickZan(e) {
      e.isView = !e.isView;
    },
    // 点赞
    async zan(e) {
      let { id, member, flag } = e;
      //  let { member_no } = JSON.parse(localStorage.getItem("member") || "");
      // this.member_no = member_no;
      let params = {
        like_type: 5, //1-笔记  2-文章  3-评论 4-抓取的文章 5-快讯 6-后台发布的快讯 7-后台发布的笔记
        like_id: id,
        member_no: this.$api.member_no,
      };
      const result = await apiData.kuaixun.getZan(params);
      if (result.code == 200) {
        if (flag == 0) {
          this.$toast.center("点赞成功");
          this.page = 1;
          this.getList(true);
        } else {
          this.$toast.center("取消点赞");
          this.page = 1;
          this.getList(true);
        }
        e.isView = !e.isView;
      } else if (result.code == 500 && !this.$api.member_no) {
        this.$toast.center("未登录");
        this.$router.push("/login");
      }
    },
    // 进去快讯详情
    jump(id) {
      this.$router.push({ path: "/kuaixun", query: { id: id } });
    },
    //选择分享的聚到
    onSelect(option) {
      console.log(option);
      Toast(option.name);
      this.showShare = false;
    },
    // 点击分享的文章
    shareAticle(e) {
      console.log(e);
      this.showShare = true;
    },
    //创建一个script标签
    createdLoca() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
      document.head.appendChild(script);
    },
    // 监听滚动条事件,如果触发,点赞的选项框就隐藏
    handleScroll() {
      this.list.forEach((v) => {
        v.isView = false;
      });
    },
  },
};
</script>
<style scoped lang='less'>
.router-link-active {
  text-decoration: none;
}
.van-swipe {
  width: 100%;
  height: 250px;
}

.post {
  position: fixed;
  right: 22px;
  bottom: 90px;
  img {
    width: 40px;
    height: 40px;
  }
}
.list {
  padding: 5px 20px 10px 20px;
  box-sizing: border-box;
  margin-top: 15px;
  border-bottom: 5px solid #f9f9f9;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .headimg {
        margin-right: 12px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #abcdef;
        }
      }
      .nickname {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        img {
          width: 14px;
          height: 13px;
          margin-left: 3px;
        }
      }
      .time {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(174, 174, 174, 1);
        margin-top: 3px;
        text-align: left;
      }
    }
    .right {
      /* 打赏人数 */
      .people {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #484848;
          text-align: center;
        }
        .browseImgItem {
          display: flex;
          margin-left: 26px;
        }
        .browseImg {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
        .browseImgView {
          border-radius: 50%;
          width: 26px;
          height: 26px;
          border: 1px solid #fff;
          box-shadow: 0px 1px 5px 5px rgba(0, 0, 0, 0.2);
          margin-left: -10px;
        }
      }

      img {
        width: 26px;
        height: 26px;
      }
    }
  }
  .title {
    margin: 10px 0;
    display: flex;
    align-items: baseline;
    .kuaixun {
      width: 40px;
      height: 14px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .biaoti {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 550;
      color: rgba(0, 0, 0, 1);
      line-height: 25px;
      text-align: left;
      margin-left: 10px;
    }
  }
  .main {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(100, 99, 99, 1);
    line-height: 25px;
    text-align: left;
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    margin-top: 10px;

    position: relative;
    .left {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #914CDF;
      margin-right: 13px;
      img {
        width: 12px;
        height: 14px;
        margin-right: 5px;
      }
    }
    .right img {
      width: 35px;
      height: 20px;
    }
    .yinBox {
      position: absolute;
      top: -7px;
      right: 43px;
      background: rgba(104, 104, 104, 1);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 9px 13px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 15px;
          height: 15px;
        }
        .right {
          margin-left: 3px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #fff;
        }
      }
      .xian {
        width: 1px;
        height: 18px;
        background: #979797;
        margin: 0 15px;
      }
    }
  }
  .box {
    margin-top: 10px;
    padding: 7px 5px 12px 4px;
    box-sizing: border-box;
    background: #f6f6f6;
    .zan {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin-bottom: 5px;
      .left {
        img {
          width: 12px;
          height: 11px;
          margin-right: 7px;
        }
      }
      .name {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #914CDF;
        line-height: 18px;
      }
    }
    .comment {
      display: flex;
      // flex-wrap: wrap;
      align-items: baseline;
      img {
        width: 12px;
        height: 12px;
        margin-right: 7px;
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .name {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #914CDF;
          line-height: 18px;
        }
        .pinglun {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #5e5e5e;
          line-height: 18px;
        }
      }
    }
  }
  /* 弹框 */
  .zz {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    /* background: #fff; */
    z-index: 999;
    display: flex;
    align-items: center;
  }
  .zz-box {
    width: 280px;
    /* height:100%; */
    background: rgba(255, 255, 255, 1);

    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    position: absolute;
    /* padding:0 10px; */
    box-sizing: border-box;
  }

  .zz.no {
    display: none;
  }
  .zz-box .clos {
    position: absolute;
    top: 10px;
    right: 14px;
    width: 20px;
    height: 20px;
  }
  .box-title {
    font-size: 22px;
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 550;
    color: #fff;
    margin-bottom: 18px;
    margin-top: -1px;
    background: url(https://firsthouse.oss-cn-shanghai.aliyuncs.com/blog/2020-03-09/afd930f746c64006b15172ac5e835711-tmp_a843e621c02d32a920ec55a5cc22a402.jpg)
      center/100%;
    background-repeat: no-repeat;
    height: 100px;
    line-height: 100px;
    border-radius: 12px 12px 0 0;
  }
  .box-name {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #484848;
    text-align: center;
    margin-top: 15px;
  }
  .box-item {
    padding: 22px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .box-list {
    width: 80px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #914CDF;
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #914CDF;
    margin-bottom: 24px;
  }
  .other {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 550;
    color: rgba(0, 122, 255, 1);
    text-align: center;
    padding-bottom: 40px;
  }
  .box-foot {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
    background: linear-gradient(to right, #ff9254, #ff5053);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border-radius: 5px;
  }
  .custom {
    width: 128px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    border: 1px solid #914CDF;
    display: flex;
    align-items: center;
    margin: 10px auto;
    margin-top: 10px;
    padding: 0 16px;
    box-sizing: border-box;
  }
}
.shareBox {
  margin-right: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 50px;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6d53;
  padding-top: 3px;
  img {
    width: 12px;
    height: 14px;
  }
}
</style>