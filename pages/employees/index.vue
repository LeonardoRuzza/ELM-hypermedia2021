<template>
  <main class="container">
    <header>
      <h1>OUR TEAM</h1>
    </header>
    <div>
      <section>
        <h2>Our Leadership</h2>
        <div class="cards-container">
          <the-card
            v-for="item of areas"
            :key="'reponsible-' + item.IsResponsible.id"
            :title="item.IsResponsible.name"
            :subtitle="item.name"
            :image="'/employees/employee-' + item.id + '.png'"
            :link="'/api/employees/' + item.id"
          >
          </the-card>
        </div>
      </section>
      <section>
        <h2>Our Team</h2>
        <div class="cards-container">
          <the-card
            v-for="item of standardEmployees"
            :key="'employees-' + item.id"
            :title="item.name"
            :image="'/employees/employee-' + item.id + '.png'"
            :link="'/api/employees/' + item.id"
          >
          </the-card>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import TheCard from '~/components/TheCard.vue'
export default {
  components: {
    TheCard,
  },
  async asyncData({ $axios }) {
    const areas = []
    for (let aId = 1; aId <= 2; aId++) {
      const { data } = await $axios.get(
        `${process.env.BASE_URL}/api/areas/${aId}`
      )
      areas.push(data)
    }
    const { data1 } = await $axios.get(`${process.env.BASE_URL}/api/employees`)
    const standardEmployees = data1

    return {
      areas,
      standardEmployees,
    }
  },
}
</script>
