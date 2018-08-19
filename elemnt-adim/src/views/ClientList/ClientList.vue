<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <!--计划查询-->
        <div class="fl">客户查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="val" placeholder="请输入 客户名称/身份码/客户来源"></el-input>
        </div>
        <el-button @click="" class="fl" type="primary">搜索</el-button>
      </div>

    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">计划状态：</div>
        <div class="fl">
          <ul fo-size="16">
            <li v-for="item in tab_list">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide">
      <!--需求操作-->
      <el-button class="fl" type="primary">创建客户</el-button>
      <el-button class="fl" type="primary">excel导出</el-button>
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="tableData3" border style="width: 100%">
        <el-table-column type="index" label="客户编号" width="120"></el-table-column>
        <el-table-column prop="name" label="客户名称" min-width="140"></el-table-column>
        <el-table-column prop="visitTypeValue" label="身份码" min-width="330"></el-table-column>
        <el-table-column prop="name" label="客户来源" min-width="300"></el-table-column>
        <el-table-column prop="statusValue" label="客户管理员" min-width="240"></el-table-column>
        <el-table-column prop="followName" label="客户类型" min-width="165"></el-table-column>
        <el-table-column prop="address" label="操作" min-width="320">
          <template slot-scope="scope">
            <el-button class="fl" tab-btn type="primary">开单</el-button>
            <el-button class="fl" tab-btn type="warning">编辑</el-button>
            <el-button class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div style=" margin-top: 10px;">
      <el-pagination @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index'
  export default {
    name: 'index',
    data() {
      return {
        val:'',/*计划查询*/
        value1: '',/*开始日期*/
        value2: '',/*结束日期*/
        tableData3:[],/*接口返回来的数据[{}]*/
        currentPage4: 1,/*分页定位到第几页*/
        total:5,/*总条数*/
        pageSize:2,/*一页多少条数据*/
        tab_list:['全部','体验客','成交客'],
      }
    },
    components: {

    },
    computed: {

    },
    methods: {
      async fet(e){
          /*接口对接async await*/
          const jquery={
            pageNo:e.page || 1,
            pageSize:this.pageSize,
            keyword:e.keyword || '',
          }
        const josn=await api.memberList(jquery);
        this.tableData3=josn.data.list;
        this.total=josn.data.totalSize;
      },
      handleCurrentChange(val) {
        this.fet({page:val})
        console.log(`当前页: ${val}`);
      }
    },
    created:function () {
      this.fet({page:1})
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component{
    margin:15px;
    padding:15px;
    background: #fff;
  }
  .feel-input{
    width:248px;
    margin-right: 20px;
    margin-left: 10px;
  }
  .time-input{
    width:140px;
    .el-date-editor.el-input{
      width:100%;
    }
  }
  li{
    float: left;
    padding:0 10px;
    cursor: pointer;
    color: #666;
    &.xs,&:hover{
      color: #3096f8;
    }
  }
</style>
