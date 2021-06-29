<template>
  <!-- List of nuxt link which represent the parts of the breadcrumbs -->
  <ol>
    <li v-for="(crumb, index) in crumbs" :key="'crumb-' + index">
      <nuxt-link :to="crumb.path">
        <span>{{ crumb.title }}</span>
      </nuxt-link>
    </li>
  </ol>
</template>

<script>
export default {
  // Set the values for the breadcrumbs.
  props: {
    crumbs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
ol {
  list-style: none;
  text-align: left;
}
li {
  display: inline;
}
li:after {
  content: ' » ';
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.0725em 0 0.15em;
}
li:last-child:after {
  content: '';
}
li a {
  color: black;
}
li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}
span {
  font-size: 1.8em;
}
@media screen and (max-width: 425px) {
  span {
    font-size: 1rem;
  }
}
@media screen and (min-width: 425px) and (max-width: 768px) {
  span {
    font-size: 1.3em;
  }
}
</style>
