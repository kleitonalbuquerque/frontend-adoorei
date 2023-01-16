<template>
  <div>
    <header class="header">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        alt="flowbite"
        class="logo"
      />
      <div>
        <select
          v-model="selected"
          @change="changeCategory($event)"
          id=""
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="">All Products</option>
          <option
            v-for="categoria in categorias"
            :key="categoria"
            :value="categoria"
          >
            {{ categoria }}
          </option>
        </select>
      </div>
      <div class="carrinho_menu" @click="carrinhoAtivo = true">
        $ {{ carrinhoTotal.toFixed(2) | numeroPreco }} | {{ carrinho.length }}
      </div>
    </header>

    <!-- Lista de produtos -->
    <section class="produtos" v-if="selected == '' || selected == produtos">
      <h1 class="text-3xl font-bold text-center">Products</h1>
      <div
        v-for="item in produtos"
        @click="abrirModal(item.id)"
        :key="item.id"
        class="produto flex align-middle items-center my-10"
      >
        <img :src="item.image" :alt="item.title" class="produto_img" />
        <div class="produto_info">
          <span class="produto_price">${{ item.price | numeroPreco }}</span>
          <h2>{{ item.title }}</h2>
        </div>
      </div>
    </section>

    <!-- Lista electronics -->
    <div class="">
      <section class="produtos" v-if="selected == 'electronics'">
        <h1 class="text-3xl font-bold text-center mb-5">Electronics</h1>
        <div
          v-for="item in produtos"
          :key="item.id"
          @click="abrirModal(item.id)"
          class="produto"
        >
          <div
            v-if="item.category == 'electronics'"
            class="flex items-center my-10 cat-mob"
          >
            <img :src="item.image" :alt="item.title" class="produto_img" />
            <div class="produto_info">
              <span class="produto_price">${{ item.price | numeroPreco }}</span>
              <h2>{{ item.title }}</h2>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Lista jewelery -->
    <section class="produtos" v-if="selected == 'jewelery'">
      <h1 class="text-3xl font-bold text-center">Jewelery</h1>
      <div
        v-for="item in produtos"
        @click="abrirModal(item.id)"
        :key="item.id"
        class="produto"
      >
        <div
          v-if="item.category == 'jewelery'"
          class="flex items-center my-10 cat-mob"
        >
          <img :src="item.image" :alt="item.title" class="produto_img" />
          <div class="produto_info">
            <span class="produto_price">${{ item.price | numeroPreco }}</span>
            <h2>{{ item.title }}</h2>
          </div>
        </div>
      </div>
    </section>

    <!-- Lista men's clothing -->
    <section class="produtos" v-if="selected == `men's clothing`">
      <h1 class="text-3xl font-bold text-center" style="margin-bottom: 20px">
        Men's clothing
      </h1>
      <div
        v-for="item in produtos"
        @click="abrirModal(item.id)"
        :key="item.id"
        class="produto"
      >
        <div
          v-if="item.category == `men's clothing`"
          class="flex items-center my-10 cat-mob"
        >
          <img :src="item.image" :alt="item.title" class="produto_img" />
          <div class="produto_info">
            <span class="produto_price">${{ item.price | numeroPreco }}</span>
            <h2>{{ item.title }}</h2>
          </div>
        </div>
      </div>
    </section>

    <!-- Lista women's clothing -->
    <section class="produtos" v-if="selected == `women's clothing`">
      <h1 class="text-3xl font-bold text-center" style="margin-bottom: -100px">
        Women's clothing
      </h1>
      <div
        v-for="item in produtos"
        @click="abrirModal(item.id)"
        :key="item.id"
        class="produto"
      >
        <div
          v-if="item.category == `women's clothing`"
          class="flex items-center my-10 cat-mob"
        >
          <img :src="item.image" :alt="item.title" class="produto_img" />
          <div class="produto_info">
            <span class="produto_price">${{ item.price | numeroPreco }}</span>
            <h2>{{ item.title }}</h2>
          </div>
        </div>
      </div>
    </section>

    <!-- Detalhes do produto -->
    <section class="modal" v-if="produto" @click="fecharModal">

      <div class="modal_container">
        <section
          class="text-gray-800 text-center flex flex-wrap justify-center"
        >
          <div
            class="w-full max-w-sm bg-white rounded-lg mb-10 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              class="p-8 rounded-t-lg"
              :src="produto.image"
              :alt="produto.title"
            />
            <div class="px-5 pb-5">
              <a href="#">
                <h5
                  class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ produto.title }}
                </h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
                  >{{ produto.rating.rate }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white"
                  >${{ produto.price }}</span
                >
                <a
                  style="cursor: pointer;"
                  @click="adicionarItem"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Add to cart</a
                >
                <a
                style="cursor: pointer;"
                  @click="fecharModal"
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >Close</a
                >
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section
      class="carrinho_modal"
      :class="{ ativo: carrinhoAtivo }"
      @click="cliqueForaCarrinho"
    >
      <div class="carrinho_container">
        <button class="carrinho_fechar" @click="carrinhoAtivo = false">
          X
        </button>
        <h2 class="carrinho_titulo">Carrinho</h2>
        <div v-if="carrinho.length > 0">
          <ul class="carrinho_lista">
            <li
              v-for="(item, index) in carrinho"
              :key="index"
              class="carrinho_item"
            >
              <p>{{ item.title }}</p>
              <p class="carrinho_price">{{ item.price | numeroPreco }}</p>
              <button class="carrinho_remover" @click="removerItem(index)">
                X
              </button>
            </li>
          </ul>
          <p class="carrinho_total">
            ${{ carrinhoTotal.toFixed(2) | numeroPreco }}
          </p>
          <button class="carrinho_finalizar" @click="finalizarCompra()">
            Finalizar Compra
          </button>
        </div>
        <p v-else>O carrinho está vazio.</p>
      </div>
    </section>

    <div class="alerta" :class="{ ativo: alertaAtivo }">
      <p class="alerta_mensagem">{{ menssagemAlerta }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carrinho",
  data() {
    return {
      selected: "",
      produtos: [],
      categorias: [],
      produto: false,
      carrinho: [],
      menssagemAlerta: "Item adicionado",
      alertaAtivo: false,
      carrinhoAtivo: false,
    };
  },
  // TODO filters
  filters: {
    numeroPreco(valor) {
      return valor;
    },
  },
  async fetch() {
    this.produtos = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    this.categorias = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());
  },
  methods: {
    changeCategory(e) {
      let valor = e.target.value;
      console.log(valor);
    },
    fetchProduto(id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((r) => r.json())
        .then((json) => {
          this.produto = json;
        });
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    adicionarItem() {
      const { id, title, price } = this.produto;
      this.carrinho.push({ id, title, price });

      this.alerta(`${title} foi adicionado ao carrinho`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.produto = false;
      }
    },
    cliqueForaCarrinho({ target, currentTarget }) {
      if (target === currentTarget) {
        this.carrinhoAtivo = false;
      }
    },
    alerta(mensagem) {
      this.menssagemAlerta = mensagem;
      this.alertaAtivo = true;

      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1000);
    },
    finalizarCompra() {
      alert("Compra finalizada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduto(hash.replace("#", ""));
      }
    },
  },
  computed: {
    carrinhoTotal() {
      let total = 0;

      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.price;
        });
      }

      return total;
    },
  },
};
</script>

