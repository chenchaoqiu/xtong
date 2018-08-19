
<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <!--计划查询-->
        <div class="fl">专家查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="val" placeholder="请输入专家名称查询"></el-input>
        </div>
        <el-button @click="SearchExperts" class="fl" type="primary">搜索</el-button>
      </div>

    </div>
    <div class="hide" style="margin: 8px 0;">
      <!--需求操作-->
      <el-button @click="aletr('no')" class="fl" type="primary">新增专家</el-button>
    </div>

    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="tableData3" border style="width: 100%">
        <el-table-column prop="name" label="专家名称" min-width="180 "></el-table-column>
        <el-table-column prop="mobilePhone" label="手机号码" min-width="180"></el-table-column>
        <el-table-column prop="visitTypeValue" label="对外展现" min-width="350">
          <template slot-scope="scope">
            <el-button @click="zszj(scope.row.proficientId,1)" class="li" tab-btn :type="scope.row.isShow==1?'primary':'info'">是</el-button>
            <el-button @click="zszj(scope.row.proficientId,0)" class="li" tab-btn  :type="scope.row.isShow==0?'primary':'info'" style="margin-left: 13px;">否</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="230">
          <template slot-scope="scope">
            <el-button @click="looks(scope.row)" class="fl" tab-btn type="primary">查看</el-button>
            <el-button @click="aletr(scope.row,scope.$index)" class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;">编辑</el-button>
            <el-button @click="dele(scope.row.proficientId)" class="fl" tab-btn  type="danger" style="margin-left: 13px;">删除</el-button>
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

