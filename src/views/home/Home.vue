<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isshowbacktop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "components/content/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isshowbacktop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 最好刷新一次
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },

  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    this.$refs.swiper;
    // 3.监听item中图片加载完成

    // const refresh = this.debounce(this.$refs.scroll.refresh);

    // this.$bus.$on("itemimageload", () => {
    //   refresh();
    // console.log("----------");
    // this.$refs.scroll.refresh();
    // });
  },
  methods: {
    //事件监听相关方法

    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
          // console.log(this);
        }, delay);
      };
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个index保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //scroll class="content" 组件对象
      this.$refs.scroll.scrollTo(0, 0, 500);
      // this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //顶部箭头大于1000时显示出来
      // 1.判断backtop是否显示
      this.isshowbacktop = -position.y > 1000;

      // 2.决定tabControl 是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // 先监听图片什么时候加载完
      this.getHomeGoods(this.currentType);
      // 再进行异步刷新
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      // 获取tabControl的OffsetTop
      // 所有组件都有一个属性$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //data中保存了res  才没被回收
        // this.result = res;
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(this.goods);
        // console.log(this.goods[type]);
        // console.log(res.data);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-bottom: 49px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 8; */
  /* position: sticky;
  width: 100%;
  top: 0; */
}
/* .tab-control {
  /* 移动端支持这个属性 */
/* position: sticky;
  top: 44px;
  z-index: 2;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 5;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* :class="{ fixed: isTabFixed }" */

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>