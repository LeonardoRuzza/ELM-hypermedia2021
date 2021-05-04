<template>
  <main class="container">
    <header>
      <h1>ABOUT US</h1>
      <h2>What about the ELM Corporation?</h2>
      <img
        src="https://pbs.twimg.com/profile_images/1090208956440633345/Okg4uYbh_400x400.jpg"
        alt="Nuxt Logo"
      />
    </header>
    <section class="about-container">
      <the-side-bar
        :link1="link1"
        :link2="link2"
        @visualization="onUpdateVisualization"
      >
      </the-side-bar>
      <div v-if="visualize == link1" class="info-container">
        About - Information
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
export default {
  components: {
    TheSideBar,
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
    }
  },
  methods: {
    onUpdateVisualization(path) {
      this.visualize = path
    },
  },
}
</script>

<style scoped>
.about-container {
  display: flex;
  margin-top: 20px;
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
  max-width: 600px;
}
p {
  text-align: left;
}
</style>
