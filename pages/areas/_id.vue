<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ area.name }}</h1>
    </header>
    <section class="introduction-container">{{ area.description }}</section>
    <section class="top-product-container">
      <h2>Our Top Product in this area is : {{ topProduct.name }}</h2>
      <div>{{ topProduct.description }}</div>
    </section>
    <section class="all-products-list">
      <h3>Products offered in this field</h3>
      <the-card
        v-for="item of products"
        :key="'product-' + item.id"
        :title="item.name"
        :image="'/products/product-' + item.id + '.png'"
        :description="item.description"
        :link="'/products/' + item.id"
      >
      </the-card>
    </section>
    <section class="workers-container">
      <div class="responsible">
        <h3>Responsible</h3>
        {{ area.IsResponsible.name }} {{ area.IsResponsible.surname }}
      </div>
      <div class="working-team">
        <nuxt-link :to="'/workingTeam/' + area.id"> </nuxt-link>
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
.introductio-container,
.top-product-container,
.all-products-list,
.workers-container {
  padding: 5% 5% 5% 5%;
}
</style>
