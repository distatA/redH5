<template>
  <div class="container">
    <TabberTop :title="title"></TabberTop>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="landSellList" v-for="(item, index) in list" :key="index" @click="toPage(item)">
          <img :src="item.pic" alt="" class="landSellList_img" />
          <div class="landSellList_info">
            <span class="landSellList_info_title">{{item.vrName}} </span>
            <span class="landSellList_info_content"
              >{{item.detail}}
            </span>
          </div>
          <img
            src="../assets/images/rightArrows.png"
            alt=""
            class="landSellList_icon"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing:false,
      data: "",
      list: "",
      title: "土地推介",
      userInfo: "",
      pageIndex: 1,
      pageSize: 10,
    };
  },
  components: {
    TabberTop,
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member"))
      : { city: "合肥市" };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let params = `city=${this.userInfo.city}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      const res = await apiData.vrList.list(params);
      const { total, list } = res.data;
      this.total = total;
      this.loading = false;
      if (list == null || list.length === 0) {
        console.log("没有数据");
        this.list = [];
        return;
      }
      if (this.total <= this.list.length) {
        console.log("没有数据了");
        this.finished = true;
        this.list = list;
      } else {
        this.list = [...this.list, ...list];
      }
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      if (this.total > this.list.length) {
        this.pageIndex++;
        this.getList();
      } else {
        this.finished = true;
      }
    },
    toPage(e){
      window.location.href=e.link
    },
       // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.refreshing = false;
        this.finished = false;
        this.loading = true;
        this.getList(); // 获取快讯列表
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.container {
  background: #f9f9f9;
}
.landSellList {
  background-color: #fff;
  margin-bottom: 5 / 375 * 100vw;
  box-sizing: border-box;
  width: 100vw;
  height: 80/ 375 * 100vw;
  padding: 5/ 375 * 100vw 20/ 375 * 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &_img {
    width: 125/ 375 * 100vw;
    height: 70/ 375 * 100vw;
    border-radius: 5/ 375 * 100vw;
  }
  &_info {
    height: 100%;
    margin-left: 10/ 375 * 100vw;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &_title {
      font-size: 16/ 375 * 100vw;
      color: #000000;
      line-height: 22/ 375 * 100vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    &_content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 14/ 375 * 100vw;
      color: #666666;
      line-height: 20/ 375 * 100vw;
    }
  }

  &_icon {
    width: 10/ 375 * 100vw;
    height: 16/ 375 * 100vw;
  }
}
</style>