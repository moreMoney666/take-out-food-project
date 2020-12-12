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
      <el-table-column prop="foodname" label="食品名称" width="width">
      </el-table-column>
      <el-table-column prop="fooddesc" label="食品描述" width="width">
      </el-table-column>
      <el-table-column prop="" label="操作 " width="width">
        <template slot-scope="{row,$index}">
           <el-button size="mini" type="primary" @click="changeFood(row)"
            >修改</el-button
          >
          <!-- <el-button size="mini" type="danger" @click="deleteFood(item)"
            >删除</el-button
          > --> 
          <el-popconfirm :title="`确定删除${row.foodname}吗？`" @onConfirm="deleteFood(row,$index)"> -->
              <el-button type="danger" slot="reference" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!-- <el-button size="mini" type="primary" @click="changeFood(scope)"
          >修改</el-button
        > -->
      <!-- <el-button size="mini" type="danger" @click="open"
          >删除</el-button
        > -->
      <!-- <el-button size="mini" type="danger" @click="deleteShop(index)"
          >删除</el-button
        > -->
      <!-- <el-popconfirm title="这是一段内容确定删除吗？">
          <el-button type="danger" slot="reference" >删除</el-button>
      </el-popconfirm> -->
      <!-- @click="deleteShop(index)" -->
      <!-- </el-table-column> -->
    </el-table>


  </div>
</template>

<script>
export default {
  name: "foodList",
  data() {
    return {
      foodList: [
      //   {
      //   business:'wqeqw',
      //   category:'weqwq',
      //   foodname:'123'
      // },
      // {
      //   business:'wqeqw',
      //   category:'weqwq',
      //   foodname:'133'
      // },
      // {
      //   business:'wqeqw',
      //   category:'weqwq',
      //   foodname:'143'
      // },
      ], //食品列表
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
    changeFood(item) {
      console.log(item);
      this.$router.push({
        path: "/food/addfood",
        query: { foodObj: item.row },
      });
    },

    //删除食品
    deleteFood(row,$index){
      // if (confirm("确认删除该食品信息吗?")) {
        if (item.row.id === this.food.id) {
          this.food = {};
        }
        // this.foodList.splice(item.$index, 1);
        this.foodList.splice($index,1)
        localStorage.setItem("foodList", JSON.stringify(this.foodList));
      }
    // }
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
