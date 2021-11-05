import Swal from 'sweetalert2';

export default {
  data() {
    return {
      people: [],
    };
  },
  methods: {
    async getPeople() {
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
  },
};
