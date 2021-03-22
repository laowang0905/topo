<template>
    <div class="menu-item" :class="icon" :id="id">
      <span>{{text}}</span>
    </div>
</template>

<script>
export default {
  name: 'menuItem',
  props: ['icon', 'text', 'id']
}
</script>

<style lang="less">
.menu-item {
    margin: .2rem 0;
    padding: .2rem 0;
    width: 100%;
    border-bottom: 1px solid #ddd;
    &:hover {
      background-color: #c5e7f6;
    }
    &::before {
      margin-right: .3rem;
      font-weight: bold;
    }
  }
</style>