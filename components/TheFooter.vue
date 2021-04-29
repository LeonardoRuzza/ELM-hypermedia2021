<template>
  <footer class="footer">
    <div class="footer-content">
      <nav class="right">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>ELM Corporation</h6>
            <p class="text-justify">
              © 2021 ELM S.p.A. Via Schiaffino 11 20158 Milano, Italy P. IVA
              IT13187610152
            </p>
          </div>
          <div class="col-xs-6 col-md-3">
            <h6>Areas</h6>
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
          <div class="col-xs-6 col-md-3">
            <h6>Company</h6>
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
          <div class="col-xs-6 col-md-3">
            <h6>Help?</h6>
            <ul class="footer-links">
              <li
                v-for="(item, itemIndex) of help"
                :key="'footer-item-' + itemIndex"
                class="footer-item"
              >
                <nuxt-link :to="item.path">
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </div>
    <div class="footer-content">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">
            Copyright &copy; 2017 All Rights Reserved by ELM Corporation.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
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
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      areas: [
        {
          name: 'Area1',
          path: '/area1',
        },
        {
          name: 'Area2',
          path: '/area2',
        },
        {
          name: 'Area3',
          path: '/area3',
        },
        {
          name: 'Area4',
          path: '/area4',
        },
        {
          name: 'Area5',
          path: '/area5',
        },
      ],
      company: [
        {
          name: 'About Us',
          path: '/about',
        },
        {
          name: 'Our Team',
          path: '/team',
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
          path: '/privacy',
        },
      ],
    }
  },
}
</script>

<style>
.row {
  display: contents;
}
.footer {
  background-color: #26272b;
  padding: 18px 3px 10px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
}
.footer hr {
  border-top-color: #bbb;
  opacity: 0.5;
}
.footer hr.small {
  margin: 20px 0;
}
.footer h6 {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}
.footer a,
.footer nuxt-link {
  color: #737373;
}
.footer a:hover,
.footer nuxt-link:hover {
  color: #3366cc;
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
  color: #737373;
  text-decoration: none;
}
.footer-links a:active,
.footer-links a:focus,
.footer-links a:hover,
.footer-links nuxt-link:active,
.footer-links nuxt-link:focus,
.footer-links nuxt-link:hover {
  color: #3366cc;
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
  max-width: 80%;
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
}
</style>
