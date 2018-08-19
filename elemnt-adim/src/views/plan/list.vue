<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <!--计划查询-->
        <div class="fl">计划查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="keyword" placeholder="客户名称、来访事项内容" @keyup.enter.native="search"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
      </div>
      <div class="fl module">
        <!--时间查询-->
        <div class="fl">计划开始时间：</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="applyVisitBeginTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="fl" style="margin:0 15px;">到</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="applyVisitEndTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <el-button class="fl" type="primary" style="margin-left: 20px;" @click="search">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">计划状态：</div>
        <div class="fl">
          <ul fo-size="16">
            <li v-for="(item, index) in statusList" @click="changeStatus(index)" :class="{'statusActive':index===status}">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide">
      <!--需求操作-->
      <el-button class="fl" type="primary" @click="businessman">申请新计划</el-button>
      <el-button class="fl" type="primary" @click="exportExcel">excel导出</el-button>
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="tableData3" border style="width: 100%" id="zhangjiawei">
        <el-table-column prop="name" label="客户名称" min-width="180"></el-table-column>
        <el-table-column prop="applyVisitBeginTime3" label="计划时间段" min-width="180"></el-table-column>
        <el-table-column prop="visitTypeValue" label="事件" min-width="50"></el-table-column>
        <el-table-column prop="statusValue" label="计划状态" min-width="180"></el-table-column>
        <el-table-column prop="executorName" label="计划执行人" min-width="180"></el-table-column>
        <el-table-column prop="address" label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button class="fl" tab-btn type="primary">操作</el-button>
            <el-button class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;" @click="PersonalPlanShows(scope.row.planId,scope.row.memberId)">查看</el-button>
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

    <!--申请计划-->
    <div v-if="planStatus" class="teamwork">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text">
          <p class="teamwork-text-title">
            <i fo-size='18'>申请新计划</i>
            <i @click="colsee" class="fr"><svg-icon icon-class="x" /></i>

          </p>
          <div class="teamwork-text-nr">
            <el-form class="login-form" autoComplete="off" :model="Dates" ref="loginForm" label-position="left">
              <el-form-item>
                <div fo-size='16' class="fl" style="width: 120px;text-align: right">客户名称:</div>
                <!--<el-input fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;" name="name" type="text" v-model="Dates.name" autoComplete="off" placeholder="请输入合作商名称" />-->
                <div style="color:#3096f8;margin-left: 140px"  @click="showEmployee = true" v-if="form.name == ''">请选择客户</div>
                <div style="color:#3096f8;margin-left: 140px"  @click="showEmployee = true" v-else>{{form.name}}</div>
              </el-form-item>
              <el-form-item>
                <span fo-size='16' class="fl" style="width: 120px;text-align: right">业务对接人:</span>
                <div style="margin-left: 20px;font-size: 16px;" class="fl">
                  <el-button @click="newList" type="text">新建</el-button>
                  <!--选择客户带过来的-->
                  <div v-for="(item,index) in Dates.linkmanList" class="buttcur">
                    <i>对接人</i>
                    <el-input fo-size='14' size="small" style="width: 83px;margin: 0 14px;" name="name" type="text" v-model="item.name" autoComplete="off" placeholder="名称" />
                    <el-input maxlength="11" fo-size='14' size="small" style="width: 125px;" name="name" type="text" v-model="item.mobilePhone" autoComplete="off" placeholder="手机号码" />
                    <el-button @click="deletes(index)" style="margin-left: 17px;height: 34px;" type="info">删除</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <span fo-size='16' class="fl" style="width: 120px;text-align: right">客户来源:</span>
                <!--<el-cascader placeholder="请选择客户来源" style="width:200px;margin-left: 20px;" :options="options" @change="handleChange"></el-cascader>-->
                <el-select v-model="Dates.bizzPartnerId" placeholder="请选择客户来源"  style="width: 360px;margin-left: 20px" >
                  <el-option v-for="item in options" :label="item.name" :key="item.bizzPartnerId" :value="item.bizzPartnerId" style="float: none!important;"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <span fo-size='16' class="fl" style="width: 120px;text-align: right">来访类型:</span>
                <!--<el-cascader placeholder="来访类型" style="width:200px;margin-left: 20px;" :options="listType" @change="handleChange2"></el-cascader>-->
                <el-select v-model="selTypeValue" multiple placeholder="请选择" style="width:260px;margin-left: 20px;">
                  <el-option
                    v-for="item in selType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" style="float: none!important;">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <span fo-size='16' class="fl" style="width: 120px;text-align: right">申请来访时间:</span>
                <el-date-picker v-model="Dates.applyTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="margin-left: 20px"></el-date-picker>
              </el-form-item>
              <!--备注-->
              <el-form-item>
                <span style="width: 120px;text-align: right" fo-size='16' class="fl">备注:</span>
                <el-input class="fl" :autosize="{minRows: 4,maxRows: 6}" fo-size='14' maxlength="100" style="width: 440px;margin-left: 20px;" name="name" type="textarea" v-model="Dates.remark" placeholder="暂无备注" />
              </el-form-item>
            </el-form>
          </div>
          <div style="text-align: right;padding-right: 30px;">
            <el-button type="primary" @click="setPlan">去设立计划</el-button>
            <el-button @click="colsee('ok')" type="primary">保存</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--选择客户-->
    <transition name="el-fade-in-linear">
      <div v-show="showEmployee" class="teamwork teamwork2">
        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div class="teamwork-text">
            <p class="teamwork-text-title">
              <i fo-size='18'>客户列表</i>
              <i @click="showEmployee = false" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p>
            <div class="teamwork-text-nr">
              <div class="fl" style="line-height: 36px;margin-bottom: 20px">
                <!--计划查询-->
                <div class="fl">客户查询：</div>
                <div class="demo-input-suffix fl feel-input">
                  <el-input v-model="meployeeSearchWord" placeholder="请输入内容"></el-input>
                </div>
                <el-button @click="searchEmployee" class="fl" type="primary">搜索</el-button>
              </div>

              <el-table ref="relatedTable" :data="memberList" @row-click="showRow"   tooltip-effect="dark" border style="width: 100%;max-height:80%;overflow-y: scroll">
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row.memberId">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="客户名称" width="300">
                </el-table-column>
                <el-table-column prop="roleTypeName" label="职位" show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div style=" margin-top: 10px;">
                <el-pagination @current-change="employeeCurrentChange" :current-page.sync="memberCurrentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                               :total="memberListTotal">
                </el-pagination>
              </div>
            </div>
            <div style="text-align: right;padding-right: 30px;">
              <el-button type="primary" @click="saveEmployee">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 日期：2018年8月16日。 技术人员：张嘉威。内容：个人计划 -->
    <!-- 已申请的空 -->
    <div class="box" v-if="PersonalPlanShow">
      <div class="PersonalPlan">
        <!-- 上部分 -->
        <i class="el-icon-close is" size=34 @click="PersonalPlanHide()"></i>
        <!-- 下左部分：计划详情-->
        <div class="PlanDetails">
          <!-- 详情头部 -->
          <h3 class="DetailHeader">计划详情</h3>
          <!-- 用户基本信息 -->
          <div class="UserInfo">
            <!-- imgs2 == 女孩 ，imgs1 == 男孩 -->
            <h3>{{planDetail.name}} <span><img :src="planDetail.tagLogo" style="width: 40px;height: 20px;"/></span>
              <i v-if="(memberDetail.sex == 1)" class="imgs1"></i>
              <i v-if="(memberDetail.sex == 2)" class="imgs2"></i>
            </h3>
            <p>编号 : {{memberDetail.memberNo}}</p>
            <p>身份证号码 : {{memberDetail.idNumber}}</p>
          </div>
          <!-- 计划内容 -->
          <div class="PlanContent">
            <div class="h640">
              <h5>计划内容</h5>
              <ul class="uls">
                <li>
                  <span>事项内容:</span>
                  <textarea v-model="textareas"></textarea>
                </li>
              </ul>
              <div>
                <span class="fl">来访时间：</span>
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="date"
                  >
                  </el-date-picker>
                </div>
              </div>
              <!--<p @click="connectOrder(memberDetail.memberId)">-->
              <p @click="correlation_click">
                <span>关联订单</span>
                <span class="span1">选择(可选)</span>
              </p>
              <!--  关联订单内容-->
              <ul class="OrderContent">
                <!-- 这个可以开始引入关联订单内容的接口数据 -->
                <li v-for="(itemC,index) in correlation_list" >
                  <div>
                    <p class="fl">体验卡</p>
                    <p class="fr">{{itemC.orderSn}}</p>
                  </div>
                  <div style="margin: 0;padding: 0" v-for="(itemL,index2) in itemC.salePackageItems">
                    <p >项目{{index2 + 1}}： <span>{{itemL.salePackageName}}</span></p>
                  </div>
                </li>
                <!--这个可以开始引入关联订单内容的接口数据完  -->
              </ul>
              <!-- 关联订单内容完 -->
              <p>
                <span>子计划</span>
                <span class="span1 span2" @click="SubPlanBoxShows()">添加子计划</span>
              </p>
              <!-- 子计划 -->
              <table border="1" class="tables">
                <tbody >
                <tr class="cur">
                  <td>计划时间段</td>
                  <td>事件</td>
                  <td>地点</td>
                  <td>计划执行人</td>
                  <td>操作</td>
                </tr>
                <!-- 这个可以开始引入子计划的接口数据 -->
                <tr v-for="i in 2">
                  <td>8月3日 10:00~11:00</td>
                  <td>事件事件事件事件事件事件</td>
                  <td>基地</td>
                  <td>张晓霞</td>
                  <td>
                    <el-button type="primary" class="buttons" >编辑</el-button>
                    <el-button type="info"  class="buttons buttons1">关闭</el-button>
                  </td>
                </tr>
                <!-- 这个可以开始引入关联订单内容的接口数据完 -->
                </tbody>
              </table>
              <!-- 子计划完 -->
            </div>
          </div>
          <!-- 设立和关闭 -->
          <div class="SetUp">
            <div>
              <el-button type="primary">设立计划</el-button>
              <el-button type="info">关闭该计划</el-button>
            </div>
          </div>
        </div>
        <!-- 下右部分 -->
        <div class="eq">
          <!-- 右上：申请计划信息 -->
          <div class="information">
            <h3>申请计划信息</h3>
            <div>
              <ul>
                <!--  -->
                <li>来访类型：<span>{{planDetail.visitTypeValue}}</span></li>
                <li>申请来访时间：<span>{{planDetail.applyVisitBeginTime2}}</span></li>
                <li>来源: <span>{{planDetail.bizzPartnerName}}</span></li>
                <li>
                  <u> 业务对接人:</u>
                  <div >
                    <!-- 对接人数据-->
                    <p class="ps"  v-for="(itemb,index) in planDetail.planLinkmanList">
                      <span>对接人</span>
                      <span>{{itemb.name}}</span>
                      <span>{{itemb.mobilePhone}}</span>
                    </p>
                    <!--  -->
                  </div>
                </li>
                <li class="cur">
                  <u> 备注：</u>
                  <span class="spans">{{planDetail.remark}}</span>
                </li>
                <!--  -->
              </ul>
            </div>
          </div>
          <!-- 右下：沟通记录 -->
            <div class="recording">
                <h3>沟通记录</h3>
                <div class="user">
                  <ul>
                    <!-- 这个可以开始引入沟通记录内容的接口数据 -->
                    <li v-for="item in CommunicationRecordList">
                      <i><img :src="item.headImgUrl" ></i>
                      <div>
                        <div>
                          <span class="span3">{{item.employeeName}}</span>
                          <span>{{item.moduleName}}{{item.departmentName}}</span>
                          <u class="fr user_data">{{item.addTime}}</u>
                        </div>
                        <p> {{item.content}} </p>
                      </div>
                    </li>
                    <!-- 这个可以开始引入沟通记录内容的接口数据完 -->
                  </ul>
                </div>
                <div class="release">
                    <div>
                      <input type="text" v-model="release_input">
                      <span @click="RecordRelease(release_input,planDetail.memberId)">
                        发布</span>
                    </div>
                 </div>
            </div>
            <!--  -->
        </div>
      </div>
    </div>
    <!-- 已申请的空结束 -->
    <!--订单相关人弹出-->
    <div class="teamwork order" v-if="order_correlation_status">
      <div  class="teamwork-tc" style="background:rgba(0,0,0,0.5);">
      <div style="width: 750px;height: 70%;margin: 5vh auto;" class="teamwork-text">
        <p class="teamwork-text-title" style="background: #fff;border-bottom: 1px solid #dddddd;">
          <i fo-size='18'>选择订单</i>
          <!--<i class="fr"><svg-icon icon-class="x" /></i>-->
        </p>
        <div class="module-ri" style="line-height: 36px;margin:15px 30px 20px;overflow: hidden">
          <div class="fl">订单查询：</div>
          <div class="demo-input-suffix fl feel-input">
            <el-input v-model="teamw_correlation_name" placeholder="请输入成员名称"></el-input>
          </div>
          <el-button class="fl" type="primary" style="margin-left: 20px;" @click="correlation_click('scela')">搜索</el-button>
        </div>
        <!--客户列表-->
        <div class="correlation_det teamwork-curlist">
          <el-table :data="correlation_data" :border="true" style="width: 100%">
            <el-table-column :resizable="false" label="" min-width="60">
              <template slot-scope="scope">
                <el-checkbox style="margin-left: 7.5px;margin-top: 0px;" class="chekcli" v-model="scope.row.checked"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="orderSn" label="订单号" min-width="175"></el-table-column>
            <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="mobilePhone" label="订单项目" min-width="120"></el-table-column>
            <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="addTime" label="订单时间" min-width="157"></el-table-column>
          </el-table>
        </div>
        <!--确定-->
        <div style="text-align: right;padding-right: 30px;margin-top: 23.5px;">
          <el-button @click="order_correlation_ok" style="width: 100px;height: 38px;" type="primary">确定</el-button>
        </div>
      </div>
    </div>
    </div>

    <!-- 添加子计划 -->
    <div class="SubPlanBox" v-if="SubPlanBoxShow">
      <div class="SubPlanBox_eq ">
        <h3 class="DetailHeader" style=" margin-bottom: 15px;">
          {{PlanTitle}}
          <i class="el-icon-close fr i3" size=30 @click="SubPlanBoxHide()"></i>
        </h3>
        <div class="pl30">
          <ul class="uls clearfix">
            <li class="lis">
              <span>子计划事项 :</span>
              <textarea v-model="sonTextareas2" ></textarea>
            </li>
          </ul>
          <!--<div class="divs">
            <span class="fl">来访时间：</span>
            <div class="block">
              <el-date-picker
                v-model="sonStartTime"
                type="date"
                placeholder="选择开始时间"
                class="date"
              >
              </el-date-picker>
            </div>
          </div>-->
          <div class="divs">
            <span class="fl">来访时间：</span>
            <div class="block">
              <el-time-picker
                v-model="value222"
                :picker-options="{
      format:'HH:mm'
    }"
                placeholder="任意时间点">
              </el-time-picker>
              <el-time-picker
                v-model="value333"
                :picker-options="{
      format:'HH:mm'
    }"
                placeholder="任意时间点">
              </el-time-picker>
            </div>
          </div>
          <div class="divs clearfix">
            <span class="fl">来访地点：</span>
            <el-input v-model="sonAddress" placeholder="请输入内容" class="inputs"></el-input>
          </div>

          <div class="divs">
            <span class="fl">执行人: </span>
            <el-input :value="relatedNames" name="relatedNames" placeholder="请输入内容" class="inputs inputs2"></el-input>
            <u style="color: #3096f8;" @click="showRelated = true">选择</u>
          </div>

          <el-button type="primary" class="Button" @click="saveSonPlan">保存</el-button>
          <!--  -->
        </div>
      </div>
    </div>
    <!-- 添加子计划完-->
    <!--选择相关人-->
    <transition name="el-fade-in-linear">
      <div v-show="showRelated" class="teamwork teamwork2">
        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div class="teamwork-text">
            <p class="teamwork-text-title">
              <i fo-size='18'>员工列表</i>
              <i @click="showRelated = false" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p>
            <div class="teamwork-text-nr">
              <div class="fl" style="line-height: 36px;margin-bottom: 20px">
                <!--计划查询-->
                <div class="fl">员工查询：</div>
                <div class="demo-input-suffix fl feel-input">
                  <el-input v-model="relatedSearchWord" placeholder="请输入内容"></el-input>
                </div>
                <el-button @click="searchEmployees" class="fl" type="primary">搜索</el-button>
              </div>

              <el-table ref="relatedTable" :data="relatedList" @row-click="showRow" tooltip-effect="dark" border style="width: 100%;max-height:80%;overflow-y: scroll"
                        @select="handleSelectionChange" @select-all="handleSelectionChange">
                <el-table-column type="selection" :reserve-selection="true" width="50"></el-table-column>
                <el-table-column prop="name" label="员工名称" width="300">
                </el-table-column>
                <el-table-column prop="roleTypeName" label="职位" show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div style=" margin-top: 10px;">
                <el-pagination @current-change="relatedCurrentChange" :current-page.sync="relatedCurrentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                               :total="relatedTotal">
                </el-pagination>
              </div>
            </div>
            <div style="text-align: right;padding-right: 30px;">
              <el-button type="primary" @click="saveEmployees">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import api from '../../api/index'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'list',
    data() {
      return {
        value222:'',
        value333:'',

        keyword: '', /* 计划查询*/
        applyVisitBeginTime: '', /* 开始日期*/
        applyVisitEndTime: '', /* 结束日期*/
        tableData3: [], /* 接口返回来的数据[{}]*/
        currentPage4: 1, /* 分页定位到第几页*/
        total: 5, /* 总条数*/
        pageSize: 10, /* 一页多少条数据*/
        statusList: ['全部', '已申请', '已设立', '已完成', '已关闭'],
        status: null,
        planStatus: false, // 申请计划-弹框
        ck: { close() {} }, /* 弹窗监控*/
        options: [], // 客户来源
        multipleSelection:[],
        // 申请计划数据
        Dates: {
          name: '',
          type: 0,
          listType: 1,
          applyTime: '',
          bizzPartnerId: '',
          memberId: ''
        },
        form: {
          name: '',
          memberId: '',
          type: [],
          memberFollowEmployeeIds:'',
        },
        listType: [{ value: 1, label: '参观' }, { value: 2, label: '见诊' }, { value: 3, label: '医疗' }], // 来访类型
        showEmployee: false, // 选择客户弹框
        pageSize: api.pageSize /* 一页多少条数据*/,
        meployeeSearchWord: '', // 管理员搜索参数
        relatedSearchWord: '', // 相关人搜索参数
        memberList: [], // 选择客户列表
        memberListTotal: 1, // 选择客户列表total
        memberCurrentPage: 1, // 选择客户列表memberCurrentPage
        //客户列表
        menberRelatedList: [],
        menberRelatedTotal: 1,
        radio: '',
        radioName: '', // 选择客户名称
        memberLinkmens: [], // 选择的客户关联人,
        selType: [{ value: 1, label: '参观' }, { value: 2, label: '见诊' }, { value: 3, label: '医疗' }], // 多选来访类型
        selTypeValue: [], // 多选来访类型arr
        fetPage: 1,// 列表分页

        PersonalPlanShow :false,
        textareas:"",
        value1: '',
        planDetail:'',//计划详情返回的data
        memberDetail:'',//客户详情返回的data

        teamw_correlation_name:'',/*订单相关人搜索*/
        correlation_list:[],/*选择的订单相关人*/
        correlation_data:[],/*选择订单相关人列表*/
        order_correlation_status:false,/*选择订单相关人弹出*/
        pageCrr:1,/*相关人*/
        scrollHeight:0,
        pageSi:0,/*客户总数*/
        pageSiCom:0,/*商品总数*/
        pageSiCrr:0,/*相关人总数*/
        selectWrap:'',

        // 复制
        PersonalPlanShow :false,
        // 子计划是否显示
        SubPlanBoxShow :false,
        // 计划内容的textarea
        textareas:"",
        // 计划内容的来访时间
        value2: '',
        // 子计划的textarea
        sonTextareas2:"",
        // 子计划的来访时间
        sonStartTime: '',
        sonEndtTime: '',
        // 子计划的来访地点
        sonAddress: '',
        // 子计划的执行人
        sonPerson: '',
        PlanTitle:"添加子计划",
         // 沟通记录列表
       CommunicationRecordList:[],
        // 沟通传的id
       CommunicationRecordId:0,
        // 沟通的页数长度
       pageSicommunication:0,
        // 沟通的页数       
       NumberOfPages:1,
        //  沟通发布文字
       release_input:"",
       
        showRelated: false, //相关人员弹窗状态
        relatedList: [],//相关人员
        relatedTotal: 1,//相关人员
        relatedCurrentPage: 1,//相关人员
        relatedSelectData: [], //记忆数组
        tagList: [],//相关人员
        memberFollowEmployeeIds: "",//相关人
        // relatedNames:'',
        memberMultipleSelection:[],//相关人员
        sonPlanList:[],//子计划列表
      }
    },
    components: {

    },
    computed: {
      relatedNames() {
        const arr = [];

        for (let v of this.memberMultipleSelection) {
          arr.push(v.name)
        }
        return arr.join('、')
      }
    },
    watch:{
      /*radio(e){
        this.curdet=[{name:this.curData[e].name,bm:this.curData[e].bizzPartnerName,Id:this.curData[e].memberId}];
      }*/
    },
    methods: {
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#zhangjiawei'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      /*保存子计划*/
      saveSonPlan(){

      },

      async getMemberList(data) {
        /* 获取客户列表 */
        const jquery = {
          pageNo: data.page,
          pageSize: this.pageSize,
          keyWord: data.keyWord || ''
          /*  searchWord: this.searchWord, */
        }
        const {
          data: {
            list,
            totalSize
          }
        } = await api.memberGetList(jquery);

        if (data.init) {
          this.memberList = list;
          this.memberListTotal = totalSize;
          this.menberRelatedList = list;
          this.menberRelatedTotal = totalSize;
        } else if (data.plural) {
          this.menberRelatedList = list;
          this.menberRelatedTotal = totalSize;
        } else {
          this.memberList = list;
          this.memberListTotal = totalSize;
        }
      },
      async getMeployeeList(data) {
        /* 获取员工列表 */
        const query = {
          pageNo: data.page || 1,
          pageSize: this.pageSize,
          keyWord: data.keyWord || ''
          /*  searchWord: this.searchWord, */
        }
        const {
          data: {
            list,
            totalSize
          }
        } = await api.getMeployeeList(query);

        this.relatedList = list;
        this.relatedTotal = totalSize;

          let arr = [];
          if (this.relatedSelectData[this.relatedCurrentPage]) {
            this.relatedSelectData[this.relatedCurrentPage].forEach((item, index) => {
              arr.push(this.relatedList[item])
            })

          setTimeout(() => {
            this.toggleSelection(arr);
          }, 0);
        } else {
          this.relatedList = list;
          this.relatedTotal = totalSize;
        }

      },
      async getBizzpartnerList() {
        /* 合作商列表 */
        const {
          data
        } = await api.getBizzpartnerList();
        this.bizzPartnerList = data;
      },
      // 确定申请接口
      async add() {
        this.loading = true;
        const jquery = {
          bizzPartnerId: this.Dates.bizzPartnerId, // 合作商ID
          memberId: this.form.memberId, // 用户ID
          visitType: this.selTypeValue, // 来访类型
          remark: this.Dates.remark, // 备注
          applyVisitBeginTimeString: this.Dates.applyTime, // 申请时间
          linkmanList: this.Dates.linkmanList || ''// 客户带过来的关联人
        }
        const json = await api.planAdd(jquery)
        if (json.imei_error_code == 0) {
          this.planStatus = false;
          this.loading = false
          this.fet({ page: this.fetPage })
        }
      },
      // 设立计划
      setPlan() {
        console.log()
      },
      // 选择分页
      handleCurrentChange(val) {
        this.fetPage = val;// 保存当前分页
        this.fet({
          page: val
        });
      },
      /*handleSelectionChange(val) {
        this.multipleSelection = val;
      },*/
      handleSelectionChange(val, row) {
        this.relatedSelectData[this.relatedCurrentPage] = [];
        let arr = [];

        for (let v of val) {
          arr.push(v.employeeId);
          this.relatedSelectData[this.relatedCurrentPage].push(this.relatedList.indexOf(v));
        }

        this.memberFollowEmployeeIds = arr.join(',');
        this.memberMultipleSelection = val;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.relatedTable.toggleRowSelection(row, true);
          });
        }
        /*  else {
                  this.$refs.relatedTable.clearSelection();
                } */
      },
      /* 客户分页 */
      employeeCurrentChange(val) {
        this.getMemberList({
          page: val,
          keyWord: this.meployeeSearchWord
        });
      },
      /*员工分页*/
      relatedCurrentChange(val) {
        this.relatedCurrentPage = val;
        this.getMeployeeList({
          page: val,
          keyWord: this.relatedSearchWord,
          plural: true
        });
      },
      /*点击选择客户按钮*/
      showRow(row) { // 赋值给radio
        this.radioName = row.name;
        this.radio = row.memberId;
        this.memberLinkmens = row.memberLinkmens;
      },
      tabAffair(e) {
        this.memberTypeId = e;
        this.search();
      },
      /*搜索客户*/
      /*searchEmployee() {
        this.getMemberList({
          plural: false
        });
      },*/
      searchEmployee() {
        this.getMemberList({
          plural: false,
          keyWord: this.meployeeSearchWord
        });
      },
      searchEmployees() {
        this.relatedCurrentPage = 1;
        this.getMeployeeList({
          plural: true,
          keyWord: this.relatedSearchWord
        });
      },
      saveEmployee() {
        /* 管理员保存 */
        this.showEmployee = false;
        if (this.radio) {
          this.form.name = this.radioName;
          this.form.memberId = this.radio;
          this.Dates.linkmanList = this.memberLinkmens;
        }
      },
      saveEmployees() {
        /* 相关人保存 */
        this.showRelated = false;
        this.form.memberFollowEmployeeIds = this.memberFollowEmployeeIds;//子计划执行人
        console.log(this.form.memberFollowEmployeeIds)
      },

      //选择客户来源
      handleChange(e) {
        this.Dates.type = e[0];
      },
      // 选择来访类型
      handleChange2(e) {
        console.log(e[0])
        this.Dates.listType = e[0];
      },
      businessman() {
        /* 申请计划*/
        var obj = { linkmanList: [], type: 0 };
        this.Dates = obj;
        this.planStatus = true;
      },
      colsee(e) {
        /* 关闭弹框，保存关闭e：ok*/
        if (e == 'ok') {
          this.add();
        }
        this.planStatus = false;
      },
      deletes(e) {
        /* 删除对接人*/
        const linkval = this.Dates.linkmanList;
        linkval.splice(e, 1);
      },
      newList() {
        /* 新建对接人*/
        let linkval = this.Dates.linkmanList;
        linkval.forEach(function(c) {
          // if (c.name == '' || c.mobilePhone.length != 11) {
          if (c.name == '') {
            this.ck.close();
            this.ck = this.$message({ message: '请把上面数据填完整哦！', type: 'error' });
            linkval = false;
            return;
          }
        }.bind(this))
        if (linkval) {
          this.Dates.linkmanList.push({ mobilePhone: '', name: '' });
        }
      },
      // 合作商列表
      async getBizzpartnerList(e) {
        /* 接口对接async await*/
        const jquery = {
        }
        const json = await api.getBizzpartnerList(jquery)
        this.options = json.data
        // console.log(this.options)
      },

      async fet(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          keyword: this.keyword,
          applyVisitBeginTime: this.applyVisitBeginTime,
          applyVisitEndTime: this.applyVisitEndTime,
          status: this.status === 0 ? null : this.status
        }
        const josn = await api.planPageList(jquery)
        this.tableData3 = josn.data.list
        this.total = josn.data.totalSize
      },
      search(e) {
        this.fet(e)
      },
      changeStatus(index) {
        this.status = this.status === index ? null : index
        this.fet({ page: this.currentPage4 })
      },
      // 计划详情
      PersonalPlanHide(){
        this.PersonalPlanShow = false;
      },
      PersonalPlanShows(e1,e2){
        this.PersonalPlanShow = true;
        this.getPlanDetail(e1);//计划详情
        this.getMemberDetail(e2);//客户详情

// 网页进来触发
        this.CommunicationRecordList = [];
        this.CommunicationRecord(e2);//沟通记录

      },
      //计划详情接口
      async getPlanDetail(e) {
        /* 接口对接async await*/
        const jquery = {
          planId : e
        }
        const json = await api.planDetail(jquery)
        this.planDetail = json.data;
        console.log(this.planDetail,'plan')
      },
      //客户详情接口
      async getMemberDetail(e) {
        /* 接口对接async await*/
        const jquery = {
          memberId : e
        }
        const json = await api.memberDetail(jquery)
        this.memberDetail = json.data;
        console.log(this.memberDetail,'memberDetail')
      },
      //关联订单
      /*connectOrder(mId){
        console.log(mId)
      },*/
      save(){
        /*确定提交*/
      },
      correlation_forE(){
        /*查找选中数据*/
        if(this.correlation_list.length>0){
          this.correlation_data.forEach(function (l) {
            /*correlation_list*/
            this.correlation_list.forEach(function (h,ind) {
              if(l.checked){
                if(l.orderSn==h.orderSn){
                  h.checked=true;
                }else if(l.orderSn!=h.orderSn && this.correlation_list.length==ind+1){
                  this.correlation_list.push(l);
                }
              }else{
                if(l.orderSn==h.orderSn){
                  this.correlation_list.splice(ind,1);
                }
              }
            }.bind(this))
          }.bind(this));
        }else{
          this.correlation_data.forEach(function (l) {
            if(l.checked){
              this.correlation_list.push(l);
            }
          }.bind(this));
        }
        console.log(this.correlation_list,'correlation_list')
      },
      order_correlation_ok(){
        /*相关人ok*/
        this.correlation_forE();
        this.order_correlation_status=false;
        this.correlation_data=[];
        if(this.pageSiCrr>api.pageSize){
          this.selectWrap.removeEventListener('scroll', this.scrfun, false);
        }
        this.scrollHeight=0;
        this.pageCrr=1;
      },
      async correlation_click(e){
        if(e=='scela'){
          this.correlation_forE();
          this.correlation_data=[];
          this.pageCrr=1;
          this.scrollHeight=0;
          if(this.pageSiCrr>api.pageSize){
            this.selectWrap.removeEventListener('scroll', this.scrfun, false);
          }
        }
        this.order_correlation_status=true;
        const jquery = {
          keyWord:this.teamw_correlation_name,
          pageNo:this.pageCrr,
          // memberId:this.planDetail.memberId
        }

        const josn = await api.orderList(jquery);
        if(this.correlation_list.length>0){
          this.correlation_list.forEach(function (l) {
            josn.data.list.forEach(function (h) {
              if(l.orderSn==h.orderSn){
                h.checked=true;
              }
            })
          })
        }

        this.correlation_data=this.correlation_data.concat(josn.data.list);
        this.pageSiCrr=josn.data.totalSize;
        this.setIscrooll();
      },
      scrfun(e){
        /*scroll事件动作*/
        const scrollDistance = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        const leg=this.order_cur_status?(this.curData.length!=this.pageSi):
          (this.order_commodity_status?(this.commodity_data.length!=this.pageSiCom):
            (this.order_correlation_status?(this.correlation_data.length!=this.pageSiCrr):
            !this.order_correlation_status?(this.CommunicationRecordList.length!=this.pageSicommunication):0));

            // (this.order_correlation_status?(this.CommunicationRecordList.length!=this.pageSiCrr):0));

        if (scrollDistance == 0 && leg){
            
          if(this.order_cur_status){
            this.page++;
            this.memberGetList();
          }else if(this.order_commodity_status){
            this.pageCom++;
            this.commodity_click();
          }else if(this.order_correlation_status){
            this.pageCrr++;
            this.correlation_click();
          }else if(!this.order_correlation_status){
            this.NumberOfPages++;
            this.CommunicationRecord(this.CommunicationRecordId);
          }
          this.selectWrap.removeEventListener('scroll', this.scrfun, false);
        }
      },
      scrolles(){
        /*绑定scroll事件*/
        var This=this;
        this.selectWrap.addEventListener('scroll', this.scrfun, false);
      },
      setIscrooll( o ){
        /*查询scroll状态是否正常运行*/
        if(this.order_cur_status){
          if(this.pageSi<=api.pageSize)return;
        }else if(this.order_commodity_status){
          if(this.pageSiCom<=api.pageSize){return;}
        }else if(this.order_correlation_status){
          if(this.pageSiCrr<=api.pageSize){return;}
        }else if(!this.order_correlation_status){

          if(this.pageSicommunication<=api.pageSize){return;}

        }

        if( o == true ){
            this.selectWrap = document.querySelector('.user');   
        }else{
            this.selectWrap = document.querySelector('.teamwork-curlist');                        
        }

        var terval=setInterval(function () {
          this.selectWrap.scrollTop=this.scrollHeight-this.selectWrap.clientHeight;
          this.scrollHeight=this.selectWrap.scrollHeight;
          if(this.scrollHeight==this.selectWrap.scrollHeight){
            this.scrolles();
            clearInterval(terval);
          }
        }.bind(this),100)
      },


      SubPlanBoxHide(){
        this.SubPlanBoxShow = false;
      },
      // 点击添加子计划触发
      SubPlanBoxShows(){
        this.PlanTitle = "添加子计划"
        this.SubPlanBoxShow = true;
      },
      // 点击编辑子计划触发
      SubPlanBoxShow2(){
        this.PlanTitle = "编辑子计划"
        this.SubPlanBoxShow = true;
      },


