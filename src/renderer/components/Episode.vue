<template>
    <el-table
            :show-header="false"
            :data="episodeObj.urls"
            style="width: 100%">
        <el-table-column
                prop="title"
                label="标题"
                width="180">
        </el-table-column>
        <el-table-column
                prop="mp4"
                label="播放"
                width="120">
            <template slot-scope="scope">
                <i
                        class="el-icon-video-play"
                        :style="{color: scope.row.mp4?'#409EFF':'', cursor: scope.row.mp4?'pointer':''}"
                        @click="videoPlay(episodeObj.movid, scope.row.urlid, episodeObj.title + ' - ' + scope.row.title)"
                >
                </i>
            </template>

        </el-table-column>
    </el-table>
</template>
<script>
    import {getM3u8} from '../axios/api'

  export default {
    name: 'Episode',
    props: ['episodeObj'],
    data () {
      return {
      }
    },
      methods: {
        videoPlay (movid, urlid, title) {
            this.$emit('changeDialogLoading', true)
            this.$emit('changeDialogTitle', title)
            getM3u8(movid, urlid, (data)=>{
                let url_1 = data['url_1']
                this.$emit('changeM3u8Src', url_1)
                this.$emit('changeDialogLoading', false)
            })
        }
      }
  }
</script>

<style scoped>

</style>
