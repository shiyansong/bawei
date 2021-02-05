<template>
  <div class="follow-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <template #title>
          <div class="content-left">
            <van-image
              round
              class="avatar-img"
              :src="item.photo"
              @click="goUserArticle(item.id)"
            />
            <div class="content">
              <h3>{{ item.name }}</h3>
              <p>粉丝数 {{ item.fans_count }}</p>
            </div>
          </div>
        </template>
        <template #right-icon>
          <follow-user
            class="follow-user"
            v-model="item.mutual_follow"
            :user-id="item.id.toString()"
          />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import FollowUser from './follow-user'
import { getFollows } from '@/api/user'

export default {
  components: {
    FollowUser
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [], // 列表数据
      page: 1, // 页码数
      per_page: 10, // 每页显示的数据条数
      isFollow: false
    }
  },
  methods: {
    async onLoad () {
      // 获取用户类表的数据
      try {
        // 1. 请求获取数据
        const { data } = await getFollows({
          page: this.page,
          per_page: this.per_page
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        console.log(results)
        // console.log(results)
        this.list.push(...results)
        // 3. 将 loading 设置为 false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.page++
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    goUserArticle (id) {
      id = id.toString()
      this.$router.push({ name: 'user-article', params: { userId: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.follow-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 1.22667rem;
  bottom: 0;
  overflow-y: auto;
  .content-left {
    display: flex;
    align-items: center;
    .avatar-img {
      width: 100px;
      height: 100px;
      margin-right: 23px;
    }
    .content {
      h3,
      p {
        margin: 0;
        font-size: 12px;
      }
      h3 {
        color: #222;
      }
      p {
        color: #a5a5a5;
      }
    }
  }
  .follow-user {
    min-width: 114px;
  }
}
</style>
