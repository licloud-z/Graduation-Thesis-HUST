<template>
<!-- <vue-bar-chart 
            :InodeGroup=108
            :FilePath=this.file_path
            :FilePathBlock=this.file_path
            :BlockGroup=108
            :Mode=1
/> -->
  <div class="left-bar">
    <div class="base">
      <header class="head">
        <span class="title">超级块中存储的文件系统元数据信息</span>
      </header>
      <div class="info">
        <div 
          v-for="(item, index) in basic_info" 
          :key="index" 
          class="span-all"
          @click="showBasicInfo(item.key)"
        >
          <div class="span-left">
            <div class="span-txt">{{item.mean}}</div>
          </div>
          <!-- <div class="span-mid">:</div> -->
          <div class="span-right">
            <div class="span-txt">{{item.value}}</div>
          </div>
        </div>
        <!-- <div>{{ bind }}</div> -->
      </div>
      <header class="head">
        <span class="title">系统信息</span>
      </header>
      <div class="info">
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">操作系统版本</div>
          </div>
          <div class="span-right">
            <div class="span-txt">{{ os_info }}</div>
          </div>
        </div>
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">操作系统内核</div>
          </div>
          <div class="span-right">
            <div class="span-txt">{{ kernel }}</div>
          </div>
        </div>
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">操作系统平台</div>
          </div>
            <div class="span-right">
              <div class="span-txt">{{ platform }}</div>
            </div>
        </div>
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">操作系统架构</div>
          </div>
            <div class="span-right">
              <div class="span-txt">{{ arch }}</div>
            </div>
        </div>
        <!-- <p>操作系统内核：<span>{{kernel}}</span></p>
        <p>平台：<span>{{platform}}</span></p>
        <p>用户名：<span>{{username}}</span></p> -->
      </div>
      <!-- <header class="head">
        <span class="title">系统信息</span>
      </header> -->
      <div class="info">
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">CPU</div>
          </div>
            <div class="span-right">
              <div class="span-txt">{{ cpu_info }}</div>
            </div>
        </div>
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">主机名</div>
          </div>
            <div class="span-right">
              <div class="span-txt">{{ hostname }}</div>
            </div>
        </div>
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">用户名</div>
          </div>
            <div class="span-right">
              <div class="span-txt">{{ username }}</div>
            </div>
        </div>
        <div class="span-all">
          <div class="span-left">
            <div class="span-txt">homedir</div>
          </div>  
          <div class="span-right">
            <div class="span-txt">{{ homedir }}</div>
          </div>
        </div>
      </div>
      <!-- <div>{{this.txt}}</div> -->
    </div>
    </div>
</template>

<script>
import os, { platform } from 'os';
// import VueBarChart from '@/views/VueChart.vue'
import { stdout } from 'process';
// import func from 'vue-editor-bridge';

// import { watch } from 'fs';
// watch('/home/li/out.txt', (eventType, filename) => {
//   console.log(`event type is: ${eventType}`);
//   if (filename) {
//     console.log(`filename provided: ${filename}`);
//   } else {
//     console.log('filename not provided');
//   }
// });


/*
  测试功能性代码  
 */
// let exec = require('child_process').execSync;
// let cmd = 'dumpe2fs /dev/sda5';
// let workprocess = exec(cmd).toString('utf8');
// let work_list = workprocess.split("\n");
// let c = work_list[2].slice(20, 40);
// console.log(parseInt(c));

