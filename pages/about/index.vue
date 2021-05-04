<template>
  <main class="container">
    <header>
      <h1>ABOUT US</h1>
      <h4>What about the ELM Corporation?</h4>
      <img
        src="https://pbs.twimg.com/profile_images/1090208956440633345/Okg4uYbh_400x400.jpg"
        alt="Nuxt Logo"
      />
    </header>
    <the-side-bar
      :link1="link1"
      :link2="link2"
      @visualization="onUpdateVisualization"
    >
    </the-side-bar>
    <section>
      <h2>Another lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
    </section>
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
      `${process.env.BASE_URL}/reviews`
    )
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
