<template>
  <!-- TopBar with two allocated "blocks" (e.g., like link) -->
  <div class="top-bar">
    <a href="#" class="button bg-color" @click="goToPage(`${link1}`, $event)">
      {{ link1 }}
    </a>
    <a href="#" class="button" @click="goToPage(`${link2}`, $event)">
      {{ link2 }}
    </a>
  </div>
</template>
<script>
export default {
  // Set the two name (link) in the sidebar.
  props: {
    link1: { type: String, default: () => '' },
    link2: { type: String, default: () => '' },
  },
  // Method to manage the visualized info on the page when the sidebar is used (emit an event later managed by the page which exploit the sidebar component).
  methods: {
    goToPage(path, event) {
      event.target.classList.toggle('bg-color')
      if (path === this.link1) {
        event.target.nextElementSibling.classList.toggle('bg-color')
      } else {
        event.target.previousElementSibling.classList.toggle('bg-color')
      }
      this.$emit('visualization', path)
    },
  },
}
</script>

<style scoped>
.top-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
}
.button {
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}

.bg-color {
  background-color: rgba(165, 164, 164, 0.733) !important;
}
</style>
