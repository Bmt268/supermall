<template>
  <div class="bottom-bar">
    <div class="select">
      <check-button class="btn"></check-button>
      <span> 全选</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CartBottomBar",
};
</script>

<style scoped>
.bottom-bar {
  background-color: #eee;
  height: 40px;
  position: relative;
}
.select {
  display: flex;
  align-items: center;
}
.btn {
  height: 18px;
  width: 18px;
}
</style>