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
            <v-subheader> <h1>GPS</h1> </v-subheader>
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
              Nuevo GPS
            </v-btn>
            <hr />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            :search="search"
            style="background-color: #DCDBDB"
            light
            disable-sort
            :footer-props="{ 'items-per-page-text':'GPS por página' }"
          >
          <template #top>
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
              <h1>No hay gps registrados</h1>
            </div>
          </template>
          </v-data-table>
          <v-dialog
            v-model="createDialog"
            max-width="500px"
          >
            <editar-GPS :gps="auxgps" @save="save"></editar-GPS>
          </v-dialog>
          <v-dialog v-model="regDialog" max-width="500">
            <reg-GPS @addGPS="addGPS"></reg-GPS>
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
import EditarGPS from '../../components/EditarGPS';
import RegGPS from '../../components/RegGPS';
export default {
  components: {
    EditarGPS,
    RegGPS,
  },
  layout: 'UserDefault',
  data() {
    return {
      notificationColor:'',
      notificationMessage:'',
      showNotifiaction: false,
      regDialog: false,
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { text: 'Vehiculo', value: 'vehicle.name', class: 'blue--text title' },
        {
          text: 'GPS',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'blue--text title'
        },
        { text: 'Telefono', value: 'phone', class: 'blue--text title' },
        { text: 'IMEI', value: 'imei', class: 'blue--text title' },
        { text: 'Tipo', value: 'type', class: 'blue--text title' },
        { text: '', value: 'actions', sortable: false },
      ],
      currentuser: {},
      items: [],
      createDialog: false,
      tempimei: '',
      tempnum: '',
      auxgps: {},
    };
  },
  async beforeMount() {
    this.currentuser = this.$auth.user;
    
    let flag = 0;
    if (this.currentuser.role === 'admin') {
      flag = 1;
      const userheader = { text: 'Usuario', value: 'user.name', class: 'blue--text title' }
      this.headers.unshift(userheader);
    }
    await this.fetchGps(flag);
  },
  methods: {
    async fetchGps(flag) {
      this.items = [];
      if (flag === 1) {
        const res = await this.$axios.$get('/gps/get/', {});
        this.items = res.gps;
      } else {
        const res = await this.$axios.$get('/gps/get/' + this.currentuser._id, {});
        this.items = res.gps;
      }
    },
    async eliminar(item) {
      await this.$axios.$delete('/gps/delete/' + item._id);
      this.eliminarItem(item._id);
      if (item.vehicle !== null) {
        await this.$axios.$patch('/vehicle/edit/' + item.vehicle._id, {
          gps: null,
        })
      }
    },
    add() {
      this.regDialog = true;
    },
    async addGPS(content) {
      try {
        await this.$axios.$post('/gps/create', {
          name: content[0],
          phone: content[1],
          imei: content[2],
          type: content[3],
          user: this.currentuser._id,
        });
        this.notificationMessage="GPS Agregado Exitosamente"
        this.notificationColor="green"
        this.showNotifiaction=true
      } catch (error) {
        this.notificationMessage="Error al agregar gps (imei o telefono ya agregados)"
        this.notificationColor="red"
        this.showNotifiaction=true
      }
      let flag = 0;
      if (this.currentuser.role === 'admin') {
        flag = 1;
      }
      this.regDialog = false;
      this.fetchGps(flag);
    },
    eliminarItem(id) {
      for (let index = 0; index < this.items.length; index++) {
        if (this.items[index]._id === id) {
          this.items.splice(index, 1);
          this.showNotifiaction=false
          this.notificationMessage="GPS Eliminado Exitosamente"
          this.notificationColor="green"
          this.showNotifiaction=true
        }
      }
    },
    actualizar(content) {
      this.createDialog = true;
      this.auxgps = content;
      this.tempimei = content.imei;
      this.tempnum = content.phone;
    },
    async save(content) {
      this.createDialog = false;
      try {
        await this.$axios.$patch('/gps/edit/' + content._id, {
          name: content.name,
          type: content.type,
        });
        if (this.tempimei !== content.imei) {
          await this.$axios.$patch('/gps/edit/' + content._id, {
            imei: content.imei,
          });
        }
        if (this.tempnum !== content.phone) {
          await this.$axios.$patch('/gps/edit/' + content._id, {
            phone: content.phone,
          });
        }
        this.notificationMessage="GPS Actualizado Exitosamente"
        this.notificationColor="green"
        this.showNotifiaction=true
      } catch (error) {
        this.notificationMessage="El GPS no se ha podido actualizar"
        this.notificationColor="red"
        this.showNotifiaction=true
      }
    },

    close() {
      this.createDialog = false;
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
