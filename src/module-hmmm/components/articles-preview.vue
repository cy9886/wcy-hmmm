<template>
  <div class='container'>
     <el-dialog title="预览文章" :visible="isPreviewShow" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
     <h2>{{ previewTargetData.title }}</h2>
     <p>
        <span>{{ formatTimeFn (previewTargetData.createTime) }}</span>
        <span>{{ previewTargetData.username }}</span>
        <i class="el-icon-view"></i>
        <span>{{ previewTargetData.visits }}</span>
     </p>
        <div class="content" v-html="previewTargetData.articleBody"></div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    isPreviewShow: {
      type: Boolean
    },
    previewTargetData: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 格式化时间
    formatTimeFn (time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 弹窗-关闭之前执行, done()就关闭
    // 按下esc, 点击蒙层, 点击右上角x, 都会触发此方法
    handleClose (done) {
      this.$emit('closeEV')
    }
  }
}
</script>

<style scoped lang='scss'>
h2{
  line-height: 1;
}
span{
  margin: 0 10px;
}
.content{
  padding-left: 10px;
  border-top: 2px dashed #ccc;
  background-color: #f5f5f5;
}
</style>
