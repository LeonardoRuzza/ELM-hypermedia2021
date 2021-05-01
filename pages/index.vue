<template>
  <main class="container">
    <header>
      <h1>Transforming business</h1>
      <h4>
        ELM is a multinational consulting and software group of companies,
        helping customers harness the power of transformative technologies.
      </h4>
    </header>
    <section class="areas-grid">
      <p class="areas-intro">
        The following are the main areas of work of the ELM Corporation. We are
        focus on the innovation in the ICT field for companies which want to be
        always on top.
      </p>
      <span
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        class="area"
        @click="goToArea(`/areas/${area.id}`)"
      >
        {{ area.name }}

        <img
          alt="Icon of  and area"
          :src="'/areas/icons/icon-' + area.id + '.png'"
        />
      </span>
    </section>
  </main>
</template>

<script>
// import axios from 'axios'
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = data
    return {
      areas,
    }
  },
  methods: {
    goToArea(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
.areas-intro {
  text-align: center;
  margin-bottom: 30px;
}
.areas-grid {
  border-color: lightgreen;
}
.area {
  display: inline;
  height: 50px;
  margin-inline: 30px;
}
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-top: 20px;
  margin-bottom: 70px;
}
img {
  max-width: 190px;
}
p {
  text-align: left;
}
</style>
