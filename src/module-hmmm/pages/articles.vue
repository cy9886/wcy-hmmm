<template>
  <div>
    <div class='container'>
      <!-- 卡片布局 -->
      <el-card class="box-card">
          <!-- 顶部表单 -->
          <el-form :inline="true" :model="articleForm" class="demo-form-inline">
            <el-form-item label="关键字">
              <el-input size="small" placeholder="根据文章标题搜索"  v-model="articleForm.articleTitle"></el-input>
            </el-form-item>
            <el-form-item label="状态" class="status-input">
              <el-select size="small"  v-model="articleForm.articleState" placeholder="请选择">
                <el-option label="启用" value="启用"></el-option>
                <el-option label="禁用" value="禁用"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="deleteFn">清除</el-button>
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item class="add-btn">
              <el-button type="success" icon="el-icon-edit" size="small" @click="addArticleFn">新增技巧</el-button>
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
            :data="articleList"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              label="文章标题"
              width="400">
              <!-- <template v-slot="scope">
                {{ scope.row.title }}
                <i class="el-icon-film" v-if="scope.row.isIconShow" @click="videoFn(scope.row)"></i>
              </template> -->
              <template v-slot="scope">
            {{scope.row.title}}  <a :href="scope.row.videoURL" v-if="scope.row.isIconShow" style="color: #00f;font-size: 20px;" class="el-icon-film"></a>
            </template>
            </el-table-column>
            <el-table-column
              prop="visits"
              label="阅读数"
              width="200">
            </el-table-column>
            <el-table-column
              prop="username"
              label="录入人"
              width="190">
            </el-table-column>
            <el-table-column
              label="录入时间"
              width="200">
              <template v-slot="scope">
                {{ formatTimeFn(scope.row.createTime) }}
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
              <template v-slot="scope">
                {{ formatStateFn(scope.row.state) }}
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="viewFn(scope.row)" type="text" size="medium" >预览</el-button>
                  <el-button type="text" size="medium" @click="stateFn(scope.row)">{{formatState2Fn(scope.row.state)}}</el-button>
                  <el-button type="text" size="medium" @click="editFn(scope.row)" >修改</el-button>
                  <el-button type="text" size="medium" @click="deleteArticleFn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            class="page"
            background
            :current-page="page"
            :page-size="pagesize"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">>
          </el-pagination>
      </el-card>
      <!-- 新增弹窗 -->
      <article-add-dialog :is-dialog-show="isDialogShow" @closeEV="closeFn" @resetEV="resetFn" :target-data="targetData" :is-edit="isEdit"></article-add-dialog>

      <!-- 预览弹窗 -->
      <article-preview-dialog :is-preview-show="isPreviewShow" @closeEV="closeFn" :preview-target-data="previewTargetData"></article-preview-dialog>

    </div>

    <!-- 视频播放弹窗 -->
    <div class="videoBox">
      <!-- <div class="mask"> -->
        <video-player
          :options="playerOptions">
        </video-player>
      <!-- </div> -->
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import { list, remove, changeState } from '@/api/hmmm/articles'
import ArticleAddDialog from '../components/articles-add.vue'
import ArticlePreviewDialog from '../components/articles-preview.vue'

