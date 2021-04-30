<template>
  <header class="header">
    <nav class="header-content">
      <div class="menu-item-group">
        <span
          v-for="(item, itemIndex) of menuOptions.left"
          :key="'menu-item-' + itemIndex"
          :class="getClass(item.path)"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </span>
      </div>
      <nuxt-link to="/">
        <span key="menu-item-logo">
          <img
            src="~/assets/logo_small.png"
            alt="ELM corporation"
            class="logo"
          />
        </span>
      </nuxt-link>
      <div class="menu-item-group">
        <span
          v-for="(item, itemIndex) of menuOptions.right"
          :key="'menu-item-' + itemIndex"
          :class="getClass(item.path)"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOptions: {
        left: [
          {
            name: 'Products',
            path: '/products',
          },
          {
            name: 'Areas',
            path: '/areas',
          },
          {
            name: 'Our Team',
            path: '/team',
          },
        ],
        right: [
          {
            name: 'News',
            path: '/news',
          },
          {
            name: 'Contact Us',
            path: '/contacts',
          },
          {
            name: 'About Us',
            path: '/about',
          },
        ],
      },
    }
  },
  methods: {
    getClass(item) {
      // alert('good')
      const path = 'about' // window.location.pathname.split('/')[1]
      if ('/' + path === item) {
        return 'menu-item active'
      }
      return 'menu-item'
    },
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: rgb(225, 232, 242);
  color: rgb(41, 44, 53);
  display: flex;
  justify-content: space-between;
  text-align: center;
  position: sticky;
  top: 0px;
  left: 0px;
}
.header-content {
  display: flex;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  align-items: center;
  justify-content: space-between;
}
.menu-item-group {
  min-width: 40%;
  display: flex;
  justify-content: space-between;
}
.menu-item {
  font-size: 1.3rem;
  color: rgb(41, 44, 53);
}
.menu-item.active,
.menu-item > a:hover {
  color: rgb(100, 187, 122);
  text-decoration: underline;
}
.menu-item a,
.menu-item a:visited {
  color: inherit;
  text-decoration: none;
}

.logo {
  width: 38px;
  height: 60px;
}
.right {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  max-width: 50%;
}
.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}
</style>
