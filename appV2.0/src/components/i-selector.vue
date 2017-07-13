<template>
  <!--下拉组件 可重用性差 待改-->
  <!--下拉选择-->
  <div class="pull-down pr vux-1px-b">
    <div class="pull-down-box">
      <!--综合排序-->
      <div class="p15" @click="comprehensive($refs.box,$refs.inbox,$refs.xi,zhtext,$refs.xi2)" :class="{act:act=='0'}">
        <span>{{zhtext}}</span>
        <x-icon type="chevron-down" size="10" :style="{fill:fill1}" style="transition: all .3s" ref="xi"></x-icon>
      </div>
      <!--全部项目-->
      <div v-if="!md" class="p15" @click="allPro($refs.box2,$refs.inbox2,$refs.xi3,qbtext,$refs.xi3)"
           :class="{act:act=='3'}">
        <span>{{qbtext}}</span>
        <x-icon type="chevron-down" size="10" :style="{fill:fill2}" style="transition: all .3s" ref="xi3"></x-icon>
      </div>
      <!--销量-->
      <div v-if="md" class="p15" @click="sales($refs.box,$refs.inbox,$refs.xi,$refs.xi2)" :class="{act:act=='1'}">销量优先
      </div>
      <!--价格-->
      <div class="p15 span-price" @click="priceClick($refs.box,$refs.xi,$refs.xi2)" :class="{act:act=='2'}">
        <span>价格</span>
        <x-icon ref="xi2" type="android-arrow-dropdown" size="20" :style="{fill:fill2}"   style="transition: all .3s"></x-icon>
      </div>
      <!--筛选-->
      <div class="p15" v-if="shaixuan" style="display: flex;align-items: center">
        <span>筛选</span>
        <svg style="width:18px;height:18px" viewBox="0 0 24 24">
          <path fill="#999"
                d="M3,2H21V2H21V4H20.92L15,9.92V22.91L9,16.91V9.91L3.09,4H3V2M11,16.08L13,18.08V9H13.09L18.09,4H5.92L10.92,9H11V16.08Z"/>
        </svg>
      </div>
    </div>
    <!--弹出-->
    <div class="pa shop-xl" ref="box">
      <div class="slt container" ref="inbox">
        <div v-for="(item,i) in zhList" class="vux-1px-b" @click="comprehensive($refs.box,$refs.inbox,$refs.xi,item)">
          <span :class="{act:zhtext==item}">{{item}}</span>
          <span class="sdf" v-show="zhtext==item">
            <x-icon type="ios-checkmark-empty" :style="{fill:fill1}"></x-icon>
          </span>
        </div>
        <!--下拉内容-->
        <slot name="sel-con"></slot>
      </div>
    </div>
    <!--全部项目-->
    <div class="pa shop-xl" ref="box2">
      <div class="slt container" ref="inbox2">
        <div v-for="(item,i) in qbList" class="vux-1px-b" @click="allPro($refs.box2,$refs.inbox,$refs.xi,item)">
          <span :class="{act:qbList==item}">{{item}}</span>
          <span class="sdf" v-show="qbList==item">
            <x-icon type="ios-checkmark-empty" :style="{fill:fill1}"></x-icon>
          </span>
        </div>
        <!--下拉内容-->
        <slot name="sel-con"></slot>
      </div>
    </div>
    <!--弹出下拉-->
  </div>
</template>
<script>
  //  const zhList =['综合排序','最受欢迎','最新上价'];
  //  const xlList =[''];//销量列表
  export default{
    props: [
      'shaixuan',// 筛选显示
      'md',      // 是否门店
    ],
    data(){
      return {
        zh: false,
        zhclick: true,
        qbclick:true,
        zhtext: '综合排序',
        qbtext:'全部项目',
        act: '0',
        heightbox: 0,
        heightbox2: 0,
        fill1: '#e66280',//综合排序
        fill2: '#999',   //价格
        picclk: true,
        flag: true,
        zhList: ['综合排序', '最受欢迎', '最新上价'],// 综合排序
        qbList: [],//销量
      }
    },
    methods: {
      //综合排序
      comprehensive(box, inbox, xi, text, x2){
        this.zhtext = text;
        this.fill1 = '#e66280';
        this.fill2 = '#999';
        this.act = '0';
        x2.style.transform = 'rotate(0deg)';// 旋转
        this.flag = true;
        if (!this.heightbox) {
          this.heightbox = inbox.offsetHeight;                 // 下拉的高度
        }
        if (this.zhclick) {
          box.style.height = this.heightbox + 'px';
          xi.style.transform = 'rotate(-180deg)';
          this.zhclick = !this.zhclick
        } else {
          box.style.height = 0;
          xi.style.transform = 'rotate(0deg)';  // 旋转
          this.zhclick = !this.zhclick
        }
      },
      allPro(box, inbox, xi, text, x2){
        this.qbtext = text;
        this.fill1 = '#e66280';
        this.fill2 = '#999';
        this.act = '0';
        x2.style.transform = 'rotate(0deg)';// 旋转
        this.flag = true;
        if (!this.heightbox2) {
          this.heightbox2 = inbox.offsetHeight;                 // 下拉的高度
        }
        if (this.qbclick) {
          box.style.height = this.heightbox2 + 'px';
          xi.style.transform = 'rotate(-180deg)';
          this.qbclick = !this.qbclick
        } else {
          box.style.height = 0;
          xi.style.transform = 'rotate(0deg)';  // 旋转
          this.qbclick = !this.qbclick
        }
      },
      // 销量
      sales(box, inbox, xi, x2){
        this.act = '1';
        box.style.height = 0;
        this.fill1 = '#999';
        this.fill2 = '#999';
        this.zhclick = true;
        this.flag = true;
        xi.style.transform = 'rotate(0deg)';  // 旋转
        x2.style.transform = 'rotate(0deg)';// 旋转
      },
//      价格
      priceClick(box, xi, x2){
        box.style.height = 0;
        this.zhclick = true;
        this.act = '2';
        this.fill2 = '#e66280';
        this.fill1 = '#999';
        xi.style.transform = 'rotate(0deg)';//
        if (this.picclk) { //向上排序
          if (this.flag) {
            this.flag = false;
            return;
          }
          x2.style.transform = 'rotate(-180deg)';// 旋转
          this.picclk = false;
        } else { // 向下排序
          x2.style.transform = 'rotate(0deg)';// 旋转
          this.picclk = true
        }


      }
    },
    computed: {
      getMd: function () {
        if (!this.md) {
          this.qbList = ['全部项目', '面部美容', '纤体塑性', '四季养生', '光电医学'];
          return this.zhList = ['综合排序', '距离最近', '特惠中', '评价', '最新上架', '销量优先']
        }
      }
    },
    created(){
      this.getMd
    }
  }
</script>
<style scoped lang="less">
  @cl: #e66280;
  /*下拉组件*/
  .pull-down {
    height: 44px;
    background: #fff;
    line-height: 44px;
    color: #999;
    font-size: 15px;
    .pull-down-box {
      display: flex;
      justify-content: space-between;
    }
    .span-price {
      display: flex;
      align-items: center;
    }
    .p15 {
      padding: 0 15px;
    }
    .shop-xl {
      height: 0;
      overflow: hidden;
      transition: all .3s;
      width: 100%;
      z-index: 999;
      top: 44px;
      left: 0;
    }
    .sdf {
      display: flex;
      align-items: center;
    }
    .slt {
      background: #fff;
      > div {
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .act {
    transition: all .3s;
    color: @cl;
  }
</style>
