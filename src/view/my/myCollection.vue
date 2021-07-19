<!-- 我的社区 -->
<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <TabberTop :title="title"></TabberTop>
    <!-- <div class="tab">
        <div v-for="(item,index) in tabs" :class="index==current?'active':'tab-item'" @click="clickmeu(index)" :key="index">{{item.name}}</div>
    </div> -->
    <!-- <div class="kuaixun" >
      <div v-for="(item,index) in list" :key="index">
          <template v-if="item.type==5 || item.type==6">
              <kuaixun :item="item" @event="change($event)"></kuaixun>
          </template>
      </div>
    </div> -->
    <div class="node" >
      <div v-for="(item,index) in list" :key="index">
          <!-- 笔记 -->
          <template >
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
    </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
import kuaixun from '@/components/kx'
import note from '@/components/note'
import pay from '@/components/pay'
import articles from '@/components/articles'
import { Toast } from 'vant';
export default {
  inject:['reload'],
  data() {
    return {
      title: "我的收藏",
      current:0,
      tabs:[{name:'快讯',num:0},{name:'笔记',num:0}],
      isLoading: false,
      list:[],
      page: 1,//请求第几页
      pageSize: 10,//每页请求的数量
      total: 0,//总共的数据条数
    };
  },
  components:{
      TabberTop,
      kuaixun,
      note,
      pay,
      articles,
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getList()
  },
  methods:{
    //点击菜单
    // clickmeu(id){
    //     this.current = id;
    // },
    async getList(loadMore){
      const params ={
        member_no_me:this.$api.member_no,
        pageIndex: this.page,
        pageSize: this.pageSize
      }
      const result = await this.$api.my.cang(params)
      if(result.code==200){
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
      console.log(this.list,'list');
      }
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
        this.page++;
        this.getList();
    },
    change(data){
        if(data){
            console.log('刷新')
            this.isLoading = false;
            this.getList(true);
        }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.getList()// 获取快讯列表
      }, 1000);
    },
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    setTimeout(()=>{
  console.log(this.list);
    },5000)
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.tab{
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom:5px solid #F9F9F9;
    .tab-item{
        // width:30%;
        display: inline-block;
        height:33px;
        line-height: 33px;
        text-align: center;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(100,99,99,1);
    }
    .active{
        // width:50%;
        display: inline-block;
        height:33px;
        line-height: 33px;
        text-align: center;
        padding-bottom:3px;
        font-size:17px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#914CDF;
        border-bottom:2px solid #914CDF;
        padding-bottom:8px;
        box-sizing: border-box;
    }
}
</style>