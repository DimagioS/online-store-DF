<template>
  <div>
    <main>
      <TheHeroPage section-title="&nbsp;О нас" />
      <section class="about-us wrapper">
        <img src="../img/background/bcg-header-1.jpeg" alt="nice desk" />
        <article>
          <div class="title">
            <h2>Наша компания</h2>
            <div class="underline"></div>
          </div>
          <p>
            Наши гипермаркеты имеют уникальный для российского рынка формат -
            "Все в одном месте". Мы предлагаем комплексные интерьерные решения
            на основе широкого мультибрендового ассортимента.
          </p>
          <p>
            На сегодняшний день сеть гипермаркетов мебели и товаров для дома
            Dimagio Florenzi насчитывает 50 магазинов по России (Москва,
            Санкт-Петербург, Тула, Подольск, Пушкино, Реутов, Мытищи, Нижний
            Новгород, Самара, Воронеж, Липецк, Белгород, Ростов-на-Дону,
            Волгоград, Краснодар, Сочи, Адлер). Из них 37 гипермаркетов, 3
            магазина формата Mini, 9 магазинов формата Home и 1 магазин формата
            Smart. Общая площадь гипермаркетов сети более 315 000 м². В компании
            работают более 5200 сотрудников, гипермаркеты Dimagio Florenzi
            ежегодно посещают более 16 миллионов человек, а посещаемость сайта
            составляет более 66 миллионов посетителей в год.
          </p>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import TheHeroPage from "../components/TheHeroPage.vue";

export default {
  components: { TheHeroPage },
};
</script>

<style src="../style/about-us.scss" lang="scss" scoped></style>
