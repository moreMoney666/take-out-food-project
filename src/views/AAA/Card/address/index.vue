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
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="收货姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="收货电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        <el-select v-model="ruleForm.city" placeholder="请选择收货地址">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
          <el-option label="广州" value="guangzhou"></el-option>
          <el-option label="深圳" value="shenzhen"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailed">
        <el-input v-model="ruleForm.detailed"></el-input>
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
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Address",
  data() {
    // var address = (curVal,oldVal) => {
    //      if (!curVal) {
    //           this.pureNumber = ''
    //           return false
    //      }
    //      // 实时把非数字的输入过滤掉
    //       this.pureNumber = curVal.match(/\d/ig) ? curVal.match(/\d/ig).join('') : ''
    //     }
    // },
    return {
      //  修改拿回来的数据要存储得地方
      addressList: [],
      ruleForm: {
        address: "", //收货地址
        name: "", //收货姓名
        phone: "", //收货电话
        city: "", //所在城市
        detailed: "", //详细地址
        type: [], //地址类型
        gender: "", //性别
        desc: "" //备注
      },
      // 表单验证
      rules: {
        address: [
          { required: true, message: "请输入收货地址", trigger: "blur" }
        ],
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
        detailed: [
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
    // 点击立即创建按钮
    submitForm(formName) {
      // 通过全局事件总线传递事件
    this.$bus.$emit("getAddressList",this.ruleForm);
    
    this.result = this.data.ruleForm;
    if (ruleForm.length === 0){
      this.$router.push('/address')
    }else{
      // 跳转到
    this.$router.push('/card/cartList')
    }
    
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      this.ruleForm = {
        address: "", //收货地址
        name: "", //收货姓名
        phone: "", //收货电话
        city: "", //所在城市
        detailed: "", //详细地址
        type: [], //地址类型
        gender: "", //性别
        desc: "" //备注
      };
    }
  }

  //     this.$refs[formName].validate((valid) => {
  //       if (valid) {
  //         alert('submit!');
  //       } else {
  //         console.log('error submit!!');
  //         return false;
  //       }
  //     });
  //   },
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
