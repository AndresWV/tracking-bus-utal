<template>
  <!--Content-->
  <v-row class="custom-content" cols="12">
    <v-col class="">
      <ley-info />
    </v-col>
  </v-row>
</template>

<script>
export default {
  /* eslint-disable no-console */
  auth: false,
  name: 'IndexPage',
  components: {},
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