<!--新增，修改的弹框-->
    <div v-if="status" class="teamwork">
    <div class="teamwork-mb"></div>
    <div class="teamwork-tc">
      <div class="teamwork-text" style="height: 555px;width: 590px;">
        <p class="teamwork-text-title">
          <i fo-size='18'>编辑专家详情</i>
          <i @click="remols" class="fr"><svg-icon icon-class="x" /></i>
        </p>
        <div class="teamwork-text-nr">
          <el-form class="login-form" autoComplete="off" ref="loginForm" label-position="left">
            <el-form-item style="margin-bottom: 15px;">
              <span fo-size='16' class="fl">专家名称</span>
              <el-input maxlength="20" v-model="tcxx.name" fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;" name="name" type="text" autoComplete="off" placeholder="请输入专家名称" />
            </el-form-item>
            <el-form-item style="margin-bottom: 15px;">
              <span fo-size='16' class="fl">手机号码</span>
              <el-input maxlength="11" v-model="tcxx.mobilePhone" fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;" name="name" type="text" autoComplete="off" placeholder="请输入手机号码" />
            </el-form-item>
            <el-form-item>
              <span style="width: 66px;text-align: right" fo-size='16' class="fl">擅长项目</span>
              <el-input maxlength="70" v-model="tcxx.expertIn" class="fl" :autosize="{minRows: 4,maxRows: 6}" fo-size='14' style="width:410px;margin-left: 20px;resize: none;" name="name" type="textarea" placeholder="暂无备注" />
            </el-form-item>
            <el-form-item style="width: 73%;">
              <span fo-size='16' class="fl" style="margin-right: 20px;">专家头像</span>
              <el-upload
                name="image"
                class="upload-demo"
                :action="uploadImageUrl"
                :on-success="handlePreview1"
                :on-remove="handleRemove1"
                :file-list="fileList1"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item style="width: 73%;">
              <span fo-size='16' class="fl" style="margin-right: 20px;">专家介绍</span>
              <el-upload
                name="image"
                class="upload-demo"
                :action="uploadImageUrl"
                :on-success="handlePreview2"
                :on-remove="handleRemove2"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align: right;padding-right: 30px;">
          <el-button @click="remols('ok')" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
    <!--查看详情-->
    <div v-if="statuss" class="teamwork">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text" style="height: 555px;width: 590px;">
          <p class="teamwork-text-title">
            <i fo-size='18'>编辑专家详情</i>
            <i @click="remols" class="fr"><svg-icon icon-class="x" /></i>
          </p>
          <div class="teamwork-text-nr">
            <el-form class="login-form" autoComplete="off" ref="loginForm" label-position="left">
              <el-form-item style="margin-bottom: 15px;">
                <span fo-size='16' class="fl">专家名称</span>
                <span fo-size='16' class="fl" style="margin-left: 10px;">{{tcxx.name}}</span>
              </el-form-item>
              <el-form-item style="margin-bottom: 15px;">
                <span fo-size='16' class="fl">手机号码</span>
                <span fo-size='16' class="fl" style="margin-left: 10px;">{{tcxx.mobilePhone}}</span>
              </el-form-item>
              <el-form-item>
                <span style="width: 66px;text-align: right" fo-size='16' class="fl">擅长项目</span>
                <span fo-size='16' class="fl" style="margin-left:10px;width:410px;">{{tcxx.expertIn}}</span>
              </el-form-item>
              <el-form-item>
                <span style="width: 66px;text-align: right" fo-size='16' class="fl">专家头像</span>
                <img style="margin-left:10px;" class="fl" width="330" :src="tcxx.headImgUrl" />
              </el-form-item>
              <el-form-item>
                <span style="width: 66px;text-align: right" fo-size='16' class="fl">专家介绍</span>
                <img style="margin-left:10px;" class="fl" width="330" :src="tcxx.descriptionImgUrl" />
              </el-form-item>
            </el-form>
          </div>
          <div style="text-align: right;padding-right: 30px;">
            <el-button @click="remols" type="primary">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index'
  export default {
    name: 'index',
    data() {
      return {
          status:false,
        statuss:false,
        uploadImageUrl: api.url + '/api/pcadmin/common/uploadImage',
        fileList1: [{}],
        fileList2: [{}],
        val:'',/*计划查询*/
        value1: '',/*开始日期*/
        value2: '',/*结束日期*/
        tableData3:[],/*接口返回来的数据[{}]*/
        currentPage4: 1,/*分页定位到第几页*/
        total:5,/*总条数*/
        pageSize:api.pageSize,/*一页多少条数据*/
        tab_list:['全部','已申请','已设立','已完成','已关闭'],
        tcxx:{name:555,expertIn:'dsfafjdksjfidsfjisafjidsji打飞机哦撒娇覅殴打手机覅哦等级死哦飞机第三款缴费i哦啊见死豆腐激动撒缴费见倒萨 第三方姐啊'}
      }
    },
    components: {

    },
    computed: {

    },

    methods: {
      looks(e){
          this.tcxx=e;
          this.statuss=true;
      },
      async dele(e){
        const json=await api.proficientDelete({proficientId:e});
        this.fet({page:1});
      },
      async zszj(e,ind){
        const json=await api.proficientShow({proficientId:e,isShow:ind});
        this.fet({page:1});
      },
      async remols(e){
          if(this.statuss){
            this.statuss=false;
              return;
          }
          let json='';
          if(e=='ok'){
              if(this.tcxx.proficientId==undefined){
                let jquery={
                  name:this.tcxx.name || '',
                  mobilePhone:this.tcxx.mobilePhone || '',
                  expertIn:this.tcxx.expertIn || '',
                  descriptionImgUrl:this.fileList2!=''?this.fileList2[0].url : '',
                  headImgUrl:this.fileList1!=''?this.fileList1[0].url : ''
                };
                json=await api.proficientAdd(jquery);
              }else{
                let jquery={
                  proficientId:this.tcxx.proficientId,
                  name:this.tcxx.name,
                  mobilePhone:this.tcxx.mobilePhone,
                  expertIn:this.tcxx.expertIn,
                  descriptionImgUrl:this.fileList2[0].url,
                  headImgUrl:this.fileList1[0].url
                };
                json=await api.proficientModify(jquery);
              }
            this.fet({page:1});
          }
        if(json.imei_error_code==0 || e!='ok'){
          this.status=false;
        }
      },
      aletr(e,ind){
        this.fileList1=[];this.fileList2=[];this.tcxx={};
          if(e && e!='no'){
              this.tcxx=e;
              this.tcxx.index=ind;
              this.fileList2=[{name:'专家介绍',url:this.tcxx.descriptionImgUrl}]
              this.fileList1=[{name:'专家头像',url:this.tcxx.headImgUrl}]
          }
          console.log(this.tcxx)
          this.status=true;
      },
      handleRemove1(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview1(file, fileList) {
        this.fileList1=[{name:fileList.name,url:file.data}]
        this.tcxx.headImgUrl=file.data;
      },
      handleRemove2(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview2(file, fileList) {
        this.fileList2=[{name:fileList.name,url:file.data}]
        this.tcxx.descriptionImgUrl=file.data;
      },
      async fet(e){
          /*接口对接async await*/
          const jquery={
            pageNo:e.page || 1,
            pageSize:this.pageSize,
            keyWord:this.val || '',
          }
        const josn=await api.expertsList(jquery);
        this.tableData3=josn.data.list;
        this.total=josn.data.totalSize;
      },
      handleCurrentChange(val) {
        this.fet({page:val})
        console.log(`当前页: ${val}`);
      },
      //搜索事件
      SearchExperts(){
       this.fet({page:1});
      }
    },
    created:function () {
      this.fet({page:1})
    },


  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-table-column {
    background: red;
  }
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
