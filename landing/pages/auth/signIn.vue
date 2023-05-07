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
          <v-subheader min-widht="100%"><h1>Iniciar Sesion</h1></v-subheader>
          <hr />
          <v-list-item>
            <h4 class="mt-3 ml-3 mb-2">CORREO ELECTRONICO</h4>
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
            <h4 class="mt-3 ml-3 mb-2">CONTRASEÑA</h4>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="account.password"
              class="ml-2"
              type="password"
              style="max-height: 50px"
              placeholder="********"
              filled
            ></v-text-field>
          </v-list-item>
          <v-list-item class="mt-10">
            <v-btn
              elevation="2"
              style="width: 100%; background-color: #02b5c2"
              @click="login()"
              >Iniciar Sesión
            </v-btn>
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
  layout: 'TemplateDefault',
  data() {
    return {
      account: {
        email: 'manuelgamer@gmail.com',
        password: '123456'
      },
      alert: {
        isError: false,
        text: ''
      },
      notificationColor: '',
      notificationMessage: '',
      showNotifiaction: false
    };
  },
  methods: {
    // TODO: Añadir validaciones de formularios!!
    // TODO: Mostrar errores de forma más bonita y borrar logs. No mostrar el error directo por seguridad
    login() {
      this.$auth
        .loginWith('local', { data: this.account })
        .then((data) => {
          console.log(data);
          this.$auth.setUser(data.data.user);
          this.$cookies.set('token', data.data.token);
          this.notificationMessage = 'Conexion Exitosa!';
          this.showNotifiaction = true;
          this.notificationColor = 'green';
          if (data.data.user.role === 'user')
            this.$router.push('/user/profile');
          else this.$router.push('/user/dashboard');
        })
        .catch((error) => {
          console.log(error);
          this.notificationMessage =
            'Problemas para iniciar sesion, verifique sus credenciales';
          this.showNotifiaction = true;
          this.notificationColor = 'red';
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
      this.notificationMessage = 'Error en el inicio de Sesion';
      this.showNotifiaction = true;
      this.notificationColor = 'danger';
    }
  }
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
</style>
