<template>
  <div>
    <main>
      <template v-if="goodsInCart.length !== 0">
        <TheHeroPage section-title="&nbsp;Корзина" />
        <div class="page">
          <section class="wrapper">
            <div class="cart-item">
              <div class="content">
                <h5>Товар</h5>
                <h5>Цена</h5>
                <h5>Кличество</h5>
                <h5>Общая сумма</h5>
              </div>
              <hr />
            </div>
            <transition-group name="list">
              <AppBasketItem
                v-for="item in goodsInCart"
                :key="item.key"
                :basket-item="item"
                @delete-goods="deleteGoods"
                @increase-number-of-goods-in-cart="increasenNumber"
                @reduce-number-of-goods-in-cart="reduceNumber"
              />
            </transition-group>
            <hr />
            <div class="link-container">
              <div class="link-btn to-product-btn" @click="toPtoduct">
                Продолжить покупки
              </div>
              <button
                type="button"
                class="clear-btn link-btn"
                @click="$emit('clear-cart')"
              >
                Очистить корзину
              </button>
            </div>
            <section class="cart-totals">
              <article class="total-container">
                <h5>
                  Стоимость товаров :<span
                    >{{ priceItemsInTheCart.toLocaleString() }} ₽</span
                  >
                </h5>
                <p>
                  Стоимость достваки :<span>{{ costOfDelivery }}</span>
                </p>
                <hr />
                <h4>
                  Общая стоимость :<span>{{ totalCartCost }} ₽</span>
                </h4>
              </article>
            </section>
          </section>
        </div>
      </template>
      <div v-else class="page-100">
        <div class="empty">
          <h2>Ваша корзина пуста</h2>
          <div @click="toPtoduct" className="btn">Заполнить</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppBasketItem from "../components/AppBasketItem.vue";
import TheHeroPage from "../components/TheHeroPage.vue";

export default {
  props: {
    goodsInCart: {
      type: Array,
      required: true,
    },

    priceItemsInTheCart: {
      type: Number,
      required: true,
    },
  },

  emits: {
    "clear-cart": null,
    "delete-goods": null,
    "increase-number-of-goods-in-cart": null,
    "reduce-number-of-goods-in-cart": null,
  },

  data() {
    return {
      deliveryPrice: 9900,
      freeShippingAmount: 100000,
    };
  },

  methods: {
    deleteGoods(id, color) {
      this.$emit("delete-goods", id, color);
    },

    increasenNumber(id, color) {
      this.$emit("increase-number-of-goods-in-cart", id, color);
    },

    reduceNumber(id, color) {
      this.$emit("reduce-number-of-goods-in-cart", id, color);
    },

    toPtoduct() {
      window.scrollTo(0, 0);
      this.$router.push("/products");
    },
  },

  computed: {
    costOfDelivery() {
      if (this.priceItemsInTheCart > this.freeShippingAmount)
        return "Бесплатная";
      else return this.deliveryPrice.toLocaleString() + " ₽";
    },

    totalCartCost() {
      if (this.priceItemsInTheCart > this.freeShippingAmount)
        return this.priceItemsInTheCart.toLocaleString();
      else
        return (this.priceItemsInTheCart + this.deliveryPrice).toLocaleString();
    },
  },

  components: { TheHeroPage, AppBasketItem },
};
</script>

<style src="../style/cart.scss" lang="scss" scoped></style>
