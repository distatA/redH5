<!-- 账户余额 -->
<template>
  <div>
    <!-- <div  class="cp_l_box" @click="toDetail"
  :style="item.isVerify ==='not' && isMyComplain === true ?  { 'background': 'url(' + require('../assets/images/unreply.png') + ') right / 15% no-repeat '} :{ 'background': 'url(' + require('../assets/images/isReply.png') + ') right / 15% no-repeat'}" -->
    <div class="cp_l_box" @click="toDetail">
      <div class="cp_l_h">
        <img :src="item.headUrl" class="cp_l_h_avatar" alt="" />
        <div class="cp_l_h_info">
          <div class="cp_l_h_info_nickNam">{{ item.nickName }}</div>
          <div class="cp_l_h_info_time">{{ item.createTime }}</div>
        </div>
        <img
          :src="
            item.isVerify === 'not' && isMyComplain === true
              ? require('../assets/images/unreply.png')
              : require('../assets/images/isReply.png')
          "
          alt=""
          class="cp_l_h_statusImg"
        />
      </div>
      <div class="cp_l_t">{{ item.title }}</div>
      <div class="cp_l_m">
        {{ item.content }}
      </div>
      <div class="cp_l_d" style="margin-top: 10px">
        <div>[投诉对象] {{ item.complaintObject }}</div>
        <div style="margin-top: 10px">
          [投诉问题] {{ item.complaintProblem }}
        </div>
      </div>
      <div class="cp_l_f">
        <img
          src="../assets/images/like.png"
          class="cp_l_f_l"
          alt=""
          v-if="item.isLike === 'is'"
          @click.stop="like(item.id)"
        />
        <img
          src="../assets/images/likeNormal.png"
          class="cp_l_f_l"
          alt=""
          v-if="item.isLike === 'not'"
          @click.stop="like(item.id)"
        />
        <span style="margin-right: 15px">{{ item.likesNumber }}</span>
        <img src="../assets/images/read.png" class="cp_l_f_s" alt="" />
        <span>{{ item.readNumber }}</span>
        <!-- </div> -->
      </div>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import { Toast } from "vant";
export default {
  props: ["item", "isMyComplain"],
  data() {
    return {
      showShare: false,
      options: [{ name: "微信", icon: "wechat" }],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //跳转详情
    toDetail() {
      this.$router.push(`/complainDetail?id=${this.item.id}`);
    },
    // 分享
    async onSelect() {
      let that = this;
      this.showShare = false;
      let params = {
        id: this.item.id,
      };
      const res = await apiData.complainShare.share(params);
      if (res.code === 200) {
        const {
          appId,
          nonceStr,
          signature,
          timestamp,
          desc,
          title,
          link,
        } = res.data;

        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: `${appId}`, // 必填，公众号的唯一标识
          timestamp: `${timestamp}`, // 必填，生成签名的时间戳
          nonceStr: `${nonceStr}`, // 必填，生成签名的随机串
          signature: `${signature}`, // 必填，签名
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
          ], // 必填，需要使用的JS接口列表
        });
        //3.通过ready接口处理成功验证,并调用相应接口
        wx.ready(function () {
          // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.updateAppMessageShareData({
            title, // 分享标题
            desc, // 分享描述
            link, //分享URL
            imgUrl: "https://picsum.photos/200/200", // 分享图标,此处我测试使用了外部图片
            success: function (res) {
              console.log(res);
              // 用户确认分享后执行的回调函数
            },
            fail: function () {
              // 用户取消分享后执行的回调函数
            },
          });
          wx.updateTimelineShareData({
            title, // 分享标题
            desc, // 分享描述
            link, //分享URL
            imgUrl: "https://picsum.photos/200/200", // 分享图标,此处我测试使用了外部图片
            success: function () {
              console.log("分享成功");
              // 用户确认分享后执行的回调函数
            },
            fail: function () {
              // 用户取消分享后执行的回调函数
            },
          });
        });
      }
    },
    //点赞
    async like(like_id) {
      let params = {
        like_type: 7,
        like_id,
        member_no: apiData.member_no,
      };
      const res = await apiData.complainLike.like(params);
      if (res.code === 200) {
        Toast.success("操作成功");
        this.$emit("isLike", true);
      }
    },
  },
};
</script>
<style scoped lang='less'>
.cp_l_box {
  background: #ffffff;
  color: #717171;
  padding: 10/375 * 100vw 20/375 * 100vw;
  box-sizing: border-box;
  width: 100%;
  min-height: 150/375 * 100vw;
  display: flex;
  flex-direction: column;
  border-bottom: 1/375 * 100vw solid #f6f6f6;
}

.cp_l_h {
  width: 100%;
  height: 40/375 * 100vw;
  display: flex;
  align-items: center;
  .cp_l_h_avatar {
    width: 40/375 * 100vw;
    height: 40/375 * 100vw;
    border-radius: 50%;
    margin-right: 12/375 * 100vw;
    object-fit: cover;
  }

  .cp_l_h_info {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cp_l_h_info_nickNam {
      font-size: 14/375 * 100vw;
      color: #1b1b1b;
    }

    .cp_l_h_info_time {
      font-size: 12/375 * 100vw;
      color: #aeaeae;
    }
  }
  .cp_l_h_statusImg {
    width: calc(100vw - 95%);
  }
}

.cp_l_t {
  font-size: 16/375 * 100vw;
  color: #000000;
  line-height: 22/375 * 100vw;
  margin: 15/375 * 100vw 0 10/375 * 100vw 0;
}

.cp_l_m {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 20/375 * 100vw;
}

.cp_l_f {
  width: 100%;
  color: #914cdf;
  display: flex;
  align-items: center;
  justify-content: right;
  justify-content: flex-end;
  .cp_l_f_l {
    vertical-align: middle;
    display: inline-block;
    width: 16/375 * 100vw;
    height: 16/375 * 100vw;
    margin-right: 5/375 * 100vw;
  }

  .cp_l_f_s {
    vertical-align: middle;
    display: inline-block;
    width: 20/375 * 100vw;
    height: 20/375 * 100vw;
    margin-right: 5/375 * 100vw;
  }
}
</style>