<template>
  <div>
    <div class="home">
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

    <div class="logics">
      <div id="treeChart" :style="{ height: '500px', padding: '30px'}"></div>
    </div>
    
  </div>
</template>

<script>
import * as echarts from 'echarts';
let fs = require('fs');
const path_cargo = require('path');
let out_node = [{ //一定一定要注意这里有[]
        name: '本科发展方向',
        children: [
          {
            name: '考研',
          },
          {
            name: '就业',
            children: [
              {
                name: '相关就业详见菜单栏‘培养方向’'
              }
            ]
          },
          {
            name: '考公'
          },
          {
            name: '留学',
            children: [
              {
                name: '相关文件（申请流程、交换要求）'
              }
            ]
          },
          {
            name: '创业'
          }
        ]
      }];

const getFiles = filePath => {
  let files = [
    {
      name: filePath,
      children: [],
    }
  ] //遍历的文件全push进这个数组，方便后续操作（记住，push进去的是文件路径，后续需读取）
  function findFile(path, father_node) { //遍历查找函数
    let _files = fs.readdirSync(path) //异步读取文件
    _files.forEach(function(item, index) { //判断是否为文件或为文件夹从而执行push操作或递归操作
      let fPath = path_cargo.join(path, item) //拼合文件路径
      let stat = fs.statSync(fPath) 
      if (stat.isDirectory()) { //该路径的东西是文件夹？
        // findFile(fPath)
        // let current_node = JSON.parse(JSON.stringify(findFile(fPath)));
        // let child = findFile(fPath, []);
        // console.log('this is child' + child);
        let current_obj = {
          name: fPath,
          children: [],
        };
        findFile(fPath, current_obj.children);
        console.log('this is current' + current_obj);
        father_node.push(JSON.parse(JSON.stringify(current_obj)))
      }
      if (stat.isFile()) { //该路径的东西是文件？
        // files.push(fPath)
        let current_obj = {
          name: fPath,
        };
        father_node.push(JSON.parse(JSON.stringify(current_obj)));
        // return father_node.slice(0);
      }
    })
  }
  findFile(filePath, files[0].children)
  return files
}
let check = getFiles('/home/li/essay');
console.log(check);


export default {
  name: "eCharts",
  data() {
    return {
      treedata: check,
    }
  },
  mounted() {
    this.showChart();
  },
  methods: {
    showChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('treeChart'));

      // 指定图表的配置项和数据
      var option = {
        title: {
            text: '以/home/li/essay为根目录'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',

                data: this.treedata,

                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',

                symbolSize: 7,

                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 13
                },

                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      myChart.on('click', function (param) {
        console.log(param);//这里根据param填写你的跳转逻辑
      });
    }
  }
}
</script>

<style  lang="scss" scoped>
.logics {
  margin-top: 40px;
  margin-left: 44px;
  width: 1400px;
  height: 660px;
  border-radius: 60px;
  background-color: #D0FF94;
}


.ml30{
  margin-left: 30px;
}
.m50{
  margin: 50px
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