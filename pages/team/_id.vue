<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"></the-bread-crumbs>
    <header>
      <h1>OUR {{ developingOrWorking.toUpperCase() }}</h1>
    </header>
    <section>
      <!-- Cards of employees -->
      <div class="cards-container">
        <the-card
          v-for="item of team"
          :key="'employee-' + item.id"
          :title="item.name + ' ' + item.surname"
          :image="'/employees/employee-' + item.id + '.jpg'"
          :subtitle="item.role"
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
  // Get the employees who work for a specific area (Working Team) or the employees who devolop a specific product (Developing Team) from the DB. Also, generate the correct breadcrumbs.
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const params = id.split('-')
    let team
    let developingOrWorking
    if (params[0] === 'area') {
      const { data } = await $axios.get(
        `${process.env.BASE_URL}/api/areas/${params[1]}/WorkingTeam`
      )
      team = data
      developingOrWorking = 'Working Team'
    } else {
      const { data } = await $axios.get(
        `${process.env.BASE_URL}/api/products/${params[1]}/DevelopingTeam`
      )
      team = data
      developingOrWorking = 'Developing Team'
    }
    // TODO check out design correctness

    let crumbs
    if (params[0] === 'area') {
      let areaName
      switch (params[1]) {
        case '1':
          areaName = 'Performance Engineering'
          break
        case '2':
          areaName = 'Analytics'
          break
        case '3':
          areaName = 'Security'
          break
        case '4':
          areaName = 'Internet of Things'
          break
        case '5':
          areaName = 'Machine Learning & AI'
          break
      }
      crumbs = [
        {
          title: areaName,
          path: `/areas/${params[1]}`,
        },
        {
          title: 'Working Team',
          path: '#',
        },
      ]
    } else {
      crumbs = [
        {
          title: 'Products',
          path: '/products',
        },
        {
          title: team[0].product_name,
          path: `/products/${params[1]}`,
        },
        {
          title: 'Developing Team',
          path: '#',
        },
      ]
    }

    return {
      team,
      developingOrWorking,
      crumbs,
    }
  },
  head: {
    title: 'ELM-Teams',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `This one of the ELM Corporation team`,
      },
    ],
  },
}
</script>

<style scoped>
.cards-container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0px auto 30px auto;
}
</style>
