<template>
  <el-card>
    <!-- 按钮 -->
    <el-row class="B-top" type="flex" justify="start" style="margin:0 0 15px 0">
      <el-button>新建标签</el-button>
      <el-button>返回学科</el-button>
    </el-row>
    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="标签名称">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <!-- 放置表格 data绑定数据 -->
    <el-table border="ture" :data="list">
      <!-- 列 绑定数据用prop -->
      <el-table-column prop="id" label="序号" width="60"></el-table-column>
      <el-table-column prop="tagName" label="标签名称"></el-table-column>
      <el-table-column prop="creator" label="创建者"></el-table-column>
      <el-table-column prop="addDate" label="创建日期">
        <!-- 作用域 插槽  row(行数据) columen $index store -->
        <template slot-scope="obj">{{obj.row.addDate | parseTimeByString}}</template>
      </el-table-column>
      <el-table-column prop="totals" label="面试题数量"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="obj">{{ obj.row.state===1?"开启":"屏蔽" }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <!-- 传过整行的方法 -->
          <el-button type="text" @click="chageState(obj.row)">{{ obj.row.state===1?"屏蔽":"开启" }}</el-button>
          <el-button type="text" @click="delItem(obj.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 放置 分页 -->
    <el-row type="flex" justify="center" style="margin:30px 0">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import {
  list as TagsList,
  removeState as state,
  remove as removeItem
} from "../../api/hmmm/tags";
export default {
  name: "TagsList",
  data() {
    return {
      list: [
        // 绑定表格数据
      ],
      page: {
        // 分页数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页长度
        total: 0 // 总条数
      }
    };
  },
  methods: {
    // 状态

    // 修改状态  接收整行数据
    async chageState(row) {
      await this.$confirm("您确定要改变状态吗");
      state({ id: row.id, state: row.state === 1 ? 0 : 1 });
      this.$message({ message: "修改状态成功", type: "success" });
      this.getdata();
    },
    // 定义删除方法
    async delItem(id) {
      // 友好 提示
      await this.$confirm("您确定要删除吗");
      //  点击确定后的逻辑   调用删除接口.传入 id
      await removeItem({ id });
      // 提示一下删除成功
      this.$message({ message: "删除消息成功", type: "success" });
      this.getdata();
    },
    async getdata() {
      // 获取数据  调用列表接口
      let result = await TagsList({
        page: this.page.currentPage, // 默认请求第一页
        pagesize: this.page.pageSize // 每页多少条
      });
      console.log(result);

      this.page.total = result.data.counts;
      this.list = result.data.items;
      this.page.pageSize = result.data.pagesize;
      this.page.currentPage = result.data.page;
    }
  },
  // 钩子函数  调用方法
  created() {
    this.getdata(); // 获取数据
  }
};
</script>

<style scoped >
</style>
