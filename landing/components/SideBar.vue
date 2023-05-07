<template>
  <v-card
    class="mx-auto"
    height="100%"
    width="100%"
    tile
  >
    <v-navigation-drawer
      absolute
      color="#133344"
      width="100%"
      permanent
      class="pl-5"
    >
      <v-list>
        <v-row justify="center" align="center">
          <v-col cols="3">
            <v-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <p class="text-h6 ma-0 pa-0">Bienvenido</p>

            <p class="text-h7 ma-0 pa-0">{{ user.email }}</p>
          </v-col>
        </v-row>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item v-if="user.role == 'user'" link href="/user/mapsVista">
          <v-list-item-icon>
            <v-icon>mdi-map-search-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Mapa</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/user/listadoGPS">
          <v-list-item-icon>
            <v-icon>mdi-devices</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dispositivos</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="user.role == 'user'" link href="/user/regVehiculo">
          <v-list-item-icon>
            <v-icon>mdi-car</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Registrar vehículo</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="user.role == 'user'" link href="/user/regGPS">
          <v-list-item-icon>
            <v-icon>mdi-crosshairs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Registrar Gps</v-list-item-title>
        </v-list-item>

        <v-list-item v-else link href="/user/listadoUsers">
          <v-list-item-icon>
            <v-icon>mdi-devices</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Listado de usuarios</v-list-item-title>
        </v-list-item>


        <v-list-item link href="/" @click="logOut()">
          <v-list-item-icon>
            <v-icon class="red--text">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="red--text">Desconectar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
// import { auth } from '@/services/firebase';

export default {
  name: "LateralBarComponent",
  data() {
    return {
      user: this.$auth.user,
    };
  },
  methods: {
    async logOut() {
      await this.$auth.logout();
      await this.$cookies.remove('token');
    },
  },
};
</script>
<style scoped>
.customBackground {
  background-image: url("static/mapas-gps.jpg");
}

</style>
