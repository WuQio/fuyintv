<template>
<el-card>


    <div>
        <div id="card"  slot="reference">
        <img width="100%" height="270" :src="obj.pic" alt="" />
        <div id="info">
            <span style="display: block; text-align: center; color: #303133">{{ obj.title }}</span>
            <span style="display: block; text-align: center; color: #909399">{{ obj.actor }}</span>
            <span style="width: 100%">
                <i @click.stop="showInfo(obj)" class="el-icon-question">详细信息</i>
            </span>
        </div>
        </div>
    </div>

</el-card>
</template>

<script>
  export default {
    name: 'Card',
    props: ['obj'],
    methods: {
      showInfo: function (obj) {
        this.$alert(obj.content, '详细信息', {dangerouslyUseHTMLString: true})
      }
    }
  }
</script>

<style scoped>
    #card {
        height: 320px;
    }
    .el-icon-question:hover {
        color: #409EFF;
    }
</style>
<style>
    .el-card__body {
        padding: 12px;
    }
    .el-card:hover {
        /*box-shadow: 0 12px 16px 0 rgba(0,0,0,.3)*/
    }
</style>
