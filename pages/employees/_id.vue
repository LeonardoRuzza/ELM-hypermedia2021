<template>
  <main class="container">
    <header>
      <h1>{{ employee.name }} {{ employee.surname }}</h1>
    </header>
    <section>
      <div class="row">
        <div class="column">
          <img
            alt="Employee image"
            :src="'/employees/employee-' + employee.id + '.png'"
          />
        </div>
        <div class="column">
          <div class="card-container">
            <the-card
              :key="'area-' + employee.WorkIn.id"
              :title="employee.WorkIn.name"
              :image="'/areas/icons/icon-' + employee.WorkIn.id + '.png'"
              :link="'/api/employees/' + item.id"
            >
            </the-card>
          </div>
        </div>
        <p>{{ employee.role }}</p>
      </div>
    </section>
    <h2>Managed Products</h2>
    <div class="cards-container">
      <the-card
        v-for="item of managedProducts"
        :key="'products-' + item.id"
        :title="item.name"
        :subtitle="item.description"
        :image="'/products/product-' + item.id + '.png'"
        :link="'/api/products/' + item.id"
      >
      </the-card>
    </div>
    <h2>Developed Products</h2>
    <div class="cards-container">
      <the-card
        v-for="item of developedProducts"
        :key="'products-' + item.id"
        :title="item.name"
        :subtitle="item.description"
        :image="'/products/product-' + item.id + '.png'"
        :link="'/api/products/' + item.id"
      >
      </the-card>
    </div>
  </main>
</template>

<script>
import TheCard from '~/components/TheCard.vue'
export default {
  components: {
    TheCard,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    return Promise.all([
      await $axios.$get(`${process.env.BASE_URL}/api/employees/${id}`),
      await $axios.$get(
        `${process.env.BASE_URL}/api/employees/${id}/DevelopedProducts`
      ),
      await $axios.$get(
        `${process.env.BASE_URL}/api/employees/${id}/ManagedProducts`
      ),
    ]).then((res) => {
      const employee = res[0]
      const developedProducts = res[1]
      const managedProducts = res[2]
      return {
        employee,
        developedProducts,
        managedProducts,
      }
    })
  },
}
</script>

<style scoped>
.column {
  float: left;
  width: 50%;
  margin-top: 6px;
  padding: 20px;
}
.row:after {
  content: '';
  display: table;
  clear: both;
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
