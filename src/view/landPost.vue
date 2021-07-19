<template>
  <div class="container">
    <TabberTop :title="title"></TabberTop>
    <van-form label-width="60/375 * 100vw">
      <van-field
        style="margin: 0 0 5px 0"
        class="input van-cell__right-icon"
        input-align="right"
        readonly
        clickable
        name="area"
        :value="areaValue"
        label="城市"
        placeholder="请选择城市"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        maxlength="15"
        input-align="right"
        class="input"
        v-model="demandName"
        name="需求名称"
        label="需求名称"
        placeholder="请输入需求名称"
      />

      <van-cell
        is-link
        title="需求类型"
        @click="show = true"
        class="input"
        :value="demandState"
      />
      <van-field
        maxlength="15"
        input-align="right"
        class="input"
        v-model="name"
        name="姓名"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-field
        maxlength="11"
        input-align="right"
        class="input"
        v-model="mobile"
        name="手机"
        label="手机"
        placeholder="请输入手机号码"
      />
      <van-field
        input-align="right"
        v-model="company"
        name="单位名称"
        label="单位名称"
        placeholder="请输入单位名称"
      />
      <!-- 上传附件  -->
      <div class="accessory">
        <div class="accessory_text">上传附件</div>
        <van-uploader
          v-model="accessoryList"
          accept="audio/*,video/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.documentimage/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :preview-image="false"
          :after-read="beforeAccessory"
          :before-read="beforeReadAccessory"
        >
          <img class="accessory_img" src="../assets/images/upload.png" alt="" />
        </van-uploader>
      </div>
      <div class="submit" @click="submit">提交</div>
    </van-form>
  </div>
</template>


