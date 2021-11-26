<template>
  <div>
    <main>
      <TheHeroPage section-title="&nbsp;Товары" />
      <div class="page">
        <div class="wrapper products">
          <TheFeilters
            :goods="goods"
            :highest-price="highestPrice"
            v-model:range-value="rangePrice"
            :selected-colors="selectedColors"
            :selected-category="selectedCategory"
            v-model:filter-value="filter"
            v-model:brand-value="selectedBrand"
            @category-value="categoryValue"
            @colors-value="colorsValue"
            @clear-filters="clearFilters"
          />
          <div>
            <TheSort
              :list-item="listItem"
              :filter-price="filterPrice"
              v-model:modalValue="selectedSort"
              :sort-options="sortOptions"
              @table-item="listItem = false"
              @list-item="listItem = true"
            />
            <div
              v-if="listItem"
              :class="{
                'empty-products-container': filterPrice.length == 0,
                'products-list-container': filterPrice.length != 0,
              }"
            >
              <template v-if="filterPrice.length != 0">
                <AppProductList
                  v-for="item in filterPrice"
                  :key="item.id"
                  :item="item"
                  @to-product="toInfoProduct"
                />
              </template>
              <template v-else>
                <h2 class="no-products-found">Ничего не найдено</h2>
              </template>
            </div>
            <div
              v-else
              :class="{
                'empty-products-container': filterPrice.length == 0,
                'products-container': filterPrice.length != 0,
              }"
            >
              <template v-if="filterPrice.length != 0">
                <AppProduct
                  v-for="item in filterPrice"
                  :key="item.id"
                  :item="item"
                  @to-product="toInfoProduct"
                />
              </template>
              <template v-else>
                <h2 class="no-products-found" key="no-products-found">
                  Ничего не найдено
                </h2>
              </template>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppProduct from "../components/AppProduct.vue";
