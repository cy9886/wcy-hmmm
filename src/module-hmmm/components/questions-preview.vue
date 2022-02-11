<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【题型】：{{ intemAll.questionType }}题
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【编号】：{{ intemAll.id }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【难度】：{{ intemAll.difficulty }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【标签】：{{ intemAll.tags }}
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【学科】：{{ intemAll.subjectName }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【目录】：{{ intemAll.directoryName }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【方向】：{{ intemAll.direction }}
        </div></el-col
      >
    </el-row>
    <hr />
    <el-row>
      <el-col><div class="grid-content bg-purple">【题干】：</div></el-col>
    </el-row>
    <el-row>
      <el-col
        ><div class="grid-content bg-purple yanse">
          {{ intemAll.question }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col
        ><div class="grid-content bg-purple">
          {{ intemAll.questionType }}题 选项：(以下选的的选项为正确答案)
        </div></el-col
      >
    </el-row>
    <div v-if="intemAll.questionType === '单选'" class="onter">
      <el-radio-group v-model="radio">
        <el-radio
          v-for="obj in intemAll.options"
          :key="obj.id"
          :label="obj.isRight"
          >{{ obj.title }}</el-radio
        >
      </el-radio-group>
    </div>
    <div v-if="intemAll.questionType === '多选'" class="onter">

      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="obj in intemAll.options"
                  :key="obj.id"
                  :label="obj.isRight"
        >{{obj.title  }}</el-checkbox>
      </el-checkbox-group>

    </div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple">【参考答案】：
          <el-button type="danger" v-if="tylop" @click="intemodFn">视频答案预览</el-button>
          <video v-else :src="intemAll.videoURL" controls="controls" width="100%"></video>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        ><div class="grid-content bg-purple">
          【答案解析】：{{ intemAll.answer }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col
        ><div class="grid-content bg-purple">
          【题目备注】：{{ intemAll.remarks }}
        </div></el-col
      >
    </el-row>
    <el-button @click="closeFn" type="primary" class="youmian">关闭</el-button>
  </div>
</template>

<script>
export default {
  props: {
    intemAll: {
      type: Object
    }
  },
  data () {
    return {
      radio: 1,
      checkList: [1],
      tylop: true
    }
  },
  methods: {
    intemodFn () {
      this.tylop = false
    },
    closeFn () {
      this.$emit('andwanEd')
    }
  }
}
</script>

<style scoped lang='scss'>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.yanse {
  color: #0000ff;
}
.onter{
  width: 20px;
}
.youmian{
  float: right;
}
</style>
