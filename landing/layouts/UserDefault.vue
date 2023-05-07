<template witdh="100%" height="100" class="ma-0 pa-0">
  <v-app>
    <v-toolbar dense fluid height="60px" max-height="60px" color="#303345" class="ma-0 pa-0">
      <router-link to="/" class="ma-0 pa-0">
        <v-img contain min-height="50px" max-height="50px"
               src="https://storage.googleapis.com/gps-project-bucket/images-homepage/logo2.png" alt="logo"
               class="ma-0 pa-0"></v-img>
      </router-link>
      <v-spacer/>

                
      <v-menu color="#303345" offset-y>
        <template #activator="{ on, attrs }">
        
          <v-btn text color="white" v-bind="attrs" v-on="on" class="pl-2 pr-2">
           
             <v-avatar size="30" class="mr-2">
                <img
                  :src="user.profile_avatar"
                  alt="avatar"
                  >
                </v-avatar>
              {{user.name}}
          </v-btn>
         
        </template>
      <v-list dense height="100%" color="#303345">
        <span
          v-for="item in items"

          :key="item.title">

        <v-list-item

          v-if="item.condition"
        >
          <router-link :to="item.to">
            <v-btn
              large
              plain
              class="text-center white--text"
              color="#02B5C2"

            >
                <v-icon class="mr-1">
                  {{ item.icon }}
                </v-icon>
               {{ item.title }}
            </v-btn>
          </router-link>
        </v-list-item>

        </span>
        <v-spacer/>
        <v-list-item>
          <v-btn
            large
            plain
            class="text-center"
            color="red"
            href="/"
            @click="logOut()"
          >
            <v-icon class="mr-1">
              mdi-logout
            </v-icon>
            Salir
          </v-btn>
        </v-list-item>
        <v-spacer/>
      

      </v-list>
      </v-menu>

    </v-toolbar>


    <Nuxt />
    <v-card fluid absolute width="100%" min-height="60px" max-height="150px" color="#303345" elevation="4" class="ma-0 pa-0 pt-4">
      <v-card-text class="ma-0 pa-0 px-5">
        <v-row class="ma-0 pa-0">
          <v-col sm="12" md="3" class="ma-0 pa-0">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-1"
              icon
              style="color: white"
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            sm="12"
            md="6"
            justify="center"
            style="color: white"
            class="text-center ma-0 pa-0"
          >
            TrackerVH®2022
          </v-col>
          <v-col
            sm="12"
            md="3"

            justify="right"
            style="color: white"
            class="text-right ma-0 pa-0"
          >
            Taller de Software 2022-01
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'UserDefault',
  components: {},
  data() {
    return {
      user: this.$auth.user,
      drawer: null,
      icons: [
        'mdi-chart-bubble',
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
       items: [
         {
          title: 'profile',
          to: '/user/profile',
          icon: 'mdi-account-wrench-outline',
          condition: this.$auth.user.role === "user",
        },
         {
          title: 'Dashboard',
          to: '/user/dashboard',
          icon: 'mdi-view-dashboard-outline',
          condition: this.$auth.user.role === "admin"
        },
        {
          title: 'Mapa',
          to: '/user/mapsVista',
          icon: 'mdi-map-search-outline',
          condition: this.$auth.user.role === "user"
        },
        {
          title: 'Vehiculos',
          to: '/user/listadoVehiculo',
          icon: 'mdi-devices',
          condition: true

        },
        {
          title: 'GPS',
          to: '/user/listadoGPS',
          icon: 'mdi-devices',
          condition: true

        },
        {
          title: 'Logs',
          to: '/user/verAlarmas',
          icon: 'mdi-bell-outline',
          condition: this.$auth.user.role === 'user'
        },
        {
          title: 'Lista Usuarios',
          to: '/user/listadoUsers',
          icon: 'mdi-devices',
          condition: this.$auth.user.role === 'admin'
        },
      ],

    };
  },
  methods: {
    async logOut() {
      console.log('userdefault loggin out');
      await this.$auth.logout();
      await this.$cookies.remove('token');


    },
  },

  computed: {
    show: {
      get() {
        return this.$store.state.users.snackbar.toggle;
      },
      set(v) {
        this.$store.dispatch('users/setSnackbar', v);
      }
    }
  }
};
</script>

