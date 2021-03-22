<template>
  <div id="node-text-pos-menu" class="right-click-menu" style="z-index: 9">
    <div class="menu-item">
      <span>顶部居左</span>
    </div>
    <div class="menu-item">
      <span>顶部居中</span>
    </div>
    <div class="menu-item">
      <span>顶部居右</span>
    </div>
    <div class="menu-item">
      <span>中间居左</span>
    </div>
    <div class="menu-item">
      <span>居中</span>
    </div>
    <div class="menu-item">
      <span>中间居右</span>
    </div>
    <div class="menu-item">
      <span>底部居左</span>
    </div>
    <div class="menu-item">
      <span>底部居中</span>
    </div>
    <div class="menu-item">
      <span>底部居右</span>
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  name: "textPosMenu",
  components: {
    MenuItem,
  },
};
</script>

<style lang="less">
#node-text-pos-menu {
  
}
</style>