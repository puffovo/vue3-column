<template>
  <div class="home-page">\
    <!-- <h2>{{bigcolumnLen}}</h2> -->
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto middlestyle">
          <h2 class="font-weight-light text-muted">随心写作</h2>
          <img src="../assets/ink.webp" alt="callout" class="w-50"/>
          <h2 class="font-weight-light text-muted">自由表达</h2>
          <p>
          </p>
        </div>
      </div>
      <router-link to="Create" class="btn btn-primary my-2">开始写文章</router-link>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
export default defineComponent({
  name: 'HomePage',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('asyncGetColumn')
    })
    // vuex的状态储存是响应式的，从store中读取状态最简单的方法就是从计算属性中返回某个状态
    const list = computed(() => store.state.columns)
    // const bigcolumnLen = computed(() => store.state.columns.filter(c => c.id > 2).length)
    const bigcolumnLen = computed(() => store.getters.biggerColumnsLen)
    return {
      list,
      bigcolumnLen
    }
  }

})
</script>
<style>
.middlestyle{
  display: flex;
  align-items:center
}
</style>
