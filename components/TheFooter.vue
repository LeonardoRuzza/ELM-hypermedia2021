<template>
  <footer class="footer">
    <div class="footer-content">
      <nav class="right">
        <div class="row">
          <div class="col">
            <span class="h6">ELM Corporation</span>
            <p class="text-justify">
              © 2021 ELM S.p.A. Via Schiaffino 11 20158 Milano, Italy P. IVA
              IT13187610152
            </p>
          </div>
          <div class="col">
            <!-- List of the areas (e.g., areas section of the footer)-->
            <span class="h6">Areas</span>
            <ul class="footer-links">
              <li
                v-for="(item, itemIndex) of areas"
                :key="'footer-item-' + itemIndex"
                class="footer-item"
              >
                <nuxt-link :to="item.path">
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col">
            <!-- List of links to other main pages related to general info about the company ((e.g., company section of the footer) -->
            <span class="h6">Company</span>
            <ul class="footer-links">
              <li
                v-for="(item, itemIndex) of company"
                :key="'footer-item-' + itemIndex"
                class="footer-item"
              >
                <nuxt-link :to="item.path">
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col">
            <!-- Links of the helps section of the footer -->
            <span class="h6">Help?</span>
            <ul class="footer-links">
              <li
                v-for="(item, itemIndex) of help"
                :key="'footer-item-' + itemIndex"
                class="footer-item"
              >
                <nuxt-link v-if="item.name != 'Privacy'" :to="item.path">
                  {{ item.name }}
                </nuxt-link>
                <a v-else :href="item.path"> {{ item.name }} </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </div>
    <div class="footer-content">
      <div class="row">
        <div class="col">
          <p class="copyright-text">
            Copyright &copy; 2017 All Rights Reserved by ELM Corporation.
          </p>
        </div>

        <div class="col">
          <!-- List of the social icons -->
          <ul class="social-icons">
            <li>
              <a
                class="facebook"
                href="https://www.facebook.com/moviricompany"
                aria-label="Facebook"
              >
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                class="twitter"
                href="https://twitter.com/moviri"
                aria-label="Twitter"
              >
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                class="instagram"
                href="https://www.instagram.com/moviricompany"
                aria-label="Instagram"
              >
                <i class="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                class="linkedin"
                href="https://www.linkedin.com/company/moviri/"
                aria-label="Linkedin"
              >
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  // Define the varible to represent the correct association between names and links for the pages listed in the footer.
  data() {
    return {
      areas: [
        {
          name: 'Performance Engineering',
          path: '/areas/1',
        },
        {
          name: 'Analytics',
          path: '/areas/2',
        },
        {
          name: 'Security',
          path: '/areas/3',
        },
        {
          name: 'Internet of Things',
          path: '/areas/4',
        },
        {
          name: 'Machine Learning & AI',
          path: '/areas/5',
        },
      ],
      company: [
        {
          name: 'About Us',
          path: '/about',
        },
        {
          name: 'Our Team',
          path: '/employees',
        },
        {
          name: 'News',
          path: '/news',
        },
      ],
      help: [
        {
          name: 'Contact Us',
          path: '/contacts',
        },
        {
          name: 'Privacy',
          path: 'https://www.iubenda.com/privacy-policy/61398075',
        },
      ],
    }
  },
}
</script>

<style scoped>
.row {
  display: contents;
  /* flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around; */
}
.footer {
  background-color: #26272b;
  padding: 18px 3px 10px;
  font-size: 15px;
  line-height: 24px;
  color: white;
}
.footer hr {
  border-top-color: #bbb;
  opacity: 0.5;
}
.footer hr.small {
  margin: 20px 0;
}
.footer .h6 {
  color: orange;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}
.footer a,
.footer nuxt-link {
  color: white;
}
.footer a:hover,
.footer nuxt-link:hover {
  color: orange;
  text-decoration: none;
}
.footer-links {
  padding-left: 0;
  list-style: none;
}
.footer-links li {
  display: block;
}
.footer-links a,
.footer-links nuxt-link {
  color: white;
  text-decoration: none;
}
.footer-links a:active,
.footer-links a:focus,
.footer-links a:hover,
.footer-links nuxt-link:active,
.footer-links nuxt-link:focus,
.footer-links nuxt-link:hover {
  color: orange;
  text-decoration: none;
}
.footer-links.inline li {
  display: inline-block;
}
.footer .social-icons {
  text-align: right;
}
.footer .social-icons a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}
.right {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  max-width: 1200px;
}
.col {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
@media screen and (max-width: 768px) {
  .right {
    display: contents;
  }
  .right .col {
    margin-left: 2rem;
  }
}
.copyright-text {
  margin: 0;
}
@media (max-width: 991px) {
  .footer [class^='col-'] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .footer {
    padding-bottom: 0;
  }
  .footer .copyright-text,
  .footer .social-icons {
    text-align: center;
  }
}
.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.social-icons li {
  display: inline-block;
  margin-bottom: 4px;
}
.social-icons li.title {
  margin-right: 15px;
  text-transform: uppercase;
  color: #96a2b2;
  font-weight: 700;
  font-size: 13px;
}
.social-icons a {
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
.social-icons a:hover {
  color: #fff;
  background-color: #29aafe;
}
.social-icons.size-sm a {
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
@media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
  .footer-item {
    min-height: 48px;
    min-width: 48px;
  }
  .footer-item a {
    line-height: 48px;
  }
}
</style>
