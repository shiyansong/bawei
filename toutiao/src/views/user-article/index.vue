<template>
  <div class="user-article">
    <van-nav-bar
      class="page-nav-bar"
      :title="appointUserInfo.name"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="header">
      <div class="header-top">
        <van-image class="avatar" round :src="appointUserInfo.photo" />
        <div class="user-info">
          <ul class="user-info-top">
            <li>
              <span>{{ appointUserInfo.art_count }}</span>
              <span>发布</span>
            </li>
            <li>
              <span>{{ appointUserInfo.follow_count }}</span>
              <span>关注</span>
            </li>
            <li>
              <span>{{ appointUserInfo.fans_count }}</span>
              <span>粉丝</span>
            </li>
            <li>
              <span>{{ appointUserInfo.like_count }}</span>
              <span>或赞</span>
            </li>
          </ul>
          <div class="btn-wrapper">
            <van-button type="primary" class="btn">私信</van-button>
            <van-button class="btn" v-if="appointUserInfo.is_following">已关注</van-button>
            <van-button class="btn follow-btn" v-else>关注</van-button>
          </div>
        </div>
      </div>
      <div class="header-bottom">简介：</div>
    </div>
    <!-- 用户文章列表 -->
    <user-article-list />
  </div>
</template>

<script>
import UserArticleList from './components/user-article-list'

import { getAppointUser } from '@/api/user'

export default {
  components: {
    UserArticleList
  },
  data () {
    return {
      appointUserInfo: {} // 关注用户的信息
    }
  },
  async created () {
    // 获取用户id
    const userId = this.$route.params.userId
    // 获取数据
    const { data } = await getAppointUser(userId)
    data.message === 'OK' && (this.appointUserInfo = data.data)
  }
}
</script>

<style lang="less" scoped>
.user-article {
  .header {
    padding: 24px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background-color: #fff;
    .header-top {
      display: flex;
      align-items: center;
      .avatar {
        width: 156px;
        height: 156px;
        margin-right: 24px;
      }
      .user-info {
        flex: 1;
        font-size: 24px;
        .user-info-top {
          display: flex;
          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: center;
            span:first-child {
              margin-bottom: 5px;
              font-size: 28px;
            }
          }
        }
        .btn-wrapper {
          margin-top: 10px;
          display: flex;
          justify-content: space-around;
          .btn {
            width: 224px;
            height: 60px;
            font-size: 24px;
          }
          .follow-btn {
            background-color: #f85959;
          }
        }
      }
    }
    .header-bottom {
      margin-top: 20px;
      font-size: 28px;
    }
  }
}
</style>
