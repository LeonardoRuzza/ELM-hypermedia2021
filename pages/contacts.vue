<template>
  <main class="container">
    <header>
      <h1>CONTACT US</h1>
      <h4>Get in touch with the team!</h4>
    </header>
    <img src="/contacts.png" alt="Contact image" />
    <div class="contact-box">
      <div class="contact-info">Content</div>
      <the-contact-form class="contact-form"></the-contact-form>
    </div>
  </main>
</template>

<script>
import TheContactForm from '~/components/TheContactForm.vue'
export default {
  components: {
    TheContactForm,
  },
}
</script>

<style scoped>
h4 {
  margin-bottom: 50px;
}
img {
  height: 100%;
  width: 100%;
  border-top: 50px;
  border-left: 0px;
  border-right: 0px;
}
.contact-form {
  position: relative;
  width: 50%;
}
.contact-box {
  background-color: #7bcc94;
}
</style>
