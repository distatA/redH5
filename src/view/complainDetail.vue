<template>
  <div class="container">
    <TabberTop :title="title"></TabberTop>
    <div class="c_d_b">
      <div class="c_d_b_title">{{ detail.title }}</div>
      <div >
        <div class="c_d_b_info">[投诉对象] {{ detail.complaintObject }}</div>
        <div class="c_d_b_info">[投诉问题] {{ detail.complaintProblem }}</div>
        <div class="c_d_b_info">[涉及金额] {{ detail.amount }}元</div>
      </div>
    </div>
    <div class="c_d_c_b">
      <div class="c_d_c_b_user">
        <div class="header">
          <img src="../assets/images/icon.png" class="avatar" alt="" />
          <div class="info">
            <div class="title">第一房维权服务平台</div>
            <div class="time">{{detail.updateTime}}</div>
          </div>
          <div class="status1" v-if="detail.isVerify === 'is'">审核通过</div>
          <div class="status2" v-if="detail.isVerify === 'not'">待审核</div>
          <div class="status3" v-if="detail.isVerify === 'fail'">审核不通过</div>
        </div>
        <div class="content" v-if="detail.replyContent">{{detail.replyContent}}</div>
      </div>
      <!-- <div class="interval"></div> -->
      <div class="c_d_c_b_user">
        <div class="header">
          <img :src="detail.headUrl" class="avatar" alt="" />
          <div class="info">
            <div class="title">{{detail.nickName}}</div>
            <div class="time">{{detail.createTime}}</div>
          </div>
          <div class="status2">发起投诉</div>
        </div>
        <div class="userContent">
          {{detail.content}}
        </div>
        <div class="imgs" v-if="detail.picList">
          <van-image
            width="85"
            height="85"
            v-for="(item,index) in detail.picList" :key="index"
            :src="item"
            class="itemImg"
            @click="sceneImg(detail.picList,index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import TabberTop from "@/components/TabberTop";
import apiData from "@/api/apiData";
export default {
  data() {
    return {
      title: "投诉详情",
      detail: "",
      
    };
  },
  mounted() {
    this.getDetail();
  },
  components: {
    TabberTop,
  },
  methods: {
    async getDetail() {
      let params = `id=${this.$route.query.id}`;
      const res = await apiData.complainDetail.detail(params);
      if(res.data.replyContent === 'null'){
        res.data.replyContent = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      }
      this.detail = res.data;
    },
    // 图片预览
    sceneImg(images,index) {
      ImagePreview({
        images:images, //需要预览的图片 URL 数组
        showIndex:true, //是否显示页码
        loop:false, //是否开启循环播放
        startPosition:index //图片预览起始位置索引
      })
    },
  },
};
</script>


<style scoped lang="less">
.container {
  overflow-x: hidden;
  background: #f9f9f9;
  .c_d_b {
    box-sizing: border-box;
    padding: 10/375 * 100vw 15/375 * 100vw;
    background: #fff;
    width: 100%;
    min-height: 115/375 * 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 5/375 * 100vw;
    .c_d_b_title {
      font-size: 16/375 * 100vw;
      color: #000000;
      margin-bottom: 13/375 * 100vw;
      line-height: 22/375 * 100vw;
    }
    .c_d_b_info {
      font-size: 14/375 * 100vw;
      color: #717171;
      margin-bottom: 5/375 * 100vw;
    }
  }
  .c_d_c_b {
    box-sizing: border-box;
    background-color: #fff;
    width: 100vw;
    min-height: 330/375 * 100vw;
    display: flex;
    padding: 27/375 * 100vw 20/375 * 100vw 0/375 * 100vw 36/375 * 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 30/375 * 100vw;
    // .c_d_c_b_platform {
    //   width: 100%;
    //   height: 40/375 * 100vw;
    //   display: flex;

    //   .avatar {
    //     width: 40/375 * 100vw;
    //     height: 40/375 * 100vw;
    //     border-radius: 50%;
    //     object-fit: cover;
    //     margin-right: 11/375 * 100vw;
    //   }

    //   .info {
    //     text-align: left;
    //     height: 100%;
    //     flex: 1;
    //     display: flex;
    //     justify-content: space-between;
    //     flex-direction: column;
    //     .title {
    //       font-size: 14/375 * 100vw;
    //       color: #1b1b1b;
    //     }

    //     .time {
    //       font-size: 12/375 * 100vw;
    //       color: #aeaeae;
    //     }
    //   }

    //   .status {
    //     font-size: 14/375 * 100vw;
    //     color: #6ed400;
    //   }
    //   .content{
    //      text-align: justify;
    //     text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
    //     box-sizing: border-box;
    //     padding-left: 50/375 * 100vw;
    //     margin-top: 20/375 * 100vw;
    //     width: 100%;
    //     font-size: 14/375 * 100vw;
    //     color: #717171;
    //     line-height: 20/375 * 100vw;
    //   }
    // }
    .c_d_c_b_user {
      box-sizing: border-box;
      min-height: 80/375 * 100vw;
      width: 100%;
      .header {
        width: 100%;
        height: 40/375 * 100vw;
        display: flex;

        .avatar {
          width: 40/375 * 100vw;
          height: 40/375 * 100vw;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 11/375 * 100vw;
        }

        .info {
          text-align: left;
          height: 100%;
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          font-size: 14/375 * 100vw;

          .title {
            font-size: 14/375 * 100vw;
            color: #1b1b1b;
          }

          .time {
            font-size: 12/375 * 100vw;
            color: #aeaeae;
          }
        }

        .status1 {
          color: #6ED400;
        }
        .status2 {
          color: #F7B501;
        }
        .status3 {
          color: #ff3366;
        }

      }

      .content {
        padding: 20 / 375 * 100vw 10/ 375 * 100vw 30/ 375 * 100vw 30/ 375 * 100vw;
        text-align: justify;
        text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
        box-sizing: border-box;
        width: calc(100vw - 50px - 20px);
        font-size: 14/375 * 100vw;
        color: #717171;
        line-height: 20/375 * 100vw;
        box-sizing: border-box;
        margin-left: 20/375 * 100vw;
        border-left: 1/375 * 100vw dashed #979797;
      }
      .userContent{
        padding: 20 / 375 * 100vw 10/ 375 * 100vw 0/ 375 * 100vw 30/ 375 * 100vw;
        text-align: justify;
        text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
        box-sizing: border-box;
        width: calc(100vw - 50px - 20px);
        font-size: 14/375 * 100vw;
        color: #717171;
        line-height: 20/375 * 100vw;
        margin-left: 20/375 * 100vw;
      }
      .imgs {
        margin-top: 10/375 * 100vw;
        padding-left: 50/375 * 100vw;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .itemImg{
          margin-right: 10 / 375 *100vw;
          margin-bottom: 10 / 375 *100vw;

        }
      }
    }
  }
  // .interval {
  //   box-sizing: border-box;
  //   margin-left: 38/375 * 100vw;
  //   width: 100%;
  //   height: 57/375 * 100vw;
  //   border-left: 2/375 * 100vw dashed #979797;
  // }
}
</style>