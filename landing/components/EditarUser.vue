<template>
  <v-card class="mx-auto" fluid style="background: #303345; padding: 5px">
    <v-subheader min-widht="100%"> <h1>Editar Usuario</h1> </v-subheader>
    <hr />
    <v-card-text class="justify-content">
      <v-col>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">
            NOMBRE
          </h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="userAux.name"
            class="ml-2"
            style="max-height: 75px"
            filled
          ></v-text-field>
        </v-row>
      </v-col>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn color="#02b5c2" @click="edit"> GUARDAR CAMBIOS</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
      userAux: this.user,
    };
  },
  watch: {
    user() {
      this.userAux = this.user;
    },
  },
  methods: {
    async edit() {
      await this.$axios.$patch('/user/edit/' + this.userAux.email, {
        name: this.userAux.name,
        email: this.userAux.email,
      });
      this.dialog = false;
    },
  },
};
</script>
