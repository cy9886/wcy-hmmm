<template>
  <div class="container" >
    <el-form label-width="120px" >
      <el-form-item>
        <el-radio-group v-model="form.chkState">
          <el-radio label="1">通过</el-radio>
          <el-radio label="2">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见">
         <el-input type="textarea" v-model="form.chkRemarks" placeholder="请书写"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="quxiaoFn">取消</el-button>
        <el-button type="primary" @click="choiceFn">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { choiceCheck } from '@/api/hmmm/jingxuan.js'
export default {
  name: 'EmpDialog',
  props: {
    instData: {
      type: Number
    }
  },
  data () {
    return {
      form: {
        chkState: '1',
        chkRemarks: ''
      }
    }
  },
  methods: {
    async choiceFn () {
      const kande = Number(this.form.chkState)
      if (this.form.chkRemarks !== '') {
        const res = await choiceCheck({ id: this.instData, chkState: kande, chkRemarks: this.form.chkRemarks })
        console.log(res)
        this.$emit('guanbi')
      } else {
        this.$message.error('请填写意见')
      }
    },
    quxiaoFn () {
      this.$emit('guanbi')
    }
  }
}
</script>

<style scoped lang='less'></style>
