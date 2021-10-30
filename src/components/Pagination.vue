<template>
  <nav>
    <ul class="d-flex">
      <li class="mx-2">
        <button type="button" @click="selectArrow('prev')" :disabled="currentPage === 1">
          <span>&laquo;</span>
        </button>
      </li>
      <li class="mx-2" v-for="page in totalPages" :key="page">
        <button type="button" @click="seletePage(page)">
          <span :class="{ 'text-primary': page === currentPage }"> {{ page }} </span>
        </button>
      </li>
      <li class="mx-2">
        <button type="button" @click="selectArrow('next')" :disabled="currentPage === totalPages">
          <span>&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    seletePage(page) {
      this.currentPage = page;
      this.$emit('selectPage', page);
    },
    selectArrow(direction) {
      if (direction === 'prev') {
        this.currentPage -= 1;
      } else {
        this.currentPage += 1;
      }
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  background: none;
}
</style>
