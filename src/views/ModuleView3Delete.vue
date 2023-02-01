<template>
  <div v-if="this.is_changed == 0">
    <div>
      文件路径
      <input v-model="this.file_path" placeholder="例如 /home" />
    </div>
    <div>
      文件名称
      <input v-model="this.file_name" placeholder="" />
    </div>
    <button @click="this.changeStage()">好了</button>
  </div>
  <div v-else-if="this.is_changed == 1">

    <!-- <bar-chart 
      v-if="this.render_flag"
      :passvalue=3 
    /> -->

    <div v-if="this.page <=0">
      <h2>STEP 0</h2>
      <vue-chart 
        :BlockGroup=0 
        :InodeGroup=0 
        :FilePath=this.menu_info_json[0].path 
        :FilePathBlock=this.menu_info_json[0].path
        :Mode=0
      />
      <div class="msg-txt">
        对文件的操作将从文件系统的根目录 / 开始。
      </div>
      <div class="msg-txt">
        EXT文件系统预留了一些inode号，其中也包括了根目录的inode号。在所有运行该文件系统的设备上，/ 的inode号为2。inode存储在块组0的 inode表 区域中。
      </div>
      <div class="msg-txt">
        在inode表中记录了真正存储该目录文件信息的数据块。根据该inode号，就可以定位到根目录文件的data block。解析inode表中inode=2的数据，可以得到 / 的data block的块号为 {{ this.getBlocks('/') }}
      </div>
    </div>
    <!-- 从根目录开始，一直到文件所在目录的上一层的遍历 -->
    <div v-else-if="this.page < this.file_level">
      <h2>STEP {{ this.page }}</h2>

      <!-- 作用：强制将vue-chart重新渲染 -->
      <div v-for="i in this.file_level" :key="i">
        <div v-if="i == this.page">
          <vue-chart 
            :InodeGroup=this.getGroupFromInode(this.getInode(this.menu_info_json[this.page].path,this.menu_info_json[this.page-1].inode)) 
            :FilePath=this.menu_info_json[this.page].path 
            :FilePathBlock=this.menu_info_json[this.page-1].path
            :BlockGroup=this.getGroupFromBlock(this.getBlocks(this.menu_info_json[this.page-1].path))
            :Mode=1
          />
        </div>
      </div>
      
        在上一步中，已经定位到了 {{ this.menu_info_json[this.page-1].path }} 的data block。该块中保存了该目录文件信息，包括目录下的文件和子目录的信息。
        接下来遍历 data block 的信息，查找有无和 {{ this.menu_info_json[this.page].path }} 相匹配的信息。解析出 data block 中与文件、目录以及inode对应关系如下所示：
        <ul>
          <li>inode  name</li>
          <li v-for="f in this.menu_info_json[this.page-1].inode" :key="f">
            <!-- {{ f.son_inode }} - {{ f.son_name}} -->
            {{f.son_inode}} {{f.son_name}}
          </li>
        </ul>
        <!-- {{ this.menu_info_json[i-1]}} -->
        通过对比可以发现，{{ this.menu_info_json[this.page].path }} 匹配成功，对应inode 号为 {{ getInode(this.menu_info_json[this.page].path, this.menu_info_json[this.page-1].inode) }}， 根据该inode号，就可以定位到该目录文件的data block
        <div>结束</div>
    </div>
    <!-- 文件所在的目录 -->
    <div v-else-if="this.page == this.file_level">
      <h2>STEP {{ this.page }}</h2>
      <vue-chart 
        :InodeGroup=this.getGroupFromInode(this.file_inode) 
        :FilePath=this.file_fullpath
        :FilePathBlock=this.menu_info_json[this.page-1].path
        :BlockGroup=this.getGroupFromBlock(this.getBlocks(this.menu_info_json[this.page-1].path))
        :Mode=1
      />
        在上一步中，已经定位到了 {{ this.menu_info_json[this.page-1].path }} 的data block。该块中保存了该目录文件信息，包括目录下的文件和子目录的信息。
        接下来遍历 data block 的信息，查找有无和 {{ this.file_fullpath }} 相匹配的信息。解析出 data block 中与文件、目录以及inode对应关系如下所示：
        <ul>
          <li>inode  name</li>
          <li v-for="f in this.menu_info_json[this.page-1].inode" :key="f">
            <!-- {{ f.son_inode }} - {{ f.son_name}} -->
            {{f.son_inode}} {{f.son_name}}
          </li>
        </ul>
        <!-- {{ this.menu_info_json[i-1]}} -->
        通过对比可以发现，{{ this.file_fullpath }} 匹配成功，对应inode 号为 {{ getInode(this.file_fullpath, this.menu_info_json[this.page-1].inode) }}， 根据该inode号，就可以定位到文件的data block
        <div>结束</div>
    </div>
    <!-- 分配空闲的inode，填充inode位图 -->
    <div v-else-if="this.page == this.file_level + 1">
      <h2>STEP {{ this.file_level + 1 }}</h2>
      <!-- <vue-chart 
        :InodeGroup=this.getGroupFromInode(this.file_inode) 
        :FilePath=this.file_fullpath 
        :FilePathBlock=this.menu_info_json[this.page-2].path
        :BlockGroup=this.getGroupFromBlock(this.getBlocks(this.menu_info_json[this.page-2].path)) 
        :Mode=1
      /> -->
      <div class="msg-txt">在inode结构中保存的data block号为： {{ this.getBlocks(this.file_fullpath) }}</div>
      <div class="msg-txt">首先，文件系统会将所有以上块号在数据块位图中的位进行 置0 的操作,这样，其他程序需要分配块时，这些块就可以被重新使用</div>
      <div class="msg-txt">同时，文件系统对于文件对应的inode也会进行同样的操作，将inode号在inode位图中的位行 置0 的操作,该inode也可以被重新使用</div>
      <div class="msg-txt">最后，在目录文件中删除该文件的记录</div>
      <div class="msg-txt">这些过程进行完成后，该文件被成功删除</div>
      <!-- 展示此时没有分配逻辑块 -->
    </div>
    <!-- <div v-else-if="this.page == this.file_level + 2">
      <h2>STEP {{ this.file_level + 2 }}</h2>
      <vue-chart 
        :InodeGroup=this.getGroupFromInode(this.file_inode) 
        :FilePath=this.file_fullpath  
        :FilePathBlock=this.file_fullpath
        :BlockGroup=this.getGroupFromInode(this.file_inode) 
        :Mode=0
      />
      <div>删除该文件后，解析文件inode中包含的数据块信息，结果是：空</div>
      <div>说明此时文件系统没有为该文件分配任何数据区内的数据块</div>
    </div> -->
    <!-- 查看超级块信息的变化 -->
    <div v-else>
      <h2>STEP {{ this.file_level + 3 }}</h2>
      <div>最后，文件系统的超级块的数据会发生更新</div>
      <div>删除文件前，空闲inode数量: {{ this.inode_number_before }}</div>
      <div>删除文件后，空闲inode数量：{{ this.inode_number_later }}</div>
      <div>可以看出，inode增加1</div>
      <div>删除文件前，空闲block数量: {{ this.block_number_before }}</div>
      <div>删除文件后，空闲block数量：{{ this.block_number_later }}</div>
      <div>可以看出，block会增加等同与已经删除的文件所占据block的数量</div>
    </div>


    <!-- 请注意！在v-for中，i是从1开始计数的，这反倒给我的初始化工作提供了方便 -->
    <div v-for="i in this.file_level" :key="i">
      <!-- 从根目录开始，一直到文件所在目录的上一层的遍历 -->
      <div v-if="i != this.file_level ">
      </div>

      <!-- 文件所在的目录 -->
      <div v-else>
      </div>
    </div>

    <!-- 分配空闲的inode，填充inode位图 -->
    <div>
    </div>
    <!-- 展示此时没有分配逻辑块 -->
    <div>
    </div>
    <!-- 查看超级块信息的变化 -->
    <div>
    </div>


    <button @click="this.page --">上一步</button>
    <button @click="this.page ++">下一步</button>
  </div>
  
