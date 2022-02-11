<template>
<div>
  <label class="el-form-item__label" style="width: 80px;">关键字</label>
  <input type="text">
  <button   class="box1">清除</button>
  <button   class="box2">搜索</button>
<div class="box3">
<span  class="box4">数据一共178条</span>
</div>
 <div class="box5">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
 </div>
  <div class="box6">
<el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped >
input{
  margin-top: 10px;
}
.box1{
 margin-left:930px;
}
.box2{
  margin-left: 5px;
 background-color: #66b1ff;
}
.box3{
margin-top: 20px;
margin-left: 20px;
margin-right: 270px;
background-color: blueviolet;
}
.box4{
  padding-left: 50px;

}
.box5{

  height: 100px;

}
.box6{
  margin-bottom: 1000px;
 padding-top: 300px;
text-align: center;
padding-left: 750px;
}
</style>
