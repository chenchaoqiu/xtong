<template>
  <div class="custom-tree-container">
    <div class="block">
      <p></p>
      <el-tree
        :data="data4"
        node-key="departmentId"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
        <!-- <el-button type="primary" class="anniu" @click="a()">确定</el-button>       -->
    </div>
    <!--添加/编辑的 黑色画布 -->
    <div class="canvas" v-if="editShow">
        <div class="edit">
            <p class="edit_title">
               部门
              <span class="fr" @click="editremove()">
                <i class="el-icon-close"></i>
              </span>
            </p>
            <div>
                <p><span>上级部门：</span><span>{{SuperiorName}}</span></p>
                <p>当前部门：</p>
                <p> 
                   <label>
                      <input type="text" v-model="titles" maxlength=10 >                    
                      <svg-icon icon-class="st1"/>
                   </label>
                </p>
                 <el-button type="primary" class="anniu" @click="determine(datas,titles)" v-if="AddTo">确定</el-button>
                 <el-button type="primary" class="anniu" @click="AddTos(datas,titles)" v-if="!AddTo">确定</el-button>
            </div>
        </div> 
    </div>
  </div>

</template>

<script>
import api from '../../api'
  let id = 1000;
  export default {
    data() {
      const data = [{
        id: 1,
        name: '全公司',
      }];
      
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data)),
        SuperiorName: "全公司" ,/*编辑和添加的上级名字*/
        titles:"",/*编辑名字*/
        editShow : false,
        datas:[],
        AddTo:true,
        arr:data,
        ParentId:0,
      }
    },
    created () {
      this.Systemdata()
    },
    methods: {
      /*测试函数*/
       a(){
           
      },


      /*使用后台接口，返回部门数据*/
     async Systemdata(){
         const json=await api.departmentGetTreeList();
         console.log(json)
          this.data4 =  json.data;
      },

      /*获取点击添加的数据*/
      append(data,o){
        this.datas = data;
        this.editShow = true;
        this.SuperiorName = data.name;          
      },
      
      /* 点击添加 触发这里函数*/
     async determine(data,titles,o){    
      //  console.log(data )
        if(titles == null){
           var  newChild = { id: id++, name: "运营部" , children: [] };
        }else{
           var  newChild = { id: id++, name:  titles , children: [] };
        }
        if (!data.children) {
              this.$set(data, 'children', []);
        }
        this.SuperiorName = data.name
        this.editShow = false;          
        this.AddTo = true;             
        data.children.push(newChild);

        /* 添加:调用接口*/
         var jquery={
          parentId : data.departmentId,
          name :   titles 
        }
        await api.AddDepartment(jquery);
        this.Systemdata();
        this.titles="";
      },


      /*点击修改当前的名字*/
      async changeName(node,data,o){
        this.ParentId = data.parentId
        this.editShow = true;    
        this.titles = data.name;
        this.AddTo = false;  
        this.datas = data;
        const json=await api.departmentGetTreeList();     
        console.log(json.data)
        this.ParentName(json.data,this.ParentId,)
      },
  
    ParentName(arr,id){
        var arr1 = [];
        for(var i = 0, l = arr.length; i < l; i++) {
              if(arr[i].departmentId == id){
                  this.SuperiorName = arr[i].name
              }else{
                if(arr[i].children){
                  this.ParentName(arr[i].children,id)
                }
              }
        }
    
    },


     async  AddTos(data,titles){
        this.titles="";
        this.AddTo = true;    
        this.editShow = false;   
        data.name =   titles ;  
        var jquery={
          departmentId : data.departmentId,
          name :   titles 
        }
        await api.ChangeName(jquery)
        this.Systemdata()        
      },

       /*点击删除  触发这里函数*/
      async remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.departmentId === data.departmentId);
        // console.log(data.departmentId)
        children.splice(index, 1);
          var jquery={
              departmentId : data.departmentId,
            }
         await api.DeleteDepartment(jquery)
        this.Systemdata() 
      },
      editremove(){
          this.editShow = false;
          this.titles="";
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },


      // 这里是元素上下树
           // <el-button size="mini" type="text" on-click={ () => this.changeName(node, data, true) }><svg-icon icon-class="st1" /></el-button>
      renderContent(h, { node, data, store }) {
        if (data.departmentId == 0){
          return (
            <span class="custom-tree-node">
            <span>{data.name}</span>
            <span >
             <el-button size="mini" type="text" on-click={ () => this.append(data,true) }><svg-icon  icon-class="sj"/></el-button>
             <el-button size="mini" type="text" on-click={ () => this.changeName(node, data, true) }><svg-icon icon-class="st1" /></el-button>
            </span>
            </span>);
        }else {
          return (
            <span class="custom-tree-node">
            <span>{data.name}</span>
          <span >
            <el-button size="mini" type="text" on-click={ () => this.append(data) }><svg-icon  icon-class="sj"/></el-button>
            <el-button size="mini" type="text" on-click={ () => this.changeName(node, data) }><svg-icon icon-class="st1" /></el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }><svg-icon icon-class="sg" /></el-button>
            </span>
            </span>);
        }


      }
    }
  }
</script>

<style scoped>
p{
  margin: 0;
  padding: 0;
}
.fl{float: left;}
.fr{float: right;}
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    display: inline-block;
  }
  .canvas{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5)
  }
  .edit{
    width: 390px;
    height: 250px;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border: 3px solid #5d5d5d;
    border-radius: 5px;
  }
  .edit_title{
    width: 100%;
    height: 60px;
    background-color: #ccc;
    padding-left: 30px;
    padding-right: 17px;
    box-sizing: border-box;
    font: 20px/60px "黑体";
    margin-bottom: 20px;
  }
  .edit>div{
    width: 100%;
    padding-left: 120px;
  }
  .edit>div>p{
     margin-bottom: 15px;
  }
  .edit>div input{
      outline: none;
      border: none;
  }
  .anniu{
    width: 100px;
    height: 38px;
    margin-left: 23px;
  }
</style>