import AppProductList from "../components/AppProductList.vue";
import TheFeilters from "../components/TheFeilters.vue";
import TheHeroPage from "../components/TheHeroPage.vue";
import TheSort from "../components/TheSort.vue";

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

  mounted() {
    sessionStorage.getItem("filterValue")
      ? (this.filter = sessionStorage.getItem("filterValue"))
      : "";
    sessionStorage.getItem("sortValue")
      ? (this.selectedSort = sessionStorage.getItem("sortValue"))
      : "";
    sessionStorage.getItem("selectedCategory")
      ? (this.selectedCategory = sessionStorage.getItem("selectedCategory"))
      : "Все";
    sessionStorage.getItem("brandValue")
      ? (this.selectedBrand = sessionStorage.getItem("brandValue"))
      : "all";
    sessionStorage.getItem("rangeValue")
      ? (this.rangePrice = sessionStorage.getItem("rangeValue"))
      : 0;
    JSON.parse(sessionStorage.getItem("selectedColors"))
      ? (this.selectedColors = JSON.parse(
          sessionStorage.getItem("selectedColors")
        ))
      : ["all"];
  },

  data() {
    return {
      listItem: false,
      filter: "",
      selectedSort: "",
      selectedCategory: "Все",
      selectedBrand: "all",
      selectedColors: ["all"],
      rangePrice: 0,
      sortOptions: [
        { value: "price-lowest", name: "Цена по возрастанию" },
        { value: "price-highest", name: "Цена по убыванию" },
        { value: "name-a", name: "Название (А - Я)" },
        { value: "name-z", name: "Название (Я - А)" },
      ],
    };
  },

  methods: {
    toInfoProduct(id) {
      this.$emit("to-info-product", id);
    },

    categoryValue(value) {
      sessionStorage.setItem("selectedCategory", value);
      this.selectedCategory = value;
    },

    colorsValue(color) {
      if (color == "all") {
        this.selectedColors = ["all"];
        sessionStorage.setItem(
          "selectedColors",
          JSON.stringify(this.selectedColors)
        );
      }

      if (this.selectedColors.indexOf("all") != -1) {
        this.selectedColors.splice(this.selectedColors.indexOf("all"), 1);
        sessionStorage.setItem(
          "selectedColors",
          JSON.stringify(this.selectedColors)
        );
      }

      if (this.selectedColors.indexOf(color) != -1) {
        this.selectedColors.splice(this.selectedColors.indexOf(color), 1);
        sessionStorage.setItem(
          "selectedColors",
          JSON.stringify(this.selectedColors)
        );
      } else {
        this.selectedColors.push(color);
        sessionStorage.setItem(
          "selectedColors",
          JSON.stringify(this.selectedColors)
        );
      }

      if (this.selectedColors.length == 0) {
        this.selectedColors.push("all");
        sessionStorage.setItem(
          "selectedColors",
          JSON.stringify(this.selectedColors)
        );
      }
    },

    clearFilters() {
      this.filter = "";
      sessionStorage.setItem("filterValue", this.filter);

      this.selectedSort = "";
      sessionStorage.setItem("sortValue", this.selectedSort);

      this.selectedBrand = "all";
      sessionStorage.setItem("brandValue", this.selectedBrand);

      this.selectedCategory = "Все";
      sessionStorage.setItem("selectedCategory", this.selectedCategory);

      this.selectedColors = ["all"];
      sessionStorage.setItem(
        "selectedColors",
        JSON.stringify(this.selectedColors)
      );

      this.rangePrice = 0;
      sessionStorage.setItem("rangeValue", this.rangePrice);
    },
  },

  computed: {
    filterInput() {
      return this.goods.filter((el) => {
        if (this.filter == "") return el;
        else if (el.name.toLowerCase().includes(this.filter.toLowerCase()))
          return el;
      });
    },

    filterCategory() {
      return this.filterInput.filter((el) => {
        if (this.selectedCategory == "Все") return el;
        if (el.type == this.selectedCategory) return el;
      });
    },

    filterManufacturers() {
      return this.filterCategory.filter((el) => {
        if (this.selectedBrand == "all") return el;
        if (el.brand == this.selectedBrand) return el;
      });
    },

    filterColors() {
      let arr = [];
      this.filterManufacturers.forEach((el) => {
        if (this.selectedColors.includes("all")) arr.push(el);
        else
          el.colors.forEach((color) => {
            if (this.selectedColors.includes(color)) arr.push(el);
          });
      });

      return [...new Set(arr)];
    },

    filterPrice() {
      return this.filterColors.filter((el) => {
        if (el.price.split(" ").join("") > Number(this.rangePrice)) return el;
      });
    },

    highestPrice() {
      return Math.max(...this.goods.map((el) => el.price.split(" ").join("")));
    },
  },

  watch: {
    selectedSort(newValue) {
      if (newValue == "price-lowest") {
        this.filterPrice.sort((item1, item2) => {
          const itm1 = Number(item1.price.split(" ").join(""));
          const itm2 = Number(item2.price.split(" ").join(""));
          if (itm1 > itm2) return 1;
          else if (itm1 < itm2) return -1;
          else return 0;
        });
      }

      if (newValue == "price-highest") {
        this.filterPrice.sort((item1, item2) => {
          const itm1 = Number(item1.price.split(" ").join(""));
          const itm2 = Number(item2.price.split(" ").join(""));
          if (itm1 < itm2) return 1;
          else if (itm1 > itm2) return -1;
          else return 0;
        });
      }

      if (newValue == "name-a") {
        this.filterPrice.sort((item1, item2) => {
          if (item1.name > item2.name) return 1;
          else if (item1.name < item2.name) return -1;
          else return 0;
        });
      }

      if (newValue == "name-z") {
        this.filterPrice.sort((item1, item2) => {
          if (item1.name < item2.name) return 1;
          else if (item1.name > item2.name) return -1;
          else return 0;
        });
      }
    },
  },

  components: { TheHeroPage, TheFeilters, TheSort, AppProduct, AppProductList },
};
</script>

<style src="../style/products-page.scss" lang="scss" scoped></style>
