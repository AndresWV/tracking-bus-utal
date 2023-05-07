<template>
  <v-app style="background: #303345; border-top: 0.5px solid black">
    <v-row>
      <v-col class="d-flex justify-center col-12">
        <v-select
          style="max-width: 405px; max-height: 20px"
          :items="type"
          item-text="name"
          class="field mt-2"
          :placeholder="inicial"
          filled
          return-object
          @change="select_value"
        ></v-select>
      </v-col>
    </v-row>

    <v-row style="height: 90%">
      <GmapMap
        ref="gMap"
        :center="center"
        :zoom="19"
        draggable:mapDraggable
        draggableCursor:mapCursor
        map-type-id="terrain"
        :options="mapStyle"
        style="width: 100%; height: 100%; position: relative"
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          clickable
          :draggable="false"
          @click="
            center = m.position;
            openInfo(m.imei);
          "
        >
          <gmap-info-window
            :options="{
              maxWidth: 300,
              pixelOffset: { width: 0, height: -35 }
            }"
            :position="m.position"
            :opened="windowsOpen.includes(m.imei)"
            @closeclick="windowsOpen = windowsOpen.filter((w) => w !== m.imei)"
          >
            <div>
              <v-container
                style="background: #ffffff; color: black"
                elevation="11"
              >
                <v-row>
                  <h4>{{ m.name }}</h4>
                </v-row>
                <v-row>
                  <br />
                </v-row>
                <v-row>
                  <h5 style="text-transform: uppercase">
                    AUTO: {{ m.nameVehicle }}
                  </h5>
                </v-row>
                <v-row>
                  <h5 style="text-transform: uppercase">
                    PATENTE: {{ m.patentVehicle }}
                  </h5>
                </v-row>
                <v-row>
                  <h5 style="text-transform: uppercase">
                    LAT: {{ m.position.lat }}
                  </h5>
                </v-row>
                <v-row>
                  <h5 style="text-transform: uppercase">
                    LNG: {{ m.position.lng }}
                  </h5>
                </v-row>
              </v-container>
            </div>
          </gmap-info-window>
        </GmapMarker>
      </GmapMap>
    </v-row>
  </v-app>
</template>
<script>
import io from 'socket.io-client';
import { styleMap } from '../../assets/styleMap';

export default {
  layout: 'UserDefault',
  data() {
    return {
      position: '',
      select: '',
      imei: '',
      auto: {},
      inicial: '',
      type: [''],
      mapStyle: {
        styles: styleMap
      },
      center: { lat: -35.00215440507292, lng: -71.22937507646324 },
      markers: [],
      windowsOpen: [],
      options: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }
    };
  },

  async beforeMount() {
    // TODO: DENTRO RECIBE LATITUD Y LONGITUD DEL GPS. FALTA RENDERIZAR EN EL MAPA. DATA ES DEL TIPO {latitude: 1234, longitude: 1234}
    const socket = io('https://mytcplistener.ddns.net/', { secure: true }); // VM google cloud machine. Change to localhost for testing
    await this.fetchGps();

    socket.on('gps data', (data) => {
      // eliminar ultimos points
      const index = this.markers.findIndex((m) => data.imei === m.imei);
      if (index !== -1) {
        // this.center = { lat: data.lat, lng: data.lng };
        // this.etiqueta();
        const point = this.markers.splice(index, index + 1)[0];
        this.position = {
          imei: point.imei,
          name: point.name,
          position: { lat: data.lat, lng: data.lng },
          nameVehicle: point.nameVehicle,
          patentVehicle: point.patentVehicle
        };
        this.markers.push(this.position);

        if (this.imei === point.imei) this.center = this.position.position;
      }
    });
    /* if (this.type.length !== 0)
      this.center = await this.inicializarCord(this.type[0].imei); */
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    async select_value(e) {
      this.imei = e.imei;
      const nameVehicle = e.vehicle ? e.vehicle.name : 'NO ASIGNADO';
      const patentVehicle = e.vehicle ? e.vehicle.patent : 'NO ASIGNADO';
      await this.ventanasGps(e.imei);

      this.auto = { nameVehicle, patentVehicle };
    },
    async ventanasGps(imei) {
      const { gps } = await this.$axios.$get(
        '/gps/get/' + this.$auth.user._id,
        {}
      );
      this.markers = [];
      const auxMarkers = [];
      let auxCenter = this.center;
      gps.forEach((gps) => {
        let coord = gps.coords.pop();
        if (coord === undefined)
          coord = { lat: -35.00215440507292, lng: -71.22937507646324 };

        const newPosition = { lat: coord.lat, lng: coord.lng };
        if (imei === gps.imei) auxCenter = newPosition;
        const marker = {
          imei: gps.imei,
          name: gps.name,
          position: newPosition,
          nameVehicle: gps.vehicle ? gps.vehicle.name : 'NO ASIGNADO',
          patentVehicle: gps.vehicle ? gps.vehicle.patent : 'NO ASIGNADO'
        };
        auxMarkers.push(marker);
        this.windowsOpen.push(gps.imei);
      });
      this.markers = auxMarkers.reverse();
      this.center = auxCenter;
    },
    async fetchGps() {
      try {
        this.type = [];
        const res = await this.$axios.$get(
          '/gps/get/' + this.$auth.user._id,
          {}
        );
        this.inicial = res.gps[0].name ? res.gps[0].name : '';
        this.type = res.gps;
        if (this.type.length !== 0) await this.select_value(this.type[0]);
      } catch (error) {
        console.log(error);
      }
    },

    async inicializarCord(id) {
      const lastCoord = await this.$axios.$get('/coord/get/last/' + id);
      if (!lastCoord.gps) {
        // inicializar maps
        return { lat: -35.00215440507292, lng: -71.22937507646324 };
      } else {
        return { lat: lastCoord.gps.lat, lng: lastCoord.gps.lng };
      }
    },
    openInfo(imei) {
      if (!this.windowsOpen.includes(imei)) this.windowsOpen.push(imei);
    },
    genAlarmMessage(data) {
      switch (data.alarm) {
        case 'ac alarm':
          return `EL GPS ${data.imei} HA SIDO DESCONECTADO DE LA FUENTE DE ALIMENTACIÓN`;

        case 'low battery':
          return `EL GPS ${data.imei} TIENE BATERÍA BAJA`;

        case 'panic':
          return `EL BOTÓN DE PÁNICO HA SIDO PRESIONADO EN EL GPS ${data.imei}`;

        default:
          break;
      }
    }
  }
};
</script>
