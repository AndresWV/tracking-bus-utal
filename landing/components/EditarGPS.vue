<template>
  <v-card class="mx-auto" fluid style="background: #303345; padding: 5px">
    <v-subheader min-widht="100%"> <h1>Editar GPS</h1> </v-subheader>
    <hr />
    <v-card-text class="justify-content">
      <v-col>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">NOMBRE DEL GPS</h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="gpsAux.name"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.longMax, rules.longMin]"
            :placeholder="'Nombre del gps'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">TELEFONO</h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="gpsAux.phone"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.required, rules.syntPhone]"
            :placeholder="'+56987741236'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">IMEI</h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="gpsAux.imei"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.required, rules.longMax, rules.longMin]"
            :placeholder="'2222222222222222'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">TIPO</h4>
        </v-row>
        <v-row>
          <v-autocomplete
            v-model="gpsAux.type"
            class="ml-2"
            style="max-height: 75px"
            filled
            :items="type"
            :placeholder="type[0]"
            :rules="[rules.required]"
          ></v-autocomplete>
        </v-row>
      </v-col>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="#02b5c2" @click="editarGPS"> GUARDAR CAMBIOS</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    gps: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      type: ['TK 103', 'STK303'],
      gpsAux: this.gps,
      rules: {
        required: (value) => !!value || 'Campo obligatorio',
        longMax: (value) =>
          (value && value.length <= 20) || 'Debe tener máximo 20 caracteres',
        longMin: (value) => (value && value.length >= 2) || 'Min 2 caracteres',
        syntPhone: (value) =>
          /(^[+]\d{11}$)/.test(value) || 'Sintaxis de telefono erronea'
      }
    };
  },
  watch: {
    gps() {
      this.gpsAux = this.gps;
    }
  },
  methods: {
    editarGPS() {
      console.log(this.gpsAux);
      if (
        this.gpsAux.name !== '' &&
        this.gpsAux.phone !== '' &&
        this.gpsAux.imei !== '' &&
        this.gpsAux.type !== ''
      ) {
        this.$emit('save', this.gpsAux);
      }
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
</style>
