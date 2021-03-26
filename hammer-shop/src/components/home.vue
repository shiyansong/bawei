<template>
  <div>
    <el-header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/header.vue';
export default {
  components: {
    'el-header': Header
  }
}
</script>