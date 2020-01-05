<template>
  <el-card>
    <el-row slot="header">
      <el-button type="primary" @click="dialogVisible=true" >新增面试技巧</el-button>
    </el-row>
    <el-row>
      <el-form style="margin-left:20px">
        <el-form-item>
          <span>关键字</span>
          <!-- 绑定关键字 -->
          <el-input
            v-model="fromData.keyword"
            style="width:20%; margin-top:40px;  margin-left:20px;"
          ></el-input>
          <el-button style="margin-left:20px" @click="clear">清除</el-button>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="reads" label="阅读数"></el-table-column>
        <el-table-column :formatter="formatterBool" prop="state" label="状态"></el-table-column>
        <el-table-column prop="creator" label="录入人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
            <el-button type="text">预览</el-button>
            <el-button type="text" @click="xiugai(obj.row.id)">修改</el-button>
            <el-button type="text" @click="BZsimple(obj.row.id)">删除</el-button>
            <el-button type="text" @click="open(obj.row)">{{obj.row.state === 1 ? '禁用':'启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="end">
      <span style="margin:40px 0 ;">共 {{page.total}} 条</span>
      <el-pagination
        style="margin:30px 0 ;"
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="change"
      ></el-pagination>
    </el-row>
    <!-- 弹窗 -->
    <el-dialog :show-close='false' :visible='dialogVisible' width='1000px'>
       <el-form ref="adda" :model="addData" :rules='rules' label-width='200px' >
         <el-form-item  label="学科名称" prop='title' >
             <el-input v-model="addData.title" width="50%"></el-input>
         </el-form-item>
           <el-form-item prop='articleBody' label="内容" style="width:100% ;">
        <quill-editor v-model="addData.articleBody" style="height:200px"></quill-editor>
      </el-form-item> 
      <el-form-item prop='videoURL' style="margin-top:100px" label='视频地址'>
        <el-input v-model="addData.videoURL"  width="50%"> </el-input>
      </el-form-item>
       </el-form>
      <el-row type='flex' justify="end" slot="footer">
      <el-button @click="btnok" type="primary">确定</el-button>
      <el-button @click="nook" >取消</el-button>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
import Vue from 'vue'
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 Vue.component('quill-editor',quillEditor)
import { status } from "../../api/hmmm/constants";
import {
  list as Bzlist,
  remove as removes,
  state as states,
   add   as adds,
   detail as details,
   update as updates
} from "../../api/hmmm/articles.js";
export default {
  name: "ArticlesList",
  data() {
    return {
      dialogVisible:false,  //默认不显示弹窗
      status,
      fromData: {
        keyword: "" // 关键字
      },
      list: [],
      page: {
        currentPage: 1, //当前页
        pageSize: 10, //当前页的内容数量
        total: 0
      },
      addData:{
        title:'',
        articleBody:'',
        videoURL:''
      },
    rules:{
      title:[{required:true, message:'标题不可为空'}],
      videoURL:[{required:true, message:'视频地址不可为空'}]

    }
    };
  },
  methods: {
    //修改
    async xiugai(id){
      //获取要修改的id
    var result = await details({id})
      this.addData = result.data
      this.dialogVisible = true  
      
    },
    btnok(){ 
      this.$refs.adda.validate(async isOK => {
        if(isOK){
          this.addData.id ?await updates(this.addData) :await adds(this.addData)
        this.addData={
        title:'',
        articleBody:'',
        videoURL:''
      }
      this.dialogVisible = false
       this.huoqu(this.fromData);


        }
      })
      this.dialogVisible = false
    },
    nook(){
      this.dialogVisible = false
    },
    change(newPage) {
      //  alert(newPage)
      // 修改当前的页码
      this.page.currentPage = newPage;
      this.huoqu(this.fromData);
    },
    //搜索
    search() {
      this.page.currentPage = 1; //搜索到想要的数据页面回到第一页
      this.huoqu(this.fromData);
    },
    // 清除
    clear() {
      // this.fromData = {
      //   keyword: "" // 关键字
      // };
      this.fromData.keyword = "";
    },
    //状态
    formatterBool(row, column, cellValue, index) {
      return cellValue ? "启用" : "禁用";
    },
    //修改状态
    open(row) {
      this.$confirm("确定要修改当前的状态吗")
        .then(result => {
          states({ id: row.id, state: row.state === 1 ? 0 : 1 });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改状态成功"
          });
          this.huoqu(this.fromData);
        });
    },
    //获取数据
    huoqu(data) {
      Bzlist({ ...data, page:this.page.currentPage, per_page:this.page.pageSize}).then(result => {
        this.list = result.data.items;
        this.page.total = result.data.counts;
      });
    },
    BZsimple(id) {
      this.$confirm("确定删除")
        .then(result => {
          removes({ id });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.huoqu(this.fromData);
        });
    }
  },
  created() {
    this.huoqu();
  }
};
</script>

<style lang='less' scoped>
</style>
