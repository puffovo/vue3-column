<template>
<div id="container">
  <global-header :user="currentUser"></global-header>
  <router-view></router-view> <!-- 需要变化的内容 -->
  <!-- <message-hint type='error'></message-hint> -->
<!--     <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer> -->
</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
// import MessageHint from './components/MessageHint.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
    // MessageHint
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
