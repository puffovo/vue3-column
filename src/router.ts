// 路由
// 引入路由
import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import RegisterPage from './views/RegisterPage.vue'
import PostDetail from './views/PostDetail.vue'
import store from './store'
import axios from 'axios'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory, // 必填，决定采用哪种类型路由
  routes: [
    {
      path: '/', // 指代的url
      name: 'home', // 别名
      component: HomePage
    },
    {
      path: '/login', // 指代的url
      name: 'login', // 别名
      component: LoginPage,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/Column/detail/:columnId', // 动态路由
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/Create',
      name: 'create',
      component: CreatePost,
      meta: { requireLogin: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/posts/detail/:postId',
      name: 'post',
      component: PostDetail
    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  // to and from are both route objects. must call `next`.
  const { user, token } = store.state
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('asyncGetUser').then(() => {
        // 如果有token信息且在登录和注册界面，则直接跳转到home
        if (to.meta.redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      })
    }
  }
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
