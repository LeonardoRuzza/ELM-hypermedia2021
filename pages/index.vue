<template>
  <main class="container">
    <header>
      <h1>ELM Corporation</h1>
      <p class="home-intro">
        ELM is a multinational consulting and software group of companies,
        helping customers harness the power of transformative technologies.
      </p>
    </header>
    <!-- Introduction to all the areas with links -->
    <section class="areas-grid">
      <h2>OUR BUSINESS LINES</h2>
      <p class="areas-intro">
        The following are the main areas of work of the ELM Corporation. We are
        focus on the innovation in the ICT field for companies which want to be
        always on top.
      </p>
      <div
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        class="area"
      >
        <nuxt-link
          :class="{ 'area-reverse': areaIndex % 2 == 0 }"
          class="area-flex"
          :to="'/areas/' + area.id"
        >
          <div class="area-text">
            <div class="area-title">{{ area.name }}</div>
            <div class="area-shortDesc">{{ area.shortDesc }}</div>
          </div>
          <div class="area-image">
            <img
              class="icon"
              alt="Icon of an area"
              :src="'/areas/icons/icon-' + area.id + '.png'"
            />
          </div>
        </nuxt-link>
      </div>
    </section>
    <img
      id="globalFootprint"
      alt="Image representing the presence of the ELM Comporation in the world"
      src="/home/world_presence.jpg"
    />
  </main>
</template>

<script>
// import axios from 'axios'
export default {
  // Get all the areas from the DB.
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = data
    return {
      areas,
    }
  },
  head: {
    title: 'ELM-Homepage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The ELM Corporation is one of the best Company in the fields of Performance Engineering, Analytics, Security, IoT, Machine Learning & AI',
      },
    ],
  },
}
</script>

<style scoped>
.home-intro {
  font-weight: bold;
  font-size: 1.5rem;
  margin: 3rem auto 3rem auto;
  font-style: italic;
  max-width: 600px;
}
.area-text {
  width: 80%;
  margin: auto;
  padding: 0px 20% 0px 20%;
}
.area-title {
  font-size: 2rem;
  text-transform: uppercase;
}
.area-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: stretch;
  width: 100%;
  height: 100%;
}
.area-flex.area-reverse {
  flex-direction: row-reverse;
  background-image: linear-gradient(180deg, #f7f8fc 0%, #e9e9f4 100%);
}
.area-image {
  width: 20%;
  height: 100%;
  margin: auto;
  padding: 2rem;
}
.area-image img {
  width: 90%;
  margin: auto;
  max-height: 80%;
}
@media screen and (max-width: 768px) {
  .area-flex {
    flex-direction: column !important;
  }
  .area-text {
    padding: 0px;
  }
}
@media screen and (max-width: 768px) and (min-width: 400px) {
  .area-image {
    width: 30%;
    padding: 0px;
  }
}
@media screen and (max-width: 500px) and (min-width: 400px) {
  .area-image {
    width: 50%;
  }
}
@media screen and (max-width: 400px) {
  .area-image {
    width: 60%;
  }
}
.area-shortDesc {
  margin-top: 2rem;
  font-size: 1.3rem;
  font-weight: normal;
}
.areas-intro {
  font-weight: bold;
  text-align: center;
  max-width: 800px;
  margin: auto auto 30px auto;
  font-size: 1.2rem;
}
.areas-grid {
  border-color: lightgray;
  margin-bottom: 40px;
}
.area {
  width: 100%;
  margin: 20px 0px 20px 0px;
  padding: 0px;
}
#globalFootprint {
  max-height: 100%;
  max-width: 100%;
}
.icon {
  margin: 0% 5% 0% 10%;
  width: 10%;
  float: right;
}
a,
a:visited,
a:hover {
  color: inherit;
  text-decoration: none;
}
.container {
  padding: 0px;
  margin: 0px;
}
header h1 {
  margin-bottom: 0.5rem;
}
h2 {
  margin: auto 2% 2% 2%;
}
</style>
