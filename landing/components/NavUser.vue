<template>
  <v-toolbar
    dense
    fluid
    height="60px"
    max-height="60px"
    color="#303345"
    class="ma-0 pa-0"
  >
    <v-row>
      <!--Icon APP -->
      <v-col xs="3" sm="3" md="3" lg="3" xl="3" align-self="start">
        <router-link to="/">
          <v-img
            contain
            min-witdh="300px"
            wdith="300px"
            max-width="300px"
            src="https://storage.googleapis.com/gps-project-bucket/images-homepage/logo.png"
            class="mt-0 btn"
          ></v-img>
        </router-link>
      </v-col>
    </v-row>
    <!--Buttons APP SM and UP -->
  </v-toolbar>
</template>
<script>
export default {
  name: 'NavUserComponent',
  data() {
    return {
      links: [
        { tittle: 'Inicio', ref: '/', icon: '/103.png' },
        { tittle: 'Ley 21.170', ref: '/ley21170', icon: '/103.png' },
        { tittle: 'Dispositivos', ref: '/dispositivos', icon: 'mt' },
      ],
    };
  },
};
</script>
