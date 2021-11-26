<template>
  <section>
    <div class="content">
      <div>
        <div class="form-control">
          <input
            type="text"
            name="text"
            placeholder="Найти"
            autocomplete="off"
            class="search-input"
            :value="filterValue"
            @input="filterValueChange"
          />
        </div>
        <div class="form-control form-control-category">
          <h5>Категории</h5>
          <div class="filter-category" @click="categoryValue">
            <span
              name="category"
              :class="{
                active: selectedCategory == 'Все',
                null: selectedCategory != 'Все',
              }"
              >Все</span
            >
            <span
              v-for="item in goodsCategory"
              :key="item"
              name="category"
              :class="{
                active: selectedCategory == item,
                null: selectedCategory != item,
              }"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="form-control">
          <h5>Производители</h5>
          <select
            name="company"
            class="company"
            @change="brandValueChange"
            :value="brandValue"
          >
            <option value="all">Все</option>
            <option :value="item" v-for="item in goodsBrands" :key="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="form-control">
          <h5>Цвета</h5>
          <div class="colors" @click="colorsValue">
            <div
              name="color"
              data-color="all"
              class="all-btn mark-class"
              :class="{ 'all-btn-active': selectedColors.includes('all') }"
            >
              Все
            </div>
            <div
              v-for="item in goodsColors"
              :key="item"
              name="color"
              class="color-btn mark-class"
              :class="{ 'color-btn-active': selectedColors.includes(item) }"
              :data-color="item"
              :style="{ background: item }"
            >
              <svg
                v-if="checkItem(item)"
                :class="{
                  'check-mark-white':
                    selectedColors.includes(item) && lightColors.includes(item),
                }"
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
            </div>
          </div>
        </div>
        <div class="form-control">
          <h5>Цена</h5>
          <p class="price">{{ Number(rangeValue).toLocaleString() }} ₽</p>
          <input
            type="range"
            name="price"
            min="0"
            :max="highestPrice - 1"
            :value="rangeValue"
            @change="rangeValueChange"
          />
        </div>
      </div>
      <button @click="$emit('clear-filters')" type="button" class="clear-btn">
        Очистить фильтры
      </button>
    </div>
  </section>
</template>

<script>
export default {
  emits: {
    "update:filterValue": null,
    "update:brandValue": null,
    "update:rangeValue": null,
    "category-value": null,
    "colors-value": null,
    "clear-filters": null,
  },

  props: {
    goods: {
      type: Array,
      required: true,
    },

    filterValue: {
      type: String,
      required: true,
    },

    brandValue: {
      type: String,
      required: true,
    },

    selectedColors: {
      type: Array,
    },

    selectedCategory: {
      type: String,
    },

    highestPrice: {
      type: Number,
      required: true,
    },

    rangeValue: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      colors: [],
    };
  },

  methods: {
    brandValueChange(event) {
      sessionStorage.setItem("brandValue", event.target.value);
      this.$emit("update:brandValue", event.target.value);
    },

    filterValueChange(event) {
      sessionStorage.setItem("filterValue", event.target.value);
      this.$emit("update:filterValue", event.target.value);
    },

    rangeValueChange(event) {
      sessionStorage.setItem("rangeValue", event.target.value);
      this.$emit("update:rangeValue", event.target.value);
    },

    categoryValue(event) {
      this.$emit("category-value", event.target.textContent);
    },

    colorsValue(event) {
      if (event.target.closest(".mark-class"))
        this.$emit(
          "colors-value",
          event.target.closest(".mark-class").dataset.color
        );
    },

    checkItem(item) {
      if (this.selectedColors.includes(item)) return true;
    },
  },

  computed: {
    goodsColors() {
      this.goods.map((el) => el.colors).map((el) => this.colors.push(...el));
      return [...new Set(this.colors)];
    },

    goodsBrands() {
      return [...new Set(this.goods.map((el) => el.brand))];
    },

    goodsCategory() {
      return [...new Set(this.goods.map((el) => el.type))];
    },

    lightColors() {
      return ["#000", "#3d4e5c", "#586a78", "#62625e", "#474649"];
    },
  },
};
</script>

<style src="../style/filters.scss" lang="scss" scoped></style>
