<template>
  <div class="container">
    <el-dialog
      :title="isRewrite === true ? '修改学科' : '新增学科'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      style="text-align: left;"
    >
      <!-- 弹窗内容 -->
      <el-form ref="roleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入学科名称"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="form.delivery" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {

  props: {
    dialogVisible: {
      type: Boolean
    },
    isRewrite: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // const validateName = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入学科名称'))
    //   }
    // }
    return {
      // centerDialogVisible: true
      form: {
        name: '',
        delivery: true
      },
      rules: {
        name: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
          // { validator: validateName, trigger: 'blur' }
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/ }
        ]
      }
    }
  },
  methods: {
    // 取消按钮
    cancelFn () {
      this.$refs.roleForm.resetFields()
      this.$emit('cancelEV', false)
    },
    // 确定按钮
    confirmFn () {
      this.$refs.roleForm.validate(async (valid) => {
        console.log(valid)
        if (!valid) return false
        // 等待值传出去之后  表单清空
        await this.$emit('confirmEV', this.form)
        // 置空
        this.form = {
          name: '',
          delivery: true
        }
        // 提示清空
        this.$refs.roleForm.resetFields()
      })
    },
    // 小x关闭
    handleClose () {
      this.$refs.roleForm.resetFields()
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang='sass'>

</style>
