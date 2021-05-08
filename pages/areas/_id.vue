<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ area.name }}</h1>
    </header>
    <section class="introduction-container">
      {{ area.description }}
    </section>
    <section class="top-product-container">
      <h2 class="h2-title">
        Our Top Product in this area is: {{ topProduct.name }}
      </h2>
      <div class="top-product-info">
        <img
          :src="'/products/' + topProduct.id + '/thumbnail.png'"
          alt="Image of the top product of the are"
        />
        <div class="top-product-desc">{{ topProduct.description }}</div>
      </div>
    </section>
    <section class="all-products-list">
      <h2 class="h2-title">Our products in the field</h2>
      <the-card
        v-for="item of products"
        :key="'product-' + item.id"
        :title="item.name"
        :image="'/products/' + item.id + '/thumbnail.png'"
        :description="item.description"
        :link="'/products/' + item.id"
      >
      </the-card>
    </section>
    <section class="workers-container">
      <div class="responsible-container">
        <h3>Responsible</h3>
        <div class="responsible-info">
          <img
            :src="'/employees/employee-' + responsible.id + '.png'"
            alt="Image of the Responsible of the area"
          />
          {{ responsible.name }} <br />
          {{ responsible.surname }} <br />
          <br />
          {{ responsible.role }}
        </div>
      </div>
      <div class="working-team">
        <nuxt-link class="button" :to="'/team/area-' + area.id">
          Working Team
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
import TheCard from '~/components/TheCard.vue'
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'
export default {
  components: {
    TheCard,
    TheBreadCrumbs,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    return Promise.all([
      await $axios.$get(`${process.env.BASE_URL}/api/areas/${id}`),
      await $axios.$get(`${process.env.BASE_URL}/api/areas/${id}/TopProduct`),
      await $axios.$get(`${process.env.BASE_URL}/api/areas/${id}/AllProducts`),
    ]).then((res) => {
      const area = res[0]
      const responsible = area.IsResponsible
      const topProduct = res[1]
      const products = res[2]
      const crumbs = [
        {
          title: area.name,
          path: '/areas/' + area.id,
        },
      ]
      return {
        area,
        responsible,
        topProduct,
        products,
        crumbs,
      }
    })
  },
}
</script>
<style scoped>
.all-products-list {
  margin: auto;
  width: 100%;
}
.introduction-container,
.top-product-container,
.all-products-list,
.workers-container {
  padding: 3% 3% 3% 3%;
}
.workers-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.introduction-container {
  line-height: 190%;
  font-size: 150%;
  word-spacing: 5px;
  font-style: italic;
}
.h2-title {
  font-size: 200%;
  margin-top: 15px;
  margin-bottom: 15px;
}
.top-product-container img {
  width: 30%;
}
.top-product-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-product-desc {
  font-size: 120%;
  line-height: 140%;
  word-spacing: 4px;
  padding: 1% 0%;
}
.responsible-info img {
  width: 30%;
}
.responsible-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
h3 {
  border: 1px solid orange;
  background-color: #26272b;
  color: white;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
  font-weight: bolder;
  font-size: 20px;
  margin: 15px auto 15px auto;
  padding: 0px 20px 0px 20px;
  font-size: 140%;
}
.responsible-info div {
  display: block;
}
</style>
