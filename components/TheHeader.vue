<template>
  <nav class="header">
    <!-- Header for the desktop devices -->
    <div v-if="width >= 1024" class="header-content">
      <!-- Left options -->
      <div class="menu-item-group">
        <span
          v-for="(item, itemIndex) of menuOptions.left"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <!-- If the item has no dropdown place the item as a nuxt-link -->
          <nuxt-link v-if="!item.hasDropdown" :to="item.path" class="underline">
            {{ item.name }}
          </nuxt-link>
          <!-- Otherwise place a span and @mouseover open the relative dropdown -->
          <span
            v-else
            :class="'underline menu-item-a ' + childSelected()"
            @mouseover="openDropdown(item)"
          >
            {{ item.name }}
          </span>
          <!-- If the item has the dropdown place all the subelements as nuxt-link -->
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
      <!-- Logo with nuxt-link to the homepage -->
      <nuxt-link to="/">
        <span key="menu-item-logo">
          <img
            src="~/assets/logo_small.png"
            alt="ELM corporation"
            class="logo"
          />
        </span>
      </nuxt-link>
      <!-- Right elements without the check on the dropdown -->
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
    </div>
    <!-- Header for the mobile devices -->
    <div v-else>
      <div class="header-content mobile">
        <!-- Logo with nuxt-link to the homepage -->
        <nuxt-link to="/">
          <span key="menu-item-logo">
            <img
              src="~/assets/logo_small.png"
              alt="ELM corporation"
              class="logo"
            />
          </span>
        </nuxt-link>
        <!-- Menu icon that open/collapse the menu @click -->
        <div
          id="menu-toggle"
          class="menu-icon"
          :class="{ 'menu-opened': menuOpened }"
          @click="openMenu()"
        >
          <div class="menu-bar1"></div>
          <div class="menu-bar2"></div>
          <div class="menu-bar3"></div>
        </div>
      </div>
      <!-- If the menu is open show all the elements -->
      <div v-if="menuOpened" class="collapse-menu">
        <div
          v-for="(item, itemIndex) of menuOptions.all"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <!-- If the element has NOT the dropdown, place a simple nuxt-link -->
          <nuxt-link v-if="!item.hasDropdown" :to="item.path">
            {{ item.name }}
          </nuxt-link>
          <!-- Otherwise place a span and @click open/collapse the submenu -->
          <span
            v-else
            :class="'menu-item-a ' + childSelected()"
            @click="toggleSubMenu()"
          >
            {{ item.name }}
            <i class="dropdown-icon" :class="{ up: submenuOpened }"></i>
          </span>
          <!-- Submenu visible if the item has the submenu and if the dropdown has been clicked -->
          <div v-if="item.hasDropdown && submenuOpened" class="sub-menu">
            <div
              v-for="(subItem, subIndex) of item.dropdown"
              :key="'sub-menu-item-' + subIndex"
              class="sub-menu-item"
            >
              <nuxt-link :to="subItem.path">
                {{ subItem.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // Define all the variables to associate links to the respective names of pages showed in the header.
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
          },
          {
            name: 'OUR TEAM',
            path: '/employees',
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
        all: [
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
          },
          {
            name: 'OUR TEAM',
            path: '/employees',
            hasDropdown: false,
          },
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
      width: 0,
      menuOpened: false,
      submenuOpened: false,
    }
  },
  beforeMount() {
    // Add an event listener on the event resize when the object is created.
    window.addEventListener('resize', this.handleResize)
    // this is done to check at runtime the width of the window that is used to switch between mobile and desktop
    this.handleResize()
  },
  beforeDestroy() {
    // Remove the listener when the object is destroyed.
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    openDropdown(item) {
      if (item.hasDropdown) {
        // Add all the property of visibility to trigger the transition.
        document.querySelector('.dropdown').style.visibility = 'visible'
        document.querySelector('.dropdown').style.opacity = '1'
        document.querySelector('.dropdown').style.top = '50px'
      }
    },
    closeAllDropdown() {
      // Remove all the property of visibility to trigger the transition.
      document.querySelector('.dropdown').style.visibility = ''
      document.querySelector('.dropdown').style.opacity = ''
      document.querySelector('.dropdown').style.top = ''
    },
    toggleSubMenu() {
      this.submenuOpened = !this.submenuOpened
    },
    childSelected() {
      // return with the class of the active link if the child of Areas menu-item is selected
      if (this.$route.name === 'areas-id') {
        return 'nuxt-link-exact-active nuxt-link-active'
      } else return ''
    },
    handleResize() {
      // When resize reset the property width.
      this.width = window.innerWidth
    },
    openMenu() {
      // Toggle the attribute menuOpened to change class and the reaction on opening/closing.
      this.menuOpened = !this.menuOpened
    },
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10000;
}
.header-content {
  height: 70px;
  background: #26272b;
  color: rgb(244, 245, 248);
  display: flex;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  top: 0px;
  left: 0px;
  z-index: 10000;
  padding-left: 3rem;
  padding-right: 3rem;
}
.header-content.mobile {
  padding-left: 1rem;
  padding-right: 1rem;
}
.menu-item-group {
  min-width: 40%;
  display: flex;
  justify-content: space-between;
}
.menu-item {
  cursor: pointer;
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
  position: relative;
}
.menu-item .nuxt-link-exact-active.nuxt-link-active:after {
  content: '';
  position: absolute;
  left: 0;
  right: auto;
  bottom: -5px;
  background: orange;
  height: 4px;
  width: 100%;
}
.dropdown-item .nuxt-link-exact-active.nuxt-link-active:after {
  content: '';
  position: absolute;
  left: 0;
  right: auto;
  bottom: -5px;
  background: orange;
  height: 2px;
  width: 100%;
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
  width: 250px;
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
.dropdown-item a {
  font-size: 1rem !important;
}
.dropdown-icon {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  position: absolute;
  top: 5px;
  margin-left: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.dropdown-icon.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.sub-menu-item {
  position: relative;
  background: #26272b;
  padding: 10px;
}
.sub-menu-item a {
  font-size: 1rem !important;
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
  background: orange;
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
  background: orange;
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
/*SECTION MENU ICON*/
.menu-icon {
  display: inline-block;
  cursor: pointer;
}

.menu-bar1,
.menu-bar2,
.menu-bar3 {
  width: 35px;
  height: 5px;
  background-color: #fff;
  margin: 6px 0;
  transition: 0.4s;
}

.menu-opened .menu-bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.menu-opened .menu-bar2 {
  opacity: 0;
}

.menu-opened .menu-bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
.collapse-menu {
  display: block;
  text-align: center;
  background-color: #26272b;
  color: rgb(244, 245, 248);
  padding-bottom: 1rem;
}
.collapse-menu .menu-item {
  cursor: pointer;
  position: relative;
  margin: 0 0 1rem 0;
}
.sub-menu {
  display: block;
  text-align: center;
  background-color: #26272b;
  color: rgb(244, 245, 248);
}
</style>
