<template>
  <header class="header">
    <div class="header-content">
      <div class="title"><h3>WebSite</h3></div>
      <nav class="right">
        <div
          v-for="(item, itemIndex) of menuOptions"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOptions: [
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
    }
  },
}
</script>

<style>
.header {
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.header-content {
  width: 100%;
  max-width: 800px;
  margin: auto;
  align-items: center;
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
