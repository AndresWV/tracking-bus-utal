<template>
    <v-row class="custom-content" justify="center">
      <v-col class="px-12" cols="12">
        <v-card
          class="mx-auto"
          color="#303345"
          max-width="700"
        >
          <v-card-text>
            <v-card-title>
              <v-subheader> <h1>Usuarios</h1> </v-subheader>
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
              :items="usuarios"
              :items-per-page="5"
              :search="search"
              :single-expand="true"
              :expanded.sync="expanded"
              item-key="email"
              style="background-color: #DCDBDB"
              light
              show-expand
              disable-sort
              :footer-props="{ 'items-per-page-text':'Vehículos por página' }"
            >
            <template #expanded-item="{ headers, item }">
              <td v-if="item.vehicles.length !== 0 && item.vehicles[0] !== null" :colspan="headers.length">
                <div v-for="vehicle in item.vehicles" :key="vehicle._id">
                  <v-row style="padding: 1%;">
                    <v-col>
                      <h4 class="blue--text">Vehiculo</h4>
                      {{ vehicle.name }}
                    </v-col>
                    <v-col>
                      <h4 class="blue--text">Marca</h4>
                      {{ vehicle.brand }}
                    </v-col>
                    <v-col>
                      <h4 class="blue--text">Modelo</h4>
                      {{ vehicle.model }}
                    </v-col>
                    <v-col>
                      <h4 class="blue--text">Patente</h4>
                      {{ vehicle.patent }}
                    </v-col>
                    <v-col v-if="vehicle.gps === null">
                      <h4 class="blue--text">GPS</h4>
                      Sin Asignar
                    </v-col>
                    <v-tooltip bottom> 
                      <template #activator="{ on, attrs }">
                        <v-col v-if="vehicle.gps !== null" v-bind="attrs" v-on="on">
                          <h4 class="blue--text">GPS</h4>
                          {{ vehicle.gps.name }}
                        </v-col>
                      </template> 
                      <span> <b>Nombre: </b> {{ vehicle.gps === null ? 'Sin asignar' : vehicle.gps.name }} </span> <br />
                      <span> <b>Telefono: </b> {{ vehicle.gps === null ? 'Sin asignar' : vehicle.gps.phone }} </span> <br />
                      <span> <b>IMEI: </b> {{ vehicle.gps === null ? 'Sin asignar' : vehicle.gps.imei }} </span> <br />
                      <span> <b>Tipo: </b> {{ vehicle.gps === null ? 'Sin asignar' : vehicle.gps.type }} </span> <br />
                    </v-tooltip>
                  </v-row>
                  <v-divider></v-divider>
                </div>
              </td>
            </template>
            <template #[`item.actions`]="{ item }">
              <v-btn color="#02b5c2" icon @click="actualizar(item)">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn color="red" icon @click="eliminar(item)">
                <v-icon> mdi-cancel </v-icon>
              </v-btn>
            </template>
            <template #no-data>
              <div>
                <h1>No hay usuarios registrados</h1>
              </div>
            </template>
            </v-data-table>
            <v-dialog v-model="createDialog" width="500">
              <editar-user :user="auxuser"> </editar-user>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

</template>

<script>
import EditarUser from '../../components/EditarUser';
export default {
  components: {
    EditarUser,
  },
  layout: 'UserDefault',
  data() {
    return {
      expanded: [],
      singleExpand: false,
      search: '',
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'blue--text title'
        },
        { text: 'Correo', value: 'email', class: 'blue--text title' },
        { text: 'Vehiculos', value: 'vehicles.length', class: 'blue--text title' },
        { text: '', value: 'actions', sortable: false },
      ],
      vhheaders: [
        { },
        { text: 'Vehiculo' },
        { text: 'Marca' },
        { text: 'Modelo' },
        { text: 'Patente' },
        { text: 'GPS' },
      ],
      usuarios: [],
      vehicles: [],
      createDialog: false,
      auxuser: {},
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    linkWithVh(users, vehicles){
      const usersTemp = users;
      const vehiclesTemp = vehicles;
      for (let index = 0; index < usersTemp.length; index++) {
        const user = usersTemp[index];
        const vehicles = []
        for (let j = 0; j < vehiclesTemp.length; j++) {
          const vehicle = vehiclesTemp[j];
          if (user._id === vehicle.user._id) {
            vehicles.push(vehicle)
          }
        }
        usersTemp[index].vehicles = vehicles
      }
      this.usuarios = usersTemp;
    },
    async fetchData() {
      const resUsr = await this.$axios.$get('/user/get', {});
      const resVh = await this.$axios.$get('/vehicle/get', {});
      this.linkWithVh(resUsr.user, resVh.vehicle);
    },
    async eliminar(item) {
      await this.$axios.$delete('/user/delete/' + item.email);
      this.eliminarItem(item._id);
    },
    eliminarItem(id) {
      for (let index = 0; index < this.usuarios.length; index++) {
        if (this.usuarios[index]._id === id) {
          this.usuarios.splice(index, 1);
        }
      }
    },
    actualizar(content) {
      this.createDialog = true;
      this.auxuser = content;
    },
  },
};
</script>

<style>
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
.custom-content {
  background-color: #DCDBDB;
  margin: 0 0 0 0;
}
</style>
