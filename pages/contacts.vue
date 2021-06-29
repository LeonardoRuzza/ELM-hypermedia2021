<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>CONTACT US</h1>
      <h4>Get in touch with the team!</h4>
    </header>
    <img src="/contacts/contacts.png" alt="Contact image" />
    <section>
      <div class="contact-box">
        <div>
          <p class="contact-box-title">Thank you for your interest</p>
          <p class="contact-box-subtitle">
            Swing by for a cup of coffee, or leave us a message:
          </p>
        </div>
        <div class="row">
          <div class="column1">
            <!-- General contact info -->
            <div class="sub-row1">
              <p class="contact-info-title">Our Office</p>
              <p class="contact-info-content">
                Via Schiaffino, 11 20158 MILANO T
              </p>
              <a
                class="info-icons"
                href="https://www.facebook.com/moviricompany"
              >
                <i class="fa fa-map-marker"></i
              ></a>
              <p class="contact-info-title">Contact phone</p>
              <p class="contact-info-content">+39 02 4951 7001</p>
              <a
                class="info-icons"
                href="https://www.facebook.com/moviricompany"
              >
                <i class="fa fa-phone"></i
              ></a>
              <p class="contact-info-title">Contact email</p>
              <p class="contact-info-content">info@ELM.com</p>
              <a
                class="info-icons"
                href="https://www.facebook.com/moviricompany"
              >
                <i class="fa fa-envelope"></i
              ></a>
            </div>
            <!-- Social icons -->
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
    </section>
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
  // Define the value for the breadcrumbs.
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
.row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: stretch;
}
/*
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
*/
input {
  border-radius: 1rem;
  line-height: 2rem;
  border: 1px solid black;
}
.column1,
.column2 {
  width: 100%;
  padding: 0px 2rem 0px 2rem;
}
.column2 {
  /*color: white;*/
  border-left-width: 3px;
  border-left-style: solid;
  border-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)) 1
    100%;
  /*
  border-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  */
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
  padding: 10px;
  border-radius: 1.7rem;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 12px 12px 4px;
  background-image: linear-gradient(180deg, #f7f8fc 0%, #e9e9f4 100%);
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
  background-color: #818a91;
  color: #eceeef;
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