// cmd = 'debugfs /dev/sda5';
// workprocess = exec(cmd).toString('utf8');
// console.log(workprocess);

    export default {
        // components: {
        //   VueBarChart,
        // },
        data () {
            return {
              txt: '',
                bind: 0,
                basic_info: [
                  {key: 'Filesystem OS type', value: '读取中', mean: 'Filesystem OS type'},
                  {key: 'Inode count', value: '读取中', mean: 'Inode数量/个'},
                  {key: 'Block count', value: '读取中', mean: 'Block块数量/个'},
                  {key: 'Block size', value: '读取中', mean: 'Block块大小/B'},
                  {key: 'Blocks per group', value: '读取中', mean: '每个块组的Block块数量/个'},
                  {key: 'Inodes per group', value: '读取中', mean: '每个块组的Inode数量/个'},
                  {key: 'Inode blocks per group', value: '读取中', mean: '每个块组的Inode块数量/个'},
                  {key: 'Inode size', value: '读取中', mean: 'Inode大小/B'},
                ],
            }
        },
        methods: {
          showBasicInfo(input_key) {
            if (input_key == 'Filesystem OS type'){
              alert('Filesystem OS type:\n文件系统所在操作系统的类型，本程序所在的运行系统为：'+this.basic_info[0].value);
            }
            else if (input_key == 'Inode count' || input_key == 'Inodes per group'){
              let alert_msg1='在文件系统中，每一个inode结构体内保存了其对应的文件以及目录的基本信息\n';
                let alert_msg2='每一个文件都有一个唯一的inode号，inode号被均匀分配到块组中，因此，文件系统只需要看到inode号，就可以定位到所在块组，利于查找\n';
                let alert_msg3='就本文件系统中，inode总数为' + this.basic_info[1].value;
                let alert_msg4='，而每个块组中的inode数为' + this.basic_info[5].value + '\n';
              let alert_msg5 = '在文件系统中,inode会被平均分配到各个块组当中,每个块组占据相同数量的inode\n';
              let alert_msg6 = '这样的设计有利于更快的将inode定位到块组当中,提高查找的效率\n';
                let alert_msg7= this.basic_info[1].value +'/'+ this.basic_info[5].value +'的结果是'+ this.basic_info[1].value / this.basic_info[5].value + '，对应与该文件系统中的总块组数相同';
                alert(alert_msg1+ alert_msg2+ alert_msg3+ alert_msg4+ alert_msg5 + alert_msg6 + alert_msg7);
            }
            else if (input_key == 'Block count' || input_key == 'Blocks per group' || input_key == 'Block size'){
              let alert_msg1 = '逻辑块(即block)指存储在磁盘或者磁带上的数据块,是文件系统最小的操作单位\n';
              let alert_msg2 = '文件系统将整个磁盘划分为一系列均匀的逻辑块\n';
              let alert_msg3 = '就本文件系统而言, 逻辑块的总数为' + this.basic_info[2].value;
              let alert_msg4 = ',而每个块组中的逻辑块数为' + this.basic_info[4].value;
              let alert_msg5 = this.basic_info[2].value +'/'+ this.basic_info[4].value +'的结果是'+ this.basic_info[2].value / this.basic_info[4].value + '，对应与该文件系统中的总块组数相同\n';
              let alert_msg6 = ',同时,在另一个方面,每个逻辑块的大小为' + this.basic_info[3].value + 'KB\n';
              let alert_msg7 = this.basic_info[2].value +'*'+ this.basic_info[3].value +'B 的结果是:\n';
              let alert_msg8 = ''+ (this.basic_info[2].value/1024/1024) * (this.basic_info[3].value/1024) + 'GB，对应与该文件系统所占据的磁盘空间相同';
              alert(alert_msg1+ alert_msg2+ alert_msg3+ alert_msg4+ alert_msg5 + alert_msg6 + alert_msg7+ alert_msg8);
            }
            else if (input_key == 'Inode blocks per group' || input_key == 'Inode size'){
              let alert_msg1 = 'inode被存放在不同块组的单独的inode区\n';
              let alert_msg2 = '就本系统而言,inode结构体的整体大小由文件系统本身确定,其占据的空间为' + this.basic_info[7].value + 'B\n';
              let alert_msg3 = '因此,每个块组的inode块的数量为' + this.basic_info[6].value + '\n';
              let alert_msg4 = this.basic_info[6].value + '*' + this.basic_info[3].value +'/'+ this.basic_info[7].value + '即可计算出每个块组的inode数量,与 Inodes per group的' + this.basic_info[5].value + '一致\n';
              alert(alert_msg1 + alert_msg2 + alert_msg3 + alert_msg4);
            }
            // switch(input_key){
            //   case 'Filesystem OS type':
            //     alert('Filesystem OS type:\n文件系统所在操作系统的类型，本程序所在的运行系统为：'+this.basic_info[0].value);
            //     break;
            //   case 'Inode count':
            //     let alert_msg1='在文件系统中，每一个inode结构体内保存了其对应的文件以及目录的基本信息\n';
            //     let alert_msg2='每一个文件都有一个唯一的inode号，inode号被均匀分配到块组中，因此，文件系统只需要看到inode号，就可以定位到所在块组，利于查找\n';
            //     let alert_msg3='就本文件系统中，inode总数为' + this.basic_info[1].value;
            //     let alert_msg4='，而每个块组中的inode数为' + this.basic_info[5].value;
            //     let alert_msg5= this.basic_info[1].value +'/'+ this.basic_info[1].value +'的结果是'+ this.basic_info[1].value / this.basic_info[1].value + '，对应与该文件系统中的总块组数相同';
            //     alert(alert_msg1+ alert_msg2+ alert_msg3+ alert_msg4+ alert_msg5);
            //     break;
            //   default:
            //     break;
            // }
          },
        },
        created () {
          let locate_info = [
              10,
              11,
              12,
              18,
              22,
              24,
              25,
              38,
            ]; 
            try {
              let exec = require('child_process').execSync;
              let cmd = 'dumpe2fs /dev/sda5';
              let workprocess = exec(cmd);
              let work_list = workprocess.toString('utf8').split("\n");
              
              let item;
              let os_type = work_list[10].slice(20);
              this.basic_info[0].value = os_type;
              for(item=1;item<this.basic_info.length;item++){
                let key_len = this.basic_info[item].key.length;
                this.basic_info[item].value = Number(work_list[locate_info[item]].slice(key_len + 1));
              }
              console.log(typeof(this.basic_info[5].value));
            }
            catch(err){
              console.log('dumpe2fs /dev/sda5 run error!');
            }
        },
        mounted () {
          setInterval(() => {
            /* 从 dumpe2fs /dev/sda5 指令中读取超级块信息
                    line      key
                    10        Filesystem OS type
                    11        Inode count
                    12        Block count
                    18        Block size
                    22        Blocks per group
                    24        Inodes per group
                    25        Inode blocks per group
                    38        Inode size
             */
            let locate_info = [
              10,
              11,
              12,
              18,
              22,
              24,
              25,
              38,
            ]; 
            try {
              let exec = require('child_process').execSync;
              let cmd = 'dumpe2fs /dev/sda5';
              let workprocess = exec(cmd);
              let work_list = workprocess.toString('utf8').split("\n");
              
              let item;
              let os_type = work_list[10].slice(20);
              this.basic_info[0].value = os_type;
              for(item=1;item<this.basic_info.length;item++){
                let key_len = this.basic_info[item].key.length;
                this.basic_info[item].value = Number(work_list[locate_info[item]].slice(key_len + 1));
              }
              console.log(typeof(this.basic_info[5].value));
            }
            catch(err){
              console.log('dumpe2fs /dev/sda5 run error!');
            }
          }, 100000) //目前设置每100s触发一次
        },
        computed: {
          kernel(){
            return os.version();
          },
          os_info(){
            return os.release();
          },
          platform(){
            return os.platform();
          },
          arch(){
            return os.arch();
          },
          cpu_info(){
            let cpus = os.cpus()[0];
            let { model } = cpus;
            return model;
          },
          hostname(){
            return os.hostname();
          },
          username(){
            let { username } = os.userInfo();
            return username;
          },
          homedir(){
            let { homedir } = os.userInfo();
            return homedir;
          },
          manything(){
            // function execute(cmd, callback) {
            //   let exec = require('child_process').exec;
            //   let result = '';
            //   let command = exec(cmd);
            //   command.stdout.on('data', function(data) {
            //     result += data;
            //   });
            //   command.on('close', function(code) {
            //     return callback(result);
            //   });
            // }
            // let res;
            // execute('ls -l /dev/sda5', function(result) { console.log(result); });
            // return res;


            let exec = require('child_process').execSync;
            let cmd = 'ls -l /home/li';
            // let cmd = 'dumpe2fs /dev/sda5 > /home/li/before.txt';
            // let cmdpath = '/home/li';
            let workprocess = exec(cmd).toString('utf8');
            // let workprocess = exec(cmd, {cwd: cmdpath});
            // console.log(workprocess.toString("utf8").trim());
            // workprocess.stdout.on('data', function(data) {
            //   console.log(typeof(data));
            //   // console.log(data);
            //   my_copy += data;
            //   // console.log(my_copy);
            // });
            // console.log(workprocess);
            
            // let a = workprocess.indexOf('2月');
            // console.log(a);
            // let b = workprocess.indexOf('demo');
            // console.log(b);
            // let c = workprocess.slice(a+1, b);
            // console.log(parseInt(c));
            return 1;
          }
        }
    }
