<template>
  <div class="question-container">
    <el-card>
      <div slot="header">
        <el-button type="primary" @click="new_page">新增试题</el-button>
        <el-button type="primary">批量导入</el-button>
      </div>
      <el-form :inline="true" ref="myfrom" :model="formData">
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
          <el-select
            placeholder="请选择"
            @change="change_city"
            v-model="formData.city"
          >
            <el-option
              :label="item"
              v-for="item in city_list"
              :key="item.city"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="district" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.district">
            <el-option
              :label="item"
              v-for="item in arears"
              :key="item"
              :value="item"
            ></el-option>
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
        <el-form-item label="企业简称" prop="enterprise" label-width="80px">
          <el-input style="width:100%" v-model="formData.enterprise"></el-input>
        </el-form-item>
        <el-form-item label="方向" prop="directions" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.directions">
            <el-option
              :label="item"
              v-for="(item, index) in directionlist"
              :key="index"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入人" prop="enteringer" label-width="80px">
          <el-select placeholder="请选择" v-model="formData.enteringer">
            <el-option
              :label="item.username"
              v-for="item in enteringer_list"
              :key="item.id"
              :value="item.id"
            ></el-option>
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
            <el-option
              :label="item.label"
              v-for="item in directorys_list"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row style="margin-bottom: 30px" type="flex" justify="center">
            <el-button @click="clear" prop="112">清除</el-button>
            <el-button type="primary" prop="123">搜索</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="id" label="序号" min-width="150">
        </el-table-column>
        <el-table-column prop="number" label="试题编号" min-width="220">
        </el-table-column>
        <el-table-column prop="subjectID" label="学科" min-width="120">
        </el-table-column>
        <el-table-column prop="city" label="题型" min-width="120">
        </el-table-column>
        <el-table-column prop="question" label="题干" min-width="200">
        </el-table-column>
        <el-table-column prop="addDate" label="录入时间" min-width="180">
        </el-table-column>
        <el-table-column
          prop="direction"
          :formatter="questionFormatter"
          label="难度"
          min-width="120"
        >
        </el-table-column>
        <el-table-column prop="creator" label="录入人" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="200">
          <template slot-scope="obj">
            <el-button type="text" @click="preview">预览</el-button>
            <el-button type="text" @click="edit(obj.row.id)">修改</el-button>
            <el-button type="text" @click="deleted(obj.row.id)">删除</el-button>
            <el-button type="text" @click="add_choiceness(obj.row.id)">加入精选</el-button>
          </template>
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
          @current-change="chang_page"
        >
        </el-pagination>
      </el-row>
      <el-dialog :visible="visible"  @close="close_dialog"  title="题目预览">
        <el-row style="height:60px" type="flex" align="middler">
        <el-col :span="6">[题库]:面试宝典题库</el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6">[学科]:</el-col>
      </el-row>
      <el-row style="height:60px" type="flex" align="middler">
        <el-col :span="6">[题型]:</el-col>
        <el-col :span="6">[编号]:</el-col>
        <el-col :span="6">[难度]:</el-col>
        <el-col :span="6">[标签]:</el-col>
      </el-row>
      <el-row style="height:60px" type="flex" align="middler">
        <el-col :span="6">[目录]:</el-col>
        <el-col :span="6">[企业]:</el-col>
        <el-col :span="6">[方向]:</el-col>
        <el-col :span="6">[城市]:</el-col>
      </el-row>
      <el-row></el-row>
      <el-row slot="footer" type="flex" justify="end">
        <el-button type="primary" @click="close_dialog">关闭</el-button>
      </el-row>
      <el-row style="margin:60px 0">
        [题干]:
        <div v-html="formData.question"></div>
      </el-row>


      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  list as questionslist,
  remove,
  update
} from "../../api/hmmm/questions";
import { list as subjects_list } from "../../api/hmmm/subjects";
import { list as tags_list } from "../../api/hmmm/tags";
import { simple as user_simple } from "../../api/base/users";
import { simple as directorys_simple } from "../../api/hmmm/directorys";
import { provinces, citys } from "../../api/hmmm/citys";
import {
  difficulty as difficultylist,
  questionType as questionTypelist,
  direction as directionlists
} from "../../api/hmmm/constants";
export default {
  data() {
    return {
      formData: {
        subject: null, //学科
        difficulty: null, //难度
        question_type: null, //试题类型
        tag: null, //标签
        city: null, //城市
        district: null, //区域
        keyWord: null, //关键字
        title_notes: null, //提目备注
        enterprise: null, //企业简称
        directions: null, //方向
        enteringer: null, //录入人
        second_level_directory: null //二级目录
      },
      subjectlist: "", //学科列表
      taglist: "", //标签列表
      difficulty: "", //难易程度
      questionType: "", //问题类型
      directionlist: "", //方向
      difficulty_list: "", //难度
      enteringer_list: "", //录入人列表
      directorys_list: "", //二级目录列表
      city_list: provinces(), //城市目录
      arears: "", //区域目录
      page: {
        counts: 2000, //总记录数
        pageSize: 10, //一页多少个
        current_page: 1, //当前页数
        pages: 0 //总页数
      },
      tableData: [],
      visible:false//显示弹框
    };
  },
  methods: {
    questionFormatter(row, column, cellValue) {
      let result = this.difficulty_list.filter(item => item.value == cellValue);
      return result.length ? result[0].label : "未知";
    },
    async chang_page(new_page) {
      this.page.current_page = new_page;
      let data = {
        page: this.page.current_page,
        pagesize: this.page.pageSize
      };
      let result = await questionslist(data);
      this.tableData = result.data.items;
    },
    async change_city() {
      this.formData.district = null;
      this.arears = null;
      let result = await citys(this.formData.city);
      this.arears = result;
    },
    async edit(id) {
      this.$router.push(`/questions/new?id=${id}`);
    },
    deleted(id) {
      this.$confirm("确定？").then(() => {
        remove({ id });
        this.$message({ type: "success", message: "删除成功" });
      });
      questionslist().then(result => {
        this.tableData = result.data.items;
        this.page.counts = result.data.counts;
      });
    },
    preview() {
      //预览事件
      this.visible=true
    },
    add_choiceness(id) {
      //加入精选事件
      this.$confirm("是否加入精选？");
    },
    close_dialog(){
      this.visible=false
    },
    new_page(){
      this.$router.push('new')
    },
    clear() {
      this.$refs.myfrom.resetFields()
      // this.formData = {
      //   subject: null, //学科
      //   difficulty: null, //难度
      //   question_type: null, //试题类型
      //   tag: null, //标签
      //   city: null, //城市
      //   district: null, //区域
      //   keyWord: null, //关键字
      //   title_notes: null, //提目备注
      //   enterprise: null, //企业简称
      //   directions: null, //方向
      //   enteringer: null, //录入人
      //   second_level_directory: null //二级目录
      // };
      // this.$refs.myfrom.resetFields();
    }
  },
  created() {
    questionslist().then(result => {
      this.tableData = result.data.items;
      this.page.counts = result.data.counts;
    });
    tags_list().then(result => {
      this.taglist = result.data.items;
    }),
      subjects_list().then(result => {
        this.subjectlist = result.data.items;
      });
    this.directionlist = directionlists;
    this.difficulty_list = difficultylist;
    this.questionType_list = questionTypelist;
    user_simple().then(result => {
      this.enteringer_list = result.data;
    });
    directorys_simple().then(result => {
      this.directorys_list = result.data;
    });
  }
};
</script>

<style lang="scss"></style>
