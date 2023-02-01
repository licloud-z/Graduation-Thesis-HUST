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

  <div class="physics">
    <div class="innerbar innerbar1">
      <div class="innerbar-txt">文件系统的物理组织结构</div>
    </div>
    <div class="innerbar innerbar2">
      <div class="innerbar-txt">区域功能/内容详解</div>
    </div>
    <div class="barradius">
      <div id="barChart" ></div>
    </div>
    
    <div class="innertxt" >
      <div v-if="this.txt_mod == 1">
        <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
      </div>
      <div v-else-if="this.txt_mod == 2">
        
      </div>
    </div>
    <!-- <div id="longTxt" :style="{ height: '500px', padding: '30px' , width: '350px' , float: 'left' , border: '1px solid #42b983'}" >{{ long_txt }}</div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts';

let option= {
backgroundColor: '#fff',
  legend: [
      {
          left: '10%',
          top: '7%',
          icon: 'react',
          itemWidth: 14,
          itemHeight: 14,
          textStyle: {
              color: '#000',
          },
      },
  ],
  xAxis: {
      show: false,
      boundaryGap : false,
  },
  yAxis: [
      {
          inverse: true,
          data: [''],
          axisLine: {
              show: false,
          },
      },
  ],
  series: [],
  grid: {
    x: 50, //距离左边
		x2: 0, //距离右边
		y:0, //距离上边
		y2:0,//距离下边
		left:50,
		right:0,
		top:0,
		bottom:0,
    borderRadius: 100,
  }
}

