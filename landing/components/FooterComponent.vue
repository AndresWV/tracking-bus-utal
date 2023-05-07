<template>
<v-footer padless  color="#303345" class="ma-0 pa-0" elevation="4">
    <v-col
      class="text-center"
      cols="12"
      >
      {{ new Date().getFullYear() }} — <strong>Tracker VH</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      icons: [
        'mdi-chart-bubble',
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
};
</script>
