<template>
    <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
    <div>店铺主页

        <!--<foot-guide></foot-guide>-->
    </div>
</template>


<script>
import footGuide from '../../components/footer/footGuide'
export default {
    data() {
        return {

        }
    },
    methods: {},
    created() {
        // 先判断是否选择了门店 没有就跳转到appointmentShop

        // if()
    },
    components: {
        footGuide
    }

}
</script>
