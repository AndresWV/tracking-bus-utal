<template>
  <v-row class="custom-content" align="center" justify="center">
    <v-col>
      <v-card class="mx-auto" color="#303345" max-width="600">
        <v-card-text>
          <v-subheader min-widht="100%"> <h1>Nuevo Vehiculo</h1> </v-subheader>
          <hr />
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
                      class="field ml-2"
                      style="max-height: 70px"
                      :rules="[rules.longMax, rules.longMin]"
                      :placeholder="item.info"
                    ></v-text-field>
                    <v-autocomplete
                      v-else-if="index === 4"
                      v-model="info[index]"
                      :items="auxgps"
                      item-text="name"
                      class="field ml-2"
                      style="max-height: 70px"
                      filled
                      return-object
                    ></v-autocomplete>
                    <v-text-field
                      v-else-if="index === 3"
                      v-model="info[index]"
                      filled
                      class="field ml-2"
                      style="max-height: 70px"
                      :rules="[rules.required, rules.syntPatent]"
                      :placeholder="item.info"
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
              <v-btn style="width: 25%" color="red"> Cancelar</v-btn>
              <v-spacer></v-spacer>
              <v-btn style="width: 25%" color="#02b5c2" @click="registrar">
                Registrar</v-btn
              >
            </v-card-actions>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'UserDefault',
  data() {
    return {
      currentuser: {},
      items: [
        { title: 'NOMBRE', info: 'Nombre del dispositivo' },
        { title: 'MARCA', info: 'Nombre de la marca' },
        { title: 'MODELO', info: 'Nombre del modelo' },
        { title: 'PATENTE', info: 'aa - aa - 11' },
        { title: 'GPS', info: '' }
      ],
      auxgps: ['TK 103', 'STK303'],
      info: ['', '', '', '', ''],
      rules: {
        required: (value) => !!value || 'Campo obligatorio',
        longMax: (value) =>
          (value && value.length <= 20) || 'Debe tener máximo 20 caracteres',
        longMin: (value) => (value && value.length >= 2) || 'Min 2 caracteres',
        syntPatent: (value) =>
          /(^[a-zA-Z]{2}-[a-zA-Z]{2}-\d{2}$)|(^[a-zA-Z]{2}-\d{2}-\d{2}$)/.test(
            value
          ) || 'Sintaxis de patente erronea'
      }
    };
  },
  beforeMount() {
    this.currentuser = this.$auth.user;
    this.fetchGps();
  },
  methods: {
    async fetchGps() {
      this.auxgps = [];
      const res = await this.$axios.$get(
        '/gps/get/' + this.currentuser._id,
        {}
      );
      const target = res.gps.filter((gpsTemp) => gpsTemp.vehicle === null);
      // console.log(target);
      this.auxgps = target;
    },
    async registrar() {
      if (this.info[1] !== '' || this.info[2] !== '' || this.info[3] !== '') {
        const res = await this.$axios.$post('/vehicle/create', {
          name: this.info[0],
          brand: this.info[1],
          model: this.info[2],
          patent: this.info[3],
          user: this.currentuser._id
        });
        // sconsole.log(this.info[4])
        if (this.info[4] !== '') {
          await this.$axios.$patch('/gps/edit/' + this.info[4]._id, {
            vehicle: res.vehicle._id
          });
          await this.$axios.$patch('/vehicle/edit/' + res.vehicle._id, {
            gps: this.info[4]._id
          });
        }
      }
    }
  }
};
</script>

<style>
.custom-content {
  background-color: #dcdbdb;
  margin: 0 0 0 0;
  height: 100%;
}
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
</style>
