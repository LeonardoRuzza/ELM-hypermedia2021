<template>
  <main class="container">
    <header>
      <h1>CONTACT US</h1>
      <h4>Get in touch with the team!</h4>
    </header>
    <img src="/contacts.png" alt="Contact image" />
    <div class="contact-box">
      <div>
        <p class="contact-box-title">Thank you for your interest</p>
        <p class="contact-box-subtitle">
          Swing by for a cup of coffee, or leave us a message:
        </p>
      </div>
      <div class="row">
        <div class="column">
          <div>
            <p class="contact-info-title">Our Office</p>
            <p>Via Schiaffino, 11 20158 MILANO T</p>
            <a class="info-icons" href="https://www.facebook.com/moviricompany"
              ><i class="fa fa-map-marker"></i
            ></a>
            <p class="contact-info-title">Contact phone</p>
            <p>+39 02 4951 7001</p>
            <a class="info-icons" href="https://www.facebook.com/moviricompany"
              ><i class="fa fa-phone"></i
            ></a>
            <p class="contact-info-title">Contact email</p>
            <p>info@ELM.com</p>
            <a class="info-icons" href="https://www.facebook.com/moviricompany"
              ><i class="fa fa-envelope"></i
            ></a>
          </div>
          <p class="contact-info-title">Our socials</p>
          <ul class="social-icons">
            <li>
              <a class="facebook" href="https://www.facebook.com/moviricompany"
                ><i class="fa fa-facebook"></i
              ></a>
            </li>
            <li>
              <a class="twitter" href="https://twitter.com/moviri"
                ><i class="fa fa-twitter"></i
              ></a>
            </li>
            <li>
              <a
                class="instagram"
                href="https://www.instagram.com/moviricompany"
                ><i class="fa fa-instagram"></i
              ></a>
            </li>
            <li>
              <a
                class="linkedin"
                href="https://www.linkedin.com/company/moviri/"
                ><i class="fa fa-linkedin"></i
              ></a>
            </li>
          </ul>
        </div>
        <div class="column">
          <the-contact-form class="form"></the-contact-form>
        </div>
      </div>
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
  border-left: 0px;
  border-right: 0px;
  margin-bottom: 50px;
}
.form {
  text-align: left;
}
.column {
  float: left;
  width: 50%;
  margin-top: 6px;
  padding: 20px;
}
.row:after {
  content: '';
  display: table;
  clear: both;
}
.contact-box {
  border-radius: 5px;
  background-color: #7bcc94;
  padding: 10px;
}
.contact-info-title {
  border: 1px solid darkgreen;
  background-color: #26272b;
  color: white;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
  font-weight: bolder;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
}
li {
  display: inline-block;
}

.social-icons,
.info-icons {
  text-align: center;
}
.social-icons a,
.info-icons {
  background-color: #eceeef;
  color: #818a91;
  font-size: 16px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.social-icons a:active,
.social-icons a:focus,
.social-icons a:hover,
.info-iconsa:active,
.info-icons:focus,
.info-icons:hover {
  color: #fff;
  background-color: #29aafe;
}
.social-icons.size-sm a,
.info-icons.size-sm a {
  line-height: 34px;
  height: 34px;
  width: 34px;
  font-size: 14px;
}
.social-icons a.facebook:hover {
  background-color: #3b5998;
}
.social-icons a.twitter:hover {
  background-color: #00aced;
}
.social-icons a.linkedin:hover {
  background-color: #007bb6;
}
.social-icons a.instagram:hover {
  background-color: #ea4c89;
}
</style>
