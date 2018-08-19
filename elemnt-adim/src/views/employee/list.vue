<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">客户查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="keyWord" placeholder="请输入 手机号码/名称"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">
          <ul fo-size="16">
          </ul>
        </div>
      </div>
    </div>


    <div class="hide">
      <!--需求操作-->
      <el-button class="fl" type="primary" @click="add">新增员工</el-button>
      <el-button class="fl" type="primary">excel导出</el-button>
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="employeeId" label="员工编号" min-width="80"></el-table-column>
        <el-table-column prop="name" label="员工名称" min-width="100"></el-table-column>
        <el-table-column prop="departmentName" label="所属部门" min-width="200"></el-table-column>
        <el-table-column prop="roleTypeName" label="职位" min-width="250"></el-table-column>
        <el-table-column prop="mobilePhone" label="手机号码" min-width="100"></el-table-column>
        <el-table-column prop="takingWorkDate" label="入职时间" min-width="80"></el-table-column>
        <el-table-column prop="statusName" label="在职状态" min-width="80"></el-table-column>
        <el-table-column prop="" label="操作" min-width="320">
          <template slot-scope="scope">
            <el-button class="fl" tab-btn type="primary" @click="edit(scope.row.employeeId)">编辑</el-button>
            <el-button class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;"
                       @click="View(scope.row.employeeId)">查看
            </el-button>
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

    <el-dialog :title="formTitle" width="580px"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="dialogFormVisible"
               :before-close="closeDialog">
      <el-form :model="form" ref="form" label-width="120px" label-position="right" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input style="width:140px" v-model="form.name" maxlength ="5" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="移动电话" prop="mobilePhone">
          <el-input style="width:140px" v-model="form.mobilePhone" maxlength ="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="保密" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="">
          <el-date-picker
            v-model="form.birthdayS"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属部门" prop="departmentIds">
          <el-cascader
            v-model="form.departmentIds"
            :options="department"
            :props="departmentProps"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="是否部门领导" prop="isLeaders">
          <el-switch v-model="form.isLeaders"></el-switch>
        </el-form-item>
        <el-form-item label="岗位" prop="roleType">
          <el-select v-model="form.roleType" placeholder="请选择">
            <el-option label="老板" value="1"></el-option>
            <el-option label="系统管理员" value="2"></el-option>
            <el-option label="计划员" value="3"></el-option>
            <el-option label="卖手" value="4"></el-option>
            <el-option label="客服" value="5"></el-option>
            <el-option label="财务人员" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在职状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="在职" value="0"></el-option>
            <el-option label="离职" value="1"></el-option>
            <el-option label="冻结" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" style="width:250px" v-model="form.password" maxlength ="6" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 日期：2018年8月16日。 技术人员：张嘉威。内容：员工查看 -->
    <!-- 员工查看画布 -->
    <div class="ViewCanvas" v-if="ViewCanvasShow">
      <div>
        <div class="ViewCanvas_title">
          <h3>查看员工详情
            <span class="fr" @click="closeView()"><i class="el-icon-close"></i></span>
          </h3>
        </div>
        <div class="information">
          <table>
            <tbody>
            <tr>
              <td class="tdr">姓名：</td>
              <td>{{iewData.name}}</td>
            </tr>
            <tr>
              <td class="tdr">移动电话：</td>
              <td>{{iewData.mobilePhone}}</td>
            </tr>
            <tr>
              <td class="tdr">性别：</td>
              <td v-if="iewData.sex == 0">保密</td>
              <td v-if="iewData.sex == 1">男</td>
              <td v-if="iewData.sex == 2">女</td>
            </tr>
            <tr>
              <td class="tdr">生日：</td>
              <td>{{birthday}}</td>
            </tr>
            <tr>
              <td class="tdr">所属部门：</td>
              <td>{{iewData.departmentName}}</td>
            </tr>
            <tr>
              <td class="tdr">岗位：</td>
              <td v-if="iewData.roleType==1">老板</td>
              <td v-if="iewData.roleType==2">系统管理员</td>
              <td v-if="iewData.roleType==3">计划员</td>
              <td v-if="iewData.roleType==4">卖手</td>
              <td v-if="iewData.roleType==5">客服</td>
              <td v-if="iewData.roleType==6">财务人员</td>
            </tr>
            <tr>
              <td class="tdr">在职状态：</td>
              <td v-if="iewData.status==0">在职</td>
              <td v-if="iewData.status==1">离职</td>
              <td v-if="iewData.status==2">冻结</td>
            </tr>
            <tr>
              <td class="tdr">登录密码：</td>
              <td>***************</td>
            </tr>
            </tbody>
          </table>
        </div>
        <el-button type="primary" class="anniu edit" @click="EditPage()">编辑</el-button>
      </div>
    </div>
  </div>
</template>


