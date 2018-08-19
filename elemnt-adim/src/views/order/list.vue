<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl module-ri" style="line-height: 36px;">
        <div class="fl">订单查询：</div>
        <div style="width: 280px;" class="demo-input-suffix fl feel-input">
          <el-input v-model="searchPc" placeholder="请输入客户名/订单相关人/身份证号码"></el-input>
        </div>
      </div>
      <div class="fl module-ri">
        <!--时间查询-->
        <div class="fl">下单时间：</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="addTimeBegin" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="fl" style="margin:0 15px;">到</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="addTimeEnd" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
      <div class="fl module-ri">
        <!--时间查询-->
        <div class="fl">审核时间：</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="auditTimeBegin" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="fl" style="margin:0 15px;">到</div>
        <div class="demo-input-suffix fl time-input">
          <el-date-picker v-model="auditTimeEnd" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <el-button class="fl" type="primary" style="margin-left: 20px;" @click="search">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 0 0 8px;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">审核状态：</div>
        <div class="fl">
          <ul fo-size="16">
            <li v-for="(item, index) in auditStatusList" @click="changeAuditStatus(item.value)" :class="{'statusActive':item.value===auditStatus}">{{item.tag}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide" style="margin: 0 0 8px;">
      <!--类型快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">订单类型：</div>
        <div class="fl">
          <ul fo-size="16">
            <li v-for="(item, index) in payStatusList" @click="changePayStatus(item.value)" :class="{'statusActive':item.value===payStatus}">{{item.tag}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--需求操作-->
      <el-button v-if="roleType!=6" @click="teaword_tc=true" class="fl" type="primary">开单</el-button>
      <el-button class="fl" type="primary">excel导出</el-button>
    </div>

    <!--表格-->
    <div class="ellipsis order" style="margin-top: 30px;">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="memberName" label="客户名称" min-width="150"></el-table-column>
        <el-table-column prop="salePackageNames" label="购买产品" min-width="150"></el-table-column>
        <el-table-column prop="totalAmount" label="成交价" min-width="150"></el-table-column>
        <el-table-column prop="auditedTotalAmount" label="已审金额" min-width="150"></el-table-column>
        <el-table-column prop="needAuditTotalAmount" label="待审金额" min-width="150"></el-table-column>
        <el-table-column prop="unpaidTotalAmount" label="欠款" min-width="150"></el-table-column>
        <el-table-column prop="payStatusName" label="订单类型" min-width="150"></el-table-column>
        <el-table-column prop="auditStatusName" label="审核状态" min-width="150"></el-table-column>
        <el-table-column prop="portionItemsShort" label="订单相关人" min-width="150"></el-table-column>
        <el-table-column prop="action" label="操作" width="170">
          <template slot-scope="scope">
            <el-button @click="audit(scope.row.orderSn,scope.row.auditStatus)" :disabled="roleType==3 || scope.row.auditStatus==2" :tab-bg='(((roleType==6 || roleType==2) && scope.row.auditStatus!=2)? "":"gray")' style="background: #e88d2c;border-color:#e88d2c;" class="fl" tab-btn type="primary">审核</el-button>
            <el-button @click="lookOrder(scope.row.orderSn)" class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
          </template>
        </el-table-column>
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

    <!--新建订单-->
    <div v-if="teaword_tc" class="teamwork order">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div style="width: 590px;height: 84%;margin: 5vh auto;" class="teamwork-text">
          <p class="teamwork-text-title" style="background: #f2f2f4;border-bottom: 1px solid #dddddd;">
            <i fo-size='18'>新建订单</i>
            <i @click="teaword_gb" class="fr"><svg-icon icon-class="x" /></i>
          </p>
          <!--基本信息-->
          <div style="height: 130px;padding: 0 30px;overflow: hidden;">
            <p fo-size='16'>基本信息</p>
            <div style="line-height: 32px;overflow: hidden;margin-left: 10px;">
              <span fo-size='16' class="fl">客户名称：</span>
              <span @click="memberGetList" style="margin-left: 5px;cursor:pointer;" class="fl">{{curdet[0].name || '请选择'}}</span>
            </div>
            <div style="line-height: 32px;overflow: hidden;margin-left: 10px;margin-top: 8px;">
              <span fo-size='16' class="fl">客户来源：</span>
              <span style="margin-left: 5px;" class="fl">{{curdet[0].bm || '------'}}</span>
            </div>
          </div>
          <!--新建商品内容-->
          <div class="teamwork-text-nr" style="background: #f2f2f4;">
            <div style="width: 100%;height: 100%;overflow-y: auto;">
              <div style="background: #fff;">
                <div style="height: 54px;line-height: 54px;overflow: hidden;border-bottom: 1px solid #eee;padding: 0 30px;">
                  <span class="fl">商品信息</span>
                  <span @click="commodity_click" t-size='16' class="fr" style="position: relative;padding-right: 18px;">选择商品<img style="position:absolute;right: 0px;top:20px;" src="@/images/xy.png"></span>
                </div>
                <div class="teamwork-order-li" v-for="item in commodity_list">
                  <div style="padding: 0 40px;">
                    <p style="margin:0px;height: 40px;line-height: 40px;border-bottom:1px solid #eee">{{item.name}}</p>
                    <div v-if="item.list.length!=0" style="padding:10px;font-size: 14px;color: #666;overflow: hidden;">
                      <div class="fl">包含项目：</div>
                      <div class="fl">
                        <ul class="order-ul">
                          <li v-for="test in item.list">{{test.projectName}}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div fo-size='16' style="border-top: 1px solid #f2f2f4;height: 34px;line-height: 34px;text-align: right;padding: 0 30px;">单价：￥{{item.price}}</div>
                </div>
              </div>
              <div style="margin-top: 16px;background: #fff;">
                <div style="height: 54px;line-height: 54px;overflow: hidden;padding: 0 30px;">
                  <span class="fl">订单信息</span>
                </div>
                <!--订单价格-->
                <div>
                  <div style="line-height: 32px;overflow: hidden;padding: 0 40px;">
                    <span fo-size='16' class="fl">订单成交价：</span>
                    <el-input v-model="deal.make" fo-size='14' size="small" class="fl" style="width: 100px;height: 32px;" name="name" type="text" autoComplete="off" placeholder="请输入金额" />
                  </div>
                  <div style="line-height: 32px;overflow: hidden;padding: 0 40px;margin-top: 10px;">
                    <span fo-size='16' class="fl">订单实付款：</span>
                    <el-input v-model="deal.prepay" fo-size='14' size="small" class="fl" style="width: 100px;height: 32px;" name="name" type="text" autoComplete="off" placeholder="请输入金额" />
                  </div>
                </div>
                <!--订单支付方式-->
                <div style="height: 54px;line-height: 54px;overflow: hidden;padding: 0 30px;">
                  <span class="fl">订单支付方式</span>
                </div>
                <div style="padding: 0 40px;">
                  <div v-for="(item , ind) in paymode" class="bk" style="height: 32px;">
                    <el-checkbox class="chekckout" style="margin-top: 7px;" v-model="item.checked">
                      <img v-if="ind==0" style="margin-top: 1.5px;margin-right: 7px;" class="fl" src="../../images/wx.png">
                      <img v-if="ind==1" style="margin-top: 1.5px;margin-right: 7px;" class="fl" src="../../images/zfb.png">
                      <img v-if="ind==2" style="margin-top: 1.5px;margin-right: 7px;" class="fl" src="../../images/xj.png">
                      <img v-if="ind==3" style="margin-top: 1.5px;margin-right: 7px;" class="fl" src="../../images/pos.png">
                      <span>{{item.name}}</span>
                    </el-checkbox>
                    <el-input v-if="item.checked" v-model="item.moy" fo-size='14' size="small" style="width: 100px;height: 32px;margin-left: 5px;" name="name" type="text" autoComplete="off" placeholder="请输入金额" />
                  </div>
                </div>
                <!--备注-->
                <div style="overflow: hidden;padding: 0 30px;margin-top: 30px;">
                  <span class="fl" style="margin-right: 15px;margin-top: 10px;">备注</span>
                  <el-input maxlength="150" :autosize="{minRows:4}" resize="none" style="width: 465px;" class="fl" type="textarea" placeholder="请输入内容" v-model="textarea"></el-input>
                </div>
                <!--订单相关人-->
                <div style="height: 54px;line-height: 54px;overflow: hidden;padding: 0 30px;">
                  <span class="fl">订单相关人</span>
                  <span @click="correlation_click" t-size='16' class="fr" style="position: relative;padding-right: 18px;">分配业绩<img style="position:absolute;right: 0px;top:20px;" src="@/images/xy.png"></span>
                </div>
                <div class="xgr" style="padding: 0 40px 20px;">
                  <el-table :data="correlation_list" style="width: 100%">
                    <el-table-column prop="name" label="员工名称" width="180"></el-table-column>
                    <el-table-column prop="roleTypeName" label="职位" width="180"></el-table-column>
                    <el-table-column label="订单占比">
                      <template slot-scope="scope">
                        <el-input maxlength="5" v-model="scope.row.value" fo-size='14' size="small" class="fl" style="width: 80px;" name="name" type="text" autoComplete="off" placeholder="占比" />
                        <span fo-size='14' class="fl" style="height: 32px;line-height: 32px;margin-left: 8px;">%</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <!--确定-->
          <div style="text-align: right;padding-right: 30px;margin-top: 9.5px;">
            <el-button @click="save" style="width: 100px;height: 38px;" type="primary">确定</el-button>
          </div>
        </div>
      </div>
      <!--客户列表弹出-->
      <div v-if="order_cur_status" class="teamwork-tc" style="background:rgba(0,0,0,0.5);">
        <div style="width: 750px;height: 70%;margin: 5vh auto;" class="teamwork-text">
          <p class="teamwork-text-title" style="background: #fff;border-bottom: 1px solid #dddddd;">
            <i fo-size='18'>客户列表</i>
            <!--<i class="fr"><svg-icon icon-class="x" /></i>-->
          </p>
          <div class="module-ri" style="line-height: 36px;margin:15px 30px 20px;overflow: hidden">
            <div class="fl">客户查询：</div>
            <div class="demo-input-suffix fl feel-input">
              <el-input v-model="teamw_cur_name" placeholder="请输入客户名称/身份证"></el-input>
            </div>
            <el-button class="fl" type="primary" style="margin-left: 20px;" @click="memberGetList('scela')">搜索</el-button>
          </div>
          <!--客户列表-->
            <div class="teamwork-curlist">
              <el-table :data="curData" :border="true" style="width: 100%">
                <el-table-column :resizable="false" label="" min-width="60">
                  <template slot-scope="scope">
                    <el-radio style="margin-left: 7.5px;margin-top: 0px;" class="chekcli" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="name" label="客户名称" min-width="175"></el-table-column>
                <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="idNumber" label="身份证号码" min-width="120"></el-table-column>
                <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="bizzPartnerName" label="客户来源" min-width="157"></el-table-column>
                <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="belongEmployeeName" label="客户跟进人" min-width="157"></el-table-column>
              </el-table>
            </div>
          <!--确定-->
          <div style="text-align: right;padding-right: 30px;margin-top: 23.5px;">
            <el-button @click="order_cur_ok" style="width: 100px;height: 38px;" type="primary">确定</el-button>
          </div>
        </div>
      </div>
      <!--商品列表弹出-->
      <div v-if="order_commodity_status" class="teamwork-tc" style="background:rgba(0,0,0,0.5);">
        <div style="width: 860px;height: 70%;margin: 5vh auto;" class="teamwork-text">
          <p class="teamwork-text-title" style="background: #fff;border-bottom: 1px solid #dddddd;margin-bottom: 20px;">
            <i fo-size='18'>选择商品</i>
            <!--<i class="fr"><svg-icon icon-class="x" /></i>-->
          </p>
          <!--商品列表-->
          <div class="commodity-det teamwork-curlist">
            <el-table :data="commodity_data" :border="true" style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange" ref="multipleTable">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="name" label="商品名称" min-width="305"></el-table-column>
              <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="constainProjects" label="包含项目" min-width="315"></el-table-column>
              <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="price" label="商品价格" min-width="100"></el-table-column>
            </el-table>
          </div>
          <!--确定-->
          <div style="text-align: right;padding-right: 30px;margin-top: 23.5px;">
            <el-button @click="order_commodity_ok" style="width: 100px;height: 38px;" type="primary">确定</el-button>
          </div>
        </div>
      </div>
      <!--订单相关人弹出-->
      <div v-if="order_correlation_status" class="teamwork-tc" style="background:rgba(0,0,0,0.5);">
        <div style="width: 750px;height: 70%;margin: 5vh auto;" class="teamwork-text">
          <p class="teamwork-text-title" style="background: #fff;border-bottom: 1px solid #dddddd;">
            <i fo-size='18'>员工列表</i>
            <!--<i class="fr"><svg-icon icon-class="x" /></i>-->
          </p>
          <div class="module-ri" style="line-height: 36px;margin:15px 30px 20px;overflow: hidden">
            <div class="fl">员工查询：</div>
            <div class="demo-input-suffix fl feel-input">
              <el-input v-model="teamw_correlation_name" placeholder="请输入员工名称"></el-input>
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
              <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="name" label="员工名称" min-width="175"></el-table-column>
              <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="mobilePhone" label="手机号码" min-width="120"></el-table-column>
              <el-table-column :resizable="false" :show-overflow-tooltip="true" prop="departmentName" label="所属部门" min-width="157"></el-table-column>
            </el-table>
          </div>
          <!--确定-->
          <div style="text-align: right;padding-right: 30px;margin-top: 23.5px;">
            <el-button @click="order_correlation_ok" style="width: 100px;height: 38px;" type="primary">确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--查看订单-->
    <div v-if="teaword_cktc" class="teamwork order">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div style="width: 590px;height: 84%;margin: 5vh auto;" class="teamwork-text">
          <p class="teamwork-text-title" style="background: #f2f2f4;border-bottom: 1px solid #dddddd;">
            <i fo-size='18'>{{teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].auditStatus==1?'已':'未'}}审核订单详情</i>
            <i @click="teaword_ckgb" class="fr"><svg-icon icon-class="x" /></i>
          </p>
          <!--基本信息-->
          <div style="height: 130px;padding: 0 30px;overflow: hidden;">
            <p fo-size='16'>基本信息</p>
            <div style="line-height: 32px;overflow: hidden;margin-left: 10px;">
              <span fo-size='16' class="fl">客户名称：</span>
              <span @click="memberGetList" style="margin-left: 5px;cursor:pointer;" class="fl">{{teaword_ckdata.memberName}}</span>
            </div>
            <div style="line-height: 32px;overflow: hidden;margin-left: 10px;margin-top: 8px;">
              <span fo-size='16' class="fl">客户来源：</span>
              <span style="margin-left: 5px;" class="fl">{{teaword_ckdata.bizzPartnerName}}</span>
            </div>
          </div>
          <!--新建商品内容-->
          <div class="teamwork-text-nr" style="background: #f2f2f4;">
            <div style="width: 100%;height: 100%;overflow-y: auto;">
              <div style="background: #fff;">
                <div style="height: 54px;line-height: 54px;overflow: hidden;border-bottom: 1px solid #eee;padding: 0 30px;">
                  <span class="fl">商品信息</span>
                </div>
                <div class="teamwork-order-li" v-for="item in teaword_ckdata.salePackageDetails">
                  <div style="padding: 0 40px;">
                    <p style="margin:0px;height: 40px;line-height: 40px;border-bottom:1px solid #eee">{{item.salePackageName}}</p>
                    <div v-if="item.projectDetails.length!=0" style="padding:10px;font-size: 14px;color: #666;overflow: hidden;">
                      <div class="fl">包含项目：</div>
                      <div class="fl">
                        <ul class="order-ul">
                          <li v-for="test in item.projectDetails">{{test.projectName}}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div fo-size='16' style="border-top: 1px solid #f2f2f4;height: 34px;line-height: 34px;text-align: right;padding: 0 30px;">单价：￥{{item.salePackagePrice}}</div>
                </div>
              </div>
              <div style="margin-top: 16px;background: #fff;">
                <div style="height: 54px;line-height: 54px;overflow: hidden;padding: 0 30px;">
                  <span class="fl">订单信息</span>
                </div>
                <!--订单价格-->
                <div>
                  <div style="line-height: 32px;overflow: hidden;padding: 0 40px;">
                    <span fo-size='16' class="fl">订单成交价：</span>
                    <span>{{teaword_ckdata.totalAmount}}元</span>
                  </div>
                  <div style="line-height: 32px;overflow: hidden;padding: 0 40px;margin-top: 10px;">
                    <span fo-size='16' class="fl">订单实付款：</span>
                    <span class="fl" style="width: 78%;">{{teaword_ckdata.paidTotalAmount}}元
                      <span v-for="item in teaword_ckdata.auditDetails" style="white-space: nowrap;display: inline-block;">
                        {{item.auditStatus==0?'[未审金额：'+item.amount+'元]':'[已审金额：'+item.amount+'元]'}}
                      </span>
                    </span>
                  </div>
                  <div style="line-height: 32px;overflow: hidden;padding: 0 40px;margin-top: 10px;">
                    <span fo-size='16' class="fl">欠款：</span>
                    <span class="fl">{{teaword_ckdata.unpaidTotalAmount}}元</span>
                  </div>
                  <div t-size='16' style="line-height: 32px;overflow: hidden;padding: 0 40px;margin-top: 10px;">
                    <span class="fl">操作人：</span>
                    <span class="fl">{{teaword_ckdata.createEmployeeName}}</span>
                  </div>
                  <div t-size='16' style="line-height: 32px;overflow: hidden;padding: 0 40px;margin-top: 10px;">
                    <span class="fl">订单号：</span>
                    <span class="fl">{{teaword_ckdata.orderSn}}</span>
                  </div>
                  <div t-size='16' style="line-height: 32px;overflow: hidden;padding: 0 40px;margin-top: 10px;">
                    <span class="fl">付款方式：</span>
                    <span class="fl">
                      <span v-for="(item,ind) in teaword_ckdata.payDetails">
                        {{ind!=0?'、':''}}{{item.payType==1?'微信支付':(item.payType==2?'现金支付':(item.payType==3?'支付宝支付':'POS支付'))}}
                      </span>
                    </span>
                  </div>
                </div>
                <!--审核记录-->
                <div style="height: 54px;line-height: 54px;overflow: hidden;padding: 0 30px;">
                  <span class="fl">审核记录</span>
                </div>
                <div>
                  <div v-for="item in teaword_ckdata.auditDetails" style="line-height: 32px;overflow: hidden;padding: 0 40px;">
                    <span fo-size='16' class="fl">收款{{item.amount}}元 {{item.auditStatus==0?'待':'已'}}审核 {{item.auditTime}}</span>
                  </div>
                </div>
                <!--备注-->
                <div style="overflow: hidden;padding: 0 30px;margin-top: 30px;">
                  <span class="fl" style="margin-right: 15px;margin-top: 10px;">备注</span>
                  <div fo-size="18" class="fl" style="width: 100%;margin-top: 20px;padding:0 10px;">
                    {{teaword_ckdata.remark}}
                  </div>
                </div>
                <!--订单相关人-->
                <div style="height: 54px;line-height: 54px;overflow: hidden;padding: 0 30px;">
                  <span class="fl">订单相关人</span>
                </div>
                <div class="xgr" style="padding: 0 40px 20px;">
                  <el-table :data="teaword_ckdata.portionSettingDetails" style="width: 100%">
                    <el-table-column prop="employeeName" label="员工名称" width="180"></el-table-column>
                    <el-table-column prop="roleTypeName" label="职位" width="180"></el-table-column>
                    <el-table-column label="订单占比">
                      <template slot-scope="scope">
                        <span fo-size='14' class="fl" style="height: 32px;line-height: 32px;margin-left: 8px;">{{scope.row.portion}}%</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <!--确定-->
          <div style="padding-right: 30px;margin-top: 9.5px;overflow: hidden;line-height: 38px;">
            <span v-if="teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].auditStatus==1" class="fl" style="margin-left: 30px;">收款{{teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].amount}}元，已审核</span>
            <span v-if="teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].auditStatus==0" class="fl" style="margin-left: 30px;">请审核是否收到{{teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].amount}}元</span>
            <el-button v-if="teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].auditStatus==0 && (roleType==6 || roleType==2)" class="fr" @click="audit(teaword_ckdata.orderSn)" style="width: 100px;height: 38px;" type="primary">审核</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index'
  import { getToken } from '@/utils/auth'
  import {validateRatio,validateMoney,validateRatioContinuous} from '@/utils/validate'
  export default {
    name: 'index',
    data() {
      return {
        teamw_correlation_name:'',/*订单相关人搜索*/
        correlation_list:[],/*选择的订单相关人*/
        correlation_data:[],/*选择订单相关人列表*/
        order_correlation_status:false,/*选择订单相关人弹出*/
        commodity_list:[],/*选择的商品*/
        commodity_data:[],/*选择商品列表*/
        commodity_radio:0,/*多选框*/
        order_commodity_status:false,/*选择商品弹出*/
        curData:[],/*选择客户*/
        radio:0,/*单选框*/
        order_cur_status:false,/*选择客户弹出*/
        teamw_cur_name:'',/*客户搜索名称*/
        curdet:[{name:'',bm:''}],/*选择客户基本信息*/
        det:[{name:'健康管理体验卡',moy:'20000',proj:[{name:'是科技发达1'},{name:'是科技发达2'},{name:'是科技发达3'}]}],/*商品列表*/
        deal:{make:'',prepay:''},/*成交价，实付*/
        textarea:'',/*备注*/
        paymode:[
          {name:'微信支付',checked:false,moy:'',payType:1},
          {name:'支付宝支付',checked:false,moy:'',payType:3},
          {name:'现金支付',checked:false,moy:'',payType:2},
          {name:'POS支付',checked:false,moy:'',payType:4}
        ],
        dataList: [], /* 接口返回来的数据[{}]*/
        currentPage: 1, /* 分页定位到第几页*/
        total: 1, /* 总条数*/
        pageSize: api.pageSize, /* 一页多少条数据*/
        searchPc: '',
        addTimeBegin: '',
        addTimeEnd: '',
        auditTimeBegin: '',
        auditTimeEnd: '',
        auditStatusList: [{'value':'all','tag':'全部'}, {'value':'needAudit','tag':'待审核'}, {'value':'audited','tag':'已审核'}],
        payStatusList: [{'value':'all','tag':'全部'}, {'value':'unpaid','tag':'待回款'}, {'value':'paid','tag':'已完成'}],
        auditStatus: '',
        payStatus: '',
        roleType:'',
        tableData: [{
          date: '王小虎1',
          name: '王小虎',
          value:70
        }, {
          date: '王小虎2',
          name: '王小虎',
          value:80
        }, {
          date: '王小虎3',
          name: '王小虎',
          value:60
        }, {
          date: '王小虎4',
          name: '王小虎',
          value:100
        }],
        page:1,/*客户*/
        pageCom:1,/*商品*/
        pageCrr:1,/*相关人*/
        scrollHeight:0,
        pageSi:0,/*客户总数*/
        pageSiCom:0,/*商品总数*/
        pageSiCrr:0,/*相关人总数*/
        selectWrap:'',
        teaword_tc:false,/*弹出编辑订单*/
        teaword_cktc:false,/*弹出查看订单*/
        teaword_ckdata:[],/*查看订单*/
        oldData:[],/*订单相关人数组优化*/
        seo:[],/*订单相关人数字优化*/
        moycj:[],/*成交金额，预付款金额数字优化*/
      }
    },
    components: {
    },
    watch:{
      radio(e){
        this.curdet=[{name:this.curData[e].name,bm:this.curData[e].bizzPartnerName,Id:this.curData[e].memberId,hzId:this.curData[e].bizzPartnerId}];
      },
      'correlation_list':{
        handler:function(e){
//            console.log(e)
          e.forEach(function (l,ind) {
            if(l.value != this.oldData[ind].value){
              this.$nextTick(function () {
                if(!validateRatio(l.value*1)){
                  this.correlation_list[ind].value=this.seo[ind];
                  return;
                }
                this.correlation_list[ind].value=validateRatioContinuous(l.value);
                this.seo[ind]=validateRatioContinuous(l.value);
              });
            }
          }.bind(this));
          this.oldData=JSON.parse(JSON.stringify(this.correlation_list));
        },
        deep:true
      },
      'deal.make'(e){
        this.$nextTick(function () {
          if(!validateMoney(e*1)){
            this.deal.make=this.moycj[0];
            return;
          }
          this.moycj[0]=e;
        });
      },
      'deal.prepay'(e){
        this.$nextTick(function () {
          if(!validateMoney(e*1)){
            this.deal.prepay=this.moycj[1];
            return;
          }
          this.moycj[1]=e;
        });
      }
    },
    methods: {
      restoreData(){
          /*操作完成，清除数据*/
        this.curdet=[{name:'',bm:''}];
        this.commodity_list=[];
        this.deal={make:'',prepay:''};
        this.paymode=[
          {name:'微信支付',checked:false,moy:'',payType:1},
          {name:'支付宝支付',checked:false,moy:'',payType:3},
          {name:'现金支付',checked:false,moy:'',payType:2},
          {name:'POS支付',checked:false,moy:'',payType:4}
        ];
        this.textarea='';
        this.correlation_list=[];
      },
      async audit(e,e1){
          /*审核订单*/
        if(this.roleType==3 || e1==2){
            return;
        }
        const jquery = {
          orderSn:e
        }
        const josn = await api.orderAudit(jquery);
        if(josn.imei_error_code==0){
          this.$alert('审核订单成功', '', {
            confirmButtonText: '确定',
            callback: action => {
              this.teaword_cktc=false;
              this.fet({ page: 1 });
            }
          });
        }
      },
      teaword_ckgb(){
          /*查看订单关闭*/
        this.teaword_cktc=false;
      },
      async lookOrder(e){
          /*查看订单信息*/
        const jquery = {
          orderSn:e
        }
        const josn = await api.orderDetail(jquery);
        this.teaword_ckdata=josn.data;
        if(josn.imei_error_code==0){
          this.teaword_cktc=true;
        }
      },
      teaword_gb(){
          /*关闭编辑订单*/
          this.teaword_tc=false;
      },
      async save(){
          /*确定提交创建订单*/
        let commodity_list=[],correlation_list=[],paymode=[];
        this.commodity_list.forEach(function (l) {
          commodity_list.push({salePackageId:l.salePackageId,buyNum:1})
        })
        this.correlation_list.forEach(function (h) {
          correlation_list.push({employeeId:h.employeeId,portion:h.value})
        })
        this.paymode.forEach(function (h) {
            if(h.checked){
              paymode.push({payType:h.payType,amount:h.moy});
            }
        })
        if(commodity_list==''){
          this.$message({
            type: 'info',
            message: '请选择商品！'
          });
          return;
        }
        const jquery = {
          orderType:1,
          salePackageDetail:commodity_list || [],
          totalAmount:this.deal.make || '',
          paidTotalAmount:this.deal.prepay || '',
          payDetail:paymode || '',
          memberId:this.curdet[0].Id || '',
          bizzPartnerId:this.curdet[0].hzId || '',
          remark:this.textarea || '',
          portionSetting:correlation_list || []
        }

        const josn = await api.orderAdd(jquery);
        if(josn.imei_error_code==0){
          this.$alert('新建订单成功', '', {
            confirmButtonText: '确定',
            callback: action => {
              this.teaword_tc=false;
              this.fet({ page: 1 });
              this.restoreData();
            }
          });
        }
      },
      correlation_forE(){
          /*查找选中数据*/
        if(this.correlation_list.length>0){
          this.correlation_data.forEach(function (l) {
              for(let [ind,h] of new Map( this.correlation_list.map( ( ind, h ) => [ h, ind ] ) )){
                if(l.checked){
                    console.log(855525)
                  if(l.employeeId==h.employeeId){
                    console.log(8888)
                    h.checked=true;
                    return;
                  }
                  if(this.correlation_list.length==ind+1){
                    console.log(9999)
                    this.correlation_list.push(l);
                    return;
                  }
                }else{
                  if(l.employeeId==h.employeeId){
                    this.correlation_list.splice(ind,1);
                  }
                }
              }
          }.bind(this));
        }else{
          this.correlation_data.forEach(function (l) {
            if(l.checked){
              this.correlation_list.push(l);
            }
          }.bind(this));
        }
        this.oldData=JSON.parse(JSON.stringify(this.correlation_list));
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
        }

        const josn = await api.getMeployeeList(jquery);
        if(this.correlation_list.length>0){
          this.correlation_list.forEach(function (l) {
            josn.data.list.forEach(function (h) {
              if(l.employeeId==h.employeeId){
                  h.checked=true;
              }
            })
          })
        }

        this.correlation_data=this.correlation_data.concat(josn.data.list);
        this.pageSiCrr=josn.data.totalSize;
        this.setIscrooll();
      },
      handleSelectionChange(val){
          /*选择商品*/
        this.commodity_list=val;
      },
      order_commodity_ok(){
          /*选择商品ok*/
        this.order_commodity_status=false;
        this.selectWrap.removeEventListener('scroll', this.scrfun, false);
//        this.commodity_data=[];
        this.scrollHeight=0;
      },
      toggleSelection(rows) {
          /*选择商品同步*/
        if (rows) {
//          this.$nextTick(function () {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row,true);
            });
//          })
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      async commodity_click(){
          /*商品选择*/
          this.order_commodity_status=true;
          setTimeout(function () {
            this.toggleSelection(this.commodity_list);
          }.bind(this),100)
        console.log(this.pageSiCom==this.commodity_data.length && this.commodity_data.length!=0)
          if(this.pageSiCom==this.commodity_data.length && this.commodity_data.length!=0){return;}
          const jquery = {
            pageNo:this.pageCom,
          }
          const josn = await api.salePackageList(jquery);

          if(this.pageCom==1){
              if(this.commodity_data.length==0){
                this.commodity_data=this.commodity_data.concat(josn.data.list)
              }
          }else{
            josn.data.list.forEach(function (l) {
              this.commodity_data.push(l)
            }.bind(this))
          }

          this.pageSiCom=josn.data.totalSize;
          this.setIscrooll();
      },
      scrfun(e){
        /*scroll事件动作*/
        const scrollDistance = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        const leg=this.order_cur_status?(this.curData.length!=this.pageSi):
          (this.order_commodity_status?(this.commodity_data.length!=this.pageSiCom):
          (this.order_correlation_status?(this.correlation_data.length!=this.pageSiCrr):0));
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
          }
          this.selectWrap.removeEventListener('scroll', this.scrfun, false);
        }
      },
      scrolles(){
            /*绑定scroll事件*/
          var This=this;
          this.selectWrap.addEventListener('scroll', this.scrfun, false);
      },
      setIscrooll(){
        /*查询scroll状态是否正常运行*/
        if(this.order_cur_status){
          if(this.pageSi<=api.pageSize){return;}
        }else if(this.order_commodity_status){
          if(this.pageSiCom<=api.pageSize){return;}
        }else if(this.order_correlation_status){
          if(this.pageSiCrr<=api.pageSize){return;}
        }
        this.selectWrap = document.querySelector('.teamwork-curlist');
        var terval=setInterval(function () {
          this.selectWrap.scrollTop=this.scrollHeight-this.selectWrap.clientHeight;
          this.scrollHeight=this.selectWrap.scrollHeight;
          if(this.scrollHeight==this.selectWrap.scrollHeight){
            this.scrolles();
            clearInterval(terval);
          }
        }.bind(this),100)
      },
      order_cur_ok(){
          /*客户选择ok*/
        this.selectWrap.removeEventListener('scroll', this.scrfun, false);
        this.curData=[];
        this.scrollHeight=0;
        this.order_cur_status=false;
        this.page=1;
      },
      async memberGetList(e){
          /*客户列表*/
          if(e=='scela'){
              this.curData=[];
              this.page=1;
              this.scrollHeight=0;
              this.radio=0;
              this.selectWrap.removeEventListener('scroll', this.scrfun, false);
          }
        this.order_cur_status=true;
        const jquery = {
          pageNo:this.page,
          searchWord:this.teamw_cur_name || '',
        }
        const josn = await api.memberGetList(jquery)
        this.curData=this.curData.concat(josn.data.list)
        if(this.radio==0){
          this.curdet=[{name:this.curData[0].name,bm:this.curData[0].bizzPartnerName,Id:this.curData[0].memberId,hzId:this.curData[0].bizzPartnerId}];
        }
        this.pageSi=josn.data.totalSize;
        this.setIscrooll();
      },
      formatter(row, column) {
        return row.address;
      },
      async fet(e) {
        /* 接口对接async await*/
        this.auditTimeEnd = this.auditTimeEnd?this.auditTimeEnd+" 23:59:59":this.auditTimeEnd;
        this.addTimeEnd = this.addTimeEnd?this.addTimeEnd+" 23:59:59":this.addTimeEnd
        const jquery = {
          pageNo: e.page || 1,
          searchPc: this.searchPc || '',
          addTimeBegin: this.addTimeBegin || '',
          addTimeEnd: this.addTimeEnd || '',
          auditTimeBegin: this.auditTimeBegin || '',
          auditTimeEnd: this.auditTimeEnd || '',
          auditStatus: this.auditStatus || '',
          payStatus: this.payStatus || '',
        }
        const josn = await api.orderList(jquery)
        this.dataList = josn.data.list
        this.total = josn.data.totalSize
      },
      handleCurrentChange(val) {
        this.fet({ page: val })
//        console.log(`当前页: ${val}`)
      },
      search() {
        this.fet({
          searchPc: this.searchPc,
          addTimeBegin: this.addTimeBegin,
          addTimeEnd: this.addTimeEnd,
          auditTimeBegin: this.auditTimeBegin,
          auditTimeEnd: this.auditTimeEnd,
        })
      },
      changeAuditStatus(index) {
//        console.log(index);
        this.auditStatus = this.auditStatus === index ? '' : index
//        console.log(this.auditStatus)
        this.fet({
          page: this.currentPage
        })
      },
      changePayStatus(index) {
        this.payStatus = this.payStatus === index ? '' : index
        this.fet({
          page: this.currentPage
        })
      }
    },
    mounted: function() {
      this.fet({ page: 1 })
      this.roleType=JSON.parse(getToken()).roleType;
    }
  }
