<template>
  <div class="activity"
       ref="wrapper">
    <div class="scroll-content">
      <div class="pull-down-tip">{{ pulldownMsg }}</div>
      <activity-item v-for="item of listData"
                     :key="item.id"
                     :itemData="item"></activity-item>
      <div class="pull-up-tip">{{ pullupMsg }}</div>
    </div>
  </div>
</template>

<script>
import activityItem from './children/Item'
import BScroll from 'better-scroll'

export default {
  name: 'activity',
  components: { activityItem },
  data () {
    return {
      listData: [],
      pulldownMsg: '下拉刷新', // 下拉文字信息
      pullupMsg: '加载更多', // 上拉文字信息
      page: 1, // 当前页
      pageSize: 10, // 要加载的条数
      total: 0 // 数据总条数
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      const that = this

      const params = {
        page: this.page,
        page_size: this.pageSize
      }

      // 首次加载
      this.$api.activity.getActivity(params).then((res) => {
        this.listData = this.dataProcessing(res.data)
        this.page = 1
        this.total = res.data.total
        if (!res.data || res.data.length === 0) {
          this.$toast('暂无活动,敬请期待!')
        }
        // 刷新列表后，重新计算滚动区域高度
        this.scroll.refresh()
      })

      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 1,
          click: true,
          taps: true
        })

        // 滑动过程中事件
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 20) {
            this.pulldownMsg = '释放立即刷新'
          }
        })

        // 滑动结束松开事件
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y > 20) {
            // 下拉刷新
            that.$api.activity.getActivity(params).then((res) => {
              this.listData = this.dataProcessing(res.data)
              that.page = 1
              that.total = res.data.total
              if (res.data.length === 0) {
                that.$toast('暂无活动,敬请期待!')
              }

              that.pulldownMsg = '下拉刷新'

              that.scroll.refresh()
            })
          }
          else if (pos.y < (this.scroll.maxScrollY - 30)) {
            // 上拉加载
            if (this.listData.length < this.total) {
              this.page++
              this.pullupMsg = '加载中...'
              that.$api.activity.getActivity(params).then((res) => {
                this.listData = this.listData.concat(this.dataProcessing(res.data))
                that.total = res.data.total
                that.pullupMsg = '加载更多'
                that.scroll.refresh()
              })
            } else {
              this.pullupMsg = '已经到底了'
            }
          }
        })
      })
    },

    // 处理数据
    dataProcessing (data) {
      let result = []
      if (data && data.length > 0) {
        for (let item of data) {
          result.push({
            id: item.id,
            title: item.name,
            endTime: item.apply_time_prompt,
            hasTime: item.activity_apply_status === '进行中' ? true : false,
            imgSrc: item.front_cover
          })
        }
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.activity {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.scroll-content {
  padding: 32px;
  box-sizing: border-box;
  min-height: 100%;
}
.pull-down-tip {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #555;
}
.pull-up-tip {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #777;
  position: absolute;
  bottom: -35px;
  left: 0;
}
</style>
