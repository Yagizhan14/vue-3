<template>
  <div class="relative flex flex-wrap w-full" style="height:350px;">
    <div
      v-for="(slide, index) in slides"
      class="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
      :key="slide"
    >
      <transition name="fade">
        <div
          v-if="currentSlide === index"
          :class="slide"
          class="w-full h-full"
        />
      </transition>
    </div>
    <div
      class="absolute z-10 flex flex-row items-center justify-center w-full bottom-2"
    >
      <button
        v-for="(num, index) in slides.length"
        @click="onChangeSlide(index)"
        class="w-4 h-4 mr-2 bg-black rounded-full shadow-md"
        :class="getDotClasses(index)"
        :key="num"
      />
    </div>
    <!-- <div class="flex flex-col items-center justify-center w-full my-10">
      <transition name="fade">
        <h1 v-if="isTitleVisible" class="mb-2 text-center">
          Slider Carousel
        </h1>
      </transition>
      <button class="px-2 border rounded" @click="onToggleVisible">
        {{ isTitleVisible ? "Hide Title" : "Show Title" }}
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      currentSlide: 0,
      slides: ["bg-blue-600", "bg-yellow-600", "bg-green-600"],
      interval: null,
      isTitleVisible: true,
    };
  },
  methods: {
    onChangeSlide(index) {
      this.currentSlide = index;
    },
    onToggleVisible() {
      this.isTitleVisible = !this.isTitleVisible;
    },
    getDotClasses(index) {
      let classes = "";
      if (this.currentSlide === index) classes += "bg-white ";
      if (index === this.slides.length - 1) classes += "mr-0 ";
      return classes;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.currentSlide === 2) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
