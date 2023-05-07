<template>
  <v-row class="custom-content" justify="center">
    <v-col>
      <v-card
        class="mx-auto"
        color="#303345"
        max-width="900"
      >
        <v-card-text>
          <v-card-title>
            <v-subheader> <h1>Vehiculos</h1> </v-subheader>
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
            <v-btn
              v-if="currentuser.role !== 'admin'"
              color="#02b5c2"
              dark
              class="mb-2"
              text
              @click="add()"
            >
              Nuevo Vehiculo
            </v-btn>
            <hr />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            :search="search"
            item-key="name"
            style="background-color: #DCDBDB"
            light
            disable-sort
            :footer-props="{ 'items-per-page-text':'Usuarios por página' }"
          >
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
              <h1>No hay vehiculos registrados</h1>
            </div>
          </template>
          </v-data-table>
          <v-dialog v-model="createDialog" max-width="500">
            <editar-vehiculo :vehiculo="auxvehiculo" :gps="auxgps" @cerrarDialog="cerrarDialog">
            </editar-vehiculo>
          </v-dialog>
          <v-dialog v-model="regDialog" max-width="500">
            <reg-vehiculo :gps="auxgps" @addVehiculo="addVehiculo"></reg-vehiculo>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-col>
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
  </v-row>
</template>

<script>
import EditarVehiculo from '../../components/EditarVehiculo';
import RegVehiculo from '../../components/RegVehicle';
export default {
  components: {
    EditarVehiculo,
    RegVehiculo,
  },
  layout: 'UserDefault',
  data() {
    return {
      search: '',
      notificationColor:'',
      notificationMessage:'',
      showNotifiaction: false,
      headers: [
        {
          text: 'Vehiculo',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'blue--text title'
        },
        { text: 'Marca', value: 'brand', class: 'blue--text title' },
        { text: 'Modelo', value: 'model', class: 'blue--text title' },
        { text: 'Patente', value: 'patent', class: 'blue--text title' },
        { text: 'Gps', value: 'gps.name', class: 'blue--text title' },
        { text: '', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
      currentuser: {},
      items: [],
      auxgps: [],
      createDialog: false,
      auxvehiculo: {},
      temppatent: '',
      regDialog: false,
    };
  },
  beforeMount() {
    this.currentuser = this.$auth.user;
    let flag = 0;
    if (this.currentuser.role === 'admin') {
      flag = 1;
      const userheader = { text: 'Usuario', value: 'user.name', class: 'blue--text title' }
      this.headers.unshift(userheader);
    }
    this.fetchUser(flag);
  },
  methods: {
    async fetchUser(flag) {
      await this.fetchVehiculos(flag);
      await this.fetchGps();
    },
    async fetchVehiculos(flag) {
      this.items = [];
      let res = {};
      if (flag === 0) {
        res = await this.$axios.$get('/vehicle/get/' + this.currentuser._id, {});
      } else {
        res = await this.$axios.$get('/vehicle/get', {});
      }
      this.items = res.vehicle;
    },
    async fetchGps() {
      this.auxgps = [];
      const res = await this.$axios.$get('/gps/get/' + this.currentuser._id, {});
      const target = res.gps.filter((gpsTemp) => gpsTemp.vehicle === null);
      this.auxgps = target;
    },
    async eliminar(item) {
      await this.$axios.$delete('/vehicle/delete/' + item._id);
      this.eliminarItem(item._id);
      if (item.gps !== null) {
        await this.$axios.$patch('/gps/edit/' + item.gps._id, {
          vehicle: null,
        })
        await this.fetchGps();
      }
    },
    eliminarItem(id) {
      for (let index = 0; index < this.items.length; index++) {
        if (this.items[index]._id === id) {
          this.items.splice(index, 1);
          this.showNotifiaction=false
          this.notificationMessage="Vehiculo Eliminado Satisfactoriamente"
          this.notificationColor="green"
          this.showNotifiaction=true
        }
      }
    },
    add() {
      this.regDialog = true;
    },
    actualizar(content) {
      this.createDialog = true;
      this.auxvehiculo = content;
      this.temppatent = content.patent;
    },
    async addVehiculo(content) {
      console.log(content);
      try {
        const res = await this.$axios.$post('/vehicle/create', {
          name: content[0],
          brand: content[1],
          model: content[2],
          patent: content[3],
          user: this.currentuser._id,
        });
        this.notificationMessage="Vehiculo Agregado Exitosamente"
        this.notificationColor="green"
        this.showNotifiaction=true
        if (content.length === 5 && content[4] !== '') {
          await this.$axios.$patch('/gps/edit/' + content[4]._id, {
            vehicle: res.vehicle._id,
          })
          await this.$axios.$patch('/vehicle/edit/' + res.vehicle._id, {
            gps: content[4]._id,
          });
        }
      } catch (error) {
        this.notificationMessage="Error al crear el vehiculo (patente ya registrada)"
        this.notificationColor="red"
        this.showNotifiaction=true
      }
      let flag = 0;
      if (this.currentuser.role === 'admin') {
        flag = 1;
      }
      this.regDialog = false;
      this.fetchVehiculos(flag);
    },
    async cerrarDialog(content, gps) {
      this.createDialog = false;
      try {
        await this.$axios.$patch('/vehicle/edit/' + content._id, {
          name: content.name,
          brand: content.brand,
          model: content.model,
        });
        if (this.temppatent !== content.patent) {
          await this.$axios.$patch('/vehicle/edit/' + content._id, {
            patent: content.patent,
          });
        }
        this.notificationMessage="Vehiculo Editado Exitosamente"
        this.notificationColor="green"
        this.showNotifiaction=true
        if (content.gps !== null) {
          await this.$axios.$patch('/gps/edit/' + content.gps._id, {
            vehicle: content._id,
          })
          await this.$axios.$patch('/vehicle/edit/' + content._id, {
            gps: content.gps._id,
          });
        } else {
          if (gps !== null) {
            await this.$axios.$patch('/gps/edit/' + gps._id, {
              vehicle: null,
            })
          }
          await this.$axios.$patch('/vehicle/edit/' + content._id, {
            gps: null,
          });
        }
      } catch (error) {
        this.notificationMessage="Error al editar el vehiculo (patente ya registrada)"
        this.notificationColor="red"
        this.showNotifiaction=true
      }
      await this.fetchGps();
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
.table {
  background-color: #303345;
}
hr {
  font-size: 54px;
  width: 100%;
  border-color: #02b5c2;
}
</style>
