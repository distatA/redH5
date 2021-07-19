<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="(item, index) in banner"
          :key="index"
          class="swipeBox"
          @click="toPage(item)"
        >
          <img v-lazy="item.imgUrl" class="swipeImg" />
        </van-swipe-item>
      </van-swipe>
      <!-- 页面导航 -->
      <div class="menu">
        <div class="land" @click="$router.push('/landSell')">
          <img src="../../assets/images/land.png" class="landSell_img" alt="" />
          <span class="landSell_word">土地推介</span>
        </div>
        <div class="land" @click="$router.push('/landPost')">
          <img
            src="../../assets/images/landbuy.png"
            class="landSell_img"
            alt=""
          />
          <span class="landSell_word">并购需求</span>
        </div>
      </div>
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
      <!-- 纵向轮播 -->
      <div class="lengthwas">
        <img
          src="../../assets/index-img/kuaixun.png"
          alt=""
          class="lengthwas_img"
        />
        <van-swipe
          :autoplay="3000"
          vertical
          class="lengthwas_wordsBox"
          :show-indicators="false"
          indicator-color="#8651d6"
        >
          <van-swipe-item v-for="(item, index) in hotList" :key="index">
            <div class="lengthwas_words" @click="toDetail(item)">
              {{ item.demandName }}
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <landList v-for="(item, index) in list" :key="index" :item="item" />
      </van-list>
      <div
        style="width: 100%; height: 53/ 375 * 100vw; background-color: #fff"
        v-if="list.length > 0"
      ></div>
      <Tabbar :selected="selected"></Tabbar>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import Tabbar from "@/components/Tabbar";
import landList from "@/components/landList";
import apiData from "@/api/apiData";
export default {
  data() {
    return {
      selected: "land",
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
      arr: [
        { name: "合肥市肥西县5.2亩 城镇住宅用地挂拍！" },
        { name: "合肥市肥西县5.2亩 ！" },
        { name: " 城镇住宅用地挂拍！" },
      ],
    };
  },
  components: {
    Tabbar,
    landList,
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member"))
      : { city: "合肥市" };
  },
  mounted() {
    this.getBanner();
    this.getHotList();
    this.getList();
  },
  methods: {
    toPage(e) {
      console.log(e);
      if (e.appUrl) {
        window.location.href = e.appUrl;
      }
    },
    //跳转详情
    toDetail(e) {
      this.$router.push(`/landNoticeDetail?id=${e.id}`);
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
      let params = `city=${this.userInfo.city}&source=15`;
      const res = await apiData.complaintBanner.cb(params);
      this.banner = res.data;
    },
    async getHotList() {
      let params = `city=${this.userInfo.city}`;
      const res = await apiData.langHotList.list(params);
      this.hotList = res.data;
    },
    async getList() {
      let params = `city=${this.userInfo.city}&search=${this.value}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      const res = await apiData.landList.list(params);
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
        font-weight: 600;
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
  width: 90/ 375 * 100vw;
  height: 90/ 375 * 100vw;
}
.menu {
  margin: 5 / 375 * 100vw 0 5 / 375 * 100vw 0;
  box-sizing: border-box;
  padding: 5 / 375 * 100vw 0;
  width: 100vw;
  height: 80/375 * 100vw;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .land {
    width: 60 / 375 * 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    .landSell_img {
      width: 35 / 375 * 100vw;
      height: 35 / 375 * 100vw;
    }

    .landSell_word {
      font-size: 12/ 375 * 100vw;
      color: #000000;
    }
  }
}
.lengthwas {
  margin: 5 / 375 * 100vw 0 5 / 375 * 100vw 0;
  padding: 0 20 / 375 * 100vw;
  width: 100vw;
  height: 35/375 * 100vw;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &_img {
    width: 40 / 375 * 100vw;
    height: 15 / 375 * 100vw;
    margin-right: 20 / 375 * 100vw;
  }
  &_wordsBox {
    flex: 1;
    color: #9756e0;
    height: 35/ 375 * 100vw;
    line-height: 35/ 375 * 100vw;
  }
}
</style>