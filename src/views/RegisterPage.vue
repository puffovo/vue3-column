<template>
<div class="login-page mx-auto p-3 w-330">
   <h5 class="my-4 text-center">注册账号</h5>
  <validate-form @form-submit="onFormSubmit" style="width:30rem;margin:auto">
    <div class="mb-3">
    <label  class="form-label">用户名</label>
    <validate-input :rules="nameRules" v-model="usernameVal" type="text"
    placeholder="请输入用户名"
    ></validate-input>
  </div>
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
  <button class="btn btn-danger" style="margin-left:180px">注册</button>
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
// import useCreateToast from '../hooks/useCreateToast'
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
    const nameRules: RulesProp = [
      { type: 'required', msg: '用户名不能为空嗷！' }
    ]
    const emailVal = ref('') // 输入的邮箱
    const passwordVal = ref('') // 输入的密码
    const usernameVal = ref('') // 输入的密码
    const store = useStore()
    // 获得validate-input组件实例
    const inputRef = ref<any>()
    // 点击按钮触发，验证表单输入 监听一下ValidateEmail的结果
    const onFormSubmit = (result : boolean) => {
      // console.log('result', result)
      // 如果验证通过
      if (result) {
        store.dispatch('alreadyRegister', emailVal.value).then(({ code }) => {
          console.log('exts', code)
          if (code) {
            store.dispatch('registerUser', {
              email: emailVal.value,
              password: passwordVal.value,
              username: usernameVal.value
            }).then(({ code }) => {
              if (code) {
              // 注册成功
                alert('注册成功，1赶快登录叭！')
                setTimeout(() => {
                  router.replace('login')
                }, 1000)
              } else {
              // 注册失败
                alert('注册失败，服务器可能掉线了嗷..')
              }
            })
          } else {
            alert('邮箱已注册了嗷！')
          }
        })
      }
    }
    return {
      emailRules,
      passwordRules,
      nameRules,
      passwordVal,
      emailVal,
      onFormSubmit,
      inputRef,
      usernameVal
    }
  }
})
</script>
