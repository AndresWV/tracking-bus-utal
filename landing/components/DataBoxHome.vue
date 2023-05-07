<template>
  <v-card
    max-height="auto"
    height="auto"
    class="customBackground"
    elevation="0"
  >
    <v-row cols="12">
      <v-col
        v-for="data in info"
        :key="data.text"
        class="mt-3 mb-7"
        lg="3"
        md="3"
        sm="6"
        xs="12"
      >
      <v-card elevation="3" >
      
        <v-card
          min-height="380"
          min-widht="430"
          widht="330px"
          max-widht="330px"
          color="#DCDBDB"
          justify="center"
          class=""
          outlined

        > 
          <v-spacer />
          <v-card-text class=" text-center mt-10"
            ><v-icon outlined size="150" :color="data.color">{{ data.icon }}</v-icon></v-card-text
          >
          <v-card-text class="text-center font-weight-bold" size="30">
            <v-spacer />
          <v-icon class="text-h6 mt-5" :color="data.color">
            {{
            data.text
            }}
          </v-icon>

          </v-card-text>
          <v-spacer />
        </v-card>
          
      </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'DataBoxComponent',
  data() {
    return {
      info: [
        {
          icon: 'mdi-crosshairs-gps',
          text: 'Asocia tus vehiculos y dispositivos gps de forma independiente',
          color:'#5ca9bb',
        },
        {
          icon: 'mdi-tooltip-cellphone',
          text: 'Si se te olvida donde te estacionaste puedes encontrar el vehiculo desde tu celular',
          color: '#5ca9bb',
        },
        {
          icon: 'mdi-google-maps',
          text: "Revisa la ultima ubiacion conocida en caso de robo",
          color: '#5ca9bb',
        },
        {
          icon: 'mdi-alarm-light-outline',
          text: 'En caso de robo puedes generar informes de las ultimas ubicaciones del vehiculo',
          color: '#5ca9bb   ',
        }
      ],
    };
  },
};
</script>
<style scoped>
.customBackground {
  background-color: #DCDBDB;
}
.fontColor{
  color: #ffffff;
}
.fakeOutlined{
  color: #2F3244;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
}
</style>
