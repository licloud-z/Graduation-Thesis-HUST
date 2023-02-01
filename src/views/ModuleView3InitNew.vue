<template>
    <!-- 输入文件路径和名称,进入init前  -->
    <div v-if="this.is_changed == 0">
        <div class="span-all"  style="position: absolute; margin-top: 180px;">
            <div class="span-left">
                <div class="span-txt span-txt1">请输入要操作的文件所在的路径, 例如 /home</div>
            </div>
            <input v-model="this.file_path" class="span-right span-txt span-txt2"/>
        </div>
        <div class="span-all"  style="position: absolute; margin-top: 240px;">
            <div class="span-left">
                <div class="span-txt span-txt1">请输入要操作的文件的名称</div>
            </div>
            <input v-model="this.file_name" class="span-right span-txt span-txt2"/>
        </div>
        
        <button @click="this.changeStage()" class="my-button" style="position: absolute; margin-top: 600px; margin-left: 600px;">
            <div class="my-button-txt">开始</div>
        </button>
    </div>

    <!-- 开始创建文件  -->
    <div v-else-if="this.is_changed == 1">
        <div id="demo">
            <div style="width: 1400px; height: 700px;">
                <transition name="fade"  style="padding-top: 200px;">
                    <div v-show="page == 0">
                        <h1>对文件的操作将从文件系统的根目录 / 开始</h1>
                    </div> 
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 1">
                        <h1>EXT文件系统预留了一些inode号，其中/ 的inode号为2</h1>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 2">
                        <h1>2号inode存储在块组0的 inode表 区域中。</h1>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="page == 3">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart3" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 4">
                        <h1>每个块组有 {{ this.block_per_group }}个data block</h1>
                        <h1>{{ this.block_num }} % {{this.block_per_group}} = {{ Math.floor(this.block_num / this.block_per_group) }} </h1>
                        <h1>因此该data block位于 块组{{ Math.floor(this.block_num / this.block_per_group) }}</h1>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="page == 5">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart5" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                <div class="box-table">
                                    <div class="box-row">
                                        <div class="left-box">
                                            inode号
                                        </div>
                                        <div class="right-box">
                                            文件/路径名
                                        </div>
                                        <div class="right-box">
                                            权限
                                        </div>
                                        <div class="right-box">
                                            所有者
                                        </div>
                                        <div class="right-box">
                                            日期
                                        </div>
                                    </div>
                                    <div 
                                        v-for="(f,index) in this.inode_list" 
                                        :key="index" 
                                        class="box-row"
                                        @mouseover="this.change_color = index"
                                        @mouseout="this.change_color = -1"
                                        :class="{'change-hover': index == this.change_color, 'change-inode': f.son_inode== this.son_inode}"
                                    >
                                        <div class="left-box">
                                            {{f.son_inode}}
                                        </div>
                                        <div class="right-box">
                                            {{f.son_name}}
                                        </div>
                                        <div class="right-box">
                                            {{f.permission}}
                                        </div>
                                        <div class="right-box">
                                            {{f.author}}
                                        </div>
                                        <div class="right-box">
                                            {{f.date}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 6">
                        <h1>每个块组有 {{ this.inode_per_group }}个inode</h1>
                        <h1>{{ this.son_inode }} % {{ this.inode_per_group }} = {{ Math.floor(this.son_inode / this.inode_per_group) }} </h1>
                        <h1>因此该inode位于 块组{{ Math.floor(this.son_inode / this.inode_per_group) }}</h1>
                    </div>
                </transition>

                <transition name="fade">
                    <div v-show="page == 7">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart7" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 8">
                        <h1>每个块组有 {{ this.block_per_group }}个data block</h1>
                        <h1>{{ this.block_num }} % {{this.block_per_group}} = {{ Math.floor(this.block_num / this.block_per_group) }} </h1>
                        <h1>因此该data block位于 块组{{ Math.floor(this.block_num / this.block_per_group) }}</h1>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="page == 9">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart9" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                <div class="box-table">
                                    <div class="box-row">
                                        <div class="left-box">
                                            inode号
                                        </div>
                                        <div class="right-box">
                                            文件/路径名
                                        </div>
                                        <div class="right-box">
                                            权限
                                        </div>
                                        <div class="right-box">
                                            所有者
                                        </div>
                                        <div class="right-box">
                                            日期
                                        </div>
                                    </div>
                                    <div 
                                        v-for="(f,index) in this.inode_list" 
                                        :key="index" 
                                        class="box-row"
                                        @mouseover="this.change_color = index"
                                        @mouseout="this.change_color = -1"
                                        :class="{'change-hover': index == this.change_color, 'change-inode': f.son_inode== this.son_inode}"
                                    >
                                        <div class="left-box">
                                            {{f.son_inode}}
                                        </div>
                                        <div class="right-box">
                                            {{f.son_name}}
                                        </div>
                                        <div class="right-box">
                                            {{f.permission}}
                                        </div>
                                        <div class="right-box">
                                            {{f.author}}
                                        </div>
                                        <div class="right-box">
                                            {{f.date}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 10">
                        <h1>每个块组有 {{ this.inode_per_group }}个inode</h1>
                        <h1>{{ this.son_inode }} % {{ this.inode_per_group }} = {{ Math.floor(this.son_inode / this.inode_per_group) }} </h1>
                        <h1>因此该inode位于 块组{{ Math.floor(this.son_inode / this.inode_per_group) }}</h1>
                    </div>
                </transition>

                <transition name="fade">
                    <div v-show="page == 11">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart11" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 12">
                        <h1>每个块组有 {{ this.block_per_group }}个data block</h1>
                        <h1>{{ this.block_num }} % {{this.block_per_group}} = {{ Math.floor(this.block_num / this.block_per_group) }} </h1>
                        <h1>因此该data block位于 块组{{ Math.floor(this.block_num / this.block_per_group) }}</h1>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="page == 13">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart13" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                <div class="box-table">
                                    <div class="box-row">
                                        <div class="left-box">
                                            inode号
                                        </div>
                                        <div class="right-box">
                                            文件/路径名
                                        </div>
                                        <div class="right-box">
                                            权限
                                        </div>
                                        <div class="right-box">
                                            所有者
                                        </div>
                                        <div class="right-box">
                                            日期
                                        </div>
                                    </div>
                                    <div 
                                        v-for="(f,index) in this.inode_list" 
                                        :key="index" 
                                        class="box-row"
                                        @mouseover="this.change_color = index"
                                        @mouseout="this.change_color = -1"
                                        :class="{'change-hover': index == this.change_color, 'change-inode': f.son_inode== this.son_inode}"
                                    >
                                        <div class="left-box">
                                            {{f.son_inode}}
                                        </div>
                                        <div class="right-box">
                                            {{f.son_name}}
                                        </div>
                                        <div class="right-box">
                                            {{f.permission}}
                                        </div>
                                        <div class="right-box">
                                            {{f.author}}
                                        </div>
                                        <div class="right-box">
                                            {{f.date}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 14">
                        <h1>每个块组有 {{ this.inode_per_group }}个inode</h1>
                        <h1>{{ this.son_inode }} % {{ this.inode_per_group }} = {{ Math.floor(this.son_inode / this.inode_per_group) }} </h1>
                        <h1>因此该inode位于 块组{{ Math.floor(this.son_inode / this.inode_per_group) }}</h1>
                    </div>
                </transition>

                <transition name="fade">
                    <div v-show="page == 15">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart15" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 16">
                        <h1>每个块组有 {{ this.block_per_group }}个data block</h1>
                        <h1>{{ this.block_num }} % {{this.block_per_group}} = {{ Math.floor(this.block_num / this.block_per_group) }} </h1>
                        <h1>因此该data block位于 块组{{ Math.floor(this.block_num / this.block_per_group) }}</h1>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="page == 17">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart17" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                <div class="box-table">
                                    <div class="box-row">
                                        <div class="left-box">
                                            inode号
                                        </div>
                                        <div class="right-box">
                                            文件/路径名
                                        </div>
                                        <div class="right-box">
                                            权限
                                        </div>
                                        <div class="right-box">
                                            所有者
                                        </div>
                                        <div class="right-box">
                                            日期
                                        </div>
                                    </div>
                                    <div 
                                        v-for="(f,index) in this.inode_list" 
                                        :key="index" 
                                        class="box-row"
                                        @mouseover="this.change_color = index"
                                        @mouseout="this.change_color = -1"
                                        :class="{'change-hover': index == this.change_color, 'change-inode': f.son_inode== this.son_inode}"
                                    >
                                        <div class="left-box">
                                            {{f.son_inode}}
                                        </div>
                                        <div class="right-box">
                                            {{f.son_name}}
                                        </div>
                                        <div class="right-box">
                                            {{f.permission}}
                                        </div>
                                        <div class="right-box">
                                            {{f.author}}
                                        </div>
                                        <div class="right-box">
                                            {{f.date}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 18">
                        <h1>首先，文件系统会查找一个空闲的inode号，并将其分配给新创建的文件.</h1>
                        <h1>本次创建的文件 {{ this.file_fullpath }} 的inode号为 ： {{ this.file_inode }} </h1>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 19">
                        <h1>获取inode号以后，文件系统就正式生成了该文件与其inode号的映射关系</h1>
                        <h1>该关系保存在 {{ this.file_path }} 目录文件下</h1>
                    </div>
                </transition>
                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 20">
                        <h1>为了使用户访问其他文件的时候不会再次将该inode号重新映射，即为了在整个文件系统中标记该inode号已经被占用</h1>
                        <h1>文件系统会更新inode位图,位图的位置就位于当前块组</h1>
                    </div>
                </transition>
                
                <transition name="fade">
                    <div v-show="page == 21">
                        <div class="innerbar innerbar1">
                            <div class="innerbar-txt">互动操作区</div>
                        </div>
                        <div class="barradius">
                            <div id="barChart21" class="barchart"></div>
                        </div>
                        <div class="innerbar innerbar2">
                            <div class="innerbar-txt">信息提示区</div>
                        </div>
                        <div class="tishi" v-html="short_txt"></div>
                        <div class="innerbar innerbar3">
                            <div class="innerbar-txt">结果展示区</div>
                        </div>
                        <div class="infom">
                            <div v-if="this.txt_mod == 1">
                                <div  id="longTxt"  style="text-align: left;" v-html="long_txt"></div>
                            </div>
                            <div v-else-if="this.txt_mod == 2">
                                <div>位图变化前</div>
                                <div  class="box-table">
                                    <div v-for="out_layer of 8" :key="out_layer"  class="box-row">
                                    <div  v-for="in_layer of 3" :key="in_layer" class="right-box" :class="{'change-hover': (in_layer == this.bit_highlight + 2) && (out_layer == 3)}">
                                        {{this.bitmap_before[(out_layer-1)*3 + in_layer -1]}}
                                    </div>
                                    </div>
                                </div>
                                <div>位图变化后</div>
                                <div  class="box-table">
                                    <div v-for="out_layer of 8" :key="out_layer"  class="box-row">
                                    <div  v-for="in_layer of 3" :key="in_layer" class="right-box" :class="{'change-hover': (in_layer == this.bit_highlight + 2) && (out_layer == 3)}">
                                        {{this.bitmap_after[(out_layer-1)*3 + in_layer -1]}}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <transition name="fade"   style="padding-top: 200px;">
                    <div v-show="page == 22">
                        <h1>最后，文件系统的超级块的数据会发生更新</h1>
                        <h1>新建文件前，空闲inode数量: {{ this.inode_number_before }}</h1>
                        <h1>新建文件后，空闲inode数量：{{ this.inode_number_later }}</h1>
                        <h1>新建文件前，空闲block数量: {{ this.block_number_before }}</h1>
                        <h1>新建文件后，空闲block数量：{{ this.block_number_later }}</h1>
                    </div>
                </transition>
            </div>
        </div>

        <div>
            <button v-if="page > 0" @click="this.minusMinus()" class="my-button" style="position: absolute; margin-top: -90px; margin-left: 520px;">
                <div class="my-button-txt">上一步</div>
            </button>
            <button v-if="is_show == 1 && page < 22" @click="this.plusPlus()" class="my-button" style="position: absolute; margin-top: -90px; margin-left: 700px;">
                <div class="my-button-txt">下一步</div>
            </button>
        </div>
            
        <div v-if="is_show == 1">
            
        </div>
        <!-- <button @click="this.plusPlus()">下一步</button> -->
    </div>
</template>

<script>
import * as echarts from 'echarts';

const fs = require('fs');
const path_cargo = require('path');
let exec = require('child_process').execSync;
let root_path = path_cargo.join(__dirname, '../../../../../../');

export default {
    // name: "eCharts",
    // mounted(){
    //     this.showChart()
    // },
    data() {
        return {
            is_show: 1,
            is_changed: 0,
            page: 0,
            change_color: 0,

            file_path: '/home/li/essay',
            file_name: 'a.txt',
            file_inode: 0,

            block_num: 0,
            inode_list: [],
            son_inode: 0,
            inode_number_before: 0,
            inode_number_later: 0,
            block_number_before: 0,
            block_number_later: 0,
            bitmap_before: [],
            bitmap_after: [],
            bit_highlight: 0,
            //基本信息
            block_per_group: 32768,
            inode_per_group: 8192,


            // echart的数据
                long_txt: '',
                short_txt: '',
                txt_mod: 0,

                BlockGroup: 107,
                is_reverse: 0,
                passvalue: 5,
                seriesList: [],

                // is_jump: true, // 跳转前还是跳转后
                // jump_group: 0,  // 跳转的group
                // loading: false,
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
                }
        }
    },
    methods: {
        minusMinus(){
            this.page --;
            this.is_show = 1
            this.changeChart()
        },
        plusPlus(){
            this.page ++;
            this.changeChart()
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
            // console.log(work_list);
            return work_list;
        },
        //及时销毁echart实例
        changeChart(){
            if(this.page == 3){
                this.seriesList = []
                this.showChart(this.page, '/', 'home');
            }else if(this.page == 5){
                this.seriesList = []
                this.showChart(this.page, '/', 'home');
            }else if(this.page == 7){
                this.seriesList = []
                this.showChart(this.page, '/home', 'li');
            }else if(this.page == 9){
                this.seriesList = []
                this.showChart(this.page, '/home', 'li');
            }else if(this.page == 11){
                this.seriesList = []
                this.showChart(this.page, '/home/li', 'essay');
            }else if(this.page == 13){
                this.seriesList = []
                this.showChart(this.page, '/home/li', 'essay');
            }else if(this.page == 15){
                this.seriesList = []
                this.showChart(this.page, '/home/li/essay', 'a.txt');
            }else if(this.page == 17){
                this.seriesList = []
                this.showChart(this.page, '/home/li/essay', 'a.txt');
            }else if(this.page == 18){
                // 获取新建前的位图信息
                let bitmap_buffer_before = new Buffer.alloc(4096);
                let bitmap_buffer_after = new Buffer.alloc(4096);
                try{
                    let cmd = 'stat -t '+ this.file_path;
                    let workprocess = exec(cmd);
                    let path_inode = workprocess.toString('utf8').split(" ")[7];
                    let path_group = this.getGroupFromInode(path_inode);

                    let path_big_group = Math.floor( path_group / 16 );
                    let path_remain = path_group % 16;
                    // console.log('path group '+ path_big_group + '  '+ path_remain);

                    let path_inode_block = this.block_per_group * (path_big_group ) * 16 + 16 + path_remain;
                    // console.log('path_inode_block '+ path_inode_block);

                    let fd = fs.openSync('/dev/sda5');
                    
                    fs.readSync(fd, bitmap_buffer_before, 0, 4096, 4096 * path_inode_block);
                    // console.log('buffer是' + buffer[1262].toString(2));
                    console.log(bitmap_buffer_before);

                    // let big_offset = file_inode % this.inode_per_group;
                    // let small_offset = Math.floor(big_offset / 8);
                    // console.log('位图就在!' + bitmap_buffer_after[small_offset]);
                }
                catch(err){
                    console.log('get inode bitmap error!');
                }
                
                // 获取新建前的文件系统信息
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

                // 新建文件环节
                try {
                    let cmd = 'touch '+ this.file_fullpath;
                    let workprocess = exec(cmd);
                }
                catch(err){
                    console.log('create file error');
                }

                // 获取新建后的文件系统信息
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


                // 展示inode位图环节
                try {
                    let cmd = 'ls -li ' + this.file_fullpath;
                    let workprocess = exec(cmd);
                    let file_inode = Number(workprocess.toString('utf8').split(' ')[0]);
                    this.file_inode = file_inode;

                    let path_group = this.getGroupFromInode(file_inode);

                    let path_big_group = Math.floor( path_group / 16 );
                    let path_remain = path_group % 16;
                    // console.log('path group '+ path_big_group + '  '+ path_remain);

                    let path_inode_block = this.block_per_group * (path_big_group ) * 16 + 16 + path_remain;
                    // console.log('path_inode_block '+ path_inode_block);

                    let fd = fs.openSync('/dev/sda5');
                    
                    fs.readSync(fd, bitmap_buffer_after, 0, 4096, 4096 * path_inode_block);
                    // console.log('buffer是' + buffer[1262].toString(2));
                    console.log(bitmap_buffer_after);
                    // console.log('file_inode是' + file_inode);

                    let big_offset = file_inode % this.inode_per_group;
                    let small_offset = Math.floor(big_offset / 8);
                    console.log('位图就在!' + bitmap_buffer_after[small_offset]);
                    console.log('位图就在!' + bitmap_buffer_before[small_offset]);
                    this.bit_highlight = small_offset % 3;

                    let start = ( Math.floor(small_offset / 8) - 1 ) *8;
                    for(let item=0; item< 24; item ++){
                    this.bitmap_before.push(bitmap_buffer_before[start].toString(2).padStart(8, '0'));
                    this.bitmap_after.push(bitmap_buffer_after[start].toString(2).padStart(8, '0'));
                    start ++ ;
                    }
                }
                catch(err){
                    console.log('error');
                }

            }else if(this.page == 21){
                this.seriesList = []
                this.txt_mod = 1
                this.showChart(this.page, '/home/li/essay', 'a.txt');
            }
        },
        changeStage(){
            // let stat = fs.statSync(this.file_path);
            if( fs.existsSync(this.file_path) ){
                if( !fs.existsSync(this.file_fullpath)){
                    this.is_changed = 1;
                }else{
                    alert('文件已经存在')
                }
                
                // alert('文件路径正确');
            }else{
                alert('文件路径错误');
            }
        },
        pushSeriesList(mode){
            let localLegend = [];
            if(mode == 0){
                localLegend.push(this.legendData[0]);
                localLegend.push(this.legendData[1]);
                localLegend.push({ name: this.legendData[2].name + '2-1024', data: 110 });
                localLegend.push({ name: '', data: 0 });
                localLegend.push({ name: '', data: 0 });
            }else{
                //传递数据
                let start_num1 = 2;
                let end_num1 = this.BlockGroup - 1;
                let start_num2 = this.BlockGroup +1;
                let end_num2 = 1024;
                
                localLegend.push(this.legendData[0]);
                localLegend.push(this.legendData[1]);
                localLegend.push({ name: this.legendData[2].name + start_num1 + '-' + end_num1, data: (end_num1 - start_num1) * 100 / 1024 });
                localLegend.push({ name: this.legendData[3].name + this.BlockGroup, data: this.legendData[3].data });
                localLegend.push({ name: this.legendData[4].name + start_num2 + '-' + end_num2, data: (end_num2 - start_num2) * 100 / 1024 });
            }
            for (let i = 0; i < 5; i++) {
                this.seriesList.push({
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
        showChart(num, path, next_path) {
            //如果有,销毁之前的实例
            echarts.init(document.getElementById('barChart'+num)).dispose();
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('barChart'+num));
            // 屏蔽 下一步
            this.is_show = 0;
            
            this.short_txt = ''
            this.long_txt = ''

            if(this.page == 3 || this.page == 5){
                this.BlockGroup = 0;
                this.pushSeriesList(0);
            }else if(this.page == 7 || this.page == 11 || this.page == 15  || this.page == 21 ){
                this.BlockGroup = Math.floor(this.son_inode / this.inode_per_group);
                this.pushSeriesList(1);
            }else if(this.page == 9  || this.page == 13 || this.page == 17 ){
                this.BlockGroup = Math.floor(this.block_num / this.block_per_group);
                this.pushSeriesList(1);
            }

            // 指定图表的配置项和数据
            var option = {
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
                series: this.seriesList,
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
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            // 解决方法: 提前定义好that
            let that = this;
            myChart.on('click', function (param) { //这里根据param填写你的跳转逻辑
                // console.log(param.data.tag);

                // 捕获点击 “超级块”的事件
                if(param.data.tag == 0){
                if( !that.reverse_0 ){
                    that.reverse_0 = !that.reverse_0;
                    for (let i = 0; i < 8; i++) {
                    that.seriesList.push({
                        type: 'bar',
                        stack: '3',
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

                // if(param.data.tag == 11 || param.data.tag == 18 || param.data.tag == 22){
                // let alert_msg1 = '在文件系统中,每个块组由数量相同的逻辑块组成\n'
                // let alert_msg2 = '为了更好的管理块,使得系统能够更快得知当前块是否被使用\n'
                // let alert_msg3 = 'Ext文件系统使用位图存储每个逻辑块的状态,一个块就对应位图的一个bit位\n'
                // alert(alert_msg1 + alert_msg2 + alert_msg3);
                // }
                // else if(param.data.tag == 14 || param.data.tag == 21 || param.data.tag == 25){
                // let alert_msg1 = '在文件系统中,每个块组由数量相同的逻辑块组成\n'
                // let alert_msg2 = '除去其他由文件系统控制的区域外,这一部分存放了用户的文件数据,其空闲的数据块即代表的当前块组可用的数据块\n'
                // alert(alert_msg1 + alert_msg2);
                // }
                // else if(param.data.tag == 12 || param.data.tag == 19 || param.data.tag == 23){
                // let alert_msg1 = '类似的,在文件系统中,每个块组被分配了相同数量的固定的inode\n'
                // let alert_msg2 = 'inode结构体内保存了其对应的文件以及目录的基本信息\n'
                // let alert_msg3 = '为了更好的管理inode,使得系统能够更快得知当前块是否被使用\n'
                // let alert_msg4 = 'Ext文件系统使用位图存储每个inode的状态,一个inode就对应位图的一个bit位\n'
                // alert(alert_msg1 + alert_msg2 + alert_msg3 + alert_msg4);
                // }
                // else if(param.data.tag == 13 || param.data.tag == 20 || param.data.tag == 24){
                // let alert_msg1 = '在文件系统中,每个块组被分配了相同数量的固定的inode\n'
                // let alert_msg2 = 'inode结构体内保存了其对应的文件以及目录的基本信息\n'
                // let alert_msg3 = '这一部分区域存放了具体的inode结构体的详细数据\n'
                // alert(alert_msg1 + alert_msg2 + alert_msg3);
                // }
                if(that.page == 3){
                    if(param.data.tag == 13){
                        that.txt_mod = 1;
                        // let exec = require('child_process').execSync;
                        let cmd = 'stat '+path;
                        let workprocess = exec(cmd);
                        let work_list = workprocess.toString('utf8').replace(/\n/g, '<br/>');
                        let block_num = that.getBlocks(path);
                        work_list += '<div style="color: green;">blocks块号: '+block_num+'</div>'
                        that.long_txt = work_list;
                        that.short_txt = '就是这样!<br/>如下所示,得到 '+path+' 的data block的块号 '+block_num+'<br/>单击下一步<br/>'
                        that.block_num = block_num
                        that.is_show = 1
                    }
                }else if(that.page == 5){
                    if(param.data.tag == 14){
                        that.txt_mod = 2;
                        
                        let cmd = 'ls -li '+path;
                        let workprocess = exec(cmd);
                        let work_list = workprocess.toString('utf8').split("\n");
                        let inode_list = [];
                        // that.long_txt = work_list

                        // 注意范围！ 从1开始，到length-1结束，以为第一行是用量数据，最后一行为空
                        for(let inode_item=1; inode_item< work_list.length-1; inode_item++){
                            let temper_list = work_list[inode_item].trim().split(" ");
                            // console.log(temper_list);

                            for (let iter = 0; iter < temper_list.length; iter++) {
                                if (temper_list[iter] == '') {
                                temper_list.splice(iter, 1);
                                iter--;//i需要自减，否则每次删除都会讲原数组索引发生变化
                                }
                            }

                            let current_item = {
                                son_inode: temper_list[0],
                                son_name: temper_list[temper_list.length - 1],
                                permission: temper_list[1],
                                author: temper_list[3],
                                date: temper_list[6]+ ' ' + temper_list[7] + '日  ' + temper_list[8],
                            }
                            if(current_item.son_name == next_path){
                                that.son_inode = current_item.son_inode
                                // that.short_txt = that.son_inode
                            }
                            inode_list.push(JSON.parse(JSON.stringify(current_item)));
                        }
                        that.inode_list = inode_list
                        that.short_txt = '就是这样!<br/>注意下方高亮行,查找到 '+next_path+' 对应项<br/>其inode号为 '+that.son_inode+'<br/>单击下一步<br/>'
                        that.is_show = 1
                    }
                }else if(that.page == 7 || that.page == 11 || that.page == 15 ){
                    if(param.data.tag == 24){
                        that.txt_mod = 1;
                        // let exec = require('child_process').execSync;
                        let cmd = 'stat '+path;
                        let workprocess = exec(cmd);
                        let work_list = workprocess.toString('utf8').replace(/\n/g, '<br/>');
                        let block_num = that.getBlocks(path);
                        work_list += '<div style="color: green;">blocks块号: '+block_num+'</div>'
                        that.long_txt = work_list;
                        that.short_txt = '就是这样!<br/>如下所示,得到 '+path+' 的data block的块号 '+block_num+'<br/>单击下一步<br/>'
                        that.block_num = block_num
                        that.is_show = 1
                    }
                }else if(that.page == 9 || that.page == 13){
                    if(param.data.tag == 25){
                        that.txt_mod = 2;
                        
                        let cmd = 'ls -li '+path;
                        let workprocess = exec(cmd);
                        let work_list = workprocess.toString('utf8').split("\n");
                        let inode_list = [];
                        // that.long_txt = work_list

                        // 注意范围！ 从1开始，到length-1结束，以为第一行是用量数据，最后一行为空
                        for(let inode_item=1; inode_item< work_list.length-1; inode_item++){
                            let temper_list = work_list[inode_item].trim().split(" ");
                            // console.log(temper_list);

                            for (let iter = 0; iter < temper_list.length; iter++) {
                                if (temper_list[iter] == '') {
                                temper_list.splice(iter, 1);
                                iter--;//i需要自减，否则每次删除都会讲原数组索引发生变化
                                }
                            }

                            let current_item = {
                                son_inode: temper_list[0],
                                son_name: temper_list[temper_list.length - 1],
                                permission: temper_list[1],
                                author: temper_list[3],
                                date: temper_list[6]+ ' ' + temper_list[7] + '日  ' + temper_list[8],
                            }
                            if(current_item.son_name == next_path){
                                that.son_inode = current_item.son_inode
                                // that.short_txt = that.son_inode
                            }
                            inode_list.push(JSON.parse(JSON.stringify(current_item)));
                        }
                        that.inode_list = inode_list
                        that.short_txt = '就是这样!<br/>注意下方高亮行,查找到 '+next_path+' 对应项<br/>其inode号为 '+that.son_inode+'<br/>单击下一步<br/>'
                        that.is_show = 1
                    }
                }else if( that.page == 17 ){
                    if(param.data.tag == 25){
                        that.txt_mod = 2;
                        
                        let cmd = 'ls -li '+path;
                        let workprocess = exec(cmd);
                        let work_list = workprocess.toString('utf8').split("\n");
                        let inode_list = [];
                        // that.long_txt = work_list

                        // 注意范围！ 从1开始，到length-1结束，以为第一行是用量数据，最后一行为空
                        for(let inode_item=1; inode_item< work_list.length-1; inode_item++){
                            let temper_list = work_list[inode_item].trim().split(" ");
                            // console.log(temper_list);

                            for (let iter = 0; iter < temper_list.length; iter++) {
                                if (temper_list[iter] == '') {
                                temper_list.splice(iter, 1);
                                iter--;//i需要自减，否则每次删除都会讲原数组索引发生变化
                                }
                            }

                            let current_item = {
                                son_inode: temper_list[0],
                                son_name: temper_list[temper_list.length - 1],
                                permission: temper_list[1],
                                author: temper_list[3],
                                date: temper_list[6]+ ' ' + temper_list[7] + '日  ' + temper_list[8],
                            }
                            if(current_item.son_name == next_path){
                                that.son_inode = current_item.son_inode
                                // that.short_txt = that.son_inode
                            }
                            inode_list.push(JSON.parse(JSON.stringify(current_item)));
                        }
                        that.inode_list = inode_list
                        that.short_txt = '就是这样!<br/>可以发现其中不存在 '+next_path+'/'+that.son_inode+ '对应项<br/>这是合理的,因为此时该文件不存在'+'<br/>接下来文件系统会创建该文件<br/>单击下一步<br/>'
                        that.is_show = 1
                    }
                }else if( that.page == 21 ){
                    if(param.data.tag == 23){
                        that.txt_mod = 2;
                        that.is_show = 1
                    }
                }
                

                myChart.setOption(option);
            
            });

            myChart.on('mouseover', function (param) {
                if(that.page == 3){
                    if(param.data.tag == 0){
                        that.short_txt = '恭喜你!寻找成功!<br/>你正沿着文件系统的查找路径逐步深入.<br/>这里存放着 '+path+' 的inode结构体,请单击打开.<br/>'
                    }else if(param.data.tag == 1 || param.data.tag == 2 || param.data.tag == 3 || param.data.tag == 4){
                        that.short_txt = '就快成功了,再想想?<br/>'
                    }else if(param.data.tag == 13){
                        that.short_txt = '恭喜你!寻找成功!<br/>这里存放了 '+path+' 以及其他许多目录inode结构体.<br/>想获得该结构体的详细信息,请单击打开.<br/>'
                    }else{
                        that.short_txt = '就快成功了,再想想?<br/>';
                    }
                }else if(that.page == 5){
                    if(param.data.tag == 0){
                        that.short_txt = '恭喜你!寻找成功!<br/>你正沿着文件系统的查找路径逐步深入.<br/>这里存放着 '+path+' 的block data,请单击打开.<br/>'
                    }else if(param.data.tag == 1 || param.data.tag == 2 || param.data.tag == 3 || param.data.tag == 4){
                        that.short_txt = '就快成功了,再想想?<br/>'
                    }else if(param.data.tag == 14){
                        that.short_txt = '恭喜你!寻找成功!<br/>这里存放了 '+path+' 以及其他文件的block data.<br/>想获得该目录block的详细信息,请单击打开.<br/>'
                    }else{
                        that.short_txt = '就快成功了,再想想?<br/>';
                    }
                }else if(that.page == 7 || that.page == 11 || that.page == 15 ){
                    if(param.data.tag == 3){
                        that.short_txt = '恭喜你!寻找成功!<br/>你正沿着文件系统的查找路径逐步深入.<br/>这里存放着 '+path+' 的inode结构体,请单击打开.<br/>'
                    }else if(param.data.tag == 1 || param.data.tag == 2 || param.data.tag == 0 || param.data.tag == 4){
                        that.short_txt = '就快成功了,再想想?<br/>'
                    }else if(param.data.tag == 24){
                        that.short_txt = '恭喜你!寻找成功!<br/>这里存放了 '+path+' 以及其他许多目录inode结构体.<br/>想获得该结构体的详细信息,请单击打开.<br/>'
                    }else{
                        that.short_txt = '就快成功了,再想想?<br/>';
                    }
                }else if(that.page == 9 || that.page == 13 || that.page == 17 ){
                    if(param.data.tag == 3){
                        that.short_txt = '恭喜你!寻找成功!<br/>你正沿着文件系统的查找路径逐步深入.<br/>这里存放着 '+path+' 的block data,请单击打开.<br/>'
                    }else if(param.data.tag == 1 || param.data.tag == 2 || param.data.tag == 0 || param.data.tag == 4){
                        that.short_txt = '就快成功了,再想想?<br/>'
                    }else if(param.data.tag == 25){
                        that.short_txt = '恭喜你!寻找成功!<br/>这里存放了 '+path+' 以及其他文件的block data.<br/>想获得该目录block的详细信息,请单击打开.<br/>'
                    }else{
                        that.short_txt = '就快成功了,再想想?<br/>';
                    }
                }else if( that.page == 21 ){
                    if(param.data.tag == 3){
                        that.short_txt = '恭喜你!寻找成功!<br/>这里存放着 '+that.file_fullpath+' 的inode位图信息,请单击打开.<br/>'
                    }else if(param.data.tag == 1 || param.data.tag == 2 || param.data.tag == 0 || param.data.tag == 4){
                        that.short_txt = '就快成功了,再想想?<br/>'
                    }else if(param.data.tag == 23){
                        that.short_txt = '恭喜你!寻找成功!<br/>这里存放了 '+that.file_fullpath+' 以及其他很多文件的inode位图信息.<br/>想获得该位图的详细信息,请单击打开.<br/>'
                    }else{
                        that.short_txt = '就快成功了,再想想?<br/>';
                    }
                }
                
            });
        }
    },
    computed: {
        file_fullpath (){
            return this.file_path + '/' + this.file_name;
        },
    },
}
</script>

<style  lang="scss" scoped>
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-active {
  transition: opacity .5s;
  transition-delay: .5s;
}

.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
	opacity: 1;
}



.barChart {
  display: inline-block;
}

.longTxt {
  white-space: pre-wrap;
  overflow-y: auto;
  text-align: left;
}


.box-table {
			border-collapse: collapse;
			display: table;
			width: 100%;
			font-size: 14px;
}

.box-row {
			border-bottom: 1px solid #EBEEF5;
			display: table-row;
}

.left-box {
			padding: 10px;
			vertical-align: middle;
			display: table-cell;
			word-break: break-all;
			color: #42b983;
			width: 30%;
			min-width: 50px;
}

.right-box {
			padding: 10px;
			vertical-align: middle;
			display: table-cell;
			word-break: break-all;
}

.change-hover{
  background-color: yellow;
  color: #42b983;
}

.change-inode{
    background-color: red;
    color: #42b983;
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

  background: #2c3e50;
  width: 600px;
  height: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-top: 6px;
  margin-left: 60px;
  // margin-right: auto;
  // margin-left: auto;
}

.span-right {
  // text-align: left;
  // display: inline-block;
  // width: 40vw;

  background: white;
  width: 660px;
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
  width: 640px;
  height: 36px;
  margin-top: 6px;
  
  // display: flex;
  text-align: center;
  font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 20px;
}

.span-txt1 {
    color: white;
}

.span-txt2 {
    color: black;
    text-align: left;
}

.my-button {
    width: 160px;
    height: 40px;
    border-radius: 60px;
    background-color: #FCD6FF;
    display: flex;
    text-align: center;
    font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
    font-size: 20px;
    // border: 5px;
    // border-color: ;
    margin-right: 43px;
    transition-duration: .5s;
    text-decoration: none;
}
.my-button:hover {
  -webkit-transform: scale(1.1);
}
.my-button-txt {
    width: 160px;
    height: 36px;
    color: #2c3e50;
    text-align: center;
    font-family: "Satoshi-Variable","Helvetica Neue","Helvetica","Arial",sans-serif;
    font-size: 24px;
    font-weight: bold;
}

.barradius {
    background-color: white;
    border-radius: 20px;
    height: 530px;
    width: 900px;
    position: absolute;
    margin-top: 70px;
    margin-left: 20px;
}
.barchart {
    height: 520px;
    width: 900px;
    float: left;
    padding: 10px;
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
  width: 900px;
  background-color: #CBE5FF;
  position: absolute;
  margin-top: 20px;
  margin-left: 20px;
}
.innerbar2 {
  width: 460px;
  background-color: #78F3E2;
  position: absolute;
  margin-top: 20px;
  margin-left: 920px;
  height: 40px;
  border-radius: 10px;
}
.innerbar3 {
  width: 460px;
  background-color: #A5A1FF;
  position: absolute;
  margin-top: 170px;
  margin-left: 920px;
  height: 40px;
  border-radius: 10px;
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

.tishi {
    height: 90px;
    padding: 10px;
    width: 440px;
    float: left;
    background-color: wheat;
    position: absolute;
    margin-top: 60px;
    margin-left: 920px;
    border-radius: 20px;
}
.infom {
    height: 390px;
    float: left; 
    overflow: scroll;
    width: 460px;
    background-color: wheat;
    position: absolute;
    margin-top: 210px;
    margin-left: 920px;
    border-radius: 20px;

}
.infom::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
