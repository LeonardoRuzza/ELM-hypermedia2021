<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ product.name }}</h1>
    </header>
    <!-- Images of the product -->
    <the-carousel :product-detail="detail"></the-carousel>
    <!-- Section of the general info about the current product -->
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
    <!-- Section for the team related to the product (manager and other developers)  -->
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
          <p>All our team's members are important for us</p>
          <nuxt-link :to="'/team/product-' + productId" class="button">
            Developing Team
          </nuxt-link>
        </span>
      </div>
    </section>
    <!-- Section for the contact button for the product -->
    <section class="contact">
      <p>To get more information about our product</p>
      <button class="button" @click="contactUs()">Contact Us</button>
    </section>
    <!-- Section for the "pop-up" contact form for the product -->
    <section class="form-section" :class="{ visible: isContactVisible }">
      <div class="form-container">
        <span @click="closeContact()">&times;</span>
        <the-contact-form
          class="form"
          :default-message="'Request information for ' + product.name + ':'"
          @sent="closeContact"
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
  // Get the info about a specific product from the DB and generate the correct breadcrumbs.
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
  // Generate the variable to retrieve the images to show about the product, and setting variable to manage the pop up form.
  data() {
    const id = this.$route.params.id
    return {
      detail: [
        `/products/${id}/carousel-1.png`,
        `/products/${id}/carousel-2.png`,
        `/products/${id}/carousel-3.png`,
      ],
      isContactVisible: false,
      productId: id,
    }
  },
  head: {
    title: `ELM-Products`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `This is one of the ELM Corporation Product`,
      },
    ],
  },
  // Methods to manage the contact form pop up displaying.
  methods: {
    contactUs() {
      // Display the contact form if is not visible.
      if (!this.isContactVisible) {
        this.isContactVisible = true
      }
    },
    closeContact() {
      // Close the contact form if is visible.
      if (this.isContactVisible) {
        this.isContactVisible = false
      }
    },
  },
}
</script>
<style>
#product-information .card {
  width: 180px;
  height: 200px;
}
#product-information .card-content {
  justify-content: flex-start;
}
#product-information .card-img {
  max-height: 60%;
}
#product-team .card {
  width: 400px;
  height: 350px;
}
@media screen and (max-width: 410px) {
  #product-team .card {
    width: 300px;
    height: 250px;
  }
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
  font-size: 1.5rem;
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
  max-width: 100%;
  background-color: white;
  border-radius: 1.5rem;
  z-index: 30001;
  padding-top: 1rem;
  padding-bottom: 1rem;
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
.team p,
.contact p {
  font-size: 1.6rem;
  font-weight: lighter;
  text-align: center;
  line-height: 1.7rem;
  color: rgb(100, 100, 100);
  margin-bottom: 30px;
}
@media screen and (max-width: 768px) {
  .product-description p {
    text-align: center;
  }
  .product-information,
  .team {
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 573px) {
  .form-container {
    max-width: 90%;
  }
}
</style>
