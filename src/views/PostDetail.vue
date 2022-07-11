<template>
<div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentPost.imgUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4 " v-if="currentPost.imgUrl">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createTime}}</span>
      </div>
      <div>{{currentPost.content}}</div>
      <div @click.prevent = 'deletePost'>
        <div class="btn btn-primary">删除文章</div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import axios from 'axios'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
export default defineComponent({
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const postId = route.params.postId // 获得的一个string类型
    const currentPost = computed(() => store.getters.getPostItem(postId))
    const deletePost = () => {
      const Id = route.params.postId // 获得的一个string类型
      store.dispatch('asyncdeletePost', Id).then(res => {
        if (res.code) {
          const columnId = computed(() => store.state.user._id)
          alert('文章删除成功，1秒后跳转到专栏首页')
          setTimeout(() => {
            router.replace(`/column/detail/${columnId.value}`)
          }, 1000)
        }
      })
    }
    return {
      currentPost,
      deletePost
    }
  }
})
</script>
