<template>
  <div class="carousel">
    <div class="slideshow-container">
      <!-- Full-width images with number and caption text -->
      <div
        v-for="(item, itemIndex) of productDetail"
        :key="'slide-' + itemIndex"
        class="slide fade"
      >
        <div class="index">{{ itemIndex + 1 }} / 3</div>
        <img :src="item" :alt="'slide product ' + (itemIndex + 1)" />
      </div>
      <!-- Next and previous buttons -->
      <span class="prev" @click="plusSlides(-1)">&#10094;</span>
      <span class="next" @click="plusSlides(1)">&#10095;</span>
    </div>
    <br />
    <!-- The circles -->
    <div style="text-align: center">
      <span
        v-for="(item, itemIndex) of productDetail"
        :key="'dot-' + (itemIndex + 1)"
        class="dot"
        @click="currentSlide(itemIndex)"
      >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // productDetail is an array of object, each item contains the name of the image
    productDetail: { type: Array, default: () => [] },
  },
  data() {
    return {
      slideIndex: 1,
    }
  },
  mounted() {
    this.showSlides(this.slideIndex)
  },
  methods: {
    // Next/previous controls
    plusSlides(n) {
      this.showSlides((this.slideIndex += n))
    },
    // Thumbnail image controls
    currentSlide(n) {
      this.showSlides((this.slideIndex = n))
    },
    showSlides(n) {
      let i
      const slides = document.getElementsByClassName('slide')
      const dots = document.getElementsByClassName('dot')
      if (n > slides.length) {
        this.slideIndex = 1
      }
      if (n < 1) {
        this.slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '')
      }
      slides[this.slideIndex - 1].style.display = 'block'
      dots[this.slideIndex - 1].className += ' active'
    },
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Slideshow container */
.slideshow-container {
  max-width: 800px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.slide {
  display: none;
}

/* Next & previous buttons */
.prev,
.next {
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
.slide img {
  height: 400px;
}
/* Position the "next button" to the right */
.next {
  left: auto;
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit transparency */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Number text (1/3 etc) */
.numbertext {
  background-color: rgba(0, 0, 0, 0.4);
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
