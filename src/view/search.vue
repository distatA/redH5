<template>
  <div class="search">
    <div class="top">
      <img src="../assets/index-img/back.png" alt="" @click="back" />
      <div>搜索</div>
      <div></div>
    </div>
    <div class="input">
      <input
        placeholder="请输入内容"
        v-model="value"
        @keyup.enter="search"
        @change="changeValue"
      />
      <div class="search" @click="search">
        <img src="../assets/index-img/search.png" alt="" />
      </div>
      <div class="cancel" @click="cancel">取消</div>
    </div>
    <div class="tab">
      <div
        :class="current == index ? 'active' : 'tabs'"
        v-for="(item, index) in tabList"
        :key="index"
        @click="change(index)"
      >
        {{ item }}
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="100"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 红人 -->
      <div class="red" v-show="current == 0">
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="left">
            <div class="head"><img :src="item.imageUrl" alt="" /></div>
            <div class="name">{{ item.nickName }}</div>
          </div>
          <div class="right">进入主页</div>
        </div>
      </div>
      <!-- 快讯 -->
      <div v-for="(item, index) in list2" :key="index" v-show="current == 1">
        <template v-if="item.type == 5 || item.type == 6">
          <kuaixun :item="item" @event="changes($event)"></kuaixun>
        </template>
      </div>
      <!-- 笔记 -->
      <div v-for="(item, index) in list3" :key="index" v-show="current == 2">
        <template v-if="item.type == 1">
          <note :item="item" @event="changes($event)"></note>
        </template>
      </div>
    </van-list>
  </div>
</template>
<script>
import kuaixun from "@/components/kx";
import note from "@/components/note";
export default {
  inject: ["reload"],
  components: {
    kuaixun,
    note,
  },
  data() {
    return {
      value: "",
      type: 1,
      tabList: ["红人", "快讯", "笔记", "直播"],
      current: 0,
      list: [],
      list2: [],
      list3: [],
      list4: [],
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      loading: false,
      finished: false,
    };
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1); //返回上一层
    },
    //菜单切换
    change(id) {
      this.current = id;
      this.type = id + 1;
    },
    //输入框改变监听
    changeValue() {
      this.list = [];
      this.list2 = [];
      this.list3 = [];
      this.list4 = [];
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      this.page++;
      this.search();
    },
    changes(data) {
      if (data) {
        console.log("刷新");
        this.reload(); //刷新页面
        // this.getList()// 获取快讯列表
      }
    },
    //搜索
    async search() {
      if (!this.value) {
        this.$toast.center("请输入搜索内容");
        return false;
      }
      const params = {
        type: this.type, //1 红人 2 快讯 3 笔记 4直播
        member_no: this.$api.member_no,
        key: this.value,
        pageIndex: this.page,
        pageSize: this.pageSize,
      };
      var result = await this.$api.search.getSearch(params);
      console.log(result);
      if (result.code == 200) {
        this.loading = false;
        this.total = result.data.total;
        var newArr = result.data.list;
        if (this.current == 2) {
          //笔记

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
                  newArr[i].memberArtVote.list[j].checked = false; //未投票
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
        }

        if (newArr == null || newArr.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }
        if (this.current == 0) {
          // 将新数据与老数据进行合并
          this.list = this.list.concat(newArr);

          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.list.length >= this.total) {
            this.finished = true;
          }
        } else if (this.current == 1) {
          // 将新数据与老数据进行合并
          this.list2 = this.list.concat(newArr);

          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.list2.length >= this.total) {
            this.finished = true;
          }
        } else if (this.current == 2) {
          // 将新数据与老数据进行合并
          this.list3 = this.list.concat(newArr);

          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.list3.length >= this.total) {
            this.finished = true;
          }
        } else if (this.current == 3) {
          // 将新数据与老数据进行合并
          this.list4 = this.list.concat(newArr);

          //如果列表数据条数>=总条数，不再触发滚动加载
          if (this.list4.length >= this.total) {
            this.finished = true;
          }
        }
      }
    },
    //取消
    cancel() {
      this.value = "";
      this.list = [];
      this.list2 = [];
      this.list3 = [];
      this.list4 = [];
    },
  },
};
</script>
<style scoped lang='less'>
.search {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 520;
    color: rgba(0, 0, 0, 1);
    padding: 10px 20px;
    img {
      width: 11px;
      height: 18px;
    }
  }
  .input {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 10px;
    input {
      width: 295px;
      height: 30px;
      // border:1px solid #914CDF054;
      border-radius: 5px;
      padding-left: 42px;
      box-sizing: border-box;
      background: #f3f3f3;
      margin-left: 20px;
    }
    .search {
      width: 16px;
      height: 16px;
      top: 8px;
      left: 33px;
      position: absolute;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .cancel {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(158, 158, 158, 1);
      margin-left: 10px;
    }
  }
  .tab {
    display: flex;
    border-bottom: 7px solid #f9f9f9;
    margin-top: 12px;
    .tabs {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(132, 132, 132, 1);
      width: 25%;
      text-align: center;
    }
    .active {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 520;
      color: #914CDF;
      width: 25%;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #914CDF;
    }
  }
  .red {
    .list {
      padding: 8px 20px 8px 29px;
      border-bottom: 3px solid #f9f9f9;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        .name {
          margin-left: 10px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 520;
          color: rgba(0, 0, 0, 1);
        }
      }
      .right {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #914CDF;
      }
    }
  }
}
</style>