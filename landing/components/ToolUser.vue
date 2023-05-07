<template>
  <v-bottom-navigation
    v-model="value"
    color="white"
    class="blackgroundColor"
    shift
    absolute
  >
    <v-btn>
      <span>Inicio</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
      <span>Dispositivos</span>

      <v-icon>mdi-devices</v-icon>
    </v-btn>

    <v-btn>
      <span>Mi perfil</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn>
      <span></span>

      <v-icon color="red">mdi-logout</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'ToolUser',
  data() {
    return {
      value: 0,
    };
  },
};
</script>
<style scoped>
.backgroundColor {
  background-color: #303345;
}
</style>
