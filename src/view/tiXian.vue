<template>
  <div>
       <TabberTop :title='title'></TabberTop>
<div class="head">
  <div>提现到:</div>
  <img src="../assets/images/weiXin.png" class="img"></img>
  <div>微信</div>
</div>
<div class="title">提现金额（元）</div>
<div class="money">
  <input type="text" :value="value" :placeholder="`￥ 零钱余额剩余`+balance " bindinput="getInputValue" placeholder-style="color:#D7D7D7"></input>
</div>

<div class="foot">
  <div class="tip">提现说明:</div>
  <div class="list">1、提现手续费暂免（暂定）</div>
  <div class="list">2、每天的提现金额不得高于1000元</div>
  <div class="list">3、提现金额最低1元起，最高200元 </div>
  <div class="list">4、提现金额将转账到您的微信钱包</div>
</div>
<div class="tijiao" bindtap="tijiao">提现</div>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
import apiData from "@/api/apiData";
export default {
  data() {
    return {
      title: "余额提现",
      balance: 10,
      value: "",
    };
  },
  components: {
    TabberTop,
  },
};
</script>

<style scoped lang="less">
/* pages/tiXian/tiXian.wxss */
.head {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  background: #fafafa;
  font-size: 18px;
  color: #000;
  font-weight: 500;
}
.head image {
  width: 26px;
  height: 21px;
  margin-left: 13px;
  margin-right: 11px;
}
.title {
  margin-top: 24px;
  margin-left: 40px;
  font-size: 16px;
  color: #717171;
  font-weight: 400;
}
.money {
  padding: 11px 0px;
  margin: 0 40px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
}
.money text {
  font-size: 24px;
  color: #000;
  font-weight: 500;
}
input {
  font-size: 16px;
  color: #000;
  font-weight: 400;
}
.foot {
  padding: 32px 40px;
}
.tip {
  font-size: 14px;
  color: #914cdf;
}
.list {
  font-size: 14px;
  color: #aeaeae;
  margin-top: 5px;
}
.tijiao {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background: linear-gradient(to right, #914cdf, #914cdf);
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 100px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.img {
  margin: 0 10px 0 16px;
  width: 26px;
  height: 21px;
}
</style>