export default {
  name: "eCharts",
  data() {
    return {
      long_txt: '',
      txt_mod: 0,

      BlockGroup: 107,
      is_reverse: 0,
      passvalue: 5,
      seriesList: [],

      is_jump: true, // 跳转前还是跳转后
            jump_group: 0,  // 跳转的group
            loading: false,
            reverse_0: false,
            reverse_1: false,
            reverse_3: false,
            // 文件系统整体描述
            legendData:[
                { name: '块组0', data: 10 },
                { name: '块组1', data: 10 },
                { name: '块组', data: 10 },
                { name: '块组', data: 10 },
                { name: '块组', data: 10 },
            ],
            // 块组0结构描述
            superBlockData:[
              { name: '引导块', data: 130/8 },
              { name: '超级块', data: 130/8 },
              { name: '块组描述符', data: 130/8 },
              { name: '预留GDT块', data: 130/8 },
              { name: '数据块位图', data: 130/8 },
              { name: 'INODE位图', data: 130/8 },
              { name: 'INODE表', data: 130/8 },
              { name: '数据块', data: 130/8 },
            ],
            // 块组1结构描述
            backupBlockData:[
              { name: '备份超级块', data: 130/7 },
              { name: '块组描述符', data: 130/7 },
              { name: '预留GDT块', data: 130/7 },
              { name: '数据块位图', data: 130/7 },
              { name: 'INODE位图', data: 130/7 },
              { name: 'INODE表', data: 130/7 },
              { name: '数据块', data: 130/7 },
            ],
            // 其他块组结构描述
            normalBlockData: [
              { name: '数据块位图', data: 130/4 },
              { name: 'INODE位图', data: 130/4 },
              { name: 'INODE表', data: 130/4 },
              { name: '数据块', data: 130/4 },
            ],
            colorList: ['#3C93C2', '#6CB0D6', '#9EC9E2', '#226E9C', '#C5E1EF'],
            bar: {
                title: {
                text: ''
                },
                backgroundColor: '#fff',
                tooltip: {
                  // 鼠标悬浮时不显示数值
                  show: false,
                },
                legend: [
                    {
                        left: '10%',
                        top: '7%',
                        icon: 'react',
                        itemWidth: 14,
                        itemHeight: 14,
                        textStyle: {
                            color: '#000',
                        },
                    },
                ],
            xAxis: {
                show:false,
            },
            yAxis: {
                inverse: true,
                data: [''],
                axisLine: {
                    show: false,
                },
            },
            series: [
                {
                type: 'bar',
                stack: '2',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: '0',
                },
                data: [],
            }
            ],
            },
    }
  },
  mounted() {
    this.showChart();
  },
  methods: {
    showChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('barChart'));

        //传递数据
        let start_num1 = 2;
        let end_num1 = this.BlockGroup - 1;
        let start_num2 = this.BlockGroup +1;
        let end_num2 = 1024;
        
        let localLegend = [];
        localLegend.push(this.legendData[0]);
        localLegend.push(this.legendData[1]);
        localLegend.push({ name: this.legendData[2].name + start_num1 + '-' + end_num1, data: (end_num1 - start_num1) * 100 / 1024 });
        localLegend.push({ name: this.legendData[3].name + this.BlockGroup, data: this.legendData[3].data });
        localLegend.push({ name: this.legendData[4].name + start_num2 + '-' + end_num2, data: (end_num2 - start_num2) * 100 / 1024 });
    
        for (let i = 0; i < 5; i++) {
              this.seriesList.push({
                  type: 'bar',
                  stack: '2',
                  name: '整体物理磁盘',
                  legendHoverLink: false,
                  barWidth: 60,
                  label: {
                      show: true,
                      position: 'inside',
                      color: '#fff',
                      formatter: localLegend[i].name,
                  },
                  data: [
                      {
                          value: localLegend[i].data,
                          tag: i,
                          itemStyle: {
                              color: this.colorList[i],
                          },
                      },
                  ],
              });
          }

      // 指定图表的配置项和数据
        let thisOption = option;
        thisOption.series = this.seriesList
        // thisOption.yAxis[0].data =['整体物理磁盘','块组0']
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(thisOption);

      // 解决方法: 提前定义好that
      let that = this;
      myChart.on('click', function (param) { //这里根据param填写你的跳转逻辑
        console.log(param.data.tag);
        // 捕获点击 “超级块”的事件
        if(param.data.tag == 0){
          if( !that.reverse_0 ){
            that.reverse_0 = !that.reverse_0;
            for (let i = 0; i < 8; i++) {
              that.seriesList.push({
                type: 'bar',
                stack: '3',
                name: '块组0组织结构',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: that.superBlockData[i].name,
                },
                data: [
                    {
                        value: that.superBlockData[i].data,
                        tag: 7 + i,
                    },
                ],
              });
            }
          }
          else{
            that.reverse_0 = !that.reverse_0;
            let cut_all = 0;
            let cut_now = 0;
            for(let i=0 ; i < that.seriesList.length ; i++){
              if( that.seriesList[i].stack == '3' ){
                cut_all ++;
                that.seriesList[i].label.formatter = '';
                that.seriesList[i].data[0].value = 0;
              }
            }
          }
        }
        // 捕获点击 备份“超级块”的事件
        else if(param.data.tag == 1){
          if( !that.reverse_1 ){
            that.reverse_1 = !that.reverse_1;
            for (let i = 0; i < 7; i++) {
              that.seriesList.push({
                type: 'bar',
                stack: '4',
                name: '块组1组织结构',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: that.backupBlockData[i].name,
                },
                data: [
                    {
                        value: that.backupBlockData[i].data,
                        tag: 15 + i,
                    },
                ],
              });
            }
          }
          else{
            that.reverse_1 = !that.reverse_1;
            let cut_all = 0;
            let cut_now = 0;
            for(let i=0 ; i < that.seriesList.length ; i++){
              if( that.seriesList[i].stack == '4' ){
                cut_all ++;
                that.seriesList[i].label.formatter = '';
                that.seriesList[i].data[0].value = 0;
              }
            }
          }
        }
        // 捕获点击 其他块 的事件
        else if(param.data.tag == 3){
          if( !that.reverse_3 ){
            that.reverse_3 = !that.reverse_3;
            for (let i = 0; i < 4; i++) {
              that.seriesList.push({
                type: 'bar',
                stack: '5',
                name: '块组x组织结构',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: that.normalBlockData[i].name,
                },
                data: [
                    {
                        value: that.normalBlockData[i].data,
                        tag: 22 + i,
                    },
                ],
              });
            }
          }
          else{
            that.reverse_3 = !that.reverse_3;
            let cut_all = 0;
            let cut_now = 0;
            for(let i=0 ; i < that.seriesList.length ; i++){
              if( that.seriesList[i].stack == '5' ){
                cut_all ++;
                that.seriesList[i].label.formatter = '';
                that.seriesList[i].data[0].value = 0;
              }
            }
          }
        }

        let thisOption = option;
        // thisOption.series = this.seriesList
        // thisOption.yAxis[0].data =['整体物理磁盘']
        myChart.setOption(thisOption);
      
      });

      myChart.on('mouseover', function (param) {
        // that.long_txt = ''+param.data.tag;
        if(param.data.tag == 8){
          that.txt_mod = 1;
          let exec = require('child_process').execSync;
          let cmd = 'dumpe2fs -h /dev/sda5';
          let workprocess = exec(cmd);
          let work_list = workprocess.toString('utf8').replace(/\n/g, '<br/>');
          that.long_txt = work_list;
        }else if(param.data.tag == 9){
          that.txt_mod = 1;
          let exec = require('child_process').execSync;
          let cmd = 'dumpe2fs /dev/sda5';
          let workprocess = exec(cmd);
          let txt = ''
          let work_list = workprocess.toString('utf8').split('\n').slice(58,98);
          for(let i=0; i<work_list.length; i++){
            txt = txt + work_list[i] + '<br/>'
          }
          that.long_txt = txt
        }else if(param.data.tag == 11 || param.data.tag == 18 || param.data.tag == 22){
          let alert_msg1 = '在文件系统中,每个块组由数量相同的逻辑块组成<br/>'
          let alert_msg2 = '为了更好的管理块,使得系统能够更快得知当前块是否被使用<br/>'
          let alert_msg3 = 'Ext文件系统使用位图存储每个逻辑块的状态,一个块就对应位图的一个bit位<br/>'
          that.long_txt = alert_msg1 + alert_msg2 + alert_msg3;
        }else if(param.data.tag == 14 || param.data.tag == 21 || param.data.tag == 25){
          let alert_msg1 = '在文件系统中,每个块组由数量相同的逻辑块组成<br/>'
          let alert_msg2 = '除去其他由文件系统控制的区域外,这一部分存放了用户的文件数据,其空闲的数据块即代表的当前块组可用的数据块<br/>'
          that.long_txt = alert_msg1 + alert_msg2;
        }
        else if(param.data.tag == 12 || param.data.tag == 19 || param.data.tag == 23){
          let alert_msg1 = '类似的,在文件系统中,每个块组被分配了相同数量的固定的inode<br/>'
          let alert_msg2 = 'inode结构体内保存了其对应的文件以及目录的基本信息<br/>'
          let alert_msg3 = '为了更好的管理inode,使得系统能够更快得知当前块是否被使用<br/>'
          let alert_msg4 = 'Ext文件系统使用位图存储每个inode的状态,一个inode就对应位图的一个bit位<br/>'
          that.long_txt = alert_msg1 + alert_msg2 + alert_msg3 + alert_msg4;
        }
        else if(param.data.tag == 13 || param.data.tag == 20 || param.data.tag == 24){
          let alert_msg1 = '在文件系统中,每个块组被分配了相同数量的固定的inode<br/>'
          let alert_msg2 = 'inode结构体内保存了其对应的文件以及目录的基本信息<br/>'
          let alert_msg3 = '这一部分区域存放了具体的inode结构体的详细数据<br/>'
          that.long_txt = alert_msg1 + alert_msg2 + alert_msg3;
        }else{
          that.long_txt = ''
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.physics {
  margin-top: 40px;
  margin-left: 44px;
  width: 1400px;
  height: 660px;
  border-radius: 60px;
  background-color: #D0FF94;
}

.barradius{
  position: absolute;
  margin-top: 80px;
  height: 540px;
  // padding: 30px;
  margin-left: 30px;
  width: 940px;
  float: left;
  background-color: white;
  border-radius: 20px;
}

#barChart {
  width: 900px;
  height: 500px;
  padding: 20px;
}

.innerbar {
  color: #2c3e50;
  height: 50px;
  border-radius: 20px;
  
  display: flex;
  flex-direction: row;
  // margin: 20px;
  // margin-right: 70px;
  text-decoration: none;
}

.innerbar1 {
  width: 940px;
  background-color: #CBE5FF;
  position: absolute;
  margin-top: 30px;
  margin-left: 30px;
}
.innerbar2 {
  width: 400px;
  background-color: #78F3E2;
  position: absolute;
  margin-top: 30px;
  margin-left: 970px;
}

.innerbar-txt {
  width: 940px;
  height: 40px;
  margin-top: 6px;
  // display: flex;
  text-align: center;
  font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 20px;
  // font-weight: bold;
}

.innertxt {
  border-radius: 20px;
  background-color: wheat;
  height: 540px;
  // padding: 30px;
  width: 400px;
  float: left;
  overflow:scroll;
  position: absolute;
  margin-top: 80px;
  margin-left: 970px;
}
.innertxt::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.ml30{
  margin-left: 30px;
}
.m50{
  margin: 50px
}

.barChart {
  display: inline-block;
}

.longTxt {
  white-space: pre-wrap;
  overflow-y: auto;
  text-align: left;
}

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