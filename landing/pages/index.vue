<template>
  <!--Content-->
  <v-row class="custom-content" cols-="12">
    <v-col class="">
      <home-info />
    </v-col>
    <v-col class="px-12" cols="12">
      <data-box-home />
    </v-col>
  </v-row>
</template>

<script>
import DataBoxHome from '../components/DataBoxHome.vue';
import HomeInfo from '../components/HomeInfo.vue';

export default {
  auth: false,
  name: 'IndexPage',
  components: { HomeInfo, DataBoxHome },
  layout: 'TemplateDefault',

  data() {
    return {};
  },
};
</script>

<style scoped>
.custom-content {
  background-color: #DCDBDB;
  margin: 0 0 0 0;
}
</style>
