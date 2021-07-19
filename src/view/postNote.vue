<template>
  <div class="postNode">
    <!-- <div class="top">
      <img src="../assets/index-img/back.png" alt="" @click="back" />
      <div>发布笔记</div>
      <div></div>
     
    </div> -->
    <TabberTop :title="pagetitle"></TabberTop>
    <textarea
      name=""
      id=""
      placeholder=" 分享新鲜事…"
      maxlength="800"
      v-model="value"
    ></textarea>
    <div class="add">
      <!-- <div class='list'><img src="../assets/index-img/camera.png" alt="" style="width:30px;height:24px;"><div>添加图片</div></div> -->
      <div class="list">
        <img
          src="../assets/index-img/camera.png"
          alt=""
          style="width: 30px; height: 24px"
        />
          <van-uploader
          class="postPhoto"
        :file-list="fileList"
        :after-read="afterRead"
        :max-count="9"
      />
        <div>添加图片</div>
      </div>
      <div class="list" style="position: relative">
        <input
          type="file"
          name="file"
          id="imgFile"
          accept="video/*"
          style="
            position: absolute;
            width: 100%;*
            heihgt: 100%;
            top: 0;
            left: 0;
            opacity: 0;
          "
          @change="addVideo($event)"
        />
        <img
          src="../assets/index-img/video.png"
          alt=""
          style="width: 30px; height: 24px"
        />
        <div>添加视频</div>
      </div>
      <div class="list" @click="vote">
        <img
          src="../assets/index-img/vote.png"
          alt=""
          style="width: 30px; height: 27px"
        />
        <div>发起投票</div>
      </div>
    </div>
    <video
      :src="videoUrls"
      v-if="videoUrls != ''"
      controls
      style="height: 150px; width: 100%"
    ></video>
    <div class="toupiao" v-if="isDel">
      <img src="../assets/index-img/vote1.png" alt="" />
      <div class="concater">{{ title }} <span @click="del">x</span></div>
    </div>
    <div class="foot" @click="submitForm">发布</div>
  </div>
</template>
<script>
import axios from "../api/axios";
import apiData from "@/api/apiData";
import { Toast } from 'vant';
import TabberTop from "@/components/TabberTop";

