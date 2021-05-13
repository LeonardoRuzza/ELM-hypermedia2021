<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ product.name }}</h1>
    </header>
    <the-carousel :product-detail="detail"></the-carousel>
    <section id="product-information" class="product-information">
      <div class="product-description">
        <p>
          {{ product.description }}
        </p>
      </div>
      <the-card
        :title="product.BelongsTo.name"
        :image="'/areas/icons/icon-' + product.BelongsTo.id + '.png'"
        :link="'/areas/' + product.BelongsTo.id"
      >
      </the-card>
    </section>
    <section>
      <h2>Team</h2>
      <div id="product-team" class="team">
        <the-card
          title="Team Manager"
          :image="'/employees/employee-' + product.Manage.id + '.jpg'"
          :link="'/employees/' + product.Manage.id"
          :subtitle="product.Manage.name + ' ' + product.Manage.surname"
        ></the-card>
        <span>
          <p>All our team member is important for us</p>
          <nuxt-link :to="'/team/product-' + productId" class="button">
            Developing Team
          </nuxt-link>
        </span>
      </div>
    </section>
    <section class="contact">
      <p>To get more information about our product:</p>
      <button class="button" @click="contactUs()">Contact Us</button>
    </section>
    <section class="form-section" :class="{ visible: isContactVisible }">
      <div class="form-container">
        <span @click="closeContact()">&times;</span>
        <the-contact-form
          class="form"
          :default-message="'Request information for ' + product.name + ':'"
        ></the-contact-form>
      </div>
    </section>
  </main>
</template>

<script>
import TheCard from '~/components/TheCard.vue'
import TheCarousel from '~/components/TheCarousel.vue'
import TheContactForm from '~/components/TheContactForm.vue'
export default {
  components: {
    TheCarousel,
    TheCard,
    TheContactForm,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/products/${id}`
    )
    const product = data
    const crumbs = [
      {
        title: 'Products',
        path: '/products',
      },
      {
        title: product.name,
        path: `/products/${product.id}`,
      },
    ]
    return {
      product,
      crumbs,
    }
  },
  data() {
    const id = this.$route.params.id
    return {
      detail: [
        `/products/${id}/carousel-1.png`,
        `/products/${id}/carousel-2.png`,
        `/products/${id}/carousel-3.png`,
      ],
      crumbs: [
        {
          title: 'Products',
          path: '/products',
        },
      ],
      isContactVisible: false,
      productId: id,
    }
  },
  methods: {
    contactUs() {
      // display the contact form if is not visible
      if (!this.isContactVisible) {
        this.isContactVisible = true
      }
    },
    closeContact() {
      // close the contact form if is visible
      if (this.isContactVisible) {
        this.isContactVisible = false
      }
    },
  },
}
</script>
<style>
#product-information .card {
  width: 150px;
  height: 200px;
}
#product-information .card-content {
  justify-content: flex-start;
}
#product-information .card-img {
  max-height: 70%;
}
#product-team .card {
  width: 400px;
  height: 350px;
}
#product-team .card-content {
  justify-content: flex-start;
}
#product-team .card-img {
  max-height: 50%;
}
</style>
<style scoped>
.product-information {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin: 30px auto 50px auto;
  border-bottom: 1px grey solid;
  width: 90%;
  align-items: center;
  padding: 20px;
}
.product-description p {
  font-size: 1rem;
  font-weight: normal;
  text-align: left;
  width: 90%;
  line-height: 1.7rem;
  color: rgb(100, 100, 100);
}
.team p,
.contact p {
  font-size: 0.9rem;
  font-weight: lighter;
  text-align: center;
  line-height: 1.7rem;
  color: rgb(100, 100, 100);
  margin-bottom: 30px;
}
.team {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 90%;
  margin: 20px auto 20px auto;
  border-bottom: 1px grey solid;
  padding: 20px;
}
.contact button {
  font-size: 1.4rem;
  font-weight: bold;
}
.form-section {
  display: none;
  position: fixed;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 30000;
}
.form-section.visible {
  display: flex;
}
.form {
  margin: auto;
  width: 500px;
  background-color: white;
  border-radius: 1.5rem;
  z-index: 30001;
}
.form-container {
  position: relative;
}
.form-container span {
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: 30002;
  color: red;
  font-size: 30px;
  font-weight: bolder;
  cursor: pointer;
}
</style>
