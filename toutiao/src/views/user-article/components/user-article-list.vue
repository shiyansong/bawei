<template>
 <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="article-content"
        v-for="(item, index) in list"
        :key="index"
        @click="$router.push({ name: 'article', params: { articleId: item.art_id } })"
      >
        <!-- 头像 -->
        <van-cell :border="false" class="user">
          <template #title>
            <van-image round class="avatar" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            <div class="user-info">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.pubdate | relativeTime }}</span>
            </div>
          </template>
        </van-cell>
        <!-- 描述 -->
        <van-cell
          class="content"
          :title="item.title"
          :border="false"
        />
        <!-- 评论点赞收藏-->
        <ul class="icon-list">
          <li>
            <van-icon name="comment-o" />
            <span>{{ item.comm_count }}</span>
          </li>
          <li>
            <van-icon name="good-job-o" />
            <span>{{ item.like_count }}</span>
          </li>
          <li>
            <van-icon name="star-o" />
            <span>{{ item.collect_count }}</span>
          </li>
        </ul>
      </div>
    </van-list>
 </div>
</template>

<script>
import { getUserArticle } from '@/api/user'

export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1, // 页码数
      perPage: 10 // 每页显示的数据条数
    }
  },
  methods: {
    async onLoad () {
      try {
        // 获取用户id
        const userId = this.$route.params.userId
        // 1. 获取数据
        const { data } = await getUserArticle(userId, {
          page: this.page,
          per_page: this.perPage
        })
        const { results } = data.data
        // 2. 将请求过来的数据push到list数组
        this.list.push(...results)
        // 3. 将loadding的状态置为false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) { // 还有数据
          // 有就更新获取下一页的数据页码
          this.page++
        } else { // 没有数据了
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  .article-content {
    margin-bottom: 12px;
    .user {
      .van-cell__title {
        display: flex;
        align-items: center;
      }
      .avatar {
        width: 72px;
        height: 72px;
        margin-right: 10px;
      }
      .user-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: 0;
        span {
          font-size: 28px;
        }
        span:last-child {
          font-size: 24px;
          color: #999;
        }
      }
    }
    .content {
      padding-top: 0;
    }
  }
  .icon-list {
    display: flex;
    padding-bottom: 24px;
    background-color: #fff;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      span {
        margin-left: 10px;
        font-size: 28px;
        color: #333;
      }
    }
  }
}
</style>