export default {
  data() {
    return {
      value: "",
      fileList: [],
      imgArr: [], //上传的图片
      videoUrls: "", //视频
      isDel: false,
      title: "",
      pagetitle:'发布笔记'
    };
  },
  created() {
    this.title = this.$route.query.title;
    if (this.$route.query.title) {
      this.isDel = true;
    }
  },
  components:{
    TabberTop
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1); //返回上一层
    },
    //验证
    async submitForm() {
      console.log(this.imgArr.length == 0, this.videoUrls == "");
      if (!this.value && this.imgArr.length == 0 && this.videoUrls == "") {
        this.$toast.center("发布内容不能为空");
        return false;
      }
      var MemberArtVoteDetail = [];
      let data = this.$route.query;
      if (data.current == 0) {
        //1文字
        for (let i = 0; i < data.listIndex.length; i++) {
          if (data.listIndex[i].value != "") {
            MemberArtVoteDetail.push({
              title: data.listIndex[i].value,
              image: "",
            });
          }
        }
      } else {
        //图片
        MemberArtVoteDetail.push(
          { title: data.imgTitle1, image: data.imgList },
          { title: data.imgTitle2, image: data.imgList2 }
        );
      }
      if (this.isDel) {
        var memberArtVote = {
          title: data.title, //投票表头
          type: data.current == 0 ? 1 : 2, //1文字 2图片
          chose: data.radio, //1单选 2多选
          start_at: data.timeValue,
          end_at: data.timeValue2,
          list: MemberArtVoteDetail,
        };
      } else {
        var memberArtVote = {};
      }
      var memberNoteArticleImageList = [];
      if (this.imgArr.length > 0) {
        memberNoteArticleImageList = this.imgArr;
      }
      // 发布笔记
      const params = {
        member_no: apiData.member_no, //this.loginman.member_no,
        type: 1, //1笔记 5快讯
        title: this.value, //标题
        spu_no: "", //商品spu_no
        spu_name: "", //商品名
        category_choice: "", //1 房产
        videoUrls: this.videoUrls, //视频
        memberNoteArticle: { content: this.value }, //内容
        memberNoteArticleImageList: memberNoteArticleImageList,
        memberArtVote: memberArtVote,
      };
      // var datas = {
      //   context: this.value,
      //   memberNo: apiData.member_no,
      // };
      let datas = `context=${this.value}&memberNo=${apiData.member_no}`
      if (this.value != "") {
        const result = await apiData.getChecktext.gct(datas);
        console.log("84", result);
        if (result.code == 200) {
          const data = await apiData.kuaixun.getData(params);
          console.log(data);
          if (data.code == 200) {
            this.$toast.center(data.data);
            let self = this;
            setTimeout(() => {
              this.$router.push({ path: "/Note" });
              // this.$router.go(-1);//返回上一层
            }, 1500);
          }
        } else {
          this.$toast.center(result.message);
        }
      } else {
        const data = await apiData.kuaixun.getData(params);
        console.log(data);
        if (data.code == 200) {
          this.$toast.center(data.data);
          let self = this;
          setTimeout(() => {
            this.$router.push({ path: "/Note" });
            // this.$router.go(-1);//返回上一层
          }, 1500);
        }
      }
    },
    // 删除投票
    del() {
      this.isDel = false; 
    },
    //上传图片
    afterRead(file) {
      this.uploadImg(file);
    },
    //检测图片是否合规
    beforeRead(file) {
      // const params={
      //    urls
      // }
      // const result =  apiData.kuaixun.getCheckimg(params)
    },
    /**
     * 上传图片
     */
    uploadImg(file) {
      if (this.videoUrls == "") {
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
        axios
          .post("/api/upload/uploadFile", formdata)
          .then((res) => {
            //这里的url为后端接口
            //res 为接口返回值
            if (res.code == 200) {``
              this.imgArr.push({ imageUrl: apiData.imgUrl + res.data });
             Toast.success('上传成功')
            }
          })
          .catch(() => {});
      } else {
        this.$toast.center("图片与视频不能同时上传");
      }
    },
    //上传视频
    addVideo() {
      if (this.fileList.length == 0) {
        var file = document.getElementById("imgFile").files[0];
        console.log(file);
        let url = URL.createObjectURL(file);
        let audioElement = new Audio(url);
        let duration;
        audioElement.addEventListener("loadedmetadata", function (_event) {
          duration = audioElement.duration; //时长为秒，小数，182.36
          //   this.$parent.$data.wDuration = parseInt(duration)
          console.log(duration);
        });

        let formdata = new FormData();
        // 通过append向form对象添加数据,可以通过append继续添加数据
        formdata.append("file", file);
        //设置请求头 
        let config = {
          headers: {
            token: "D525873E45AF421980F6838963CBD98E",
            "Content-Type": "multipart/form-data",
          },
        };
        if (0 < duration <= 60) {
          axios
            .post("/api/upload/uploadFile", formdata)
            .then((res) => {
              //这里的url为后端接口

              //res 为接口返回值
              if (res.code == 200) {
                this.videoUrls = apiData.imgUrl + res.data;
              }
            })
            .catch(() => {});
        } else {
          this.$toast.center("时间要大于1s小于60S");
        }
      } else {
        this.$toast.center("图片与视频不能同时上传");
      }
    },

    // 发起投票
    vote() {
      this.$router.push({ path: "/vote" });
    },
  },
};
</script>

<style scoped lang='less'>
.postNode {
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
  textarea {
    border: none;
    padding-left: 0;
    margin-right: 0;
    width: 90%;
    height: 170px;
    margin: 10px 30px 7px 25px;
    padding: 6px 10px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
  }
  .add {
    position: relative;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 21px 30px 22px 26px;
    background: #f9f9f9;
    box-sizing: border-box;
    .list {
      font-size: 14px;
      font-weight: 400;
      color: rgba(132, 132, 132, 1);
      img {
        margin: 0 auto;
        display: block;
        margin-bottom: 15px;
      }
    }
  }
  .list:nth-child(n + 2) {
    margin-left: 33px;
  }

  .img {
    padding: 20px;
    box-sizing: border-box;
  }
  .van-uploader__preview-image {
    width: 100px !important;
    height: 100px !important;
  }
  video {
    display: block;
    margin: 10px auto;
  }
  .toupiao {
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin: 15px 0;
  }
  .toupiao .concater {
    font-size: 14px;
    font-weight: 400;
    color: #914CDF;
    background: rgba(255, 104, 84, 0.14);
    border-radius: 5px;
    padding: 2px 10px;
    margin-left: 10px;
  }
  .concater span {
    border-left: 1px solid #914CDF;
    color: #848484;
    margin-left: 5px;
    padding-left: 7px;
  }
  .foot {
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    border-radius: 5px;
    background: linear-gradient(to right, #914CDF, #914CDF);
    margin: 0 auto;
    margin-top: 110px;
    padding-bottom: 30px;
    box-sizing: border-box;
  }
}
  .postPhoto{
    position: absolute;
    top: 30px;
    left: 21px;

  }
  .van-uploader__input{
    display: none;
  }
  /deep/ .van-uploader__input{
    position: absolute;
    top: -100px;
    left: 0px;
  }
  /deep/ .van-uploader__wrapper{
   margin-top: 80px !important;
  }
   .van-image__img{
     display: none;
   }
   /deep/ .van-uploader__upload{
     opacity: 0;
}
</style>