<script scoped>
  import api from '../../api/index'

  export default {
    name: 'index',
    data() {
      return {
        keyWord: '',
        dataList: [], /* 接口返回来的数据[{}]*/
        currentPage: 1, /* 分页定位到第几页*/
        total: 1, /* 总条数*/
        pageSize: api.pageSize, /* 一页多少条数据*/
        dialogFormVisible: false,
        passwordType: 'password',
        departmentProps: {'label': 'name', 'value': 'departmentId'},
        params: {},
        formTitle: '新增员工',
        birthday: '',
        form: {
          employeeId: '',
          name: '',
          mobilePhone: '',
          sex: '',
          birthdayS: '',
          departmentIds: [],
          departmentId: '',
          isLeaders: '',
          roleType: '',
          status: '',
          password: ''
        },
        department: [],
        rules: {
          name: [
            {required: true, message: '请输入员工名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '请输入移动电话', trigger: 'blur'},
            {min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur'}
          ],
          sex: [
            {required: true , message: '请选择性别', trigger: 'blur'}
          ],
          departmentIds: [
            {required: true, message: '请选择所属部门', trigger: 'blur'}
          ],
          roleType: [
            {required: true, message: '请选择岗位类型', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择在职状态', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur'}
          ]
        },
        ViewCanvasShow: false,
        ViewData:[],
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
          keyWord: this.keyWord,
          employeeId: this.employeeId > 0 ? this.employeeId : ''
        }
        const josn = await api.employeeGetList(jquery)
        this.dataList = josn.data.list
        this.total = josn.data.totalSize
      },
      handleCurrentChange(val) {
        this.fet({page: val})
      },
      tabAffair(e) {
        this.search()
      },
      search() {
        this.fet({
          page: this.currentPage,
          keyWord: this.keyWord
        })
      },
      async getDeapartment() {
        const json = await api.departmentGetTreeList({})
        this.department = json.data
      },
      closeDialog() {
        this.resetForm('form')
        this.dialogFormVisible = false
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          } else {
            this.doHandler()
          }
        })
      },
      async resetForm(formName) {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields()
        }
        this.form.employeeId = ''
        this.form.name = ''
        this.form.mobilePhone = ''
        this.form.sex = ''
        this.form.birthdayS = ''
        this.birthday = ''
        this.form.departmentId = ''
        this.form.isLeaders = ''
        this.form.isLeaders = ''
        this.form.status = ''
        this.form.password = ''
      },
      async doHandler() {
        this.params = this.form
        this.params.departmentId = this.form.departmentIds[this.form.departmentIds.length - 1]
        this.params.isLeader = this.form.isLeaders ? 1 : 0
        this.params.birthdayS = this.form.birthdayS || ''
        if (this.form.employeeId && this.form.employeeId > 0) {
          this.params.change = this.form.password ? 1 : 0
          const result = await api.employeUpdate(this.form)
          if (result.imei_error_code === 0) {
            this.fet({ page: this.currentPage })
            this.$alert('编辑员工成功', '提示')
            this.resetForm('form')
            this.dialogFormVisible = false
          }
        } else {
          const result = await api.employeeAdd(this.form)
          if (result.imei_error_code === 0) {
            this.$alert('添加成功', '提示')
            this.fet({ page: this.currentPage })
            this.resetForm('form')
            this.dialogFormVisible = false
          }
        }
      },
      async add() {
        this.getDeapartment()
        this.rules.password = [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur'}
        ]
        this.formTitle = '新增员工'
        this.dialogFormVisible = true
        console.log('birthdayS',this.form.birthdayS,'birthday',this.birthday)
      },
      async edit(id) {
        this.getDeapartment()
        const json = await api.employeeDetail({employeeId: id})
        const data = json.data
        // this.form = json.data
        console.log(data)
        this.form.employeeId = data.employeeId
        this.form.name = data.name
        this.form.mobilePhone = data.mobilePhone
        this.form.sex = data.sex + ''
        this.form.isLeaders = data.isLeader === 1
        this.form.roleType = data.roleType + ''
        this.form.status = data.status + ''
        this.form.birthdayS = data.birthday
        this.form.departmentIds = data.departmentIds
        // 编辑的时候不需要密码
        this.rules.password = {}
        this.formTitle = '编辑员工'
        this.dialogFormVisible = true
        console.log('birthdayS',this.form.birthdayS,'birthday',this.birthday)
      },
      /* 查看 */
      async View(id) {
        const json = await api.employeeDetail({employeeId: id})
        const data = json.data;
        this.iewData = data;

        this.birthday = data.birthday
        this.form.departmentIds = data.departmentIds
        // 编辑的时候不需要密码
        this.rules.password = {}
        this.ViewCanvasShow = true;
        // this.formTitle = '编辑员工'
        // console.log(this.form)
        console.log('birthdayS',this.form.birthdayS,'birthday',this.birthday)
      },
      closeView() {
        this.resetForm('form')
        this.ViewCanvasShow = false;
      },
      EditPage() {
        this.ViewCanvasShow = false;
        // this.dialogFormVisible = true
        this.edit(this.form.employeeId)
      }
    },
    created: function () {
      this.fet({page: 1})
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fl {
    float: left;
  }

  .fr {
    float: right;
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

  li {
    float: left;
    padding: 0 10px;
    cursor: pointer;
    color: #666;
    &.xs, &:hover {
      color: #3096f8;
    }
  }

  .ViewCanvas {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    font-family: "微软雅黑";
  }

  .ViewCanvas > div {
    width: 590px;
    min-height: 620px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 3px solid #666;
    border-radius: 5px;
  }

  .ViewCanvas_title {
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #666;
    box-sizing: border-box;
    line-height: 46px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 25px;
  }

  .ViewCanvas_title > h3 {
    line-height: 56px;
    margin: 0;
    padding: 0;
  }

  .information {
    padding-left: 30px;
    box-sizing: border-box;
  }

  .information table tbody {
    font-size: 16px;
    color: #333;
  }

  .information table tbody > tr {
    height: 35px;
  }

  .tdr {
    text-align: right;
    margin-right: 10px;
  }

  .edit {
    position: absolute;
    right: 50px;
    bottom: 31px;
  }
</style>
