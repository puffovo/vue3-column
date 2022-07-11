<!-- 下拉菜单 -->
<template>
<div class="dropdown" ref="dropdownRef">
    <!-- 通过点击a链接 触发click函数 将isOpen置为true，显示下拉菜单 -->
<a href="#" class="btn btn-outline-light mt-2 dropdown-toggle" @click.prevent="toggleopen">{{title}}</a><!-- @click.prevent阻止事件默认行为,在a标签中使用不会跳转 -->
<!-- bootstrap中的下拉菜单默认是display:none，通过display:block让他显示 -->
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickableInside" :style="{display:'block'}" v-if="isOpen">
  <!--   <li><router-link class="dropdown-item" to="Create">新建文章</router-link></li>
    <li><a class="dropdown-item" href="#">编辑资料</a></li> -->
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleopen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownRef = ref<null | HTMLElement>(null)
    /* 这一段写作一个hook：useClickOutside
    // MouseEvent表示点击事件
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        // console.log(dropdownRef.value)
        // node.contains(otherNode) 如果otherNode是node节点本身或node后代 返回true
        // console.log(e.target)
        // 如果e.target不是dropdown节点（鼠标点到外面）并且下拉条是打开的，则关闭下拉条
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    // 命名和ref="。"中的一样时，当dom进行挂载时，就可以从dropdownRef.value中获取到DOM节点
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    }) */
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false // setup中这段逻辑只会执行一次，更新的时候不会再执行，因此需要watch来监测响应式对象的变化
      }
    })
    return {
      isOpen,
      toggleopen,
      dropdownRef
    }
  }
})
</script>
