<template>
  <div>
    <div class="title">食品列表</div>
    <el-table
      :data="foodList"
      height="250"
      border
      style="width: 95%; margin: 0 auto"
    >
      <el-table-column prop="business" label="商家名称" width="width">
      </el-table-column>
      <el-table-column prop="category" label="食品分类" width="width">
      </el-table-column>
      <el-table-column prop="foodName" label="食品名称" width="width">
      </el-table-column>
      <el-table-column prop="foodDesc" label="食品描述" width="width">
      </el-table-column>
      <el-table-column prop="" label="操作 " width="width">
        <template slot-scope="{ row, $index }">
          <el-popconfirm :title="`确定要修改${row.foodName}吗？`" @onConfirm="changeFood(row, $index)" style="margin-right:20px;">
            <el-button type="primary" slot="reference" size="mini">修改</el-button>
          </el-popconfirm>
          <el-popconfirm
            :title="`确定删除${row.foodName}吗？`"
            @onConfirm="deleteFood(row, $index)"
          >
            <el-button type="danger" slot="reference" size="mini"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "foodList",
  data() {
    return {
      foodList: [], //食品列表
      food: {}, //已经选择的食品
    };
  },
  mounted() {
    if (localStorage.getItem("foodList")) {
      this.foodList = JSON.parse(localStorage.getItem("foodList"));
      this.food = this.foodList[0];
    }
  },
  methods: {
    //修改食品信息，query传参跳转到添加食品
    changeFood(row) {
      this.$router.push({
        path: "/food/addfood",
        query: { foodObj: row },
      });
    },

    //删除食品
    deleteFood(row) {
      this.foodList.splice(row.$index, 1);
      localStorage.setItem("foodList", JSON.stringify(this.foodList));
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 30px;
  padding: 20px;
  padding-left: 30px;
}
</style>
