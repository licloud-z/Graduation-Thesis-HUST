<template>
  <div class="echarts">
    <IEcharts 
      :option="bar" 
      :loading="loading" 
      @ready="onReady" 
      @click="onClick"
      @mouseover="onMouse"
      :style="{ height: '500px', padding: '30px'}"
    ></IEcharts>
    <button @click="jump">跳转</button>
    <!-- <button @click="doRandom">Random</button> -->
  </div>
</template>
 
<script type="text/babel">
  import IEcharts from 'vue-echarts';
  export default {
    name: 'viewChart',
    components: {
      IEcharts
    },
    props: {
      InodeGroup: Number,
      FilePath: String,
      FilePathBlock: String,
      BlockGroup: Number,
      Mode: Number, // 决定是否在标题上显示更加详细的信息
    },
    mounted(){
      console.log(this.BlockGroup)
      // if(this.is_jump){
      //   this.jump_group = this.BlockGroup;
      // }else{
      //   this.jump_group = this.InodeGroup;
      // }
      if(this.Mode == 1){
        this.bar.title.text = this.FilePathBlock + '的数据块，位于块组' + this.BlockGroup
      }
      if(this.BlockGroup == 0){
        let localLegend = [];
        localLegend.push(this.legendData[0]);
        localLegend.push(this.legendData[1]);
        localLegend.push({ name: this.legendData[2].name + '2-1024', data: 110 });
        localLegend.push({ name: '', data: 0 });
        localLegend.push({ name: '', data: 0 });
        // this.legendData[2].name = this.legendData[2].name + '2-1024';
        // this.legendData[2].data = 110;
        // this.legendData[3].name = '';
        // this.legendData[3].data = 0;
        // this.legendData[4].name = '';
        // this.legendData[4].data = 0;
        for (let i = 0; i < 5; i++) {
            this.bar.series.push({
                type: 'bar',
                stack: '2',
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

      }
      else{
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
        // this.legendData[2].name = this.legendData[2].name + start_num1 + '-' + end_num1;
        // this.legendData[2].data = (end_num1 - start_num1) * 100 / 1024;
        // this.legendData[3].name = this.legendData[3].name + this.BlockGroup;
        // this.legendData[4].name = this.legendData[4].name + start_num2 + '-' + end_num2;
        // this.legendData[4].data = (end_num2 - start_num2) * 100 / 1024;
        for (let i = 0; i < 5; i++) {
              this.bar.series.push({
                  type: 'bar',
                  stack: '2',
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
      }
      

    },
    data() {
        return {
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
            colorList: ['#226E9C', '#3C93C2', '#6CB0D6', '#9EC9E2', '#C5E1EF'],
            bar: {
                title: {
                text: this.FilePathBlock
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
                    // data: ['元素1', '元素2', '元素3', '元素4', '元素5'],
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
            }
        }
    },
    methods: {
      jump() {
        if(this.is_jump){
          if(this.Mode == 1){
            this.bar.title.text = this.FilePath + '的Inode块，位于块组' + this.InodeGroup;
          }

          if(this.InodeGroup == 0){
            this.bar.series[1].label.formatter = this.legendData[0].name;
            this.bar.series[1].data[0].value = this.legendData[0].data;
            this.bar.series[2].label.formatter = this.legendData[1].name;
            this.bar.series[2].data[0].value = this.legendData[1].data;
            this.bar.series[3].label.formatter = this.legendData[2].name + '2-1024';
            this.bar.series[3].data[0].value = 110;
            this.bar.series[4].label.formatter = '';
            this.bar.series[4].data[0].value = 0;
            this.bar.series[5].label.formatter = '';
            this.bar.series[5].data[0].value = 0;
          }
          else{
            let start_num1 = 2;
            let end_num1 = this.InodeGroup - 1;
            let start_num2 = this.InodeGroup +1;
            let end_num2 = 1024;
            let localLegend = [];
            localLegend.push(this.legendData[0]);
            localLegend.push(this.legendData[1]);
            localLegend.push({ name: this.legendData[2].name + start_num1 + '-' + end_num1, data: (end_num1 - start_num1) * 100 / 1024 });
            // this.legendData[2].name = this.legendData[2].name + start_num1 + '-' + end_num1;
            // this.legendData[2].data = (end_num1 - start_num1) * 100 / 1024;
            localLegend.push({ name: this.legendData[3].name + this.InodeGroup, data: this.legendData[3].data });
            // this.legendData[3].name = this.legendData[3].name + this.InodeGroup;
            localLegend.push({ name: this.legendData[4].name + start_num2 + '-' + end_num2, data: (end_num2 - start_num2) * 100 / 1024 });
            // this.legendData[4].name = this.legendData[4].name + start_num2 + '-' + end_num2;
            // this.legendData[4].data = (end_num2 - start_num2) * 100 / 1024;
            
            this.bar.series[3].label.formatter =  this.legendData[2].name + start_num1 + '-' + end_num1;
            this.bar.series[3].data[0].value = (end_num1 - start_num1) * 100 / 1024;
            this.bar.series[4].label.formatter = this.legendData[3].name + this.InodeGroup;
            this.bar.series[4].data[0].value = 10;
            this.bar.series[5].label.formatter = this.legendData[4].name + start_num2 + '-' + end_num2;
            this.bar.series[5].data[0].value = (end_num2 - start_num2) * 100 / 1024;
          }
        }else{
          // 修改标题
          if(this.Mode == 1){
            this.bar.title.text = this.FilePathBlock + '的数据块，位于块组' + this.BlockGroup;
          }

          if(this.BlockGroup == 0){
            this.bar.series[1].label.formatter = this.legendData[0].name;
            this.bar.series[1].data[0].value = this.legendData[0].data;
            this.bar.series[2].label.formatter = this.legendData[1].name;
            this.bar.series[2].data[0].value = this.legendData[1].data;
            this.bar.series[3].label.formatter = this.legendData[2].name + '2-1024';
            this.bar.series[3].data[0].value = 110;
            this.bar.series[4].label.formatter = '';
            this.bar.series[4].data[0].value = 0;
            this.bar.series[5].label.formatter = '';
            this.bar.series[5].data[0].value = 0;
          }
          else{
            let start_num1 = 2;
            let end_num1 = this.BlockGroup - 1;
            let start_num2 = this.BlockGroup +1;
            let end_num2 = 1024;
            let localLegend = [];
            localLegend.push(this.legendData[0]);
            localLegend.push(this.legendData[1]);
            localLegend.push({ name: this.legendData[2].name + start_num1 + '-' + end_num1, data: (end_num1 - start_num1) * 100 / 1024 });
            // this.legendData[2].name = this.legendData[2].name + start_num1 + '-' + end_num1;
            // this.legendData[2].data = (end_num1 - start_num1) * 100 / 1024;
            localLegend.push({ name: this.legendData[3].name + this.BlockGroup, data: this.legendData[3].data });
            // this.legendData[3].name = this.legendData[3].name + this.BlockGroup;
            localLegend.push({ name: this.legendData[4].name + start_num2 + '-' + end_num2, data: (end_num2 - start_num2) * 100 / 1024 });
            // this.legendData[4].name = this.legendData[4].name + start_num2 + '-' + end_num2;
            // this.legendData[4].data = (end_num2 - start_num2) * 100 / 1024;
            
            this.bar.series[3].label.formatter =  this.legendData[2].name + start_num1 + '-' + end_num1;
            this.bar.series[3].data[0].value = (end_num1 - start_num1) * 100 / 1024;
            this.bar.series[4].label.formatter = this.legendData[3].name + this.BlockGroup;
            this.bar.series[4].data[0].value = 10;
            this.bar.series[5].label.formatter = this.legendData[4].name + start_num2 + '-' + end_num2;
            this.bar.series[5].data[0].value = (end_num2 - start_num2) * 100 / 1024;
          }
        }
        // console.log('hey!' + this.bar.series[1].data[0].value)
        this.is_jump = ! this.is_jump;
        // this.handleUpdateClick();
      },
      doRandom() {
        const that = this;
        console.log(this.InodeGroup)
        // let data = [];
        // for (let i = 0, min = 5, max = 99; i < 6; i++) {
        //   data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        // }
        // that.loading = !that.loading;
        // that.bar.series[0].data = data;
      },
      onReady(instance) {
        console.log(instance);
      },
      handleUpdateClick(){
        this.$forceUpdate()
      },
      onMouse(param){
        console.log(param)
      },
      onClick(param){
        console.log(param)

        // 捕获点击 “超级块”的事件
        if(param.data.tag == 0){
          if( !this.reverse_0 ){
            console.log("haha")
            this.reverse_0 = !this.reverse_0;
            for (let i = 0; i < 8; i++) {
              this.bar.series.push({
                type: 'bar',
                stack: '3',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: this.superBlockData[i].name,
                },
                data: [
                    {
                        value: this.superBlockData[i].data,
                        tag: 7 + i,
                        // itemStyle: {
                        //     color: this.colorList[i],
                        // },
                    },
                ],
              });
            }
          }
          else{
            this.reverse_0 = !this.reverse_0;
            let cut_all = 0;
            let cut_now = 0;
            for(let i=0 ; i < this.bar.series.length ; i++){
              if( this.bar.series[i].stack == '3' ){
                cut_all ++;
                this.bar.series[i].label.formatter = '';
                this.bar.series[i].data[0].value = 0;
                // this.bar.series.splice(i,1);
              }
            }
            // 删除多余元素，但是会导致渲染上的问题
            // while( cut_now != cut_all) {
            //   for(let i=0; i< this.bar.series.length ; i++){
            //     if( this.bar.series[i].stack == '3' ){
            //       cut_now ++;
            //       // this.bar.series.splice(i,1);
            //       this.bar.series.pop();
            //       break;
            //     }
            //   }
            //   // console.log(this.bar.series)
            // }
            this.handleUpdateClick();
            // this.$forceUpdate()
          }
        }

        // 捕获点击 备份“超级块”的事件
        else if(param.data.tag == 1){
          if( !this.reverse_1 ){
            // console.log("haha")
            this.reverse_1 = !this.reverse_1;
            for (let i = 0; i < 7; i++) {
              this.bar.series.push({
                type: 'bar',
                stack: '4',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: this.backupBlockData[i].name,
                },
                data: [
                    {
                        value: this.backupBlockData[i].data,
                        tag: 15 + i,
                        // itemStyle: {
                        //     color: this.colorList[i],
                        // },
                    },
                ],
              });
            }
          }
          else{
            this.reverse_1 = !this.reverse_1;
            let cut_all = 0;
            let cut_now = 0;
            for(let i=0 ; i < this.bar.series.length ; i++){
              if( this.bar.series[i].stack == '4' ){
                cut_all ++;
                this.bar.series[i].label.formatter = '';
                this.bar.series[i].data[0].value = 0;
                // this.bar.series.splice(i,1);
              }
            }
            // 删除多余元素，但是会导致渲染上的问题
            // while( cut_now != cut_all) {
            //   for(let i=0; i< this.bar.series.length ; i++){
            //     if( this.bar.series[i].stack == '3' ){
            //       cut_now ++;
            //       // this.bar.series.splice(i,1);
            //       this.bar.series.pop();
            //       break;
            //     }
            //   }
            //   // console.log(this.bar.series)
            // }
          }
        }
        // 捕获点击 其他块 的事件
        else if(param.data.tag == 3){
          if( !this.reverse_3 ){
            // console.log("haha")
            this.reverse_3 = !this.reverse_3;
            for (let i = 0; i < 4; i++) {
              this.bar.series.push({
                type: 'bar',
                stack: '5',
                legendHoverLink: false,
                barWidth: 60,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    formatter: this.normalBlockData[i].name,
                },
                data: [
                    {
                        value: this.normalBlockData[i].data,
                        tag: 22 + i,
                        // itemStyle: {
                        //     color: this.colorList[i],
                        // },
                    },
                ],
              });
            }
          }
          else{
            this.reverse_3 = !this.reverse_3;
            let cut_all = 0;
            let cut_now = 0;
            for(let i=0 ; i < this.bar.series.length ; i++){
              if( this.bar.series[i].stack == '5' ){
                cut_all ++;
                this.bar.series[i].label.formatter = '';
                this.bar.series[i].data[0].value = 0;
                // this.bar.series.splice(i,1);
              }
            }
            // 删除多余元素，但是会导致渲染上的问题
            // while( cut_now != cut_all) {
            //   for(let i=0; i< this.bar.series.length ; i++){
            //     if( this.bar.series[i].stack == '3' ){
            //       cut_now ++;
            //       // this.bar.series.splice(i,1);
            //       this.bar.series.pop();
            //       break;
            //     }
            //   }
            //   // console.log(this.bar.series)
            // }
          }
        }


        console.log(this.bar.series)
      }
      // onClick(event, instance, echarts) {
      //   console.log(arguments);
      // }
    }
  };
</script>
 
<style scoped>
  /* .echarts {
    width: 400px;
    height: 400px;
  } */
</style>