</script>

<style>
  .chekcli .el-radio__inner::after{
    background: 0 !important;
    border-radius:0;
    height: 9px !important;
    left: 8px !important;
    top: 4px !important;
    -webkit-box-sizing: content-box !important;
    box-sizing: content-box !important;
    content: "" !important;
    border: 1px solid #fff !important;
    border-left: 0 !important;
    border-top: 0 !important;
    position: absolute !important;
    -webkit-transform: rotate(45deg) scaleY(0) !important;
    transform: rotate(45deg) scaleY(0) !important;
    width: 5px !important;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms !important;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms !important;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms !important;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms, -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms !important;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms !important;
    -webkit-transform-origin: center !important;
    transform-origin: center !important;
  }
  .chekcli  .el-radio__input.is-checked .el-radio__inner::after{
    webkit-transform: rotate(45deg) scaleY(1) !important;
    transform: rotate(45deg) scaleY(1) !important;
  }
  .chekcli .el-radio__inner{
    width:24px !important;
    height:24px !important;
    border-radius: 0 !important;
  }
  .chekcli .el-radio__label{
    padding-left: 0px;
    width: 0px !important;
    overflow: hidden;
    display: none;
    height: 0px;
  }
  .chekcli .el-checkbox__inner{
    width:24px !important;
    height:24px !important;
    border-radius: 0 !important;
  }
  .chekcli .el-checkbox__inner::after{
    height: 9px !important;
    width: 5px !important;
    left: 8px !important;
    top: 4px !important;
  }
  .chekckout .el-checkbox__inner{
    border-radius: 50%;
  }
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
  .el-date-editor.el-input{
    width:100%;
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
    color: #3096f8 !important;
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
