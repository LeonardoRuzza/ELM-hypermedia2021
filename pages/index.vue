<template>
  <main class="container">
    <header>
      <h1>TRANSFORMING BUSINESS</h1>
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
      <div
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        class="area"
        @click="goToArea(`/areas/${area.id}`)"
      >
        <div class="area-text">
          <div class="area-title">{{ area.name }}</div>
          <div class="area-shortDesc">{{ area.shortDesc }}</div>
        </div>
        <img
          class="icon"
          alt="Icon of  an area"
          :src="'/areas/icons/icon-' + area.id + '.png'"
        />
      </div>
    </section>
    <img
      id="globalFootprint"
      alt="Presence of the ELM in the world"
      src="/world_presence.jpg"
    />
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
.area-text {
  display: inline-block;
}
.area-title {
  font-size: 180%;
  font-weight: bold;
  margin: 0.5%;
}
.area-shortDesc {
  font-size: 150%;
  display: inline-block;
  margin: 5%;
}
.areas-intro {
  text-align: center;
  margin-bottom: 30px;
  font-size: 110%;
}
.areas-grid {
  border-color: lightgreen;
  margin-bottom: 40px;
}
.area {
  padding: 1%;
  border-radius: 25px;
  margin: 5% 5% 5% 5%;
  display: block;
  text-align: left;
  overflow: auto;
  background-color: lightgreen;
}
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-top: 20px;
  margin-bottom: 70px;
}
#globalFootprint {
  max-height: 100%;
  max-width: 100%;
  border-radius: 10px;
}
.icon {
  margin: 0% 5% 0% 10%;
  width: 10%;
  float: right;
}
</style>
