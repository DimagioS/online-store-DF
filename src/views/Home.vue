<template>
  <main>
    <div class="wrapper section-header">
      <article class="content">
        <h1>
          Создай свою <br />
          Зону комфорта
        </h1>
        <p>
          Сеть гипермаркетов Dimagio Florenzi — это одна из крупнейших
          российских и динамично развивающихся мебельных сетей. Это единственная
          российская сеть мебели и аксессуаров для дома, работающая в формате
          гипермаркета
        </p>
        <router-link to="/products" class="btn hero-btn"
          >купить сейчас</router-link
        >
      </article>

      <article class="img-container">
        <img
          src="../img/background/bcg-header-1.jpeg"
          alt="nice table"
          class="main-img"
        />
        <img
          src="../img/background/bcg-header-2.jpeg"
          alt="person working"
          class="accent-img"
        />
      </article>
    </div>

    <div class="section section-products">
      <div class="title">
        <h2>Рекомендуемые товары</h2>
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
      <router-link to="/products" class="btn btn-all-product"
        >Вся продукция</router-link
      >
    </div>

    <div class="custom-furniture">
      <div class="wrapper">
        <article class="header">
          <h3>Услуги нашей компании</h3>
          <p>
            В основу торговой политики нашей компании заложен принцип
            доступности и качества, что полностью соответствует потребностям
            наших клиентов и партнеров.
          </p>
        </article>
        <div class="services-center">
          <article class="service">
            <img class="icon" src="../img/icons/design.png" alt="" />
            <h4>Дизайнер на дом</h4>
            <p>
              Мы исполним ваши пожелания с учетом особенностей вашего помещения.
              Подберем образцы фасадов под ваш интерьер. Составим 3D-ПРОЕКТ по
              индивидуальным размерам. Учтем инженерные и архитектурные
              особенности помещений.
            </p>
          </article>
          <article class="service">
            <img class="icon" src="../img/icons/exchange.png" alt="" />
            <h4>Обмен и возврат</h4>
            <p>
              У вас есть целый год, в течение которого вы можете вернуть или
              обменять свою покупку. Вы можете вернуть любые товары DF,
              купленные на территории РФ. Для возврата товара необходимо
              удостоверение личности и чек.
            </p>
          </article>
          <article class="service">
            <img class="icon" src="../img/icons/measurement.png" alt="" />
            <h4>Профессиональный замер помещений</h4>
            <p>
              Мы отправим к вам опытного специалиста, который тщательно снимет
              все необходимые замеры. Таким образом в вашем распоряжении будут
              точные размеры вашего помещения, что так важно для составления
              идеального проекта кухни или ванной.
            </p>
          </article>
        </div>
      </div>
    </div>

    <div class="subscribe-block">
      <div class="wrapper">
        <h3>Подпишитесь на нашу рассылку</h3>
        <div class="subscribe-content">
          <p>
            Узнавай об акциях первым! Подпишись на нашу рассылку и получи 500₽ в
            подарок.
          </p>
          <form class="contact-form">
            <input
              type="email"
              class="form-input"
              placeholder="Введите Email"
            />
            <button type="submit" class="submit-btn">Подписаться</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AppProduct from "../components/AppProduct.vue";

export default {
  props: {
    goods: {
      type: Array,
      required: true,
    },
  },

  emits: {
    "to-info-product": null,
  },

  methods: {
    toInfoProduct(id) {
      this.$emit("to-info-product", id);
    },
  },

  computed: {
    partOfGoods() {
      let recomendedGoods = [];
      let i = 0;
      while (i < 3) {
        const randomGoods =
          Math.floor(Math.random() * (this.goods.length - 1 + 1)) + 1;
        if (recomendedGoods.indexOf(randomGoods) == -1) {
          recomendedGoods.push(randomGoods);
          i++;
        }
      }

      return this.goods.filter((el) => {
        if (recomendedGoods.includes(el.id)) return el;
      });
    },
  },

  components: { AppProduct },
};
</script>

<style src="../style/home.scss" lang="scss" scoped></style>
