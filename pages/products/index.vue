<template>
  <main>
    <!-- aggiungere la class container ma attenzione che varia posizioni -->
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <h1>Products</h1>
    <h3>Top Products</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque
      bibendum luctus. Praesent elementum posuere cursus. Suspendisse iaculis et
      ligula ornare ultricies. Integer sit amet justo vestibulum, pellentesque
      tortor eu, aliquam eros. Nam interdum ipsum ac neque venenatis, a placerat
      tellus consectetur. Etiam suscipit mauris non arcu consequat porta. Proin
      ac augue vel felis auctor posuere sed non risus. Orci varius natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed
      malesuada eros a ante ultricies rhoncus. Phasellus vel egestas elit.
      Aliquam lacus eros, commodo ut congue et, dictum cursus orci. Vestibulum
      at lacus vel velit finibus faucibus et in velit.
    </p>
    <div class="cards-container">
      <the-card
        v-for="item of topProducts"
        :key="'product-' + item.id"
        :title="item.name"
        :image="'/products/product-' + item.id + '.png'"
        :subtitle="getArea(item.area_of_belonging_id)"
        :description="item.description"
        :link="'/products/' + item.id"
      >
      </the-card>
    </div>
    <h3>Products</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque
      bibendum luctus. Praesent elementum posuere cursus. Suspendisse iaculis et
      ligula ornare ultricies. Integer sit amet justo vestibulum, pellentesque
      tortor eu, aliquam eros. Nam interdum ipsum ac neque venenatis, a placerat
      tellus consectetur. Etiam suscipit mauris non arcu consequat porta. Proin
      ac augue vel felis auctor posuere sed non risus. Orci varius natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed
      malesuada eros a ante ultricies rhoncus. Phasellus vel egestas elit.
      Aliquam lacus eros, commodo ut congue et, dictum cursus orci. Vestibulum
      at lacus vel velit finibus faucibus et in velit.
    </p>
    <div class="cards-container">
      <the-card
        v-for="item of standardProducts"
        :key="'product-' + item.id"
        :title="item.name"
        :image="'/products/product-' + item.id + '.png'"
        :subtitle="getArea(item.area_of_belonging_id)"
        :description="item.description"
        :link="'/products/' + item.id"
      >
      </the-card>
    </div>
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
<style scoped>
p {
  font-weight: normal;
  max-width: 1000px;
  margin: 30px auto 30px auto;
}
h3 {
  border: 1px solid grey;
  background-color: #26272b;
  color: white;
  box-shadow: 2px 2px 6px #888;
  font-weight: bolder;
  font-size: 20px;
  margin: 20px auto 20px auto;
  padding: 0px 20px 0px 20px;
}
.cards-container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0px auto 30px auto;
}
</style>
