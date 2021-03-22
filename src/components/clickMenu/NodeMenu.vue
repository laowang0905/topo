<template>
  <div class="right-click-menu" id="node-menu">
    <MenuItem icon="el-icon-zoom-in" text="节点设置"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="应用布局"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="文字位置" id="change-node-text-pos"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="放大(Shift+)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="缩小(Shift-)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="顺时针旋转(Shift+U)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="逆时针旋转(Shift+I)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="删除节点(Delete)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="复制节点(Shift+C)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="撤销(Shift+Z)"></MenuItem>
    <MenuItem icon="el-icon-zoom-in" text="重做(Shift+R)"></MenuItem>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  name: "nodeMenu",
  components: {
    MenuItem,
  },
};
</script>

<style lang="less">
.right-click-menu {
  position: absolute;
  width: 130px;
  display: none;
  background-color: #ffffff;
  border: 1px solid #b7c8f6;
  border-radius: 0.4rem;
  padding: 0.5rem 0 0.5rem 0.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>