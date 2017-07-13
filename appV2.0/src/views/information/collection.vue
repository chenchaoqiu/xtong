<template>
  <!--收藏页面-->
  <div>
    <i-header title="收藏列表" class="vux-1px-b"></i-header>
    <Swipeout>
      <swipeout-item style="margin-bottom: 10px;"  transition-mode="follow">
        <div slot="right-menu" class="">
          <swipeout-button @click.native="onButtonClick('delete')" style="background: #e66280">
            <x-icon type="ios-trash-outline" size="30" style="fill: #fff"></x-icon>
          </swipeout-button>
        </div>
        <div slot="content" class="coll-content">
          <i-infor></i-infor>
        </div>
      </swipeout-item>
      <swipeout-item style="margin-bottom: 10px;" transition-mode="follow">
        <div slot="right-menu" class="">
          <swipeout-button @click.native="onButtonClick('delete')" style="background: #e66280" >
            <x-icon type="ios-trash-outline" size="30" style="fill: #fff"></x-icon>
          </swipeout-button>
        </div>
        <div slot="content" class="coll-content">
          <i-infor></i-infor>
        </div>
      </swipeout-item>
      <swipeout-item style="margin-bottom: 10px;"  transition-mode="follow">
        <div slot="right-menu" class="">
          <swipeout-button @click.native="onButtonClick('delete')" style="background: #e66280">
            <x-icon type="ios-trash-outline" size="30" style="fill: #fff"></x-icon>
          </swipeout-button>

        </div>
        <div slot="content" class="coll-content">
          <i-infor></i-infor>
        </div>
      </swipeout-item>
    </Swipeout>
  </div>
</template>

<script>
  import iHeader from '../../components/i-header.vue'
  import iInfor from './chird/i-infor'
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  export default {
    components: {
      iHeader,
      iInfor,
      Swipeout,
      SwipeoutButton,
      SwipeoutItem
    }
  }
</script>
