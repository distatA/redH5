<!--  -->
<template>
  <div>
    <div
      class="roomList"
      v-for="item in room_info"
      :key="item.roomid"
      @click="toWX"
    >
      <img :src="item.cover_img" alt="" />
      <div class="content_wrap">
        <div class="title_name">{{ item.name }}</div>
        <div class="auther_wrap">
          <img :src="item.cover_img" alt="" />{{ item.anchor_name }}
        </div>
        <div class="live_status">
          <span v-if="item.live_status == 101" style="background-color: #ff9254"
            >直播中</span
          >
          <span v-if="item.live_status == 105" style="background-color: #ff9254"
            >暂停中</span
          >
          <span v-if="item.live_status == 103" style="background-color: #717171"
            >回放</span
          >
          <div v-if="item.live_status == 102">
            <div>
              <div style="background-color: #5aaf01">预告</div>
              {{ item.start_time }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar :selected="selected"></Tabbar>
    <van-dialog v-model="show" title="小程序码" show-cancel-button>
      <img src="../../assets/images/QR_code.jpg" style="width: 100%" />
    </van-dialog>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import { Toast } from "vant";
export default {
  data() {
    return {
      selected: "live",
      room_info: [],
      show: false, //显示小程序码
    };
  },
  components: {
    Tabbar,
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getLive();
  },
  methods: {
    async getLive() {
      const params = {
        pageIndex: 1,
        pageSize: 200,
      };
      const result = await this.$api.live.getLiveList(params);
      console.log(result);
      this.room_info = result.data.room_info;
    },
    toWX() {
      this.show = true;
      setTimeout(() => {
        Toast("暂不支持观看,请到小程序端进行观看");
      }, 500);
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.roomList {
  padding: 0 0.4rem;
  display: flex;
  border-bottom: 0.08rem solid #f9f9f9;
  img {
    width: 2.6rem;
    height: 2.6rem;
    margin: 0.08rem 0.24rem 0.12rem 0;
  }
  .content_wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .title_name {
      font-size: 0.32rem;
      max-height: 1.26rem;
      margin-top: 0.14rem;
    }
    .auther_wrap {
      font-size: 0.24rem;
      color: #686868;
      margin: 0.2rem 0;
      img {
        width: 0.42rem;
        height: 0.42rem;
        margin-right: 0.12rem;
      }
    }
    .live_status {
      span {
        font-size: 0.28rem;
        padding: 0.04rem 0.22rem;

        border-radius: 0.08rem;
        color: #fff;
      }
    }
  }
}
</style>