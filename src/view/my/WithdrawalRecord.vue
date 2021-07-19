<template>
  <div class="hello">
    <TabberTop :title='title'></TabberTop>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="container">
        <!-- 这里可以弄一个组件或者默认样式，显示暂无数据加一张图片 -->
        <div v-if='noData'>
          暂无数据
        </div>
        <template v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="- 没有更多了 -"
            @load="onLoad"
            :offset="130"
          >
          <van-cell v-for="item in myList" :key="item.id" :title="item.status" :value="'￥'+ item.money " size="large" :label="item.create_time" />
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

import apiData from '@/api/apiData'
import TabberTop from '@/components/TabberTop';

export default {
  name: 'HelloWorld',
  data() {
    return {
      title:'提现记录',
      page: 1,
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      myList:[],
      noData: false, // 如果没有数据，显示暂无数据
      isLoading:false, // 下拉的加载图案
    }
  },
  components:{
      TabberTop
  },
  methods: {  
    async getInfo () {
        const params = {
            memberNo:'17A79A120C49410DA86BA3F1A04D0A68',
            pageIndex:1,
            pageSize:500
        }
        const res =   await apiData.my.cashList(params)
        console.log(res);

        // 当请求成功
          let currentList = res.data.list
          currentList.forEach(el => {        
              if(el.status == 0){
                  el.status = '提现中...'
              }else if(el.status == 1){
                  el.status = '提现成功'
              }else{
                  el.status = '提现失败'
              }
          });
          
          this.loading = false 
          this.myList = this.myList.concat(currentList)
           this.myList.forEach((v) => {
        let times = new Date(v.create_time.replace(/-/g, "/")).getTime();
        v.create_time = this.myTime(times + 28800000);
      });
          this.page++
          // 如果没有数据，显示暂无数据
          if (this.myList.length === 0 && this.page === 1) {
            this.noData = true
          }
          // 如果加载完毕，显示没有更多了
          if (res.data.isLastPage == true) {
              console.log(1);
              
            this.finished = true
          }
        
    
    },
    // 列表加载
    onLoad () {
        this.getInfo()
        this.loading = true   
    },
    onRefresh () {
      setTimeout(() => {
        // 重新初始化这些属性
        this.isLoading = false
        this.myList = []
        this.page = 1
        this.loading = false
        this.finished = false
        this.noData = false
        // 请求信息
      }, 500)
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/*给个最低高度，让下面的空白区域也能下拉刷新*/
.container{
  min-height: 90vh;
}
</style>