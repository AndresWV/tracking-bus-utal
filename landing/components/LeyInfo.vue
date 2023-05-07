<template>
 <v-row class="custom-content ma-0 pa-0" align="center" justify="center">
    <v-col class="px-12" cols="12">
      <v-card
        class="mx-auto"
        color="#DCDBDB"
        style="padding: 5px"
        min-width="100%"
        elevation="4"
        min-height="100%"
      >
        <v-list color="#DCDBDB">
          <v-subheader min-widht="100%"> <h1 class="colorText">Ley 21.170</h1> </v-subheader>
          <hr />
          <v-list-item class="hidden-md-and-up colorText text-h6">
              Se estableció la obligación de las aseguradoras de vehículos
            motorizados de entregar, sin costo alguno, dispositivos GPS,
            correspondiéndole al propietario del vehículo la instalación y
            activación. Un reglamento del Ministerio de Transportes y
            Telecomunicaciones, suscrito además por el Ministerio del Interior y
            Seguridad Pública, determinará los requerimientos técnicos de dichos
            dispositivos.    
          </v-list-item>
            <v-list-item>
            <v-col 
             xs="12"
             sm="12"
             md="6"
             lg="6"
             xl="6"
             align="center"
            justify="center"
             >
                <v-img contain max-width="500" src="https://pbs.twimg.com/ext_tw_video_thumb/1443954456593317922/pu/img/NWLVcAi2bqTD7j-8.jpg"></v-img>
            </v-col>
            <v-col class="hidden-sm-and-down">
                            <v-col
                            class="text-justify colorText text-h6"
            
            >
            Se estableció la obligación de las aseguradoras de vehículos
            motorizados de entregar, sin costo alguno, dispositivos GPS,
            correspondiéndole al propietario del vehículo la instalación y
            activación. Un reglamento del Ministerio de Transportes y
            Telecomunicaciones, suscrito además por el Ministerio del Interior y
            Seguridad Pública, determinará los requerimientos técnicos de dichos
            dispositivos.    
            </v-col>
            <v-col
            class="text-justify colorText text-h6"
             
             >
            Los Concesionarios de rutas que operen con sistema electrónico de
            cobro, a requerimiento del Ministerio Público, deberán proporcionar
            información actualizada y en forma inmediata del tránsito de
            vehículos motorizados que se registren en sus sistemas, y que hayan
            sido objeto de denuncia por el delito de robo, hurto o receptación.
            El incumplimiento de esta obligación se sancionará con multa de diez
            a cien unidades tributarias mensuales, siendo competente para el
            conocimiento de esta infracción el juez de policía local del lugar
            en que tenga su domicilio el concesionario respectivo.
            </v-col>
           
            </v-col>
            </v-list-item>
            <v-list-item class="colorText text-h6 hidden-md-and-up">
            <p class="colorText text-justify">  Los Concesionarios de rutas que operen con sistema electrónico de
            cobro, a requerimiento del Ministerio Público, deberán proporcionar
            información actualizada y en forma inmediata del tránsito de
            vehículos motorizados que se registren en sus sistemas, y que hayan
            sido objeto de denuncia por el delito de robo, hurto o receptación.
            El incumplimiento de esta obligación se sancionará con multa de diez
            a cien unidades tributarias mensuales, siendo competente para el
            conocimiento de esta infracción el juez de policía local del lugar
            en que tenga su domicilio el concesionario respectivo.</p>
          </v-list-item>
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
            
        }   
    },
}
</script>
<style>
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
.custom-content {
  background-color: #33708f;
  margin: 0 0 0 0;
  height: 100%;
}
.colorText{
  color: #33708f;


}
</style>
