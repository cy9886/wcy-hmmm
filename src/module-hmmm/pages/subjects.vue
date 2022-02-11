<template>
  <div class="container">
    <div class="subject">
      <el-card>
        <el-row :gutter="24">
          <el-col :span="18">
            <!-- 学科名称 -->
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="学科名称" prop="subjectName">
                <el-input v-model="subjectName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="clearTextFn">清除</el-button>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="text-align: right;" :span="6">
            <!-- 新增学科按钮 -->
            <el-button type="success" @click="dialogShowFn">
              <i class="el-icon-edit"></i>新增学科
            </el-button>
            <!-- 弹框 -->
            <subjectsAddVue
              ref="sub"
              :dialogVisible="dialogVisible"
              @cancelEV="cancelFn"
              @confirmEV="confirmFn"
              :dialog-visible.sync="dialogVisible"
              :isRewrite="isRewrite"
            ></subjectsAddVue>
          </el-col>
        </el-row>
        <!-- 数据统计 -->
        <el-alert type="info" class="el-icon-info" :closable="false">数据一共{{ total }}条</el-alert>
        <!-- 学科表格 -->
        <el-table :data="subjectAllList" style="width: 100%" highlight-current-row>
          <el-table-column type="index" label="序号" width="50" height="30"></el-table-column>
          <el-table-column prop="subjectName" label="学科名称" width="100"></el-table-column>
          <el-table-column prop="username" label="创建者" width="100"></el-table-column>
          <el-table-column label="创建日期" width="180">
            <template v-slot="scope" >
            {{parseTime(scope.row.addDate)}}
            </template>
          </el-table-column>
          <el-table-column prop="isFrontDisplay" label="前台是否显示" width="120"></el-table-column>
          <el-table-column prop="twoLevelDirectory" label="二级目录" width="100"></el-table-column>
          <el-table-column prop="tags" label="标签" width="100"></el-table-column>
          <el-table-column prop="totals" label="题目数量" width="100"></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="text" size="small" @click="categoryFn(scope.row)">学科分类</el-button>
              <el-button type="text" size="small" @click="tagFn(scope.row)">学科标签</el-button>
              <el-button type="text" size="small" @click="rewriteFn(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteFn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-pagination
          style="text-align: right; margin-top: 20px;"
          background
          layout="total,prev, pager, next, sizes, jumper"
          :total="total"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { list, add, update, remove } from '@/api/hmmm/subjects.js'
import { parseTime } from '@/utils'
import subjectsAddVue from '../components/subjects-add.vue'
export default {
  data () {
    return {
      PageData: { // 页面页码
        page: 1,
        pagesize: 10
      },
      subjectAllList: [], // 学科列表
      subjectName: '', // 学科名称
      isFrontDisplay: 1, // 是否在页面显示
      total: 1, // 总数
      dialogVisible: false, // 弹窗显示 默认关闭
      isRewrite: false, // 是否为修改状态 false表示否
      id: '', // 修改id/删除id
      upDate: {}
    }
  },
  components: {
    subjectsAddVue
  },
  created () {
    this.getAllListFn()
  },
  methods: {
    // 时间格式化
    parseTime: parseTime,
    // 获取学科列表
    async getAllListFn () {
      const res = await list(this.PageData)
      console.log(res)
      this.subjectAllList = res.data.items
      this.total = res.data.counts
    },
    // 搜索按钮
    onSubmit () {
      // 输入框内容不为空
      if (this.subjectName.trim().length !== 0) {
        console.log('submit!')
        // 搜索时 subjectName 重新赋值
        this.PageData = { // 页面页码
          page: 1,
          pagesize: 10,
          subjectName: this.subjectName
        }
        this.getAllListFn()
        console.log(this.PageData)
      } else {
        this.$message.error('请输入学科名称')
      }
    },

    // 清空输入框
    clearTextFn () {
      this.PageData = { // 页面页码
        page: 1,
        pagesize: 10
      }
      this.subjectName = ''
      this.getAllListFn()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.PageData.pagesize = val
      this.getAllListFn()
    },
    // 跳转到哪一页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 请求数据 当前页数据覆盖原来数据
      this.PageData.page = val
      this.getAllListFn()
    },
    // 点击弹窗显示
    dialogShowFn () {
      // console.log(123)
      this.dialogVisible = true
    },
    // 点击取消按钮
    cancelFn (val) {
      this.isRewrite = false
      this.dialogVisible = val
    },
    // 点击确定添加按钮
    async confirmFn (obj) {
      this.dialogVisible = false // 弹窗关闭
      if (this.isRewrite === false) {
        this.isRewrite = false // 新增事件
        // 新增
        const delivery = obj.delivery === true ? 1 : 0
        const res = await add({
          subjectName: obj.name,
          isFrontDisplay: delivery
        })
        this.$message({ type: 'success', message: '新增学科成功！' })
        console.log(res)
      } else {
        // console.log(this.$refs.sub.form.name)
        this.upDate = this.$refs.sub.form
        const isFrontDisplay = this.upDate.isFrontDisplay === true ? 1 : 0
        const res = await update({
          id: this.id,
          isFrontDisplay: isFrontDisplay,
          subjectName: this.upDate.name
        })
        console.log(res)
      }
      this.getAllListFn()
    },
    //  修改事件
    rewriteFn (obj) {
      this.dialogVisible = true
      this.isRewrite = true
      this.id = obj.id
      // this.upDate.subjectName = obj.subjectName
      // console.log(obj) // 点击该数据
      // console.log(this.$refs.sub.form)
      // 判断当前状态 与子组件对象属性对应
      if (obj.isFrontDisplay === 1) {
        this.$refs.sub.form = {
          name: obj.subjectName,
          delivery: true
        }
      } else {
        this.$refs.sub.form = {
          name: obj.subjectName,
          delivery: false
        }
      }
      // this.$message({ type: 'success', message: '修改学科成功！' })
    },
    // 删除事件
    deleteFn (obj) {
      console.log(obj)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (this.total === 0) return this.$message.error('没有数据了哦~')
        const res = await remove(obj)
        console.log(res)
        this.getAllListFn()
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
    // 学科分类切换
    categoryFn (obj) {
      // this.$router.push(`directorys?id=${this.id}&name=${this.subjectName}`)
      this.$router.push({
        path: 'directorys',
        query: {
          id: obj.id,
          name: obj.subjectName
        }
      })
    },
    // 学科标签切换
    tagFn (obj) {
      this.$router.push(`tags?id=${obj.id}&name=${obj.subjectName}`)
    }
  }
}
</script>

<style scoped  lang="scss">
.demo-form-inline {
  margin-left: 10px;
}
.el-icon-edit {
  padding-right: 5px;
}
</style>
