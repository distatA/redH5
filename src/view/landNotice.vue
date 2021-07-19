<template>
  <div class="container">
    <TabberTop :title="title" style="padding: 0 -20/ 375 * 100vw"></TabberTop>
    <div class="landNoticeBox">
      <div class="landNotice" v-for="(item, index) in 11" :key="index">
        <img src="../assets/images/3.png" alt="" class="landNotice_img" />
        <div class="landNotice_info">合肥主城区</div>
      </div>
    </div>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
import apiData from "@/api/apiData";
export default {
  data() {
    return {
      value: "",
      title: "土拍公告",
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
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
  min-height: 100vh;
}

.landNoticeBox {
  padding: 0/ 375 * 100vw 20/ 375 * 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .landNotice {
    width: 165/ 375 * 100vw;
    height: 150/ 375 * 100vw;
    background: #ffffff;
    margin-bottom: 20/ 375 * 100vw;

    &:nth-child(odd) {
      margin-right: 5/ 375 * 100vw;
    }
    &_img {
      width: 165/ 375 * 100vw;
      height: 110/ 375 * 100vw;
      border-radius: 5/ 375 * 100vw 5/ 375 * 100vw 5/ 375 * 100vw 5/ 375 * 100vw;
    }

    &_info {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 165/ 375 * 100vw;
      height: 49/ 375 * 100vw;
      background: #ffffff;
      border-radius: 0/ 375 * 100vw 0/ 375 * 100vw 5/ 375 * 100vw 5/ 375 * 100vw;
    }
  }
}
</style>