<template>
  <nav class="nav-container">
    <div class="nav-center">
      <div class="nav-header">
        <div class="logo-container">
          <img
            src="../img/icons/Безимени-color.png"
            class="logo"
            alt="logo DF"
          />

          <!-- <img src="../img/icons/logo.svg" class="logo" alt="comfy sloth"/>
          <img src="../img/icons/logo-sloth.jpg" class="sloth-logo" alt="sloth"> -->
        </div>
        <div type="button" class="nav-toggle" @click="$emit('open-sidebar')">
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
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </div>
      </div>
      <ul class="nav-links">
        <li>
          <router-link to="/home">Домой</router-link>
          <router-link to="/products" custom v-slot="{ navigate }">
            <a href="#" @click="navigate" :class="{ active: activeLinkClass }"
              >Товары</a
            >
          </router-link>
          <router-link to="/about">О Нас</router-link>
        </li>
      </ul>
      <div class="cart-btn-wrapper">
        <div class="cart-btn" @click="$router.push('/cart')">
          <span>Корзина</span>
          <svg
            class="cart-btn-img"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 576 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
            ></path>
          </svg>
          <strong class="cart-value">{{ itemsInTheCart }}</strong>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  emits: {
    "open-sidebar": null,
  },

  props: {
    itemsInTheCart: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      links: [
        { name: "Домой", path: "/" },
        { name: "Товары", path: "/products" },
        { name: "О Нас", path: "/about" },
      ],
    };
  },

  computed: {
    activeLinkClass() {
      return this.$route.path.indexOf("/product") != -1;
    },
  },
};
</script>

<style src="../style/navbar.scss" lang="scss" scoped></style>
