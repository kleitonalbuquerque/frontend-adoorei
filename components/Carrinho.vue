<template>
  <div>
    <header class="header">
      <img src="@/static/techno.svg" alt="Techno" class="logo" />
      <div class="carrinho_menu" @click="carrinhoAtivo = true">
        $ {{ carrinhoTotal.toFixed(2) | numeroPreco }} | {{ carrinho.length }}
      </div>
    </header>

    <section class="produtos">
      <div
        v-for="item in produtos"
        @click="abrirModal(item.id)"
        :key="item.id"
        class="produto"
      >
        <img :src="item.image" :alt="item.title" class="produto_img" />
        <div class="produto_info">
          <span class="produto_price">{{ item.price | numeroPreco }}</span>
          <h2>{{ item.title }}</h2>
        </div>
      </div>
    </section>

    <section class="modal" v-if="produto" @click="fecharModal">
      <div class="modal_container">
        <div class="modal_img">
          <img :src="produto.imgage" :alt="produto.title" />
        </div>
        <div class="modal_dados">
          <button class="modal_fechar" @click="fecharModal">X</button>
          <span class="modal_price">{{ produto.price | numeroPreco }}</span>
          <h2 class="modal_titulo">{{ produto.title }}</h2>
          <p>{{ produto.description }}</p>
          <!-- <button
            class="modal_btn"
            v-if="produto.estoque > 0"
            @click="adicionarItem"
          > -->
          <button class="modal_btn" @click="adicionarItem">
            Adicionar Item
          </button>
          <!-- <button class="modal_btn esgotado" v-else disabled>
            Produto esgotado
          </button> -->
          <div class="reviews">
            <h2 class="reviews_subtitulo">Avaliações</h2>
            <ul>
              <li v-for="review in produtos" :key="review.id" class="review">
                <p class="review_descricao">{{ review.description }}</p>
                <p class="review_usuario">
                  {{ review.title }} | {{ review.rating.rate }} estrelas
                </p>
              </li>
            </ul>
          </div>
        </div>
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
            <li v-for="(item, index) in carrinho" :key="index" class="carrinho_item">
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
      produtos: [],
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
  },
  methods: {
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
        this.$router.push("/");
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
  max-width: 900px;
  padding: 20px 0;
}

.logo {
  width: 80px;
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
  max-width: 900px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}

.produto {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.produto_img {
  max-width: 300px;
  margin-right: 40px;
}

.produto_titulo {
  font-size: 3rem;
  line-height: 1;
}

.produto_preco {
  color: rgba(0, 0, 0, 0.5);
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
  background: linear-gradient(to right, transparent 250px, white 250px);
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
