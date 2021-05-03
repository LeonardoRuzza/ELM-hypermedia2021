<template>
  <main class="container">
    <the-side-bar
      :link1="link1"
      :link2="link2"
      @visualization="onUpdateVisualization"
    >
    </the-side-bar>
    <div v-if="visualize == link1" class="cards-container">
      <the-card
        v-for="(item, itemIndex) of latestNews"
        :key="'news-' + itemIndex"
        :image="'/news/image-' + item.id + '.png'"
        :title="item.title"
        :description="item.introduction"
      >
      </the-card>
    </div>
    <div v-else class="cards-container">
      <the-card
        v-for="(item, itemIndex) of allNews"
        :key="'news-' + itemIndex"
        :image="item.img"
        :title="item.title"
        :description="item.introduction"
      >
      </the-card>
    </div>
  </main>
</template>
<script>
import TheSideBar from '~/components/TheSideBar.vue'
import TheCard from '~/components/TheCard.vue'
export default {
  components: {
    TheSideBar,
    TheCard,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/news/latest_news`
    )
    const latestNews = data
    const { data1 } = await $axios.get(
      `${process.env.BASE_URL}/api/news/all_news`
    )
    const allNews = data1
    return {
      latestNews,
      allNews,
    }
  },
  data() {
    return {
      link1: 'Latest News',
      link2: 'All News',
      visualize: 'Latest News',
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
  methods: {
    onUpdateVisualization(path) {
      this.visualize = path
    },
  },
}
</script>
<style scoped>
.cards-container {
  position: static;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}
.container {
  display: flex;
}
</style>
