<template>
  <div class="post">
    <TabberTop :title="pageTitle"></TabberTop>
    <!-- <div class="top">
      <img src="../assets/index-img/back.png" alt="" @click="back" />
      <div>发布快讯</div>
      <img
        src="../assets/index-img/more.png"
        alt=""
        style="width: 29px; height: 7px; opacity: 0"
      />
    </div> -->

    <div class="list">
      <div class="title">快讯标题</div>
      <textarea
        name=""
        id="title"
        maxlength="30"
        @input="descInput"
        placeholder="请输入标题"
        v-model="title"
        prop="title"
      ></textarea>
      <span class="numberV">{{ txtVal }}/30</span>
    </div>

    <div class="list">
      <div class="title">快讯内容</div>
      <textarea
        name=""
        id="content"
        maxlength="245"
        @input="descInput1"
        v-model="content"
        placeholder="请输入内容"
        style="height: 133px"
        prop="content"
      ></textarea>
      <span class="numberV">{{ txtVal1 }}/245</span>
    </div>

    <button @click="submitForm">发布</button>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";

export default {
  name: "post",

  data() {
    return {
      txtVal: 0,
      txtVal1: 0,
      title: "",
      content: "",
      loginman: "",
pageTitle:'发布快讯'

    };
  },
  mounted() {
    //  this.loginman = localStorage.getItem('loginman',loginman);
    //  console.log(this.loginman)
  },
  methods: {
    descInput() {
      //标题数
      this.txtVal = this.title.length;
    },
    descInput1() {
      //内容数
      this.txtVal1 = this.content.length;
    },
    //返回
    back() {
      this.$router.go(-1); //返回上一层
    },
    //验证
    async submitForm() {
      if (!this.title.trim()) {
        this.$toast.center("请输入标题");
        return false;
      }
      console.log(this.content);
      if (!this.content.trim()) {
        this.$toast.center("请输入内容");
        return false;
      }0
      // 发布快讯
      const params = {
        member_no: this.$api.member_no, //this.loginman.member_no,
        type: 5, //1笔记 5快讯
        title: this.title, //标题
        spu_no: "", //商品spu_no
        spu_name: "", //商品名
        category_choice: "", //1 房产
        videoUrls: "", //视频
        memberNoteArticle: { content: this.content }, //内容
        memberNoteArticleImageList: [],
        memberArtVote: {},
      };
     
      let data = `context=${this.title + this.content}&memberNo=${this.$api.member_no}`
      console.log(apiData);
      const result = await apiData.getChecktext.gct(data);
      console.log("84", result);
      if (result.code == 200) {
        const data = await apiData.kuaixun.getData(params);
        console.log(data);
        if (data.code == 200) {
          this.$toast.center(data.data);
          let self = this;
          setTimeout(() => {
            this.$router.go(-1); //返回上一层
          }, 1500);
        }
      } else {
        this.$toast.center(result.message);
      }
    },
  },
  components: {
    TabberTop,
  },
};
</script>

<style scoped lang='less'>
.post {
  height: 100vh;
  width: 100vw;
background: #F9F9F9;
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
    img {
      width: 11px;
      height: 18px;
    }
  }
  .list {
    background-color: #fff;
    padding: 10px 30px 8px 25px;
    border-bottom: 6px solid #f9f9f9;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
    textarea {
      width: 100%;
      height: 60px;
      border-radius: 3px;
      border: 1px solid #979797;
      margin-top: 10px;
      padding: 6px 10px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 20px;
    }
    span {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      color: #848484;
    }
  }
  button {
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    border-radius: 4rpx;
    background: linear-gradient(to right, #914CDF, #914CDF);
    margin: 0 auto;
    display: block;
    margin-top: 110px;
  }
}
</style>