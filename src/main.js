import Vue from 'vue'
import './plugins/axios'
import Axios from 'axios'
import './config/rem'
import './assets/styles/reset.css'
import App from './App.vue'
import store from './store'
import router from '@/router/router'
import {
  myTime
} from '@/api/utils'
import './components/Toast/toast.css';
import Toasts from './components/Toast/index';
Vue.use(Toasts);


import apiData from "@/api/apiData";

//别看了,赶紧跑路吧
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);
//设置为全局
import {
  commonShare
} from './plugins/share'
Vue.prototype.commonShare = commonShare;
Vue.prototype.myTime = myTime;

// import Viewer from 'viewerjs';
// import 'viewerjs/dist/viewer.css';
// Vue.use(Viewer);

import {

  Button,
  Swipe,
  SwipeItem,
  Form,
  Field,
  Uploader,
  RadioGroup,
  Radio,
  DatetimePicker,
  Popup,
  NavBar,
  Icon,
  PullRefresh,
  List,
  Dialog,
  Cell,
  CellGroup,
  Toast,
  CountDown,
  Checkbox,
  CheckboxGroup,
  Area,
  Picker,
  NoticeBar,
  Lazyload,
  Search,
  ActionSheet,
  Switch,
  Image as VanImage,
  Empty,
  ShareSheet,
  Loading ,
  ImagePreview ,
  Grid, GridItem 
} from 'vant';

Vue.use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Form)
  .use(Field)
  .use(Uploader)
  .use(Radio)
  .use(RadioGroup)
  .use(DatetimePicker)
  .use(Popup)
  .use(NavBar)
  .use(Icon)
  .use(List)
  .use(Dialog)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(CountDown)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(PullRefresh)
  .use(Area)
  .use(Picker)
  .use(NoticeBar)
  .use(Lazyload)
  .use(Search)
  .use(ActionSheet)
  .use(Switch)
  .use(VanImage)
  .use(Empty)
  .use(ShareSheet)
  .use(Loading)
  .use(ImagePreview)
  .use(Grid)
.use(GridItem)

Vue.config.productionTip = false


Vue.prototype.$api = apiData;


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')