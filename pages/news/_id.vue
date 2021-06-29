<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>News</h1>
      <h2>{{ news.title }}</h2>
    </header>
    <section class="single-news">
      <h2>{{ news.introduction }}</h2>
      <article>
        <p class="news-text">
          {{ news.content }}
        </p>
        <img alt="News Image" :src="'/news/image-' + news.id + '.png'" />
      </article>
    </section>
  </main>
</template>

<script>
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'

export default {
  components: {
    TheBreadCrumbs,
  },
  // Get all the info about a specific news from the DB. Also, create the correct breadcrumbs.
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/news/${id}`)
    const news = data
    const crumbs = [
      {
        title: 'News',
        path: '/news',
      },
      {
        title: news.title,
        path: '/news/' + news.id,
      },
    ]
    return {
      news,
      crumbs,
    }
  },
}
</script>

<style scoped>
article {
  display: flex;
}
.news-text {
  display: inline-block;
  font-size: 150%;
  font-weight: 100;
}
.news-intro {
  display: inline-block;
  text-align: center;
  margin-bottom: 30px;
  font-size: 110%;
}
.single-news {
  padding: 1%;
  border-radius: 25px;
  margin: 0.5% 2% 2% 2%;
  display: block;
  text-align: left;
  overflow: auto;
  background-color: lightgray;
}
h2 {
  margin-top: 20px;
  margin-bottom: 70px;
  text-align: center;
}
img {
  margin: 0% 4% 1% 4%;
  width: 30%;
}
</style>
