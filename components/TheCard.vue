<template>
  <div class="card">
    <div class="card-title">
      {{ title }}
    </div>
    <div class="card-img">
      <img :src="`${image}`" alt="Image of the news" />
    </div>
    <div class="card-description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // productDetail is an array of object, each item contains the name of the image
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.card {
  width: 200px;
  height: 355px;
  border-radius: 0.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card-title {
  font-size: 22px;
  margin: 0px;
  padding: 5px;
  color: #26272b;
}
.card-img {
  width: 100%;
  max-height: 150px;
  margin-bottom: 15px;
}
.card-img img {
  max-width: 100%;
  max-height: 150px;
}
.card-description {
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  padding: 5px;
  width: 100%;
}
</style>
