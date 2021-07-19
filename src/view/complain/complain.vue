<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-swipe :autoplay="3000"  indicator-color="#8651d6">
        <van-swipe-item
          v-for="(item, index) in banner"
          :key="index"
          class="swipeBox"
          @click="toPost(item, 1)"
        >
          <img v-lazy="item.imgUrl" class="swipeImg" />
        </van-swipe-item>
      </van-swipe>
      <div class="cp_n_box" >
        <div class="cp_n_i" v-for="(item, index) in numberArr" :key="index">
          <div class="cp_n_i_num">{{ item.number }}</div>
          <div class="cp_n_i_word">{{ item.title }}</div>
        </div>
      </div>
      <!-- 最热三条 -->
      <div class="cp_j_box" v-if="hotList.length > 0">
        <div class="cp_j_i" v-for="(item, index) in hotList" :key="index"  @click="toDetail(item)">
          <img :src="item.pic" class="cp_j_i_img" />
          <div class="cp_j_i_word">
            {{ item.content }}
          </div>
        </div>
      </div>
      <!-- 间隔 -->
      <!-- <div  @click="$router.push('/complainPost')">天天315</div> -->
      <img
        v-if="centerData.imgUrl"
        :src="centerData.imgUrl"
        @click="toPost(centerData, 2)"
        class="inteval"
      />
      <!-- 搜索框 -->
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
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
          <complainList
            :item="item"
            :isMyComplain="false"
            @isLike="getLikeStatus"
          />
        </div>
      </van-list>

      <div
        style="width: 100%; height: 53px; background-color: #fff"
        v-if="list.length > 0"
      ></div>
      <Tabbar :selected="selected" ></Tabbar>
    </van-pull-refresh>
    <!-- <van-empty
  class="custom-image"
  image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
  description="暂无内容"
  v-if="list.length <= 0"
/> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import Tabbar from "@/components/Tabbar";
import complainList from "@/components/complainList";
import apiData from "@/api/apiData";
export default {
  data() {
    return {
      selected: "complain",
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      value: "",
      userInfo: {},
      banner: "", //banner图
      numberArr: [
        { title: "24H有效投诉" },
        { title: "积累有效投诉" },
        { title: "诉求房企" },
      ],
      hotList: [], //最热三条
      list: [],
      pageIndex: 1,
      pageSize: 10,
      refreshing: false,
      loading: false,
      finished: false,
      total: 0,
      centerData: "", //表单入口数据
    };
  },
  components: {
    Tabbar,
    complainList,
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member"))
      : { city: "合肥市" };
  },
  mounted() {
    this.getBanner();
    this.getNumber();
    this.getHotList();
    this.getList();
    this.getCenterImg();
  },
  methods: {
    //跳转详情
    toDetail(e) {
      this.$router.push(`/complainDetail?id=${e.id}`);
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
    onSearch(val) {
      this.value = val;
      this.pageIndex = 1;
      this.getList();
    },
    onCancel() {},
    //获取表单入口图片
    async getCenterImg() {
      let params = `city=${this.userInfo.city}`;
      const res = await apiData.centerIn.centerImg(params);
      this.centerData = res.data[0];
      console.log(this.centerData);
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
    async getBanner() {
      let params = `city=${this.userInfo.city}&source=13`;
      const res = await apiData.complaintBanner.cb(params);
      this.banner = res.data;
    },
    async getNumber() {
      let params = `city=${this.userInfo.city}`;
      const res = await apiData.complainNumber.complainNum(params);
      const { allComplaint, company, dayComplaint } = res.data;
      this.numberArr[0].number = dayComplaint;
      this.numberArr[1].number = allComplaint;
      this.numberArr[2].number = company;
    },
    async getHotList() {
      let params = `city=${this.userInfo.city}`;
      const res = await apiData.complainHot.hotList(params);
      this.hotList = res.data;
    },
    async getList() {
      let params = `city=${this.userInfo.city}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&search=${this.value}&memberNo=${apiData.member_no}`;
      const res = await apiData.complainList.list(params);
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
    // 获取子组件传过来的状态
    getLikeStatus(status) {
      if (status) this.getList();
    },
    // banner图跳转
    toPost(v, i) {
      switch (i) {
        case 1:
          if (v.appUrl) {
            let activityId = v.appUrl.split("=");
            this.$router.push({
              path: "/complainPost",
              query: { activityId: activityId[1] },
            });
          }
          break;
        case 2:
          if (v.appUrl) {
            let activityId = v.appUrl.split("=");
            this.$router.push({
              path: "/complainPost",
              query: { activityId: activityId[1] },
            });
          }
          break;
      }
    },
  },
};
</script>


<style scoped lang="less">
.container {
  background: #f9f9f9;
  .swipeBox {
    width: 100%;
    height: 200/375 * 100vw;
  }
  .swipeImg {
    width: 100%;
    height: 100%;
  }
  .cp_n_box {
    margin-top: 3/375 * 100vw;
    background: #ffffff;
    width: 100%;
    height: 70/375 * 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cp_n_i {
      box-sizing: border-box;
      padding: 10/375 * 100vw;
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      position: relative;
      .cp_n_i_num {
        font-weight:600;
        font-size: 20/375 * 100vw;
        color: #9756e0;
      }
      .cp_n_i_word {
        font-size: 13/375 * 100vw;
        color: #000000;
      }
    }
    .cp_n_i:not(:nth-child(1)) {
      &:before {
        position: absolute;
        top: calc(50% - 10 / 375 * 100vw);
        left: 0;
        content: "";
        width: 1/375 * 100vw;
        height: 20/375 * 100vw;
        background: #d8d8d8;
      }
    }
  }
  .cp_j_box {
    margin-top: 3 /375 * 100vw;
    background: #ffffff;
    box-sizing: border-box;
    padding: 10/375 * 100vw 20/375 * 100vw;
    width: 100%;
    min-height: 40/375 * 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cp_j_i {
      width: 100%;
      height: calc(166 / 375 * 100vw / 3);
      display: flex;
      justify-content: space-between;
      padding-bottom: 10/ 375 * 100vw;
      .cp_j_i_img {
        padding-top: 4/375 * 100vw;
        width: 32/375 * 100vw;
        height: 16/375 * 100vw;
        border-radius: 2/375 * 100vw;
        margin-right: 8/375 * 100vw;
      }
      .cp_j_i_word {
        flex: 1;
        font-size: 14/375 * 100vw;
        color: #717171;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 19/375 * 100vw;
      }
    }
  }
  .inteval {
    margin-top: 10/375 * 100vw;
    border-radius: 10/375 * 100vw 10/375 * 100vw 0 0;
    box-sizing: border-box;
    // padding-left: 21/375 * 100vw;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100/375 * 100vw;
    // background: url("../../assets/images/315index_bg.png") 100% 100% no-repeat;
    // background-size: 100%;
    font-size: 16/375 * 100vw;
    color: #ffffff;
  }
  /deep/ .van-list__finished-text {
    background-color: #fff;
  }
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>