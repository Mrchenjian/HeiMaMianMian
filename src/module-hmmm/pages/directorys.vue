<template>
<el-card id='card'>
  <!-- 导航头 -->
 <el-row slot="header">
   <el-button @click="dialogVisble=true">新建目录</el-button>
   <el-button>返回科学</el-button>
  </el-row>
  <!-- 2.输入框 -->

  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item  label="目录名称">
      <!-- 7.输入内容双向绑定 -->
      <el-input   v-model="searchForm.directoryName" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item  label="状态">
      <!-- 6.绑定选择框状态    选择的状态绑定-->
      <el-select v-model="searchForm.state"  placeholder="请选择" >
        <!-- 9.引入的常量，界都赋值给data数据中，变量 -->
        <el-option v-for='item in status' :key='item.value' :label='item.label' :value='item.value'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class='clear' @click="clearData" >清除</el-button>
      <el-button type="primary" @click="searchData">搜索</el-button>
    </el-form-item>
  </el-form>
<!-- 3.表格 -->
      <el-table
      :data="list"
      style="width: 100%"
      border
      >
      
      <el-table-column
        prop="id"
        label="序号"
        width="160">
      </el-table-column>

      <el-table-column
        prop="directoryName"
        label="目录名称"
        width="160">
      </el-table-column>

      <el-table-column
        prop="creator"
        label="创建者"
        width="160">
      </el-table-column>

       <el-table-column
        prop="creatorDate"
        label="创建日期"
        width="160">
        <template slot-scope="obj">{{obj.row.addDate | parseTimeByString }}</template>
     
      </el-table-column>

      <el-table-column
        prop="totals"
        label="面试题量"
        width="160">
        <!-- 作用域插槽  -->
        

        
       
      </el-table-column>

      <el-table-column
        prop="state"
        label="状态"
        width="160"
        :formatter="formatterStatus" >
      </el-table-column>

      <el-table-column
       
        label="操作"

        width="160">
        <!-- 这里作用域插槽可以拿到每行的数据row，没用列的数据 cloum-->
        <template slot-scope='obj'>
        <el-button class='btn' type='text' >修改</el-button>
        <el-button class='btn' type='text' @click="changState(obj.row)">
          {{
          obj.row.state === 1 ? '禁用':'启用'
          }}</el-button>
        <el-button class='btn' type='text' @click="delItem(obj.row.id)"  >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   
  <!-- 4.页码 -->








<el-row :gutter="20" >
  <el-col :span="12" :offset="20" >
    <div class="grid-content bg-purple">
     <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page.currentPage"
      :total="page.total"
      :page-size="page.pageSize">
      </el-pagination>
    </div>
  </el-col>
</el-row>
<!-- 放置传层 -->
<el-dialog :visible="dialogVisble" >
  <el-form :model='publichForm' :rules="rules" label-width="80px">
    <el-form-item label='目录名称' prop='directoryName'>
      <el-input v-model='publichForm.directoryName' style='width:40%'></el-input>
    </el-form-item>
    <el-form-item label='学科' prop="subjectID">
      <el-select v-model='publichForm.subjectID'   style='width:40%'>
        <el-option v-for='item in subjects' :key='item.value'></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <el-row slot='footer' type='flex' justify='end' >
    <el-button @click='btnok' type='primary'>确定</el-button>
    <el-button @click='btnCancel' >取消</el-button>
  </el-row>

</el-dialog>
 
</el-card> 
</template>

<script>
//4.引入常量stauts
import { status } from '../../../src/api/hmmm/constants'
import {simple as simpleSubjects} from '../../api/hmmm/subjects'
//12.请求数据前清儒一个定义i好的发起ajax请求的方法
import {list as listData , remove as removeDirectory ,removeState} from '../../api/hmmm/directorys'
export default {
  name: 'DirectorysList',
  data() {
    return {
      dialogVisble:false,
      // 8.表单数据，输入目录名字用搞一个directoryName接受，输入的内容
      searchForm:{
        directoryName:"",//目录名称
        state:null,
      },

      status:status ,//5.结构赋值把常量的status数组的东西赋值在了data利，
      list:[],//定义一个空数组，与el-table联系，在方法中供求数据，了每一项有le-tabal props绑定键
      
      page:{
        currentPage:1,//当前页
        pageSize:10,//每页长度
        total:0,//总条数


      },
      //
      subjects:[],//存放学科的列表
      //定义一个空非表单数据接收的对象
      publichForm:{
        subjectID:null,
        directoryName:''

      },
      //定义一个校验规则，两个input必填
      rules:{
        subjectID:[{required:true,message:'内容奴能为空'}],
        directoryName:[{required:true,message:'内容不能为空'}]
      }

//
    }
  },
  methods:{
    //新建目录弹层确定请求新建要的是input标签的属性
      btnok(){

      },
      //弹框按取消改变dialogVisble值
      btnCancel(){
       this.dialogVisble=false
      },

    //禁用或者开启
  async changState(row){
    await this.$confirm('你确定改变当前状态');
    await removeState({id:row.id,state:row.state === 1 ? 0 :1 });
    this.$message({type:'sucsses',message:'修改状态下成功'});
    this.gitDirectory(this.searchForm);
  },
    
    
    
    //删除功能 数据接口在外面定义了一个remove方法 需要喜欢如参数id
    
    async delItem(id){
    await this.$confirm('您是否确定要删除这行');
    await removeDirectory({id});
    this.$message({type:'success',message:'删除成功'});
    //x重新加载
    this.gitDirectory(this.searchForm);

    },
    //带条件搜索
    
    
    searchData(){
    //带条件搜索
    this.page.currentPage = 1//首页是第一个
      this.gitDirectory(this.searchForm)
    },
    
     
    //清除表单内容 
    clearData(){
      this.searchForm={
        //表单是默认状态
        directoryName:"",//目录名称
        state:null,
      }
    },
    //这里是表格列属性绑定 的一个方法 :formatter="方法名" 在motheds上定义方法，然后格式化数据
    formatterStatus(row,column,cellValue,index){   
      //cellValue
     //console.log(typeof cellValue);//返回值是number 值是1
     let result = this.status.filter(item=>item.value === cellValue)
     return result.length?result[0].label : '状态未知'

    },
  //10.得到数据
    async gitDirectory(data){
    //12.请求数据前清儒一个定义i好的发起ajax请求的方法
   let result = await listData({
      page:this.page.currentPage,//默认当前页，为第一页
      pagesize:this.page.pageSize,//请求每一页条数
      ...data
   });
    this.total=result.data.counts//总记录数
    this.list=result.data.items
    
    },
   async gitSimpleSubject(){
     let result = await simpleSubjects()
     this.subjects = result.data
    }
  },
  
  //11.狗子函数，实例同时加载
  created(){
    this.gitSimpleSubject();//获取简单列表数据的方法
    this.gitDirectory()  //获取目录数据的方法
  }


}
</script>

<style  scoped>
#card {
background-color: white;
margin: 0;
padding:0;


}
.clear {
  background-color: white;
  color:#999;
}
.page {
  margin: 0 auto;

}
.btn {
  color:blue;
  font-size:12px;
  border:0;
}

</style>
