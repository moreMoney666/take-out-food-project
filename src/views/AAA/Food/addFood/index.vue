<template>
  <div>
    <!-- --------AddFood -->
    <el-card class="box-card">
      <div class="text item">
        <div class="title">增加食品</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商家名称" prop="business">
            <el-input type="text" v-model="ruleForm.business"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" prop="category">
            <el-input type="text" v-model="ruleForm.category"></el-input>
          </el-form-item>
          <el-form-item label="食品名称" prop="foodName">
            <el-input v-model="ruleForm.foodName"></el-input>
          </el-form-item>
          <el-form-item label="食品描述" prop="foodDesc">
            <el-input v-model="ruleForm.foodDesc"></el-input>
          </el-form-item>

          <el-form-item>
            <!-- //提交表单 -->
            <el-button type="primary" @click="submitForm('ruleForm')">{{
              this.$route.query.foodObj ? "修改" : "添加"
            }}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "AddFood",
  data() {
    return {
      ruleForm: {
        business: "",
        category: "",
        foodName: "",
        foodDesc: "",
      },
      rules: {
        business: [
          { required: true, message: "亲，请输入商家名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
            //  { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
          },
          {
            validator: function (rule, value, callback) {
              if ((/^[\u4e00-\u9fa5]+$/.test(value)) === false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
          },
        ],
        category: [
          { required: true, message: "亲，请输入食品分类", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              if ((/^[\u4e00-\u9fa5]+$/.test(value)) === false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
          },
        ],
        foodName: [
          { required: true, message: "亲，请输入食品名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              if ((/^[\u4e00-\u9fa5]+$/.test(value)) === false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
          },
        ],
        foodDesc: [
          { required: true, message: "亲，请输入食品描述", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      foodList: [],
    }
  },
  mounted() {
    // 从localStorage里面读取地址列表
    if (localStorage.getItem("foodList")) {
      // JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
      this.foodList = JSON.parse(localStorage.getItem("foodList"));
    }
    //判断是否为路由跳转，如果是路由跳转过来的，表示是修改状态
    if (this.$route.query.foodObj) {
      this.ruleForm = this.$route.query.foodObj;
    }
  },
  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //通过表单验证
        if (valid) {
          // alert("添加成功!");
          //如果是从食品列表里面跳过来的(证明是路由跳转)
          if (this.$route.query.foodObj) {
            //路由跳转的，所以应该替换之前的地址对象，并存入localStorage
            // findIndex()方法_返回满足条件的数组下标
            let index = this.foodList.findIndex((item) => {
              item.id === this.ruleForm.id;
            });
            // splice() 方法用于添加或删除数组中的元素。
            // 注意：这种方法会改变原始数组。
            // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
            this.foodList.splice(index, 1, this.ruleForm);
            localStorage.setItem("foodList", JSON.stringify(this.foodList));
            this.$message("修改成功");
            this.$router.push("/food/foodList");
          }
          //点击添加按钮后，清空input框里面的数据
          else {
            //新增的，生成id,id生成器
            this.ruleForm.id = nanoid();
            //传递数据
            this.foodList.push(this.ruleForm);
            localStorage.setItem("foodList", JSON.stringify(this.foodList));
            this.$message("添加成功");
            this.$router.push("/food/foodList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
        console.log(this.ruleForm);
        // this.resetData();
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
// .box-card {
//   // background-color:rgb(102, 102, 102);
// }
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.title {
  font-size: 30px;
  padding: 20px;
}
</style>