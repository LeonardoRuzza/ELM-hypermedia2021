<template>
  <main class="container">
    <header>
      <h1>OUR TEAM</h1>
    </header>
    <h2>Our Leadership</h2>
    <section>
      <div class="cards-container">
        <the-card
          v-for="item of areas"
          :key="'reponsible-' + item.IsResponsible.id"
          :title="item.IsResponsible.name + ' ' + item.IsResponsible.surname"
          :subtitle="item.name"
          :image="'/employees/employee-' + item.id + '.jpg'"
          :link="'/employees/' + item.id"
        >
        </the-card>
      </div>
    </section>
    <h2>Our Team</h2>
    <section>
      <div class="cards-container">
        <the-card
          v-for="item of standardEmployees"
          :key="'employees-' + item.id"
          :title="item.name + ' ' + item.surname"
          :image="'/employees/employee-' + item.id + '.jpg'"
          :link="'/employees/' + item.id"
        >
        </the-card>
      </div>
    </section>
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
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/employees`)
    const standardEmployees = data

    return {
      areas,
      standardEmployees,
    }
  },
}
</script>

<style scoped>
.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 100%;
}
</style>
