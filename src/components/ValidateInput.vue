<template>
<div class="validate-input-container pb-3">
    <input
    v-if="tag != 'textarea'"
    type="email" class="form-control" :class="{'is-invalid': emailRef.error}"  id="exampleInputEmail1"
    aria-describedby="emailHelp"
    :value="emailRef.val"
    @blur="validateEmail"
    @input="updateValue"
    v-bind="$attrs"> <!-- @input实现页面流向数据,而:value="emailRef.val"实现数据流向页面 -->
    <!-- $attrs决定attribute会被赋予哪个元素 -->
     <textarea
    v-else
    type="email" class="form-control" :class="{'is-invalid': emailRef.error}"  id="exampleInputEmail1"
    aria-describedby="emailHelp"
    :value="emailRef.val"
    @blur="validateEmail"
    @input="updateValue"
    v-bind="$attrs">
    </textarea>
    <div class="invalid-feedback" v-if="emailRef.error">{{emailRef.msg}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
// 邮箱正则表达式 ^表示匹配输入的开始(用在[]中表示非) +表示一个或多个 []表示匹配的字符范围 ()表示捕获分组，确定一个被匹配的组 (ab)*表示匹配重复的属性，如ababab..{2,5}表示匹配2到5个 $表示结束
const emailReg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
interface RuleProp {
    type: 'required' | 'email'|'password',
    msg: string
}
export type RulesProp = RuleProp[]
// 因为在登录和写文章都用到了validateinput组件，但写文章是textarea不是Input
export type TagType = 'input' | 'textarea'
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input' // 默认值
    }

  },
  // 在APP.vue中的validateInput组件上写placeholder和class，默认会跑到其根元素div上
  inheritAttrs: false, // 不希望组件的根元素继承组件的attribute，禁用Attribute继承
  // setup中要传入props！！否则会报错
  setup (props, context) {
    // console.log(context.attrs)
    // 表单输入、表单错误提示
    const emailRef = reactive({
      val: props.modelValue || '', // 通过modelValue与App中的v-model="emailVal"进行双向绑定,modelvalue就是emailVal
      error: false,
      msg: ''
    })
    // console.log('input', emailRef)
    // console.log('modev', props.modelValue) //modelValue的值就是App.vue中emailVal的值
    // KeyboardEvent键盘事件
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      emailRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateEmail = () => {
      let allpass = true
      if (props.rules) {
        // every()会遍历数组每一项，用于检测数组中的所有元素是否都满足指定条件（该条件是个函数），有一项不满足返回false，都满足返回true
        allpass = props.rules.every(item => {
          let ipass = true
          emailRef.msg = item.msg
          switch (item.type) {
            case 'required':
              ipass = (emailRef.val.trim() !== '') // 输入不为空时为真
              break
            case 'email':
              ipass = emailReg.test(emailRef.val)
              break
            case 'password':
              if ((emailRef.val as string).length < 3) {
                ipass = false
              } else {
                ipass = true
              }
              break
            default:
              break
          }
          return ipass
        })
        emailRef.error = !allpass
        // console.log('allpass', allpass) // 如果有一个不符合条件 则allpassed为false，error为true
      }
      return allpass
    }
    onMounted(() => {
      // 子给父（ValidateInput给ValidateForm传参），将自己验证函数（validateEmail）传出去
      emitter.emit('form-item-created', validateEmail)
    })
    return {
      emailRef,
      validateEmail,
      updateValue
    }
  }
})
</script>
