<template>
<v-row class="custom-content ma-0 pa-0" align="center" justify="center">
    <v-col class="px-12" cols="12">
  

 
      <v-card
        class="mx-auto"
        color="#DCDBDB"
        style="padding: 5px"
        min-width="100%"
        width="300px"
        elevation="4"
      >
        <v-list color="#DCDBDB">
          <v-subheader min-widht="120%" class="my-auto mb-4"> <h1 class="colorText">Dispositivos Compatibles</h1> </v-subheader>
          <hr />
          
          <p v-for="device in devices"
          :key="device.text">
            <v-list-item class="hidden-md-and-up">
              <v-col>
                <p class="colorText">{{device.tittle}}</p>
                <hr />
                <p class="colorText">
                {{device.text}}
                </p>
              </v-col>
            </v-list-item>

          
            <v-list-item>
              <v-col>
                 <v-img
                fluid
                max-width="500"
                max-height="500"
                :src="device.src"
                class="text-center ml-16"
              />
              </v-col>
              <v-col class="hidden-sm-and-down">
                <p class="colorText text-h5">{{device.tittle}}</p>
                <hr />
                <p class="text-justify colorText text-h6">
                {{device.text}}
                </p>
              </v-col>
           
            </v-list-item>
            
          </p>

        </v-list>
      </v-card>
    </v-col>
  </v-row>
 
</template>
<script>
export default {
  name: 'LeyInfoConmponent',
  data() {
    return {
      devices: [
        {
          tittle: 'TK103',
          src: 'https://storage.googleapis.com/gps-project-bucket/images-homepage/103.png',
          text: 'Puedes rastrear vehículos, motos, camionetas o camiones. Programar acciones como limitar un área geográfica, parar el motor del vehículo en caso de robo, función espía, aviso SOS en caso de robo, secuestro o accidente, y mucho más.',
        },
        {
          tittle: 'TK303',
          src: 'https://storage.googleapis.com/gps-project-bucket/images-homepage/303.png',
          text: 'Versión de GPS de tamaño reducido con antenas internas, adaptado especialmente para motos, maquinaria y también para autos, con la ventaja de ser resistente a las vibraciones, agua, polvo, humedad y calor.Programar acciones como limitar un área geográfica, parar el motor del vehículo o Moto en caso de robo, función espía, aviso SOS en caso de robo, secuestro o accidente, y mucho más.',
        },
      ],
    };
  },
};
</script>
<style scoped>
.colorText{
  color: #33708f;


}
</style>