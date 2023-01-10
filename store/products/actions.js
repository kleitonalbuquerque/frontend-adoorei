export default {
  getAllProducts() {
    return this.$axios.get("https://fakestoreapi.com/products");
  }
}