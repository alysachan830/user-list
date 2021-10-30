<template>
  <div class="container">
    <ul class="row mb-3">
      <li
        v-for="person in displayedPeople"
        :key="person['_id']"
        class="col-lg-4 col-md-6 mb-md-5 mb-2"
      >
        <a href="#" @click.prevent="showDetails(person)" class="card d-flex px-2 py-3">
          <img :src="person.picture" alt="avatar" class="card__img me-3" />
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
</template>

<script>
import Swal from 'sweetalert2';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      people: [],
      currentPage: 1,
      errorMsg: '', // 載入有誤時出現
    };
  },
  components: {
    Pagination,
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
        title: '載入資料有誤，請稍後再試',
        confirmButtonText: '取消',
      });
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
        // eslint-disable-next-line dot-notation
        params: { person, id: person['_id'] },
      });
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  transition: box-shadow 0.2s;

  &__img {
    width: 56px;
    height: 56px;
    border-radius: 10%;
  }

  &:hover {
    box-shadow: 2px 4px 10px #dfdfdf;
  }
}
</style>
