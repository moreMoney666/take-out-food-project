<template>
  <div>
    <el-card style="height:100%;display:block;">
      <!-- 选择食品 -->
      <div class="addOk">
        <h3>已选食品</h3>
        <el-button
          type="primary"
          style="position: absolute;right:0;z-index:99;top:0;"
          @click="isShow = true"
          :disabled="!cartList.length > 0"
          >确认下单</el-button
        >
        <el-dialog
          title="确认下单"
          :visible.sync="isShow"
          width="50%"
          :before-close="handleClose"
        >
          <!-- <span>这是一段信息</span> -->
          <div
            v-if="selected !== ''"
            style="font-size:16px;text-align: center;"
          >
            商品数量:<span> {{ cartList.length }} </span>(件)
          </div>
          <div v-else style="color:red;font-size:16px;text-align: center;">
            请选择收货地址！
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="buy('no')">取 消</el-button>
            <el-button type="primary" @click="buy('ok')" :disabled="!selected"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>

      <el-card>
        <el-table :data="cartList" style="width: 100%" border>
          <el-table-column
            fixed
            prop="restaurantName"
            label="商家名"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="categoryName" label="食品类别" width="150">
          </el-table-column>
          <el-table-column prop="name" label="食品名" width> </el-table-column>
          <el-table-column prop="tips" label="销量" width="150">
          </el-table-column>
          <el-table-column prop="address" label="操作" width="80">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定要删除 ${row.name} 这件商品吗`"
                @onConfirm="cartList.splice($index, 1)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 选择地址 -->
      <div class="addOk">
        <h3>
          已选择地址:
          <span v-if="selected !== ''" style="color:blue">{{
            selected.title
          }}</span>
          <span v-else style="color:red;" class="span1">请选择下单地址 </span>
        </h3>
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          style="position: absolute;right:0;z-index:99;top:0;"
          @click="toAddAddress"
          >新增地址</el-button
        >
      </div>

      <el-card>
        <el-table
          :data="addressList"
          style="width: 100%;"
          max-height="400"
          border
        >
          <el-table-column fixed prop="title" label="地址名" width="200">
          </el-table-column>
          <el-table-column prop="city" label="城市" width="150">
          </el-table-column>
          <el-table-column prop="name" label="收货人" width="150">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="150">
          </el-table-column>
          <el-table-column prop="type" label="地址类型" width="200">
          </el-table-column>
          <el-table-column prop="detail" label="详细地址" width="500">
          </el-table-column>
          <el-table-column prop="desc" label="备注" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="{ row, $index }">
              <el-button
                @click.native.prevent="selectedRow(row)"
                type="success"
                size="mini"
                icon="el-icon-circle-check"
              >
              </el-button>
              <el-popconfirm
                :title="`你确定是删除 ${row.title}吗`"
                @onConfirm="deleteRow(row, $index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
              <el-button
                @click.native.prevent="toAddAddress(row,$index)"
                type="warning"
                size="mini"
                icon="el-icon-edit"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <div style="height:100px;"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CardList",
  data() {
    return {
      selected: "", 
      visible: false,
      isShow: false,
      addressList: [],
      cartList: [],
      address: {}
    };
  },
  mounted() {
    // 提取地址信息
    if (localStorage.getItem("addressList")) {
      this.addressList = JSON.parse(localStorage.getItem("addressList"));
      this.address = this.addressList[0];
    }
    // 提取食品信息
    if (localStorage.getItem("cartList")) {
      this.cartList = JSON.parse(localStorage.getItem("cartList"));
    }
  },
  methods: {
    // 删除地址
    deleteRow(row, $index) {
      let addressList;
      if (localStorage.getItem("addressList")) {
        addressList = JSON.parse(localStorage.getItem("addressList"));
        addressList.splice($index, 1);
        localStorage.setItem("addressList", JSON.stringify(addressList));
        if (row.isSelected === 1) {
          this.selected = "";
        }
      }
      // 刷新缓存
        location.reload()
    },

    // 选择地址
    selectedRow(row) {
      // 添加选中标识
      this.addressList.forEach((item, index) => {
        this.$set(row, "isSelected", 0);
      });
      row.isSelected = 1;
      this.selected = row;
      // console.log(row)
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$message.info("取消下单");
          done();
        })
        .catch(_ => {});
    },

    // 确认下单按钮
    buy(ok) {
      if (ok == "no") {
        this.isShow = false;
        this.$message.info("取消下单");
      } else if (ok == "ok") {
        this.isShow = false;
        this.$message.success("下单成功");
      }
    },

    // 新增 & 修改地址
    toAddAddress(row,$index) {
      // 修改
      if(row){
        this.$router.push({
          path:'/card/address',
          query:{
            i:$index,
            isEdit:row.id
          }
        })
      }else{
        // 添加
        this.$router.push("/card/address");
      }
      // console.log(row)
    }
  }
};
</script>

<style lang="less" scoped>
.addOk {
  position: relative;
}
.span1 {
  width: 150px;
  display: inline-block;
  background: pink;
  height: 20px;
  text-align: center;
  border-radius: 5px;
}
</style>
