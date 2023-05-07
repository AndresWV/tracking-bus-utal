<template>
  <v-app>
    <!--NavBar-->
    <!--Content-->
    <v-row class="custom-content" cols="12">
      <v-col class="">
        <devices-show />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import DevicesShow from '../components/DevicesShow.vue';
export default {
  auth: false,
  name: 'DispositivosPage',
  components: { DevicesShow },
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
