<template>
  <v-row class="custom-content" justify="center">
    <v-col>
      <v-card class="mx-auto" color="#303345" max-width="1000">
        <v-card-text>
          <v-card-title>
            <v-subheader><h1>Logs</h1></v-subheader>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
              solo
              background-color="#303345"
              flat
            ></v-text-field>
            <hr />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="logs"
            class="elevation-1"
            :search="search"
            :sort-by="'createdAt'"
            :sort-desc="true"
            style="background-color: #dcdbdb"
            light
            :footer-props="{ 'items-per-page-text': 'Logs por página' }"
          >
            <template #top> </template>
            <template #[`item.actions`]="{ item }">
              <v-btn color="#02b5c2" icon @click="viewMap(item)">
                <v-icon> mdi-map</v-icon>
              </v-btn>
            </template>
            <template #no-data>
              <div>
                <h1>No hay gps registrados</h1>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog v-model="toggleMap" width="500" heigth="500">
      <v-card>
        <gmap-map
          :center="center"
          :zoom="19"
          map-type-id="terrain"
          style="width: 500px; height: 500px"
          :options="{ styles: styleMap }"
        >
          <gmap-marker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            :clickable="true"
            @click="center = m.position"
          >
          </gmap-marker>
        </gmap-map>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { styleMap } from '~/assets/styleMap';

export default {
  layout: 'UserDefault',
  data() {
    return {
      search: '',
      calories: '',
      logs: [],
      toggleMap: false,
      center: { lat: -35.00215440507292, lng: -71.22937507646324 },
      markers: [],
      styleMap,
      ALARM_TYPES: {
        LOW_BATTERY: {
          key: 'low battery',
          message: 'Batería baja'
        },
        AC_ALARM: {
          key: 'ac alarm',
          message: 'Desconexión de alimentación'
        },
        PANIC_BUTTON: {
          key: 'panic button',
          message: 'Botón de pánico'
        },
        TRACKER: { key: 'tracker', message: 'Coordenadas' }
      }
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'Alarma',
          value: 'alarm',
          class: 'blue--text title'
        },
        {
          text: 'Nombre',
          value: 'name',
          class: 'blue--text title'
        },
        {
          text: 'Imei',
          value: 'imei',
          class: 'blue--text title'
        },
        {
          text: 'Fecha',
          value: 'createdAt',
          class: 'blue--text title'
        },
        { text: 'lat', value: 'lat', class: 'blue--text title' },
        { text: 'lng', value: 'lng', class: 'blue--text title' },
        { text: '', value: 'actions', sortable: false }
      ];
    }
  },
  mounted() {
    this.$axios
      .get(`/get/logs/${this.$auth.user._id}`)
      .then((data) => {
        this.logs = Object.values(data.data.logs).map((log) => {
          const ALARMS = this.ALARM_TYPES;
          switch (log.alarm) {
            case ALARMS.AC_ALARM.key:
              log.alarm = ALARMS.AC_ALARM.message;
              break;
            case ALARMS.LOW_BATTERY.key:
              log.alarm = ALARMS.LOW_BATTERY.message;
              break;
            case ALARMS.PANIC_BUTTON.key:
              log.alarm = ALARMS.PANIC_BUTTON.message;
              break;
            case ALARMS.TRACKER.key:
              log.alarm = ALARMS.TRACKER.message;
              break;
            default:
          }
          return log;
        });
        console.log(JSON.stringify(Object.values(this.logs)));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    viewMap(item) {
      this.center = { lat: item.lat, lng: item.lng };
      this.markers = [{ position: { lat: item.lat, lng: item.lng } }];
      this.toggleMap = true;
    }
  }
};
</script>

<style scoped></style>
