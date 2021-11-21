<template>
  <div id="detail">
    <detailnavbar class="detail-nav"></detailnavbar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import Detailnavbar from "./childcomps/Detailnavbar.vue";
import DetailSwiper from "./childcomps/DetailSwiper.vue";
import DetailBaseInfo from "./childcomps/DetailBaseInfo.vue";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import Scroll from "components/content/scroll/Scroll.vue";

import { getDetail, Goods, Shop } from "network/detail.js";
export default {
  name: "Detail",
  components: {
    Detailnavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
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
    });
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
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>