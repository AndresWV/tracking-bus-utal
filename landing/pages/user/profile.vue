<template>
  <v-row class="custom-content center-align">
    <v-card width="80%" color="#303345">
      <v-card-actions class="center-align">
        <v-col cols="4" class="ma-3">
          <v-row class="center-align">
            <v-img :src="user.profile_avatar" max-width="50%" contain />
          </v-row>
          <v-row class="mt-10 ml-5">
            <v-row>
              <h4 class="mt-3 ml-3 mb-2">NOMBRE DE USUARIO</h4>

              <v-text-field
                v-model="userCopy.name"
                class="ml-2"
                :disabled="editBool"
                filled
              ></v-text-field>
            </v-row>
            <v-row>
              <h4 class="mt-3 ml-3 mb-2">CORREO</h4>
              <v-text-field
                v-model="userCopy.email"
                class="ml-2"
                :disabled="true"
                filled
              ></v-text-field>
            </v-row>
            <v-col cols="12" align="right">
              <v-btn icon @click="passwordDialog = true">
                <v-icon> mdi-key-outline </v-icon>
              </v-btn>
              <v-btn icon @click="dialog = true">
                <v-icon>mdi-face-man-shimmer-outline</v-icon>
              </v-btn>
              <v-btn icon @click="edit()">
                <v-icon> mdi-pencil-outline </v-icon>
              </v-btn>
              <v-btn icon @click="saveEdit()">
                <v-icon> mdi-content-save-outline </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="12" class="center-align">
              <p class="text-h1">Bienvenido</p>
            </v-col>
          </v-row>
          <hr />
          <v-row class="mt-4">
            <v-col cols="6">
              <router-link
                style="text-decoration: none; color: inherit"
                to="/user/listadoVehiculo"
              >
                <v-row class="center-align">
                  <p class="text-h4">Mis vehiculos</p>
                </v-row>
                <v-row class="center-align">
                  <v-progress-circular
                    :value="100"
                    :size="150"
                    :width="15"
                    color="#00C4FF"
                    ><p class="text-h5">
                      {{ cant_vehicles }}
                    </p></v-progress-circular
                  >
                </v-row>
              </router-link>
            </v-col>

            <v-col cols="6">
              <router-link
                style="text-decoration: none; color: inherit"
                to="/user/listadoGPS"
              >
                <v-row class="center-align">
                  <p class="text-h4">Mis GPS</p>
                </v-row>
                <v-row class="center-align">
                  <v-progress-circular
                    :value="100"
                    :size="150"
                    :width="15"
                    color="#00C4FF"
                    ><p class="text-h5">{{ cant_gps }}</p></v-progress-circular
                  >
                </v-row>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-card-actions>

      <v-card-actions>
        <template #activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Click Me
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card color="#303345">
        <v-card-title class="text-h5 lighten-2">
          EDITAR IMAGEN DE PERFIL
        </v-card-title>
        <hr />
        <v-card-text>
          <v-row class="mt-5">
            <v-col cols="4" class="align-center">
              <v-avatar size="120" class="mr-2">
                <img :src="user.profile_avatar" />
              </v-avatar>
            </v-col>

            <v-col cols="8">
              <v-btn
                v-for="avatar in avatars"
                :key="avatar.id"
                fab
                class="ma-1"
                @click="user.profile_avatar = avatar"
              >
                <v-avatar size="60" class="mr-2">
                  <img :src="avatar" />
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveEdit()"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="passwordDialog" width="500">
      <v-card color="#303345">
        <v-card-title class="text-h5 lighten-2">
          EDITAR CONSTRASEÑA
        </v-card-title>
        <hr class="mb-3" />
        <v-card-text>
          <v-row>
            <h4 class="mt-3 ml-3 mb-2">CONTRASEÑA ACTUAL</h4>
          </v-row>
          <v-row>
            <v-text-field
              v-model="currentPassword"
              class="ml-2"
              style="max-height: 75px"
              type="password"
              filled
            ></v-text-field>
          </v-row>
          <v-row>
            <h4 class="mt-3 ml-3 mb-2">CONTRASEÑA NUEVA</h4>
          </v-row>
          <v-row>
            <v-text-field
              v-model="newPassword"
              class="ml-2"
              style="max-height: 75px"
              type="password"
              filled
            ></v-text-field>
          </v-row>
          <v-row>
            <h4 class="mt-3 ml-3 mb-2">REPETIR CONTRASEÑA NUEVA</h4>
          </v-row>
          <v-row>
            <v-text-field
              v-model="repitPassword"
              class="ml-2"
              style="max-height: 75px"
              type="password"
              filled
            ></v-text-field>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="sendNewPassword()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="showNotifiaction"
      :color="notificationColor"
      :timeout="3000"
      class="mb-16"
    >
      <b>{{ notificationMessage }}</b>
      <v-spacer></v-spacer>

      <template #action="{ attrs }">
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
export default {
  layout: 'UserDefault',
  data() {
    return {
      notificationColor: '',
      notificationMessage: '',
      showNotifiaction: false,
      dialog: false,
      passwordDialog: false,
      editBool: true,
      currentPassword: '',
      newPassword: '',
      repitPassword: '',
      userCopy: {
        name: '',
        password: '',
        correo: '',
        profile_avatar: ''
      },
      user: {
        name: 'Perico los palotes',
        password: '123123',
        email: 'juan@gmail.com',
        profile_avatar:
          'https://storage.googleapis.com/gps-project-bucket/avatars/profile01.png'
      },
      cant_vehicles: 0,
      cant_gps: 0,
      avatars: [
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile00.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile01.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile02.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile03.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile04.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile05.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile06.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile07.png',
        'https://storage.googleapis.com/gps-project-bucket/avatars/profile08.png'
      ]
    };
  },
  async beforeMount() {
    const currentUser = await this.$axios.$get(
      '/user/get/' + this.$auth.user._id
    );
    this.user.name = currentUser.user.name;
    this.user.profile_avatar = currentUser.user.profile_avatar;
    this.user.email = currentUser.user.email;
    this.userCopy = this.user;
    const data = await this.$axios.$get(
      '/get/dashboard/' + this.$auth.user._id,
      {}
    );
    this.cant_gps = data.info.nGps;
    this.cant_vehicles = data.info.nVh;
  },
  methods: {
    edit() {
      this.editBool = !this.editBool;
      this.userCopy = this.user;
    },
    showDialog() {
      this.dialog = !this.dialog;
    },
    async saveEdit() {
      this.edit();
      this.user = this.userCopy;
      this.dialog = false;
      try {
        await this.$axios.$patch('/user/edit/' + this.$auth.user._id, {
          profile_avatar: this.user.profile_avatar,
          name: this.user.name
        });

        this.notificationMessage = 'Datos de usuario editados correctamente!';
        this.notificationColor = '#02b5c2';
        this.showNotifiaction = true;
      } catch (error) {
        this.notificationMessage = 'Verifique los datos!';
        this.notificationColor = 'red';
        this.showNotifiaction = true;
      }
      //  send data
    },
    changePassword() {
      this.passwordDialog = true;
    },
    async sendNewPassword() {
      this.passwordDialog = false;
      if(this.newPassword!==this.repitPassword){
          this.notificationMessage="Las contraseñas no coinciden"
          this.notificationColor="red"
          this.showNotifiaction=true
          return
      }
      try {
        await this.$axios.$patch('/auth/edit/' + this.user.email, {
          oldPass: this.currentPassword,
          newPass: this.newPassword
        });

        this.notificationMessage = 'Contraseña cambiada';
        this.notificationColor = '#02b5c2';
        this.showNotifiaction = true;
      } catch (error) {
        this.notificationMessage =
          'Verifique los datos de la nueva contraseña!';
        this.notificationColor = 'red';
        this.showNotifiaction = true;
      }
      //  send data
    }
  }
};
</script>

<style>
.custom-content {
  background-color: #dcdbdb;
  margin: 0 0 0 0;
  height: 100%;
}
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
.v-progress-circular__underlay {
  stroke: transparent !important;
}
.center-align {
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-align {
  display: flex;
  align-items: flex-start;
  justify-content: start;
}
</style>