export default {
  components: {
    ArticleAddDialog,
    ArticlePreviewDialog
  },
  data () {
    return {
      articleForm: {
        articleTitle: '',
        articleState: ''
      },
      articleList: [], // 文章列表
      total: 0, // 文章总数
      page: 1, // 当前页码
      pagesize: 10, // 页容量
      copyArticleList: [], // 文章列表备份
      videoDialogShow: false, // 视频播放弹窗显示隐藏
      isDialogShow: false, // 新增文章弹窗
      isEdit: false, // 编辑
      targetData: {},
      isPreviewShow: false, // 预览弹窗
      previewTargetData: {}, // 预览目标数据
      playerOptions: {
        height: '360',
        sources: [{
          type: 'rtmp/mp4',
          src: ''

        }],
        techOrder: ['flash'],
        autoplay: true,
        controls: true,
        poster: '../../../src/static/img/poster.png'
      }
      // videoURL: '' // 视频地址
    }
  },
  created () {
    this.articleListFn()
  },
  methods: {
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
    // 文章列表
    async articleListFn () {
      const res = await list({
        page: this.page,
        pagesize: this.pagesize
      })
      console.log(res)
      this.articleList = res.data.items
      this.copyArticleList = res.data.items
      this.total = res.data.counts

      this.articleList.map(item => {
        // console.log(item.videoURL)
        if (item.videoURL === null || item.videoURL === '') {
          item.isIconShow = false
        } else {
          item.isIconShow = true
        }
      })
    },
    // 顶部表单 - 搜索按钮 - 点击事件
    onSubmit () {
      this.articleList = this.copyArticleList
      // console.log(this.articleForm.articleState)
      const newArticleList = this.articleList.filter(item => {
        // console.log(this.formatStateFn(item.state))
        if (this.articleForm.articleTitle === '' && this.articleForm.articleState === '') return this.articleListFn()
        if (this.articleForm.articleTitle === '') return this.formatStateFn(item.state) === `已${this.articleForm.articleState}`
        if (this.articleForm.articleState === '') return item.title === this.articleForm.articleTitle
        else return item.title === this.articleForm.articleTitle && this.formatStateFn(item.state) === `已${this.articleForm.articleState}`
      })
      this.articleList = newArticleList
    },
    // 顶部表单 - 清除按钮 - 点击事件
    deleteFn () {
      this.articleForm = {
        articleTitle: '',
        articleState: ''
      }
      this.articleListFn()
    },
    // 顶部表单 - 新增按钮 - 点击事件
    addArticleFn () {
      this.isEdit = false
      this.isDialogShow = true
    },
    // 预览 - 点击事件
    async viewFn (data) {
      this.isPreviewShow = true
      this.previewTargetData = data
      const res = await changeState(data)
      console.log(res)
    },
    // 页容量改变
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.page = 1
      this.articleListFn()
    },
    // 当前页改变
    handleCurrentChange (newPage) {
      this.page = newPage
      this.articleListFn()
    },
    // 点击视频图标
    videoFn (obj) {
      // this.videoDialogShow = true
      // this.playerOptions.sources[0].src = obj.videoURL// videoAddress为传过来的变量
    },
    // 视频弹窗 - 关闭前事件
    handleClose () {

    },
    // 弹窗关闭事件
    closeFn () {
      this.isDialogShow = false
      this.isPreviewShow = false
    },
    // 重置列表
    resetFn () {
      this.articleListFn()
    },
    // 修改按钮
    async editFn (data) {
      this.isEdit = true
      this.isDialogShow = true
      this.targetData = data
    },
    // 删除
    async deleteArticleFn (data) {
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
      console.log(res1)
      if (res1.data.success) this.$message.success('删除成功')
      // 当前页面没数据, page--
      if (this.articleList.length <= 1) {
        this.page--
        // 如果是第一页, 剩余一条, page--为0了, 传0页给后台不对
        // 所以判断下, 减完为0, 强制改回1
        if (this.page === 0) {
          this.page = 1
        }
      }
      this.articleListFn()
    },
    // 启用禁用按钮 - 点击事件
    async stateFn (data) {
      console.log(data)
      const res = await changeState(data)
      console.log(res)
      if (res.data.success) this.$message.success('操作成功')

      if (data.state === 0) {
        data.state = 1
      } else {
        data.state = 0
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.container{
  // position: relative;
}
.videoBox{
  position: absolute;
  top: 100px;
  left: 100px;
  width: 100%;
  height: 100%;
  display: none;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, .3);
}
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
  .el-icon-film{
    color: blue
  }
</style>
