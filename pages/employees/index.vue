<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>OUR TEAM</h1>
    </header>
    <h2>Our Leadership</h2>
    <!-- Section for the cards of the employess who are in the Leadership of the company -->
    <section>
      <div class="cards-container">
        <the-card
          v-for="item of areas"
          :key="'reponsible-' + item.IsResponsible.id"
          :title="item.IsResponsible.name + ' ' + item.IsResponsible.surname"
          :subtitle="item.name"
          :image="'/employees/employee-' + item.IsResponsible.id + '.jpg'"
          :link="'/employees/' + item.IsResponsible.id"
        >
        </the-card>
      </div>
    </section>
    <h2>Our Team</h2>
    <!-- Section for the cards representing all the employees of the company -->
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
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'

export default {
  components: {
    TheCard,
    TheBreadCrumbs,
  },
  // Get all the rsponsible of the 5 areas and then all the employees in general from the DB. Assigne also the values for the breadcrumbs.
  async asyncData({ $axios }) {
    const areas = []
    for (let aId = 1; aId <= 5; aId++) {
      const { data } = await $axios.get(
        `${process.env.BASE_URL}/api/areas/${aId}`
      )
      areas.push(data)
    }
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/employees`)
    const standardEmployees = data
    const crumbs = [
      {
        title: 'Our Team',
        path: '/employees',
      },
    ]

    return {
      areas,
      standardEmployees,
      crumbs,
    }
  },
  head: {
    title: `ELM-Employees`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `These are all Employees of ELM Corporation`,
      },
    ],
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
