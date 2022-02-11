<template>
  <div class='container'>
    <!-- 卡片布局 -->
    <el-card class="box-card">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="breadcrumbShow">
          <el-breadcrumb-item>学科管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{ subjectName }}</el-breadcrumb-item>
          <el-breadcrumb-item>标签管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 顶部表单 -->
        <el-form :inline="true" :model="params" class="demo-form-inline">
          <el-form-item label="标签名称">
            <el-input size="small"  v-model="params.tagName"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="status-input">
            <el-select size="small" v-model="params.state" placeholder="请选择">
              <el-option label="启用" value="启用"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="deleteFn">清除</el-button>
            <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
          </el-form-item>
            <el-form-item class="add-btn">
              <el-button type="success" icon="el-icon-edit" size="small" @click="addTagsFn">新增标签</el-button>
            </el-form-item>
          <el-form-item class="add-btn">
            <el-page-header @back="goBack" title="返回学科" v-if="breadcrumbShow"></el-page-header>
          </el-form-item>
        </el-form>
        <!-- 顶部警告 -->
          <el-alert
            :title="`数据一共${total}条`"
            type="info"
            :closable="false"
            show-icon>
          </el-alert>
        <!-- 主体内容 -->
        <el-table
          class="table"
          :data="tagsList"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="subjectName"
            label="所属学科"
            width="220">
          </el-table-column>
          <el-table-column
            prop="tagName"
            label="标签名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="username"
            label="创建者"
            width="220">
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="220">
            <template v-slot="scope">
              {{ formatTimeFn(scope.row.addDate) }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="220">
            <template v-slot="scope">
              {{ formatStateFn(scope.row.state) }}
            </template>
          </el-table-column>
           <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="medium" @click="toggleFn(scope.row)">{{formatState2Fn(scope.row.state)}}</el-button>
                <el-button type="text" size="medium" @click="editFn(scope.row)">修改</el-button>
                <el-button type="text" size="medium" @click="deleteTagsFn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          class="page"
          background
          :current-page="params.page"
            :page-sizes="[10, 15, 20, 25]"
          :page-size="params.pagesize"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </el-card>
    <!-- 新增弹框 -->
    <tags-add-dialog :is-dialog-show="isDialogShow" @closeEV="closeFn" :subject-label="subjectLabel" @updateTagsListEV="updateTagsListFn" :is-edit="isEdit" :target-data="targetData" @resetTagsListEV="resetTagsListFn"></tags-add-dialog>
  </div>
</template>

<script>
import { listAPI, remove, changeState } from '@/api/hmmm/tags.js'
import { simpleAPI } from '@/api/hmmm/subjects.js'
import dayjs from 'dayjs'
import TagsAddDialog from '../components/tags-add.vue'

export default {
  components: {
    TagsAddDialog
  },
  data () {
    return {
      params: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        tagName: '', // 标签名称
        state: ''
      },
      total: 0, // 总数
      tagsList: [], // 标签列表
      copyTagsList: [],
      isDialogShow: false,
      // subjectID: '',
      simpleSubjectList: [], // 学科简单列表
      subjectLabel: [],
      isEdit: false,
      targetData: {},
      breadcrumbShow: false,
      subjectName: ''
    }
  },
  created () {
    this.tagsListFn()
    this.simpleSubjectListFn()
  },
  methods: {
    // 请求 - 学科简单列表
    async simpleSubjectListFn () {
      const res = await simpleAPI()
      this.simpleSubjectList = res.data
      if (this.$route.params && this.$route.params.id) {
        const subjectId = this.$route.params.id
        const index = res.data.items.findIndex(item => item.id === subjectId)
        this.subjectName = res.data.items[index].subjectName
        this.breadcrumbShow = true
      }
      this.simpleSubjectList.forEach(item => {
        this.subjectLabel.push(item.label)
      })
      // console.log(this.subjectLabel)
    },
    // 请求 - 标签列表
    async tagsListFn () {
      const res = await listAPI({
        page: this.params.page,
        pagesize: this.params.pagesize
      })
      console.log(res)
      this.total = res.data.counts
      this.tagsList = res.data.items
      this.copyTagsList = [...this.tagsList]
      // this.subjectID = res.data.items.subjectID
    },
    // 格式化状态
    formatStateFn (str) {
      if (str === 0) {
        return '已禁用'
      } else {
        return '已启用'
      }
    },
    // 格式化状态
    formatState2Fn (str) {
      if (str === 0) {
        return '启用'
      } else {
        return '禁用'
      }
    },
    // 格式化时间
    formatTimeFn (time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 按钮 - 搜索 - 点击事件
    onSubmit () {
      this.tagsList = this.copyTagsList
      const newTagsList = this.tagsList.filter(item => {
        if (this.params.state === '' && this.params.tagName === '') {
          return this.tagsListFn()
        }
        if (this.params.state === '') {
          return item.tagName === this.params.tagName
        } else if (this.params.tagName === '') {
          return this.formatStateFn(item.state) === `已${this.params.state}`
        } else {
          return item.tagName === this.params.tagName && this.formatStateFn(item.state) === `已${this.params.state}`
        }
      })
      // 重新渲染标签列表
      this.tagsList = newTagsList
    },
    // 按钮 - 清除 - 点击事件
    deleteFn () {
      this.params.tagName = ''
      this.params.state = ''
      this.tagsListFn()
    },
    // 按钮 - 修改状态
    async toggleFn (data) {
      const res = await changeState(data)
      console.log(res)
      if (res.data.success) this.$message.success('操作成功')

      if (data.state === 0) {
        data.state = 1
      } else {
        data.state = 0
      }
    },
    // 按钮 - 新增标签 - 点击事件
    addTagsFn () {
      this.isEdit = false
      this.isDialogShow = true
    },
    // 新增标签 - 弹窗传回数据
    updateTagsListFn (obj) {
      this.tagsList.push(obj)
      // 重新渲染
      this.tagsListFn()
    },
    // 按钮 - 删除 - 点击事件
    async deleteTagsFn (data) {
      const res = await this.$confirm('此操作将永久删除部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        // console.log(err)
        return err
      })
      // res值英文: confirm / cancel字母
      // 如果返回的结果是 cancel 说明用户取消了删除
      if (res === 'cancel') return this.$message('您取消了删除')
      const res1 = await remove(data)
      if (res1.data.success) this.$message.success('删除成功')
      // 当前页面没数据, page--
      if (this.tagsList.length <= 1) {
        this.params.page--
        // 如果是第一页, 剩余一条, page--为0了, 传0页给后台不对
        // 所以判断下, 减完为0, 强制改回1
        if (this.params.page === 0) {
          this.params.page = 1
        }
      }
      // 重新渲染
      this.tagsListFn()
    },
    // 按钮 - 修改 - 点击事件
    async editFn (data) {
      this.targetData = data
      this.isDialogShow = true
      this.isEdit = true
    },
    // 编辑状态下 - 重新渲染列表
    resetTagsListFn (obj) {
      const index = this.tagsList.findIndex(item => item.id === obj.id)
      this.tagsList.splice(index, 1, obj)
      // console.log(this.tagsList)
      // 重新渲染
      // this.tagsListFn()
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange (newSize) {
      this.params.pagesize = newSize
      this.params.page = 1
      this.tagsListFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange (newPage) {
      this.params.page = newPage
      this.tagsListFn()
    },
    // 弹窗关闭事件
    closeFn () {
      this.isDialogShow = false
    },
    // 返回学科
    goBack () {
      this.$router.replace({
        path: '/subjects/list'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  .box-card {
    margin: 10px 10px
  }
  .status-input{
    margin-left: 40px;
  }
  .add-btn{
    float:right
  }
  .table{
    margin-top: 15px;
  }
  .page{
    margin: 20px 0;
    float: right;
  }
  ::v-deep .el-page-header__left::after {
    width: 0;
    height: 0
  }
  ::v-deep .el-card {
    color: #409eff
  }
  ::v-deep .el-page-header {
    line-height: 36px;
  }
</style>
