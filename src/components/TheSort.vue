<template>
  <section class="sort-block">
    <div class="btn-container">
      <button
        :class="{ null: listItem, active: !listItem }"
        @click="$emit('table-item')"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        :class="{ null: !listItem, active: listItem }"
        @click="$emit('list-item')"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <p>{{ numberOfGoods }}</p>
    <hr />
    <div>
      <!-- <label for="sort">Сортировка</label> -->
      <select
        name="sort"
        id="sort"
        class="sort-input"
        :value="modalValue"
        @change="changeOptions"
      >
        <option disabled value="">Сортировка</option>
        <option
          v-for="option in sortOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    listItem: {
      type: Boolean,
      required: true,
    },

    sortOptions: {
      type: Array,
      required: true,
      default: () => [],
    },

    modalValue: {
      type: String,
      required: true,
    },

    filterPrice: {
      type: Array,
      required: true,
    },
  },

  emits: {
    "table-item": null,
    "list-item": null,
    "update:modalValue": null,
  },

  methods: {
    changeOptions(event) {
      sessionStorage.setItem("sortValue", event.target.value);
      this.$emit("update:modalValue", event.target.value);
    },
  },

  computed: {
    numberOfGoods() {
      const number = this.filterPrice.length;

      if (number == 1) return `${number} Tовар найден`;
      else if (number > 1 && number <= 4) return `${number} Tовара найдено`;
      else if (number >= 5) return `${number} Tоваров найдено`;
      else return "0 товаров найдено";
    },
  },
};
</script>

<style src="../style/sort.scss" lang="scss" scoped></style>
