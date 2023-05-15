<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { models } from './data/models'

const tabs = [
  'suv', 'ev', 'mpv', 'commercial'
]

const selectedModel = ref('')
const modelProps = ref([])
const selectedType = ref({})
let header = ref()
let offsetTop = ref()
let fixed = ref(false)

onMounted(() => {
  selectedModel.value = tabs[0]

  offsetTop.value = header.value.offsetTop;

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () { fixedOnScroll() };
})


watch(
  () => selectedModel.value,
  (newValue) => {
    modelProps.value = models[newValue];
  }
);

const onSlideChange = (data) => {
  selectedType.value = models[selectedModel.value][data]
}

const fixedOnScroll = () => {
  fixed.value = window.pageYOffset >= offsetTop.value ? true : false
}

</script>

<template>
  <div class="section h-screen mb-8">

    <header class="flex absolute z-100 px-8 w-full transition-500 top-5 bg-opacity-0 bg-sky-700" :class="{
      'fixed bg-opacity-100 !top-0': fixed,
    }" id="header" ref="header">
      <img alt="Vue logo" class="ml-0 mr-2 my-2 h-8 md:h-12" src="@/assets/logo.svg" />


      <div class="flex w-screen  justify-end place-items-center">
        <div class="hidden md:inline-block i-mdi i-mdi-home text-2xl"></div>

        <nav class="hidden md:inline-block">
          <a href="#cars">Mobil</a>
          <a href="#order">Testimoni</a>
          <a href="#contact">Kontak</a>
        </nav>

        <div class="inline-block md:hidden i-mdi i-mdi-menu text-2xl "></div>
      </div>
    </header>

    <section class="section-content h-screen">
      <carousel :pauseAutoplayOnHover="true">
        <!-- :autoplay="2000" :wrap-around="true" -->
        <template #slides>

          <slide :key="1">
            <div class="carousel-content">
              <div class=" text-left">
                <h3 class="carousel-content-subtitle">Wuling</h3>
                <h1 class="carousel-content-title"> Almaz rs </h1>
                <h4 class="carousel-content-text"> Feel The Exciting Performance & Pure Driving Enjoyment </h4>
              </div>
              <div class="">
                <img class="carousel-image  w-full max-w-xl" src="/img/xalmaz-hybrid-aurora-silver.png" alt="">
              </div>
            </div>
          </slide>

          <slide :key="2">
            <div
              class="carousel-content bg-[url(https://wuling.id/assets/images/home/home-banner/xkv-home-almaz-rs-1440x600-new.png.pagespeed.ic.3gvo1YmKiF.webp)] bg-(cover right)">
              <div class="absolute top-0 bottom-0 flex w-full">
                <div class="flex flex-col w-full justify-center pl-8">
                  <h3 class="carousel-content-subtitle">Wuling</h3>
                  <h1 class="carousel-content-title"> Almaz rs </h1>

                </div>
                <div class="flex w-full items-center">
                  <img class="carousel-image  w-full max-w-xl" src="/img/xalmaz-hybrid-aurora-silver.png" alt="">
                </div>
              </div>
            </div>
          </slide>
        </template>


        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>


    </section>


  </div>

  <main>
    <section id="cars" class="mb-8">
      <div class="my-8">
        <h3 class="uppercase text-center">tentukan pilihanmu</h3>
      </div>

      <tab-headers :tabs="tabs" v-model="selectedModel">
          <CarSection :key="selectedModel" :model="modelProps" :model-type="selectedModel" @slide-change="onSlideChange" />
      </tab-headers>


    </section>
    <section id="order" class="section">
      <div class="section-content h-50 ">
      </div>
    </section>
    <section id="contact">
    </section>
  </main>
  <footer-section></footer-section>
</template>

<style scoped >
.section {
  /* width: 100vw; */
  background: url('../img/background.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.section-content {
  @apply box-border relative bg-gray-800/75;
}

.carousel__pagination {
  transform: translateY(-50px);
  padding-left: 0;
}


.carousel-content {
  @apply flex flex-col px-8 w-screen h-screen justify-center;
}

.carousel-content>div {
  @apply text-center my-4;
}

.carousel-content-title {
  @apply font-sans text-slate-200 py-2 text-xl antialiased font-bold uppercase tracking-widest;
}

.carousel-content-subtitle {
  @apply font-sans text-slate-200 py-2 text-md antialiased;
}

.carousel-content-text {
  @apply font-sans font-thin text-slate-200 py-2 text-sm antialiased;
}

@screen md {
  .carousel-content {
    @apply flex-row px-8;
  }

  .carousel-content>div {
    @apply text-left my-auto;
  }

  .carousel-content-title {
    @apply text-7xl;
  }

  .carousel-content-subtitle {
    @apply text-2xl;
  }

  .carousel-content-text {
    @apply text-md;
  }
}


</style>