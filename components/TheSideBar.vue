<template>
  <!-- Sidebar -->
  <div class="w3-sidebar w3-border-light w3-bar-block">
    <h3 class="w3-bar-item">News Menu</h3>
    <a href="#" class="w3-bar-item w3-button" @click="goToNews(`${link1}`)">
      {{ link1 }}
    </a>
    <a href="#" class="w3-bar-item w3-button" @click="goToNews(`${link2}`)">
      {{ link2 }}
    </a>
  </div>
</template>
<script>
export default {
  props: {
    link1: { type: String, default: () => '' },
    link2: { type: String, default: () => '' },
  },
  methods: {
    goToNews(path) {
      this.$emit('visualization', path)
    },
  },
}
</script>

<style scoped>
.w3-sidebar {
  height: 100%;
  width: 18%;
  background-color: #fff;
  position: static;
  z-index: 1;
  overflow: auto;
  padding: 1%;
}
.w3-bar-block .w3-dropdown-hover,
.w3-bar-block .w3-dropdown-click {
  width: 100%;
}
.w3-bar-block .w3-dropdown-hover .w3-dropdown-content,
.w3-bar-block .w3-dropdown-click .w3-dropdown-content {
  min-width: 100%;
}
.w3-bar-block .w3-dropdown-hover .w3-button,
.w3-bar-block .w3-dropdown-click .w3-button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
}
.w3-bar-block .w3-bar-item {
  width: 100%;
  display: block;
  padding: 15px 16px;
  text-align: left;
  border: none;
  white-space: normal;
  float: none;
  outline: 0;
}
.w3-bar-block.w3-center .w3-bar-item {
  text-align: center;
}
.w3-block {
  display: block;
  width: 100%;
}
.w3-button {
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
.w3-button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.w3-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
.w3-disabled *,
:disabled * {
  pointer-events: none;
}
.w3-dropdown-hover:hover > .w3-button:first-child,
.w3-dropdown-click:hover > .w3-button:first-child {
  background-color: #ccc;
  color: #000;
}
.w3-bar-block .w3-dropdown-hover .w3-button,
.w3-bar-block .w3-dropdown-click .w3-button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
}
.w3-bar .w3-button {
  white-space: normal;
}
.w3-dropdown-hover.w3-mobile,
.w3-dropdown-hover.w3-mobile .w3-btn,
.w3-dropdown-hover.w3-mobile .w3-button,
.w3-dropdown-click.w3-mobile,
.w3-dropdown-click.w3-mobile .w3-btn,
.w3-dropdown-click.w3-mobile .w3-button {
  width: 100%;
}
.w3-button:hover {
  color: #000;
  background-color: #ccc;
}
.w3-bar .w3-bar-item {
  padding: 8px 16px;
  float: left;
  width: auto;
  border: none;
  display: block;
  outline: 0;
}
.w3-bar-block.w3-center .w3-bar-item {
  text-align: center;
}
.w3-block {
  display: block;
  width: 100%;
}
.w3-bar-item.w3-mobile,
.w3-dropdown-hover.w3-mobile,
.w3-dropdown-click.w3-mobile {
  text-align: center;
}
@media (min-width: 993px) {
  .w3-modal-content {
    width: 900px;
  }
  .w3-hide-large {
    display: none;
  }
  .w3-sidebar.w3-collapse {
    display: block;
  }
}
@media (max-width: 992px) {
  .w3-sidebar.w3-collapse {
    display: none;
  }
}
.w3-border-light-blue,
.w3-hover-border-light-blue:hover {
  border-color: #87ceeb;
}
.w3-border-light-green,
.w3-hover-border-light-green:hover {
  border-color: #8bc34a;
}
.w3-border-light-grey,
.w3-hover-border-light-grey:hover,
.w3-border-light-gray,
.w3-hover-border-light-gray:hover {
  border-color: #f1f1f1;
}
</style>
