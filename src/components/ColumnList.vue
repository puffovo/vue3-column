<!-- 专栏列表 -->
<template>
  <div>
    <div class="row">
      <!-- mb:margin-botton -->
      <div v-for="column in list" :key="column._id" class="col-4 mb-4"> <!-- 一共12，col-4就是三等分-->
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
          <!-- rounded-circle变圆 border添加边框 -light浅灰色，w-25宽度设置25% ，my-3：y方向的margin单位是3 -->
          <img :src="column.imgUrl" class="rounded-circle border border-light w-25" :alt="column.title" />
            <h5 class="card-title">{{column.title}}</h5>
            <p class="card-text text-left">
            {{column.des}}
            </p>
            <!-- to：到名为column的路由 -->
            <!-- 第二种格式：用模板字符串 :to="`/column/${column.id}`" 但是怎么用不了？-->
            <!-- <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link> -->
            <!-- <router-link :to="{name:'column',params: {id:column._id}}" class="btn btn-outline-primary">进入专栏</router-link> -->
            <router-link
            :to="`/column/detail/${column._id}`"
             class="btn btn-outline-primary btn-sm mt-3"
            >进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../testData'
// export interface ColumnProps {
//   id: number;
//   avatar: string;
//   title: string;
//   description: string;
// }
declare const require: any
export default defineComponent({
  name: 'ColumnList',
  // props:[]书写简单，但不能添加类型，不能设置默认值
  // props:{ }
  props: {
    list: {
      // Array是数组的构造函数，不是一个类型，不能用类型断言，把一个构造函数断言成一个类型，添加prototype
      // prototype接收一个泛型，可以将一个构造函数返回传入的泛型类型
      type: Array as PropType<ColumnProps[]>, // list的类型
      required: true // 是否必须传递
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        /*         if (!column.avatar) {
          // 如果头像不显示
          column.avatar = require('@/assets/column.jpg')
        } */
        return column
      })
    })
    return {
      columnList
    }// 必须用return { } 不能return columnList
  }
})
</script>
