<style rel="stylesheet/scss" lang="scss" scoped>
  .component{
    margin:15px;
    /*padding:15px;*/
    /*background: #fff;*/
  }
  .col-33{color: #333}
  .col-66{color: #666}
  .col-main{color: #3096f8}

  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #fff;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;

  }
  .row-bg {
    /*padding: 10px 0;*/
    background-color: #fff;
  }
  .title{
    width: 100%;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    padding: 0 15px;
    line-height: 40px;
    .title-left{
      float: left;
    }
    .title-right{
      float: right;
      a{
        display: block;
        float: left;
        width: 56px;
        height: 24px;
        line-height: 24px;
        border-top: 1px solid #3096f8;
        border-left: 1px solid #3096f8;
        border-bottom: 1px solid #3096f8;
        text-align: center;
        margin-top:8px;
      }
      a:last-child{
        border-right: 1px solid #3096f8;
      }
      .active{
        background: #3096f8;
        color:#fff;
      }
    }
  }
  .data-container{
    padding: 15px 55px;
    text-align: center;
    color: #fff;
  }
  .big-list{
    padding-left: 15px;
    border-bottom: 1px solid #eee;
    .vip{
      width: 25px;
      height: 12px;
      margin-left: 10px;
    }
  }
  .small-list-con{
    padding: 20px 15px 0;
    .small-list-left{
      width: 10%;
      float: left;
      box-sizing: border-box;
    }
    .small-list-right{
      width: 90%;
      float: left;
      box-sizing: border-box;
      padding-left: 15px;
      /*border-bottom: 1px solid #eee;*/
      border-left: 4px solid #eee;
    }
  }
  .echarts{
    margin-top: 60px;
    text-align: center;
  }
  .con-h800{
    height: 800px;
    background: #fff;
  }
</style>
<template>
  <div class="component">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="con-h800" >
          <div class="grid-content bg-purple">
          <div class="title">
            <div class="title-left">数据概况</div>
            <div class="title-right">
              <a v-for="(item, index) in statusList" @click="changeStatus(index +1)" :class="{'active':index===(status-1)}">{{item}}</a>
            </div>
          </div>
          <!--内容-->
          <div class="data-container">
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="grid-content bg-purple" style="background-image: -webkit-linear-gradient( -45deg, rgb(0,131,255) 0%, rgb(0,187,243) 100%);height: 180px;">
                  <div style="padding-top: 55px;font-size: 14px">总接待量</div>
                  <div style="padding-top: 15px;font-size: 36px">{{caseData.receptionNum}}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="background-image: -webkit-linear-gradient( -45deg, rgb(254,147,2) 0%, rgb(255,201,2) 100%);height: 180px;">
                  <div style="padding-top: 55px;font-size: 14px">订单量</div>
                  <div style="padding-top: 15px;font-size: 36px">{{caseData.orderNum}}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple " style="background-image: -webkit-linear-gradient( -45deg, rgb(255,107,185) 0%, rgb(255,140,111) 100%);height: 180px;">
                  <div style="padding-top: 55px;font-size: 14px">成交金额</div>
                  <div style="padding-top: 15px;font-size: 36px">{{caseData.achieve}}</div>
                  <div style="padding-top: 15px;">实收业绩<span style="padding-left: 10px">{{caseData.realAchieve}}</span></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!--图表-->
          <div class="echarts">
              <div style="">交易金额</div>
              <div id="myChart" :style="{width: '90%', height: '400px',margin:'0 auto'}"></div>
          </div>
        </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="con-h800" style="overflow-y: scroll">
          <div class="grid-content bg-purple">
            <div class="title">
              <div class="title-left">计划事项</div>
              <router-link to='/project' class="title-right col-33">查看更多</router-link>
            </div>
            <div v-for="(item,index) in bigList" :key="item.planId">
              <div class="big-list" >
                <div style="margin-top: 12px">{{item.applyVisitBeginTime2}}</div>
                <div style="margin-top: 12px">来访人：{{item.name}}<img
                  :src="item.tagLogo"
                  class="vip"/></div>
                <div style="margin-top: 12px;margin-bottom: 15px" v-if="(item.status > 1)">任务：{{item.visitContent}}</div>
                <div style="margin-top: 12px;margin-bottom: 15px" v-else>任务：{{item.remark}}</div>
              </div>
              <div class="small-list-con">
                <div class="small-list clearfix" v-for="(itemb,ind2) in (item.planSonList)">
                  <div class="small-list-left">
                    <div>{{itemb.shortBeginTime}}</div>
                    <div class="col-33" style="margin-top: 10px">至{{itemb.shortEndTime}}</div>
                    <div class="col-main" style="margin-top: 10px">{{itemb.statusValue}}</div>
                  </div>
                  <div class="small-list-right" v-for="">
                    <div class="clearfix">
                      <div style="width: 12%;float: left">子任务：</div>
                      <div style="width: 88%;float: left">{{itemb.executeContent}}
                      </div>
                    </div>
                    <div class="clearfix" style="margin-top:15px;">
                      <div style="width: 12%;float: left">跟进人：</div>
                      <div style="width: 88%;float: left">{{itemb.executorName}}</div>
                    </div>
                  </div>
                  <div style="width: 88%;height: 1px;float: right;background: #eee;margin: 20px 0"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../../api/index'
  // 引入基本模板
  const echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'index',
    data() {
      return {
        bigList: [], // 计划data
        caseData: '', // 数据概况data
        transactionData: '', // 折线图
        zhexianDayType: 'yesterday',
        statusList: ['昨天', '近7天', '近30天'],
        status: 1,
        // 图表配置start
        options: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '1%',
            right: '8%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '交易金额',
              type: 'line',
              stack: '总量',
              areaStyle: { normal: {}},
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#3096f8'
                  },
                  areaStyle: {
                    color: '#3096f8'
                  }
                }
              },
              data: []
            }
          ]
        }
        // 图表配置end
      }
    },
    components: {

    },
    computed: {

    },
    methods: {
      // 选择昨天-近7天-近30天
      changeStatus(index) {
        if (this.status != index) {
          this.status = this.status === index ? null : index
          this.employeeConsole();
          if (this.status == 1) {
            this.zhexianDayType = 'yesterday';
          } else if (this.status == 2) {
            this.zhexianDayType = 'last7';
          } else if (this.status == 3) {
            this.zhexianDayType = 'last30';
          }
          this.orderTransactionData();
        }
      },
      // echarts绘制
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.options)
      },
      /* 数据概况*/
      async employeeConsole() {
        const jquery = {
          type: this.status
        }
        const json = await api.employeeConsole(jquery)
        this.caseData = json.data;
      },
      /* 折线图*/
      async orderTransactionData() {
        const jquery = {
          dayType: this.zhexianDayType
        }
        const json = await api.orderTransactionData(jquery)
        this.transactionData = json.data;
        this.options.xAxis[0].data = this.transactionData.amountItemDay;
        this.options.series[0].data = this.transactionData.amountItemData;
        if (json.imei_error_code == 0) {
          this.drawLine()
        }
      },
      /* 计划接口*/
      async planTodayList() {
        const jquery = {
        }
        const json = await api.planTodayList(jquery)
        this.bigList = json.data.list;
      }
    },
    mounted: function() {
      this.drawLine();// echarts绘制
      this.employeeConsole();// 数据慨况
      this.orderTransactionData();// 折线图
      this.planTodayList();// 计划接口
    }
  }
</script>


