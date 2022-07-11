<template>
  <!-- <pre>{{route}}</pre> --> <!-- pre里的字符会保留空格和换行符，文本显示为等宽字体 -->
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="columnItem&&columnItem._id">
      <div class="col-3 text-center">
        <img :src="columnItem.imgUrl" alt="这是图片" class="rounded-circle border w-50">
      </div>
      <div class="col-9">
        <h4>{{columnItem.title}}</h4>
        <p class="text-muted">{{columnItem.des}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 获取路由信息
import PostList from '../components/PostList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    // const currentId = +route.params.id // 默认是string类型，+可以转换成number类型
    /*     // find()查找数组中符合条件的第一个元素
    // 找到id为currentId的用户，只一个用户
    const column = testData.find(c => c.id === currentId)
    // 找到id为currentId（用户）的文章，可能多篇文章
    const list = testPosts.filter(post => post.id === currentId) */
    // 使用vuex来获取column和list
    const store = useStore<GlobalDataProps>()
    /* const column = computed(() => store.state.columns.find(c => c.id === currentId))
    const list = computed(() => store.state.posts.filter(post => post.id === currentId)) */
    // 使用Vuex的getter
    // const column = computed(() => store.getters.getColumnById(currentId))
    // 通过路由获取专栏id
    const columnId = route.params.columnId
    onMounted(() => {
      store.dispatch('asyncGetColumnItem', columnId)
      store.dispatch('asyncGetPost')
    })
    const columnItem = computed(() => store.state.columnItem)
    console.log('columnItem', columnItem)
    const list = computed(() => store.getters.getPostById(columnId))
    console.log('list', list)
    return {
      route,
      columnItem,
      list
    }
  }
})
</script>
