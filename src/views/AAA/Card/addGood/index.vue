<template>
  <div>
    <el-card>
      <el-form ref="form" label-width="80px" :inline="true">
        <el-form-item label="选择商铺信息" label-width="120">
          <el-select v-model="restaurantId" placeholder="请选择餐厅">
            <el-option
              v-for="item in restaurantList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择食品分类" label-width="100px">
          <el-select v-model="goodKindId" placeholder="请选择食品分类">
            <el-option
              v-for="item in goodKindList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择食品" label-width="100px">
          <el-select placeholder="请选择食品" v-model="goodId">
            <el-option
              v-for="item in goodsObj.foods"
              :key="item.item_id"
              :value="item.item_id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="cards" style="height: 500px">
      <el-card>
        <div class="AAA">
          <div class="ccc">
            <el-button type="primary" @click="show3 = !show3"></el-button>
            <div style="margin-top: 20px; height: 200px">
              <el-collapse-transition>
                <div v-show="show3">
                  <img
                    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2829091151,3327554701&fm=26&gp=0.jpg"
                    alt=""
                    class="transition-box"
                  />
                  <!-- <div class="transition-box">el-collapse-transition</div> -->
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="ccc">
            <el-button type="text" size="mini"></el-button>

            <div style="margin-top: 20px; height: 200px">
              <el-collapse-transition>
                <div v-show="show3">
                  <img
                    src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=209684376,687826780&fm=26&gp=0.jpg"
                    alt=""
                    class="transition-box"
                  />
                  <!-- <div class="transition-box">el-collapse-transition</div> -->
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="ccc">
            <el-button type="text" size="mini"></el-button>

            <div style="margin-top: 20px; height: 200px">
              <el-collapse-transition>
                <div v-show="show3">
                  <img
                    src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3112814476,1535092326&fm=11&gp=0.jpg"
                    alt=""
                    class="transition-box"
                  />
                  <!-- <div class="transition-box">el-collapse-transition</div> -->
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="detail">
            <span>{{ goodDetail.description || "" }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ goodDetail.tips || "" }}</time>
              <el-button
                type="text"
                class="button"
                v-if="goodDetail._id"
                @click="addToCart"
                >添加至购物车</el-button
              >
            </div>
          </div>
        </div>
      </el-card>
      <div class="appraise">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div>用户评价:</div>
          </div>
          <!-- <div v-for="item in appraiseList" :key="item._id" class="text item">
            {{ item.name }}X{{ item.count }}次
          </div> -->
          <el-table :data="appraiseList" style="width: 100%">
            <el-table-column prop="name" label="评价" width="width">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="count"
              label="次数"
            >
            </el-table-column>
          </el-table>
          <div class="text item" v-if="goodDetail._id">......</div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import {
  reqRestaurantsByLocation,
  reqFoodListByRestaurantId,
  reqFoodsByCategoryId,
  reqAppraiseByRestaurantId,
} from "@/api";
import { mapState } from "vuex";
export default {
  name: "AddGood",
  data() {
    return {
      show3: true,
      restaurantList: [], //商铺列表
      restaurantId: "", //商铺id
      restaurantName: "", //商铺名字
      resuaurantnum: 5, //商铺显示数量
      goodKindId: "", //商品分类id
      goodKindList: [], //商品分类列表
      categoryName: "", //商品分类名
      goodId: "", //商品id
      goodsObj: {}, //商品对象,其中的foods属性为商品列表
      goodDetail: {}, //商品详情
      appraiseList: [], //评价列表
      cartList: [], //购物车列表
    };
  },
  computed: {
    //将城市信息映射到计算属性
    ...mapState({
      cityInfo: (state) => state.home.cityInfo,
    }),
  },
  watch: {
    //监视商铺id的变化
    restaurantId: function (val) {
      if (!val) return;
      this.restaurantName = this.restaurantList.find(
        (item) => item.id === val
      ).name;
      //   console.log(val);
      this.getFoodKindList(val);
      this.goodKindList = "";
      this.goodKindId = "";
      this.goodsObj = {};
      this.goodId = "";
    },
    //监视商品分类id的变化
    goodKindId: function (val) {
      if (!val) return;
      //   console.log(val);
      this.categoryName = this.goodKindList.find(
        (item) => item.id === val
      ).name;
      this.getFoods(val);
      this.goodsObj = {};
      this.goodId = "";
    },
    //监视食品id变化
    goodId: function (val) {
      if (!val) return;
      this.goodDetail = this.goodsObj.foods.find(
        (item) => item.item_id === val
      );
      this.getAppraise();
    },
    //监视城市信息变化
    cityInfo: function () {
      // location.reload()
      // this.$router.push('/cart/addGood')
      //重新获取数据
      this.restaurantId = ""; //商铺id
      this.restaurantName = ""; //商铺名字
      this.resuaurantnum = 10; //商铺显示数量
      this.goodKindId = ""; //商品分类id
      this.goodKindList = []; //商品分类列表
      this.categoryName = ""; //商品分类名
      this.goodId = ""; //商品id
      this.goodsObj = {}; //商品对象,其中的foods属性为商品列表
      this.goodDetail = {}; //商品详情
      this.appraiseList = []; //评价列表
      this.getRestaurants();
    },
  },
  methods: {
    //根据城市信息获取商品列表
    async getRestaurants() {
      let result = await reqRestaurantsByLocation(
        this.cityInfo.longitude,
        this.cityInfo.latitude,
        this.resuaurantnum
      );
      this.restaurantList = result;
    },
    //点击加载更多商铺
    //根据商铺id获取商品分类
    async getFoodKindList() {
      let result = await reqFoodListByRestaurantId(this.restaurantId);
      // console.log(result);
      this.goodKindList = result;
    },
    //根据商品分类id获取食品列表
    async getFoods() {
      let result = await reqFoodsByCategoryId(this.goodKindId);
      this.goodsObj = result;
      // console.log(result);
    },
    //获取评价
    async getAppraise() {
      let result = await reqAppraiseByRestaurantId(this.restaurantId);
      // console.log(result);
      this.appraiseList = result;
    },
    //添加至购物车
    addToCart() {
      this.goodDetail.restaurantName = this.restaurantName;
      this.goodDetail.categoryName = this.categoryName;
      this.cartList.push(this.goodDetail);
      localStorage.setItem("cartList", JSON.stringify(this.cartList));
      this.$router.push("/card/cartList");
      // console.log(this.goodDetail);
    },
  },
  mounted() {
    //一进来先获取商铺列表
    this.getRestaurants();
    // console.log(this.goodDetail._id);
    if (localStorage.getItem("cartList")) {
      this.cartList = JSON.parse(localStorage.getItem("cartList"));
    }
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.ccc {
  // display: none;
  // height: 300px;
  width: 30%;
  // margin: 0 auto;
  // background: pink;
  img {
    width: 500px;
    height: 600px;
    border: 1px solid skyblue;
  }
}
.transition-box {
  margin-bottom: 10px;
  // width: 200px;
  height: 0px;
  border-radius: 4px;
  // background-color: #409EFF;
  text-align: center;
  color: #fff;
  // padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.cards .el-card {
  height: 500px;
}

.cards .AAA {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .detail {
    width: 200px;
    height: 200px;
    float: right;
    right: 0;
    bottom: 0;
  }
}
</style>