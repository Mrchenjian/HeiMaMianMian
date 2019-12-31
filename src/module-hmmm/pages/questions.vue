<template>
  <div class="question-container">
    <el-card>
      <div slot="header">
        <el-button type="primary">新增试题</el-button>
        <el-button type="primary">批量导入</el-button>
      </div>
      <el-form :inline="true">
        <el-form-item label="学科" prop="subject" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.subject">
            <el-option
              :label="item.subjectName"
              v-for="item in subjectlist"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.difficulty">
              <el-option
              :label="item.label"
              v-for="item in difficulty_list"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题类型" prop="question_type" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.question_type">
            <el-option
              :label="item.label"
              v-for="item in questionType_list"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tag" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.tag">
            <el-option
              :label="item.tagName"
              v-for="item in taglist"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.city">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="district" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.district">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字" prop="keyWord" label-width="80px">
          <el-input style="width:100%" v-model="formData.keyWord"></el-input>
        </el-form-item>
        <el-form-item label="题目备注" prop="title_notes" label-width="80px">
          <el-input
            style="width:100%"
            v-model="formData.title_notes"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="district" label-width="80px">
          <el-input style="width:100%" v-model="formData.district"></el-input>
        </el-form-item>
        <el-form-item label="方向" prop="directions" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.directions">
            <el-option
              :label="item"
              v-for="(item,index) in directionlist"
              :key="index"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入人" prop="enteringer" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.enteringer">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级目录"
          prop="second_level_directory"
          label-width="80px"
        >
          <el-select
            placeholder="请选择"
            v-model="formData.second_level_directory"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-from-item>
          <el-row style="margin-bottom: 30px" type="flex" justify="center">
            <el-button>清除</el-button>
            <el-button type="primary">搜索</el-button>
          </el-row>
        </el-from-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="date" label="序号" min-width="150">
        </el-table-column>
        <el-table-column prop="name" label="试题" min-width="220">
        </el-table-column>
        <el-table-column prop="province" label="学科" min-width="120">
        </el-table-column>
        <el-table-column prop="city" label="题型" min-width="120">
        </el-table-column>
        <el-table-column prop="address" label="题干" min-width="200">
        </el-table-column>
        <el-table-column prop="zip" label="录入时间" min-width="180">
        </el-table-column>
        <el-table-column prop="zip" label="难度" min-width="120">
        </el-table-column>
        <el-table-column prop="zip" label="录入人" min-width="120">
        </el-table-column>
        <el-table-column prop="zip" label="操作" min-width="200">
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.counts"
          :current-page="page.current_page"
          :page-size="page.pageSize"
          style="margin-top:30px;"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { list as questionslist } from "../../api/hmmm/questions";
import { list as subjects_list } from "../../api/hmmm/subjects";
import { list as tags_list } from "../../api/hmmm/tags";
import { difficulty as difficultylist, questionType as questionTypelist, direction as directionlists  } from "../../api/hmmm/constants";
export default {
  data() {
    return {
      formData: {
        subject: "", //学科
        difficulty: "", //难度
        question_type: "", //试题类型
        tag: "", //标签
        city: "", //城市
        district: "", //区域
        keyWord: "", //关键字
        title_notes: "", //提目备注
        enterprise: "", //企业简称
        directions: "", //方向
        enteringer: "", //录入人
        second_level_directory: "" //二级目录
      },
      subjectlist: "",//学科列表
      taglist: "",//标签列表
      difficulty:"",//难易程度
      questionType:"",//问题类型
      directionlist:"",//方向
      difficulty_list:'',//难度
      page: {
        counts: 2000, //总记录数
        pageSize: 10, //一页多少个
        current_page: 1, //当前页数
        pages: 0 //总页数
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  created() {
    questionslist();
    tags_list().then(result => {
      this.taglist = result.data.items;
    }),
      subjects_list().then(result => {
        this.subjectlist = result.data.items;
      });
      this.directionlist=directionlists
      this.difficulty_list=difficultylist
      this.questionType_list=questionTypelist
  }
};
</script>

<style lang="scss"></style>
