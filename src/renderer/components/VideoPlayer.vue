<template>
  <video
          id="fuyintv"
          class="video-js vjs-default-skin"
          controls
          preload="auto"
          width="800px"
          height="600px"
          style="margin: 0 auto"
  >
    <source src="https://vod-hls.sanmanuela.com/08福音影视/福音电影/埃及王-中文字幕/埃及王.mp4/index.m3u8?_upt=2c75753f1643088544" type="application/x-mpegURL">
  </video>
</template>

<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'

  let player;
  export default {
    name: 'VideoPlayer',
    mounted () {
      this.init();
    },
    methods:{
      init() {
        player = videojs(
          "fuyintv",
          {
            bigPlayButton: false,
            textTrackDisplay: false,
            posterImage: true,
            errorDisplay: false,
            controlBar: true
          },
          function () {
            this.play();
          }
        )
      },
      pause() {
        player && player.pause();
      },
      dispose() {
        player && player.dispose();
      },
      changeSrc(src) {
        player = videojs('fuyintv');
        player.src([{
          type: "application/x-mpegURL",
          src: src
        }])
        player.play();
      }
    },
    beforeDestroy () {
      this.dispose();
    },
  }
</script>

<style scoped>

</style>
