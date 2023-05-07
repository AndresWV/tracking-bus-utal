<template>
  <v-toolbar dense fluid height="60px" max-height="60px" color="#303345" class="ma-0 pa-0">
    <v-row>
      <!--Icon APP -->
      <v-col xs="3" sm="3" md="3" lg="3" xl="3" justify class="ma-0 pa-0">
        <v-img contain min-height="50px" max-height="60px"
               src="https://storage.googleapis.com/gps-project-bucket/images-homepage/logo.png" class="mt-0"></v-img>
      </v-col>
      <!--Buttons APP SM and UP -->
      <v-col
        class="hidden-lg-and-down text-center mt-3"
        justify="center"
        align="center"
        xl="6"
      >
        <span v-for="link in links" :key="link.tittle">
          <v-btn
            v-if="link.condition"
            large
            plain
            :href="link.ref"
            class="text-center"
            color="#02B5C2"
            @click="link.method ? link.method() : () => {}"
          >
            {{ link.tittle }}
          </v-btn>
        </span>
      </v-col>
      <!--Conecct Space  SM and UP-->
      <v-col
        xl="3"
        align="center"
        justify="center"
        class="hidden-lg-and-down text-right mt-5 pr-10"
      >
        <v-btn v-if="user == null"
               href="/auth/SignUp" plain small> Registrarse
        </v-btn>

        <v-btn v-if="user == null"
               small color="#02B5C2" href="/auth/SignIn"> Iniciar Sesion
        </v-btn>
        <v-row justify="center" v-else align="center">
          <v-col>
            <v-btn
              small block min-widht="100px" color="#02B5C2" href="/user/mapsVista"> Mi cuenta
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              small block color="red" href="/" @click="logOut()"> Cerrar Sesion
            </v-btn>
          </v-col>
        </v-row>

      </v-col>
      <v-col class="d-xl-none text-right mt-0 my-0 mx-auto pt-4">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon color="#02B5C2" v-bind="attrs" v-on="on">
              <v-icon size="50">mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="link in links" :key="link.tittle">
              <v-btn
                v-if="link.condition"
                :href="link.ref"
                plain
                @click="link.method ? link.method() : () => {}"
              >{{ link.tittle }}
              </v-btn
              >
            </v-list-item>
            <v-list-item
              v-if="user == null"
            >
              <v-btn small width="100%" color="#02B5C2" href="/auth/SignIn"> Iniciar Sesion</v-btn>
            </v-list-item>
            <v-list-item
              v-if="user == null"
            >
              <v-btn href="/auth/SignUp" plain small width="100%"> Registrarse</v-btn>
            </v-list-item>
            <v-list-item v-else>
              <v-row justify="center" align="center">
                <v-col>
                  <v-btn
                    small color="#02B5C2" href="/user/mapsVista"> Mi cuenta
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    small color="#02B5C2" href="/" @click="logOut()"> Cerrar Sesion
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>

// import { auth } from '@/services/firebase';
// TODO: Ocultar ciertos botones cuando el usuario esté autenticado.
export default {
  name: 'NavComponent',
  mode: 'full', //  full, medium, clean
  data() {
    return {
      user: this.$auth.user ? this.$auth.user : null,
      links: [
        {tittle: 'Inicio', ref: '/', icon: '/103.png', condition: true},
        {
          tittle: 'Ley 21.170',
          ref: '/ley21170',
          icon: '/103.png',
          condition: true,
        },
        {
          tittle: 'Dispositivos',
          ref: '/dispositivos',
          icon: 'mt',
          condition: true,
        },
      ],
    };
  },
  methods: {
    async logOut() {
      console.log('navbar loggin out');
      await this.$auth.logout();
      await this.$cookies.remove('token');
    },
  },
};
</script>
