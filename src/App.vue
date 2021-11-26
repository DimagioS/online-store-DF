<template>
  <div class="app">
    <TheNavbar
      :items-in-the-cart="itemsInTheCart"
      @open-sidebar="isSidebarOpen = true"
    />
    <AppSideBar
      :is-sidebar-open="isSidebarOpen"
      @close-sidebar="isSidebarOpen = false"
    />

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :key="Component"
          :is="Component"
          :goods="goods"
          :product-id="$route.params.id"
          :goods-in-cart="goodsInCart"
          :price-items-in-the-cart="priceItemsInTheCart"
          @to-info-product="toInfoProduct"
          @reduce-number-of-goods="reduceNumberOfGoods"
          @increase-number-of-goods="increaseNumberOfGoods"
          @reduce-number-of-goods-in-cart="reduceNumberOfGoodsInCart"
          @increase-number-of-goods-in-cart="increaseNumberOfGoodsInCart"
          @add-to-cart="addToCart"
          @clear-cart="clearCart"
          @delete-goods="deleteGoods"
        ></component>
      </keep-alive>
    </router-view>

    <TheFooter />
  </div>
</template>

<script>
import AppSideBar from "./components/AppSideBar.vue";
import TheFooter from "./components/TheFooter.vue";
import TheNavbar from "./components/TheNavbar.vue";
import goodsMixin from "./mixins/goodsMixin";

export default {
  mixins: [goodsMixin],

  data() {
    return {
      goodsInCart: [],
      isSidebarOpen: false,
    };
  },

  mounted() {
    JSON.parse(sessionStorage.getItem("goodsInCart"))
      ? (this.goodsInCart = JSON.parse(sessionStorage.getItem("goodsInCart")))
      : [];
  },

  methods: {
    toInfoProduct(id) {
      window.scrollTo(0, 310);
      this.$router.push("/product/" + id);
    },

    reduceNumberOfGoods(id) {
      const currentItem = this.goods.find((el) => el.id === id);
      if (currentItem.quantityOfGoods > 1) currentItem.quantityOfGoods--;
    },

    increaseNumberOfGoods(id) {
      const currentItem = this.goods.find((el) => el.id === id);
      currentItem.quantityOfGoods++;
    },

    reduceNumberOfGoodsInCart(id, color) {
      const currentItem = this.goodsInCart.find(
        (el) => el.id === id && el.color === color
      );
      if (currentItem.number > 1) {
        currentItem.number--;
        sessionStorage.setItem("goodsInCart", JSON.stringify(this.goodsInCart));
      }
    },

    increaseNumberOfGoodsInCart(id, color) {
      this.goodsInCart.find((el) => el.id === id && el.color === color)
        .number++;
      sessionStorage.setItem("goodsInCart", JSON.stringify(this.goodsInCart));
    },

    addToCart(color, mainImg, infoProduct) {
      const currentItem = this.goods.find((el) => el.id === infoProduct.id);

      const chekingArr = this.goodsInCart.map((el) => {
        const isInTheBasket = el.id == infoProduct.id && el.color == color;
        if (isInTheBasket) el.number = el.number + infoProduct.quantityOfGoods;

        return isInTheBasket;
      });

      if (!chekingArr.includes(true) || chekingArr.length == 0) {
        this.goodsInCart.push({
          name: currentItem.name,
          img: mainImg,
          color,
          price: currentItem.price,
          number: currentItem.quantityOfGoods,
          id: currentItem.id,
          key: currentItem.id + color,
        });

        sessionStorage.setItem("goodsInCart", JSON.stringify(this.goodsInCart));
      }

      currentItem.quantityOfGoods = 1;

      this.$router.push("/cart");
    },

    clearCart() {
      this.goodsInCart = [];
      this.itemsInTheCart = 0;
      sessionStorage.setItem("goodsInCart", JSON.stringify(this.goodsInCart));
    },

    deleteGoods(id, color) {
      this.goodsInCart = this.goodsInCart.filter((el) => {
        if (el.id == id) return el.color != color;
        else return true;
      });
      sessionStorage.setItem("goodsInCart", JSON.stringify(this.goodsInCart));
    },
  },

  computed: {
    itemsInTheCart() {
      if (this.goodsInCart.length !== 0) {
        return this.goodsInCart.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.number;
        }, 0);
      } else return 0;
    },

    priceItemsInTheCart() {
      if (this.goodsInCart.length !== 0) {
        return this.goodsInCart.reduce((previousValue, currentValue) => {
          return (
            previousValue +
            currentValue.price.split(" ").join("") * currentValue.number
          );
        }, 0);
      } else return 0;
    },
  },

  components: { TheNavbar, TheFooter, AppSideBar },
};
</script>

<style src="./style/main.scss" lang="scss"></style>
