<template>
  <aside class="sidebar" :class="{ 'show-sidebar': isSidebarOpen }">
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="../img/icons/Безимени-color.png" class="logo" alt="logo DF" />

        <!-- <img src="../img/icons/logo.svg" class="logo" alt="coding addict" />
          <img src="../img/icons/logo-sloth.jpg" class="sloth-logo" alt="sloth"> -->
      </div>
      <button class="close-btn" @click="$emit('close-sidebar')">
        <svg
          stroke="currentColor"
          fill="hsl(22, 31%, 52%)"
          stroke-width="0"
          viewBox="0 0 352 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </button>
    </div>
    <ul class="links">
      <li v-for="link in links" :key="link">
        <router-link :to="link.path" @click="closeSidebar">{{
          link.name
        }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  emits: {
    "close-sidebar": null,
  },

  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      links: [
        { name: "Домой", path: "/" },
        { name: "Товары", path: "/products" },
        { name: "О Нас", path: "/about" },
        { name: "Корзина", path: "/cart" },
      ],
    };
  },

  methods: {
    closeSidebar() {
      this.$emit("close-sidebar");
    },
  },
};
</script>

<style src="../style/sidebar.scss" lang="scss" scoped></style>
