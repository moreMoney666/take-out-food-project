<template>
  <div class="container">
    <!-- :rules="rules"表单验证 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="收货地址" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="收货姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="收货电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        <el-select v-model="ruleForm.city" placeholder="请选择收货地址">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
          <el-option label="广州" value="广州"></el-option>
          <el-option label="深圳" value="深圳"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-input v-model="ruleForm.detail"></el-input>
      </el-form-item>
      <el-form-item label="地址类型">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="公司" name="type"></el-checkbox>
          <el-checkbox label="家庭" name="type"></el-checkbox>
          <el-checkbox label="学校" name="type"></el-checkbox>
          <el-checkbox label="其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <div v-if="$route.query.isEdit">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="$router.replace('/card/cartList')">取消</el-button>
        </div>
        <div v-else>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Address",
  mounted() {
    if(this.$route.query.isEdit){
      const attr = JSON.parse(localStorage.getItem("addressList"));
      const index = this.$route.query.i * 1;
      this.ruleForm = attr[index];
    }

  },
  data() {
    return {
      //  修改拿回来的数据要存储得地方
      addressList: [],
      ruleForm: {
        phone: "", //收货电话
        title: "", //收货地址
        name: "", //收货姓名
        city: "", //所在城市
        detail: "", //详细地址
        type: [], //地址类型
        gender: "", //性别
        desc: "", //备注
        index: 0
      },
      // 表单验证
      rules: {
        title: [{ required: true, message: "请输入收货地址", trigger: "blur" }],
        name: [
          { required: true, message: "请输入收货姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请填写手机号码", trigger: "change" },
          { min: 11, max: 11, message: "手机号长度不正确", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: "手机号格式不正确" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        detail: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个地址类型",
            trigger: "change"
          }
        ],
        gender: [{ type: "array", required: true, trigger: "change" }]
      }
    };
  },
  methods: {
    clearForm() {
      this.ruleForm = {
        title: "", //收货地址
        name: "", //收货姓名
        phone: "", //收货电话
        city: "", //所在城市
        detail: "", //详细地址
        type: [], //地址类型
        gender: "", //性别
        desc: "", //备注
        index: 0
      };
    },
    // 点击立即创建按钮,jiang
    submitForm(forName) {
      console.log(forName);
      this.$refs[forName].validate(valid => {
        if (valid) {
            let addressList = [];
            if (localStorage.getItem("addressList")) {
              addressList = JSON.parse(localStorage.getItem("addressList"));
              this.addressList = addressList
            }
            // 修改
            if(this.$route.query.isEdit){
              let index = this.$route.query.i
              addressList.splice(index,1,this.ruleForm)

            }else{
              // 新增
              this.ruleForm.id = uuidv4();
              // console.log(this.addressList);
              addressList.push(this.ruleForm);
              this.addressList = addressList;
              // console.log(this.addressList); 
            }
            localStorage.setItem("addressList", JSON.stringify(this.addressList));
            this.$message.success("操作成功");
            this.$router.push("/card/cartList");  
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.ruleForm = {
        title: "", //收货地址
        name: "", //收货姓名
        phone: "", //收货电话
        city: "", //所在城市
        detail: "", //详细地址
        type: [], //地址类型
        gender: "", //性别
        desc: "" //备注
      };
    }
  }
  // 重置按钮
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  width: 1200px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  top: 107px;
  left: 270px;
}
</style>
