<!-- 下拉菜单中的每一项 -->
<template>
  <li class="dropdown-option" :class="{'is-disabled': disabled}"> <!--假如disabled存在，则给它添加is-disabled样式  -->
  <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false // 默认值为false
    }
  }
})
</script>
<style>
/*  '*' 为所有标签都遵循的样式 */
/* class为option 和 disabled 下的 所有标签 */
/* 两个class之间一个. 没有空格 */
.dropdown-option.is-disabled * {
 color: #6c757d;
 background: transparent; /* 透明 */
 pointer-events: none; /* 点击 */
}
</style>
