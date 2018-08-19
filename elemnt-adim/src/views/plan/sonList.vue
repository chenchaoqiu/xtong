<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">客户名称：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="memberName" @keyup.enter.native="search" placeholder="请输入客户名称"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
        <el-button class="fl" type="primary">excel导出</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">计划状态：</div>
        <div class="fl">
          <ul fo-size="16">
            <li v-for="item in tab_list" @click="changeStatus(item)" :class="{'statusActive':item.status===status}">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="fl module" style="margin: 8px 0;">
      <!--时间查询-->
      <div class="fl">计划时间：</div>
      <div class="demo-input-suffix fl">
        <el-button plain style="padding-left: 5px;padding-right: 5px;" @click="search({isLastDate: true})"><i class="el-icon-caret-left"></i></el-button>
        <el-date-picker style="width: 77%;" v-model="beginTimeString" @change="search" type="date" placeholder="选择日期" format="yyyy-MM-dd"></el-date-picker>
        <el-button plain style="padding-left: 5px;padding-right: 5px;" @click="search({isNextDate: true})"><i class="el-icon-caret-right"></i></el-button>
      </div>
      <el-button @click="search({isToday: true})" class="fl" type="success" style="margin-left: 20px;">今日</el-button>
    </div>

    <div class="hide">
      <!--需求操作-->
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="tableData3" border style="width: 100%">
        <el-table-column prop="name" label="客户名称" min-width="180"></el-table-column>
        <el-table-column prop="rangeTime" label="计划时间段" min-width="280"></el-table-column>
        <el-table-column prop="executeContent" label="事件" min-width="250"></el-table-column>
        <el-table-column prop="name" label="地点" min-width="180"></el-table-column>
        <el-table-column prop="planSonStatusValue" label="计划状态" min-width="100"></el-table-column>
        <el-table-column prop="executorNames" label="计划执行人" min-width="180"></el-table-column>
        <!--<el-table-column prop="address" label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button class="fl" tab-btn type="primary">操作</el-button>
            <el-button class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
          </template>
        </el-table-column>-->
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
        keyword: '', /* 计划查询*/
        beginTimeString: new Date(), /* 开始日期*/
        tableData3: [], /* 接口返回来的数据[{}]*/
        currentPage4: 1, /* 分页定位到第几页*/
        total: 5, /* 总条数*/
        pageSize: api.pageSize, /* 一页多少条数据*/
        tab_list: [
          { name: '全部', status: '' },
          { name: '未完成', status: 0 },
          { name: '已完成', status: 1 }
        ],
        memberName: '',
        status: null
      }
    },
    components: {

    },
    computed: {

    },
    methods: {
      async fet(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          status: this.status,
          beginTimeString: this.beginTimeString.getFullYear() + '-' + (this.beginTimeString.getMonth() + 1) + '-' + this.beginTimeString.getDate(),
          memberName: this.memberName
        }
        const josn = await api.planSonPageList(jquery)
        this.tableData3 = josn.data.list
        this.total = josn.data.totalSize
      },
      handleCurrentChange(val) {
        this.fet({ page: val })
        console.log(`当前页: ${val}`)
      },
      search(e) {
        e = e || {}
        if (e.isToday === true) {
          // 今天
          this.beginTimeString = new Date()
        } else if (e.isLastDate === true) {
          // 昨天
          this.beginTimeString = new Date(this.beginTimeString.getTime() - 3600 * 1000 * 24)
        } else if (e.isNextDate === true) {
          // 明天
          this.beginTimeString = new Date(this.beginTimeString.getTime() + 3600 * 1000 * 24)
        }
        this.fet(e)
      },
      changeStatus(item) {
        this.status = this.status === item.status ? null : item.status
        this.fet({ page: this.currentPage4 })
      }
    },
    created: function() {
      this.fet({ page: 1 })
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
  .statusActive{
    color: #3096f8;
  }
</style>
