<template>
  <div>
    <TabberTop :title="title"></TabberTop>
    <div class="container">
      <div class="title">欢迎登录</div>
      <div class="titleTwo">第一房</div>
      <div class="content">
        <div class="userPhone">
          <div class="userPhoneName">手机号</div>
          <input
            type="text"
            class="input"
            value=""
            @blur="input"
            placeholder="请输入手机号码"
            v-model="inputValue"
          />
        </div>
        <div class="password">
          <div class="userPhoneName">验证码</div>
          <input
            value=""
            type="number"
            class="input"
            v-model="pswValue"
            @blur="password"
            placeholder="请输入验证码"
          />
          <div class="code" @click="sendMsg" v-if="!disabled">
            {{ codeText }}
          </div>
          <div :class="disabled ? 'codeActive' : ''" v-if="disabled">
            {{ codeText }}
          </div>
        </div>
      </div>
      <div class="btn" @click="login">登录</div>
      <div class="tips">
        <van-checkbox
          v-model="checked"
          checked-color="#914CDF"
          icon-size="15px"
        ></van-checkbox
        ><i style="margin-left: 5px">同意</i
        ><i class="active" @click="$router.push('/userAgreement')"
          >《用户协议》</i
        ><i class="active" @click="$router.push('/privacyAgreement')"
          >《隐私协议》</i
        >并授权第一房获取本机号码
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";

export default {
  data() {
    return {
      data: 123,
      inputValue: "", //输入框的值
      pswValue: "", //密码框的值
      disabled: false, //是否禁用
      codeText: "获取验证码", //
      currentTime: 0, //
      projectNo: "", //项目编号
      checked: false, //是否勾选同意协议
      title: "手机号登录",
    };
  },
  onLoad(options) {},
  methods: {
    /**
     * 登录
     */
    async login() {
      if (!this.checked) return Toast("请阅读协议并同意授权");
      const params = { mobile: this.inputValue, code: this.pswValue };
      if (this.inputValue && this.pswValue) {
        let result = await apiData.mobileLogin.getMobileLogin(params);
        if (result.code == 200) {
          Toast("登录成功");
          localStorage.setItem("member", JSON.stringify(result.data));
          this.$api.member_no = JSON.parse(localStorage.getItem("member"))
            ? JSON.parse(localStorage.getItem("member")).member_no
            : "";
          console.log(this.$store);
          this.$store.commit("setUserInfo", result.data);
          setTimeout(() => {
            this.$router.push("/note");
          }, 1000);
        } else {
          Toast(result.message);
        }
      } else {
        Toast("请正确填写手机号和验证码");
      }
    },
    /**
     * 获取验证码
     */
    async getMobileCode() {
      const params = { mobile: this.inputValue };
      let result = await apiData.mobileCode.getMobileCode(params);
      if (result.code == 200) {
        this.waitCode();
        setTimeout(() => {
          this.disabled = true;
        }, 1000);
      } else {
        Toast(result.message);
      }
    },
    input(e) {},
    password(e) {},
    /**
     * 发送验证码函数
     */
    sendMsg() {
      let v = this.inputValue;
      if (v.trim() === "" || !/^1[3456789]\d{9}$/.test(v)) {
        this.$toast.center("请正确填写手机号");
        this.inputValue = "";
      } else {
        this.getMobileCode();
      }
    },
    /**
     * 验证码定时器
     */
    waitCode() {
      let interval;
      let currentTime = 60;
      interval = setInterval(() => {
        currentTime--;
        this.codeText = currentTime + "s";
        if (currentTime <= 0) {
          clearInterval(interval);
          this.codeText = "获取验证码";
          this.currentTime = 60;
          this.disabled = false;
        }
      }, 1000);
    },
  },
  components: {
    TabberTop,
  },
};
</script>

<style lang="less" scoped>
//  vw (@px) {
//     return (px / 375) * 100vw;
//  }
.container {
  box-sizing: border-box;
  height: 100vh calc(100vh - 0.88rem);
  width: 100vw;
  .title {
    padding: 75/375 * 100vw 0 0 43/375 * 100vw;
    font-size: 26 /375 * 100vw;
    font-weight: 500;
  }
  .titleTwo {
    margin: 8/375 * 100vw 0 0 43/375 * 100vw;
    font-size: 26/375 * 100vw;
    font-weight: 500;
  }
  .content {
    margin-top: 52/375 * 100vw;
    padding: 0 20/375 * 100vw;
    .userPhone {
      display: flex;
      align-items: center;
      width: 100%;
      height: 58/375 * 100vw;
      border-bottom: 1/375 * 100vw solid #eaeaea;
    }
    .userPhoneName {
      width: 75/375 * 100vw;
      font-size: 16/375 * 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .input {
      flex: 1;
      height: 100%;
    }
    .password {
      border-bottom: 1/375 * 100vw solid #eaeaea;
      display: flex;
      align-items: center;
      width: 100%;
      height: 58/375 * 100vw;
    }
    .code {
      box-sizing: border-box;
      z-index: 99;
      position: absolute;
      right: 20/375 * 100vw;
      top: auto;
      padding: 0 10/375 * 100vw;
      min-width: 70/375 * 100vw;
      max-width: 110/375 * 100vw;
      height: 35/375 * 100vw;
      border-radius: 5/375 * 100vw;
      border: 1/375 * 100vw solid #914cdf;
      font-size: 12/375 * 100vw;
      color: #914cdf;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.btn {
  // position: absolute;
  // bottom: 90 / 375 * 100vw; /* 定位父级的50% */
  // left: 50%;
  // transform: translate(-50%, 0); /*自己的50% */
  margin: 200 / 375 * 100vw auto 0;
  width: 250/375 * 100vw;
  height: 40/375 * 100vw;
  background: #1bb723;
  border-radius: 5/375 * 100vw;
  font-size: 18/375 * 100vw;
  color: #ffffff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tips {
  box-sizing: border-box;
  width: 100vw;
  // position: absolute;
  // bottom: 22 / 375 * 100vw; /* 定位父级的50% */
  // left: 0;
  margin: 52 / 375 * 100vw auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-size: 11/375 * 100vw;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #777777;
}
.active {
  color: #914cdf;
}
.codeActive {
  color: #777777;
  background-color: #eaeaea;
  box-sizing: border-box;
  z-index: 99;
  position: absolute;
  right: 20/375 * 100vw;
  top: auto;
  padding: 0 10/375 * 100vw;
  min-width: 70/375 * 100vw;
  max-width: 110/375 * 100vw;
  height: 35/375 * 100vw;
  border-radius: 5/375 * 100vw;
  font-size: 14/375 * 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
