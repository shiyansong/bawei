<template>
  <div id="pop">
    <div class="module-dialog-layer" style="display: block"></div>
    <div class="module-dialog clear module-dialog-address module-dialog-show">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">管理收货地址</h4>
          </div>
          <span class="dialog-close" @click="$emit('close')">x</span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-address-add">
              <div class="save-address-box">
                <div class="address-form">
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input type="text" placeholder="收货人姓名" class="js-verify" v-model="address.name" />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3" :class="{'form-invalid-item':phoneError}">
                      <input type="text" placeholder="手机号" class="js-verify" v-model="address.phone" @blur="validatePhone" />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div
                      class="form-item-v3 area-code-w fn-left form-valid-item"
                    >
                      <i>区号（可选）</i>
                      <input
                        type="text"
                        class="js-verify js-address-area-code"
                      />
                      <div class="verify-error"></div>
                    </div>
                    <div
                      class="form-item-v3 telephone-w fn-right form-valid-item"
                    >
                      <i>固定电话（可选）</i>
                      <input
                        type="text"
                        class="js-verify js-address-telephone"
                      />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item province-wrapper">
                      <select 
                        name="province_code" 
                        class="province select-province js-form-province js-verify"
                        v-model="address.provinceId"
                      >
                        <option value="0">请选择省份</option>
                        <option :value="item.area_id" v-for="item in provinceList" :key="item.area_id">
                          {{ item.area_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div
                      class="form-item-v3 select-item city-wrapper fn-left form-focus-item"
                    >
                      <select 
                        class="city select-city js-form-city js-verify"
                        v-model="address.cityId"
                      >
                        <option value="0">请选择城市</option>
                        <option 
                          :value="item.area_id" v-for="item in cityList"
                          :key="item.area_id"
                        >{{ item.area_name }}</option>
                      </select>
                    </div>
                    <div
                      class="form-item-v3 select-item district-wrapper fn-right form-focus-item"
                    >
                      <select 
                        class="city select-city js-form-city js-verify"
                        v-model="address.countyId"
                      >
                        <option value="0">请选择区县</option>
                        <option 
                          :value="item.area_id" 
                          v-for="item in countryList" 
                          :key="item.area_id"
                        >{{ item.area_name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input type="text" placeholder="详细地址，如街道名称，楼层，门牌号码等" class="js-verify" v-model="address.add" />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row fn-clear">
                    <input type="checkbox" class="hide" />
                    <span class="blue-checkbox blue-checkbox-on"></span>设为默认
                  </div>
                  <div
                    class="dialog-blue-btn big-main-btn js-verify-address"
                    :class="{ 'disabled-btn': !rights }"
                    @click="save"
                  >
                    <a>保存</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 省
      provinceList: [],
      // 添加地址的数据对象
      address: {
        "id": 0,
        "name": "",
        "phone": "",
        "areaCode": "",
        "landLine": "",
        "provinceId": 0,
        "province": "",
        "cityId": 0,
        "city": "",
        "countyId": 0,
        "county": "",
        "add": "",
        "default": false,
        "checked": false
      },
      phoneError: false,
    }
  },
  computed: {
    cityList() {
      if(this.address.provinceId !== 0) {
        const res = this.provinceList.filter(item => item.area_id === this.address.provinceId)[0];
        this.address.province = res.area_name;
        return res.city_list
      }
    },
    countryList() {
      if(this.address.cityId !== 0) {
        const res = this.cityList.filter(item => item.area_id === this.address.cityId)[0];
        this.address.city = res.area_name;
        return res.county_list
      }
    },
    rights() {
      const obj = this.address;
      if(!obj.name || !obj.phone || obj.provinceId === 0 || obj.cityId === 0 || obj.countryId === 0 || !obj.add) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    'address.countryId'() {
      const res = this.countryList.filter(item => item.area_id === this.address.countyId)[0];
      this.address.country = res.area_name;
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    async getCityList() {
      const { data } = await this.axios.get('cityList.json')
      this.provinceList = data;
      // console.log(this.provinceList)
    },
    validatePhone() {
      const reg = /^1[3,4,5,6,7,8]\d{9}$/;
      if(reg.test(this.address.phone)) {
        this.phoneError = false
      } else {
        this.phoneError = true;
      }
    },
    save() {
      this.$store.commit('save', this.address)
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
@import "../assets/css/address-pop.css";
</style>