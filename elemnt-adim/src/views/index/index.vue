<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <!--计划查询-->
        <div class="fl">计划查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="val" placeholder="请输入内容"></el-input>
        </div>
        <el-button @click="serles" class="fl" type="primary">搜索</el-button>
      </div>
      <div class="fl module">
        <!--时间查询-->
        <div class="fl">计划开始时间：</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="value1" type="date" value-format="yyyy年MM月dd日" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="fl" style="margin:0 15px;">到</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="value2" type="date" value-format="yyyy年MM月dd日" placeholder="选择日期"></el-date-picker>
        </div>
        <el-button @click="serles" class="fl" type="primary" style="margin-left: 20px;">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">计划状态：</div>
        <div class="fl">
          <ul fo-size="16">
            <li :class="item.status==roled?'xs':''" v-for="item in tab_list" @click="tabAffair(item.status)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide">
      <!--需求操作-->
      <el-button class="fl" type="primary">申请新计划</el-button>
      <el-button class="fl" type="primary">excel导出</el-button>
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table v-loading="loading" :data="tableData3" border style="width: 100%">
        <el-table-column prop="executorName" empty-text="5555" label="客户名称" min-width="180"></el-table-column>
        <el-table-column prop="applyVisitBeginTime3" label="计划时间段" min-width="180"></el-table-column>
        <el-table-column prop="visitTypeValue" label="事件" min-width="350"></el-table-column>
        <el-table-column prop="name" label="地点" min-width="180"></el-table-column>
        <el-table-column prop="statusValue" label="计划状态" min-width="180"></el-table-column>
        <el-table-column prop="followName" label="计划执行人" min-width="180"></el-table-column>
        <el-table-column prop="address" label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button @click="cz(scope)" class="fl" tab-btn type="primary">操作</el-button>
            <el-button @click="cz(scope)" class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
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
        pageSize:api.pageSize,/*一页多少条数据*/
        tab_list:[{name:'全部', status:0},{name:'已申请', status:1},{name:'已设立', status:2},{name:'已完成', status:3},{name:'已关闭', status:4}],
        roled:0,/*计划状态选中值*/
        loading:true,
      }
    },
    components: {

    },
    computed: {

    },
    methods: {
      cz(e){
            console.log(e)
        },
      async fet(e){
        /*接口对接async await*/
        const jquery={
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          keyword: this.val,
          status: this.roled,
          visitBeginTimeString: this.value1,
          visitEndTimeString: this.value2

        }
        const josn=await api.pageList(jquery);
        this.tableData3=josn.data.list;
        this.total=josn.data.totalSize;
        this.loading=false;
      },
      handleCurrentChange(val) {
        this.loading=true;
        this.fet({page:val})
        console.log(`当前页: ${val}`);
      },
      serles(){
        this.loading=true;
        this.fet({page:1})
      },
      tabAffair(e){
        this.loading=true;
        this.roled=e;
        this.fet({page:1})
      }
    },
    mounted:function () {
        /*mounted*/
        console.log(555)
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