<script>
import { areaList } from "@vant/area-data";
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
import { Dialog, Toast, Switch } from "vant";
import axios from "../api/axios";
export default {
  data() {
    return {
      province: "", //省
      city: "", //市
      area: "", //区
      value: "",
      name: "",
      demandName: "",
      mobile: "",
      demandState: "",
      company: "",
      areaValue: "",
      showArea: false,
      areaList, // 数据格式见 Area 组件文档
      show: false,
      showProblem: false,
      actions: [{ name: "买地" }, { name: "卖地" }],
      problemContent: false, //显示自定义内容弹框
      fileList: [],
      accessoryList: [], //文件数组
      isShowAgreement: false,
      agreementContent: "", //投诉协议内容
      activityId: "", //当前投诉的id
      isUpfile: false, //是否正在上传
      isSuccess: false, //判断是否继续需要保存数据
      upLoadState: false, //是否能上传
      title: "土地并购",
    };
  },
  created() {
    this.activityId = this.$route.query.activityId;
  },
  mounted() {
    this.judgeLogin();
  },
  methods: {
    // 判断是否登陆
    judgeLogin() {
      console.log(apiData.member_no === "");
      if (apiData.member_no === "") {
        Toast("未登录");
        this.$router.push("/login");
      }
    },
    onSelect(item) {
      this.show = false;
      this.demandState = item.name;
    },
    // 选择城市
    onConfirm(values) {
      console.log(values);
      this.province = values[0].name;
      this.city = values[1].name;
      this.area = values[2].name;
      this.areaValue = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join(" ");
      this.showArea = false;
    },
    // 上传附件前的验证
    beforeAccessory(file) {
      return true;
    },
    isClose() {
      if (this.isUpfile) {
        Toast.loading({
          message: "上传中...",
          onClose: this.isClose,
        });
      }
    },
    // 附件上传
    beforeReadAccessory(file) {
      console.log(file);
      let formdata = new FormData();
      formdata.append("file", file);
      Toast.loading({
        message: "上传中...",
        onClose: this.isClose,
        forbidClick: true,
      });
      this.isUpfile = true;
      axios
        .post("/api/upload/uploadFile", formdata)
        .then((res) => {
          if (res.code == 200) {
            Toast.success("上传成功");
            this.isUpfile = false;
            this.accessoryList = [];
            this.accessoryList.push({ imageUrl: apiData.imgUrl + res.data });
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.fail("上传失败");
        });
    },
    //正则校验手机号
    isPhone(phone) {
      var myreg = /^1[3-9]\d{9}$/;
      if (!myreg.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    // 提交
    async submit() {
      let {
        city,
        demandName,
        demandState,
        company,
        name,
        mobile,
        accessoryList,
      } = this;

      let imgStr = [];
      let accessoryStr = [];
      accessoryList.forEach((v) => {
        accessoryStr.push(v.imageUrl);
      });
      accessoryStr = accessoryStr.join();
      if (!city) {
        Toast("地区不能为空");
        return;
      } else if (!demandName) {
        Toast("需求名称不能为空");
        return;
      } else if (!demandState) {
        Toast("需求类型不能为空");
        return;
      } else if (!name) {
        Toast("姓名不能为空");
        return;
      } else if (!mobile || !this.isPhone(mobile)) {
        Toast("手机号填写不正确");
        return;
      }
      let params = {
        city,
        demandName,
        demandState: demandState === "买地" ? "buy" : "sale",
        company,
        name,
        mobile,
        other: accessoryStr,
        memberNo: apiData.member_no,
      };
      const res = await apiData.landPost.landForm(params);
      console.log(res);
      if (res.code === 200) {
        Toast.success("投诉已提交");
        setTimeout(() => {
          this.$router.push("/land");
        }, 1000);
      } else {
        Toast.fail(res.data);
      }
    },
  },
  components: {
    TabberTop,
  },
};
</script>

<style scoped lang="less">
.container {
  background: #f9f9f9;
  height: 100vh;
  overflow: hidden;
  .banner {
    width: 100vw;
    margin-bottom: 5/375 * 100vw;
  }
  .input {
    box-sizing: border-box;
    width: 100vw;
    min-height: 50/375 * 100vw;
    margin-bottom: 5/375 * 100vw;
    background: left / 2% url("../assets/images/redDot.png") no-repeat;
    background-position: 10/375 * 100vw 18/375 * 100vw;
    border-bottom: 1/375 * 100vw solid transparent;
    background-color: #fff;
  }
  .van-cell {
    padding: 10/375 * 100vw 20/375 * 100vw 10/375 * 100vw 25/375 * 100vw;
  }
  .van-cell::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16/375 * 100vw;
    border-bottom: 0/375 * 100vw solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  /deep/ .van-field__error-message {
    text-align: right;
  }
  .t_f_box {
    background-color: #fff;
    padding: 15/375 * 100vw 20/375 * 100vw;
    margin-top: 5/375 * 100vw;
    .t_f_i {
      border-radius: 5/375 * 100vw;
      border: 1/375 * 100vw solid #979797;
      &:nth-child(1) {
        height: 109/375 * 100vw;
      }
      &:nth-child(2) {
        margin-top: 5/375 * 100vw;
        height: 171/375 * 100vw;
      }
    }
  }
  .accessory {
    margin-top: 5/375 * 100vw;
    box-sizing: border-box;
    width: 100%;
    height: 80/375 * 100vw;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25/375 * 100vw;
    .accessory_text {
      width: 100/375 * 100vw;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 14/375 * 100vw;
      color: #161616;
    }
    .accessory_img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64/375 * 100vw;
      height: 64/375 * 100vw;
    }
  }
  .isDisplay {
    margin-top: 5/375 * 100vw;
    box-sizing: border-box;
    width: 100vw;
    min-height: 50/375 * 100vw;
    background-color: #fff;
  }
  /deep/ .van-field__label {
    color: #161616;
  }

  .tips {
    width: 100%;
    padding-left: 25/375 * 100vw;
    margin-top: 20/375 * 100vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 11/375 * 100vw;
    font-weight: 400;
    color: #777777;
    .agreement {
      color: #9060da;
    }
    .consent {
      margin: 0 7/375 * 100vw;
    }
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 5/375 * 100vw;
    width: 100/375 * 100vw;
    height: 30/375 * 100vw;
    margin: 40/375 * 100vw auto;
    background-image: linear-gradient(to right, #6a29cd, #9060da);
    font-size: 14/375 * 100vw;
  }
  /deep/ .content {
    padding: 16/375 * 100vw 16/375 * 100vw 160/375 * 100vw;
    font-size: 14/375 * 100vw;
    color: #717171;
    line-height: 17/375 * 100vw;
    overflow-y: hidden;
  }
  /deep/ .van-field__control--right {
    font-size: 14/375 * 100vw;
  }
  /deep/ .van-cell__value {
    color: black;
  }
}
</style>
