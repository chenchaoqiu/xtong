<template>
  <div class="component">
    <div class="hide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">合作商查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="searchWord" placeholder="请输入 合作商名称"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
      </div>
    </div>

    <div class="hide" style="margin: 8px 0;">
      <!--需求操作-->
      <el-button @click="businessman" class="fl" type="primary">创建合作商</el-button>
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table v-loading="loading" :data="dataList" border style="width: 100%">
        <el-table-column prop="name" label="合作商名称" min-width="180"></el-table-column>
        <el-table-column prop="totalMemberNum" label="累计客户推荐数" min-width="200"></el-table-column>
        <el-table-column prop="totalOrderMoney" label="累计成交金额" min-width="150"></el-table-column>
        <el-table-column prop="address" label="操作" min-width="320">
          <template slot-scope="scope">
            <el-button @click="compile(scope.row,scope.$index)" class="fl" tab-btn type="primary">编辑</el-button>
            <!-- @click="PartnerViewShows()" -->
            <el-button @click="examine(scope.row,scope.$index)" class="fl" tab-btn tab-bg='green' type="primary" style="margin-left: 13px;" >查看</el-button>
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

    <!--创建合作商-->
    <div v-if="status" class="teamwork">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text">
          <p class="teamwork-text-title">
            <i fo-size='18'>创建合作商</i>
            <i @click="colsee" class="fr"><svg-icon icon-class="x" /></i>

          </p>
          <div class="teamwork-text-nr">
            <el-form class="login-form" autoComplete="off" :model="Dates" ref="loginForm" label-position="left">
              <el-form-item>
                <span fo-size='16' class="fl">合作商名称</span>
                <el-input maxlength="15" fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;" name="name" type="text" v-model="Dates.name" autoComplete="off" placeholder="请输入合作商名称" />
              </el-form-item>
              <el-form-item>
                <span fo-size='16' class="fl">合作商地址</span>
                <el-input maxlength="30" fo-size='14' size="small" class="fl" style="width:433px;margin-left: 20px;" name="name" type="text" v-model="Dates.address" autoComplete="off" placeholder="请输入地址" />
              </el-form-item>
              <el-form-item>
                <span style="width: 79px;text-align: right" fo-size='16' class="fl">类型</span>
                <el-cascader placeholder="常规合作商" style="width:433px;margin-left: 20px;" :options="options" @change="handleChange"></el-cascader>
              </el-form-item>
              <el-form-item>
                  <span fo-size='16' class="fl">渠道对接人</span>
                  <div style="margin-left: 20px;font-size: 16px;" class="fl">
                    <el-button @click="newList" type="text">新建</el-button>
                      <div v-for="(item,index) in Dates.linkmanList" class="buttcur">
                        <i>对接人{{index+1}}</i>
                        <el-input maxlength="5" fo-size='14' size="small" style="width: 83px;margin: 0 14px;" name="name" type="text" v-model="item.name" autoComplete="off" placeholder="名称" />
                        <el-input maxlength="11" fo-size='14' size="small" style="width: 125px;" name="name" type="text" v-model="item.mobilePhone" autoComplete="off" placeholder="手机号码" />
                        <el-button @click="deletes(index)" style="margin-left: 17px;height: 34px;" type="info">删除</el-button>
                      </div>
                  </div>
              </el-form-item>
              <!--备注-->
              <el-form-item>
                <span style="width: 79px;text-align: right" fo-size='16' class="fl">备注</span>
                <el-input maxlength="150" class="fl" :autosize="{minRows: 4,maxRows: 6}" fo-size='14' style="width: 540px;margin-left: 20px;" name="name" type="textarea" v-model="Dates.remark" placeholder="暂无备注" />
              </el-form-item>
              <!--分成设置-->
              <el-form-item prop="name">
                <p t-size='18' style="margin-top: 0px;margin-bottom: 10px;">分成设置</p>
                <div class="hide money" style="line-height: 32px;">
                  <span fo-size='16' class="fl">订单金额可计提比例</span>
                  <el-input maxlength="6" fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;height: 32px;" name="name" type="text" v-model="Dates.orderEnableAchieveRate" autoComplete="off" placeholder="请输入可计提比例" />
                </div>
                <div class="hide money" style="line-height: 32px;">
                  <span fo-size='16' class="fl">订单金额分成占比</span>
                  <el-input maxlength="6" fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;height: 32px;" name="name" type="text" v-model="Dates.orderAchieveRate" autoComplete="off" placeholder="请输入可分成占比" />
                </div>
              </el-form-item>
              <!--体验卡项目设置-->
              <el-form-item prop="name">
                <p t-size='18' style="margin-top: 0px;margin-bottom: 10px;">体验卡项目设置</p>
                <div class="hide money" style="line-height: 32px;">
                  <span fo-size='16' class="fl">体验卡订单金额可计提比例</span>
                  <el-input fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;height: 32px;" name="name" type="text" v-model="Dates.experienceCardEnableAchieveRate" autoComplete="off" placeholder="请输入可计提比例" />
                </div>
                <div class="hide money" style="line-height: 32px;">
                  <span fo-size='16' class="fl">体验卡订单金额分成占比</span>
                  <el-input fo-size='14' size="small" class="fl" style="width: 165px;margin-left: 20px;height: 32px;" name="name" type="text" v-model="Dates.experienceCardAchieveRate" autoComplete="off" placeholder="请输入可分成占比" />
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div style="text-align: right;padding-right: 30px;">
            <el-button @click="colsee('ok')" type="primary">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 日期：2018年8月16日。 技术人员：张嘉威。内容：合作商查看 -->
    <!-- 合作商查看画布 -->
    <div class="PartnerView" v-if="PartnerViewShow">
        <div>
               <div class="PartnerView_title">
                <h4 >合作商详情
                    <span class="fr">
                      <i class="el-icon-close" @click="a()"></i>
                    </span>
                </h4>
              </div>
              <div class="information">
                    <ul>
                        <li>合作商名称： <span>{{Dates.name}}</span> </li>
                        <li>合作商地址： <span>{{Dates.address}}</span> </li>
                        <li>
                           <u> 渠道对接人：</u>
                          <div >
                              <p v-for="(item,index) in Dates.linkmanList" class="ps">
                              <span>对接人{{index +1}}</span>
                              <span>{{item.name}}</span>
                              <!-- <span>店长</span> -->
                              <span>{{item.mobilePhone}}</span>
                              </p>
                              <!-- <p>无</p> -->
                          </div>
                        </li>
                        <li>
                         <u> 备注：</u>
                            <span class="spans">{{Dates.remark}}</span>
                        </li>
                    </ul>
                    <div class="divs">
                        <h4>分成设置</h4>
                        <p>订单金额可计提比例： <span>{{Dates.orderEnableAchieveRate}}%</span> </p>
                        <p>订单金额分成占比： <span>{{Dates.orderAchieveRate}}%</span> </p>
                    </div>
                     <div class="divs">
                        <h4>体验卡项目设置</h4>
                        <p>体验卡订单金额可计提比例：<span>{{Dates.experienceCardEnableAchieveRate}}%</span> </p>
                        <p>体验卡订单金额分成占比： <span>{{Dates.experienceCardAchieveRate}}%</span> </p>
                    </div>
              </div>
              <div class="Buttons">
                    <el-button type="primary" class="anniu edit" @click="PartnerEditor()">编辑</el-button>
                    <!-- <el-button type="primary" class="anniu edit" @click="EditPage()">保存</el-button>                     -->
              </div>
        </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index'
  import {validateRatio,validateRatioContinuous} from '@/utils/validate'
  export default {
    name: 'index',
    data() {
      return {
          Dates:{
            name:'',
            type:0
          },
        dataList: [], /* 接口返回来的数据[{}]*/
        currentPage: 1, /* 分页定位到第几页*/
        total: 1, /* 总条数*/
        pageSize: api.pageSize, /* 一页多少条数据*/
        searchWord: '',
        loading:true,
        status:false,
        index:'',/*编辑下标*/
        ck:{close(){}},/*弹窗监控*/
        options:[{value:0,label:'常规合作商'},{value:1,label:'系统直客类型'}],
        PartnerViewShow:false,
        seo:[],
      }
    },
    components: {

    },
    computed: {

    },
    watch:{
      'Dates.orderEnableAchieveRate'(e){
        this.$nextTick(function () {
          if(!validateRatio(e*1)){
            this.Dates.orderEnableAchieveRate=this.seo[0];
            return;
          }
          this.Dates.orderEnableAchieveRate=validateRatioContinuous(e);
          this.seo[0]=validateRatioContinuous(e);
        });
      },
      'Dates.orderAchieveRate'(e){
        this.$nextTick(function () {
          if(!validateRatio(e*1)){
            this.Dates.orderAchieveRate=this.seo[1];
            return;
          }
          this.Dates.orderAchieveRate=validateRatioContinuous(e);
          this.seo[1]=validateRatioContinuous(e);
        });
      },
      'Dates.experienceCardEnableAchieveRate'(e){
        this.$nextTick(function () {
          if(!validateRatio(e*1)){
            this.Dates.experienceCardEnableAchieveRate=this.seo[2];
            return;
          }
          this.Dates.experienceCardEnableAchieveRate=validateRatioContinuous(e);
          this.seo[2]=validateRatioContinuous(e);
        });
      },
      'Dates.experienceCardAchieveRate'(e){
        this.$nextTick(function () {
          if(!validateRatio(e*1)){
            this.Dates.experienceCardAchieveRate=this.seo[3];
            return;
          }
          this.Dates.experienceCardAchieveRate=validateRatioContinuous(e);
          this.seo[3]=validateRatioContinuous(e);
        });
      }
    },
    methods: {
      handleChange(e){
        this.Dates.type=e[0];
      },
      businessman(){
        /*创建合作商*/
        var obj={linkmanList:[],type:0};
        this.Dates=obj;
        this.status=true;
      },
      colsee(e){
        /*关闭弹框，保存关闭e：ok*/
        if(e=='ok'){
            if(this.Dates.bizzPartnerId>=0){
              this.modifyBizzpartner();
            }else{
              this.addBizzpartner();
            }
        }else{
            this.status=false;
        }
      },
      deletes(e){
          /*删除对接人*/
        let linkval=this.Dates.linkmanList;
        linkval.splice(e,1);
      },
      newList(){
        /*新建对接人*/
          let linkval=this.Dates.linkmanList;
            linkval.forEach(function (c) {
              if(c.name=='' || c.mobilePhone.length!=11){
                this.ck.close();
                this.ck=this.$message({message:'请输入正确的对接人信息！',type:'error'});
                linkval = false;
                return ;
              }
            }.bind(this))
          if(linkval){
            this.Dates.linkmanList.push({mobilePhone:'',name:''});
          }
      },
      examine(e,ind){
          /*查看*/
          this.Dates=e;
          // this.status=true;
          this.PartnerViewShow=true;
          this.index=ind;
          console.log(this.Dates)
      },
      a(){
          this.PartnerViewShow=false;
      },
      compile(e,ind){
          /*编辑*/
          this.Dates=e;
          this.status=true;
          this.index=ind;
      },
      async addBizzpartner(e) {
        this.loading=true;
        /* 新增合作商*/
        const jquery = {
          name: this.Dates.name || '',
          address: this.Dates.address || '',
          type: this.Dates.type>=0?this.Dates.type : '',
          orderEnableAchieveRate:this.Dates.orderEnableAchieveRate || '100',
          orderAchieveRate: this.Dates.orderAchieveRate || '100',
          remark: this.Dates.remark || '',
          linkmanList: this.Dates.linkmanList || '',
          experienceCardEnableAchieveRate:this.Dates.experienceCardEnableAchieveRate || '100',
          experienceCardAchieveRate:this.Dates.experienceCardAchieveRate || '100'
        }

        const josn = await api.addBizzpartner(jquery)
        if(josn.imei_error_code==0){
          this.fet({ page: 1 });
          this.status=false;
        }
        this.loading=false;
      },
      async modifyBizzpartner(e) {
        this.loading=true;
        /* 修改合作商*/
        const jquery = {
          bizzPartnerId: this.Dates.bizzPartnerId || '',
          name: this.Dates.name || '',
          address: this.Dates.address || '',
          type: this.Dates.type>=0?this.Dates.type : '',
          orderEnableAchieveRate:this.Dates.orderEnableAchieveRate || '100',
          orderAchieveRate: this.Dates.orderAchieveRate || '100',
          remark: this.Dates.remark || '',
          linkmanList: this.Dates.linkmanList || '',
          experienceCardEnableAchieveRate:this.Dates.experienceCardEnableAchieveRate || '100',
          experienceCardAchieveRate:this.Dates.experienceCardAchieveRate || '100'
        }

        const josn = await api.modifyBizzpartner(jquery)
        if(josn.imei_error_code==0){
          this.fet({ page: 1 });
          this.status=false;
        }
        this.loading=false;
      },
      async fet(e) {
        this.loading=true;
        /* 接口对接*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          name: this.searchWord
        }
        const josn = await api.bizzPartnerPageList(jquery);
        this.dataList = josn.data.list;
        this.total = josn.data.totalSize;
        this.loading=false;
      },
      handleCurrentChange(val) {
        this.fet({ page: val });
        console.log(`当前页: ${val}`);
      },
      search() {
        this.fet({
          searchWord: this.searchWord
        })
      },
      PartnerEditor(){
        this.status=true;
        this.PartnerViewShow=false;
      }
    },
    mounted: function() {
      this.fet({ page: 1 });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fl{float: left;}
.fr{float: right;}
  .el-form-item{
    margin-bottom: 15px;
  }

  i{
    font-style: normal;
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



// 画布加标题
.PartnerView{
    width: 100%;
    height: 100%;
    background-color: rgba(6, 6, 6, .4);
    position: fixed;
    top: 0;
    left:0;
    z-index: 99;
  }

  .PartnerView>div{
    width: 734px;
    min-height: 765px;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border: 3px solid #666;
    border-radius: 5px;
  }
  .PartnerView_title{
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #666;
    box-sizing: border-box;
    line-height: 46px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 25px;
  }
  .PartnerView_title>h4{
    line-height: 56px;
    margin: 0;
    padding: 0;
  }


  // 内容
 .information{
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
  }
.information ul:nth-child(1){
  min-height: 250px;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
}
.information ul li{
  float: none;
  margin-bottom: 20px;
  overflow: hidden;
  color: #000;
  font-size: 16px;
  font-family:"微软雅黑";
  &:hover{
      color: #000;
    }
}
.information ul li>div{
   width: 545px;
  float: right;
  line-height: 10px;
  position: relative;
  top: -10px;
}

  u{
    text-decoration: none;
    width: 100px;
    text-align: right;
    display:inline-block;
    height: 100%;
  }
  .spans{
    width: 545px;
    float: right;
    display: inline-block;
  }
  .information p{
    display: block;
  }
.ps span{
  width: 100px;
  text-align: left;
  display: inline-block;
}
.ps span:nth-child(3){
  width:120px;
}

  //
  .divs{
    margin-top: 30px;
  }
  .divs span{color: #000;font-size: 18px}
  .divs>h4{
      margin: 0;
      padding: 0;
      line-height: 4px;
  }

  // 按钮
  .Buttons{
    position: absolute;
    right: 35px;
    bottom: 40px;
  }
</style>
