<template>
  <div class="vote">
    <!-- <div class="top">
      <img src="../assets/index-img/back.png" alt="" @click="back" />
      <div>发起投票</div>
      <img
        src="../assets/index-img/more.png"
        alt=""
        style="width: 29px; height: 7px"
      />
    </div> -->
  <TabberTop :title="pageTitle"></TabberTop>

    <div class="list">
      <div class="left">投票标题</div>
      <input
        type="text"
        placeholder="最多25个字"
        placeholder-style="color:#9A9A9A;text-align:right"
        maxlength="25"
        v-model="title"
      />
    </div>
    <!-- 菜单栏 -->
    <div class="tab">
      <div
        v-for="(item, index) in tabs"
        :class="index == current ? 'active' : 'tab-item'"
        @click="clickmeu(index)"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <!-- 文字投票 -->
    <template v-if="current == 0">
      <div class="list" v-for="(item, index) in listIndex" :key="index">
        <div class="left">选项{{ index + 1 }}</div>
        <input
          type="text"
          placeholder="最多20个字"
          placeholder-style="color:#9A9A9A;text-align:right"
          maxlength="20"
          v-model="item.value"
        />
        <img src="../assets/index-img/del.png" alt="" @click="del(index)" />
      </div>
      <div class="list" @click="add"><div class="add">添加选项</div></div>
      <div class="list">
        <div class="left">单选多选</div>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1" checked-color="#914CDF">单选</van-radio>
          <van-radio name="2" checked-color="#914CDF">多选</van-radio>
        </van-radio-group>
      </div>
    </template>
    <!-- 图片投票 -->
    <template v-if="current == 1">
      <div class="list" style="justify-content: space-around">
        <div class="left" style="width: 140px">
          <van-uploader
            v-model="fileList"
            multiple
            :max-count="1"
            :after-read="afterRead"
          />
          <input
            type="text"
            placeholder="请输入图片标题"
            v-model="imgTitle1"
            style="display: block; width: 140px"
          />
        </div>
        <div class="left" style="width: 140px">
          <van-uploader
            v-model="fileList2"
            multiple
            :max-count="1"
            :after-read="afterRead2"
          />
          <input
            type="text"
            placeholder="请输入图片标题"
            v-model="imgTitle2"
            style="display: block; width: 140px"
          />
        </div>
      </div>
    </template>
    <div class="list">
      <div class="left">投票开始时间</div>
      <van-field
        v-model="timeValue"
        placeholder="选择开始时间"
        readonly
        @click="showPopFn()"
        style="width: 40%"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @change="changeFn()"
          @confirm="confirmFn()"
          @cancel="cancelFn()"
        />
      </van-popup>
    </div>
    <div class="list">
      <div class="left">投票结束时间</div>
      <van-field
        v-model="timeValue2"
        placeholder="选择结束时间"
        readonly
        @click="showPopFn2()"
        style="width: 40%"
      />
      <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate2"
          type="date"
          @change="changeFn2()"
          @confirm="confirmFn2()"
          @cancel="cancelFn2()"
        />
      </van-popup>
    </div>
    <div class="foot" @click="submit">发起投票</div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";

