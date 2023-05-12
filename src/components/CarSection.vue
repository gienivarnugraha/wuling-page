<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import useBreakpoint from '../composables/breakpoints'

useBreakpoint()

const imgs = [
    'xalmaz-hybrid-aurora-silver',
    'xalmaz-hybrid-carnellian-red',
    'xalmaz-hybrid-pristine-white',
    'xalmaz-hybrid-starry-black',
]

const props = defineProps({
    model: {
        type: Object
    },
    modelType: {
        type: String
    }
})

const emits = defineEmits(['slide-change'])

const currentIndex = ref(0)

const carouselShow = computed(() => useBreakpoint().is === 'smUp' ? 2.25 : 1)

const onSlideChange = (data) => {
    currentIndex.value = data.currentSlideIndex
    emits('slide-change', data.currentSlideIndex)
}
</script>

<template>
    <Carousel :items-to-show="carouselShow"  :transition="500" @slide-end="onSlideChange"
        @slide-start="onSlideChange"> 
        <Slide v-for="(type, carouselIdx) in model" :key="carouselIdx">
            <div class="carousel-wrapper">
                <div class="m-auto">

                    <img class="carousel-image w-full max-w-xl" :src="`/img/${type.img}.png`" :alt="type.name">

                    <div class="w-full rounded border-(slate-200 opacity-50)  bg-gray-100 opacity-0 transition-500 flex flex-col text-left "
                        :class="{ 'show': currentIndex === carouselIdx }">

                        <div class="mb-4">
                            <p class="inline-block px-2 py-1 text-xs bg-slate-400 mb-1 font-regular text-white uppercase">
                                {{ modelType }} </p>
                            <p class="text-sky-800 text-2xl font-semibold"> {{ type.name }} </p>
                        </div>

                        <div class="carousel-text ">

                            <div class="flex-1">
                                <p class="text-xs">Harga Mulai </p>
                                <p class="text-red font-semibold"> Rp. {{ type.price }} ,- </p>

                            </div>

                            <div class="flex-1">
                                <p class="text-xs">Spesifikasi:</p>
                                <ul>
                                    <li class="text-xs" v-for="(spec, specIndex) in type.specs" :key="specIndex">{{ spec }} </li>
                                </ul>
                                <p >
                                    
                                </p>

                            </div>

                            <div class="flex-1 align-center justify-center">
                                <p class="text-xs">Variant:</p>
                                <div class="text-center py-2 align-center">
                                    <button v-for="(variant, variantIndex) in type.variants" :key="variantIndex"
                                        class="inline-block rounded-full w-4 h-4 border-none mr-2 cursor-pointer hover:scale-125"
                                        :style="{ 'background-color': variant.color }" @click="type.img = variant.href">
                                    </button>

                                </div>

                                <div class="mt-4">
                                    <button>pesan sekarang</button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>


<style scoped>
.carousel-wrapper {
    @apply flex w-full h-full;
    /*  h-[calc(100vh-4rem)] */
}

.carousel-text{
    @apply flex flex-col gap-4 justify-center;
}

.carousel__slide {
    padding: 5px;
}

.carousel__viewport {
    perspective: 2000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.5;
    transform: rotateY(-20deg) scale(0.1);
}

.carousel__slide--active~.carousel__slide {
    transform: rotateY(20deg) scale(0.1);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.1);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.1);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(0.75);
}

@screen md {

    .carousel-text{
        @apply flex-row justify-between justify-items-stretch;
    }
    .carousel__slide {
        opacity: 0.5;
        transform: rotateY(-20deg) scale(0.35);
    }

    .carousel__slide--active~.carousel__slide {
        transform: rotateY(20deg) scale(0.35);
    }

    .carousel__slide--prev {
        opacity: 1;
        transform: rotateY(-10deg) scale(0.35);
    }

    .carousel__slide--next {
        opacity: 1;
        transform: rotateY(10deg) scale(0.35);
    }

    .carousel__slide--active {
        opacity: 1;
        transform: rotateY(0) scale(1);
    }
}

.carousel__pagination {
  padding-left: 0;
}
.show {
    opacity: 1 !important;
}
</style>