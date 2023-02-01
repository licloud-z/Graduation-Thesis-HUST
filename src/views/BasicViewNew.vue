<template>
<div id="all-index">
  <div class="flex">
    <div class="svg-contain" @click="animation">
      <svg xmlns="http://www.w3.org/2000/svg" ref="figure">
        <defs>
          <linearGradient id="lin-gradient1" x1="0" y1="0" x2="100%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#77A1D3"/>
            <stop offset="0.5" stop-color="#79CBCA"/>
            <stop offset="1" stop-color="#E684AE"/>
          </linearGradient>
          <linearGradient id="lin-gradient2" x1="0" y1="0" x2="100%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FEAC5E"/>
            <stop offset="0.5" stop-color="#C779D0"/>
            <stop offset="1" stop-color="#4BC0C8"/>
          </linearGradient>
          <radialGradient id="rad-gradient1" x1="50%" y1="50%" x2="10%" y2="10%" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#000"/>
            <stop offset="0.3" stop-color="#2529bf"/>
            <stop offset="0.6" stop-color="#e93e3a"/>
            <stop offset="0.7" stop-color="#f3903f"/>
            <stop offset="0.8" stop-color="#fdc70c"/>
            <stop offset="0.9" stop-color="#fff33b"/>
          </radialGradient>
          <radialGradient id="rad-gradient2" x1="50%" y1="50%" x2="10%" y2="10%" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#000"/>
            <stop offset="0.3" stop-color="#2529bf"/>
            <stop offset="0.9" stop-color="#5BE2D4"/>
          </radialGradient>
          <radialGradient id="rad-gradient3" x1="50%" y1="50%" x2="10%" y2="10%" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#000"/>
            <stop offset="0.6" stop-color="#2529bf"/>
            <stop offset="0.85" stop-color="#e93e3a"/>
            <stop offset="0.93" stop-color="#f3903f"/>
            <stop offset="0.97" stop-color="#fdc70c"/>
            <stop offset="1" stop-color="#fff33b"/>
          </radialGradient>
        </defs>
        <rect x="0" y="-100" width="1500" height="1000"></rect>

        <g ref="patterngroup"></g>

        <text x="50%" y="50%" :style="{fill: textFill, stroke: textStroke, fontSize: textSize}" font-family="Helvetica" text-anchor="middle">{{ type }}</text>
      </svg>
    </div>
    <!--svg-contain-->
    <!-- <div class="controls">
      <div class="formarea">
        <label for="textupdate">Update the text:</label>
        <input v-model="type" id="textupdate" type="text" />
      </div>
      <div class="formarea">
        <h3>Create Circles:</h3>
        <button @click="createSmCircles">Make small circles</button>
        <button @click="createBigCircles">Make big circles</button>
      </div>
      <div class="formarea">
        <h3>Create Lines:</h3>
        <button @click="createBigLines">Make big lines</button>
        <button @click="createRandLines">Make random lines</button>
      </div>
      <div class="formarea">
        <h3>Animation:</h3>
        <button @click="animation">Play Animation</button>
        <button @click="pauseAnim">Stop Animation</button>
      </div>
      <div class="formarea">
        <h3>Change Text Color:</h3>
        <label for="fill">Fill color:</label>
        <input type="color" v-model="textFill" id="fill" />
        <label for="stroke">Stroke color:</label>
        <input type="color" v-model="textStroke" id="stroke" /><br />
        <label for="size">Text size:</label>
        <input type="number" v-model.number="textSize" id="size" step="5" />
      </div>
      <a ref="dl" @click="downloadSVG"><button class="dlbtn">Download Image</button></a>
    </div> -->
  </div>
  nihao
</div>
hello
</template>

<script>
// @ is an alias to /src
import {TimelineMax, TimelineLite, Sine} from 'gsap';

