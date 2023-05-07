<template>
  <v-card
    class="ma-10 mt-5 mb-0 pa-5"
    max-width="100%"
    min-height="400"
    max-height="auto"
    img="mapas-gps.jpg"

  >
    <v-row align="center" class="px-12">
        <v-col
          xs="12"
          sm="12"
          md="12"
          lg="8"
          xl="8"
        >
            <p class="text-h3 text-justify mt-5 colorText">Registra tu GPS y que nunca se te olvide donde dejaste el auto. </p>
            <p class=" mt-10 text-justify text-right colorTextSecondary">Sabias que con la ley 21.700 o ley antiportonazos tu aseguradora te debe entregar un gps</p> 
           
        </v-col>
        <v-col
          xs="12"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >
          <v-img src="https://storage.googleapis.com/gps-project-bucket/images-homepage/car-phone.png" contain max-height="400px" class="center-align"/>
        </v-col>
        
    </v-row>

  </v-card>
</template>

<script>
export default {
  name: 'HomeInfoComponent',
  data() {
    return {
    
    };
  },
};
</script>
<style scoped>
.customBackground{
  background-image:url("https://storage.googleapis.com/gps-project-bucket/images-homepage/mapas-gps.jpg") ;
}
.colorText{
  color: #419ECF;
  font-weight: bold;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;

}
.colorTextSecondary{
  color: #2F3244;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;

}
.center-align{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>