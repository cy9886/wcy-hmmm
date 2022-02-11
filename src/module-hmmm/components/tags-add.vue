<template>
  <div class='container'>
    <el-dialog :title="isEdit ? '编辑目录' : '新增目录'" :visible="isDialogShow" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" size="small">
        <el-form-item label="所属学科" required prop="subject">
          <el-select v-model="form.subject" placeholder="请选择" >
              <el-option v-for="(item, index) in unique(subjectLabel)" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="目录名称" required prop="tagName">
          <el-input v-model="form.tagName" placeholder="请输入目录名称" autocomplete="off"></el-input>
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
import { addAPI, update } from '@/api/hmmm/tags'
import { list } from '@/api/hmmm/subjects'

export default {
  props: {
    isDialogShow: {
      type: Boolean
    },
    subjectLabel: {
      type: Array
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
        subject: '',
        tagName: ''
      },
      rules: {
        subject: [
          { required: true, message: '请选择所属学科', trigger: 'change' }
        ],
        tagName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' }
        ]
      },
      subjectID: '',
      subjectList: []
    }
  },
  watch: {
    isDialogShow () {
      if (this.isDialogShow === true) {
        console.log(this.isEdit)
        this.editFn() // 数据回显
      }
    }
  },
  created () {
    // this.subjectListFn()
  },
  methods: {
    // 简单学科列表去重
    unique (arr) {
      return Array.from(new Set(arr))
    },
    // 弹窗-关闭之前执行, done()就关闭
    // 按下esc, 点击蒙层, 点击右上角x, 都会触发此方法
    handleClose (done) {
      this.$emit('closeEV')
      this.form.subject = ''
      this.form.tagName = ''
    },
    // 弹窗 - 取消 - 点击事件
    cancelFn () {
      this.$emit('closeEV')
      this.$refs.form.resetFields()
    },
    // 弹窗 - 确定 - 点击事件
    submitFn () {
      // 兜底验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isEdit === true) {
            // 编辑状态
            const res = await update({
              ...this.targetData,
              subjectName: this.form.subject,
              tagName: this.form.tagName
            })
            if (res.data.success) this.$message.success('修改成功')
            this.$emit('resetTagsListEV', {
              ...this.targetData,
              subjectName: this.form.subject,
              tagName: this.form.tagName
            })
          } else {
            // 新增状态
            // 调接口
            // 获取学科id
            const index = this.subjectList.findIndex(item => item.subjectName === this.form.subject)
            // console.log(index)
            this.subjectID = this.subjectList[index].id
            // console.log(this.subjectID)
            // 增加标签接口请求
            const res = await addAPI({
              tagName: this.form.tagName,
              subjectID: this.subjectID
            })
            if (res.data.id) this.$message.success('增加标签成功')
            // 数据添加到列表中 子传父传出去
            this.$emit('updateTagsListEV', this.subjectList[index])
          }
          // 关闭弹窗
          this.$emit('closeEV')
          // 重置表单
          this.$refs.form.resetFields()
        } else {
          return false
        }
      })
    },
    // 获取学科id
    async subjectListFn () {
      const res = await list()
      // 根据学科名找对应的学科id
      this.subjectList = res.data.items // 学科详细列表
    },
    // 修改 - 数据回显
    editFn () {
      if (this.isEdit === true) {
        this.form.subject = this.targetData.subjectName
        this.form.tagName = this.targetData.tagName
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
