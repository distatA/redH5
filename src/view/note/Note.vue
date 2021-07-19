<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <mytop @event="change($event)"></mytop>
      <!-- v-if="member_no" -->
      <div class="note">
        <div class="tab">
          <div
            v-for="(item, index) in tabs"
            :class="index == current ? 'active' : 'tab-item'"
            @click="clickmeu(index)"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
        <!-- 关注 -->
        <div class="guanzhu" v-if="current == 0">
          <!-- 轮播图 -->
          <!-- <van-swipe
            :autoplay="3000"
            indicator-color="#914CDF054"
            v-if="images.length > 0"
          >
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image.imgUrl" />
            </van-swipe-item>
          </van-swipe> -->
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="(item, index) in list" :key="index">
              <!-- 笔记 -->
              <template>
                <note :item="item" @event1="change($event)"></note>
              </template>
              <!-- 付费文章 -->
              <template v-if="item.ispay == 1">
                <pay :item="item" @event1="change($event)"></pay>
              </template>
              <!-- 后台抓取文章 -->
              <template v-if="item.type == 4">
                <articles :item="item" @event1="change($event)"></articles>
              </template>
            </div>
          </van-list>
        </div>
        <!-- 推荐 -->
        <div class="tuijian" v-if="current == 1">
          <!-- 轮播图 -->
          <!-- <van-swipe
            :autoplay="3000"
            indicator-color="#914CDF054"
            v-if="images.length > 0"
          >
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image.imgUrl" />
            </van-swipe-item>
          </van-swipe> -->
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="(item, index) in lists" :key="index">
              <!-- 笔记 -->
              <template>
                <note :item="item" @event1="change($event)"></note>
              </template>
              <!-- 付费文章 -->
              <template v-if="item.ispay == 1">
                <pay :list="list" @event1="change($event)"></pay>
              </template>
              <!-- 后台抓取文章 -->
              <template v-if="item.type == 4">
                <articles :item="item" @event1="change($event)"></articles>
              </template>
            </div>
          </van-list>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 发布快讯按钮 -->
    <div class="post" @click="post" v-if="redType === 0">
      <img
        src="../../assets/index-img/post1.png"
        alt=""
        @click.stop="postNote(1)"
      />
    </div>
    <div class="post" @click="post" v-if="redType !== 0">
      <img src="../../assets/index-img/post1.png" />
      <div class="post-item" v-if="showPost">
        <div class="post-note" @click.stop="postNote(1)">笔记</div>
        <div class="post-xun" @click.stop="postNote(2)">快讯</div>
      </div>
    </div>
    <van-action-sheet >
      <div v-html="data" class="content"></div>
    </van-action-sheet>
    <Tabbar :selected="selected"></Tabbar>
  </div>
