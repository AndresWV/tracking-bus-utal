<template>
  <v-card class="mx-auto" fluid style="background: #303345; padding: 5px">
    <v-subheader min-widht="100%"> <h1>Editar Vehiculo</h1> </v-subheader>
    <hr />
    <v-card-text class="justify-content">
      <v-col>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">
            NOMBRE DEL VEHICULO
          </h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="vehiculoAux.name"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.longMax, rules.longMin]"
            :placeholder="'Nombre del vehiculo'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">
            MARCA
          </h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="vehiculoAux.brand"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.required, rules.longMax, rules.longMin]"
            :placeholder="'Marca del vehiculo'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">
            MODELO
          </h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="vehiculoAux.model"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.required, rules.longMax, rules.longMin]"
            :placeholder="'Modelo del vehiculo'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">
            PATENTE
          </h4>
        </v-row>
        <v-row>
          <v-text-field
            v-model="vehiculoAux.patent"
            class="ml-2"
            style="max-height: 75px"
            filled
            :rules="[rules.required, rules.syntPatent]"
            :placeholder="'aa-ss-11 o aa-11-22'"
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-3 ml-3 mb-2">
            GPS
          </h4>
        </v-row>
        <v-row>
          <v-autocomplete
            v-if="vehiculoAux.gps !== null"
            v-model="vehiculoAux.gps"
            :items="gpsAux"
            :placeholder="vehiculoAux.gps.name"
            item-text="name"
            class="ml-2"
            style="max-height: 75px"
            filled
            return-object
          >
            <template v-slot:append-outer>
              <v-icon
                :color="'red'"
                @click="removeGPS()"
                v-text="'mdi-cancel'"
              ></v-icon>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-else
            v-model="vehiculoAux.gps"
            :items="gpsAux"
            item-text="name"
            class="ml-2"
            style="max-height: 75px"
            string="Sin gps"
            filled
            return-object
          >
          <template #no-data>
            <v-list-item>
              <v-list-item-title>
                No hay gps registrados
              </v-list-item-title>
            </v-list-item>
          </template>
          </v-autocomplete>
        </v-row>
      </v-col>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="#02b5c2" @click="editarVehiculo"> GUARDAR CAMBIOS</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    vehiculo: {
      type: Object,
      default: null,
    },
    gps: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      vehiculoAux: this.vehiculo,
      gpsAux: this.gps,
      gpsTmp: null,
      rules: {
        required: (value) => !!value || 'Campo obligatorio',
        longMax: (value) => (value && value.length <= 20) || 'Debe tener máximo 20 caracteres',
        longMin: (value) => (value && value.length >= 2) || 'Min 2 caracteres',
        syntPatent: (value) => /(^[a-zA-Z]{2}-[a-zA-Z]{2}-\d{2}$)|(^[a-zA-Z]{2}-\d{2}-\d{2}$)/.test(value) || 'Sintaxis de patente erronea'
      },
    };
  },
  watch: {
    vehiculo() {
      this.vehiculoAux = this.vehiculo;
    },
    gps() {
      this.gpsAux = this.gps;
    },
  },
  methods: {
    removeGPS() {
      this.gpsTmp = this.vehiculoAux.gps;
      this.vehiculoAux.gps = null;
    },
    editarVehiculo() {
      console.log(this.vehiculoAux)
      if (this.vehiculoAux.brand !== '' && this.vehiculoAux.model !== '' && this.vehiculoAux.patent !== '') {
        this.$emit('cerrarDialog', this.vehiculoAux, this.gpsTmp);
      }
      this.gpsTmp = null;
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
</style>