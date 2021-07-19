<!-- 我的社区 -->
<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <TabberTop :title="title"></TabberTop>
    <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div v-for="(item,index) in list" :key="index">
            <!-- 快讯 -->
            <template v-if="item.type==5 || item.type==6">
                <kuaixun :item="item" @event="change($event)"></kuaixun>
            </template>
            <!-- 笔记 -->
            <template v-if="item.type==1">
              <note :item="item" @event1="change($event)"></note>
            </template>
            <!-- 付费文章 -->
            <template v-if="item.type==3">
              <pay :item="item" @event1="change($event)"></pay>
            </template>
            <!-- 后台抓取文章 -->
            <template v-if="item.type==4">
              <articles :item="item" @event1="change($event)"></articles>
            </template>
        </div>
        </van-list>
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
      title: "我的社区",
      isLoading: false,
      loading: false,
      finished: false,
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
    async getList(){
      const params ={
        member_no:this.$api.member_no,
        pageIndex: this.page,
        pageSize: this.pageSize
      }
      const result = await this.$api.my.shequ(params)
      if(result.code==200){
        var newArr = result.data.list;
        for (let i = 0; i < newArr.length;i++){
            newArr[i].headUrl = this.$api.headUrl;
            newArr[i].nickName = this.$api.nickName;
            newArr[i].isView=false;
            if (newArr[i].memberNoteAndArticleComments){
                newArr[i].memberNoteAndArticleComments = newArr[i].memberNoteAndArticleComments.slice(0, 2);
            }
            if (newArr[i].nickNames){
                newArr[i].nickNames = newArr[i].nickNames.map(function (obj, index) {
                return obj;
                }).join("，"); 
            }
            let now = parseInt(new Date().getTime()); //当前时间戳
            // 投票
            if (newArr[i].memberArtVote.start_at){
              let start = new Date(newArr[i].memberArtVote.start_at.replace(/\-/g, "/")).getTime()
              let end = new Date(newArr[i].memberArtVote.end_at.replace(/\-/g, "/")).getTime()
          
              if(now<start){
                var isVote =0;
                var voteText = '投票尚未开始';
                
              }else if(start < now && now < end){
                // console.log(Math.floor((end-now)/1000/3600))
                var isVote = 1;
                var voteText = '还有' + Math.floor((end - now) / 1000 / 3600 % 24) + '小时结束';
              }else if( end < now){
                var isVote = 2;
                var voteText = '投票已结束';
              }
              newArr[i].isVote = isVote;
              newArr[i].voteText = voteText;
              // 判断用户是否点过
              for (let j = 0; j < newArr[i].memberArtVote.list.length;j++){
                let list = newArr[i].memberArtVote.list
                let arr=  list.every(function(value){
                  return value.target==0
                })
                if (arr){
                  newArr[i].memberArtVote.list[j].checked = false;//未投票
                  newArr[i].memberArtVote.list[j].chose = newArr[i].memberArtVote.chose;//1单选 2多选
                }else{
                  newArr[i].memberArtVote.list[j].checked = true;//已投票
                  newArr[i].memberArtVote.list[j].chose = newArr[i].memberArtVote.chose;//1单选 2多选
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
        this.list = this.list.concat(newArr);
          // this.$set(this,'list',this.list)
        //如果列表数据条数>=总条数，不再触发滚动加载
        if (this.list.length >= this.total) {
            this.finished = true;
        }
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
            this.reload();//刷新页面
            // this.getList()// 获取快讯列表
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
  mounted() {}
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
</style>