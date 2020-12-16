<template>
  <div>
    <!-- 走马灯 -->
    <el-carousel
      :interval="4000"
      type="card"
      height="250px"
      style="width: %; margin: 0 auto"
    >
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 添加餐厅 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-left: 40px; margin-top: 40px"
      @click="showAddDialog"
      >添加餐馆</el-button
    >

    <!-- 添加”和“修改”弹出el-dialog（对话框） -->
    <!-- 在这里自动收集表单数据 -->
    <el-dialog
      :title="newrestantListForm.id ? '修改餐馆' : '添加餐馆'"
      :visible.sync="isShowDialog"
    >
      <el-form
        :model="newrestantListForm"
        style="width: 80%"
        :rules="rules"
        ref="newrestantListForm"
      >
        <el-form-item label="店铺名称" label-width="100px" prop="name">
          <el-input
            v-model="newrestantListForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="店铺地址" label-width="100px" prop="address">
          <el-input
            v-model="newrestantListForm.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="食品分类" label-width="100px" prop="category">
          <el-input
            v-model="newrestantListForm.category"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="店铺电话" label-width="100px" prop="phone">
          <el-input
            v-model="newrestantListForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 取消确定按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addorupdateresrant">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 展示数据，el-table不需要使用v-for，因为它每个列中都暗含了for循环 -->
    <el-table
      style="width: 92%; margin: 40px auto"
      border
      :data="newrestantList"
    >
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column label="餐馆名称" prop="name"> </el-table-column>

      <el-table-column label="地址" prop="address"> </el-table-column>

      <el-table-column label="分类" prop="category"> </el-table-column>

      <el-table-column label="电话" prop="phone"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <!-- 修改餐厅 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            size="mini"
            @click="showUpdateDialog(row, $index)"
          >
            修改
          </el-button>
          <!-- 删除餐厅 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            size="mini"
            @click="deleteTrademark(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义验证规则
    var validatePass = (rule, value, callback) => {
      // rule用来占位，value是要验证的值，callback传参数代表失败，不传就是成功
      let phoneReg = /^1[3-9]\d{9}/;
      if (!phoneReg.test(this.newrestantListForm.phone)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      isShowDialog: false, // 用来控制对话框的显示与隐藏
      newrestantListForm: {
        name: "",
        address: "",
        category: "",
        phone: "",
      },
      restantList: [],
      newrestantList: [],
      rules: {
        name: [
          // 一个对象就是一个验证规则，trigger是触发方式
          { required: true, message: "请输入店铺名称", trigger: "blur" },
        ],
        phone: [
          // 一个对象就是一个验证规则，trigger是触发方式
          { required: true, message: "请输入店铺电话", trigger: "blur" },
          { validator: validatePass, trigger: "change" }, // 自定义规则的使用
        ],
        address: [
          // 一个对象就是一个验证规则，trigger是触发方式
          { required: true, message: "请输入店铺地址", trigger: "blur" },
        ],
        category: [
          // 一个对象就是一个验证规则，trigger是触发方式
          { required: true, message: "请输入食品分类", trigger: "blur" },
        ],
      },
    };
  },
  //   获取列表数据
  mounted() {
    this.getresrantList();
  },
  methods: {
    // 获取餐馆列表
    async getresrantList() {
      try {
        const result = await this.$API.getresrant();
        if (result) {
          this.restantList = result;
        }
      } catch (error) {
        this.$message.error("获取餐馆列表失败");
      }
      this.newrestantList = this.restantList.slice(0, 8);
    },

    // 点击显示添加的dialog
    showAddDialog() {
      this.isShowDialog = true;
      //每次打开dialog清空数据
      this.newrestantListForm = {
        name: "",
        address: "",
        category: "",
        phone: "",
      };
    },

    // 整体校验在点击“确定”时触发
    addorupdateresrant() {
      this.$refs.newrestantListForm.validate(async (valid) => {
        if (valid) {
          let restrant = this.newrestantListForm; // 获取参数
          console.dir(restrant);
          //代表添加
          if (!restrant.id) {
            this.newrestantList.unshift(this.newrestantListForm);
          }
          this.$message.success(restrant.id ? "修改店铺成功" : "添加店铺成功");
        } else {
          return false; // 验证失败，没有后续操作了
        }
      });
      this.isShowDialog = false;
    },
    // 修改逻辑
    showUpdateDialog(row, $index) {
      this.isShowDialog = true; // 点击修改,显示修改的dialog
      this.newrestantListForm = { ...row }; //浅拷贝;
      this.newrestantList.splice($index, 1, this.newrestantListForm);
    },
    // 删除逻辑
    deleteTrademark(row, $index) {
      this.newrestantList.splice($index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background: url(images/addfood_banner01.jpg);
}

.el-carousel__item:nth-child(2n + 1) {
  background: url(images/addfood_banner02.jpg);
}
</style>
