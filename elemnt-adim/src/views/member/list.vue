<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">客户查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="searchWord" placeholder="请输入 客户名称/身份证/客户来源"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">客户类型：</div>
        <div class="fl">
          <ul fo-size="16">
            <li :class="item.id==memberTypeId?'xs':''" v-for="item in memberType" @click="tabAffair(item.id)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide">
      <!--需求操作-->
      <el-button class="fl" @click="showAddModal" type="primary">创建客户</el-button>
      <el-button class="fl" type="primary">excel导出</el-button>
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="memberNo" label="客户编号" min-width="80"></el-table-column>
        <el-table-column prop="name" label="客户名称" min-width="100"></el-table-column>
        <el-table-column prop="idNumber" label="身份证号" min-width="200"></el-table-column>
        <el-table-column prop="bizzPartnerName" label="客户来源" min-width="250"></el-table-column>
        <el-table-column prop="belongEmployeeName" label="客户管理员" min-width="100"></el-table-column>
        <el-table-column prop="typeName" label="客户类型" min-width="80"></el-table-column>
        <el-table-column prop="" label="操作" min-width="320">
          <template slot-scope="scope">
            <el-button class="fl" tab-btn type="primary" @click="showEditModal(scope.row.memberId)">编辑</el-button>
            <el-button class="fl" tab-btn tab-bg='green' type="primary" @click="showDetailsModal(scope.row.memberId)" style="margin-left: 13px;">查看</el-button>
            <!-- <el-button class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">开单</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div style=" margin-top: 10px;">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--创建客户弹窗-->
    <transition name="el-fade-in-linear">
      <div v-show="status" class="teamwork">

        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div class="teamwork-text">
            <p class="teamwork-text-title">
              <i fo-size='18' v-html="title">新增客户</i>
              <i @click="close" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p>
            <div class="teamwork-text-nr">
              <el-form class="login-form" label-position="right" label-width="100px" autoComplete="off" :model="form" ref="addForm">
                <el-form-item label="姓名">
                  <el-input fo-size='14' size="small" style="width: 165px;" v-model="form.name" name="name" maxlength="5" type="text" placeholder="请输入客户名"
                  />
                  <span class="tag-wrap">
                    <img class="tag-img" v-if="tagLogo" :src="tagLogo">
                  </span>

                  <span class="tag" @click="showTag = true;">+标签</span>
                </el-form-item>
                <el-form-item label="会员编码">
                  <el-input fo-size='14' size="small" style="width: 165px;" v-model="form.memberNo" name="name" maxlength="6" type="text" placeholder="会员编码"
                  />
                </el-form-item>
                <el-form-item label="移动电话">
                  <el-input fo-size='14' size="small" v-model="form.mobilePhone" style="width:165px;" maxlength="11" name="mobilePhone" type="text"
                    placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日">
                  <el-date-picker type="date" v-model="form.birthdayS" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="籍贯">
                  <el-input fo-size='14' size="small" v-model="form.nativePlace" style="width:165px;" name="nativePlace" type="text" placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item label="地址">
                  <el-input fo-size='14' size="small" v-model="form.address" style="width:433px;" maxlength="30" name="address" type="text"
                    placeholder="请输入地址" />
                </el-form-item>
                <el-form-item label="身份证号码">
                  <el-input fo-size='14' size="small" v-model="form.idNumber" maxlength="18" style="width:165px;" name="idNumber" type="text"
                    placeholder="请输入身份证号码" />
                </el-form-item>
                <el-form-item label="客户管理员">
                  <el-input fo-size='14' size="small" :disabled="true" :value="form.bizzPartnerName" style="width:165px;" name="bizzPartnerName"
                    type="text" />
                  <el-button class="sp-ml-16" type="primary" @click="showEmployee = true" size="small">添加</el-button>
                </el-form-item>
                <el-form-item label="客户相关人">
                  <el-input fo-size='14' size="small" :value="relatedNames" disabled style="width:200px;" name="relatedNames" type="text" />
                  <el-button class="sp-ml-16" type="primary" @click="showRelated = true" size="small">指定相关人</el-button>
                </el-form-item>
                <el-form-item label="客户来源">
                  <el-select v-model="form.bizzPartnerId" placeholder="请选合作商">
                    <el-option v-for="item in bizzPartnerList" :key="item.bizzPartnerId" :label="item.name" :value="item.bizzPartnerId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="业务对接人">
                  <span fo-size="14" class="push" @click="form.jsonConnectMan.push({name:'',mobilePhone:''})">新增</span>
                  <div class="block" v-for="(item, index) in form.jsonConnectMan" :key="index">
                    <el-row :gutter="10">
                      <el-col :span="5">
                        <div fo-size="14" class="grid-content bg-purple">
                          对接人{{index+1}}
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <el-input fo-size='14' v-model="item.name" size="small" style="width:90px;" name="name" type="text" />
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <el-input fo-size='14' size="small" v-model="item.mobilePhone" maxlength="11" style="width:140px;" name="name" type="text"
                          />
                        </div>
                      </el-col>
                      <el-col :span="5">
                        <div class="grid-content bg-purple">
                          <el-button class="sp-ml-16" type="info" @click="form.jsonConnectMan.splice(index,1);" size="small">删除</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <!--既往病史-->
                <el-form-item label="既往病史">
                  <el-input :autosize="{minRows: 4,maxRows: 6}" v-model="form.medicalHistory" resize="none" fo-size='14' style="width: 540px;"
                    name="medicalHistory" type="textarea" placeholder="暂无病史" />
                </el-form-item>
                <!--备注-->
                <el-form-item label="备注">
                  <el-input :autosize="{minRows: 4,maxRows: 6}" v-model="form.remark" fo-size='14' resize="none" style="width: 540px;" name="remark"
                    type="textarea" placeholder="暂无备注" />
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: right;padding-right: 30px;">
              <el-button type="primary" @click="save">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!--选择员工-->
    <transition name="el-fade-in-linear">
      <div v-show="showEmployee" class="teamwork teamwork2">
        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div class="teamwork-text">
            <p class="teamwork-text-title">
              <i fo-size='18'>员工列表</i>
              <i @click="showEmployee = false" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p>
            <div class="teamwork-text-nr">
              <div class="fl" style="line-height: 36px;margin-bottom: 20px">
                <!--计划查询-->
                <div class="fl">员工查询：</div>
                <div class="demo-input-suffix fl feel-input">
                  <el-input v-model="meployeeSearchWord" placeholder="请输入内容"></el-input>
                </div>
                <el-button @click="searchEmployee" class="fl" type="primary">搜索</el-button>
              </div>

              <el-table :data="employeeList" @row-click="showRow" tooltip-effect="dark" border style="width: 100%;max-height:80%;overflow-y: scroll">
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row.employeeId">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="员工名称" width="300">
                </el-table-column>
                <el-table-column prop="roleTypeName" label="职位" show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div style=" margin-top: 10px;">
                <el-pagination @current-change="employeeCurrentChange" :current-page.sync="employeeCurrentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                  :total="employeeTotal">
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

              <el-table ref="relatedTable" :data="relatedList" :row-key="getRowKeys" tooltip-effect="dark" border style="width: 100%;max-height:80%;overflow-y: scroll"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" :reserve-selection="true" prop="employeeId" width="50"></el-table-column>
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

    <!--标签-->
    <transition name="el-fade-in-linear">
      <div v-show="showTag" class="teamwork teamwork2">
        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div class="teamwork-text">
            <p class="teamwork-text-title">
              <i fo-size='18'>选择标签</i>
              <i @click="showTag = false" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p>
            <div class="teamwork-text-nr">
              <el-table ref="multipleTable" :data="tagList" tooltip-effect="dark" border style="width: 100%;max-height:80%;overflow-y: scroll">
                <el-table-column label="标签" width="300">
                  <template slot-scope="scope">
                    <div class="text-center" style="font-size: 0;">
                      <img class="tag-img" :src="scope.row.logo" style="vertical-align:bottom;">
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button v-show="!scope.row.sign" class="fl" type="primary" @click="selectTag(scope.$index,scope.row.tagId)" style="margin-left: 13px;">选择</el-button>
                    <el-button v-show="scope.row.sign" class="fl" @click="unSelectTag(scope.$index)" style="margin-left: 13px;">取消选择</el-button>
                    <el-button class="fl" style="margin-left: 13px;" @click="deketeTag(scope.row.tagId)">删除标签</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="text-align: right;padding-right: 30px;">
              <el-upload name="image" class="upload" :action="uploadImageUrl" :show-file-list="showFileList" :before-upload="beforeLogoUpload"
                :on-success="handleLogoSuccess">
                <el-button type="primary">新增标签</el-button>
              </el-upload>
              <el-button type="primary" style="margin-left: 10px" @click="showTag = false">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!--查看详情-->
    <transition name="el-fade-in-linear">
      <div v-show="showDetails" class="teamwork">
        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div class="teamwork-text" style="position: relative;">
            <ul class="tab-wrap">
              <li :class="tabNum == 0 && 'active'" @click="tabNum = 0">客户详情</li>
              <li :class="tabNum == 1 && 'active'" @click="tabNum = 1">沟通记录</li>
              <li :class="tabNum == 2 && 'active'" @click="tabNum = 2">关联计划</li>
              <li :class="tabNum == 3 && 'active'" @click="tabNum = 3;">关联订单</li>
            </ul>
            <i @click="showDetails = false" style="position: absolute;top:15px;right: 30px;">
              <svg-icon icon-class="x" />
            </i>
            <!-- <p class="teamwork-text-title">
              <i fo-size='18'>新增客户</i>
              <i @click="close" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p> -->
            <div class="teamwork-text-nr" style="padding-bottom: 0">
              <div v-show="tabNum == 0" style="padding-bottom: 40px">
                <el-form class="login-form" label-position="right" label-width="100px" autoComplete="off" :model="form" ref="addForm">
                  <el-form-item label="姓名">
                    <el-input fo-size='14' disabled size="small" style="width: 165px;" v-model="form.name" name="name" maxlength="5" type="text"
                      placeholder="请输入客户名" />
                    <span class="tag-wrap">
                      <img class="tag-img" v-if="tagLogo" :src="tagLogo">
                    </span>
                  </el-form-item>
                  <el-form-item label="会员编码">
                    <el-input fo-size='14' size="small" disabled style="width: 165px;" v-model="form.memberNo" name="name" maxlength="6" type="text"
                      placeholder="会员编码" />
                  </el-form-item>
                  <el-form-item label="移动电话">
                    <el-input fo-size='14' size="small" disabled v-model="form.mobilePhone" style="width:165px;" maxlength="11" name="mobilePhone"
                      type="text" placeholder="请输入手机号" />
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-select v-model="form.sex" disabled placeholder="请选择性别">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="生日">
                    <el-date-picker type="date" disabled v-model="form.birthdayS" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="籍贯">
                    <el-input fo-size='14' size="small" disabled="" disabled v-model="form.nativePlace" style="width:165px;" name="nativePlace"
                      type="text" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input fo-size='14' size="small" disabled v-model="form.address" style="width:433px;" maxlength="30" name="address" type="text"
                      placeholder="请输入地址" />
                  </el-form-item>
                  <el-form-item label="身份证号码">
                    <el-input fo-size='14' size="small" disabled v-model="form.idNumber" maxlength="18" style="width:165px;" name="idNumber"
                      type="text" placeholder="请输入身份证号码" />
                  </el-form-item>
                  <el-form-item label="客户管理员">
                    <el-input fo-size='14' size="small" disabled :value="form.bizzPartnerName" style="width:165px;" name="bizzPartnerName" type="text"
                    />
                  </el-form-item>
                  <el-form-item label="客户相关人">
                    <el-input fo-size='14' size="small" disabled :value="relatedNames" disabled style="width:200px;" name="relatedNames" type="text"
                    />
                  </el-form-item>
                  <el-form-item label="客户来源">
                    <el-select v-model="form.bizzPartnerId" disabled placeholder="请选合作商">
                      <el-option v-for="item in bizzPartnerList" :key="item.bizzPartnerId" :label="item.name" :value="item.bizzPartnerId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="业务对接人">
                    <div class="block" v-for="(item, index) in form.jsonConnectMan" :key="index">
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <div fo-size="14" class="grid-content bg-purple">
                            对接人{{index+1}}
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple">
                            <el-input fo-size='14' v-model="item.name" disabled size="small" style="width:90px;" name="name" type="text" />
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple">
                            <el-input fo-size='14' size="small" disabled v-model="item.mobilePhone" maxlength="11" style="width:140px;" name="name" type="text"
                            />
                          </div>
                        </el-col>
                        <el-col :span="5">
                          <!-- <div class="grid-content bg-purple">
                            <el-button class="sp-ml-16" type="info" @click="form.jsonConnectMan.splice(index,1);" size="small">删除</el-button>
                          </div> -->
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                  <!--既往病史-->
                  <el-form-item label="既往病史">
                    <el-input :autosize="{minRows: 4,maxRows: 6}" disabled v-model="form.medicalHistory" resize="none" fo-size='14' style="width: 540px;"
                      name="medicalHistory" type="textarea" placeholder="暂无病史" />
                  </el-form-item>
                  <!--备注-->
                  <el-form-item label="备注">
                    <el-input :autosize="{minRows: 4,maxRows: 6}" disabled v-model="form.remark" fo-size='14' resize="none" style="width: 540px;"
                      name="remark" type="textarea" placeholder="暂无备注" />
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="tabNum == 1">
                <!-- 用户基本信息 -->
                <div class="UserInfo">
                  <!-- imgs2 == 女孩 ，imgs1 == 男孩 -->
                  <h3>{{form.name}}
                    <span>
                      <img :src="tagLogo" style="width: 30px;height: 16px" />
                    </span>
                    <i v-if="(form.sex == 1)" class="imgs1"></i>
                    <i v-if="(form.sex == 2)" class="imgs2"></i>
                  </h3>
                  <p>编号 : {{form.memberNo}}</p>
                  <p style="margin-top: 20px">身份证号码 : {{form.idNumber}}</p>
                </div>
                <!-- 右下：沟通记录 -->
                <div class="recording">
                  <div class="user">
                    <ul>
                      <!-- 这个可以开始引入沟通记录内容的接口数据 -->
                      <li v-for="item in CommunicationRecordList">
                        <i>
                          <img :src="item.headImgUrl">
                        </i>
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
                </div>
              </div>
              <div v-show="tabNum == 2" style="padding-bottom: 40px">
                <!-- 用户基本信息 -->
                <div class="UserInfo">
                  <!-- imgs2 == 女孩 ，imgs1 == 男孩 -->
                  <h3>{{form.name}}
                    <span>
                      <img :src="tagLogo" style="width: 30px;height: 16px" />
                    </span>
                    <i v-if="(form.sex == 1)" class="imgs1"></i>
                    <i v-if="(form.sex == 2)" class="imgs2"></i>
                  </h3>
                  <p>编号 : {{form.memberNo}}</p>
                  <p style="margin-top: 20px">身份证号码 : {{form.idNumber}}</p>
                </div>
                <!--表格-->
                <div class="ellipsis" style="margin-top: 30px;">
                  <el-table :data="planList" border style="width: 100%">
                    <el-table-column prop="name" label="客户名称" min-width="180"></el-table-column>
                    <el-table-column prop="applyVisitBeginTime3" label="计划时间段" min-width="180"></el-table-column>
                    <el-table-column prop="visitTypeValue" label="事件" min-width="50"></el-table-column>
                    <el-table-column prop="statusValue" label="计划状态" min-width="180"></el-table-column>
                    <el-table-column prop="executorName" label="计划执行人" min-width="180"></el-table-column>
                    <el-table-column prop="address" label="操作" min-width="180">
                      <template slot-scope="scope">
                        <el-button class="fl" tab-btn type="primary">操作</el-button>
                        <el-button class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!--分页-->
                <div style=" margin-top: 10px;">
                  <el-pagination @current-change="planCurrentChange" :current-page.sync="planCurrentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
              <div v-show="tabNum == 3" style="padding-bottom: 40px">
                <!-- 用户基本信息 -->
                <div class="UserInfo">
                  <!-- imgs2 == 女孩 ，imgs1 == 男孩 -->
                  <h3>{{form.name}}
                    <span>
                      <img :src="tagLogo" style="width: 30px;height: 16px" />
                    </span>
                    <i v-if="(form.sex == 1)" class="imgs1"></i>
                    <i v-if="(form.sex == 2)" class="imgs2"></i>
                  </h3>
                  <p>编号 : {{form.memberNo}}</p>
                  <p style="margin-top: 20px">身份证号码 : {{form.idNumber}}</p>
                </div>
                <!--表格-->
                <div class="ellipsis order" style="margin-top: 30px;">
                  <el-table :data="orderList" border style="width: 100%">
                    <el-table-column prop="salePackageNames" label="购买产品" min-width="150"></el-table-column>
                    <el-table-column prop="totalAmount" label="成交价" min-width="150"></el-table-column>
                    <el-table-column prop="auditedTotalAmount" label="已审金额" min-width="150"></el-table-column>
                    <el-table-column prop="needAuditTotalAmount" label="待审金额" min-width="150"></el-table-column>
                    <el-table-column prop="unpaidTotalAmount" label="欠款" min-width="150"></el-table-column>
                    <el-table-column prop="payStatusName" label="订单类型" min-width="150"></el-table-column>
                    <el-table-column prop="auditStatusName" label="审核状态" min-width="150"></el-table-column>
                    <el-table-column prop="portionItemsShort" label="订单相关人" min-width="150"></el-table-column>
                    <el-table-column label="操作" width="170">
                      <template slot-scope="scope">
                        <el-button @click="audit(scope.row.orderSn,scope.row.auditStatus)" :disabled="roleType!=6 || scope.row.auditStatus==2" :tab-bg='((roleType==6 && scope.row.auditStatus!=2)? "":"gray")'
                          style="background: #e88d2c;border-color:#e88d2c;" class="fl" tab-btn type="primary">审核</el-button>
                        <el-button @click="lookOrder(scope.row.orderSn)" class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!--分页-->
                <div style=" margin-top: 10px;">
                  <el-pagination @current-change="orderCurrentChange" :current-page.sync="orderCurrentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                    :total="orderTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
            <!-- <div v-show="tabNum != 1" style="text-align: right; padding-right: 30px;">
              <el-button type="primary">确定</el-button>
            </div> -->
            <div v-show="tabNum == 1" class="release">
              <div>
                <input type="text" v-model="release_input">
                <span @click="RecordRelease(release_input)">
                  发布</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!--查看订单-->
    <transition name="el-fade-in-linear">
      <div v-if="teaword_cktc" class="teamwork order">
        <div class="teamwork-mb"></div>
        <div class="teamwork-tc">
          <div style="width: 590px;height: 84%;margin: 5vh auto;" class="teamwork-text">
            <p class="teamwork-text-title" style="background: #f2f2f4;border-bottom: 1px solid #dddddd;">
              <i fo-size='18'>{{teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].auditStatus==1?'已':'未'}}审核订单详情</i>
              <i @click="teaword_cktc = false" class="fr">
                <svg-icon icon-class="x" />
              </i>
            </p>
            <!--基本信息-->
            <div style="height: 130px;padding: 0 30px;overflow: hidden;">
              <p fo-size='16'>基本信息</p>
              <div style="line-height: 32px;overflow: hidden;margin-left: 10px;">
                <span fo-size='16' class="fl">客户名称：</span>
                <span style="margin-left: 5px;cursor:pointer;" class="fl">{{teaword_ckdata.memberName}}</span>
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
                        <span v-for="item in teaword_ckdata.auditDetails" style="white-space: nowrap">
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
                      <span class="fl">呆小米</span>
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
              <el-button v-if="teaword_ckdata.auditDetails[teaword_ckdata.auditDetails.length-1].auditStatus==0 && roleType==6" class="fr"
                @click="audit(teaword_ckdata.orderSn)" style="width: 100px;height: 38px;" type="primary">审核</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import api from "../../api/index";
  import {
    getToken
  } from '@/utils/auth'

  export default {
    name: "index",
    data() {
      return {
        // 获取row的key值
        getRowKeys(row) {
          return row.employeeId;
        },
        uploadImageUrl: api.url + '/api/pcadmin/common/uploadImage',
        tabNum: 0,
        selectWrap: '',
        roleType: '', //角色
        radio: '',
        title: '新增客户',
        radioName: '',
        searchWord: "",
        meployeeSearchWord: '', //管理员搜索参数
        relatedSearchWord: '', //相关人搜索参数
        dataList: [] /* 接口返回来的数据[{}]*/ ,
        currentPage: 1 /* 分页定位到第几页*/ ,
        total: 1 /* 总条数*/ ,
        pageSize: api.pageSize /* 一页多少条数据*/ ,
        memberFollowEmployeeIds: "",
        employeeList: [],
        employeeTotal: 1,
        employeeCurrentPage: 1,
        relatedList: [],
        relatedTotal: 1,
        relatedCurrentPage: 1,
        relatedSelectData: [], //记忆数组
        orderList: [], //订单
        orderTotal: 1,
        orderCurrentPage: 1,
        planList: [], //计划
        planTotal: 1,
        planCurrentPage: 1,
        tagList: [],
        tagLogo: '',
        memberType: [{
            name: "全部",
            id: 0
          },
          {
            name: "体验客",
            id: 1
          },
          {
            name: "成交客",
            id: 2
          }
        ],
        bizzPartnerList: [], // 合作商列表
        multipleSelection: [],
        memberTypeId: 0,
        status: false,
        showEmployee: false, //管理员弹窗状态
        showRelated: false, //相关人员弹窗状态
        showTag: false, //标题弹窗状态
        showFileList: false,
        showDetails: false, //查看详情
        form: {
          memberId: "",
          name: "",
          memberNo: "",
          mobilePhone: "",
          birthdayS: "",
          nativePlace: "",
          idNumber: "",
          medicalHistory: "",
          address: "",
          remark: "",
          sex: "1",
          memberFollowEmployeeIds: "",
          bizzPartner: '',
          bizzPartnerName: '',
          bizzPartnerId: '',
          tagId: '',
          jsonConnectMan: [],
          belongEmployeeId: ""
        },
        // 沟通记录列表 
        CommunicationRecordList: [],
        // 沟通传的id 
        CommunicationRecordId: 0,
        // 沟通的页数长度 
        pageSicommunication: 0,
        // 沟通的页数 
        NumberOfPages: 1,
        // 沟通发布文字 
        release_input: "",
        teaword_cktc: false,
        /*弹出查看订单*/
        teaword_ckdata: [],
        /*查看订单*/
      };
    },
    components: {},
    computed: {
      relatedNames() {
        const arr = [];

        for (let v of this.multipleSelection) {
          arr.push(v.name)
        }
        return arr.join('、')
      }
    },
    methods: {
      async fet(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          searchWord: this.searchWord,
          type: this.memberTypeId > 0 ? this.memberTypeId : ""
        };
        const josn = await api.memberGetList(jquery);
        this.dataList = josn.data.list;
        this.total = josn.data.totalSize;
      },
      async getOrderList(page) {
        /* 订单列表 */
        const {
          data: {
            list,
            totalSize
          }
        } = await api.orderList({
          memberId: this.form.memberId,
          pageNo: page || 1,
          pageSize: this.pageSize,
        })

        this.orderList = list;
        this.orderTotalSize = totalSize;
      },
      async lookOrder(e) { /*查看订单信息*/
        const jquery = {
          orderSn: e
        }
        const josn = await api.orderDetail(jquery);
        this.teaword_ckdata = josn.data;
        if (josn.imei_error_code == 0) {
          this.teaword_cktc = true;
        }
      },
      async getPlanList(page) {
        /* 计划列表 */
        const {
          data: {
            list,
            totalSize
          }
        } = await api.planPageList({
          memberId: this.form.memberId,
          pageNo: page || 1,
          pageSize: this.pageSize,
        })
        this.planList = list;
        this.planTotalSize = totalSize;
      },
      async addMember() {
        /* 新增客户 */
        const {
          imei_error_code
        } = await api.addMember(this.form);
        if (imei_error_code == 0) {
          this.reset();
          this.status = false;
        }
      },
      async updateMember() {
        /* 修改客户*/
        const {
          imei_error_code
        } = await api.updateMember(this.form);
        if (imei_error_code == 0) {
          /*this.reset();*/
          this.status = false;
        }
      },
      async memberDetail(memberId) {
        /* 客户详情 */
        const {
          data
        } = await api.memberDetail({
          memberId
        });
        this.form = {
          memberId: data.memberId,
          name: data.name,
          memberNo: data.memberNo,
          mobilePhone: data.mobilePhone,
          birthdayS: data.birthday || "",
          nativePlace: data.nativePlace,
          idNumber: data.idNumber,
          medicalHistory: data.medicalHistory,
          remark: data.remark,
          sex: data.sex + "",
          address: data.address,
          memberFollowEmployeeIds: "",
          bizzPartner: '',
          bizzPartnerName: data.bizzPartnerName,
          bizzPartnerId: data.bizzPartnerId,
          tagId: data.tagId,
          jsonConnectMan: data.memberLinkmens,
          belongEmployeeId: data.belongEmployeeId
        }
        this.tagLogo = data.tagLogo;
        let arr = [];

        for (let v of data.followEmployees) {
          arr.push(v.employeeId);
        }

        this.form.memberFollowEmployeeIds = arr.join(',');
        this.multipleSelection = data.followEmployees;
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

        if (data.init) {
          this.employeeList = list;
          this.employeeTotal = totalSize;
          this.relatedList = list;
          this.relatedTotal = totalSize;
        } else if (data.plural) {
          this.relatedList = list;
          this.relatedTotal = totalSize;

          /* let arr = [];
          if (this.relatedSelectData[this.relatedCurrentPage]) {
            this.relatedSelectData[this.relatedCurrentPage].forEach((item, index) => {
              arr.push(this.relatedList[item])
            })
          } */

          /* setTimeout(() => {
            this.toggleSelection(this.multipleSelection);
          }, 0); */
        } else {
          this.employeeList = list;
          this.employeeTotal = totalSize;
        }

      },
      async getBizzpartnerList() {
        /* 合作商列表 */
        const {
          data
        } = await api.getBizzpartnerList();
        this.bizzPartnerList = data;
      },
      async getTagList() {
        const {
          data: {
            list
          }
        } = await api.getTagList();
        this.tagList = list;
      },
      async addTag(name, logo) {
        const query = {
          name,
          logo
        };
        const {
          imei_error_code
        } = await api.addTag(query);
        if (imei_error_code == 0) {
          this.getTagList();
        }
      },
      async deketeTag(tagId) {
        const {
          imei_error_code
        } = await api.deleteTag({
          tagId
        });
        if (imei_error_code == 0) {
          this.getTagList();
        }
      },
      async audit(e, e1) {
        /*审核订单*/
        if (this.roleType != 6 || e1 == 2) {
          return;
        }
        const jquery = {
          orderSn: e
        }
        const josn = await api.orderAudit(jquery);
        if (josn.imei_error_code == 0) {
          this.$alert('审核订单成功', '', {
            confirmButtonText: '确定',
            callback: action => {
              this.getOrderList({
                page: this.orderCurrentPage
              });
            }
          });
        }
      },
      // 获取沟通记录列表
      async CommunicationRecord(id) {
        this.CommunicationRecordId = id
        /* 沟通记录 */
        const jquery = {
          memberId: this.form.memberId,
          pageNo: this.NumberOfPages,
        }
        var Dates = await api.CommunicationDetails(jquery);
        this.CommunicationRecordList = this.CommunicationRecordList.concat(Dates.data.list);
        this.pageSicommunication = Dates.data.totalSize;
        this.setIscrooll(true)
      },
      // 获取沟通记录的发布
      async RecordRelease(text, id) {
        alert(text)
        const jquery = {
          memberId: this.form.memberId,
          content: text
        }
        await api.CommunicationRelease5(jquery);
        this.CommunicationRecord(id);
        this.release_input = "";
      },
      handleCurrentChange(val) {
        this.fet({
          page: val
        });
      },
      scrfun(e) {
        /*scroll事件动作*/
        const scrollDistance = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        const leg = this.order_cur_status ? (this.curData.length != this.pageSi) :
          (this.order_commodity_status ? (this.commodity_data.length != this.pageSiCom) :
            (this.order_correlation_status ? (this.correlation_data.length != this.pageSiCrr) :
              !this.order_correlation_status ? (this.CommunicationRecordList.length != this.pageSicommunication) : 0));

        // (this.order_correlation_status?(this.CommunicationRecordList.length!=this.pageSiCrr):0));

        if (scrollDistance == 0 && leg) {
          this.NumberOfPages++;
          this.CommunicationRecord();
          this.selectWrap.removeEventListener('scroll', this.scrfun, false);
        }
      },
      scrolles() { /*绑定scroll事件*/
        var This = this;
        this.selectWrap.addEventListener('scroll', this.scrfun, false);
      },
      setIscrooll(o) { /*查询scroll状态是否正常运行*/
        this.selectWrap = document.querySelector('.user');
        var terval = setInterval(function () {
          this.selectWrap.scrollTop = this.scrollHeight - this.selectWrap.clientHeight;
          this.scrollHeight = this.selectWrap.scrollHeight;
          if (this.scrollHeight == this.selectWrap.scrollHeight) {
            this.scrolles();
            clearInterval(terval);
          }
        }.bind(this), 100)
      },
      handleSelectionChange(val, row) {
        /* this.relatedSelectData[this.relatedCurrentPage] = []; */
        this.multipleSelection = [];
        let arr = [];

        for (let v of val) {
          arr.push(v.employeeId);
          /*  this.relatedSelectData[this.relatedCurrentPage].push(this.relatedList.indexOf(v)); */
        }

        this.memberFollowEmployeeIds = arr.join(',');
        this.multipleSelection = val;
      },
      /*   toggleSelection(rows) {
          console.log(rows);
          if (rows) {
            this.$nextTick(() => {
              rows.forEach(row => {
                this.$refs.relatedTable.toggleRowSelection(row, true);
              });
            })

          } else {
            this.$refs.relatedTable.clearSelection();
          }
        }, */
      /* 分页 */
      employeeCurrentChange(val) {
        this.getMeployeeList({
          page: val,
          keyWord: this.meployeeSearchWord
        });
      },
      relatedCurrentChange(val) {
        this.relatedCurrentPage = val;
        this.getMeployeeList({
          page: val,
          keyWord: this.relatedSearchWord,
          plural: true
        });
      },
      orderCurrentChange(val) {
        this.getOrderList(val);
      },
      planCurrentChange(val) {
        this.getPlanList(val);
      },
      showRow(row) { // 赋值给radio 
        /* this.employeeList.indexOf(row) */
        this.radioName = row.name;
        this.radio = row.employeeId;
      },
      tabAffair(e) {
        this.memberTypeId = e;
        this.search();
      },
      /* 搜索 */
      search() {
        this.fet({
          searchWord: this.searchWord,
          memberTypeId: this.memberTypeId
        });
      },
      searchEmployee() {
        this.getMeployeeList({
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
      save() {
        /* 新增客户 */
        if (this.title == "新增客户") {
          this.addMember();
        } else {
          this.updateMember();
        }
      },
      saveEmployee() {
        /* 管理员保存 */
        this.showEmployee = false;

        if (this.radio) {
          this.form.bizzPartnerName = this.radioName;
          this.form.belongEmployeeId = this.radio;
        }
      },
      saveEmployees() {
        /* 相关人保存 */
        this.showRelated = false;
        this.form.memberFollowEmployeeIds = this.memberFollowEmployeeIds;
      },
      showAddModal() {
        this.reset();
        this.title = "新增客户";
        this.status = true;
      },
      showDetailsModal(id) {
        this.memberDetail(id);
        this.form.memberId = id;
        this.getOrderList();
        this.getPlanList();
        this.CommunicationRecord();
        this.showDetails = true;
      },
      showEditModal(id) {
        this.memberDetail(id);
        this.title = "编辑客户详情";
        this.status = true;
      },
      close() {
        this.status = false;
      },
      /* 图片上传 */
      handleLogoSuccess(res, file) {
        this.addTag(1, res.data);
      },
      beforeLogoUpload(file) {
        /* const isJPG = file.type === 'image/jpeg' */
        const isLt2M = file.size / 1024 / 1024 < 1
        /* if (!isJPG) {
          this.$message.error('上传LOGO图片只能是 JPG 格式!')
        } */
        if (!isLt2M) {
          this.$message.error('上传LOGO图片大小不能超过 1MB!')
        }
        return isLt2M
      },
      selectTag(index, id) {
        this.tagList.forEach((v, num) => {
          if (index == num) {
            v.sign = true;
          } else {
            v.sign = false;
          }
        })

        this.tagLogo = this.tagList[index].logo;
        this.form.tagId = id;
      },
      unSelectTag(index) {
        this.tagList[index].sign = false;
        this.form.tagId = "";
      },
      reset() {
        this.form = {
          name: "",
          memberNo: "",
          mobilePhone: "",
          birthdayS: "",
          nativePlace: "",
          idNumber: "",
          medicalHistory: "",
          remark: "",
          sex: "1",
          address: "",
          memberFollowEmployeeIds: "",
          bizzPartner: '',
          bizzPartnerName: '',
          bizzPartnerId: '',
          tagId: '',
          jsonConnectMan: [],
          belongEmployeeId: ""
        }
        this.multipleSelection = [];
      }
    },
    created: function () {
      this.fet({
        page: 1
      });
      this.getMeployeeList({
        page: 1,
        init: true
      });
      this.getBizzpartnerList();
      this.getTagList();
      this.roleType = JSON.parse(getToken()).roleType;
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tag {
    background-color: #409eff;
    color: #fff;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    margin-left: 5px;
  }

  .tab-wrap {
    border-bottom: 1px solid #f8f8f8;
    overflow: hidden;
    li {
      float: left;
      margin: 0 25px;
      padding: 15px 0;
    }
    .active {
      color: #3096F8;
      border-bottom: 2px solid #3096F8;
    }
  }

  .upload {
    display: inline-block;
  }

  .tag-img {
    width: 36px;
    height: 17px;
  }

  .tag-wrap {
    height: 36px;
    .tag-img {
      vertical-align: middle;
      margin-bottom: 2px;
    }
  }

  .el-row {
    width: 400px;
  }

  .push {
    color: #409eff;
    cursor: pointer;
  }

  .sp-ml-20 {
    margin-left: 20px;
  }

  .sp-ml-16 {
    margin-left: 20px;
  }

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

  .hide {
    li {
      float: left;
      padding: 0 10px;
      cursor: pointer;
      color: #666;
      &.xs,
      &:hover {
        color: #3096f8;
      }
    }
  }

  .UserInfo {
    width: 100%;
    padding-bottom: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px #dddddd;
    box-sizing: border-box;
  }

  .UserInfo h3 {
    margin: 0;
    font-family: SourceHanSansCN-Medium;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }

  .UserInfo h3 span {
    margin-left: 3px;
    color: #deb48c;
  }

  .UserInfo h3 i {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 5px;
    overflow: hidden;
  }

  .imgs1 {
    background: url('../../images/xing1.png') no-repeat;
  }

  .imgs2 {
    background: url('../../images/xing2.png') no-repeat;
  }

  .UserInfo p {
    line-height: 0;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }

  /*  //右下：沟通记录  */

  .recording {
    width: 100%;
    /*  height: 530px; */
    background-color: #ffffff;
  }

  .recording>h3 {
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
    padding-left: 30px;
    margin: 0;
  }

  .recording .user {
    width: 100%;
    height: calc(75vh - 250px);
    ;
    background-color: #fff;
    overflow-y: scroll;
    box-sizing: border-box;
    overscroll-behavior: contain;
  }

  .recording ul li {
    width: 100%;
    margin-top: 15px;
    border-bottom: 1px solid #666;
    overflow: hidden;
    &:hover {
      color: #666666;
    }
  }

  .recording ul li>i {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    float: left;
    overflow: hidden;
    margin-right: 18px;
  }

  .recording ul li>i>img {
    width: 100%;
    height: 100%;
  }

  .recording ul li>div {
    width: 85%;
    float: left;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666;
  }

  .span3 {
    display: inline-block;
    margin-right: 10px;
    position: relative;
  }

  .span3::after {
    content: "";
    position: absolute;
    top: 0px;
    right: -10px;
    width: 2px;
    height: 17px;
    background-color: #dddddd;
  }

  .user_data {
    font-family: PingFang-SC-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }

  /* // 发布  */

  .release {
    width: 100%;
    height: 65px;
    background-color: #ffffff;
    box-shadow: 0px -1px 8px 0px rgba(102, 102, 102, 0.32);
    padding: 15px 12px 16px 30px;
    box-sizing: border-box;
    position: relative;
  }

  .release>div {
    position: relative;
    width: 99%;
    height: 36px;
    border: 1px solid #ddd;
  }

  .release>div input {
    width: 480px;
    height: 34px;
    width: 88%;
    border: solid 1px #dddddd;
    outline: none;
    border: none;
  }

  .release>div>span {
    width: 50px;
    height: 34px;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    right: 0px;
    text-align: center;
    line-height: 34px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3096f8;
    border-left: solid 1px #dddddd;
  }

  /* // // 复制一直到结束 */

  .pl30 {
    padding-left: 30px;
  }

  .SubPlanBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(102,
    102, 102, 0.42);
    z-index: 9;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
  }

  .SubPlanBox_eq {
    width: 590px;
    height: 473px;
    background-color: #ffffff;
    border: solid 3px #666666;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    position: relative;
    cursor: default;
  }

  .SubPlanBox_eq .i3 {
    position: relative;
    top: 50%;
    right: 20px;
    transform: translateY(-50%)
  }

  .SubPlanBox_eq textarea {
    width: 429px;
    height: 99px;
    border: solid 1px #dddddd;
    box-sizing: border-box;
    padding: 10px 6px 20px 10px;
  }

  .SubPlanBox_eq>h3 {
    padding-left: 30px;
  }

  .uls .lis {
    position: relative;
    left: -16px;
  }

  .uls .lis span:nth-child(1) {
    position: relative;
    top: -75px;
  }

  .SubPlanBox_eq .date {
    width: 209px;
    height: 34px;
  }

  .SubPlanBox_eq .inputs {
    width: 236px;
    height: 34px;
    margin-left: 7px;
  }

  .SubPlanBox_eq .inputs2 {
    width: 264px;
    margin-left: 36px;
    margin-right: 15px;
  }

  .SubPlanBox_eq .divs {
    margin-top: 15px;
  }

  .SubPlanBox_eq .Button {
    position: absolute;
    right: 46px;
    bottom: 30px;
  }

  .ps span {
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }

  .information ul li.cur {
    position: relative;
    top: -1px;
  }

  .order .el-table td:nth-child(3) div,
  .order .el-table td:nth-child(4) div {
    color: #e03a3a !important;
  }

  .order .teamwork-tc .el-table td:nth-child(3) div,
  .order .teamwork-tc .el-table td:nth-child(4) div {
    color: #606266 !important;
  }

  .teamwork-curlist {
    padding: 0 30px;
    height: 74%;
    height: calc(100% - 220px);
    height: -webkit-calc(100% - 220px);
    overflow: auto;
  }

  .commodity-det {
    padding: 0 30px;
    height: 74%;
    height: calc(100% - 165px);
    height: -webkit-calc(100% - 165px);
    overflow: auto;
  }

  .correlation-det {
    padding: 0 30px;
    height: 74%;
    height: calc(100% - 220px);
    height: -webkit-calc(100% - 220px);
    overflow: auto;
  }

  .teamwork.order .teamwork-tc .teamwork-text .teamwork-text-nr {
    padding: 16px 0;
    height: 60%;
    height: calc(100% - 246px);
    height: -webkit-calc(100% - 246px);
    overflow-y: auto;
  }

  .component {
    margin: 15px;
    padding: 15px;
    background: #fff;
  }

  .feel-input {
    width: 248px;
    margin-left: 10px;
  }

  .time-input {
    width: 140px;
  }

  .hide li {
    float: left;
    padding: 0 10px;
    cursor: pointer;
    color: #666;
  }

  .hide li.xs,
  .hide li:hover {
    color: #3096f8;
  }

  .statusActive {
    color: #3096f8;
  }

  .order-ul li {
    margin-top: 4px;
  }

  .order-ul li:first-child {
    margin-top: 0px;
  }

  .bk {
    margin-top: 10px;
  }

  .bk:first-child {
    margin-top: 0px;
  }

  .xgr .el-table__header-wrapper {
    padding-bottom: 5px;
  }

  .xgr .el-table--enable-row-transition .el-table__body td,
  .xgr .el-table td,
  .xgr .el-table th.is-leaf {
    padding: 0px !important;
    border-bottom: none !important;
  }

  .xgr .el-table--enable-row-transition .el-table__body td {
    padding: 5px 0 !important;
  }

  .xgr .el-table--enable-row-transition .el-table__body td>div {
    height: 32px;
    line-height: 32px;
  }

  .xgr .el-table::before {
    background: 0;
  }

  .teamwork-order-li {
    background: #f8f8f8;
    margin-top: 10px;
  }

  .teamwork-order-li:nth-child(2) {
    margin-top: 0px;
  }
</style>
