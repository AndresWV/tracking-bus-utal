<template>
  <v-card class="mx-auto" fluid color="#303345" style="padding: 5px" max-width="600">
    <v-subheader min-widht="100%"> <h1>Nuevo Vehiculo</h1> </v-subheader>
    <hr />
    <v-card-text class="justify-content">
      <v-list dense color="#303345">
        <v-list-item v-for="(item, index) in items" :key="item.title">
          <v-list-item-content>
            <v-col>
              <v-row>
                <h4 class="mt-3 ml-3 mb-2">{{ item.title }}</h4>
              </v-row>
              <v-row>
                <v-text-field
                  v-if="index === 0"
                  v-model="info[index]"
                  filled
                  class="ml-2"
                  style="max-height: 70px"
                  :rules="[rules.longMax, rules.longMin]"
                  :placeholder="item.info"
                ></v-text-field>
                <v-autocomplete
                  v-else-if="index === 4"
                  v-model="info[index]"
                  :items="gpsAux"
                  item-text="name"
                  class="ml-2"
                  style="max-height: 70px"
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
                <v-text-field
                  v-else-if="index === 3"
                  v-model="info[index]"
                  filled
                  class="ml-2"
                  style="max-height: 70px"
                  :rules="[rules.required, rules.syntPatent]"
                  :placeholder="item.info"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="info[index]"
                  class="ml-2"
                  style="max-height: 70px"
                  filled
                  :placeholder="item.info"
                  :rules="[rules.required, rules.longMax, rules.longMin]"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions class="justify-center">
          <v-btn color="#02b5c2" @click="registrar"> Registrar</v-btn>
        </v-card-actions>
      </v-list>
    </v-card-text>
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
  </v-card>
</template>

<script>
export default {
  props: {
    gps: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      currentuser: {},
       notificationColor:'',
      notificationMessage:'',
      showNotifiaction: false,
      gpsAux: this.gps,
      items: [
        { title: 'NOMBRE', info: 'Nombre del dispositivo' },
        { title: 'MARCA', info: 'Nombre de la marca' },
        { title: 'MODELO', info: 'Nombre del modelo' },
        { title: 'PATENTE', info: 'aa - aa - 11' },
        { title: 'GPS', info: '' },
      ],
      info: ['', '', '', '', ''],
      rules: {
        required: (value) => !!value || 'Campo obligatorio',
        longMax: (value) => (value && value.length <= 20) || 'Debe tener máximo 20 caracteres',
        longMin: (value) => (value && value.length >= 2) || 'Min 2 caracteres',
        syntPatent: (value) => /(^[a-zA-Z]{2}-[a-zA-Z]{2}-\d{2}$)|(^[a-zA-Z]{2}-\d{2}-\d{2}$)/.test(value) || 'Sintaxis de patente erronea'
      },
    };
  },
  watch: {
    gps() {
      this.gpsAux = this.gps;
    },
  },
  methods: {
    registrar() {
      if (
        this.info[1] !== '' ||
        this.info[2] !== '' || this.info[3] !== ''
      ) {
       
        this.$emit('addVehiculo', this.info);
        
        this.info= ['', '', '', '']; 
      }else{
        this.notificationMessage="Complete todos los campos"
        this.notificationColor="red"
        this.showNotifiaction=true
        
      }
     
    },
  },
};
</script>

<style>
.custom-content {
  background-color: #DCDBDB;
  margin: 0 0 0 0;
  height: 100%;
}
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
</style>