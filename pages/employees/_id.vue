<template>
  <main class="container">
    <the-bread-crumbs :crumbs="crumbs"> </the-bread-crumbs>
    <header>
      <h1>{{ employee.name }} {{ employee.surname }}</h1>
    </header>
    <section>
      <div class="row">
        <div class="column">
          <img
            alt="Employee image"
            :src="'/employees/employee-' + employee.id + '.jpg'"
          />
        </div>
        <div class="column">
          <div class="sub-row1">
            <p class="role">
              <!--TODO modificare con role dinamico da database-->
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              scelerisque bibendum luctus. Praesent elementum posuere cursus.
              Suspendisse iaculis et ligula ornare ultricies.
            </p>
          </div>
          <div id="area-of-work" class="cards-container-area">
            <the-card
              :key="'area-' + employee.WorkIn.id"
              :title="'Area of work'"
              :image="'/areas/icons/icon-' + employee.WorkIn.id + '.png'"
              :link="'/areas/' + employee.WorkIn.id"
            >
            </the-card>
          </div>
          <div class="sub-row2">
            <p class="get-in-touch">
              Want to get in touch with {{ employee.name }}?
            </p>
            <button class="button">{{ employee.email }}</button>
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
      </div>
    </section>
    <h2>Managed Products</h2>
    <div class="cards-container-products">
      <the-card
        v-for="item of managedProducts"
        :key="'products-' + item.id"
        :title="item.name"
        :description="item.description"
        :image="'/products/' + item.id + '/thumbnail.png'"
        :link="'/products/' + item.id"
      >
      </the-card>
    </div>
    <h2>Developed Products</h2>
    <div class="cards-container-products">
      <the-card
        v-for="item of developedProducts"
        :key="'products-' + item.id"
        :title="item.name"
        :description="item.description"
        :image="'/products/' + item.id + '/thumbnail.png'"
        :link="'/products/' + item.id"
      >
      </the-card>
    </div>
  </main>
</template>

<script>
import TheCard from '~/components/TheCard.vue'
import TheBreadCrumbs from '~/components/TheBreadCrumbs.vue'

export default {
  components: {
    TheCard,
    TheBreadCrumbs,
  },
  // Get all the info about an employee from the DB (employee itself, his developedProducts, his managedProducts) and generate correct breadcrumbs.
  async asyncData({ $axios, route }) {
    const { id } = route.params
    return Promise.all([
      await $axios.$get(`${process.env.BASE_URL}/api/employees/${id}`),
      await $axios.$get(
        `${process.env.BASE_URL}/api/employees/${id}/DevelopedProducts`
      ),
      await $axios.$get(
        `${process.env.BASE_URL}/api/employees/${id}/ManagedProducts`
      ),
    ]).then((res) => {
      const employee = res[0]
      const developedProducts = res[1]
      const managedProducts = res[2]
      const crumbs = [
        {
          title: 'Our Team',
          path: '/employees',
        },
        {
          title: employee.name + ' ' + employee.surname,
          path: '/employees/' + employee.id,
        },
      ]

      return {
        employee,
        developedProducts,
        managedProducts,
        crumbs,
      }
    })
  },
}
</script>

<style>
#area-of-work .card {
  width: 150px;
  height: 150px;
}
#area-of-work .card-img {
  max-height: 60%;
}
</style>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3rem;
}
.column {
  max-width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .row {
    flex-direction: row-reverse;
  }
  .column {
    max-width: 100%;
    margin: auto;
  }
  .column img {
    box-shadow: none;
  }
  .role {
    margin-bottom: 0;
    margin-top: 1rem;
  }
}
.cards-container-products {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px auto 30px auto;
}
.get-in-touch {
  margin-top: 2%;
  margin-bottom: 3%;
}
.role {
  margin-bottom: 8%;
}
img {
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  border-radius: 3%;
}
.button:hover {
  background-color: orange;
  color: white;
  transition: background-color 0.2s ease-in;
  text-decoration: none;
}

li {
  display: inline-block;
  margin-top: 3%;
  margin-right: 5%;
  margin-bottom: 2%;
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
