<template>
  <v-row class="custom-content" align="center" justify="center">
    <v-col>
      <v-card class="mx-auto" color="#303345" max-width="600">
        <v-card-text>
          <v-subheader min-widht="100%"> <h1>Nuevo GPS</h1> </v-subheader>
          <hr />
          <v-list dense color="#303345">
            <v-list-item v-for="(item, index) in items" :key="item.title">
              <v-list-item-content>
                <v-col>
                  <v-row>
                    <h4 class="mt-3 ml-3 mb-2">{{ item.title }}</h4>
                  </v-row>
                  <v-row>
                    <v-autocomplete
                      v-if="index === 3"
                      v-model="info[index]"
                      class="field ml-2"
                      style="max-height: 70px"
                      filled
                      :items="type"
                      :placeholder="type[0]"
                      :rules="[rules.required]"
                    ></v-autocomplete>
                    <v-text-field
                      v-else-if="index === 1"
                      v-model="info[index]"
                      class="field ml-2"
                      style="max-height: 70px"
                      filled
                      :placeholder="item.info"
                      :rules="[rules.required, rules.syntPhone]"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      v-model="info[index]"
                      class="field ml-2"
                      style="max-height: 70px"
                      filled
                      :placeholder="item.info"
                      :rules="[rules.required, rules.longMax, rules.longMin]"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              
              <v-spacer></v-spacer>
              <v-btn width="25%" color="#02b5c2" @click="registrar"> Registrar</v-btn>
            </v-card-actions>
          </v-list>
        </v-card-text>
       
      </v-card>
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
    </v-col>
    
  </v-row>
</template>

<script>
export default {
  components: {  },
  layout: 'UserDefault',
  data() {
    return {
      notificationColor:'',
      notificationMessage:'',
      showNotifiaction: false,
      currentuser: {},
      items: [
        { title: 'NOMBRE', info: 'Nombre del dispositivo' },
        { title: 'TELEFONO', info: '+56912345678' },
        { title: 'IMEI', info: 'IMEI del gps' },
        { title: 'TIPO', info: 'Nombre del modelo del GPS' },
      ],
      type: ['TK 103', 'STK303'],
      info: ['', '', '', ''],
      rules: {
        required: (value) => !!value || 'Campo obligatorio',
        longMax: (value) => (value && value.length <= 20) || 'Debe tener máximo 20 caracteres',
        longMin: (value) => (value && value.length >= 2) || 'Min 2 caracteres',
        syntPhone: (value) => /(^[+]\d{11}$)/.test(value) || 'Sintaxis de telefono erronea',
      },
    };
  },
  beforeMount() {
    this.currentuser = this.$auth.user;
  },
  methods: {
    async registrar() {

      if (
        this.info[0] === '' ||
        this.info[1] === '' ||
        this.info[2] === '' ||
        this.info[3] === ''
      ) {
        // alert('Datos faltantes'); //
        this.notificationMessage = "Complete todos los campos"
        this.notificationColor = "red"
        this.showNotifiaction=true
      } else {
        // alert('Datos ingresados correctamente'); //
        await this.$axios.$post('/gps/create', {
          name: this.info[0],
          phone: this.info[1],
          imei: this.info[2],
          type: this.info[3],
          user: this.currentuser._id,
        });
        this.notificationMessage = "Datos registrados correctamente"
        this.notificationColor="#02b5c2"
        this.showNotifiaction= true
        this.info= ['', '', '', '']
        //  this.$router.push('/user/listadoGPS');
        
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
.field {
  max-width: 500px;
  max-height: 55px;
}
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
.center-align{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
