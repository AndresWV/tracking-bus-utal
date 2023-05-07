<template>
  <v-row class="custom-content ma-0 pa-0" align="center" justify="center">
    <v-col class="px-12" cols="12">
      <v-card
        class="mx-auto"
        color="#303345"
        style="padding: 5px"
        min-width="50%"
        width="300px"
      >
        <v-list color="#303345">
          <v-subheader min-widht="100%"><h1>Registro</h1></v-subheader>
          <hr/>
          <v-list-item>
            <h4 class="mt-3 ml-3 mb-2">SELCCIONE AVATAR</h4>
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col cols="4" class="align-center"> 
                <v-avatar size="120" class="mr-2">
                  <img
                    :src="account.profile_avatar"
                    > 
                </v-avatar>
              </v-col>
                
              <v-col cols="8">
                <v-btn 
                fab
                class="ma-1"
      
                 v-for="avatar in avatars" :key="avatar.id"
                  @click="account.profile_avatar=avatar"
                >
                  <v-avatar size="60" class="mr-2">
                  <img
                    :src="avatar"
                    > 
                </v-avatar>

                </v-btn>
              </v-col>
            </v-row>
           
          </v-list-item>
          <v-list-item>
            <h4 class="mt-3 ml-3 mb-2">NOMBRE</h4>
          </v-list-item>
          
          <v-list-item>
            <v-text-field
              v-model="account.name"
              class="ml-2"
              style="max-height: 50px"
              placeholder="Juan Perez Lopez"
              filled
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <h4 class="mt-3 ml-3 mb-2" style="width: 100vh">
              CORREO ELECTRONICO
            </h4>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="account.email"
              class="ml-2"
              style="max-height: 50px"
              placeholder="juan123@hotmail.com"
              filled
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <h4 class="mt-3 ml-3 mb-2" style="width: 100vh">CONTRASEÑA</h4>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="account.password"
              class="ml-2"
              style="max-height: 50px"
              type="password"
              placeholder="********"
              filled
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <h4 class="mt-3 ml-3 mb-2" style="width: 100vh">
              REPETIR CONTRASEÑA
            </h4>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="otherPassword"
              class="ml-2"
              type="password"
              style="max-height: 50px"
              placeholder="********"
              filled
            ></v-text-field>
          </v-list-item>
           
          <v-list-item class="mt-4">
            <v-col cols="12" class="pa-0">
              <v-alert
                v-if="alert.isError"
                border="bottom"
                color="pink darken-1"
                dark
              >
                {{ alert.text }}
              </v-alert>
            </v-col>
          </v-list-item>
          <v-list-item class="mt-3">
            <v-btn
              elevation="2"
              style="width: 100%; background-color: #02b5c2"
              @click="registrar"
            >REGISTRARME
            </v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn
              elevation="2"
              :disabled="true"
              style="width: 100%; background-color: #red"
              class="mt-2"
              @click="registrar"
            >Registro con Google
            </v-btn
            >
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
     <v-snackbar
        v-model="showNotifiaction" 
        :color="notificationColor"
        :timeout="3000"
        class="mb-16"
      >
        <b>{{notificationMessage}}</b>
        <v-spacer></v-spacer>
      
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="showNotifiaction = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      </v-snackbar>
  </v-row>
</template>
<script>
// import { WithEmailAndPassword } from 'firebase/auth';

// import { auth } from '@/services/firebase';

export default {
  auth: false,
  layout: 'TemplateDefault',
  data() {
    return {
      account: {
        password: '',
        name: '',
        email: '',
        profile_avatar: 'https://storage.googleapis.com/gps-project-bucket/avatars/profile00.png'
      },
      alert: {
        isError: false,
        text: '',
      },
      notificationColor:'',
      notificationMessage:'',
      showNotifiaction: false,
      otherPassword: '',
      avatars:[
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile00.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile01.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile02.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile03.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile04.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile05.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile06.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile07.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile08.png'
      ],
    };
  },
  methods: {
    // TODO: Añadir validaciones de formularios!!
    // TODO: Mostrar errores de forma más bonita y borrar logs. No mostrar el error directo por seguridad
    async registrar() {
      if(this.account.name==='' || this.account.email === '' ||  this.account.password==='' || this.otherPassword===''){
        this.notificationMessage="Los campos deben estar llenos"
        this.notificationColor="red"
        this.showNotifiaction=true
        return
      }
      if(this.account.password!==this.otherPassword){
        this.notificationMessage="Las contraseñas no coinciden"
        this.notificationColor="red"
        this.showNotifiaction=true
        return
      }
      await this.$axios.post('/auth/signup', this.account)
        .then((data) => {
          // Next register, login if it's successfull
          this.$auth.loginWith('local', {
            data: {
              email: this.account.email,
              password: this.account.password,
              profile_avatar: this.account.profile_avatar,
            }
          })
            .then((data) => {
              this.notificationMessage="Registro exitoso !"
              this.notificationColor="green"
              this.showNotifiaction=true
              this.$auth.setUser(data.data.user);
              this.$cookies.set('token', data.data.token);
              this.$router.push('/user/mapsVista');
            })
            .catch((error) => {
              this.notificationMessage="Asegurese de que su correo no este en uswo"
              this.notificationColor="red"
               this.showNotifiaction=true
              console.log(error);
            });
        })
        .catch((error) => {
          this.notificationMessage="Asegurese de que su correo no este en uso"
          this.notificationColor="red"
          this.showNotifiaction=true
          console.log(error);
        });
    },
    /** Registers a user in Firebase Auth using Google */
    async registerWithGoogle() {
      await this.$axios.$post('/user/create', {
        name: this.account.name,
        email: this.account.email,
        password: this.account.password,
      });
    },
    /** Shows an error */
    showError(text) {
      this.alert.isError = !this.alert.isError;
      this.alert.text = text;
      setTimeout(() => {
        this.alert.isError = !this.alert.isError;
        this.alert.text = '';
      }, 2000);
    },
  },
};
</script>

<style>
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}

.custom-content {
  background-color: #dcdbdb;
  margin: 0 0 0 0;
  height: 100%;
}
.align-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