</template>

<script>
import BarChart from '@/views/BarChart.vue'
import VueChart from '@/views/VueChart.vue'

const fs = require('fs');
const path_cargo = require('path');
let exec = require('child_process').execSync;
let root_path = path_cargo.join(__dirname, '../../../../../../');

export default {
  data (){
    return {
      file_path: '/home/li/essay',
      file_name: 'a.txt',
      file_inode: 0,
      page: 0,
      is_changed: 0,
      file_level: 3,
      menu_info_string: [],
      menu_info:[
        {
          path: '',
          inode_list: [  // 暂时已废弃
            // {
            //   son_inode: '',
            //   son_name: '',
            // }
          ],
        },
      ],
      render_flag: false, //父组件向子组件传参的标记位
      block_size: 4096,
      block_num : 33554432,
      group_num : 1024,
      inode_per_group: 8192,
      block_per_group: 32768,
      inode_number_before: 0,
      inode_number_later: 0,
      block_number_before: 0,
      block_number_later: 0,
      check: 200,
    }
  },
  computed: {
    // 计算出要删除的文件的完整路径
    file_fullpath (){
      return this.file_path + '/' + this.file_name;
    },
    // 计算出各级路径的PATH, INODE等信息的集合
    menu_info_json (){
      let obj = [];
      for(let i=0; i< this.menu_info_string.length ; i++){
        obj.push(JSON.parse(this.menu_info_string[i]));
      }
      return obj;
    }
  },
  methods: {
    changeStage(){
        if( fs.existsSync(this.file_fullpath) ){
            this.is_changed = 1;
            // alert('文件路径正确');
        }else{
            alert('文件路径错误');
        }
    },
    getInode(pathname, inode_list){
      let path_split = pathname.split('/');
      let part_path = path_split[path_split.length - 1];
      for(let i=0; i< inode_list.length; i++){
        // console.log(part_path);
        if(inode_list[i].son_name == part_path){
          return inode_list[i].son_inode;
        }
      }
    },
    getGroupFromInode(inode){
      // let group_size = this.block_num / this.group_num;
      let inode_n = Number(inode)
      return Math.floor(inode_n / this.inode_per_group)
    },
    getBlocks(path){
      let node_path = root_path + 'src/assets/run.sh';
      let cmd = 'bash '+ node_path + ' ' + path;
        // console.log(cmd);
      let workprocess = exec(cmd);
      let work_list = workprocess.toString('utf8').split("\n")[1];
      console.log(work_list);
      if(work_list[0] == 'd'){
          work_list = 'None';
      }
      return work_list;
    },
    getGroupFromBlock(block){
      let block_n = Number(block)
      return Math.floor(block_n / this.block_per_group)
    }
  },
  watch: {
    is_changed (){
      // let file_fullpath = this.file_path + this.file_name;
      // this.check = 500;

      let path_split = this.file_path.split('/');
      let i=0;
      for(i=0;i<path_split.length;i++){
        path_split[i]= '/'.concat(path_split[i]);
      }
      for(i=2;i<path_split.length;i++){
        path_split[i]= path_split[i-1].concat(path_split[i]);
      }
      this.file_level = path_split.length;
      // console.log(path_split);
      let all_obj = [];
      for(i=0;i<path_split.length;i++){
      
        //获得当前路径下所有目录以及文件的inode
        
        let cmd = 'ls -li '+path_split[i];
        let workprocess = exec(cmd);
        let work_list = workprocess.toString('utf8').split("\n");
        let inode_list = [];
        // 注意范围！ 从1开始，到length-1结束，以为第一行是用量数据，最后一行为空
        for(let inode_item=1; inode_item< work_list.length-1; inode_item++){
          let temper_list = work_list[inode_item].trim().split(" ");
          let current_item = {
            son_inode: temper_list[0],
            son_name: temper_list[temper_list.length - 1],
          }
          inode_list.push(JSON.parse(JSON.stringify(current_item)));
        }
        // console.log(inode_list);



        // 将划分路径之后的结果写入menu_info结构数组中
        let current_obj = {
          path: path_split[i],
          inode: inode_list,
        };
        this.menu_info_string.push(JSON.stringify(current_obj));
        // this.menu_info.push(JSON.parse(JSON.stringify(current_obj)));
      }


      // flag! 此时才渲染echarts
      this.render_flag = true;

      // 展示inode位图环节
      try {
        let cmd = 'ls -li ' + this.file_fullpath;
        let workprocess = exec(cmd);
        let file_inode = Number(workprocess.toString('utf8').split(' ')[0]);
        this.file_inode = file_inode;
        console.log(file_inode);
      }
      catch(err){
        console.log('error');
      }

      // 获取删除前的文件系统信息
      try {
        let cmd = 'df -i /dev/sda5';
        let workprocess = exec(cmd);
        let work_list = workprocess.toString('utf8').split("\n")[1];
        // this.block_number_before = Number(work_list[15].slice(20));
        this.inode_number_before = Number(work_list.slice(30,40));
        console.log(this.inode_number_before);

        let cmd_2 = 'df /dev/sda5';
        let workprocess_2 = exec(cmd_2);
        let work_list_2 = workprocess_2.toString('utf8').split("\n")[1];
        // this.block_number_before = Number(work_list[15].slice(20));
        this.block_number_before = Number(work_list_2.slice(34,44));
      }
      catch(err){
        console.log('create file error');
      }

      // 删除文件环节
      try {
          //就删除文件而言，使用 rm 太过于危险
        // let cmd = 'touch '+ this.file_fullpath;
        // let workprocess = exec(cmd);
        fs.unlinkSync(this.file_fullpath);
      }
      catch(err){
        console.log('delete file error');
      }
      // 获取删除后的文件系统信息
      try {
        let cmd = 'df -i /dev/sda5';
        let workprocess = exec(cmd);
        let work_list = workprocess.toString('utf8').split("\n")[1];
        // this.block_number_before = Number(work_list[15].slice(20));
        this.inode_number_later = Number(work_list.slice(30,40));
        console.log(this.inode_number_later);

        let cmd_2 = 'df /dev/sda5';
        let workprocess_2 = exec(cmd_2);
        let work_list_2 = workprocess_2.toString('utf8').split("\n")[1];
        // this.block_number_before = Number(work_list[15].slice(20));
        this.block_number_later = Number(work_list_2.slice(34,44));
      }
      catch(err){
        console.log('create file error');
      }


      
    //   // 展示blocks data 环节
    //   try {
    //     let node_path = root_path + 'src/assets/run.sh';
    //     let cmd = 'bash '+ node_path + ' ' + this.file_fullpath;
    //     // console.log(cmd);
    //     let workprocess = exec(cmd);
    //     let work_list = workprocess.toString('utf8').split("\n");
    //     console.log(work_list);
    //   //   let item;
    //   //   let os_type = work_list[10].slice(20);
    //   //   this.basic_info[0].value = os_type;
    //   //   for(item=1;item<this.basic_info.length;item++){
    //   //     let key_len = this.basic_info[item].key.length;
    //   //     this.basic_info[item].value = Number(work_list[locate_info[item]].slice(key_len + 1));
    //   //   }
    //   //   console.log(typeof(this.basic_info[5].value));
    //   }
    //   catch(err){
    //     console.log('bash run error!');
    //   }

    }
  },
  components:{
    // BarChart, 
    VueChart,
  }
  
}
</script>

<style scoped lang="scss">
.msg-txt {
  text-align: left;
  text-indent:2em;
  width: 60vw;
  display: inline-block;
}
</style>