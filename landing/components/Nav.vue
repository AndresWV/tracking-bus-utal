<template>
  <v-toolbar  dense fluid height="60px" max-height="60px" color="#303345" class=" ma-0 pa-0" >
    <v-row>
      <!--Icon APP -->
      <v-col
        xs="3"
        sm="3"
        md="3"
        lg="3"
        xl="3"
        align-self="start"
      >
        
        <v-img  contain min-witdh="10%"  wdith="10%" max-width="10%" src="https://storage.googleapis.com/gps-project-bucket/images-homepage/logo.png" class="mt-0"></v-img>
      </v-col>
       <!--Buttons APP SM and UP -->
      <v-col
        class="hidden-lg-and-down text-center mt-10"
        justify="center"
        align="center"
        xl="6"

      >
        <v-btn
          v-for="link in links" :key="link.tittle"
          large
          plain
          :href="link.ref"
          class="text-center"
          color="#02B5C2"
        >
          {{link.tittle}}
        </v-btn>
      </v-col>
      <!--Conecct Space  SM and UP-->
      <v-col
        align="center"
        justify="center"
        class="hidden-lg-and-down text-right mt-10 pr-10"
      >
        <v-btn href="/SignUp" plain large>
          Registrarse
        </v-btn>
        
        <v-btn  large color="#02B5C2">
          Conectarse
        </v-btn>
      </v-col>
      <v-col 
        class="d-xl-none mt-3 text-right "
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          icon
          color="#02B5C2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon size="50">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.tittle"
        >
          <v-btn  :href="link.ref" plain>{{ link.tittle }}</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-col>

    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavComponent',
  mode: "full", //  full, medium, clean
  data() {
    return {
    links: [
                { tittle: 'Inicio',ref:"/", icon: '/103.png'},
                { tittle: 'Ley 21.170',ref:"/ley21170", icon: '/103.png'},
                { tittle: 'Dispositivos',ref:"/dispositivos", icon: 'mt'},
                { tittle: 'Lista GPS', ref: "/listadoGPS", icon: 'mt'},
                { tittle: 'Registrar Vehículo', ref: "/regVehiculo", icon:'mt'}
            ],

    };
  },
};
</script>