</script>

<style scoped lang="scss">
.left-bar {
  margin-top: 50px;
}

.head {
  // margin: 40px 0 0;
  // // color: white;
  // color: black;
  background: #1B1B1F;
  width: 1410px;
  height: 50px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  margin: 10px;
  margin-right: auto;
  margin-left: auto;
}

.title {
  width: 1380px;
  // height: 80px;
  margin-top: 6px;
  // display: flex;
  text-align: center;
  font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.info {
  list-style-type: none;
  padding: 0;
  // margin: 40px 0 0;
}
.span-all {
  // margin: 0 10px;
  color: #42b983;
  text-align: center;

  display: flex;
}

.span-left {
  // text-align: right;
  // display: inline-block;
  // width: 40vw;

  background: white;
  width: 700px;
  height: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-top: 6px;
  margin-left: 38px;
  // margin-right: auto;
  // margin-left: auto;
}
.span-mid {
  text-align: center;
  display: inline-block;
  width: 10vw;
}
.span-right {
  // text-align: left;
  // display: inline-block;
  // width: 40vw;

  background: #FFF480;
  width: 700px;
  height: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-top: 6px;
  margin-left: 8px;
  // margin-right: auto;
  // margin-left: auto;
}

.span-txt {
  width: 700px;
  height: 80px;
  margin-top: 10px;
  color: black;
  // display: flex;
  text-align: center;
  font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 20px;
}
</style>