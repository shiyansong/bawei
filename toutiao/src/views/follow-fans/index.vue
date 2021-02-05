<template>
  <div id="follow-fans">
    <van-nav-bar class="page-nav-bar" left-arrow @click-left="$router.back()">
      <template #title>
        <van-tabs
          v-model="active"
          background="#3196fa"
          color="#fff"
          title-inactive-color="#fff"
          title-active-color="#fff"
          :swipeable="true"
        >
          <!-- 关注 -->
          <van-tab title="关注" :title-style="followStyle">
            <follow-fans-list />
          </van-tab>
          <!-- 粉丝 -->
          <van-tab title="粉丝">
            <follow-fans-list />
          </van-tab>
        </van-tabs>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import FollowFansList from './components/follow-fans-list'

export default {
  components: {
    FollowFansList
  },
  data () {
    return {
      active: 0, // 切换的下标
      followStyle: {
        'margin-right': '74px'
      }
    }
  },
  created () {
    // 监听路由的变化，改变active
    this.$watch('$route', newValue => {
      if (newValue.name === 'follow') {
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

<style lang="less" scoped></style>
