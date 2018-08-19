<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">项目查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="searchWord" placeholder="请输入项目名称"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">品项类型：</div>
        <div class="fl">
          <ul fo-size="16">
            <li :class="categoryId==''?'xs':''" @click="tabAffair('')">全部</li>
            <li :class="item.categoryId==categoryId?'xs':''" v-for="item in categoryList" @click="tabAffair(item.categoryId)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hide">
      <!--需求操作-->
      <el-button @click="businessman" class="fl" type="primary">新增项目</el-button>
      <!--<el-button @click="businessman" class="fl" type="primary">创建合作商</el-button>-->
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="oldDataList" border style="width: 100%">
        <el-table-column prop="projectSn" label="项目编号" min-width="120"></el-table-column>
        <el-table-column prop="name" label="项目名称" min-width="250"></el-table-column>
        <el-table-column prop="price" label="产品售价" min-width="100"></el-table-column>
        <el-table-column prop="marketPrice" label="产品市场价" min-width="100"></el-table-column>
        <!--<el-table-column prop="saleStatus" label="上架状态" min-width="250">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">上架</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)">下架</el-button>
          </template>
        </el-table-column>-->
        <el-table-column prop="" label="操作" min-width="320">
          <template slot-scope="scope">
            <el-button @click="compile(scope.row,scope.$index)" class="fl" tab-btn type="primary">编辑</el-button>
            <el-button @click="examine(scope.row,scope.$index)" class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">查看</el-button>
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


    <!--创建项目+修改项目-->
    <div v-if="status" class="teamwork">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text">
          <p class="teamwork-text-title">
            <i fo-size='18'>{{title}}</i>
            <i @click="colsee" class="fr"><svg-icon icon-class="x" /></i>

          </p>
          <div class="teamwork-text-nr">
            <el-form class="login-form" autoComplete="on" :model="Dates" ref="addProjectForm" label-position="right">
              <el-form-item label="项目名称">
                <!--<span fo-size='16' class="fl">项目名称</span>-->
                <el-input fo-size='14' size="small" class="fl" style="width: 280px;margin-left: 20px;" name="name" type="text" v-model="Dates.name" :disabled="disabledInput" autoComplete="off" placeholder="请输入项目名称" />
              </el-form-item>
              <el-form-item label="项目副标题">
                <el-input fo-size='14' size="small" class="fl" style="width:280px;margin-left: 20px;" name="subTitle" type="text" v-model="Dates.subTitle" :disabled="disabledInput" autoComplete="off" placeholder="请输入项目副标题" />
              </el-form-item>
              <el-form-item label="项目编号">
                <el-input fo-size='14' size="small" class="fl" style="width: 365px;margin-left: 20px;" name="projectSn" type="text" v-model="Dates.projectSn" :disabled="disabledInput" autoComplete="off" placeholder="请输入项目编号" />
              </el-form-item >
              <el-form-item label="项目原价">
                <el-input fo-size='14' size="small" class="fl" style="width: 160px;margin-left: 20px;" name="marketPriceS" type="text" v-model="Dates.marketPrice" :disabled="disabledInput" autoComplete="off" placeholder="项目原价" />
              </el-form-item>
              <el-form-item label="项目现价">
                <el-input fo-size='14' size="small" class="fl" style="width: 160px;margin-left: 20px;" name="priceS" type="text" v-model="Dates.price" :disabled="disabledInput" autoComplete="off " placeholder="请输入项目现价" />
              </el-form-item>
              <el-form-item label="品项类型" >
                <el-select v-model="Dates.categoryId" placeholder="请选择品项类型" :disabled="disabledInput" style="margin-left: 20px;width: 160px" >
                  <el-option v-for="item in categoryList" :label="item.name" :key="item.categoryId" :value="item.categoryId"></el-option>
                  <!--<el-option label="区域二" value="beijing"></el-option>-->
                </el-select>
                <!--<el-cascader placeholder="品项类型" style="width:160px;margin-left: 20px;" :options="options" @change="handleChange"></el-cascader>-->
              </el-form-item>
            </el-form>
          </div>
          <div v-if="showSave" style="text-align: right;padding-right: 30px;">
            <el-button @click="colsee('ok')" type="primary">保存</el-button>
          </div>
          <div v-if="showSave1" style="text-align: right;padding-right: 30px;">
            <el-button @click="colsee('edit')" type="primary">保存</el-button>
          </div>
          <div v-if="showSure" style="text-align: right;padding-right: 30px;">
            <el-button @click="sure" type="primary">确定</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--查看项目-->
    <!--<div v-if="status1" class="teamwork teamwork2">
          <i fo-size='18'>{{title}}</i>
    </div>-->
  </div>
</template>

