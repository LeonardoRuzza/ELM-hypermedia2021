<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ visualize }}</h1>
      <h2>Get updated with some News!</h2>
    </header>
    <section id="news-card-container" class="news-container">
      <the-side-bar
        :link1="link1"
        :link2="link2"
        @visualization="onUpdateVisualization"
      >
      </the-side-bar>
      <!-- Show the cards for the "latestNews" or "allNews" exploiting v-if and v-else semantics -->
      <div v-if="visualize == link1" class="cards-container">
        <the-card
          v-for="(item, itemIndex) of latestNews"
          :key="'news-' + itemIndex"
          :image="'/news/image-' + item.id + '.png'"
          :title="item.title"
          :description="item.introduction"
          :link="'/news/' + item.id"
        >
        </the-card>
      </div>
      <div v-else class="cards-container">
        <the-card
          v-for="(item, itemIndex) of allNews"
          :key="'news-' + itemIndex"
          :image="'/news/image-' + item.id + '.png'"
          :title="item.title"
          :description="item.introduction"
          :link="'/news/' + item.id"
        >
        </the-card>
      </div>
    </section>
  </main>
</template>
<script>
import TheSideBar from '~/components/TheSideBar.vue'
import TheCard from '~/components/TheCard.vue'
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'

export default {
  components: {
    TheSideBar,
    TheCard,
    TheBreadCrumbs,
  },
  // Get the latest and all the news from the DB.
  async asyncData({ $axios }) {
    return Promise.all([
      await $axios.$get(`${process.env.BASE_URL}/api/news/latest_news`),
      await $axios.$get(`${process.env.BASE_URL}/api/news/all_news`),
    ]).then((res) => {
      const latestNews = res[0]
      const allNews = res[1]
      return {
        latestNews,
        allNews,
      }
    })
  },
  // Create the variable to manage correctly the use of the sidebar and breadcrumbs.
  data() {
    return {
      link1: 'Latest News',
      link2: 'All News',
      visualize: 'Latest News',
      crumbs: [
        {
          title: 'News',
          path: '/news',
        },
        {
          title: 'Latest News',
          path: '/news',
        },
      ],
    }
  },
  /*   async asyncData({ $axios }) {
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/news/all_news`
    )
    const allNews = data
    return {
      allNews,
    }
  }, */
  // Method to manage correctly the interaction with the sidebar and update with coerence the breadcrumbs.
  methods: {
    onUpdateVisualization(path) {
      this.visualize = path
      this.crumbs.pop()
      this.crumbs.push({
        title: path,
        path: '/news',
      })
    },
  },
}
</script>
<style>
#news-card-container .card-title {
  font-size: 16px;
}
</style>
<style scoped>
.cards-container {
  position: static;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.card {
  width: 300px;
  height: 533px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.news-container {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 20px;
}
@media screen and (max-width: 768px) {
  .news-container {
    flex-wrap: wrap;
  }
}
</style>
