<template>
  <div class="collection-history">
    <!-- 标题栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="收藏/历史"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- tab栏 -->
    <van-tabs
      v-model="active"
      title-active-color="#3296fa"
      color="#3296fa"
      swipeable line-width="80"
      :border="true"
    >
      <van-tab title="我的收藏">
        <collect-history-list path="article/collections" />
      </van-tab>
      <van-tab title="我的历史">
        <collect-history-list path="user/histories" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CollectHistoryList from './components/collect-history-list'

export default {
  components: {
    CollectHistoryList
  },
  data () {
    return {
      active: 0
    }
  },
  created () {
    // 监听active的变化，改变active
    this.$watch('$route', newValue => {
      if (newValue.name === 'collect') {
        this.active = 0
      } else {
        this.active = 1
      }
    }, {
      immediate: true
    })
  }
}
</script>

<style lang="less" scoped>
.collection-history {
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  /deep/.van-tabs__wrap {
    position: fixed;
    top: 92px;
    left: 0;
    width: 100%;
    z-index: 99;
  }
  /deep/.van-tabs__content {
    padding-top: 180px;
  }
}
</style>
