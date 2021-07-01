<template>
  <!-- The nuxt link implementing a card include a title, an image, a subtitle (facultative, i.e. v-if) and a description (facultative, i.e. v-if)  -->
  <nuxt-link :to="link">
    <div class="card">
      <div class="card-content">
        <div class="card-title">
          {{ title }}
        </div>
        <div class="card-img">
          <img :src="`${image}`" :alt="'Thumbnail of ' + title" />
        </div>
        <div v-if="subtitle != ''" class="card-subtitle">
          {{ subtitle }}
        </div>
        <div v-if="description != ''" class="card-description">
          {{ description }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    // productDetail is an array of object, each item contains the name of the image.
    title: { type: String, default: () => '' },
    subtitle: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
    link: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.card {
  width: 350px;
  height: 500px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 20px auto 20px auto;
}
.card:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 3px 10px 0 rgba(0, 0, 0, 0.4);
}

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 22px;
  margin: 0px 0px 10px 0px;
  padding: 5px;
  width: 100%;
  color: white;
  background-color: #26272b;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.card-subtitle {
  font-size: 0.9rem;
  font-weight: bolder;
  text-transform: uppercase;
  /* border-top: 3px solid orange; */
  border-bottom: 3px solid orange;
  text-align: center;
  color: #26272b;
  margin: auto;
}
.card-img {
  max-width: 90%;
  max-height: 40%;
  margin-bottom: 10px;
  text-align: center;
  /* background-color: black;*/
  margin: auto;
}
.card-img img {
  max-width: 100%;
  max-height: 100%;
}
.card-description {
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  padding: 5px;
  width: 100%;
  margin: auto auto 10px auto;
}
a,
a:hover,
a:visited {
  text-decoration: none;
  color: inherit;
}
@media screen and (max-width: 360px) {
  .card {
    width: 300px;
    height: 400px;
  }
}
</style>