// 获取沟通记录列表
async CommunicationRecord(id) {
    console.log(60)
        this.CommunicationRecordId = id
        /* 沟通记录 */
        const jquery = {
            memberId : id,
            pageNo:this.NumberOfPages,
        } 
        var  Dates = await api.CommunicationDetails(jquery);
         this.CommunicationRecordList = this.CommunicationRecordList.concat(Dates.data.list);
         this.pageSicommunication=Dates.data.totalSize;
        this.setIscrooll(true)
    },
// 
// 获取沟通记录的发布
async RecordRelease(text,id){
    const jquery = {
        memberId : id,
        content:text
    } 
    await api.CommunicationRelease5(jquery);
    this.CommunicationRecord(id);
    this.release_input="";
}
// 
    },


    created: function(){
      this.fet({ page: 1 })
      this.getBizzpartnerList();// 合作商列表
      this.getMemberList({
        page: 1,
        init: true
      });// 客户列表
      this.getMeployeeList({
        page: 1,
        init: true
      });// 相关人（员工、执行人）列表
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
  // 开始
  .box{
    width: 100%;
    height: 100%;
    background-color:#f0f0f2;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 3;
  }
  // 个人计划
  .PersonalPlan{
    width: 91%;
    height: 100%;
    background-color: #f0f0f2;
    position: fixed;
    top: 0px;
    left: 180px;
    z-index: 3;
    box-sizing: border-box;
    padding-left: 15px;
    cursor:default;
    overflow-y: scroll;
  }
  //
  // 详情头部
  .PlanDetails>.DetailHeader{
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-bottom: solid 1px #dddddd;
    padding-left: 18px;
    box-sizing: border-box;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    margin: 0;

  }
  //
  // 用户基本信息
  .PlanDetails>.UserInfo{
    width: 100%;
    height: 115px;
    padding-bottom: 20px;
    padding-top: 15px;
    box-sizing: border-box;
    border-bottom: solid 1px #dddddd;
    padding-left: 33px;
    box-sizing: border-box;
  }
  .PlanDetails>.UserInfo h3{
    margin: 0;
    font-family: SourceHanSansCN-Medium;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  .PlanDetails>.UserInfo h3 span{
    margin-left: 3px;
    color: #deb48c;
  }
  .PlanDetails>.UserInfo h3 i{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 5px;
    overflow: hidden;
  }
  .imgs1{
    background: url('../../images/xing1.png') no-repeat;
  }
  .imgs2{
    background: url('../../images/xing2.png') no-repeat;
  }
  .PlanDetails>.UserInfo p{
    //  line-height: 0;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  //
  // 计划内容
  .PlanDetails>.PlanContent{
    width: 100%;
    height: 635px;
    overflow-y: scroll;
  }
  .PlanDetails>.PlanContent h5{
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    margin: 0;
    height: 62px;
    line-height: 62px;
    box-sizing: border-box;
    padding-left: 15px;
    position: relative;
    left: -28px;
  }
  .PlanDetails>.PlanContent .uls{
    width: 100%;
  }
  .PlanDetails>.PlanContent .uls li{
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    margin-bottom: 15px;
    &:hover{
      color: #333;
    }
  }
  .PlanDetails>.PlanContent .uls li span{
    float: left;
    height: 100px;
    margin-right: 22px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
  }
  .PlanDetails>.PlanContent .uls li textarea{
    float: left;
    width: 62%;
    height: 94px;
    resize:none;
    outline: none;
  }
  .date{
    width: 15%;
    height: 34px;
    position: relative;
    left: 8px;
    top: -5px;
  }
  .PlanDetails>.PlanContent>div{
    padding-left: 33px;
    margin-bottom: 25px;
  }
  .PlanDetails>.PlanContent>p{
    padding-left: 33px;
  }
  .PlanDetails>.PlanContent>p span{
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
  }
  .PlanDetails>.PlanContent p span.span1{
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3096f8;
    position: relative;
    left: 20px;
  }
  .PlanDetails>.PlanContent p span.span2{
    left: 35px;
  }

  // 关联订单内容
  .OrderContent{
    width: 51%;
    // min-height: 28px;
    overflow: hidden;
    background-color: #f8f8f8;
    margin-bottom: 20px;
    padding: 0px 15px 0px 15px;
    box-sizing: border-box;
    margin-left: 15px;
  }
  .OrderContent p , .OrderContent h4,.OrderContent ul{
    margin: 0;
    padding: 0;
    list-style:none;
  }
  .OrderContent p{
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #333333;
    margin-bottom: 10px;
  }
  .OrderContent li{
    width: 100%;
    overflow: hidden;
    border-bottom: 3px solid #eee;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .OrderContent li>div{overflow: hidden;margin-bottom: 15px;padding-top: 15px;}
  // 关联订单内容完
  // 子计划
  table.tables{
    border-collapse:collapse;
    width: 97%;
  }
  table.tables tr{
    height: 48px;
  }
  table.tables tr td{
    padding-left: 15px;
    min-width: 150px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
  }
  table.tables tr.cur{
    text-align: center;
    background-color: #f2f2f2;
  }
  table.tables tr td .buttons{
    width: 38%;
  }
  table.tables tr td .buttons1{
    margin-left: 15px;
  }
  // 子计划完
  // 设立和关闭
  .PlanDetails>.SetUp{
    width: 100%;
    height: 66px;
    box-shadow: 0px -1px 8px 0px
    rgba(102, 102, 102, 0.32);
    position: relative;
  }
  .PlanDetails>.SetUp>div{
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }










  //
  //上部分
  .is{
    width: 100%;
    height: 45px;
    text-align: right;
    padding-right: 15px;
    line-height: 45px;
    font-size: 30px;
  }
  //下左部分：计划详情
  .PlanDetails{
    width: 64%;
    min-height: 855px;
    background-color: #fff;
    float: left;
  }

  .eq{
    width: 30%;
    float: left;
    min-height: 340px;
    margin-left: 15px;

  }
  //右上：申请计划信息
  .information{
    width: 100%;
    height: 317px;
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .information>h3{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f0f0f2;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
    line-height: 50px;
    padding-left:30px;
    margin: 0;
  }
  .information>div{
    width: 100%;
    height: 267px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .information ul:nth-child(1){
    min-height: 250px;
    margin-bottom: 30px;
  }
  .information ul li{
    float: none;
    overflow: hidden;
    font-size: 16px;
    margin-top: 15px;
    padding-left: 30px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;

    &:hover{
      color: #666666;
    }
  }
  .information ul li.cur{
    position: relative;
    top: -20px;
  }
  .information ul li>div{
    width: 80%;
    float: right;
    line-height: 10px;
    position: relative;
    top: -12px;
  }
  u{
    text-decoration: none;
    text-align: right;
    display:inline-block;
    height: 100%;
  }
  .spans{
    width: 88%;
    float: right;
    display: inline-block;
  }
  .information p{
    display: block;
  }
  .ps{
    margin-bottom: 12px
  }
  .ps span{
    text-align: center;
    display: inline-block;
  }

  //右下：沟通记录
  .recording{
    width: 100%;
    height: 530px;
    background-color: #ffffff;
  }
  .recording>h3{
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #f0f0f2;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
    line-height: 50px;
    padding-left:30px;
    margin: 0;
  }
  .recording .user{
    width: 100%;
    height: 418px;
    background-color: #fff;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .recording ul li{
    width: 100%;
    margin-top: 15px;
    border-bottom: 1px solid #666;
    overflow: hidden;
    &:hover{
      color: #666666;
    }
  }
  .recording ul li>i{
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    float: left;
    overflow: hidden;
    margin-right: 18px;
  }
  .recording ul li>i>img{
    width: 100%;
    height: 100%;
  }
  .recording ul li>div{
    width: 85%;
    float: left;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666;
  }
    .span3{
    display: inline-block;
    margin-right: 10px;
    position: relative;
  }
  .span3::after {
    content:"";
    position: absolute;
    top: 0px;
    right: -10px;
    width: 2px;
    height: 17px;
    background-color: #dddddd;
  }

  .user_data{
    font-family: PingFang-SC-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }

  // 发布
  .release{
    width: 100%;
    height: 65px;
    background-color: #ffffff;
    box-shadow: 0px -1px 8px 0px
    rgba(102, 102, 102, 0.32);
    padding: 15px 12px 16px 30px;
    box-sizing: border-box;
    position: relative;
  }
  .release>div{
    position: relative;
    width: 99%;
    height: 36px;
    border: 1px solid #ddd;
  }
  .release>div input{
    // width: 480px;
    height: 34px;
    width: 88%;
    border: solid 1px #dddddd;
    outline: none;
    border: none;
  }
  .release>div>span{
    width: 50px;
    height: 34px;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    right:0px;
    text-align: center;
    line-height: 34px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3096f8;
    border-left:  solid 1px #dddddd;
  }
  //

  // 复制一直到结束

  .pl30{ padding-left: 30px;}
  .SubPlanBox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left:0;
    background-color: rgba(102, 102, 102, 0.42);
    z-index: 9;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
  }
  .SubPlanBox_eq{
    width: 590px;
    height: 473px;
    background-color: #ffffff;
    border: solid 3px #666666;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    position: relative;
    cursor:default;
  }
  .SubPlanBox_eq .i3{
    position: relative;
    top: 50%;
    right: 20px;
    transform: translateY(-50%)
  }
  .SubPlanBox_eq textarea{
    width: 429px;
    height: 99px;
    border: solid 1px #dddddd;
    box-sizing: border-box;
    padding: 10px 6px 20px 10px;
  }
  .SubPlanBox_eq>h3{
    padding-left: 30px;
  }
  .uls .lis{
    position: relative;
    left:-16px;
  }
  .uls .lis span:nth-child(1){
    position: relative;
    top: -75px;
  }
  .SubPlanBox_eq .date{
    width: 209px;
    height: 34px;
  }
  .SubPlanBox_eq .inputs{
    width: 236px;
    height: 34px;
    margin-left: 7px;
  }
  .SubPlanBox_eq .inputs2{
    width: 264px;
    margin-left: 36px;
    margin-right: 15px;
  }
  .SubPlanBox_eq .divs{
    margin-top: 15px;
  }
  .SubPlanBox_eq .Button{
    position: absolute;
    right: 46px;
    bottom: 30px;
  }
  //
  .ps span{
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }
  .information ul li.cur{
    position: relative;
    top: -1px;
  }
  //


  .order .el-table td:nth-child(3) div,.order .el-table td:nth-child(4) div{
    color: #e03a3a !important;
  }
  .order .teamwork-tc .el-table td:nth-child(3) div, .order .teamwork-tc .el-table td:nth-child(4) div{
    color: #606266 !important;
  }
  .teamwork-curlist{
    padding:0 30px;
    height:74%;
    height: calc(100% - 220px);
    height: -webkit-calc(100% - 220px);
    overflow: auto;
  }
  .commodity-det{
    padding:0 30px;
    height:74%;
    height: calc(100% - 165px);
    height: -webkit-calc(100% - 165px);
    overflow: auto;
  }
  .correlation-det{
    padding:0 30px;
    height:74%;
    height: calc(100% - 220px);
    height: -webkit-calc(100% - 220px);
    overflow: auto;
  }
  .teamwork.order .teamwork-tc .teamwork-text .teamwork-text-nr{
    padding: 16px 0;
    height: 60%;
    height: calc(100% - 246px);
    height: -webkit-calc(100% - 246px);
    overflow-y: auto;
  }
  .component{
    margin:15px;
    padding:15px;
    background: #fff;
  }
  .feel-input{
    width:248px;
    margin-left: 10px;
  }
  .time-input{
    width:140px;
  }

  .hide li{
    float: left;
    padding:0 10px;
    cursor: pointer;
    color: #666;
  }
  .hide li.xs,.hide li:hover{
    color: #3096f8;
  }
  .statusActive{
    color: #3096f8;
  }
  .order-ul li{
    margin-top: 4px;
  }
  .order-ul li:first-child{
    margin-top: 0px;
  }
  .bk{
    margin-top: 10px;
  }
  .bk:first-child{
    margin-top: 0px;
  }
  .xgr .el-table__header-wrapper{
    padding-bottom: 5px;
  }
  .xgr .el-table--enable-row-transition .el-table__body td,.xgr .el-table td,.xgr .el-table th.is-leaf{
    padding: 0px !important;
    border-bottom: none !important;
  }
  .xgr .el-table--enable-row-transition .el-table__body td{
    padding: 5px 0 !important;
  }
  .xgr .el-table--enable-row-transition .el-table__body td > div{
    height:32px;
    line-height:32px;
  }
  .xgr .el-table::before{
    background: 0;
  }
  .teamwork-order-li{
    background: #f8f8f8;
    margin-top: 10px;
  }
  .teamwork-order-li:nth-child(2){
    margin-top: 0px;
  }


</style>
