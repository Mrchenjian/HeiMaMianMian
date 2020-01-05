<template>
  <div class="dashboard-container">
    <div class="app-container">
      题库添加
      <el-card>
        <el-form label-width="100px" :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item label="学科" prop="SubjectName">
            <el-select placeholder="请选择" style="width:60%" v-model="formData.SubjectName">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item ,index) in formData.Subjectdata"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目录" prop="directoryName">
            <el-select placeholder="请选择" style="width:60%" v-model=" formData.directoryName">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item ,index) in   formData.directorydata"
                :key="index"
              ></el-option>
              <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="企业" prop="companyName">
            <el-select placeholder="请选择" style="width:30%" v-model="formData.companyName">
              <el-option
                :label="item.company"
                :value="item.id"
                v-for="item  in formData.companydata"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="cityName">
            <el-select
              @change="transformation"
              placeholder="请选择"
              style="width:20%; margin: 5px"
              v-model="formData.cityName"
            >
              <el-option
                v-for="(itme,index) in formData.citysdata"
                :key="index"
                :label="itme"
                :value="index"
              ></el-option>
              <!-- 地区 -->
            </el-select>
            <el-select placeholder="请选择" style="width:20%" v-model="formData.RegionName">
              <el-option
                :label="item"
                :value="index"
                v-for="(item ,index) in formData.Regiondata"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方向" prop="directionName">
            <el-select
              placeholder="请选择"
              style="width:30%; margin: 5px"
              v-model=" formData.directionName"
            >
              <el-option
                :label="item"
                :value="index"
                v-for="(item ,index) in formData.directiondata"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型" prop="question">
            <template>
              <el-radio-group v-model="formData.question">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
                <el-radio :label="3">简答</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
          <el-form-item label="难度" prop="difficulty">
            <el-radio-group v-model="formData.difficulty">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
              <el-radio :label="3">简答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题干" style="width:80%" prop="quill">
            <quill-editor style="height: 300px" v-model="formData.quill"></quill-editor>
          </el-form-item>
          <!-- 新增文本 -->
          <el-form-item style="margin-top:120px ">
            <el-row v-for="(item,index) in formData.options" :key="index">
              <el-radio :label="formData.character[index]"></el-radio>
              <el-input style="width:20%"></el-input>
              <el-button @click.prevent="removeDomain(item)">删除</el-button>
            </el-row>
          </el-form-item>
          <el-form-item label="选项(以下选中的选项为正确答案)" style="margin-top:140px ">
            <el-button type="primary" @click="addinput">增加选项和答案</el-button>
          </el-form-item>
          <el-form-item label="解析视频" style="width:50%" prop="video">
            <el-input v-model="formData.video"></el-input>
          </el-form-item>
          <el-form-item label="答案解析" style="width:80%" prop="geometry">
            <quill-editor style="height: 300px" v-model="formData.geometry"></quill-editor>
          </el-form-item>
          <el-form-item label="题目备注" style="width:50%;margin-top:120px" prop="Remarks">
            <el-input v-model="formData.Remarks"></el-input>
          </el-form-item>
          <el-form-item label="试题标签" style="width:80%" prop="tag">
            <quill-editor style="height: 300px" v-model="formData.tag"></quill-editor>
          </el-form-item>
          <el-form-item style="margin-top:120px ; text-align: center">
            <el-button type="primary" @click="login('ruleForm')">提交</el-button>
            <el-button>清空</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入试题录入API
import { simple as subjectList } from "../../api/hmmm/subjects";
// 引入目录文件
import { simple as directorysList } from "../../api/hmmm/directorys";
// 引入企业文件
import { list as company } from "../../api/hmmm/companys";
// 获取城市信息
import { provinces as getCity, citys } from "../../api/hmmm/citys";
// 获取方向
import { direction as directionTwo } from "../../api/hmmm/constants";

// alert(directionTwo)
// console.log(direction());

export default {
  name: "QuestionsNew",
  data() {
    return {
      // 获取数据传入的参数
      UpParameter: {
        oldPassword: "123456",
        newPassword: "12345"
      },
      formData: {
        SubjectName: "",
        directoryName: "",
        companyName: "",
        cityName: "",
        RegionName: "",
        directionName: "",
        question: 1, //题型
        difficulty: 1, //难度
        quill: "", //题干
        geometry: "", // 答案解析
        tag: "", // 试题标签
        video: "", //解析视频
        Remarks: "", //题目备注
        Subjectdata: [],
        directorydata: [],
        companydata: [],
        citysdata: [],
        Regiondata: [],
        directiondata: [],
        character: ["A", "B", "C", "D", "E", "F", "J"],
        options: []
      },
      // 接收axios传回的数据
      GetAllData: {
        Subjectdata: [],
        directorydata: [],
        companydata: [],
        citysdata: [],
        Regiondata: [],
        directiondata: []
      },

      rules: {
        SubjectName: [{ required: true, message: "不能为空" }],
        directoryName: [{ required: true, message: "不能为空" }],
        companyName: [{ required: true, message: "不能为空" }],
        cityName: [{ required: true, message: "不能为空" }],
        RegionName: [{ required: true, message: "不能为空" }],
        citysdata: [{ required: true, message: "不能为空" }],
        directionName: [{ required: true, message: "不能为空" }],
        quill: [{ required: true, message: "不能为空" }],
        geometry: [{ required: true, message: "不能为空" }],
        tag: [{ required: true, message: "不能为空" }],
        video: [{ required: true, message: "不能为空" }],
        Remarks: [{ required: true, message: "不能为空" }]
      }
    };
  },
  methods: {
    //删除
    removeDomain(item) {
      var index = this.formData.options.indexOf(item);
      if (index !== -1) {
        this.formData.options.splice(index, 1);
      }
    },
    // 增加
    addinput() {
      this.formData.options.push({ value: "" });
    },
    // 提交
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("校验成功");
        } else {
          alert("校验失败");
          return false;
        }
      });
    },
    // 城市获取变化的参数
    transformation(value) {
      let obj = {};
      console.log(this.formData.citysdata);
      obj = this.formData.citysdata.find((item, index) => {
        return index === value;
      });
      //  获取区的数据
      this.GetAllRegion(obj);
    },
    // 获取学科数据
    GetAllsubjectList(data) {
      subjectList(data).then(result => {
        this.formData.Subjectdata = result.data;
      });
    },
    // 获取目录
    GetAlldirectoryList(data) {
      directorysList(data).then(result => {
        this.formData.directorydata = result.data;
      });
    },
    //获取企业
    GetAllcompany(data) {
      company(data).then(result => {
        // alert(result.data.items)
        this.formData.companydata = result.data.items;
      });
    },
    //  获取城市
    GetAllCitys() {
      // provinces
      this.formData.citysdata = getCity();
      // alert(this.formData.citysdata)
    },
    // 获取区
    GetAllRegion(data) {
      this.formData.Regiondata = citys(data);
      // console.log(citys('黄山市'));
    },
    // 获取方向
    GetAlldirection() {
      this.formData.directiondata = directionTwo;
    }
  },
  created() {
    // console.log(this.subjectName);
    this.GetAllsubjectList(this.UpParameter);
    this.GetAlldirectoryList(this.UpParameter);
    this.GetAllcompany(this.UpParameter);
    this.GetAllCitys();
    this.GetAllRegion(this.cityName);
    this.GetAlldirection();
  }
};
</script>

<style lang='sass' scoped>


</style>
