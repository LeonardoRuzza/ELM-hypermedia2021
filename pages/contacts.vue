<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>CONTACT US</h1>
      <h4>Get in touch with the team!</h4>
    </header>
    <img src="/contacts/contacts.png" alt="Contact image" />
    <div class="contact-box">
      <div>
        <p class="contact-box-title">Thank you for your interest</p>
        <p class="contact-box-subtitle">
          Swing by for a cup of coffee, or leave us a message:
        </p>
      </div>
      <div class="row">
        <div class="column1">
          <div class="sub-row1">
            <p class="contact-info-title">Our Office</p>
            <p class="contact-info-content">
              Via Schiaffino, 11 20158 MILANO T
            </p>
            <a class="info-icons" href="https://www.facebook.com/moviricompany"
              ><i class="fa fa-map-marker"></i
            ></a>
            <p class="contact-info-title">Contact phone</p>
            <p class="contact-info-content">+39 02 4951 7001</p>
            <a class="info-icons" href="https://www.facebook.com/moviricompany"
              ><i class="fa fa-phone"></i
            ></a>
            <p class="contact-info-title">Contact email</p>
            <p class="contact-info-content">info@ELM.com</p>
            <a class="info-icons" href="https://www.facebook.com/moviricompany"
              ><i class="fa fa-envelope"></i
            ></a>
          </div>
          <div class="sub-row2">
            <p class="contact-info-title">Our socials</p>
            <ul class="social-icons">
              <li>
                <a
                  class="facebook"
                  href="https://www.facebook.com/moviricompany"
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
        </div>
        <div class="column2">
          <the-contact-form class="form"></the-contact-form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TheContactForm from '~/components/TheContactForm.vue'
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'
export default {
  components: {
    TheContactForm,
    TheBreadCrumbs,
  },
  data() {
    return {
      crumbs: [
        {
          title: 'Contact Us',
          path: '/contacts',
        },
      ],
    }
  },
}
</script>

<style scoped>
.form {
  border-radius: 1.7rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
h4 {
  margin-bottom: 50px;
}
img {
  height: 98%;
  width: 98%;
  border-left: 0px;
  border-right: 0px;
  margin-bottom: 50px;
  border-radius: 1.7rem;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 10px 12px 4px;
}
.column1 {
  float: left;
  width: 70%;
  margin-top: 6px;
  padding: 20px;
}
.column2 {
  float: left;
  width: 30%;
  margin-top: 6px;
  padding: 20px;
}
.row:after {
  content: '';
  display: table;
  clear: both;
}
.sub-row1 {
  float: top;
  height: 75%;
}
.sub-row2 {
  float: top;
  height: 25%;
}
.contact-box {
  background-color: lightgray;
  padding: 10px;
  border-radius: 1.7rem;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 12px 12px 4px;
}
.contact-info-title {
  border: 1px solid orange;
  background-color: #26272b;
  color: white;
  -moz-box-shadow: 2px 2px 6px orange;
  -webkit-box-shadow: 2px 2px 6px orange;
  box-shadow: 2px 2px 6px orange;
  font-weight: bolder;
  font-size: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 1.7rem;
}
.contact-info-content {
  margin-bottom: 15px;
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
  background-color: orange;
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
