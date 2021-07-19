<!--  -->
<template>
  <div class="content">
    <TabberTop :title="title"></TabberTop>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        type="tel"
        clearable
        label="手机号码"
        placeholder="请填写手机号码"
        :rules="[{ validator: mobileCheck, message: '请填写正确的手机号码' }]"
      />
      <van-field
        v-model="code"
        name="code"
        center
        clearable
        label="验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button
            color="#914CDF"
            native-type="button"
            @click.self="sendMsg"
            plain
            size="small"
            type="primary"
            v-if="show"
            style="border-radius:6px"
            >发送验证码</van-button
          >
          <van-button color="#EAEAEA" disabled size="small" v-if="!show">
            <van-count-down @finish="finish" :time="time" format="ss 秒" />
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="newPas"
        clearable
        maxlength="6"
        type="password"
        name="newPas"
        label="支付密码"
        placeholder="请输入6位数字"
        :rules="[{ validator: pwdCheck, message: '请填写正确密码' }]"
      />
      <van-field
        v-model="newPass"
        clearable
        maxlength="6"
        type="password"
        name="newPass"
        label="确认密码"
        placeholder="再次输入支付密码"
        :rules="[{ validator: pwdCheck, message: '请检查支付密码是否为6位' }]"
      />
      <div class="button_bottom">
        <van-button
          color="linear-gradient(to right,#914CDF,#914CDF)"
          type="info"
          native-type="submit"
        >
          完成
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "支付设置",
      time: 5 * 1000, //倒计时
      mobile: null,
      code: null,
      newPas: null,
      newPass: null,
      show: true,
    };
  },
  components: {
    TabberTop,
  },
  computed: mapState({
    member_no: "member_no", // 第一种写法
  }),
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    /**提交修改 */
    async onSubmit(values) {
      if (values.newPas == values.newPass) {
        values.member_no = this.member_no;
        console.log("submit", values);
        console.log(this);
        const res = await this.$api.my.paySet(values);
        this.$toast(res.data);
        setTimeout(() => {
          this.$router.push({
            path: "/my",
          });
        }, 1000);
      } else {
        this.$toast("两次支付密码不一致");
      }
    },
    /** 倒计时结束 */
    finish() {
      this.$toast("倒计时结束");
      this.show = !this.show;
    },
    /**发送验证码 */
    async sendMsg() {
      if (this.mobile) {
        this.show = !this.show;
        this.time = 60 * 1000; //重置倒计时时间
        let params = {
          mobile: this.mobile,
        };
        const res = await this.$api.sendCode(params);
      } else {
        this.$toast("请填写手机号");
      }
    },
    /**函数校验 */
    mobileCheck(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    /**密码校验 */
    pwdCheck(val) {
      if (val && val.length == 6) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.button_bottom {
  margin-top: 4rem;
  text-align: center;
}
/deep/ .van-button--normal {
  width: 2rem;
  height: 0.6rem;
}
.van-count-down {
  color: #848484;
}
.content {
  height: 100vh;
  width: 100vw;
  background: #f9f9f9;
}
.van-field{
  
  margin-bottom: 2/375 * 100vw;
}
</style>