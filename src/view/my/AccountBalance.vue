<!-- 账户余额 -->
<template>
  <div class="accountPage">
    <TabberTop :title="title"></TabberTop>
    <div class="card_wrap">
      <p class="card_name">账户余额(元)</p>
      <div class="card_moneywrap">
        <span class="card_money"
          >{{ moneyB }}<span class="card_money_detail">{{ moneyS }}</span></span
        ><van-button type="default" @click="toTixian">提现</van-button>
      </div>
    </div>
    <div class="list_wrap">
      <div
        class="list_box"
        @click="getWay(item.way)"
        v-for="(item, index) in listMeua"
        :key="index"
      >
        <div class="list_content">{{ item.content }}</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-dialog v-model="show" title="小程序码" show-cancel-button>
      <img src="../../assets/images/QR_code.jpg" style="width: 100%" />
    </van-dialog>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
import apiData from "@/api/apiData";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "账户余额",
      listMeua: [
        { content: "资金明细", way: "moneyDetail" },
        { content: "提现记录", way: "withdrawalRecord" },
      ],
      moneyB: null,
      moneyS: ".00",
      show: false, //显示小程序码
    };
  },
  components: {
    TabberTop,
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getWalletDetail();
  },
  methods: {
    /**
     *获取钱包余额
     */
    async getWalletDetail() {
      const params = {
        member_no: this.$api.member_no,
      };
      const result = await apiData.my.getWallet(params);
      console.log(result.data);
      let balance = result.data.wallet.balance;
      console.log(balance);
      let money = String(balance).split(".");
      console.log(money);

      if (money.length > 1) {
        this.moneyB = money[0];
        this.moneyS = "." + money[1];
      } else {
        this.moneyB = money[0];
      }
    },
    /**
     * 跳转
     */
    getWay(e) {
      const path = "/" + e;
      this.$router.push({
        path,
      });
    },
    //跳转提现提示
    toTixian() {
      this.show = true;
      setTimeout(() => {
        Toast("暂不支持提现,请到小程序端进行操作");
      }, 500);
    }
  },  
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.accountPage {
  background-color: #f9f9f9;
  height: 100vh;
}
.card_wrap {
  width: 6.86rem;
  height: 2.56rem;
  border-radius: 5px;
  margin: auto;
  box-shadow: 2px 5px 5px #d9d9d9;
  background-image: linear-gradient(to right top, #914CDF, #914CDF);
  color: #ffffff;
  .card_name {
    font-size: 0.4rem;
    padding: 0.44rem 0 0.44rem 0.4rem;
  }
  .card_moneywrap {
    padding-left: 0.4rem;
    padding-right: 0.22rem;
    display: flex;
    justify-content: space-between;
    .card_money {
      font-size: 1rem;
    }
    .card_money_detail {
      font-size: 0.5rem;
    }
    /deep/ .van-button--default {
      height: 26px;
      border-radius: 4px;
      font-size: 0.3rem;
      padding: 0 0.38rem;
      color: #914CDF;
      //font-weight: 600;
    }
  }
}
/*列表*/
.list_wrap {
  margin-top: 0.24rem;
  .list_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.44rem;
    padding-right: 0.24rem;
    height: 0.8rem;
    margin-bottom: 0.14rem;
    background-color: #ffffff;
    .list_content {
      font-size: 0.4rem;
    }
    /deep/ .van-icon-arrow {
      font-size: 0.32rem;
    }
  }
}
</style>