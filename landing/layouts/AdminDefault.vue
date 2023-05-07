<template witdh="100%" height="100" fluid>
  <v-app>
    <nav-user />
    <Nuxt />
    <footer-component />
  </v-app>
</template>

<script>
import FooterComponent from '../components/Footer.vue';

import NavUser from '../components/NavUser.vue';
export default {
  name: 'AdminDefault',
  components: { FooterComponent, NavUser },
  data() {
    return {};
  },
};
</script>
