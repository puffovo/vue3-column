<template>
<!-- teleport控制在DOM中的哪个节点渲染了HTML -->
  <teleport to='#message'>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export type MessageType = 'success'|'error'|'default'
export default defineComponent({
  props: {
    msg: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'defalut' // 默认值
    }
  },
  setup (props, context) {
    const node = document.createElement('div')
    node.id = 'message'
    document.appendChild(node)
  }
})
</script>
