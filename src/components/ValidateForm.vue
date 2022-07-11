// eslint-disable-next-line vue/valid-template-root
<template>
<form action="" class="validate-form-container">
<slot name="default"></slot>
<div class="submit-area" @click.prevent="submitform">
<slot name="submit">
    <!-- 插槽默认内容，假如什么都不填就渲染默认内容 -->
    <button type="submit" class="btn btn-primary">登录</button>
</slot>
</div>
</form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'], /* 在emit字段中确定发送的事件，可以是数组也可以是对象形式 */
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const callback = (func:any) => {
      funcArr.push(func)
    }
    const submitform = () => {
      // 循环调用每一个ValidateInput，获取验证结果，直接使用every会遇到false就直接返回了，这样剩下的input就没有执行了
      // 所以需要先map得到所有input的结果数组，再用every
      const result = funcArr.map(item => item()).every(res => res)
      // 触发绑定在LoginPage.vue中的form-submit
      context.emit('form-submit', result)
    }
    // 接收到所有input的验证函数后，就执行回调，该回调是将验证函数push进一个函数数组
    // 然后在点击submit时 ,就循环遍历该函数数组的结果,所有的结果都为true时返回true
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitform
    }
  }
})
</script>
