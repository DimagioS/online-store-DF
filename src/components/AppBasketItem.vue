<template>
  <div class="cart-container">
    <div class="title">
      <img :src="getImg(basketItem.id, basketItem.color)" alt="modern poster" />
      <div>
        <h5 class="name">{{ basketItem.name }}</h5>
        <p class="color">
          Цвет :<span :style="{ background: basketItem.color }"></span>
        </p>
        <h5 class="price-small">{{ basketItem.price }}</h5>
      </div>
    </div>
    <h5 class="price">{{ basketItem.price }} ₽</h5>

    <div class="amount-btns">
      <button
        type="button"
        class="amount-btn"
        @click="
          $emit(
            'reduce-number-of-goods-in-cart',
            basketItem.id,
            basketItem.color
          )
        "
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
      </button>
      <h2 class="amount">{{ basketItem.number }}</h2>
      <button
        type="button"
        class="amount-btn"
        @click="
          $emit(
            'increase-number-of-goods-in-cart',
            basketItem.id,
            basketItem.color
          )
        "
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
      </button>
    </div>

    <h5 class="subtotal">
      {{ totalGoodCost(basketItem.price, basketItem.number) }} ₽
    </h5>
    <button
      class="remove-btn"
      @click="$emit('delete-goods', basketItem.id, basketItem.color)"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    basketItem: {
      type: Object,
    },
  },

  emits: {
    "delete-goods": null,
    "increase-number-of-goods-in-cart": null,
    "reduce-number-of-goods-in-cart": null,
  },

  methods: {
    getImg(id, color) {
      return require(`../img/products/product-${id}/${color}/1.webp`);
    },

    totalGoodCost(price, number) {
      const totalCost = price.split(" ").join("") * number;

      return totalCost.toLocaleString();
    },
  },
};
</script>

<style src="../style/cart.scss" lang="scss" scoped></style>
