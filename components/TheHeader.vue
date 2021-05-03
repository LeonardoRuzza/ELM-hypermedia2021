<template>
  <header class="header">
    <nav class="header-content">
      <div class="menu-item-group">
        <span
          v-for="(item, itemIndex) of menuOptions.left"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <nuxt-link v-if="!item.hasDropdown" :to="item.path" class="underline">
            {{ item.name }}
          </nuxt-link>
          <span
            v-else
            :class="'underline menu-item-a ' + childSelected()"
            @mouseover="openDropdown(item)"
          >
            {{ item.name }}
          </span>
          <div
            v-if="item.hasDropdown"
            class="dropdown"
            @mouseleave="closeAllDropdown"
          >
            <div
              v-for="(subItem, subIndex) of item.dropdown"
              :key="'dropdown-item-' + subIndex"
              class="dropdown-item"
            >
              <nuxt-link :to="subItem.path" class="underline-small">
                {{ subItem.name }}
              </nuxt-link>
            </div>
          </div>
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
          class="menu-item"
        >
          <nuxt-link :to="item.path" class="underline">
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
            name: 'PRODUCTS',
            path: '/products',
            hasDropdown: false,
          },
          {
            name: 'AREAS',
            hasDropdown: true,
            dropdown: [
              {
                name: 'Area 1',
                path: '/area1',
              },
              {
                name: 'Area 2',
                path: '/area2',
              },
              {
                name: 'Area 3',
                path: '/area3',
              },
              {
                name: 'Area 4',
                path: '/area4',
              },
              {
                name: 'Area 5',
                path: '/area5',
              },
            ],
          },
          {
            name: 'OUR TEAM',
            path: '/team',
            hasDropdown: false,
          },
        ],
        right: [
          {
            name: 'NEWS',
            path: '/news',
            hasDropdown: false,
          },
          {
            name: 'CONTACT US',
            path: '/contacts',
            hasDropdown: false,
          },
          {
            name: 'ABOUT US',
            path: '/about',
            hasDropdown: false,
          },
        ],
      },
    }
  },
  methods: {
    openDropdown(item) {
      if (item.hasDropdown) {
        document.querySelector('.dropdown').style.visibility = 'visible'
        document.querySelector('.dropdown').style.opacity = '1'
        document.querySelector('.dropdown').style.top = '50px'
      }
    },
    closeAllDropdown() {
      // console.log('close')
      document.querySelector('.dropdown').style.visibility = ''
      document.querySelector('.dropdown').style.opacity = ''
      document.querySelector('.dropdown').style.top = ''
    },
    childSelected() {
      const child = ['area1', 'area2', 'area3', 'area4', 'area5']
      if (child.includes(this.$route.name)) {
        // console.log('it is active')
        return 'nuxt-link-exact-active nuxt-link-active'
      } else return ''
    },
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: #26272b;
  color: rgb(244, 245, 248);
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
  position: relative;
}
a,
.menu-item-a {
  font-size: 1.3rem;
  color: white;
  text-decoration: none;
}
.nuxt-link-exact-active.nuxt-link-active {
  color: white;
}
.menu-item .nuxt-link-exact-active.nuxt-link-active:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  width: auto;
  bottom: -5px;
  background: rgb(100, 187, 122);
  height: 4px;
}
.dropdown-item .nuxt-link-exact-active.nuxt-link-active:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  width: auto;
  bottom: -5px;
  background: rgb(100, 187, 122);
  height: 2px;
}
a:visited {
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
.dropdown {
  position: absolute;
  left: 0;
  top: 70px;
  visibility: hidden;
  opacity: 0;
  width: 150px;
  background: #26272b;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  transition: opacity 0.2s ease-out, top 0.2s ease-in-out;
}
.dropdown-item {
  position: relative;
  background: #26272b;
  padding: 10px;
  border: solid 1px rgb(200, 200, 200);
}
.underline,
.underline-small {
  display: inline;
  position: relative;
  overflow: hidden;
}
.underline:after {
  content: '';
  position: absolute;
  right: 0;
  width: 0;
  bottom: -5px;
  background: rgb(100, 187, 122);
  height: 4px;
  transition-property: width;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}
.underline-small:after {
  content: '';
  position: absolute;
  right: 0;
  width: 0;
  bottom: -5px;
  background: rgb(100, 187, 122);
  height: 2px;
  transition-property: width;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}
.underline:hover:after,
.underline:focus:after,
.underline:active:after,
.underline-small:hover:after,
.underline-small:focus:after,
.underline-small:active:after {
  left: 0;
  right: auto;
  width: 100%;
}
</style>
