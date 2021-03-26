<template>
  <div>
    <div class="js-checkout-address-box">
      <div class="gray-box clear">
        <div class="title columns-title pre-title">
          <h2>收货信息</h2>
        </div>
        <div class="box-inner js-checkout-address-panel">
          <div class="address-common-table js-multiple-address-panel">
            <ul class="address-item-list clear js-address-item-list">
              <li
                :class="['js-choose-address',curIndex === index && 'selected-address-item']"
                v-for="(item, index) in addressList"
                :key="item.id"
                @click="selected(item.id)"
              >
                <div class="address-item">
                  <div class="name-section">{{ item.name }}</div>
                  <div class="mobile-section">{{ item.phone }}</div>
                  <div class="detail-section">
                    {{ item.province }} {{ item.county }} {{ item.city }}
                    <br />
                    {{ item.add }}
                  </div>
                </div>
                <div class="operation-section">
                  <span class="update-btn js-edit-address">修改</span>
                  <span class="delete-btn js-delete-address" @click="deleteAddress(item.id)">删除</span>
                </div>
              </li>
              <li class="add-address-item js-add-address" @click="isAddressPop = true">
                <p>使用新地址</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <address-pop v-if="isAddressPop" @close="close" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddressPop from "./address-pop";

export default {
  components: {
    AddressPop,
  },
  data() {
    return {
      isAddressPop: false
    }
  },
  created() {
    this.$store.dispatch("getAddressList");
  },
  computed: {
    ...mapGetters(["addressList", "curIndex"]),
  },
  methods: {
    // 切换收货地址
    selected(id) {
      this.$store.commit("selectedIndex", id);
    },
    // 关闭管理收货地址的对话框
    close() {
      this.isAddressPop = false;
    },
    // 删除收货地址
    deleteAddress(id) {
      this.$store.commit('deleteAddress', id)
    }
  },
};
</script>

<style scoped>
@import "../assets/css/checkout.css";
</style>