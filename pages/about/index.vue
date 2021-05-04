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
      <div v-if="visualize == link1" class="info-container">
        <h4>A Global Technology Business</h4>
        Founded in Italy in 2000, today ELM is a multinational group that
        focuses its consulting offering on hard technology challenges with
        large-scale business impact in performance engineering, analytics,
        security, IoT and Machine Learning.
        <h4>Our DNA is rooted in data and engineering.</h4>
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
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/reviews`)
    const reviews = data
    return {
      reviews,
    }
  },
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
}
.about-container {
  display: flex;
  margin-top: 50px;
}
.review-container {
  border: 1px solid goldenrod;
}
.review-author {
  padding: 5px;
  font-size: large;
}
.review-role {
  padding: 5px;
}
.review-content {
  padding: 5px;
}
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-bottom: 30px;
}
img {
  max-width: 1300px;
}
p {
  text-align: left;
}
</style>
