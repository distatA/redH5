<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <TabberTop :title="title"></TabberTop>
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index">
          <complainList :item="item" :isMyComplain="true"  @isLike="getLikeStatus"/>
        </div>
        <van-empty
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无您的投诉"
          v-if="list.length === 0"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import complainList from "@/components/complainList";
import TabberTop from "@/components/TabberTop";
import apiData from "@/api/apiData";
export default {
  data() {
    return {
      title: "我的投诉",
      list: [],
      pageIndex: 1,
      pageSize: 10,
      refreshing: false,
      loading: false,
      finished: false,
      total: 0,
    };
  },
  mounted() {
    this.getMyComplainList();
  },
  components: {
    complainList,
    TabberTop,
  },

  methods: {
    async getMyComplainList() {
      let params = `memberNo=${apiData.member_no}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      const res = await apiData.myComplainList.list(params);
      const { total, list } = res.data;
      this.total = total;
      this.loading = false;
      if (list == null || list.length === 0) {
        this.list = [];
        return;
      }
      if (this.total <= this.list.length) {
        this.finished = true;
        this.list = list;
      } else {
        this.list = [...this.list, ...list];
      }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false;
        this.finished = false;
        this.loading = true;
        this.getMyComplainList(); // 获取快讯列表
      }, 1000);
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      if (this.total > this.list.length) {
        this.pageIndex++;
        this.getMyComplainList();
      }else{
        this.finished = true;
      }
    },
     // 获取子组件传过来的状态
    getLikeStatus(status) {
      if (status) this.getMyComplainList();
    },
  },
};
</script>

<style scoped lang="less">
 .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>