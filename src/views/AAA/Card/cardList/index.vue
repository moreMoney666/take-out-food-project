<template>
  <div>
    <el-card style="height:100%;display:block;">
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
            <template slot-scope="{ row,$index }">
              <el-popconfirm
                :title="`确定要删除 ${row.name} 这件商品吗`"
                @onConfirm="cartList.splice($index,1)"
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
                @click.native.prevent="editRow(row)"
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
      addressList: [
        {
          city: "北京",
          desc: "少放辣，需要餐具",
          detail: "北七家镇宏福科技园",
          id: "p6RT--t-tEkIIInkpn5b5",
          name: "李先生",
          phone: "13100000000",
          sex: "男",
          title: "北京市昌平区北七家镇宏福科技园",
          type: ["家庭", "学校"]
        },
        // {
        //   city: "上海",
        //   desc: "1232131321",
        //   detail: "2313212",
        //   id: "p6RT--t-tEkIIInkpn5b5",
        //   name: "21",
        //   phone: "12312312311",
        //   sex: "男",
        //   title: "121",
        //   type: ["家庭", "公司"]
        // }
      ],
      cartList: [
        {
          __v: 0,
          _id: "5e018611de911551beafac3c",
          activity: {},
          attributes: [],
          attrs: [],
          categoryName: "热销榜",
          category_id: 9196,
          description: "的撒旦",
          display_times: [],
          image_path: "16f35f39b6262048.jpg",
          is_essential: false,
          is_featured: 0,
          item_id: 6053,
          month_sales: 265,
          name: "阿斯顿·",
          pinyin_name: "",
          rating: 5,
          rating_count: 711,
          restaurantName: "疾呼",
          restaurant_id: 1,
          satisfy_count: 128,
          satisfy_rate: 30,
          server_utc: "2019-12-22T12:14:57.129Z",
          specfoods: [],
          specifications: [],
          tips: "711评价 月售265份"
        }
        // {
        //   __v: 0,
        //   _id: "5e018611de911551beafac3c",
        //   activity: {},
        //   attributes: [],
        //   attrs: [],
        //   categoryName: "热销榜",
        //   category_id: 9196,
        //   description: "的撒旦",
        //   display_times: [],
        //   image_path: "16f35f39b6262048.jpg",
        //   is_essential: false,
        //   is_featured: 0,
        //   item_id: 6053,
        //   month_sales: 265,
        //   name: "阿斯顿·",
        //   pinyin_name: "",
        //   rating: 5,
        //   rating_count: 711,
        //   restaurantName: "疾呼",
        //   restaurant_id: 1,
        //   satisfy_count: 128,
        //   satisfy_rate: 30,
        //   server_utc: "2019-12-22T12:14:57.129Z",
        //   specfoods: [],
        //   specifications: [],
        //   tips: "711评价 月售265份"
        // },
        // {
        //   __v: 0,
        //   _id: "5e018611de911551beafac3c",
        //   activity: {},
        //   attributes: [],
        //   attrs: [],
        //   categoryName: "热销榜",
        //   category_id: 9196,
        //   description: "的撒旦",
        //   display_times: [],
        //   image_path: "16f35f39b6262048.jpg",
        //   is_essential: false,
        //   is_featured: 0,
        //   item_id: 6053,
        //   month_sales: 265,
        //   name: "阿斯顿·",
        //   pinyin_name: "",
        //   rating: 5,
        //   rating_count: 711,
        //   restaurantName: "疾呼",
        //   restaurant_id: 1,
        //   satisfy_count: 128,
        //   satisfy_rate: 30,
        //   server_utc: "2019-12-22T12:14:57.129Z",
        //   specfoods: [],
        //   specifications: [],
        //   tips: "711评价 月售265份"
        // },
      ]
    };
  },
  mounted() {
    // if()
    this.$bus.$on("getGoods", this.getGoods);
    this.$bus.$on("getAddressList", this.getAddress);
  },
  methods: {
    // 删除地址
    deleteRow(row, $index) {

      this.addressList.splice($index, 1);
      // console.log(row)
      if (row.isSelected === 1) {
        this.selected = "";
      }
    },
    
    // 选择地址
    selectedRow(row) {
      this.addressList.forEach((item, index) => {
        this.$set(row, "isSelected", 0);
      });
      row.isSelected = 1;
      this.selected = row;
      // console.log(row)
    },

    // 修改地址
    editRow(row) {
      console.log(row);
      // 向地址页传输数据
      // this.$bus.$emit('changeAddress',row)
      this.$router.push("/card/address");
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$message.info("取消下单");
          done();
        })
        .catch(_ => {});
    },

    // 下单按钮
    buy(ok) {
      if (ok == "no") {
        this.isShow = false;
        this.$message.info("取消下单");
      } else if (ok == "ok") {
        this.isShow = false;
        this.$message.success("下单成功");
      }
    },
    // 获取地址信息
    getAddress(data) {
      // localStorage.setItem('ADDRESSLIST_KEY',JSON.stringify(data))
      this.addressList.push(data)
    },

    // 获取商品信息
    getGoods(data) {
      // localStorage.setItem('CARTLIST_KEY',JSON.stringify(data))
      this.cartList.push(data)
    },

    // 新增地址
    toAddAddress() {
      // 清空
      // this.$bus.$emit('clearAddress')
      this.$router.push("/card/address");
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
