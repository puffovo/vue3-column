<template>
  <div class="upload">
    <input type="file" @change="changeHandler" id="file">
  </div>
    <div class="container" v-if="iconUrl">
     <img :src='iconUrl' alt="">
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { GlobalDataProps } from '../store'
import { appendFile } from 'fs'
import { resolveSoa } from 'dns'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const changeHandler = (e:Event) => {
      const currentTarget = e.target as HTMLInputElement
      // 获取到第一个文件
      if (currentTarget.files) {
        // const file = Array.from(currentTarget.files)[0]
        const file = currentTarget.files[0]
        // const file = currentTarget.files
        // 可打印看看
        console.log('file', file.name)
        // 新建一个 FormData 对象
        const param = new FormData()
        // 把文件添加到 FormData对象里
        param.append('icon', file)
        // 可以打印看看
        // console.log(param.get('icon'))
        // 利用axios发送post请求
        axios.post('/post/upload', param, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then((res) => {
          // 调用查询方法
            const nameParam = { newName: res.data.newName }
            // const nameParam = res.data.newName
            console.log('namep', nameParam)
            return axios.post('/img', nameParam).then((res) => {
              store.commit('getIconId', res.data)
            })
          })
      }
    }
    // 必须用计算属性才能拿到
    const iconUrl = computed(() => store.state.iconUrl)
    console.log('iconUrl', iconUrl)
    return {
      changeHandler,
      iconUrl
    }
  }
})
</script>
<style scoped>
body {
  text-align: center;
}
.container {
  margin: 30px auto;
  padding: 30px;
  width: 60%;
  box-shadow: 0 0 5px rgb(190, 190, 190);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.container img {
  width: 250px;
  height: 150px;
  object-fit: cover;
  margin: 30px;
}
.upload {
  margin: 30px auto;
  width: 100px;
  height: 20px;
  background-color: rgba(135, 206, 235, 0.2);
  border: 1px dashed black;
  border-radius: 5px;
  position: relative;
}
.upload:hover {
  background-color: rgba(135, 206, 235, 1);
}
.upload::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "上传头图";
  font-size: 20px;
  text-align: center;
  font-family: "fangsong";
  line-height: 20px;
  user-select: none;
}
#file {
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
