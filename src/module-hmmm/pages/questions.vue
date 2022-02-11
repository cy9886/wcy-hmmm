<template>
 <div>
<div class="box1">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="学科">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级目录">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="标签">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="关键字">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="试题类型">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="难度">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="方向">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="录入人">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="题目备注">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="企业简称">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="城市">
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
    <el-select v-model="formInline.region" placeholder="请选择">
      <el-option label="无数据"></el-option>
    </el-select>
  </el-form-item>
</el-form>
</div>
<div class="box2">
<el-row>
<el-button>清除</el-button>
</el-row>
<el-row>
  <el-button type="primary">主要按钮</el-button>
</el-row>
</div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="试题编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="目录">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科"
        width="180">
      </el-table-column>
        <el-table-column
        prop="name"
        label="学科"
        width="180">
      </el-table-column>

    </el-table>
  <div class="box3">
  <el-row>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-row>
 </div>
<div class="box4">
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
      formInline: {
        user: '',
        region: ''
      },
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

.box1{
  float:left;
  width: 1150px;
  height: 300px;

}
.box2{
  float:right;
  width: 100px;
  height: 100px;
  margin-top: 100px;
  margin-right: 80px;

}
.box3{
margin-left: 1100px;
}
.box4{
margin-left:950px;
}

</style>
