<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ area.name }}</h1>
    </header>
    <!-- Section for general info related to the area including: description, image -->
    <section class="introduction-container">
      <div class="intro-description">
        <img
          :src="'/areas/images/area-' + area.id + '.png'"
          :alt="'Image of the area' + area.name"
        />
        {{ area.description }}
      </div>
    </section>
    <!-- Section for the top product of the area -->
    <section class="top-product-container">
      <h2 class="h2-title">
        Our Top Product in this area is: {{ topProduct.name }}
      </h2>
      <div class="top-product-info">
        <nuxt-link :to="'/products/' + topProduct.id" class="not-link-style">
          <img
            :src="'/products/' + topProduct.id + '/thumbnail.png'"
            alt="Image of the top product of the area"
          />
          <div class="top-product-desc">{{ topProduct.description }}</div>
        </nuxt-link>
      </div>
    </section>
    <!-- Section for the list of all the products' cards of the area (excluding the top one) -->
    <section class="all-products-list">
      <h2>Our products in the {{ area.name }} area</h2>
      <!-- :description="item.description" -->
      <div id="area-card-container" class="cards-container">
        <the-card
          v-for="item of products"
          :key="'product-' + item.id"
          :title="item.name"
          :image="'/products/' + item.id + '/thumbnail.png'"
          :link="'/products/' + item.id"
        >
        </the-card>
      </div>
    </section>
    <!-- Section for the employees of the area (responsible + working team link) -->
    <section class="workers-container">
      <div class="responsible-container">
        <h3>Responsible of the {{ area.name }} area</h3>
        <nuxt-link :to="'/employees/' + responsible.id" class="not-link-style">
          <div class="responsible-info">
            <img
              :src="'/employees/employee-' + responsible.id + '.jpg'"
              alt="Image of the Responsible of the area"
            />
            {{ responsible.name }} <br />
            {{ responsible.surname }} <br />
            <br />
            {{ responsible.role }}
          </div>
        </nuxt-link>
      </div>
      <div class="working-team">
        <p>All our team's members are important for us</p>
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
  // Get the info about the area from the DB (area, responsible of the area, topProduct of the area, products of the area) and generate the correct variables for the breadcrumbs.
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
<style>
#area-card-container .card {
  height: 300px;
}
#area-card-container .card-img {
  max-height: 70%;
}
</style>
<style scoped>
.container {
  font-weight: normal;
}
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
  line-height: 180%;
  font-size: 1.5rem;
  word-spacing: 5px;
  font-style: italic;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.introduction-container img {
  max-width: 50%;
  float: right;
}
.top-product-container a {
  margin: auto;
}
.top-product-container img {
  width: 40%;
}
.top-product-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-product-desc {
  max-width: 1000px;
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
  font-size: 1.2rem;
  font-weight: bold;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px auto 20px auto;
  max-width: 1000px;
}
h3 {
  border: 1px solid orange;
  background-color: #26272b;
  color: white;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
  font-weight: bolder;
  margin: 15px auto 15px auto;
  padding: 0px 20px 0px 20px;
  font-size: 165%;
}
.responsible-info div {
  display: block;
}
a.not-link-style,
a:visited.not-link-style,
a:hover.not-link-style {
  color: inherit;
  text-decoration: none;
}
.working-team {
  width: 50%;
}
.working-team p {
  font-size: 1.6rem;
  font-weight: lighter;
  text-align: center;
  line-height: 1.7rem;
  color: rgb(100, 100, 100);
  margin-bottom: 30px;
}
@media screen and (max-width: 768px) {
  .workers-container {
    flex-direction: column;
  }
  .responsible-info {
    flex-direction: column;
  }
  .responsible-info img {
    width: 80%;
  }
  .working-team {
    margin: 1rem;
    width: 100%;
  }
  .top-product-info img {
    max-width: 300px;
    width: 90%;
  }
  .intro-description {
    clear: right;
  }
  .introduction-container img {
    width: 90%;
    max-width: 90%;
    margin: auto;
    float: none;
    display: block;
  }
}
</style>
