<template>
  <div class="container">
    <el-dialog
      :title="isRewrite === true ? '修改目录' : '新增目录'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handelClose"
    >
      <el-form :model="form" ref="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="所属学科" required prop="subjectID" v-if="!$route.query.id">
          <el-select v-model="form.subjectID" placeholder="请选择" >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in directoryList"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" required prop="directoryName">
          <el-input v-model="form.directoryName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <div style="text-align:right;margin-top: 50px;">
          <el-button @click="cancelFn">取 消</el-button>
          <el-button type="primary" @click="confirmFn">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    directoryList: {
      type: Array
    },
    isRewrite: {
      type: Boolean
    }
  },
  data () {
    return {
      form: {
        subjectID: '',
        directoryName: ''
      },
      // 校验规则
      rules: {
        // 学科id校验
        subjectID: [
          { required: true, message: '请选择所属学科', trigger: 'change' }
        ],
        // 学科名称校验
        directoryName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1-10之间', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 确认按钮
    confirmFn () {
      // console.log(this.form)
      // console.log(123)
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(valid)
        if (!valid) { // 如果未添加值 返回false
          return false
        } else { // 添加值 通过校验
          // console.log(123)
          await this.$emit('confirmEv', this.form)
          this.$emit('update:dialogVisible', false)
          // console.log(this.directoryList)
        }
      })
    },
    // 取消按钮
    cancelFn () {
      // console.log(123)
      this.$emit('cancelEV')
      this.$refs.ruleForm.resetFields()
    },
    // x关闭
    handelClose () {
      this.$emit('update:dialogVisible', false)
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped >
.el-select {
  width: 100%;
}
</style>
