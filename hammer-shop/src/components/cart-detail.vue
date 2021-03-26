<template>
  <div id="main" class="hander-car">
    <div class="store-content">
      <div class="cart-box">
        <div class="title">
          <h2>购物清单</h2>
        </div>
        <div class="cart-inner">
          <div class="empty-label" v-if="this.cartList.length === 0">
            <h3>您的购物车中还没有商品</h3>
            <router-link class="link" to="/goodlist">现在选购</router-link>
          </div>
          <div v-if="this.cartList.length !== 0">
            <div class="cart-table-title">
              <span class="name">商品信息</span>
              <span class="operation">操作</span>
              <span class="subtotal">小计</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>
            <div class="cart-table">
              <div class="cart-group">
                <!--购物列表-->
                <div class="cart-top-items" v-for="(item, index) in cartList" :key="item.sku_id">
                  <div class="cart-items">
                    <div class="items-choose" @click="chooseGoods(index)">
                      <span :class="[item.checked ? 'checkbox-on' : 'checkbox-disabled', 'blue-checkbox-new']"><a></a></span>
                    </div>
                    <div class="items-thumb">
                      <img :src="item.ali_image" />
                      <a href="javascript:;" target="_blank"></a>
                    </div>
                    <div class="name hide-row">
                      <div class="name-table">
                        <a href="javascript:;" target="_blank">{{ item.title }}</a>
                        <ul class="attribute">
                          <li>透明</li>
                        </ul>
                      </div>
                    </div>
                    <div class="operation">
                      <a class="items-delete-btn" @click="deleteGoods(item.sku_id)"></a>
                    </div>
                    <div class="subtotal">¥ {{ item.price * item.num }}</div>
                    <div class="item-cols-num">
                      <div class="select js-select-quantity">
                        <span class="down down-disabled">-</span>
                        <span class="num">
                          <input type="text" style="display: inline-block" v-model="item.num" />
                          <!-- <ul>
                            <li>1</li>
                            <li>2</li>
                          </ul> -->
                        </span>
                        <span class="up">+</span>
                      </div>
                    </div>
                    <div class="price">¥ {{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-bottom-bg fix-bottom" v-if="this.cartList.length !== 0">
          <div class="cart-bar-operation">
            <div>
              <div class="choose-all js-choose-all" @click="handleChooseAllClick">
                <span :class="[chooseAll ? 'checkbox-on' : 'checkbox-disabled', 'blue-checkbox-new']"><a></a></span>
                全选
              </div>
              <div class="delete-choose-goods">删除选中的商品</div>
            </div>
          </div>
          <div class="shipping">
            <div class="shipping-box">
              <div class="shipping-total shipping-num">
                <h4 class="">已选择 <i>{{ chooseTotalNum }}</i> 件商品</h4>
                <h5>共计 <i>{{ totalNum }}</i> 件商品</h5>
              </div>
              <div class="shipping-total shipping-price">
                <h4 class="">应付总额：<span>￥</span><i>{{ chooseTotalPrice }}</i></h4>
                <h5 class="shipping-tips">应付总额不含运费</h5>
              </div>
            </div>
            <span class="jianguo-blue-main-btn big-main-btn js-checkout" :class="{ 'disabled-btn': !isDisabledBtn }">
              <a>现在结算</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'cartList', 
      'totalNum', 
      'chooseTotalNum', 
      'chooseTotalPrice', 
      'isDisabledBtn'
    ]),
    chooseAll: {
      get() {
        return this.cartList.every(item => item.checked)
      },
      set(newValue) {
        this.cartList.forEach(item => {
          item.checked = newValue;
        })
      }
    }
  },
  methods: {
    deleteGoods(id) {
      this.$store.commit('deleteGoods', id)
    },
    // 单选按钮事件
    chooseGoods(idx) {
      this.$store.commit('chooseGoods', idx)
    },
    // 全选按钮事件
    handleChooseAllClick() {
      this.chooseAll = !this.chooseAll
    }
  }
}
</script>

<style scoped>
@import "../assets/css/cart.css";
</style>