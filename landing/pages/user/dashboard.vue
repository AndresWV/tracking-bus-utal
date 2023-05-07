<template>
    <v-row class="custom-content" justify="center">
        <v-col>
            <v-row justify="end" style="padding:2px 0 7px 0">
                <v-btn tile color="#303345" @click="passwordDialog=true">
                    <v-icon>mdi-account-wrench-outline</v-icon>Cambiar constraseña
                </v-btn>
            </v-row>
            <v-row style="padding:1%" justify="center">
                <v-sheet class="mx-auto" style="padding:1%" color="#DCDBDB">
                    <v-row>
                        <v-card class="mx-auto" color="#303345" style="border-radius: 5% 0% 0% 5%;">
                            <v-list-item two-line>
                                <v-icon x-large left :color="'#5ca9bb'">
                                    mdi-clipboard-account
                                </v-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        {{ info.cantUsers }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>Usuarios</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <v-card class="mx-auto" color="#303345" tile>
                            <v-list-item two-line>
                                <v-icon x-large left :color="'#5ca9bb'">
                                    mdi-car
                                </v-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        {{ info.cantVehicles }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>Vehiculos</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                        <v-card class="mx-auto" color="#303345" style="border-radius: 0% 5% 5% 0%;">
                            <v-list-item two-line>
                                <v-icon x-large left :color="'#5ca9bb'">
                                    mdi-crosshairs-gps
                                </v-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        {{ info.cantGPS }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>GPS</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-row>
            <v-row style="padding:1%" justify="center">
                <v-col md="6">
                    <v-card height="100%" color="#303345" outlined elevation="3">
                        <v-list-item two-line style="text-align: center;">
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-1" >
                                    Resumen
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-text>
                            <v-row justify="center" style="padding: 2%;">
                                <v-col md="6">
                                    <BarChart
                                    :key="updated"
                                    :chart-data="barData"
                                    :chart-options="lineOptions"
                                    :style="barStyle"
                                    />
                                </v-col>
                                <v-col md="6">
                                    <BarChart
                                    :key="updated"
                                    :chart-data="barDataUser"
                                    :chart-options="lineOptions"
                                    :style="barStyle"
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col md="6">
                    <v-card height="100%" color="#303345" outlined elevation="3">
                        <v-list-item two-line style="text-align: center;">
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-1" >
                                    Actividad de vehiculos
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-text>
                            <v-row justify="center" style="padding: 2%;">
                                <LineChart
                                :key="updated"
                                :chart-data="lineData"
                                :chart-options="lineOptions"
                                :style="lineStyle"
                                />
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card color="#303345" outlined elevation="3">
                        <v-list-item two-line style="text-align: center;">
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-1" >
                                    Vehiculos
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-text>
                            <v-row justify="center" style="padding: 2%;">
                                <PieChart
                                :key="updated"
                                :chart-data="pieDataVH"
                                :chart-options="pieOptions"
                                :style="pieStyle"
                                />
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card color="#303345" outlined elevation="3">
                        <v-list-item two-line style="text-align: center;">
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-1">
                                    GPS
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-text>
                            <v-row justify="center" style="padding: 2%;">
                                <PieChart
                                :key="updated"
                                :chart-data="pieDataGPS"
                                :chart-options="pieOptions"
                                :style="pieStyle"
                                />
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-dialog v-model="passwordDialog" width="500">
            <v-card color="#303345">
                <v-card-title class="text-h5 lighten-2">
                    EDITAR CONSTRASEÑA
                </v-card-title>
                <hr class="mb-3" />
                <v-card-text>
                    <v-row>
                        <h4 class="mt-3 ml-3 mb-2">CONTRASEÑA ACTUAL</h4>
                    </v-row>
                    <v-row>
                        <v-text-field
                        v-model="currentPassword"
                        class="ml-2"
                        style="max-height: 75px"
                        type="password"
                        filled
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <h4 class="mt-3 ml-3 mb-2">CONTRASEÑA NUEVA</h4>
                    </v-row>
                    <v-row>
                        <v-text-field
                        v-model="newPassword"
                        class="ml-2"
                        style="max-height: 75px"
                        type="password"
                        filled
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <h4 class="mt-3 ml-3 mb-2">REPETIR CONTRASEÑA NUEVA</h4>
                    </v-row>
                    <v-row>
                        <v-text-field
                        v-model="repitPassword"
                        class="ml-2"
                        style="max-height: 75px"
                        type="password"
                        filled
                        ></v-text-field>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="sendNewPassword()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
export default {
    layout: 'UserDefault',
    data() {
        return {
            passwordDialog: false,
            currentPassword: '',
            newPassword: '',
            repitPassword: '',
            notificationColor:'',
            notificationMessage:'',
            showNotifiaction: false,
            currentuser: {},
            info: [],
            updated: 0,
            barData: {
                labels: [],
                datasets: [
                    {
                        label: 'Vehiculo',
                        borderColor: '#42adf5',
                        backgroundColor: '#42adf5',
                        pointBorderWidth: 5,
                        data: []
                    },
                    {
                        label: 'GPS',
                        borderColor: '#6ed14f',
                        backgroundColor: '#6ed14f',
                        pointBorderWidth: 5,
                        data: []
                    },
                ],
            },
            barDataUser: {
                labels: [],
                datasets: [
                    {
                        label: 'Usuarios totales',
                        borderColor: '#f54242',
                        backgroundColor: '#f54242',
                        pointBorderWidth: 5,
                        data: []
                    },
                    {
                        label: 'Usuarios activos',
                        borderColor: '#42adf5',
                        backgroundColor: '#42adf5',
                        pointBorderWidth: 5,
                        data: []
                    },
                ],
            },
            lineData: {
                labels: [],
                datasets: [
                    {
                        label: 'Vehiculos',
                        borderColor: '#42adf5',
                        pointBackgroundColor: '#42adf5',
                        pointBorderWidth: 5,
                        data: []
                    },
                ],
            },
            pieDataVH: {
                labels: ['STK303','TK103'],
                datasets: [
                    {
                        backgroundColor: ['#f54242', '#42adf5', '#6ed14f'],
                        data: []
                    },
                ],
            },
            pieDataGPS: {
                labels: ['STK303','TK103'],
                datasets: [
                    {
                        backgroundColor: ['#f54242', '#42adf5', '#6ed14f'],
                        data: []
                    },
                ],
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                            fontColor: '#ffffff',
                        },
                    onClick: (e) => e.stopPropagation()
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#ffffff'
                        }
                    }]
                },
            },
            pieOptions: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    labels: {
                        fontColor: '#ffffff',
                    },
                },
            }
        }
    },
    beforeMount() {
        this.currentuser = this.$auth.user;
        this.fetchInfo();
        this.fetchInfoHistory();
    },
    computed: {
        lineStyle() {
          return {
            width: '75%',
          };
        },
        barStyle() {
          return {
            width: '100%',
          };
        },
        pieStyle() {
          return {
            width: '75%',
          };
        }
    },
    methods: {
        async sendNewPassword() {
            this.passwordDialog = false;
            console.log(this.newPassword);
            console.log(this.currentPassword);
            console.log(this.currentuser);
            if(this.newPassword!==this.repitPassword){
                this.notificationMessage="Las contraseñas no coinciden"
                this.notificationColor="red"
                this.showNotifiaction=true
                return
            }
            try {
                await this.$axios.$patch('/auth/edit/' + this.currentuser.email, {
                    oldPass: this.currentPassword,
                    newPass: this.newPassword
                });
                this.notificationMessage="Contraseña cambiada"
                this.notificationColor="green"
                this.showNotifiaction=true
            } catch (error) {
                console.log(error);
            }
        },
        async fetchInfo() {
            await this.$axios.$get('/get/users/active', {})
                .then((data) => {
                    this.barDataUser.datasets[1].data.push(data.user.length);
                    this.updated++; 
                })
                .catch((error) => {
                    console.log(error);
                });
            await this.$axios.$get('/get/dashboard', [])
                .then((data) => {
                    this.pieDataVH.datasets[0].data.push(data.info.cantVhWithGpsSTK);
                    this.pieDataVH.datasets[0].data.push(data.info.cantVhWithGpsTK);
                    this.pieDataGPS.datasets[0].data.push(data.info.cantSTK303);
                    this.pieDataGPS.datasets[0].data.push(data.info.cantTK103);
                    this.barData.datasets[0].data.push(data.info.cantVehicles);
                    this.barData.datasets[1].data.push(data.info.cantGPS);
                    this.barDataUser.datasets[0].data.push(data.info.cantUsers);
                    this.info = data.info;
                    this.updated++;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async fetchInfoHistory() {
            await this.$axios.$get('/get/dashboard-history', [])
                .then((data) => {
                    let keys = [];
                    keys = Object.keys(data.history)
                    this.lineData.labels = keys;
                    keys.forEach(key => {
                        this.lineData.datasets[0].data.push(data.history[key].coords.length);
                    });
                    this.updated++;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>

<style>
.custom-content {
  background-color: #DCDBDB;
}
hr {
  width: 100%;
  border-color: #02b5c2;
}
.v-progress-circular__underlay {
  stroke: transparent  !important;
}
</style>