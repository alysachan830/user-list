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
            <ul>
              <li>{{ person.name.first }} {{ person.name.last }}</li>
              <li class="text-info font-s">{{ person.email }}</li>
            </ul>
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
import Pagination from '@/components/Pagination.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';
import getPeopleAPI from '@/mixins/getPeopleAPI';

export default {
  data() {
    return {
      currentPage: 1,
      errorMsg: '',
    };
  },
  mixins: [getPeopleAPI],
  components: {
    Pagination,
    SkeletonCard,
  },
  async created() {
    document.title = 'Users';
    await this.getPeople();
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
        params: { selectedPerson: person, id: person._id },
      });
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>
