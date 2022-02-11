<template>
  <div class="container">
    <div class="el-card el-card__body mjqc_box">
      <!-- 标题 -->
      <div class="mjqc_flex">
        <span class="mjqc_size">说明：目前支持学科和关键字条件筛选</span>
        <router-link :to="'/questions/new'">
          <el-button class="el-button--success el-button--small">
            <i class="el-icon-edit"></i>
            <span>新增试题</span>
          </el-button>
        </router-link>
      </div>
      <!-- 表单数据 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <div class="el-col el-col-6">
            <el-form-item label="学科" class="el-input--small">
              <el-select
                v-model="form.subjectID"
                style="width: 100%"
                placeholder="请选择"
                @input="xuekeFn(form.subjectID)"
              >
                <el-option
                  v-for="item in strData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="二级目录" class="el-input--small">
              <el-select
                v-model="form.catalogID"
                style="width: 100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in towData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="标签" class="el-input--small">
              <el-select
                v-model="form.tags"
                style="width: 100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in LabelData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="关键字" class="el-input--small">
              <el-input
                v-model="form.keyword"
                placeholder="根据题干搜索"
              ></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="试题类型" class="el-input--small">
              <el-select
                v-model="form.questionType"
                style="width: 100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in questionType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="难度" class="el-input--small">
              <el-select
                v-model="form.difficulty"
                style="width: 100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in difficulty"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="方向" class="el-input--small">
              <el-select
                v-model="form.direction"
                style="width: 100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in direction"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="录入人" class="el-input--small">
              <el-select
                v-model="form.creatorID"
                style="width: 100%"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in userData"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="题目备注" class="el-input--small">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="企业简称" class="el-input--small">
              <el-input v-model="form.shortName"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-6">
            <el-form-item label="城市" class="el-input--small">
              <el-select
                v-model="form.province"
                style="width: 48%"
                placeholder="请选择活动区域"
                @input="lowerFn(form.province)"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.city"
                style="width: 48%; margin-left: 10px"
                placeholder="请选择活动区域"
              >
                <el-option
                  v-for="item in citys"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6" style="text-align: right">
            <div style="margin-left: 80px">
              <el-button class="el-button--small" @click="clearFn"
                >清除</el-button
              >
              <el-button
                class="el-button--primary el-button--small"
                @click="SearchFn"
                >搜索</el-button
              >
            </div>
          </div>
        </el-row>
      </el-form>
      <!-- 选项卡 -->
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="待审核" name="second"></el-tab-pane>
          <el-tab-pane label="已审核" name="third"></el-tab-pane>
          <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
        </el-tabs>
        <div
          class="el-alert alert el-alert--info is-light"
          style="margin-bottom: 15px"
        >
          <i class="el-alert__icon el-icon-info"></i>
          <span class="el-alert__title el-alert__content">
            数据一共{{ AllData.counts }}条</span
          >
        </div>
      </div>
      <!-- 表格 -->
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="number" label="试题编号" width="150">
          </el-table-column>
          <el-table-column prop="subject" label="学科" width="120">
          </el-table-column>
          <el-table-column prop="catalog" label="目录" width="120">
          </el-table-column>
          <el-table-column prop="questionType" label="题型" width="120">
            <template slot-scope="scope">
              <span>{{ formatEmploeeFn(scope.row.questionType) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="question" label="题干" width="300">
             <template slot-scope="scope">
              <span>{{ tiganFn(scope.row.question) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="addDate" label="录入时间" width="300">
            <template slot-scope="scope">
              <span>{{ fromTime(scope.row.addDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="difficulty" label="难度" width="120">
            <template slot-scope="scope">
              <span>{{ nanduFn(scope.row.difficulty) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="录入人" width="120">
          </el-table-column>
          <el-table-column prop="chkState" label="审核状态" width="120">
            <template slot-scope="scope">
              <span>{{ ShenHeZuangTaiFn(scope.row.chkState) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="chkRemarks" label="审核意见" width="120">
          </el-table-column>
          <el-table-column prop="chkUser" label="审核人" width="120">
          </el-table-column>
           <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button  @click="showinteFn(scope.row)"  type="text" size="small">预览</el-button>
        <el-button @click="shenheFn(scope.row)" :disabled='IfshenheFn(scope.row)' type="text" size="small">审核
        </el-button>
        <el-button @click="tiaozhuanFn(scope.row)" type="text" size="small">修改
        </el-button>
        <el-button @click="shangxiaFn(scope.row)" type="text" size="small">
          <span v-if="scope.row.publishState!==0">下架</span>
          <span v-else>上架</span>
          </el-button>
        <el-button @click="removeFn(scope.row)"  type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
        <!-- 试题审核弹框 -->
        <el-dialog title="题目审核" :visible.sync="showDialog"  width="600px">
               <tionCheck :instData='instData' @guanbi='guanbiFn'></tionCheck>
          </el-dialog>
          <!-- 试题预览弹框 -->
          <el-dialog title="题目预览" :visible.sync="showinteData"  width="800px">
               <prEview :intemAll='intemAll' @andwanEd="endFn"></prEview>
          </el-dialog>
        <!-- 分页 -->
        <div class="block right">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="fromLink.page"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="fromLink.pagesize"
            layout="sizes, prev, pager, next, jumper"
            :total="AllData.counts">
          </el-pagination>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import { simple, xueke, biaoqian, users, choice, remove, choicePublish, zuihou } from '@/api/hmmm/jingxuan.js'
import { questionType, difficulty, direction } from '@/api/hmmm/constants.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import tionCheck from '../components/questions-check.vue'
import prEview from '../components/questions-preview.vue'
export default {
  components: {
    tionCheck,
    prEview
  },
  data () {
    return {
      tableData: [],
      form: {
        subjectID: '', // 学科
        catalogID: '', // 二级目录
        difficulty: '', // 难度
        keyword: '', // 关键字
        tags: '', // 标签名称
        questionType: '', // 试题类型
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        province: '', // 所在省份
        city: '' // 所在城市
      },
      strData: [],
      towData: [],
      LabelData: [],
      questionType: [], // 试题类型
      difficulty: [], // 难度
      direction: [], // 方向
      userData: [], // 用户列表
      provinces: [], // 省份
      citys: [], // 地区

      fromLink: {
        page: 1, // 页数
        pagesize: 5 // 页尺寸
      },
      breakfast: {}, // 裁剪form
      activeName: 'first', // 选项卡
      AllData: [], // 全部题库
      Sizes: [], // 筛选后
      number: '',
      showDialog: false, // 弹框
      showinteData: false,
      instData: '', // 试题审核
      intemAll: ''// 试题预览
    }
  },
  created () {
    this.userFn()
    this.gotoFn()
    this.subjectIDFn()
    this.questionType = questionType
    this.difficulty = difficulty
    this.direction = direction
    this.provinces = provinces()
  },
  methods: {
    // 请求初始全部数据
    async gotoFn () {
      const res = await choice(this.fromLink)
      this.AllData = res.data
      this.tableData = this.AllData.items
      console.log(this.AllData)
    },
    // 通用方法
    SearchGetFn () {
      Object.assign(this.breakfast, this.form)
      for (var key in this.breakfast) {
        if (this.breakfast[key] === '' || this.breakfast[key] === null) {
          delete this.breakfast[key]
        }
      }
      const datas = { ...this.fromLink, ...this.breakfast }
      return choice(datas)
    },
    // 搜索题目,拿到数据
    async SearchFn () {
      this.form.chkState = ''
      const res = await this.SearchGetFn()
      this.AllData = res.data
      // 赋值给表格
      this.tableData = this.AllData.items
      this.activeName = 'first'
      console.log(this.AllData)
    },
    // 选项卡
    async handleClick (tab) {
      if (tab) {
        this.number = tab.index
        const num = this.number - 1
        if (num >= 0) {
          this.form.chkState = num
          const res = await this.SearchGetFn()
          this.AllData = res.data
          // 赋值给表格
          this.tableData = this.AllData.items
          console.log(this.form.chkState)
        } else {
          this.SearchFn()
        }
      } else {
        this.SearchFn()
      }
    },
    async handleSizeChange (val) {
      this.fromLink.pagesize = val
      const res = await this.SearchGetFn()
      this.AllData = res.data
      console.log(res.data)
      // 赋值给表格
      this.tableData = this.AllData.items
    },
    async  handleCurrentChange (val) {
      this.fromLink.page = val
      const res = await this.SearchGetFn()
      this.AllData = res.data
      // 赋值给表格
      this.tableData = this.AllData.items
    },
    // 清除from
    clearFn () {
      this.form = {
        subjectID: '', // 学科
        catalogID: '', // 二级目录
        difficulty: '', // 难度
        keyword: '', // 关键字
        tags: '', // 标签名称
        questionType: '', // 试题类型
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        province: '', // 所在省份
        city: '' // 所在城市
      }
    },
    // 下级地区
    lowerFn (elt) {
      const res = citys(elt)
      this.citys = res
      this.form.city = ''
    },
    // 用户简单列表
    async userFn () {
      const res = await users()
      this.userData = res.data
    },
    // 请求学科
    async subjectIDFn () {
      const res = await simple()
      this.strData = res.data
    },
    // 请求学科下的其他相关联的数据
    async xuekeFn (id) {
      // 学科下目录
      const res = await xueke(id)
      this.towData = res.data
      // 学科下标签
      const one = await biaoqian(id)
      this.LabelData = one.data
      // 重置数据
      this.form = {
        subjectID: this.form.subjectID, // 学科
        catalogID: '', // 二级目录
        difficulty: '', // 难度
        keyword: '', // 关键字
        tags: '', // 标签名称
        questionType: '', // 试题类型
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        city: '', // 所在城市
        province: '' // 所在省份
      }
    },
    // 题型
    formatEmploeeFn (int) {
      if (int === '1') {
        return '单选'
      } else if (int === '2') {
        return '多选'
      } else {
        return '简答'
      }
    },
    // 难度
    nanduFn (int) {
      if (int === '1') {
        return '简单'
      } else if (int === '2') {
        return '一般'
      } else {
        return '困难'
      }
    },
    // 审核状态
    ShenHeZuangTaiFn (int) {
      if (int === 0) {
        return '待审核'
      } else if (int === 1) {
        return '已审核'
      } else {
        return '已拒绝'
      }
    },
    // 时间格式
    fromTime (timer) {
      var jsonDate = new Date(timer).toJSON()
      return new Date(new Date(jsonDate) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
    },
    // 题干去除标签
    tiganFn (int) {
      const title = int.replace(/<[^>]+>/g, '')// 去掉所有的html标记
      return title
    },
    // 删除试题
    removeFn (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleClick()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 跳转
    tiaozhuanFn (int) {
      console.log(int.id)
      this.$router.push({ name: 'questions-new', query: { id: int.id } })
    },
    // 上下架
    shangxiaFn (int) {
      if (int.publishState === 0) {
        int.publishState = 1
      } else if (int.publishState === 1) {
        int.publishState = 0
      }
      choicePublish(int)
    },
    // 审核
    shenheFn (int) {
      this.showDialog = true
      this.instData = int.id
      console.log(this.instData)
    },
    // 审核拒绝后禁用
    IfshenheFn (int) {
      if (int.chkState === 1) {
        return true
      } else {
        return false
      }
    },
    // 关闭弹窗1
    guanbiFn () {
      this.showDialog = false
      this.handleClick()
    },
    // 请求当前试题预览数据
    async showinteFn (int) {
      const res = await zuihou({ id: int.id })
      res.data.questionType = this.formatEmploeeFn(res.data.questionType)
      res.data.difficulty = this.nanduFn(res.data.difficulty)
      res.data.question = this.tiganFn(res.data.question)
      res.data.answer = this.tiganFn(res.data.answer)
      this.intemAll = res.data
      console.log(res)
      this.showinteData = true
    },
    endFn () {
      this.showinteData = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mjqc_box {
  margin: 10px;
}
.mjqc_flex {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.mjqc_size {
  font-size: 12px;
  color: pink;
}
.right{
  float: right;
}
</style>
