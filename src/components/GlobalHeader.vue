<!-- 专栏大横条 -->
<template>
  <nav
    class="navbar navbar-dark bg-primary justify-content-between px-4 mb-4 "
  >
    <!-- px表示在left right的padding为4 -->
    <router-link class="navbar-brand" to="/">泡芙专栏</router-link>
    <ul v-if="!user.isLogin">
      <li class="list-inline-item">
        <router-link to="Login" class="btn btn-outline-light mt-2">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="register" class="btn btn-outline-light mt-2">注册</router-link>
      </li>
    </ul>
    <ul v-else>
      <li class="list-inline-item">
        <drop-down :title="`你好 ${user.username}`">
          <dropdown-item><router-link class="dropdown-item" to="/Create">新建文章</router-link></dropdown-item>
          <!-- 或者直接写个disabled -->
          <dropdown-item><router-link class="dropdown-item" :to="`/column/detail/${columnId}`">我的文章</router-link></dropdown-item>
          <dropdown-item :disabled="true"><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
          <dropdown-item><div class="dropdown-item" @click="handleLogout">退出登录</div></dropdown-item>
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropdownItem from './DropdownItem.vue'
import { useStore } from 'vuex'
import { UserProps, GlobalDataProps } from '../store'
import { useRouter } from 'vue-router'
// import { GlobalDataProps } from '../store'
// export interface UsersProps {
//   isLogin: boolean;
//   name?: string;
//   id?: number;
// }

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const handleLogout = () => {
      store.commit('logout')
      router.push('/')
    }
    const columnId = computed(() => store.state.user._id)
    return {
      handleLogout,
      columnId
    }
  }
})
</script>
