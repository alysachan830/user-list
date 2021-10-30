<template>
  <div class="container">
    <ul class="row">
      <li v-for="person in people" :key="person['_id']" class="col-lg-4 col-md-6 mb-md-5 mb-2">
        <router-link :to="`/${person['_id']}`" class="card d-flex px-2 py-3">
          <img :src="person.picture" alt="avatar" class="card__img me-3" />
          <div>
            <p>{{ person.name.first }} {{ person.name.last }}</p>
            <p class="text-info font-s">{{ person.email }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      people: [],
      errorMsg: '', // 載入有誤時出現
    };
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
