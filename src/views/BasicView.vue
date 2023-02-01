<template>
  <div class="home">
    <h1>文件系统教学辅助工具</h1>
    <h1> </h1>
    <h2>1. 文件系统基本信息展示</h2>
    <h3>    (1)超级块的基本信息</h3>
    <h3>    (2)其他系统相关信息</h3>
    <h2>2. 文件系统组织结构展示</h2>
    <h3>    (1)文件系统物理结构</h3>
    <h3>    (2)文件系统逻辑结构</h3>
    <h2>3. 对文件操作的磁盘变化</h2>
    <h3>    (1)新建文件操作过程</h3>
    <h3>    (2)删除文件操作过程</h3>
    <h3>    (2)修改文件操作过程</h3>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'BasicView',
  data() {
    return{
      file_path: '/',
    }
  },
  components: {
    // VueChartHello,
  }
}
</script>
