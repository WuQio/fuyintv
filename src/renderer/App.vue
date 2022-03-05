<template v-cloak>
  <div id="app">

    <el-input
            @keyup.enter.native="searchFunc"
            id="searchInput"
            :clearable="true"
            size="medium"
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="searchText">
    </el-input>

    <el-dialog
            width="850px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            top="8vh"
            :title="dialogTitle"
            :v-loading="dialogLoading"
            :before-close="handleClose"
            :visible="playerVisible">
      <VideoPlayer ref="player" />

    </el-dialog>

    <el-row>
      <el-col style="width: 250px" :span="6" v-for="obj in showData" @click.native="showEpisode(obj)">
          <div class="grid-content bg-purple">
              <Card :obj="obj"></Card>
          </div>
      </el-col>
    </el-row>
    <el-drawer
            :modal="false"
            :size="320"
          title="该专辑下的所有集数"
          :visible.sync="drawer"
          direction="rtl">
          <Episode ref="episode"
                   :episodeObj="episodeObj"
                   @changeM3u8Src="changeM3u8Src"
                   @changeDialogLoading="changeDialogLoading"
                   @changeDialogTitle="changeDialogTitle"
          />
    </el-drawer>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[50, 100, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next"
              :total="total">
      </el-pagination>
  </div>
</template>

<script>
  import Card from './components/Card'
  import Episode from './components/Episode'
  import VideoPlayer from './components/VideoPlayer'
  import json from './assets/fuyin_tv_all_movie'

  const fs = require('fs')
  let allData;

  export default {
    name: 'fuyintv',
    components: {
      VideoPlayer,
      Card, Episode
    },
    data () {
      return {
        drawer: false,
        pageSize: 50,
        // 集数信息
        episodeObj: null, // click过卡片之后的单条数据
        allData: null, // 所有的数据对象
        total: 0, //所有条数
        currentPage: 1,
        cursor: 0, // 用于分页使用的游标
        movieIdArr: null, // 把allData的keys另存为数组，方便使用
        showData: null,
        m3u8Src: "",
        playerVisible: false,
        dialogLoading: false,
        dialogTitle: "",
        searchText: ""
      }
    },
    methods: {
      initData(allData) {
        let movieIdArr = Object.keys(allData)
        let showData = []
        // 初始化showData
        let len = movieIdArr.length>=50 ? 50 : allData.length
        for (let idx = 0; idx < len; idx++) {
          showData.push(allData[movieIdArr[idx]])
        }
        this.episodeObj = allData[movieIdArr[0]]
        this.allData = allData
        this.total = movieIdArr.length
        this.cursor = 0
        this.currentPage = 1
        this.movieIdArr = movieIdArr
        this.showData = showData
      },
      showEpisode (obj) {
        console.log(obj)
        this.drawer = true
        this.$data.episodeObj = obj
      },
      handleSizeChange (val) { // 修改每页条数时
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        // 修改每页显示长度之后，showData也要更新
        this.showData.length = 0
        for (let idx = 0; idx < this.pageSize; idx++) {
          this.showData.push(this.allData[this.movieIdArr[idx + this.cursor]])
        }
        console.log(this.showData)
      },
      handleCurrentChange (val) { // 修改页码时
        console.log(`当前页: ${val} 页`)
        this.cursor = this.pageSize * (val - 1)
        this.episodeObj = this.allData[this.movieIdArr[this.cursor]]
        // 修改显示的内容
        let idxMax = (this.cursor + this.pageSize >= this.movieIdArr.length)
          ?
          this.movieIdArr.length - this.cursor
          :
          this.pageSize

        this.showData.length = 0
        for (let idx = 0; idx < idxMax; idx++) {
          this.showData.push(this.allData[this.movieIdArr[idx + this.cursor]])
        }
      },
      handleClose () {
        this.playerVisible = false;
        this.$refs.player.pause()
      },
      changeM3u8Src (src) {
        this.m3u8Src = src;
        this.playerVisible = true;
        let that = this;
        setTimeout(()=>{
          that.$refs.player.changeSrc(src)
        }, 300)
      },
      changeDialogLoading (bool) {
        this.dialogLoading = bool
      },
      changeDialogTitle (title) {
        this.dialogTitle = title;
      },
      searchFunc () {
        // if (this.searchText.length === 0) {
        //   return;
        // }
        let searchRes = []
        let movieIdArr = Object.keys(allData);
        for (let key of movieIdArr) {
          if (
            allData[key].title.indexOf(this.searchText) >=0
            || allData[key].content.indexOf(this.searchText) >=0
            || allData[key].actor.indexOf(this.searchText) >=0
          ) {
            searchRes.push(allData[key])
          }
        }
        console.log(searchRes)
        this.initData(searchRes)
      }
    },
    mounted () {      // 同步读取文件
      // let allMovieStr = fs.readFileSync([__dirname, '\\assets\\fuyin_tv_all_movie.json'].join(''), 'utf-8')
      // allData = JSON.parse(allMovieStr)
      allData = json;
      this.initData(allData);
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
      cursor: pointer;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin: 12px 12px 12px 12px;
    transition-duration: .2s;
  }
  .grid-content:hover {
      padding-top: 0;
      transition-duration: .3s;
      transform: translateY(-2px);
      box-shadow: 0 12px 16px 0 rgba(0,0,0,.3)
  }
  .row-bg {
    background-color: #f9fafc;
  }
    .el-pagination {
        text-align: center;
        position: fixed;
        bottom: 12px;
        width: 410px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        background-color: #DCDFE6;
        border-radius: 2px;
        display: inline-table;
        padding: 4px;
    }
    #app {
        user-select: none;
        -webkit-app-region: no-drag;
    }
  #searchInput {
    display: inline;
    width: 170px;
    transition-duration: .8s;
    transition-property: all;
    transition-timing-function: ease;
    transition-delay: 0s;
    border: none;
    border-bottom: 1px solid #DCDFE6;
  }
  #searchInput:focus {
    width: 500px;
    border: 1px solid #DCDFE6;

  }

</style>
