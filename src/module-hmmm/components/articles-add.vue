<template>
  <div class='container'>
    <el-dialog :title="isEdit ? '编辑文章' : '新增文章'" :visible="isDialogShow" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" size="small">
        <el-form-item label="文章标题:" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章内容:" prop="articleBody">
          <quill-editor v-model="form.articleBody" :option="editorOption" />
          <!-- <el-input type="textarea" v-model="form.articleBody" v-html="form.articleBody"></el-input> -->
          <!-- <el-input v-model="form.articleBody"></el-input> -->
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="form.videoURL" placeholder="请输入视频地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, update } from '@/api/hmmm/articles.js'
// import { quillEditor } from 'vue-quill-editor'

export default {
  props: {
    isDialogShow: {
      type: Boolean
    },
    isEdit: {
      type: Boolean
    },
    targetData: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'change' }
        ],
        articleBody: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        videoURL: [
          {}
        ]
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      }
    }
  },
  created () {
  },
  watch: {
    isDialogShow () {
      if (this.isDialogShow === true) {
        this.backFn()
      }
    }
  },
  methods: {
    // 弹窗-关闭之前执行, done()就关闭
    // 按下esc, 点击蒙层, 点击右上角x, 都会触发此方法
    handleClose (done) {
      this.$emit('closeEV')
      this.form = {
        title: '',
        articleBody: '',
        videoURL: ''
      }
    },
    // 弹窗 - 取消 - 点击事件
    cancelFn () {
      this.$emit('closeEV')
    },
    // 弹窗 - 确定 - 点击事件
    submitFn () {
      console.log(this.targetData)
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isEdit === true) { // 编辑
            const res = await update(this.targetData)
            console.log(res)
          } else { // 新增
            const res = await add(this.form)
            console.log(res)
            if (res.data.id) this.$message.success('新增成功')
          }
          this.$emit('resetEV') // 重新渲染
          // 重置表单
          this.$refs.form.resetFields()
        } else {
          return false
        }
      })
      this.$emit('closeEV')
    },
    // 修改转新增
    backFn () {
      if (this.isEdit === true) {
        this.form = this.targetData
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
