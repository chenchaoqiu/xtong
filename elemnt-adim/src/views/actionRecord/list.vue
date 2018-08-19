<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">操作者：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="actionEmployeeName" placeholder="请输入内容"></el-input>
        </div>
        <el-button class="fl" @click="search" type="primary" style="margin-left: 20px;">搜索</el-button>
      </div>
      <div class="fl module">
        <div class="fl">操作时间：</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="actionBeginTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="fl" style="margin:0 15px;">到</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="actionEndTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <el-button class="fl" @click="search"  type="primary" style="margin-left: 20px;">搜索</el-button>
      </div>
    </div>

    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="actionEmployeeName" label="操作人" min-width="180"></el-table-column>
        <el-table-column prop="moduleName" label="模块" min-width="180"></el-table-column>
        <el-table-column prop="pageName" label="页面" min-width="180"></el-table-column>
        <el-table-column prop="actionContent" label="操作内容" min-width="180"></el-table-column>
        <el-table-column prop="addTime" label="操作时间" min-width="350"></el-table-column>
        <el-table-column prop="loginIp" label="登录IP" min-width="180"></el-table-column>
        <el-table-column prop="platFormName" label="端口" min-width="180"></el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div style=" margin-top: 10px;">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
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
        actionEmployeeName: '',
        actionBeginTime: '',
        actionEndTime: '',
        dataList: [], /* 接口返回来的数据[{}]*/
        currentPage: 1, /* 分页定位到第几页*/
        total: 0, /* 总条数*/
        pageSize: api.pageSize /* 一页多少条数据*/
      }
    },
    components: {},
    computed: {},
    methods: {
      async fet(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          actionEmployeeName: e.actionEmployeeName || '',
          actionBeginTime: e.actionBeginTime || '',
          actionEndTime: e.actionEndTime || ''
        }
        const josn = await api.actionRecordList(jquery)
        this.dataList = josn.data.list
        this.total = josn.data.totalSize
      },
      handleCurrentChange(val) {
        this.fet({ page: val,
          actionEmployeeName: this.actionEmployeeName,
          actionBeginTime: this.actionBeginTime,
          actionEndTime: this.actionEndTime })
        console.log(`当前页: ${val}`)
      },

      search() {
        this.fet({
          actionEmployeeName: this.actionEmployeeName,
          actionBeginTime: this.actionBeginTime,
          actionEndTime: this.actionEndTime
        })
      }
    },
    created: function() {
      this.fet({ page: 1 })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component {
    margin: 15px;
    padding: 15px;
    background: #fff;
  }

  .feel-input {
    width: 248px;
    margin-right: 20px;
    margin-left: 10px;
  }

  .time-input {
    width: 140px;
    .el-date-editor.el-input {
      width: 100%;
    }
  }

  li {
    float: left;
    padding: 0 10px;
    cursor: pointer;
    color: #666;
    &.xs, &:hover {
      color: #3096f8;
    }
  }
</style>
