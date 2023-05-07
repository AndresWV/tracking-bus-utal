<template style="margin: 0%; padding: 0%">
 
    <v-card fluid width="100%" color="#02B5C2" elevation="4">
      <v-card-text>
        <v-row>
          <v-col cols="3" sm="3" md="3">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-1"
              icon
              style="color: white"
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="6"
            sm="6"
            md="6"
            justify="center"
            align="center"
            style="color: white"
          >
            TrackerVH®2022
          </v-col>
          <v-col
            cols="3"
            sm="3"
            md="3"
            align="right"
            justify="right"
            style="color: white"
          >
            Taller de Software 2022-01
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
</template>

<script>
export default {
  name: 'FooterNewComponent',
  data() {
    return {
      icons: [
        'mdi-chart-bubble',
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
};
</script>
