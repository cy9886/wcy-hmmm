<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 顶部提示 -->
      <el-row>
        <el-col :span="24" class="top_title">{{$route.query.id?'试题修改':'试题录入'}}</el-col>
      </el-row>
      <hr class="hr-line" />
      <!-- 顶部提示 end -->
      <!-- 试题录入 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 学科 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="学科" prop="subjectID">
              <el-select
                style="width: 100%"
                v-model="ruleForm.subjectID"
                placeholder="请选择"
                @change="onSubjectChange"
              >
                <el-option
                  v-for="obj in subjectList"
                  :key="obj.value"
                  :label="obj.label"
                  :value="obj.value"
                >{{obj.label}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 目录 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="目录" prop="catalogID">
              <el-select
                style="width: 100%"
                v-model="ruleForm.catalogID"
                placeholder="请选择"
              >
                <el-option
                  v-for="obj in directorysList"
                  :label="obj.directoryName"
                  :key="obj.id"
                  :value="obj.id"
                >{{obj.directoryName}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 企业 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业" prop="enterpriseID">
              <el-select
                style="width: 100%"
                v-model="ruleForm.enterpriseID"
                placeholder="请选择"
              >
                <el-option
                  v-for="obj in companyList"
                  :key="obj.id"
                  :label="obj.company"
                  :value="obj.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 城市 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="城市" prop="province">
              <el-select
                style="width: 48%"
                v-model="ruleForm.province"
                placeholder="请选择"
                @change="onProvinceChange"
              >
                <el-option
                  v-for="(item,index) in province"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select
                style="width: 48%; margin-left: 4%"
                v-model="ruleForm.city"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in citys"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 方向 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="方向" prop="direction">
              <el-select
                style="width: 100%"
                v-model="ruleForm.direction"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in directionList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题型 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="题型" prop="questionType">
                <el-radio
                  v-for="obj in questionType"
                  v-model="ruleForm.questionType"
                  :key="obj.value"
                  :label="obj.value"
                >{{obj.label}}</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 难度 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="难度" prop="difficulty">
              <el-radio-group v-model="ruleForm.difficulty">
                <el-radio
                  v-for="obj in difficulty"
                  :key="obj.value"
                  :label="obj.value"
                >{{obj.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题干 -->
        <el-row>
          <el-col :span="24">
            <el-form-item class="stem " label="题干" prop="question">
              <quillEditor class="myQuillEditor" v-model="ruleForm.question"  :options="editorOption"></quillEditor>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项 -->
        <!-- 单选 -->
        <template  v-if="ruleForm.questionType === '1'">
            <el-row>
              <el-col>
                <el-form-item label="选项">
                  <div v-for="(obj, index) in questionOption" :key="index" style="width: 100%">
                    <el-row v-if="index < 4" v-model="ruleForm.options">
                      <el-col :span="2">
                        <el-radio v-model="radio" :label="obj.code">{{ obj.code }}:</el-radio>
                      </el-col>
                      <el-col :span="12">
                        <el-input v-model="obj.title" :value="55" placeholder="请输入内容">{{obj.title}}</el-input>
                      </el-col>
                      <el-col :span="8">
                        <el-upload action="#" class="upload-demo">
                          <el-button class="upload_btn">点击上传</el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row>
                    <el-col>
                      <el-button type="danger" size="small" disabled
                        >+增加选项与答案</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
        </el-row>
        </template>
        <!-- 多选 -->
         <!-- 多选 -->
        <template v-if="ruleForm.questionType === '2'">
          <div v-for="(obj, index) in questionOption" :key="index" style="width: 100%">
            <el-checkbox-group v-model="ruleForm.checkList">
              <el-row v-if="index < questionIndex">
                <el-col>
                  <el-form-item  label="选项：">
                    <el-row>
                      <el-col :span="3">
                        <el-checkbox :label="index">{{ obj.code }}:</el-checkbox>
                      </el-col>
                      <el-col :span="12"> <el-input v-model="obj.title"></el-input> </el-col>
                      <el-col :span="8">
                        <el-upload class="upload-demo" action="#" multiple >
                          <el-button class="upload_btn">点击上传</el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
          <el-row>
            <el-col>
              <el-button class="addBtn" type="danger" size="small" @click="addItem">+增加选项与答案</el-button>
            </el-col>
          </el-row>
        </template>

        <!-- 解析视频 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="解析视频">
              <el-input style="width: 100%" placeholder="请输入内容" v-model="ruleForm.videoURL"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 答案解析 -->
        <el-row>
          <el-col :span="24">
            <el-form-item class="analysis" label="答案解析" prop="answer">
              <quillEditor class="myQuillEditor" v-model="ruleForm.answer" :options="editorOption"></quillEditor>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题目备注 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="题目备注">
              <el-input style="width: 100%" type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 试题标签 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="试题标签" prop="business">
              <el-select style="width: 100%" v-model="ruleForm.tags" placeholder="请选择">
                <el-option v-for="(item,index) in tagList" :key="index" :label="item.label" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button v-if="$route.query.id" type="success" @click="submitForm('ruleForm')"
            >确认修改</el-button
          >
          <el-button v-else type="primary" @click="submitForm('ruleForm')"
            >确认提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { simple as subjectListAPI } from '@/api/hmmm/subjects'
import { list as directorysListAPI } from '@/api/hmmm/directorys'
import { simple as tagsListAPI } from '@/api/hmmm/tags'
import { list as companyListAPI } from '@/api/hmmm/companys'
import { add as addAPI, detail as detailAPI, update as updateAPI } from '@/api/hmmm/questions'
// import { provinceAndCityData } from 'element-china-area-data'
// 富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入常量
import { difficulty, array, questionType, direction } from '@/api/hmmm/constants.js'
// 引入城市常量
import { provinces, citys } from '@/api/hmmm/citys.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      subjectList: [], // 学科列表
      directorysList: [], // 目录列表
      tagList: [], // 试题标签
      companyList: [], // 企业列表
      province: provinces(), // 省列表
      citys: [],
      difficulty: difficulty, // 难度
      questionOption: array, // 题目选项
      questionType: questionType, // 题型
      directionList: direction, // 方向
      questionIndex: 4,
      radio: '',
      // 表单数据
      ruleForm: {
        subjectID: '', // 学科ID
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', // 省市
        city: '', // 区
        direction: '', // 方向
        questionType: '1', // 题型
        difficulty: '1', // 难度
        question: '', // 题干
        options: [], // 选项  每一项是对象常量文件中有
        checkList: [], // 复选框
        videoURL: '', // 解析视频
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: '' // 试题标签
      },
      // 验证规则
      rules: {
        subjectID: [
          { required: true, message: '请输入学科名称', trigger: 'change' }
        ],
        catalogID: [
          { required: true, message: '请输入目录名称', trigger: 'blur' }
        ],
        enterpriseID: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请输入方向名称', trigger: 'blur' }
        ],
        province: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        questionType: [
          { required: true, message: '请输入题型', trigger: 'change' }
        ],
        difficulty: [
          { required: true, message: '请输入难度等级', trigger: 'blur' }
        ],
        question: [{ required: true, message: '请输入题干', trigger: 'blur' }],
        video: [
          { required: true, message: '请输入解析视频', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入答案解析', trigger: 'blur' }
        ]

      },
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            [
              // { size: ['small', false, 'large', 'huge'] },
              // { color: [] },
              // { align: [] },
              'bold',
              'italic',
              'underline',
              'strike',
              { list: 'ordered' }, { list: 'bullet' },
              'blockquote',
              'code-block',
              'image',
              // 'video',
              'link'
            ]
          ]
        }
      }

    }
  },
  watch: {
    radio () {
      console.log(this.radio)
    }
  },
  components: {
    quillEditor // 富文本组件
  },
  async created () {
    //
    this.getQuestionsInfo()
    // 获取学科列表
    const res1 = await subjectListAPI()
    // console.log('学科列表', res1)
    this.subjectList = res1.data
    const res3 = await companyListAPI()
    // console.log('企业列表', res3)
    this.companyList = res3.data.items
  },
  methods: {
    // 学科改变
    async onSubjectChange (subjectID) {
      // console.log(subjectID)
      // 联动初始化目录列表
      const res2 = await directorysListAPI({ subjectID })
      // console.log('目录列表', res2)
      this.directorysList = res2.data.items
      // 联动初始化试题标签
      const res = await tagsListAPI({ subjectID })
      // console.log('试题标签', res)
      this.tagList = res.data
    },
    // 多选增加选择
    addItem () {
      this.questionIndex++
    },
    // 提交验证
    submitForm (formName) {
      console.log(this.ruleForm.catalogID)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 修改
          if (this.$route.query.id) {
            console.log(this.$route.query.id)
            const res = await updateAPI(this.ruleForm)
            console.log(res)
            Message({ type: 'success', message: '修改成功' })
            // 跳转到基础题库
            this.$router.push('/questions/list')
          } else {
            // 添加
            const res = await addAPI(this.ruleForm)
            console.log(res)
            Message({ type: 'success', message: '添加成功' })
            // 跳转到基础题库
            this.$router.push('/questions/list')
          // console.log('submit!')
          // alert('submit!')
          }
        } else {
          Message({ type: 'error', message: '验证失败' })
          console.log('error submit!!')
          return false
        }
      })
    },
    // 兜底验证
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 省改变
    onProvinceChange (val) {
      this.ruleForm.citys = ''
      this.citys = citys(val)
      // console.log(this.citys)
    },
    // 获取试题详情实现试题修改
    async getQuestionsInfo () {
      console.log(this.$route.query)
      // 获取试题
      if (!this.$route.query.id) return false
      // 有id说明是修改试题,试题数据回显
      const res = await detailAPI(this.$route.query)
      // console.log('试题详情', res)
      this.ruleForm = res.data
      // console.log(this.ruleForm)
      // -----------------------
      // 标签改成数组
      this.ruleForm.tags = res.data.tags?.split(',')
      this.questionIndex = this.ruleForm.options.length
      // 选项
      this.questionOption = this.ruleForm.options

      // 开始获取目录
      const { data } = await directorysListAPI({ subjectID: this.ruleForm.subjectID })
      this.directorysList = data.items

      switch (this.ruleForm.questionType) {
        // 单选
        case '1':
          this.ruleForm.options.forEach((item, index) => {
            if (item.isRight === 1) {
              console.log(item)
              this.radio = item.code
            }
          })
          break
          // 多选
        case '2':
          this.ruleForm.options.forEach((item, index) => {
            if (item.isRight === 1) {
              this.options.push(item.code)
            }
          })
          break
      }
      //= ========
    }

  }
}
</script>

<style scoped lang='scss'>

.container {
  padding: 5px 10px;
  .box-card {
    padding: 5px 10px;
  }
}
//顶部
.hr-line {
  color: #ebeef5;
}
.top_title {
  margin: 20px 0px 20px 0px;
}

.stem,.analysis {
  // margin-bottom: 30px;
  height: 360px;
}
// 富文本
 .myQuillEditor {
    width: 600px;
    height: 300px;
    display: block;
}
// 增加按钮
.addBtn{
margin-left: 60px;
margin-bottom: 30px;
}

// 上传框
.upload-demo {
  margin-left: 20px;
  margin-bottom: 20px;
  // 上传文字
  .upload_btn {
    margin-top: -10px;
    height: 50px;
  }
}
</style>
