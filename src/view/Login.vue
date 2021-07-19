<!--  -->
<template>
  <div>
    <TabberTop :title="title"></TabberTop>
    <div class="top_img">
      <img
        src="../assets/images/loginLogo.png"
        alt
        srcset
      />
    </div>
    <div class="login_img">
      <van-button type="primary" @click="getMes">微信登录</van-button>
      <van-button class="phoneLogin" @click="toPage" >手机号登录</van-button>
    </div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
export default {
  data() {
    return {title:'登录'};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // this.clearstro()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    /**
     *获取微信授权信息
     */
    clearstro() {
      alert(JSON.parse(localStorage.getItem("member")));
      localStorage.clear();
    },
    getMes() {
      let appid = "wx53403f71afcc19a6"; //生产
      //let appid = "wx9a7bbffb34c60694"; //测试
      // let url = "http://192.168.110.173:8080/my";
      // let url = 'http://47.111.109.201/my'
      let url = "https://www.58hongren.com/my";

      let redirect_uri = encodeURIComponent(url);
      // console.log(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`);
      //    this.$router.push({
      //   path: '/',
      // })
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`;
    },
    // 跳转手机登录页
    toPage(){
      this.$router.push('/tel')
    }
  },
  components:{
    TabberTop
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.center() {
  display: flex;
  align-items: center;
  justify-content: center;
}
.top_img {
  height: 50vh;
  .center();
  align-items: flex-end;
  img {
    width: 3rem;
  }
}
.login_img {
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/ .van-button {
  width: 3rem;
  height: 0.7rem;
  font-size: 0.36rem;
  margin: auto;
}
.phoneLogin {
  font-size: 0.36rem;
  font-family: tahoma, arial, "Hiragino Sans GB", simsun, sans-serif;
  color: #ffffff;
  background: linear-gradient(192deg, #914CDF 0%, #914CDF 100%);
  margin-top: 23px;
}
</style>