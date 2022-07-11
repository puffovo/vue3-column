<template>
<div class="login-page mx-auto p-3 w-330">
   <h5 class="my-4 text-center">登录泡芙专栏</h5>
  <validate-form @form-submit="onFormSubmit" style="width:30rem;margin:auto">
  <div class="mb-3">
    <label  class="form-label">邮箱地址</label>
    <validate-input :rules="emailRules" v-model="emailVal" type="text"
    placeholder="请输入邮箱地址"
    ref="inputRef"></validate-input>
    <!-- 设置placeholder和class会默认在其根元素div上，禁用attribute继承和v-bind="￥attrs" -->
    <!-- v-model用在表单中，实现表单输入的双向绑定 -->
    <!-- {{emailVal}} --> <!-- 双向绑定测试 -->
  </div>
  <div class="mb-3">
    <label class="form-label">密码</label>
    <validate-input
    placeholder="请输入密码"
    type="password" v-model="passwordVal" :rules="passwordRules"></validate-input>
  </div>
  <!-- 缩写 #submit -->
  <template v-slot:submit>
  <button class="btn btn-danger" style="margin-left:180px">登录</button>
  </template>
</validate-form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// useRoute获取路由信息，useRouter定义路由的一系列行为
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    // 错误输入邮箱
    const emailRules: RulesProp = [
      { type: 'required', msg: '电子邮箱地址不能为空嗷！' },
      { type: 'email', msg: '请输入正确的电子邮箱格式嗷！' }
    ]
    // 错误输入密码
    const passwordRules: RulesProp = [
      { type: 'required', msg: '密码不能为空嗷！' },
      { type: 'password', msg: '密码不能少于3位数嗷！' }
    ]
    const emailVal = ref('') // 输入的邮箱
    const passwordVal = ref('') // 输入的密码
    const store = useStore()
    // 表单输入
    // const emailRef = reactive({
    //   val: '',
    //   error: false,
    //   msg: ''
    // })
    // // 表单失去焦点时的事件
    // const validateEmail = () => {
    //   // trim()去除字符串头尾空格
    //   if (emailRef.val.trim() === '') {
    //     emailRef.error = true
    //     emailRef.msg = '邮箱地址不能为空'
    //   } else if (!emailReg.test(emailRef.val)) { // RegExpObject.test(string)检测一个字符串是否匹配某个模式，匹配返回true
    //     emailRef.error = true
    //     emailRef.msg = '请输入正确的电子邮箱格式'
    //   }
    // }
    // 获得validate-input组件实例
    const inputRef = ref<any>()
    // 点击按钮触发，验证表单输入 监听一下ValidateEmail的结果
    const onFormSubmit = (result : boolean) => {
      // console.log(inputRef)
      // console.log('hhh', inputRef.value.validateEmail()) // 获得validate-input组件实例上的方法
      // 如果验证通过
      if (result) {
        // router-link 和router中的参数是一样的，Link去ColumnDetail中id为1的
        // router.push({ name: 'column', params: { id: 1 } })
        store.dispatch('loginAndGetUser', {
          email: emailVal.value,
          password: passwordVal.value
        }).then(({ code }) => {
          if (code) {
            // 登录成功
            alert('登陆成功，1s跳转到主页')
            setTimeout(() => {
              router.replace('/')
            }, 1000)
          } else {
            // 登录失败
            alert('登陆失败，请验证邮箱或密码是否正确')
          }
        })
      }
    }
    return {
      emailRules,
      passwordRules,
      passwordVal,
      emailVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>
