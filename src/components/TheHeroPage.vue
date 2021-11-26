<template>
  <section class="hero-page">
    <div class="wrapper">
      <router-link to="/">Домой /</router-link>
      <router-link v-if="intermediateSection" to="/products">{{
        intermediateSection
      }}</router-link>
      <span>{{ sectionTitle }}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    sectionTitle: {
      type: String,
      required: true,
    },

    intermediateSection: {
      type: String,
      required: false,
    },
  },
};
</script>

<style src="../style/hero-page.scss" lang="scss" scoped></style>