export default {
  data() {
    return {
      title: "",
      current: 0,
      tabs: ["文字投票", "图片投票"],
      listIndex: [
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
      ],
      radio: "1",
      msg: "",
      currentDate: new Date(),
      changeDate: new Date(),
      show: false, // 用来显示弹出层
      timeValue: "",
      currentDate2: new Date(),
      changeDate2: new Date(),
      show2: false, // 用来显示弹出层
      timeValue2: "",
      fileList: [],
      fileList2: [],
      imgTitle1: "",
      imgTitle2: "",
      imgList: "",
      imgList2: "",
      pageTitle:'发起投票'
    };
  },
   components: {
    TabberTop,
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    //点击菜单
    clickmeu(id) {
      this.current = id;
    },
    // 删除
    del(id) {
      console.log(id);
      var listIndex = this.listIndex;
      if (listIndex.length > 1) {
        var arr = listIndex.splice(id, 1);
        console.log(listIndex);
        this.listIndex = listIndex;
      }
    },
    // 添加
    add() {
      var listIndex = this.listIndex;
      if (listIndex.length < 6) {
        var arr = listIndex.push({ id: listIndex.length + 1, value: "" });
        this.listIndex = listIndex;
      }
    },
    //上传图片
    afterRead(file) {
      this.uploadImg(file);
    },
    //上传图片
    afterRead2(file) {
      this.uploadImg2(file);
    },
    // 提交
    submit() {
      if (!this.title) {
        this.$toast.center("请填写标题");
        return false;
      }
      if (this.current == 0) {
        //文字
        if (!this.listIndex[0].value) {
          this.$toast.center("请输入选项");
          return false;
        }
      } else {
        if (!this.imgList) {
          this.$toast.center("请上传左侧图片");
          return false;
        }
        if (!this.imgList2) {
          this.$toast.center("请上传右侧图片");
          return false;
        }
        if (!this.imgTitle1) {
          this.$toast.center("请填写左侧图片标题");
          return false;
        }
        if (!this.imgTitle2) {
          this.$toast.center("请填写右侧图片标题");
          return false;
        }
      }
      if (!this.timeValue) {
        this.$toast.center("请选择开始时间");
        return false;
      }
      if (!this.timeValue2) {
        this.$toast.center("请选择结束时间");
        return false;
      }
      let data = {
        current: this.current,
        title: this.title,
        listIndex: this.listIndex,
        radio: this.radio,
        timeValue: this.timeValue,
        timeValue2: this.timeValue2,
        imgTitle1: this.imgTitle1,
        imgTitle2: this.imgTitle2,
        imgList: this.imgList,
        imgList2: this.imgList2,
      };
      //返回
      this.$router.push({ path: "./postNote", query: data });
    },
    /**
     * 上传图片
     */
    uploadImg(file) {
      // 创建form对象
      let formdata = new FormData();
      // 通过append向form对象添加数据,可以通过append继续添加数据
      formdata.append("file", file.file);
      //设置请求头
      let config = {
        headers: {
          token: "D525873E45AF421980F6838963CBD98E",
          "Content-Type": "multipart/form-data",
        },
      };
      this.Axios.post("/api/upload/uploadFile", formdata)
        .then((res) => {
          //这里的url为后端接口
          console.log(res.data);
          //res 为接口返回值
          if (res.data.code == 200) {
            this.imgList = apiData.imgUrl + res.data.data;
          }
        })
        .catch(() => {});
    },
    uploadImg2(file) {
      // 创建form对象
      let formdata = new FormData();
      // 通过append向form对象添加数据,可以通过append继续添加数据
      formdata.append("file", file.file);
      //设置请求头
      let config = {
        headers: {
          token: "D525873E45AF421980F6838963CBD98E",
          "Content-Type": "multipart/form-data",
        },
      };
      this.Axios.post("/api/upload/uploadFile", formdata)
        .then((res) => {
          //这里的url为后端接口
          console.log(res.data);
          //res 为接口返回值
          if (res.data.code == 200) {
            this.imgList2 = apiData.imgUrl + res.data.data;
          }
        })
        .catch(() => {});
    },
    showPopFn() {
      this.show = true;
    },
    showPopup() {
      this.show = true;
    },
    changeFn() {
      // 值变化是触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() {
      // 确定按钮
      this.timeValue = this.timeFormat(this.currentDate);
      this.show = false;
    },
    cancelFn() {
      this.show = true;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    showPopFn2() {
      this.show2 = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    changeFn2() {
      // 值变化是触发
      this.changeDate2 = this.currentDate2; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn2() {
      // 确定按钮
      this.timeValue2 = this.timeFormat(this.currentDate2);
      this.show2 = false;
    },
    cancelFn2() {
      this.show2 = true;
    },
    timeFormat2(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
  },
  mounted() {
    this.timeFormat(new Date());
  },
};
</script>

<style scoped lang="less">
.vote {
  background: #f9f9f9;
  padding-bottom: 30px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 520;
    color: rgba(0, 0, 0, 1);
    padding: 10px 20px;
    border-bottom: 6px solid #f9f9f9;
    background: #ffffff;
    img {
      width: 11px;
      height: 18px;
    }
  }
  .list {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    margin-bottom: 3px;
    .left {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 550;
      color: rgba(22, 22, 22, 1);
      input {
        text-align: left;
      }
    }
    input {
      text-align: right;
    }
    img {
      width: 19px;
      height: 18px;
    }
    .add {
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 550;
      color: #914CDF;
      width: 100%;
    }
  }
  .tab {
    display: flex;
    height: 40px;
    font-size: 14px;
    line-height: 35px;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    justify-content: space-around;
    align-items: center;
    margin-top: 3px;
    margin-bottom: 3px;
    background: #ffffff;
    .tab-item {
      display: inline-block;
      width: 30%;
      text-align: center;
      font-size: 16px;
      color: #777777;
      box-sizing: border-box;
    }
    .active {
      width: 30%;
      color: #914CDF;
      text-align: center;
      font-size: 16px;
      border-bottom: 2px solid #914CDF;
      font-weight: 550;
    }
  }
  .foot {
    width: 100px;
    height: 30px;
    margin: 70px auto;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(to right, #914CDF, #914CDF);
  }
}
</style>