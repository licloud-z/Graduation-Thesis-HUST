<template>
  <div class="home">
    <!-- <vue-chart-hello/> -->
    <basic-info/>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicInfo from '@/views/CheckCom.vue'
// import VueChartHello from '@/views/ModuleView3InitNew.vue'

export default {
  name: 'HomeView',
  data() {
    return{
      file_path: '/',
    }
  },
  components: {
    BasicInfo,
    // VueChartHello,
  }
}
</script>