</template>
<script>
import Tabbar from "@/components/Tabbar";
import mytop from "@/components/mytop";
import note from "@/components/note";
import pay from "@/components/pay";
import articles from "@/components/articles";
import Vue from "vue";
import { Lazyload, Dialog, Toast } from "vant";
Vue.use(Lazyload);
import apiData from "@/api/apiData";
export default {
  inject: ["reload"],
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      selected: "note",
      current: 0, //0是推荐 1是关注
      tabs: [
        { name: "推荐", num: 0 },
        { name: "关注", num: 0 },
      ],
      images: [],
      kuaixunList: [],
      list: [], //推荐
      lists: [], //关注
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      member_no: "",
      redType: 0, //用户类型
      userInfo: "",
      showPost: false,
      isShowAgreement: false,
      data: "",
    };
  },
  components: {
    Tabbar,
    mytop,
    note,
    pay,
    articles,
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member"))
      : "";
    if (this.userInfo) {
      this.$api.member_no = this.userInfo.member_no;
      this.member_no = this.$api.member_no;
      this.redType = this.userInfo.redType;
    }
    this.getList();
    this.getLunbo();
    this.getMobileCode();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    // 判断是否显示用户隐私协议
    appJudge() {
      let { isRead } = JSON.parse(localStorage.getItem("appIsRead")) || "";
      console.log( !isRead  && this.isShowAgreement);
      if (!isRead && this.isShowAgreement) {
        Dialog.confirm({
          message: this.data,
        })
          .then(() => {
            let obj = {
              isRead: true,
            };
            localStorage.setItem("appIsRead", JSON.stringify(obj));
          })
          .catch(() => {});
      }
    },
    // 用户隐私协议
    async getMobileCode() {
      const params = { id: 6 };
      var result = await apiData.userAgreement.getUserAgreement(params);
      if (result.code == 200) {
        this.data = result.data.content;
        this.appJudge();
      } else {
        Toast(result.message);
      }
    },
    //点击菜单
    clickmeu(id) {
      this.current = id;
      this.getList();
      this.getLunbo();
    },
    // 发布快讯
    post() {
      this.showPost = !this.showPost;
    },
    postNote(id) {
      console.log(id);
      switch (id) {
        case 1:
          this.$router.push({ path: "/postNote" });
          break;
        case 2:
          this.$router.push({ path: "/post" });
          break;
      }
    },
    //获取轮播图
    async getLunbo() {
      const params = {
        city: apiData.city,
        bySource: this.current == 0 ? 12 : 13,
      };
      var result = await apiData.lunbo.getLunbo(params);
      if (result.code == 200) {
        this.images = result.data;
      }
    },

    // 上拉加载
    onLoad() {
      // 异步更新数据
      this.page++;
      this.getList();
    },
    change(data) {
      if (data) {
        this.page = 1;
        this.getList(true);
      }
    },
    // 获取快讯列表
    async getList(loadMore) {
      apiData.city ? "" : (apiData.city = "合肥市");
      const params = {
        cityName: apiData.city,
        member_no: this.member_no,
        // type: 1, //0快讯 1笔记
        searchName: "",
        pageIndex: this.page,
        pageSize: this.pageSize,
      };
      if (this.current == 0) {
        //推荐
        // console.log("推荐");
        var result = await apiData.kuaixun.getList(params);
      } else {
        // console.log("关注");
        var result = await apiData.kuaixun.getLists(params);
        if (result.code === 500) {
          Toast("需要先进行登录才可查看");
        }
      }
      var newArr = result.data.list;
      for (let i = 0; i < newArr.length; i++) {
        newArr[i].isView = false;
        if (newArr[i].memberNoteAndArticleComments) {
          newArr[i].memberNoteAndArticleComments = newArr[
            i
          ].memberNoteAndArticleComments.slice(0, 2);
        }
        if (newArr[i].nickNames) {
          newArr[i].nickNames = newArr[i].nickNames
            .map(function (obj, index) {
              return obj;
            })
            .join("，");
        }
        let now = parseInt(new Date().getTime()); //当前时间戳
        // 投票
        if (newArr[i].memberArtVote.start_at) {
          let start = new Date(
            newArr[i].memberArtVote.start_at.replace(/\-/g, "/")
          ).getTime();
          let end = new Date(
            newArr[i].memberArtVote.end_at.replace(/\-/g, "/")
          ).getTime();
          if (now < start) {
            var isVote = 0;
            var voteText = "投票尚未开始";
          } else if (start < now && now < end) {
            // console.log(Math.floor((end-now)/1000/3600))
            var isVote = 1;
            var voteText =
              "还有" +
              Math.floor(((end - now) / 1000 / 3600) % 24) +
              "小时结束";
          } else if (end < now) {
            var isVote = 2;
            var voteText = "投票已结束";
          }
          newArr[i].isVote = isVote;
          newArr[i].voteText = voteText;
          // 判断用户是否点过
          for (let j = 0; j < newArr[i].memberArtVote.list.length; j++) {
            let list = newArr[i].memberArtVote.list;
            let arr = list.every(function (value) {
              return value.target == 0;
            });
            if (arr) {
              newArr[i].memberArtVote.list[j].checked = false; //未投
              newArr[i].memberArtVote.list[j].chose =
                newArr[i].memberArtVote.chose; //1单选 2多选
            } else {
              newArr[i].memberArtVote.list[j].checked = true; //已投票
              newArr[i].memberArtVote.list[j].chose =
                newArr[i].memberArtVote.chose; //1单选 2多选
            }
          }
        }
      }
      this.loading = false;
      this.total = result.data.total;

      if (newArr == null || newArr.length === 0) {
        // 加载结束
        this.finished = true;
        return;
      }
      // 将新数据与老数据进行合并
      if (this.current == 0) {
        // this.list = this.list.concat(newArr);
        //如果列表数据条数>=总条数，不再触发滚动加载
        if (this.list.length >= this.total) {
          this.finished = true;
          this.list = newArr;
        } else if (loadMore) {
          this.list = newArr;
        } else if (!loadMore) {
          this.list = [...this.list, ...newArr];
        }
      } else {
        this.lists = this.lists.concat(newArr);
        //如果列表数据条数>=总条数，不再触发滚动加载
        if (this.lists.length >= this.total) {
          this.finished = true;
          this.lists = newArr;
        } else if (loadMore) {
          this.lists = newArr;
        } else if (!loadMore) {
          this.lists = [...this.lists, ...newArr];
        }
      }
      console.log(this.list, "list");
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.getList(); // 获取快讯列表
      }, 1000);
    },
    handleScroll() {
      this.list.forEach((v) => {
        v.isView = false;
      });
    },
  },
};
</script>
<style scoped lang='less'>
.note {
  padding-bottom: 60px;
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .tab-item {
      width: 30%;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(100, 99, 99, 1);
    }
    .active {
      width: 30%;
      text-align: center;
      padding-bottom: 6px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #914cdf;
      border-bottom: 2px solid #914cdf;
      box-sizing: border-box;
    }
  }
  .van-swipe {
    width: 100%;
    height: 250px;
    margin-top: 5px;
  }
}
.post {
  position: fixed;
  right: 22px;
  bottom: 90px;
  img {
    width: 40px;
    height: 40px;
  }
}
.post image {
  width: 100%;
  height: 100%;
}
.post-item {
  -webkit-animation: animal 0.8s linear;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  top: -30px;
  left: 0;
  width: 40px;
  height: 101px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fff;
  z-index: -1;
}
.post-note {
  text-align: center;
  margin-top: 10px;
}
.post-xun {
  text-align: center;
  margin-bottom: 10px;
}
@-webkit-keyframes animal {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
.content {
  text-align: justify;
  padding: 10 / 375 * 100vw 10/ 375 * 100vw;
}
</style>



