<template>
  <div>
    <div>
      <div class="home">
        <div class="content">
          <div style="height: 50px;display: flex;">
            <div class="kongjian kongjian1">
              <div class="kongjian-txt kongjian-txt1" @click="this.file_command = 1">新建文件</div>
            </div>
            <div class="kongjian kongjian2">
              <div class="kongjian-txt kongjian-txt1" @click="this.file_command = 2">删除文件</div>
            </div>
            <div class="kongjian kongjian3">
              <div class="kongjian-txt kongjian-txt3" @click="this.file_command = 3">修改文件</div>
            </div>
          </div> 
        </div>
      </div>
      
      <div class="organize">
        <div v-if="this.file_command == 1">
          <!-- <h3>进入新建的模块</h3> -->
          <module-view-3-init/>
        </div>
        <div v-else-if="this.file_command == 2">
          <!-- <h3>进入删除的模块</h3> -->
          <module-view-3-delete/>
        </div>
        <div v-else-if="this.file_command == 3">
          <!-- <h3>进入修改的模块</h3> -->
          <module-view-3-modify/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import ModuleView3Init from '@/views/ModuleView3InitNew.vue';
import ModuleView3Delete from '@/views/ModuleView3Delete.vue';
import ModuleView3Modify from '@/views/ModuleView3Modify.vue';

export default {
  data (){
    return {
      file_command: 0,
    }
  },
  watch:{
    file_command() {
      console.log(this.file_command);
    }
  },
  components:{
    ModuleView3Init,
    ModuleView3Delete,
    ModuleView3Modify,
  }
}
</script>

<style scoped lang="scss">
.organize {
  margin-top: 40px;
  margin-left: 44px;
  width: 1400px;
  height: 660px;
  border-radius: 60px;
  background-color: #D0FF94;
}



.about {
  color: black;
}


.home {
  margin-top: 30px;
}

.kongjian {
  width: 446px;
  height: 50px;
  border-radius: 20px;
  // background-color: #f5222d;
  display: flex;
  flex-direction: row;
  margin: 20px;
  // margin-right: 70px;
  margin-right: 14px;
  margin-left: 14px;

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

.kongjian3 {
  background: #1B1B1F;
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

.kongjian-txt3 {
  color: white;
}
</style>