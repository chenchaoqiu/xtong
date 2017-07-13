<template>
  <!--四大项目-->
  <div class="project">
    <i-header :title="t" class="pr vux-1px-b">
      <div slot="right" class="pa" style="right: 15px;top: 0;display: flex;align-items: center;height: 100%">
        <x-icon type="ios-search-strong" size="24" style="fill: #e66280"></x-icon>
      </div>
    </i-header>
    <i-selector :shaixuan="true" >

    </i-selector>
    <div style="height: 200px"></div>
  </div>
</template>
<script>
  import iHeader from '../../components/i-header.vue'
  import iSelector from '../../components/i-selector.vue'
  const tList = ['面部美颜', '纤体塑形', '四季养生', '光电医学'];
  export default {
    data(){
      return {
        t: '面部补水',
      }
    },
    methods: {
      getRouter(){
        let query = this.$route.query.t || 0;
        this.t = tList[query];
      }
    },
    created(){
      this.getRouter()
    },
    components: {
      iHeader,
      iSelector
    }
  }
</script>
