<template>
  <div class="container">
    <div v-if="people.length > 0">
      <ul class="row mb-3">
        <li
          v-for="person in displayedPeople"
          :key="person._id"
          class="col-lg-4 col-md-6 mb-md-5 mb-2"
        >
          <a href="#" @click.prevent="showDetails(person)" class="card d-flex">
            <img :src="person.picture" alt="avatar" class="card__img" />
            <div>
              <p>{{ person.name.first }} {{ person.name.last }}</p>
              <p class="text-info font-s">{{ person.email }}</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="d-flex justify-content-center mb-5">
        <Pagination :totalPages="totalPages" @selectPage="changePage" />
      </div>
    </div>
    <div v-else-if="errorMsg === ''">
      <ul class="row">
        <li v-for="num in 12" :key="num" class="col-lg-4 col-md-6 mb-md-5 mb-2">
          <SkeletonCard />
        </li>
      </ul>
    </div>
    <div v-else class="text-center">
      <span class="material-icons font-2xl"> warning </span>
      <p class="font-m">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Pagination from '@/components/Pagination.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';

export default {
  data() {
    return {
      people: [],
      currentPage: 1,
      errorMsg: '',
    };
  },
  components: {
    Pagination,
    SkeletonCard,
  },
  async created() {
    try {
      const fetchRes = await fetch('https://api.json-generator.com/templates/Xp8zvwDP14dJ/data', {
        headers: {
          Authorization: 'Bearer v3srs6i1veetv3b2dolta9shrmttl72vnfzm220z',
        },
      });
      const people = await fetchRes.json();
      this.people = people;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: 'Please try again later',
        confirmButtonText: 'Cancel',
      });
      this.errorMsg = 'Something went wrong, please try again later';
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.people.length / 12);
    },
    displayedPeople() {
      return this.people.slice((this.currentPage - 1) * 12, this.currentPage * 12);
    },
  },
  methods: {
    showDetails(person) {
      this.$router.push({
        name: 'personDetails',
        params: { person, id: person._id },
      });
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>
