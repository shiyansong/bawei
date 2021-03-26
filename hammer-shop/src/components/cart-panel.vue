<template>
  <!--active-->
  <li
    class="nav-cart"
    @mouseenter="show"
    @mouseleave="hide"
    v-if="$route.path !== '/cart'"
  >
    <a href="javascript:;" class="ball-rect">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{ 'cart-num': totalNum >= 1 }" v-if="totalNum>0">
      <i>{{ totalNum }}</i>
    </span>
    <div class="nav-cart-wrapper" v-if="isShow">
      <div class="nav-cart-list">
        <div class="empty" v-if="cartList.length === 0">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="item in cartList" :key="item.id">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="item.ali_image" />
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{ item.title }}</a>
                        </h4>
                        <p class="attrs">
                          <span>透明</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span>
                          <span class="price-num">{{ item.price }}</span>
                          <span class="item-num">x{{ item.num }}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="deleteGoods(item.sku_id)">
                      删除
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>
              共 <strong class="ng-binding">{{ totalNum }}</strong> 件商品
            </p>
            <h5>
              合计：<span class="price-icon">¥</span>
              <span class="price-num ng-binding">{{ totalPrice }}</span>
            </h5>
            <h6>
              <router-link to="/cart">去购物车</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 小球 -->
    <transition 
      name="ball"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="addcart-mask" v-show="ball.show">
        <img class="mask-item" alt="" />
      </div>
    </transition>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "isShow", 
      "cartList", 
      "totalNum", 
      "totalPrice",
      "ball"
    ]),
  },
  methods: {
    // 显示购物车
    show() {
      this.$store.commit('showCart')
    },
    // 隐藏购物车
    hide() {
      this.$store.commit('hideCart')
    },
    deleteGoods(id) {
      this.$store.commit("deleteGoods", id);
    },
    beforeEnter(el) {
      // 小球的初始位置坐标
      const ballStart = this.ball.el.getBoundingClientRect();
      const ballEnd = document.querySelector('.ball-rect').getBoundingClientRect();
      const ball = el.firstElementChild;
      const x = (ballEnd.left + 16) - (ballStart.left + ballStart.width / 2);
      const y = (ballStart.top + ballStart.height / 2) - ballEnd.top + 5 - 16;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      ball.style.transform = `translate3d(-${x}px, 0, 0)`;
      ball.src = this.ball.img;
    },
    enter(el) {
      el.offsetHeight;
      this.$nextTick(() => {
        el.style.transform = "translate3d(0, 0, 0)";
        el.firstElementChild.style.transform = "translate3d(0, 0, 0)";
      })
    },
    afterEnter() {
      this.ball.show = false;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/cart-panel.css";
.ball-enter-active{
  transition: .5s cubic-bezier(.15,.69,.6,1.29);
}
.ball-enter-active .mask-item{
  transition: .5s cubic-bezier(0,0,1,1);
}
</style>