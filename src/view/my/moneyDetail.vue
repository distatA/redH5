<template>
  <div class="hello">
    <TabberTop :title="title"></TabberTop>
    <div class="selecct_wrap">
      <div class="select_left" @click="chooseDate">
        {{ this.chooseDateTime }}
      </div>
      <div @click="paytextShow">
        {{ this.pay_text }}<van-icon name="arrow-down" />
      </div>
    </div>
    <van-popup
      v-model="showtext"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="交易类型"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="getChooseDate"
      />
    </van-popup>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="container">
        <!-- 这里可以弄一个组件或者默认样式，显示暂无数据加一张图片 -->
        <div v-if="noData">暂无数据</div>
        <template v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="- 没有更多了 -"
            @load="onLoad"
            :offset="130"
          >
            <van-cell
              v-for="item in myList"
              :key="item.id"
              :title="item.title"
              :value="
                item.status == 0 ? `+ ${item.pay_money}` : `- ${item.pay_money}`
              "
              size="large"
              :label="item.create_time"
            />
            <!-- <div >
              {{item.title}}
            </div> -->
          </van-list>
        </template>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";

export default {
  name: "HelloWorld",
  data() {
    return {
      show: false, //日历时间选择展示
      showtext: false, //交易类型选择展示
      columns: ["全部"],
      title: "资金明细",
      page: 1,
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      myList: [],
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      chooseDateTime: null, //选择的时间
      pay_text: "交易类型",
      pay_type: "0", //选择的类型
    };
  },
  components: {
    TabberTop,
  },
  created() {
    this.$api.member_no = JSON.parse(localStorage.getItem("member"))
      ? JSON.parse(localStorage.getItem("member")).member_no
      : "";
    this.giveDate();
    this.getItemDetail();
  },
  methods: {
    /**展示交易类型弹框 */
    paytextShow() {
      this.showtext = !this.showtext;
      console.log(this.columns);
    },
    /**获得交易类型 */
    async getItemDetail() {
      const params = {
        itemName: "交易类型",
      };
      const res = await this.$api.my.getItemDetail(params);
      console.log(res);
      res.data.forEach((e) => {
        this.columns.push(e.item_detail);
      });
      console.log(this.columns);
    },
    /**确认select选择 */
    onConfirm(value, index) {
      //this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.pay_type = index;
      this.pay_text = value == "全部" ? "交易类型" : value;
      this.showtext = false;
      this.onRefresh();
      //this.getInfo()
    },
    onCancel() {
      this.showtext = false;
    },
    giveDate() {
      let date = new Date();
      const year = date.getFullYear();
      let beforeMonth = date.getMonth() + 1;
      let month = beforeMonth < 10 ? "0" + beforeMonth : beforeMonth;
      this.chooseDateTime = `${year + "-" + month}`;
    },
    chooseDate() {
      this.show = !this.show;
    },
    getChooseDate(val) {
      console.log(this.currentDate);
      let year = val.getFullYear();
      let beforeMonth = val.getMonth() + 1;
      let month = beforeMonth < 10 ? "0" + beforeMonth : beforeMonth;
      this.chooseDateTime = `${year + "-" + month}`;
      this.onRefresh();
      //this.getInfo()
      console.log(this.chooseDateTime);
      this.show = false;
    },
    async getInfo() {
      const params = {
        member_no: this.$api.member_no,
        dateTime: this.chooseDateTime,
        pay_type: this.pay_type,
        pageIndex: 1,
        pageSize: 50,
      };
      const res = await apiData.my.moneyDetail(params);
      console.log(res);

      //debugger;

      // 当请求成功

      this.loading = false;
      this.myList = this.myList.concat(res.data.memberPayHistoryList.list);
      console.log(this.myList);
      this.myList.forEach((v) => {
        let times = new Date(v.create_time.replace(/-/g, "/")).getTime();
        v.create_time = this.myTime(times + 28800000);
      });

      this.page++;
      // 如果没有数据，显示暂无数据
      if (this.myList.length === 0 && this.page === 1) {
        this.noData = true;
      }
      // 如果加载完毕，显示没有更多了
      if (res.data.memberPayHistoryList.isLastPage == true) {
        console.log(1);

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
        // 请求信息
      }, 500);
    },
  },
};
//
</script>

<style scoped lang='less'>
.selecct_wrap {
  padding: 0.18rem 0.46rem 0.14rem 0.4rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.28rem;
}
/*给个最低高度，让下面的空白区域也能下拉刷新*/
.container {
  min-height: 90vh;
}
</style>