export default {
  name: 'BasicView',
  components: {
    // VueChartHello,
  },
  data() {
    return {
        file_path: '/',
        isInterval: 0,
        animate_state: 0,
      type: '文件系统教学辅助工具',
      size: 1500,
      my_height: 900,
      numLines: 100,
      textFill: 'white',
      textStroke: '#D7EfEC',
      textSize: 70,
      gradients: ['url(#rad-gradient1)', 'url(#rad-gradient3)', 'url(#rad-gradient2)'],
      gradients2: ['url(#lin-gradient1)', 'url(#lin-gradient2)']
    }
  },
  methods: {
    downloadSVG() {
      const svgData = this.$refs.figure.outerHTML;
      const svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
      const svgUrl = URL.createObjectURL(svgBlob);

      this.$refs.dl.href = svgUrl;
      this.$refs.dl.download = "funtimes.svg";
    },
    createRandLines() {
      const svgNS = this.$refs.figure.namespaceURI;
      this.$refs.patterngroup.innerHTML = '';
      
      for (let i = 0; i < this.numLines; i++) {
        let line = document.createElementNS(svgNS, 'line');
        this.append(this.$refs.patterngroup, line);
        this.setAttributes(line, {
          'x1': this.totesRando(this.size, 0),
          'x2': this.totesRando(this.size, 0),
          'y1': this.totesRando(this.size, 0),
          'y2': this.totesRando(this.size, 0),
          'stroke': this.gradients2[this.totesRando(1, 0)],
          'stroke-width': 3
        });
      }
    },
    createBigLines() {
      const svgNS = this.$refs.figure.namespaceURI;
      this.$refs.patterngroup.innerHTML = '';
      
      for (let i = 0; i < this.numLines; i++) {
        let line = document.createElementNS(svgNS, 'line');
        this.append(this.$refs.patterngroup, line);
        this.setAttributes(line, {
          'x1': this.size/2,
          'x2': this.totesRando(this.size, 0),
          'y1': this.my_height/2,
          'y2': this.totesRando(this.size, 0),
          'stroke': this.gradients[this.totesRando(2, 0)],
          'stroke-width': 5
        });
      }
    },
    createBigCircles() {
      const svgNS = this.$refs.figure.namespaceURI;
      this.$refs.patterngroup.innerHTML = '';
      
      for (let i = 0; i < this.numLines/2; i++) {
        let circ = document.createElementNS(svgNS, 'circle');
        this.append(this.$refs.patterngroup, circ);
        this.setAttributes(circ, {
          'cx': this.size/2,
          'cy': this.size/2,
          'r': this.totesRando(this.size/2, 0),
          'fill': 'none',
          'stroke': this.gradients2[this.totesRando(1, 0)],
          'stroke-width': 1
        });
      }
    },
    createSmCircles() {
      const svgNS = this.$refs.figure.namespaceURI;
      this.$refs.patterngroup.innerHTML = '';
      
      for (let i = 0; i < this.numLines; i++) {
        let circ = document.createElementNS(svgNS, 'circle');
        this.append(this.$refs.patterngroup, circ);
        this.setAttributes(circ, {
          'cx': this.totesRando(this.size, 0),
          'cy': this.totesRando(this.size, 0),
          'r': this.totesRando(10, 3),
          'fill': 'none',
          'stroke': this.gradients[this.totesRando(2, 0)],
          'stroke-width': 1
        });
      }
    },
    animation() {
      let tl = new TimelineMax()
      
      tl.add('begin')
      tl.to('line', 2, {
        rotation: 360,
        repeat: -1,
        transformOrigin: '50% 50%',
        ease: Sine.easeOut
      }, 'begin')
      tl.staggerTo('circle', 1.6, {
        cycle: {
          y: [10, -10, -5, 5, -20, 3],
          x: [-5, 5, -20, 3, 10, -10],
        },
        repeat: -1,
        yoyo: true,
        ease: Sine.easeOut
      }, 0.01, 'begin')
      
      return tl;
    },
    pauseAnim() {
      var tl = TimelineLite.exportRoot();
      tl.pause(0);
    },
    setAttributes(el, attrs) {
      for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },
    append(el, addition) {
      el.appendChild(addition);
    },
    totesRando(max, min) {
      return Math.floor(Math.random() * (1 + max - min) + min);
    },
    handleScroll(event){
        // var scrollTop = document.querySelector('#all-index').scrollTop||document.body.scrollTop;
        // //变量windowHeight是可视区的高度
        // var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // //变量scrollHeight是滚动条的总高度
        // var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        // //滚动条到底部的条件
        // if(scrollTop + windowHeight === scrollHeight){
        //     //写后台加载数据的函数
        //     console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        // }
        console.log(event)
    }
  },
  mounted() {
    const svgNS = this.$refs.figure.namespaceURI,
          vbx = document.createElementNS(svgNS, 'viewBox');

    this.setAttributes(this.$refs.figure, {
      "viewBox": `0 0 ${this.size} 900`,
    });

    this.createBigLines();

    let that = this;
    window.addEventListener('mousewheel', function () {
                that.animate_state = 1
                clearTimeout(that.isInterval);  //滚动时清除定时器
                that.isInterval = setTimeout(function(){
                  that.animate_state = 0
                },500)  //当停止滚动时定时器执行
            })
  },
  watch: {
    animate_state(newVal, oldVal){
      if(oldVal == 0){
        this.animation()
      }else{
        this.pauseAnim()
      }
    }
  }
}
</script>

<style lang="scss">
#all-index {
  // background: black;
  // font-family: 'Khula', sans-serif;
  // color: white;
  // width: 100vw;
  // height: 100vh;
  // margin-top: -500px;
  // position: relative;
  height: 1000px;
  width: 1480px;
  overflow: hidden;
  margin-top: 50px;
  clip: rect(50px, 0px,0px,0px);
  // position: absolute;
  // margin-top: 50px;
}

.flex {
  // display: flex;
}

.svg-contain {
  // flex-grow: 3;
  // padding: 40px;
  // border-right: 1px solid #444;
  svg {
    width: 100%;
    height: 100%;
    // overflow: scroll;
  }
}

.controls {
  flex-grow: 1;
  height: 100vh;
  padding: 50px;
}

@media (max-width: 1700px) {
  .flex {
    display: block !important;
  }
  .svg-contain {
    width: 100%;
  }
  .controls {
    width: 90%;
    padding: 20px !important;
  }
}

</style>
