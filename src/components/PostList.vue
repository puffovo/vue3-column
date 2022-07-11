<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4><router-link :to="`/posts/detail/${post._id}`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.imgUrl" class="col-4">
            <img :src="post.imgUrl" :alt="post.title" class="rounded-lg w-100 h-50">
          </div>
          <p :class="{'col-8': post.imgUrl}" class="text-muted card-text">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createTime}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../testData'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
