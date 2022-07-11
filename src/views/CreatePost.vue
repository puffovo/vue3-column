<template>
  <div class="create-post-page" id="create">
    <!-- <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4> -->
    <h4>编辑文章</h4>
    <upload-file></upload-file>
    <validate-form @form-submit="onFormSubmit" class="w-75 m-auto">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules" v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template v-slot:submit>
        <div class="text-center"><button class="btn btn-primary btn-large ">发表文章
    </button></div>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps } from '../store'
import { PostProps } from '../testData'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import UploadFile from '../components/UploadFile.vue'
import { requestCreatePost } from '../../http/index'
/* import Uploader from '../components/Uploader.vue'
import createMessage from '../components/createMessage'
import { beforeUploadCheck } from '../helper' */
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm,
    UploadFile
  },
  setup () {
    // const uploadedData = ref()
    const titleVal = ref('')
    const router = useRouter()
    /*     const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    let imageId = '' */
    const titleRules: RulesProp = [
      { type: 'required', msg: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', msg: '文章详情不能为空' }
    ]
    // 点击提交按钮将文章加入到state.posts
    const store = useStore<GlobalDataProps>()
    const onFormSubmit = (result:boolean) => {
      if (result) {
        const { columnId, username } = store.state.user
        console.log('columnId', columnId)
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime(), // 获取当前时间戳 获得的是毫秒
            title: titleVal.value,
            content: contentVal.value,
            columnId: (columnId).toString(),
            createTime: new Date().toLocaleString(),
            excerpt: '1111',
            editer: username,
            imgUrl: store.state.iconUrl
          }
          requestCreatePost(newPost).then(({ data }) => {
            if (data.code) {
              router.replace(`/column/detail/${columnId}`)
            }
          })
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>
<style #scoped>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
#create{
  margin-left: 50px
}
</style>
