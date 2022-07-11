// vuex全局配置
// 引入vuex
import { createStore } from 'vuex'
// 引入用户和文章列表
import { ColumnProps, PostProps } from './testData'
import {
  requestLogin,
  requestUser,
  registerUser,
  registerAlready,
  requestColumn,
  requestColumnItem,
  requestPost,
  requestIcon,
  requestDeletePost
} from '../http/index'
import axios from 'axios'
export interface UserProps {
    isLogin: boolean,
    username?: string,
    _id?:number,
    columnId?: number,
}
export interface GlobalDataProps {
    columns: ColumnProps[],
    columnItem: ColumnProps,
    posts:PostProps[],
    postsItem: PostProps,
    user: UserProps,
    token: string,
    iconId: string,
    iconUrl: string
}
const store = createStore<GlobalDataProps>({
  // 全局共享的数据（专栏列表、文章列表、登陆人信息）
  state: {
    columns: [], // 专栏
    columnItem: {} as ColumnProps,
    posts: [], // 文章
    postsItem: {} as PostProps,
    user: { isLogin: false }, // 登陆人
    token: localStorage.getItem('token') || '',
    iconId: '',
    iconUrl: ''
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
  mutations: {
    // 登录后更改信息
    login (state, { code, token }) {
    // 新对象替换老对象，可以用对象展开运算符
      // state.user = { ...state.user, isLogin: true }
      if (code) {
        state.token = token
        // 设置请求头
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        // key, value
        localStorage.setItem('token', token)
      }
    },
    logout (state) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
      state.token = ''
      state.user.isLogin = false
    },
    getUser (state, { user }) {
      state.user = { ...user, isLogin: true }
      state.user.columnId = state.user._id
    },
    // 将新建的文章给定对应的登陆人，第二个参数是payload（额外的参数）
    /*  createPost (state, newPost) {
      state.posts.push(newPost)
    }, */
    alreadyUser (state) {
      if (localStorage.getItem('userInfo')) {
        state.user = JSON.parse(localStorage.getItem('userInfo') as string)
        state.token = JSON.parse(localStorage.getItem('token') as string)
      }
    },
    getColumn (state, data) {
      state.columns = [...data.list]
      // state.columns = {...data.list} // 这样写columns就变成object类型了
    },
    getColumnItem (state, data) {
      console.log('datacolumn', data)
      state.columnItem = data.item
    },
    getPost (state, data) {
      console.log('datapost', data)
      state.posts = data.list
    },
    getIconId (state, data) {
      state.iconId = data
      state.iconUrl = 'http://127.0.0.1:8081/img/' + state.iconId
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  // 从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c._id > 2).length
    },
    // 返回一个函数
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c._id === id)
    },
    getPostById: (state) => (columnId: string) => {
      return state.posts.filter(c => c.columnId.toString() === columnId)
    },
    getPostItem: (state) => (id: string) => {
      state.postsItem = state.posts.filter(c => c._id === parseInt(id))[0]
      return state.postsItem
    }
  },
  actions: {
    // 登录
    async asyncLogin ({ commit }, { email, password }) {
      // { data }直接获取返回结果中的data
      const { data } = await requestLogin(email, password)
      commit('login', data)
      return data
    },
    async asyncGetUser ({ commit }) {
      const { data } = await requestUser()
      commit('getUser', data)
      return data
    },
    // 组合Action
    async loginAndGetUser ({ dispatch }, loginData) {
      // loginData就是email和password
      return dispatch('asyncLogin', loginData).then(data => {
        // code为1登录成功, 0登录失败
        data.code && dispatch('asyncGetUser')
        return data
      })
    },
    // 注册
    async asyncRegister ({ commit }, { email, password, username }) {
      const { data } = await registerUser(email, password, username)
      // commit('getUser', data)
      return data
    },
    async registerUser ({ dispatch }, registerData) {
      return dispatch('asyncRegister', registerData).then(data => {
        // 这里的data对象就是asyncRegister给的data对象
        return data
      })
    },
    // 判断是否已经注册
    async asyncAlreadyRegister ({ commit }, email) {
      const { data } = await registerAlready(email)
      // data.code && commit('login', data)
      return data
    },
    async alreadyRegister ({ dispatch }, email) {
      return dispatch('asyncAlreadyRegister', email).then(data => {
        return data
      })
    },
    // 获取专栏
    async asyncGetColumn ({ commit }) {
      const { data } = await requestColumn()
      commit('getColumn', data)
    },
    // 获取指定id专栏
    async asyncGetColumnItem (store, id) {
      const { data } = await requestColumnItem(id)
      store.commit('getColumnItem', data)
    },
    // 获取文章列表
    async asyncGetPost (store) {
      const { data } = await requestPost()
      store.commit('getPost', data)
    },
    // 上传文件
    async asyncgetIcon ({ commit }) {
      const { data } = await requestIcon()
      store.commit('getIcon', data.data)
    },
    // 删除文章
    async asyncdeletePost (store, id) {
      const { data } = await requestDeletePost(id)
      return data
    }
  }
})

export default store
