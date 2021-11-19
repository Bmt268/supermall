<template>
  <div id="detail">
    <detailnavbar></detailnavbar>
  </div>
</template>

<script>
import Detailnavbar from "./childcomps/Detailnavbar.vue";
export default {
  name: "Detail",
  components: {
    Detailnavbar,
  },
  data() {
    return {
      iid: null,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
  },
};
</script>

<style>
</style>