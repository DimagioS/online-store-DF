<template>
  <article>
    <img :src="getImg(item.mainImg, item.id)" :alt="item.name" />
    <div>
      <h4>{{ item.name }}</h4>
      <h5 class="price">{{ item.price }} ₽</h5>
      <p>{{ item.description.substring(0, 150) }}...</p>
      <div @click="toProduct(item.id)" class="btn">Подробнее</div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },

  emits: {
    "to-product": null,
  },

  methods: {
    getImg(img, id) {
      return require(`../img/products/product-${id}/${img}`);
    },

    toProduct(id) {
      this.$emit("to-product", id);
    },
  },
};
</script>

<style src="../style/product-list.scss" lang="scss" scoped></style>