<style scoped>
h1,
h2,
body,
ul,
li {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

* {
  box-sizing: border-box;
  outline: none;
}

body {
  background: linear-gradient(to right, #1a1a1a 30%, #fff 30%);
  font-family: "Noto Serif";
}

#app {
  padding: 0 80px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: auto;
  padding: 20px 30px;
}

.logo {
  width: 40px;
}

.carrinho_menu::after {
  content: "";
  display: inline-block;
  background: url("@/static/carrinho.svg") no-repeat center center;
  width: 25px;
  height: 25px;
  margin-left: 10px;
}

.carrinho_menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.produtos {
  /* max-width: 900px; */
  /* margin-top: 100px; */
  margin-left: auto;
  margin-right: auto;
  padding: 20px 30px;
}

.produto {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background: white;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.produto_img {
  max-width: 200px;
  margin-right: 40px;
}

.produto_titulo {
  font-size: 3rem;
  line-height: 1;
}

.produto_preco {
  color: rgba(0, 0, 0, 0.5);
}

.cat-mob {
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 900px) {
  .cat-mob {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/* MODAL */

.modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 80px;
}

.modal_container {
  /* background: linear-gradient(to right, transparent 250px, white 250px); */
  display: grid;
  grid-gap: 50px;
  align-items: end;
  padding: 0px 50px 50px 0;
  animation: produto 0.3s forwards;
}

@keyframes produto {
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(0px);
  }
}

.modal_fechar {
  border-radius: 50%;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_img {
  margin-top: 50px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_img img {
  max-width: 300px;
  display: block;
}

.modal_dados {
  max-width: 600px;
}

.modal_titulo {
  font-size: 3rem;
}

.modal_btn {
  margin-top: 80px;
  background: #000;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  font-family: "Noto Serif";
}

.modal_btn:active {
  background: #808080;
}

.modal_btn.esgotado {
  cursor: initial;
  opacity: 0.5;
}

/* REVIEWS */

.reviews {
  grid-column: 2;
}

.reviews_subtitulo {
  font-size: 1.75rem;
}

.review {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}

.review_descricao {
  color: rgba(0, 0, 0, 0.7);
}

.review_usuario {
  font-weight: bold;
  line-height: 0px;
}

.alerta {
  position: absolute;
  top: 20px;
  left: 0px;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: none;
}

.alerta.ativo {
  display: block;
  animation: fadeInDown 0.3s forwards;
}

@keyframes fadeInDown {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.alerta_mensagem {
  background: white;
  border: 2px solid black;
  display: inline-block;
  padding: 20px 40px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* CARRINHO */

.carrinho_modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.carrinho_modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
  display: none;
}

.carrinho_modal.ativo {
  display: block;
}

.carrinho_container {
  position: relative;
  margin: 80px auto;
  max-width: 800px;
  padding: 40px;
  background: white;
  animation: fadeInDown 0.3s forwards;
}

.carrinho_item {
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
}

.carrinho_titulo {
  margin-bottom: 10px;
  border-bottom: 2px solid #000;
  padding-bottom: 20px;
}

.carrinho_remover {
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.carrinho_preco {
  text-align: right;
}

.carrinho_total {
  text-align: right;
  border-bottom: 2px solid #000;
  padding-right: 50px;
  padding-bottom: 20px;
}

.carrinho_fechar {
  border-radius: 50%;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.carrinho_finalizar {
  display: block;
  margin-left: auto;
  background: #000;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  font-family: "Noto Serif";
}

@media screen and (max-width: 900px) {
  #app {
    padding: 0 10px;
  }
  .produtos {
    margin-top: 40px;
  }
  .produto {
    flex-direction: column;
    align-items: flex-start;
    max-width: 300px;
    margin: 30px auto;
  }
  .produto_info {
    padding: 20px;
  }
  .produto_img {
    max-width: 100%;
    margin-right: 0px;
  }
  .produto_titulo {
    font-size: 1.5rem;
  }
  .modal {
    padding: 10px;
  }
  .modal_container {
    grid-gap: 20px;
    background: white;
    padding: 10px 0;
  }
  .modal_img {
    margin-top: 0px;
    grid-row: 2;
  }
  .modal_img img {
    width: 100%;
    max-width: initial;
  }
  .modal_dados {
    padding: 10px;
  }
  .modal_btn {
    margin-top: 20px;
  }
  .reviews {
    grid-column: 1;
    padding: 10px;
  }
  .carrinho_modal {
    padding: 10px;
  }
}
</style>
