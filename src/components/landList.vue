<!-- 账户余额 -->
<template>
  <div>
     <div class="landList" @click="toDetail(item.id)">
          <img :src="item.pic" alt="" class="landList_img" />
          <div class="landList_info">
            <span class="landList_info_word"
              >{{item.title}}</span
            >
            <div class="landList_info_detail">
              <span>{{item.createTime}}</span>
              <div class="landList_info_detail_read">
                <img src="../assets/images/read.png" alt="" />
                <span>{{item.readNumber}}</span>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import { Toast } from "vant";
export default {
  props: ["item", "isMyComplain"],
  data() {
    return {
      showShare: false,
      options: [{ name: "微信", icon: "wechat" }],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // //跳转详情
    // toDetail() {
    //   this.$router.push(`/complainDetail?id=${this.item.id}`);
    // },
      toDetail(e) {
          this.$router.push(`/landNoticeDetail?id=${e}`);
    }
  },
};
</script>
<style scoped lang='less'>
.landList {
  box-sizing: border-box;
  min-height: 100/ 375 * 100vw;
  width: 100%;
  padding: 10/ 375 * 100vw 20/ 375 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1/ 375 * 100vw solid #f5f4f4;
  &_img {
    width: 125/ 375 * 100vw;
    height: 70/ 375 * 100vw;
    border-radius: 5/ 375 * 100vw;
  }

  &_info {
    height: 70/ 375 * 100vw ;
    padding: 0/ 375 * 100vw 0/ 375 * 100vw  0/ 375 * 100vw 10/ 375 * 100vw;
    flex: 1;
    display: flex;
    // align-items: center;
    flex-direction: column;
    justify-content: space-between;
    &_word {
      font-size: 14/ 375 * 100vw;
      color: #000000;
      line-height: 23/ 375 * 100vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    &_detail {
      margin-top: 5/ 375 * 100vw;
      width: 100%;
      font-size: 12/ 375 * 100vw;
      color: #aeaeae;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &_read {
        img {
          width: 20/ 375 * 100vw;
          height: 20/ 375 * 100vw;
          margin: 0 5/ 375 * 100vw 2/ 375 * 100vw 0;
        }
      }
    }
  }
}
</style>