<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <h1>Products</h1>
    <!-- Section of Top Product cards (one for each areas)-->
    <section>
      <h2>Top Products</h2>
      <p>
        These are our most famous products, one for each of the areas in which
        we develop and offer products and services in the ICT industry.
      </p>
      <!--:description="item.description"-->
      <div id="top_products" class="cards-container">
        <the-card
          v-for="item of topProducts"
          :key="'product-' + item.id"
          :title="item.name"
          :image="'/products/' + item.id + '/thumbnail.png'"
          :subtitle="getArea(item.area_of_belonging_id)"
          :link="'/products/' + item.id"
        >
        </the-card>
      </div>
    </section>
    <!-- Section of all the other products (not Top) cards -->
    <section>
      <h2>All Other Products</h2>
      <p>
        Here you can find all the other products that the ELM Corporation offer.
        All of them are top quality products in the ICT field and were developed
        with a great experience and all the required knowledge. You will for
        sure find the best solution to fit your company needs.
      </p>
      <div class="cards-container">
        <the-card
          v-for="item of standardProducts"
          :key="'product-' + item.id"
          :title="item.name"
          :image="'/products/' + item.id + '/thumbnail.png'"
          :subtitle="getArea(item.area_of_belonging_id)"
          :link="'/products/' + item.id"
        >
        </the-card>
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
  // Get all the products data from the DB (dividing between topProducts of areas and not).
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/products`)
    const topProducts = []
    const standardProducts = []
    for (const p of data) {
      if (p.isTop) {
        topProducts.push(p) // if top insert in this array
      } else {
        standardProducts.push(p)
      }
    }
    return {
      topProducts,
      standardProducts,
    }
  },
  // Define the values for the breadcrumbs.
  data() {
    return {
      crumbs: [
        {
          title: 'Products',
          path: '/products',
        },
      ],
    }
  },
  head: {
    title: 'ELM-Products',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `This are all our products in the various IT-fields`,
      },
    ],
  },
  // Method to associate id of an area to the name of this latter.
  methods: {
    getArea(id) {
      switch (id) {
        case 1:
          return 'Performance Engineering'
        case 2:
          return 'Analytics'
        case 3:
          return 'Security'
        case 4:
          return 'Internet of Things'
        case 5:
          return 'Machine Learning'
      }
    },
  },
}
</script>
<!--
<style>
#products_top_products .card-img,
#products_standard_products .card-img {
  background-color: white;
}
</style>
-->
<style scoped>
p {
  font-weight: 550;
  max-width: 1000px;
  margin: 30px auto 30px auto;
  font-size: 1.5rem;
}
.cards-container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0px auto 30px auto;
}
</style>
