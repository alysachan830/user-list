<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-5">
      <div class="d-flex align-items-center">
        <img :src="person.picture" class="avatar me-4" alt="avatar" />
        <ul>
          <li class="font-l">{{ person.name.first }} {{ person.name.last }}</li>
          <li>
            <a class="d-flex align-items-center" :href="`mailto:${person.email}`">
              <span class="material-icons font-m me-2"> email </span>
              <span class="font-s">{{ person.email }}</span>
            </a>
          </li>
        </ul>
      </div>
      <router-link to="/" class="btn d-flex align-items-center text-info">
        <span>Back</span> <span class="material-icons"> chevron_right </span>
      </router-link>
    </div>
    <div>
      <p class="d-flex align-items-center mb-2">
        <span class="material-icons"> location_on </span>
        <span class="text-uppercase">Location</span>
      </p>
      <div v-if="markerLatLng">
        <l-map style="height: 400px" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng"></l-marker>
        </l-map>
      </div>
      <p v-else>Location is not available</p>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import { Icon } from 'leaflet';

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;
const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png');
const iconUrl = require('leaflet/dist/images/marker-icon.png');
const shadowUrl = require('leaflet/dist/images/marker-shadow.png');

Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default {
  props: {
    person: {
      type: Object,
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: null,
      markerLatLng: null,
    };
  },
  mounted() {
    const latLng = Object.values(this.person.location);
    if (!latLng.every((value) => value)) return;
    this.markerLatLng = latLng;
    this.center = latLng;
  },
};
</script>

<style scoped>
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 10%;
}
</style>
