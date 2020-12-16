<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">添加</el-button>

    <el-table style="width:100%;margin:20px 0" border :data="trademarkList">
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>

      <el-table-column label="品牌LOGO">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width:100px;height:60px" />
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini">
            修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align:center"
      :total="total"
      :current-page="page"
      :page-size="3"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="getTrademarkList"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default{
    data(){
    return{
        page: 1,
        limit: 3,
        trademarkList: [],
        total: 0
    }
},
// 2. 获取列表数据
mounted(){
    this.getTrademarkList();
},
methods:{
    // 获取品牌列表
    async getTrademarkList(page=1){
        this.page = page;
        try{
            const result = await this.$API.trademark.getPageList(this.page,this.limit);
            if(result.code===200){
            	this.trademarkList = result.data.records;
                this.total = result.data.total;
            }
        }catch(error){
            this.$message.error("获取品牌列表失败")
        }
    },
    // 更改每页显示的条数
    handleSizeChange(size){
        this.limit = size;
        this.getTrademarkList();
    }
}
}


</script>

<style lang="less" scoped></style>
