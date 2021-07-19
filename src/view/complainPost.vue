<template>
  <div class="container">
    <TabberTop :title='title'></TabberTop>
    <img :src="imgUrl" class="banner" alt="" v-if="imgUrl" />
    <van-form @submit="onSubmit" label-width="60/375 * 100vw">
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
        v-model="name"
        name="姓名"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-cell
        is-link
        title="性别"
        @click="show = true"
        class="input"
        :value="sex"
      />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-field
        maxlength="11"
        input-align="right"
        class="input"
        v-model="mobileNo"
        name="手机"
        label="手机"
        placeholder="请输入手机号码"
      />
      <van-field
        input-align="right"
        class="input"
        v-model="complaintObject"
        name="投诉对象"
        label="投诉对象"
        placeholder="请输入投诉对象"
      />
      <van-cell
        maxlength="15"
        is-link
        title="投诉问题"
        @click="showProblem = true"
        class="input"
        :value="complaintProblem"
      />
      <!-- 弹起选项框 -->
      <van-action-sheet
        v-model="showProblem"
        :actions="ProblemActions"
        @select="onSelectProblem"
      />
      <!-- 弹起自定义的框 -->
      <van-dialog v-model="problemContent" @confirm="problemObjectConfirm">
        <van-field
          maxlength="15"
          v-model="problemSelectValue"
          label="投诉问题"
          placeholder="请输入投诉问题"
        />
      </van-dialog>
      <van-field
        input-align="right"
        v-model="amount"
        name="涉及金额"
        label="涉及金额"
        placeholder="请输入涉及金额"
        type="number"
      />
      <div class="t_f_box">
        <van-field
          class="t_f_i"
          v-model="title"
          rows="2"
          autosize
          type="textarea"
          maxlength="40"
          placeholder="概括核心问题，最好包含项目名以便为您解决(最多40个字)"
          show-word-limit
        />
        <van-field
          class="t_f_i"
          v-model="content"
          rows="5"
          type="textarea"
          maxlength="500"
          placeholder="请您依据实际情况详细描述投诉事由(不少于20字)。禁止发布违反法律行政法规及不文明内容。捏造事实、诬陷诽谤他人、泄露他人隐私的投诉单有可能被驳回。"
          show-word-limit
        />
        <!-- 图片上传 -->
        <van-uploader
          style="margin-top: 10px"
          v-model="fileList"
          :max-count="6"
          :before-delete="deleteFile"
          :before-read="beforeRead"
          :after-read="asyncBeforeRead"
          :disabled="upLoadState"
        />
        <!-- :before-delete="deleteFile" -->
      </div>
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
      <van-field
        name="switch"
        label="是否隐藏证据"
        input-align="right"
        label-width="88px"
        class="isDisplay"
      >
        <template #input>
          <van-switch v-model="isHide" size="20" active-color="#834dd6" />
        </template>
      </van-field>
      <div class="tips">
        <van-checkbox
          v-model="checked"
          checked-color="#914CDF"
          icon-size="15px"
        ></van-checkbox>
        <span class="consent">同意</span>
        <span class="agreement" @click="isShowAgreement = true"
          >《第一房投诉平台协议》</span
        >
      </div>

      <div class="submit" @click="submit">提交</div>
    </van-form>
    <van-action-sheet
      v-model="isShowAgreement"
      title="《第一房投诉平台用户协议》"
    >
      <div class="content" v-html="agreementContent"></div>
    </van-action-sheet>
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
      name: "", //姓名
      mobileNo: "", //手机号
      sex: "", //性别
      complaintObject: "", //投诉对象
      complaintProblem: "", //投诉问题
      amount: "", //涉案金额
      checked: false, //是否阅读
      areaValue: "",
      problemSelectValue: "", //自定义的投诉对象
      isHide: false, //是否隐藏证据
      showArea: false,
      title: "", //标题
      content: "", //内容
      areaList, // 数据格式见 Area 组件文档
      show: false,
      showProblem: false,
      actions: [{ name: "男" }, { name: "女" }, { name: "保密" }],
      ProblemActions: [
        { name: "无证售房" },
        { name: "延期交房" },
        { name: "房屋漏水" },
        { name: "物业太差" },
        { name: "捆绑销售" },
        { name: "虚假销售" },
        { name: "烂尾" },
        { name: "自定义" },
      ],
      problemContent: false, //显示自定义内容弹框
      imgArr: [], //图片数组
      fileList: [],
      accessoryList: [], //文件数组
      isShowAgreement: false,
      agreementContent: "", //投诉协议内容
      activityId: "", //当前投诉的id
      imgUrl: "", //当前投诉的图片
      isUpfile: false, //是否正在上传
      isSuccess: false, //判断是否继续需要保存数据
      upLoadState: false, //是否能上传
      title:'投诉上传'
    };
  },
  created() {
    this.activityId = this.$route.query.activityId;
  },
  mounted() {
    this.getAgreement();
    this.activityId ? this.getPhoto() : "";
    this.judgeLogin();
  },
  methods: {
    //获取图片
    async getPhoto() {
      let params = `activityId=${this.activityId}`;
      const res = await apiData.activityImg.img(params);
      this.imgUrl = res.data;
    },
    // 判断是否登陆
    judgeLogin() {
      console.log(apiData.member_no === "");
      if (apiData.member_no === "") {
        Toast("未登录");
        this.$router.push("/login");
      }
    },
    // 获取回显呢内容
    getPostContent() {
      let {
        province,
        city,
        area,
        name,
        mobileNo,
        sex,
        complaintObject,
        complaintProblem,
        amount,
        checked,
        isHide,
        title,
        content,
        accessoryList,
        imgArr,
      } = this.$store.state.postContent;
      this.province = province;
      this.city = city;
      this.area = area;
      this.name = name;
      this.mobileNo = mobileNo;
      this.sex = sex;
      this.complaintObject = complaintObject;
      this.complaintProblem = complaintProblem;
      this.amount = amount;
      this.checked = checked;
      this.isHide = isHide;
      this.title = title;
      this.content = content;
      this.accessoryList = accessoryList;
      this.imgArr = imgArr;
      console.log(this.$store.state.postContent);
      let arr = [];
      // 图片回显
      if (imgArr !== "") {
        for (let i = 0; i < imgArr.length; i++) {
          arr.push({ url: imgArr[i].imageUrl });
        }
        this.fileList = arr;
      }
      if (province) {
        this.areaValue = province + "\xa0" + city + "\xa0" + area;
      }
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onSelect(item) {
      this.show = false;
      this.sex = item.name;
    },
    // 选择投诉问题弹框
    onSelectProblem(item) {
      if (item.name === "自定义") {
        this.problemContent = true;
      } else {
        this.showProblem = false;
        this.complaintProblem = item.name;
      }
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
    // 自定义投诉问题
    problemObjectConfirm() {
      this.complaintProblem = this.problemSelectValue;
      this.problemSelectValue = "";
      this.showProblem = false;
    },
    // 上传图片前的验证
    beforeRead(file) {
      return true;
    },
    async deleteFile(file, detail) {
      return new Promise((resolve, reject) => {
        this.$dialog
          .confirm({
            message: "确认删除图片？",
          })
          .then(() => {
            // 存放图片的数组
            this.imgArr.splice(detail.index, 1);
            Toast.success("删除成功");
            console.log(this.imgArr);
            resolve();
          })
          .catch((error) => {
            Toast.fail("已取消");
            reject(error);
          });
      });
    },
    // 上传图片
    asyncBeforeRead(file) {
      console.log(file, "图片");
      this.upLoadState = true;
      let formdata = new FormData();
      formdata.append("file", file.file);
      axios
        .post("/api/upload/uploadFile", formdata)
        .then((res) => {
          if (res.code == 200) {
            Toast.success("上传成功");
            this.imgArr.push({ imageUrl: apiData.imgUrl + res.data });
            this.upLoadState = false;
          }
        })
        .catch((err) => {
          Toast.fail("上传失败");
        });
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
    //获取投诉协议
    async getAgreement() {
      const res = await apiData.complainAgreement.agreement();
      this.agreementContent = res.data.content;
    },
    // 提交
    async submit() {
      let {
        province,
        city,
        area,
        name,
        mobileNo,
        sex,
        complaintObject,
        complaintProblem,
        amount,
        checked,
        isHide,
        title,
        content,
        accessoryList,
        imgArr,
      } = this;
      if (!checked) {
        Toast("请阅读平台协议");
        return;
      } else {
        let imgStr = [];
        let accessoryStr = [];
        accessoryList.forEach((v) => {
          accessoryStr.push(v.imageUrl);
        });
        imgArr.forEach((v) => {
          imgStr.push(v.imageUrl);
        });
        imgStr = imgStr.join();
        console.log(imgArr);
        accessoryStr = accessoryStr.join();
        isHide = isHide == true ? "is" : "not";
        if (!name) {
          Toast("姓名不能为空");
          return;
        } else if (!sex) {
          Toast("性别不能为空");
          return;
        } else if (!mobileNo || !this.isPhone(mobileNo)) {
          Toast("手机号填写不正确");
          return;
        } else if (!complaintObject) {
          Toast("投诉对象不能为空");
          return;
        } else if (!complaintProblem) {
          Toast("投诉问题不能为空");
          return;
        } else if (!province && !city && !area) {
          Toast("地区不能为空");
          return;
        } else if (!title) {
          Toast("标题不能为空");
          return;
        } else if (!content) {
          Toast("内容不能为空");
          return;
        }
        let params = {
          name,
          sex,
          mobileNo,
          complaintObject,
          complaintProblem,
          province,
          city,
          area,
          amount,
          title,
          content,
          picture: imgStr,
          other: accessoryStr,
          isHide,
          memberNo: apiData.member_no,
          activityId: Number(this.activityId),
        };
        const res = await apiData.complainForm.form(params);
        console.log(res);
        if (res.code === 200) {
          Toast.success("投诉已提交");
          // this.isSuccess = true;
          setTimeout(() => {
            this.$router.push("/complain");
          }, 1000);
        } else {
          Toast.fail(res.data);
        }
      }
    },
  },
  components:{
    TabberTop
  }
  // beforeDestroy() {
  //   if (!this.isSuccess) {
  //     let {
  //       province,
  //       city,
  //       area,
  //       name,
  //       mobileNo,
  //       sex,
  //       complaintObject,
  //       complaintProblem,
  //       amount,
  //       checked,
  //       isHide,
  //       title,
  //       content,
  //       accessoryList,
  //       imgArr,
  //     } = this;
  //     let params = {
  //       province,
  //       city,
  //       area,
  //       name,
  //       mobileNo,
  //       sex,
  //       complaintObject,
  //       complaintProblem,
  //       amount,
  //       checked,
  //       isHide,
  //       title,
  //       content,
  //       accessoryList,
  //       imgArr,
  //     };
  //     // for (let key in params) {
  //     //   if (typeof params[key] === "undefined") {
  //     //     params[key] = "";
  //     //   } else if (typeof params[key] === "object") {
  //     //     params[key] = [];
  //     //   }
  //     // }
  //     this.$store.commit("setPostContent", params);
  //   }
  // },
};
</script>

<style scoped lang="less">
.container {
  background: #f9f9f9;
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
