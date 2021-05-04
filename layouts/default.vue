<template>
  <div>
    <the-header></the-header>
    <Nuxt />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style>
html {
  font-family: 'Helvetica';
  font-weight: bolder;
  box-sizing: border-box;
  background-color: lightgray;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  padding: 0.2%;
  margin: 2% 2% 2% 2%;
  text-align: center;
}

h1 {
  background-color: #26272b;
  font-size: 50px;
  color: white;
  padding: 16px;
  font-weight: bolder;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
  text-align: center;
  display: block;
  margin-bottom: 70px;
  margin-top: 30px;
}
</style>
