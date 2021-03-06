<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>ABOUT US</h1>
      <h2>What about the ELM Corporation?</h2>
      <img src="/about/headquarter.jpg" alt="Headquarter Image" />
    </header>
    <section class="about-container">
      <the-side-bar
        :link1="link1"
        :link2="link2"
        @visualization="onUpdateVisualization"
      >
      </the-side-bar>
      <!-- Use of v-if and v-else to show the reviews or the general info about the company -->
      <div v-if="visualize == link1" class="info-container">
        <span class="h4">A Global Technology Business</span>
        Founded in Italy in 2000, today ELM is a multinational group that
        focuses its consulting offering on hard technology challenges with
        large-scale business impact in performance engineering, analytics,
        security, IoT and Machine Learning.
        <span class="h4">Our DNA is rooted in data and engineering.</span>
        ELM started as a research spinoff at Politecnico of Milan and was
        incubated at its startup accelerator. Data and experimentation are part
        of our DNA. We believe that science and engineering need to be seen as
        one. It is for this reason that we continuously focus on research,
        emerging ideas, and new technologies, routinely partnering with top
        academic and engineering research institutions. Our R&D orientation,
        combined with data-driven industry and business knowledge, allows us to
        identify innovation opportunities and create first-to-market solutions,
        creating unique competitive advantages for our customers.
      </div>
      <div v-else class="reviews-container">
        <div
          v-for="(item, itemIndex) of reviews"
          :key="'review-' + itemIndex"
          class="review-container"
        >
          <div class="review-author">{{ item.author }}</div>
          <div class="review-role">{{ item.role }}</div>
          <div class="review-content">{{ item.content }}</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TheSideBar from '~/components/TheSideBar.vue'
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'

export default {
  components: {
    TheSideBar,
    TheBreadCrumbs,
  },
  // Get reviews from the DB.
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/reviews`)
    const reviews = data
    return {
      reviews,
    }
  },
  // Create the varibales used to show the breadcrumbs and navigate with the sidebar.
  data() {
    return {
      link1: 'Info',
      link2: 'Reviews',
      visualize: 'Info',
      crumbs: [
        {
          title: 'About Us',
          path: '/about',
        },
        {
          title: 'Info',
          path: '/about',
        },
      ],
    }
  },
  head: {
    title: `ELM-About`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `ELM is a multinational group that
        focuses its consulting offering on hard technology challenges with
        large-scale business impact in performance engineering, analytics,
        security, IoT and Machine Learning.`,
      },
    ],
  },
  // Method to manage the use of the sidebar and update with consistency the breadcrumbs.
  methods: {
    onUpdateVisualization(path) {
      this.visualize = path
      this.crumbs.pop()
      this.crumbs.push({
        title: path,
        path: '/about',
      })
    },
  },
}
</script>

<style scoped>
.info-container {
  font-size: larger;
  font-weight: normal;
}
.about-container {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 50px;
}
@media screen and (max-width: 768px) {
  .about-container {
    flex-wrap: wrap;
  }
}
.review-container {
  border: 2px solid goldenrod;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
  margin: 0px 0px 45px 0px;
  padding: 10px 0px 10px 0px;
}
.review-author {
  padding: 5px;
  font-size: 170%;
  color: #023f72;
  margin-top: 10px;
}
.review-role {
  font-size: 120%;
  font-style: italic;
  padding: 5px;
  margin-bottom: 10px;
}
.review-content {
  padding: 5px;
  font-size: 120%;
  margin-bottom: 10px;
  font-weight: normal;
}
h2 {
  margin-bottom: 30px;
}
.h4 {
  margin: 1rem auto;
  font-weight: bold;
  display: block;
}
img {
  width: 1300px;
  max-width: 100%;
}
p {
  text-align: left;
}
</style>
