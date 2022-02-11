<template>
  <div class="container">
    <div class="directorys">
      <el-card class="box-card">
        <!-- 面包屑导航 -->
        <div slot="header" class="clearfix" v-if="$route.query.id">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item>学科管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.query.name }}</el-breadcrumb-item>
            <el-breadcrumb-item>目录管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 表头 -->
        <el-row :gutter="24">
          <el-col :span="18">
            <el-form
              :inline="true"
              :model="searchData"
              :rules="rules"
              ref="ruleForm"
              class="demo-form-inline"
            >
              <el-form-item label="目录名称" prop="directoryName">
                <el-input v-model="searchData.directoryName"></el-input>
              </el-form-item>
              <el-form-item class="state" label="状态" prop="state">
                <el-select v-model="searchData.state" placeholder="请选择">
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="禁用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="clearFn">清除</el-button>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="text-align: right;" :span="6">
            <!-- 返回学科按钮 -->
            <router-link v-if="$route.query.id" to="/subjects/list">
              <i class="el-icon-back"></i>
              <el-button type="text" style="margin-left:5px">返回学科</el-button>
            </router-link>
            <!-- 新增目录按钮 -->
            <el-button type="success" @click="addDirectoryFn">
              <i class="el-icon-edit"></i>新增目录
            </el-button>
          </el-col>
        </el-row>
        <!-- 弹框 -->
        <directorysAddVue
          @confirmEv="confirmFn"
          @cancelEV="cancelFn"
          :dialogVisible.sync="dialogVisible"
          :directory-list="simpleList"
          ref="dialog"
          :isRewrite="isRewrite"
        ></directorysAddVue>
        <!-- 表格 -->
        <el-alert type="info" :closable="false" class="el-icon-info">数据一共{{ total }}条</el-alert>
        <el-table :data="directoryList.items" style="width: 100%" class="table">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="subjectName" label="所属学科" width="120"></el-table-column>
          <el-table-column prop="directoryName" label="目录名称" width="150"></el-table-column>
          <el-table-column prop="username" label="创建者" width="150"></el-table-column>
          <el-table-column label="创建日期" width="150">
            <template v-slot="scope">{{ parseTime(scope.row.addDate) }}</template>
          </el-table-column>
          <el-table-column prop="totals" label="面试题数量" width="100"></el-table-column>
          <el-table-column label="状态" width="120">
            <template v-slot="scope">{{ scope.row.state === 1 ? '已启用' : '已禁用' }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="text"
                @click="disabledFn(scope.row)"
              >{{ scope.row.state === 1 ? '禁用' : '启用' }}</el-button>
              <el-button
                type="text"
                :disabled="scope.row.state === 1"
                @click="reWriteFn(scope.row)"
              >修改</el-button>
              <el-button
                type="text"
                :disabled="scope.row.state === 1"
                @click="delFn(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页栏 -->
        <el-pagination
          style="text-align: right; margin-top: 20px;"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>

import { add, list, changeState, remove, update, simple } from '@/api/hmmm/directorys'
import directorysAddVue from '../components/directorys-add.vue'
import { parseTime } from '@/utils'
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      total: 1, // 总数
      pageData: {
        page: 1, // 当前页数
        pagesize: 10 // 每页多少行
      },
      searchData: {
        directoryName: '', // 目录名称
        state: '' // 状态1开启 0 屏蔽
      },
      subjectID: '', // 学科id
      directoryList: {}, // 目录列表
      simpleList: [], // 简单目录列表
      dialogVisible: false, // 弹框默认开启
      rules: {
        directoryName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入正确的内容' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      isRewrite: false // 修改状态  false 为新增 true 为修改
    }
  },
  components: {
    directorysAddVue
  },
  created () {
    this.getDirectoryListFn()
    this.getSimpleListFn()
  },
  methods: {
    async getSimpleListFn () {
      const res = await simple()
      console.log(res)
      this.simpleList = res.data
    },
    parseTime: parseTime,
    // 获取目录列表
    async getDirectoryListFn () {
      if (this.$route.query.id) {
        const res = await list({
          ...this.pageData,
          // 追加subjectID
          subjectID: this.$route.query.id
        })
        this.directoryList = res.data
        this.total = res.data.counts
      } else {
        const res = await list(this.pageData)
        console.log(res)
        this.directoryList = res.data
        this.total = res.data.counts
      }
    },
    // 点击添加目录
    addDirectoryFn () {
      this.isRewrite = false // 新增弹窗
      // 弹框开启
      this.dialogVisible = true
    },
    // 点击确认事件
    async confirmFn (obj) {
      // 添加目录
      // console.log(124)
      // console.log(obj)
      if (!this.isRewrite) {
        const res = await add(obj)
        console.log(res)
      } else {
        const res = await update(this.$refs.dialog.form)
        console.log(res)
      }
      this.getDirectoryListFn()
      // 清空
      this.$refs.dialog.$refs.ruleForm.resetFields()
      this.dialogVisible = false // 弹窗关闭
    },
    // 搜索
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid)
        if (!valid) return false
        console.log('submit!')
        this.pageData = {
          ...this.pageData,
          ...this.searchData
        }
        this.getDirectoryListFn()
        console.log(this.pageData)
      })
    },
    // 清空事件
    clearFn () {
      this.searchData = {
        subjectID: '',
        directoryName: '',
        state: ''
      }
      this.pageData = {
        page: 1,
        pagesize: 10
      }
      // 清空
      this.$refs.ruleForm.resetFields()
      this.getDirectoryListFn()
    },
    // 分页栏
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageData.pagesize = val
      this.getDirectoryListFn()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageData.page = val
      this.getDirectoryListFn()
    },
    // 禁用按钮
    async disabledFn (obj) {
      // console.log(obj)
      const state = obj.state === 0 ? 1 : 0
      const res = await changeState({
        id: obj.id,
        state: state
      })
      console.log(res)
      this.getDirectoryListFn()
    },
    // 删除列表
    delFn (lid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (this.total === 0) return this.$message.error('没有数据了~')
        const res = await remove({ id: lid })
        console.log(res)
        this.getDirectoryListFn()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改数据
    async reWriteFn (obj) {
      this.isRewrite = true
      this.dialogVisible = true // 弹窗显示
      console.log(obj)
      this.$refs.dialog.form = obj
      // console.log(res)
    },
    // 取消事件
    cancelFn () {
      this.dialogVisible = false
      // 表单清空
      this.$refs.dialog.$refs.ruleForm.resetFields()
      // 对象清空
      this.$refs.dialog.form = {}
    }
  }
}
</script>

<style scoped >
.directorys {
  padding: 8px;
}
/* .box-card {
  padding: 10px;
} */
.state {
  margin-left: 40px;
}

.table {
  margin-top: 20px;
}
.el-icon-edit {
  margin-right: 5px;
}
.el-icon-back {
  color: #409eff;
}
</style>
