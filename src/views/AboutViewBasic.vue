<template>
  <div class="home">
    <!-- <nav>
        <router-link to="/about/physics">文件系统物理结构展示</router-link> |
        <router-link to="/about/logic">文件系统逻辑结构展示</router-link>
    </nav> -->
    <div class="content">
      <div style="height: 50px;display: flex;">
        <router-link to="/about/physics" class="kongjian kongjian1">
          <div class="kongjian-txt kongjian-txt1">文件系统物理结构展示</div>
        </router-link>
        <router-link to="/about/logic" class="kongjian kongjian2">
          <div class="kongjian-txt kongjian-txt1">文件系统逻辑结构展示</div>
        </router-link>
      </div> 

      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import VueChartHello from '@/views/BarChart.vue'

export default {
  name: 'AboutViewBasic',
//   components: {
//     VueChartHello,
//   }
}
</script>

<style lang="scss" scoped>
.home {
  margin-top: 30px;
}

.kongjian {
  width: 700px;
  height: 50px;
  border-radius: 20px;
  // background-color: #f5222d;
  display: flex;
  flex-direction: row;
  margin: 20px;
  // margin-right: 70px;
  margin-right: 0px;
  margin-left: 0px;

  transition-duration: .5s;
  text-decoration: none;
  color: #2c3e50;
}

.kongjian:hover {
  -webkit-transform: scale(1.1);
}

.kongjian1 {
  margin-left: 43px;
  background: white;
  display: flex;
  flex-direction: row;
}

.kongjian2 {
  background: #FFF480;
  display: flex;
  flex-direction: row;
}

.kongjian-txt {
  
  // padding: 5px;
  width: 680px;
  height: 80px;
  margin-top: 10px;
  // display: flex;
  text-align: center;
  font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 24px;
  font-weight: bold;
}

.kongjian-txt1 {
  color: black;
}
</style>
