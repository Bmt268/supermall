<template>
  <div id="detail">
    <detailnavbar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detailnavbar>
    <scroll
      class="content"
      :pull-up-load="true"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import Detailnavbar from "./childcomps/Detailnavbar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import DetailBottomBar from "./childcomps/DetailBottomBar";

import Scroll from "components/content/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils.js";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detail",
  components: {
    Detailnavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出参数的信息
      this.itemParams = data.itemParams;

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      // 根据最新的数据，对应的dom是已经被渲染出来
      // 但是图片依然是没有加载完(目前获取到offsettop不包含其中的图片)
      // offsetTop 值不对的时候，都是因为图片的问题
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
      // });
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;

      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      }, 100);
    });
  },
  mounted() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, 0, 0);
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取Y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比
      // [0,7938,9120,9452,Number.Max_Value]
      // positionY在0到7938之间，index=0
      // positionY在7938到9120之间，index=1
      // positionY在9120到9452之间，index=2
      // positionY 超过9120值，index=3

      let length = this.themeTopYs.length;
      // 第二种
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 第一种方法
      // for (let i = 0; i < length; i++) {
      //   console.log(i); 这个i是一个string
      //   if (
      //     positionY > this.themeTopYs[parseInt(i)] &&
      //     positionY < this.themeTopYs[parseInt(i) + 1]
      //   ) {
      //     console.log(i);
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  /* 100%是根据父元素的高度决定的  */
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>