<template>
  <!-- <div class="dashboard-container"> -->
    <!-- <div class="app-container"> -->
      <el-card>
        <!-- <el-row> -->
        <el-table :data="list">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="questionIDs" label="试题ID"></el-table-column>
          <el-table-column prop="progressOfAnswer" label="答题进度"></el-table-column>
          <el-table-column prop="accuracyRate" label="正确率"></el-table-column>
          <el-table-column prop="totalSeconds" label="答题总耗时"></el-table-column>
          <el-table-column prop="questionType" label="组题类型/详情"></el-table-column>
          <el-table-column label="操作">
            <el-button @click="delItem" type="text">删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next"
         @current-change="change_page"
         :current-page="page.currentPage"
         :page-size="page.pageSize"
         :total="page.total">

        </el-pagination>
        <!-- </el-row> -->
      </el-card>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { randoms as questionList } from "../../api/hmmm/questions";
export default {
  name: "QuestionsRandoms",
  data() {
    return {
      list: [],
      page:{
        currentPage:1, // 当前页码
        pageSize:10, // 默认每页长度
        total:0 //总条数
      }
    };
  },
  methods: {
    delItem(){
      this.$confirm('您确定要删除此条数据？')
    },
    // 获取数据
     getItem(){
      questionList().then(result => {
        this.list = result.data.items;
        this.page.total = result.data.pages ;// 获取文章总数
      // debugger
      });

    },
    // 分页事件
    change_page(newPage){      
      this.page.currentPage = newPage;      
      this.getItem()
    }

  },
  filters:{

  },
  created() {
    this.getItem()

  }
};
</script>

<style lang="less" scoped>
</style>
