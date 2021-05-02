<template>
  <main class="container">
    <the-side-bar
      :link1="link1"
      :link2="link2"
      @visualization="onUpdateVisualization"
    >
    </the-side-bar>
    <div v-if="visualize == link1" class="cards-container">
      {{ link1 }}
    </div>
    <div v-else class="cards-container">
      {{ link2 }}
    </div>
  </main>
</template>
<script>
import TheSideBar from '~/components/TheSideBar.vue'
export default {
  components: {
    TheSideBar,
  },
  data() {
    return {
      link1: 'Latest News',
      link2: 'All News',
      visualize: 'Latest News',
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
.cards-container {
  position: static;
}
.container {
  display: flex;
}
</style>