<script>
  import api from '../../api/index'
  export default {
    name: 'index',
    data() {
      return {
        searchWord: '',
        dataList: [], /* 接口返回来的数据[{}]*/
        oldDataList:[],
        currentPage: 1, /* 分页定位到第几页*/
        total: 1, /* 总条数*/
        pageSize: 20, /* 一页多少条数据*/
        categoryList: [],
        categoryId: 0,
        loading: true,
        Dates: {
          projectSn: '',
          name: '',
          subTitle: '',
          marketPriceS: '',
          priceS: '',
          region: '',
          categoryId: ''
        },
        title: '', // 项目名称
        disabledInput: false, // 是否禁用
        status: false,
        showSave:false,
        showSave1:false,
        showSure:false,
        index: '', /* 编辑下标*/
        ck: { close() {} }, /* 弹窗监控*/
        options: [{ value: 0, label: '常规合作商' }, { value: 1, label: '系统直客类型' }],
        fetPage:1,
      }
    },
    components: {

    },
    computed: {

    },
    methods: {
      handleChange(e) {
        this.Dates.type = e[0]
      },
      businessman() {
        /* 新建项目*/
        var obj = { linkmanList: [] }
        this.title = '新建项目'
        this.showSave = true
        this.showSave1 = false
        this.showSure = false
        this.disabledInput = false
        this.Dates = obj
        this.status = true
      },
      colsee(e) {
        /* 关闭弹框，保存关闭e：ok*/
        console.log(this.Dates)
        if (e == 'ok') {
          this.addProject()
        } else if (e == 'edit') {
          this.projectUpdate()
        }
        this.status = false
      },
      sure(){
         // 关闭弹框
        this.status = false
      },
      deletes(e) {
        /* 删除对接人*/
        const linkval = this.Dates.linkmanList
        linkval.splice(e, 1)
      },
      newList() {
        /* 新建对接人*/
        let linkval = this.Dates.linkmanList
        linkval.forEach(function(c) {
          if (c.name == '' || c.mobilePhone.length != 11) {
            this.ck.close()
            this.ck = this.$message({ message: '请把上面数据填完整哦！', type: 'error' })
            linkval = false
            return
          }
        }.bind(this))
        if (linkval) {
          this.Dates.linkmanList.push({ mobilePhone: '', name: '' })
        }
      },
      examine(e, ind) {
        this.title = '查看项目'
        /* 查看*/
        this.showSave = false
        this.showSave1 = false
        this.showSure = true
        this.Dates = e
        this.disabledInput = true// 禁用输入
        this.status = true
        this.index = ind
      },
      compile(e, ind) {
        /* 编辑*/
        this.title = '编辑项目'
        this.disabledInput = false
        this.showSave = false
        this.showSave1 = true
        this.showSure = false
        // this.Dates=e
        this.Dates=Object.assign({}, e) //这样就不会共用同一个对象
        this.status = true
        this.index = ind
      },
      async addProject(e) {
        this.loading = true
        /* 新增项目接口*/
        const jquery = {
          projectSn: this.Dates.projectSn || '',
          name: this.Dates.name || '',
          subTitle: this.Dates.subTitle || '',
          marketPriceS: this.Dates.marketPrice || '',
          priceS: this.Dates.price || '',
          categoryId: this.Dates.categoryId || ''
        }
        const josn = await api.addProject(jquery)
        if (josn.imei_error_code == 0) {
          this.loading = false
          this.fet({ page: this.fetPage })
        }
      },
      async projectUpdate(e) {
        this.loading = true
        /* 编辑项目接口*/
        const jquery = {
          projectId:this.Dates.projectId || '',
          projectSn: this.Dates.projectSn || '',
          name: this.Dates.name || '',
          subTitle: this.Dates.subTitle || '',
          marketPriceS: this.Dates.marketPrice || '',
          priceS: this.Dates.price || '',
          categoryId: this.Dates.categoryId || ''
        }
        const josn = await api.projectUpdate(jquery)
        if (josn.imei_error_code == 0) {
          this.loading = false
          this.fet({ page: this.fetPage })
        }
      },
      async fet(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          searchWord: this.searchWord,
          categoryId: this.categoryId > 0 ? this.categoryId : ''
        }
        const josn = await api.projectList(jquery)
        this.dataList = josn.data.list
        this.oldDataList = josn.data.list
        /*this.oldDataList = this.dataList.slice();*/
        this.total = josn.data.totalSize
      },
      handleCurrentChange(val) {
        this.fet({ page: val })
        this.fetPage = val
        console.log(`当前页: ${val}`)
      },
      tabAffair(e) {
        if(e == ''){
          this.categoryId = ''
        }else{
          this.categoryId = e
        }
        this.search()
      },
      search() {
        this.fet({
          searchWord: this.searchWord,
          categoryId: this.categoryId
        })
      },
      async initCategoryList() {
        const jquery = {
          pageNo: 1,
          pageSize: 100
        }
        const josn = await api.categoryList(jquery)
        this.categoryList = josn.data.list
      }
    },
    created: function() {
      this.initCategoryList()
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

  /*弹窗*/
  .teamwork{
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index: 2000;
    .teamwork-mb{
      opacity: .3;
      -moz-opacity: .3;
      filter: alpha(opacity=30);
      width:100%;
      height:100%;
      background: #000;
    }
    .teamwork-tc{
      position: fixed;
      left:0;
      top:0;
      width:100%;
      height:100%;
      overflow-y: auto;
      .teamwork-text{
        width:600px;
        height:40%;
        background: #fff;
        margin:30vh auto 5vh;
        border:3px solid #666666;
        border-radius: 5px;
        .teamwork-text-title{
          height:60px;
          line-height: 60px;
          border-bottom: 1px solid #f2f2f2;
          margin:0px;
          padding:0 30px;
          overflow: hidden;
          .svg-icon{
            margin-top: 22px;
          }
        }
        .teamwork-text-nr{
          padding: 20px 30px 40px;
          height:77%;
          height:calc(100% - 116px);
          height:-moz-calc(100% - 116px);
          height:-webkit-calc(100% - 116px);
          overflow-y: auto;
          .buttcur{
            margin-top: 15px;
            &:nth-child(2){
              margin-top: 0px;
            }
          }
          .money{
            margin-top: 15px;
            &:nth-child(2){
              margin-top: 0px;
            }
          }
        }
      }
    }
  }

  .teamwork-text{
    width:600px!important;
    height:500px!important;
  }
  .el-form-item{
    margin-bottom: 15px!important;
  }
  .teamwork-text-nr{
    padding: 15px 30px 30px;
  }
</style>
