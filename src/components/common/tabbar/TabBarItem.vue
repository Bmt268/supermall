<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activecolor: {
      type: String,
      default: "deeppink",
    },
  },
  data() {
    return {
      // isactive: true,
    };
  },
  computed: {
    isactive() {
      // /home ->item1(/home) =true
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activestyle() {
      return this.isactive ? { color: this.activecolor } : {};
    },
  },
  methods: {
    itemclick() {
      this.$router.replace(this.link);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /* 默认49px */
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>