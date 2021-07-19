<!-- 关于我们 -->
<template>
  <div class="myFans">
    <TabberTop :title="title"></TabberTop>
    <div class="content_wrap">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="container">
          <!-- 这里可以弄一个组件或者默认样式，显示暂无数据加一张图片 -->
          <div v-if="noData" style="margin: 20px auto;text-align: center;">暂无数据</div>
          <template v-else>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="- 没有更多了 -"
              @load="onLoad"
              :offset="130"
            >
              <!-- <van-cell v-for="item in myList" :key="item.id" :title="item.title" :value="item.status==0?`+ ${item.pay_money}`:`- ${item.pay_money}`" size="large" :label="item.create_time" /> -->
              <div class="listMan" v-for="item in myList" :key="item.member_no">
                <div class="headUrl">
                  <img
                    class="headUrlImg"
                    :src="item.headUrl"
                    alt=""
                    srcset=""
                  />
                  <img
                    class="iconType"
                    v-if="item.redType != 0"
                    src="https://firsthouse.oss-cn-shanghai.aliyuncs.com/120/008F0962BF3A467090596C3F98FD4E8E.png"
                    alt=""
                    srcset=""
                  />
                </div>
                <div class="left_wrap">
                  <p class="left_name">{{ item.nickName }}</p>
                  <p class="left_city">
                    {{ item.city + " | " + item.count + "粉丝" }}
                  </p>
                </div>
                <div class="right_img">
                  <img
                    :src="
                      item.flag == 0
                        ? 'https://firsthouse.oss-cn-shanghai.aliyuncs.com/images/home/unfocus.png'
                        : 'https://firsthouse.oss-cn-shanghai.aliyuncs.com/120/809E30F95C0B45B5A22E83FFCA2569AB.png'
                    "
                    alt=""
                    srcset=""
                    @click="cancel(item.member_no)"
                  />
                </div>
              </div>
            </van-list>
          </template>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
import { Toast } from "vant";

export default {
  data() {
    return {
      title: "我的粉丝",
      page: 1,
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      myList: [],
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
      member_no: "",
      totalCount:0
    };
  },
  components: {
    TabberTop,
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    let { member_no } = JSON.parse(localStorage.getItem("member") ) || ""
    this.member_no = member_no;
  },
  methods: {
    async getInfo() {
      const params = {
        member_no: this.member_no,
        pageIndex: 1,
        pageSize: 10,
      };
      const res = await apiData.my.getFans(params);
      if (res.code == 401) return;
      this.loading = false;
       if (this.totalCount <= this.myList.length) {
        this.totalCount = res.data.total;
        this.myList = res.data.list;
      } else {
        this.page++;
        this.myList = [...this.myList, ...res.data.list];
      }
      // 如果没有数据，显示暂无数据
      if (this.myList.length === 0 && this.page === 1) {
        this.noData = true;
      }
      // 如果加载完毕，显示没有更多了
      if (res.data.isLastPage == true) {
        this.finished = true;
      }
    },
    // 列表加载
    onLoad() {
      this.getInfo();
      this.loading = true;
    },
    onRefresh() {
      setTimeout(() => {
        // 重新初始化这些属性
        this.isLoading = false;
        this.myList = [];
        this.page = 1;
        this.loading = false;
        this.finished = false;
        this.noData = false;
      }, 500);
    },
     async cancel(e) {
      let params = {
        member_no_me:this.member_no,
        member_no_other: e,
      };
      let res = await apiData.myFallow.delMyFallow(params);
      if (res.code === 200) {
        Toast(res.data);
        this.getInfo();
      }
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.center() {
  display: flex;
  align-items: center;
}
.myFans {
  height: 100vh;
  background-color: #f9f9f9;
}
.listMan {
  display: flex;
  height: 1.6rem;
  margin-bottom: 0.06rem;
  background-color: #ffffff;
  .headUrl {
    width: 1.08rem;
    padding-left: 0.4rem;
    padding-right: 0.38rem;
    .center();

    .headUrlImg {
      width: 1.08rem;
      height: 1.08rem;
      border-radius: 50%;
    }
    .iconType {
      top: 0.4rem;
      right: 0.2rem;
      position: relative;
      width: 0.24rem;
      height: 0.24rem;
    }
  }
  .left_wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .left_name {
      font-size: 0.28rem;
      color: #000000;
      margin-bottom: 0.2rem;
    }
    .left_city {
      font-size: 0.24rem;
      color: #848484;
    }
  }
  .right_img {
    width: 1.08rem;
    .center();
    img {
      width: 0.44rem;
    }
  }
}
</style>