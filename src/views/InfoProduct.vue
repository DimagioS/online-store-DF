<template>
  <main>
    <TheHeroPage
      :section-title="infoProduct.name"
      intermediate-section="&nbsp;Товары /&nbsp;"
    />
    <div class="wrapper info-product-box">
      <router-link class="btn back-btn" to="/products"
        >Вернуться к товарам</router-link
      >
      <div class="product-center">
        <section class="img-box">
          <img :src="getMainImg()" alt="main img" class="main" />
          <div class="gallery">
            <img
              v-for="id in numberOfImages"
              :key="id"
              :src="getImg(id)"
              class="inactive-img"
              :class="{ 'active-img': mainImg == id }"
              @click="mainImg = id"
              alt="product img"
            />
          </div>
        </section>
        <section class="content">
          <h2 class="product-name">{{ infoProduct.name }}</h2>
          <h5 class="price">{{ infoProduct.price }} ₽</h5>
          <p class="desc">{{ infoProduct.description }}</p>
          <p class="info"><span>Артикул :</span>{{ infoProduct.vendorСode }}</p>
          <p class="info"><span>Бренд :</span>{{ infoProduct.brand }}</p>
          <hr />

          <section class="color-counter-product">
            <div class="colors">
              <span>Цвета :</span>
              <div>
                <button
                  v-for="(color, i) in infoProduct.colors"
                  :key="color"
                  class="color-btn"
                  :class="{ active: activeColorId == i }"
                  :style="{ background: color }"
                  @click="activeColorId = i"
                >
                  <svg
                    v-if="activeColorId == i"
                    class="check-mark"
                    :class="{ 'check-mark-white': color == '#fff' }"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="btn-container">
              <div class="amount-btns">
                <div
                  class="amount-btn"
                  @click="$emit('reduce-number-of-goods', infoProduct.id)"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    ></path>
                  </svg>
                </div>
                <h2 class="amount">{{ infoProduct.quantityOfGoods }}</h2>
                <div
                  class="amount-btn"
                  @click="$emit('increase-number-of-goods', infoProduct.id)"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="btn" @click="addToCart()">Добавить в корзину</div>
            </div>
          </section>
        </section>
      </div>
    </div>

    <div class="wrapper section-products">
      <div class="title">
        <h2>Вам также может понравиться</h2>
        <div class="underline"></div>
      </div>
      <div class="section-featured featured wrapper">
        <AppProduct
          v-for="item in partOfGoods"
          :key="item.id"
          :item="item"
          @to-product="toInfoProduct"
        />
      </div>
    </div>
  </main>
</template>

<script>
import TheHeroPage from "../components/TheHeroPage.vue";
import AppProduct from "../components/AppProduct.vue";

export default {
  emits: {
    "reduce-number-of-goods": null,
    "increase-number-of-goods": null,
    "add-to-cart": null,
    "to-info-product": null,
  },

  props: {
    goods: {
      type: Array,
      required: true,
    },

    productId: {
      type: String,
    },
  },

  data() {
    return {
      activeColorId: 0,
      mainImg: 1,
      numberOfImages: 4,
    };
  },

  methods: {
    getImg(id) {
      return require(`../img/products/product-${this.infoProduct.id}/${
        this.infoProduct.colors[this.activeColorId]
      }/${id}.webp`);
    },

    getMainImg() {
      return require(`../img/products/product-${this.infoProduct.id}/${
        this.infoProduct.colors[this.activeColorId]
      }/${this.mainImg}.webp`);
    },

    addToCart() {
      this.$emit(
        "add-to-cart",
        this.infoProduct.colors[this.activeColorId],
        `../img/products/product-${this.infoProduct.id}/${
          this.infoProduct.colors[this.activeColorId]
        }/${this.mainImg}.webp`,
        this.infoProduct
      );
    },

    toInfoProduct(id) {
      this.$emit("to-info-product", id);
    },
  },

  computed: {
    infoProduct() {
      return this.goods.find((el) => el.id == this.productId);
    },

    partOfGoods() {
      let recomendedGoods = [];
      let i = 0;
      while (i < 3) {
        const randomGoods =
          Math.floor(Math.random() * (this.goods.length - 1 + 1)) + 1;
        if (
          recomendedGoods.indexOf(randomGoods) == -1 &&
          this.infoProduct.id != randomGoods
        ) {
          recomendedGoods.push(randomGoods);
          i++;
        }
      }

      return this.goods.filter((el) => {
        if (recomendedGoods.includes(el.id)) return el;
      });
    },
  },

  components: { TheHeroPage, AppProduct },
};
</script>

<style src="../style/info-product.scss" lang="scss" scoped></style>
