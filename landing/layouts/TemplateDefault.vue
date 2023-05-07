<template witdh="100%" height="100" class="ma-0 pa-0">
  <v-app>
    <v-toolbar dense fluid height="60px" max-height="60px" color="#303345" class="ma-0 pa-0">
      <router-link to="/" class="ma-0 pa-0">
        <v-img contain min-height="50px" max-height="50px"
               src="https://storage.googleapis.com/gps-project-bucket/images-homepage/logo2.png"
               class="ma-0 pa-0"></v-img>
      </router-link>
      <router-link v-for="link in links" :key="link.tittle" :to="link.ref" class="hidden-sm-and-down">
        <v-btn
          large
          plain
          class="text-center white--text"
          color="#02B5C2"
        >
          {{ link.tittle }}
        </v-btn>
      </router-link>
      <v-spacer/>
      <router-link to="/auth/SignIn" class="hidden-sm-and-down">
        <v-btn
          v-if="user == null"
          small
          color="#02B5C2">
          Iniciar Sesion
        </v-btn>
      </router-link>
      <router-link to="/auth/SignUp" class="hidden-sm-and-down">
        <v-btn
          v-if="user == null"
          plain
          small>
          Registrarse
        </v-btn>
      </router-link>

      <v-menu color="#303345" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn v-if="user != null" text color="white" v-bind="attrs" v-on="on" class="pl-2 pr-2">
            <v-avatar size="30" class="mr-2">
              <img
                :src="user.profile_avatar"
                alt="John"
              >
            </v-avatar>
            {{user.name}}
          </v-btn>
          <v-btn
            icon
            v-if="user == null"
            class="hidden-md-and-up"
            v-bind="attrs" v-on="on"
          >
            <v-icon>
              mdi-menu
            </v-icon>
          </v-btn>
        </template>
        <v-list dense color="#303345">
          <v-list-item v-for="link in links" :key="link.tittle" class="hidden-md-and-up">
            <router-link :to="link.ref">
              <v-btn
                large
                plain
                class="text-center white--text"
                color="#02B5C2"
              >
                {{ link.tittle }}
              </v-btn>
            </router-link>
          </v-list-item>
          <v-list-item
            v-if="user!=null"
            :style="{
    'align-items':'center'
  }"
          >
            <router-link :to="route">
              <v-btn
                small text block min-widht="100px" color="white"> Mi cuenta
              </v-btn>

            </router-link>
          </v-list-item>
          <v-list-item
            v-if="user!=null"
            class="text-center"
          >
            <v-btn
              small block text min-widht="100px" color="#02B5C2" @click="logOut()" class="red--text"
              href="/"> Salir
            </v-btn>
          </v-list-item>
          <v-list-item
            v-if="user == null"

          >
            <router-link to="/auth/SignIn" class="hidden-md-and-up">
              <v-btn
                v-if="user == null"
                color="#02B5C2">
                Iniciar Sesion
              </v-btn>
            </router-link>
          </v-list-item>
          <v-list-item
            v-if="user == null"
          >
            <router-link to="/auth/SignUp" class="hidden-md-and-up text-center">
              <v-btn
                plain
                fluid
              >
                Registrarse
              </v-btn>
            </router-link>
          </v-list-item>

        </v-list>
      </v-menu>


    </v-toolbar>

    <Nuxt/>
    <v-card fluid absolute width="100%" min-height="60px" max-height="150px" color="#303345" elevation="4"
            class="ma-0 pa-0 pt-4">
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

// import { auth } from '@/services/firebase';
export default {
  name: 'TemplateDefault',
  components: {},
  data() {
    return {
      user: this.$auth.user ? this.$auth.user : null,
      icons: [
        'mdi-chart-bubble',
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      links: [

        {
          tittle: 'Ley 21.170',
          ref: '/ley21170',
        },
        {
          tittle: 'Dispositivos',
          ref: '/dispositivos',

        },
      ],
      route: "/user/profile",
    };
  },
  beforeMount () {
    if (this.$auth.user !== null && this.$auth.user.role === "admin")
      this.route = "/user/dashboard";
    else 
      this.route = "/user/profile";
  },
  methods: {
    async logOut() {
      await this.$auth.logout();
      await this.$cookies.remove('token');
    },
  },
};
</script>
