export default {
  getAllProducts({ commit }) {
    return this.$axios.get("https://fakestoreapi.com/products").then((response) => {
      commit('STORE', response.data)
      return response
    })
  }
}