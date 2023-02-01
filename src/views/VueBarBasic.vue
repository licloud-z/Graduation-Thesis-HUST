<template>
  <div class="echarts">
    <IEchartss 
      :option="bar" 
      :style="{ height: '500px', padding: '30px'}"
    ></IEchartss>
  </div>
</template>
 
<script type="text/babel">
  import IEchartss from 'vue-echarts';
  export default {
    name: 'viewChart',
    components: {
      IEchartss
    },
    mounted(){
        let localLegend = [];
        localLegend.push(this.legendData[0]);
        localLegend.push(this.legendData[1]);
        localLegend.push({ name: this.legendData[2].name + '2-1024', data: 110 });
        localLegend.push({ name: '', data: 0 });
        localLegend.push({ name: '', data: 0 });
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
    },
    data() {
        return {
          BlockGroup: 0,
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
            }
        }
    },
    
  };
</script>
