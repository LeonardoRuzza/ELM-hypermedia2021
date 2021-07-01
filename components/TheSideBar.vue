<template>
  <!-- Sidebar with two allocated "blocks" (e.g., like link) -->
  <div class="w3-sidebar w3-border-light w3-bar-block">
    <a
      href="#"
      class="w3-bar-item w3-button bg-color"
      @click="goToLink(`${link1}`, $event)"
    >
      {{ link1 }}
    </a>
    <a
      href="#"
      class="w3-bar-item w3-button"
      @click="goToLink(`${link2}`, $event)"
    >
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
    goToLink(path, event) {
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
.bg-color {
  background-color: rgba(165, 164, 164, 0.733) !important;
}
.w3-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: static;
  z-index: 1;
  padding: 1% 6% 1% 0.5%;
}
.w3-bar-block .w3-bar-item {
  width: 100%;
  display: block;
  border-radius: 1.7rem;
  padding: 1rem 1rem 1rem 1rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  white-space: nowrap;
}
@media screen and (max-width: 768px) {
  .w3-sidebar {
    flex-direction: row;
    margin-bottom: 2rem;
  }
}
.w3-button:hover {
  color: #000;
  background-color: #ccc;
}
.w3-block {
  display: block;
  width: 100%;
}
</style>
