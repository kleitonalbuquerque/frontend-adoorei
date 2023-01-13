<template>
  <div>
    <select
      @change="changeRoute($event)"
      id=""
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected value="">Choose a category</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <!-- <div>
      <p>{{ selected }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      url: 'http://localhost:3000',
      selected: 'Choose a category',
      categories: [],
    };
  },
  async fetch() {
    this.categories = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());
  },
  methods: {
    changeRoute(e) {
      let valor = e.target.value;
      if (valor == "electronics") {
        setTimeout(() => {
          this.$router.push("/categories/" + e.target.value);
        }, 3000);
      }
      if (valor == "jewelery") {
        setTimeout(() => {
          this.$router.push("/categories/" + e.target.value);
        }, 3000);
      }
      if (valor == "men's clothing") {
        setTimeout(() => {
          this.$router.push("/categories/mens-clothing");
        }, 3000);
      }
      if (valor == "women's clothing") {
        setTimeout(() => {
          this.$router.push("/categories/womens-clothing");
        }, 3000);
      } else {
        this.$router.push("/");
      }
    },
  },
}
</script>
