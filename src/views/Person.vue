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
        <l-map class="map" :zoom="zoom" :center="center">
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
import getPeopleAPI from '@/mixins/getPeopleAPI';

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
    selectedPerson: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  mixins: [getPeopleAPI],
  data() {
    return {
      person: { location: {}, name: {} },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: null,
      markerLatLng: null,
    };
  },
  methods: {
    updateMap() {
      const latLng = Object.values(this.person.location);
      if (!latLng.every((value) => value)) return;
      this.markerLatLng = latLng;
      this.center = latLng;
    },
  },
  async created() {
    // If we have props
    if (Object.keys(this.selectedPerson).length > 0) {
      this.person = this.selectedPerson;
      sessionStorage.setItem('person', JSON.stringify(this.person));
      this.updateMap();
      document.title = `${this.person.name.first} ${this.person.name.last}`;
      return;
    }

    // If we can get person detail from sessionStorage, that matches the person id in URL
    const cachePerson = sessionStorage.getItem('person');
    if (cachePerson && JSON.parse(cachePerson)._id === this.$route.fullPath.split('/')[1]) {
      this.person = JSON.parse(cachePerson);
      this.updateMap();
      document.title = `${this.person.name.first} ${this.person.name.last}`;
      return;
    }

    // If the data in sessionStorage is unavailable, call API
    await this.getPeople();
    const target = this.people.find((person) => person._id === this.$route.fullPath.split('/')[1]);
    if (target === undefined) {
      this.$router.push('/');
      return;
    }
    this.person = target;
    sessionStorage.setItem('person', JSON.stringify(this.person));
    this.updateMap();
    document.title = `${this.person.name.first} ${this.person.name.last}`;
  },
};
</script>

<style scoped>
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 10%;
}

.map {
  height: 400px;
}
</style>
