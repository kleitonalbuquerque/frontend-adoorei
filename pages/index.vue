<template>
  <div>
    <div class="flex container my-24 px-6 mx-auto">
      <!-- Section: Design Block -->
      <section class="mb-32 text-gray-800 text-center">
        <h2 class="text-3xl font-bold mb-12 pb-4 text-center">
          Products
        </h2>

        <!-- <pre>{{ products.data }}</pre> -->

        <div class="grid lg:grid-cols-3 gap-6 xl:gap-x-12">
          <!-- <div class="mb-6 lg:mb-0" v-for="item in items" :key="item.id"> -->
          <div 
            class="mb-6 lg:mb-0" 
            v-for="product in products.data" 
            :key="product.id"
          >
            <div class="relative block bg-white rounded-lg shadow-lg">
              <div class="flex flex-center">
                <div
                  class="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <img
                    :src="product.image"
                    class="w-full"
                    style="width: 300px; height: 350px;"
                  />
                  <a href="#!">
                    <div
                      class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                      style="background-color: rgba(251, 251, 251, 0.15)"
                    ></div>
                  </a>
                </div>
              </div>
              <div class="p-6">
                <h5 class="font-bold text-lg mb-3">{{ product.title }}</h5>
                <p class="mb-4 pb-2">
                  {{ product.description }}
                </p>
                <p class="mb-4 pb-2">
                  <strong>Price:</strong> {{ product.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section: Design Block -->
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  async asyncData({ store }) {
    const products = await store.dispatch('products/getAllProducts')

    return { products }
  },
};
</script>
