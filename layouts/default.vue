<template>
  <div>
    <!-- The tag clientOnly is necessary to avoid an SSR problem on the header -->
    <ClientOnly><the-header></the-header></ClientOnly>
    <Nuxt />
    <chat :chat-list="list" />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import Chat from '~/components/Chat'
import MMCCMixin from '~/mixins/mmcc-mixin'


export default {
  components: {
    TheHeader,
    TheFooter,
    Chat,
  },
  mixins: [MMCCMixin],
}
</script>

<style>
html {
  font-family: 'Helvetica';
  font-weight: bolder;
  box-sizing: border-box;
  background-color: white;
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
  font-size: 3rem;
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
  margin-left: 12%;
  margin-right: 12%;
  border-radius: 25px;
  border: 5px solid orange;
}
h2 {
  border: 1px solid orange;
  background-color: #26272b;
  color: white;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
  font-weight: bolder;
  font-size: 2rem;
  margin: 20px auto 20px auto;
  padding: 0px 20px 0px 20px;
}
.button {
  padding: 15px 25px 15px 25px;
  border: 1px solid #26272b;
  background-color: #26272b;
  color: white;
  border-radius: 1.7rem;
  margin: auto;
  transition: background-color 0.3s ease-in;
  text-decoration: none;
  cursor: pointer;
}
.button:visited {
  text-decoration: none;
  color: white;
}
.button:hover {
  background-color: white;
  color: #26272b;
  transition: background-color 0.2s ease-in;
  text-decoration: none;
}
@media screen and (max-width: 768px) and (min-width: 425px) {
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 425px) {
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.3rem;
  }
}
</style>
