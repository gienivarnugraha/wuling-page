<script setup>
import { computed, onMounted } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import useBreakpoint from '../composables/breakpoints'
import cloneDeep from 'lodash/cloneDeep'

useBreakpoint()

const imgs = [
    'xalmaz-hybrid-aurora-silver',
    'xalmaz-hybrid-carnellian-red',
    'xalmaz-hybrid-pristine-white',
    'xalmaz-hybrid-starry-black',
]

const props = defineProps({
    model: {
        type: Array
    },
    modelType: {
        type: String
    }
})

let clone = ref(cloneDeep(props.model))

const emits = defineEmits(['slide-change'])

const currentIndex = ref(0)

const carouselShow = computed(() => (useBreakpoint().is === 'smUp' && props.model.length > 1) ? 2.5 : 1)

const dividerClass = computed(() => useBreakpoint().is === 'smUp' ? 'v-divider' : 'h-divider')

const onSlideChange = (data) => {
    currentIndex.value = data.currentSlideIndex
    emits('slide-change', data.currentSlideIndex)
}
</script>

<template>
    <Carousel :items-to-show="carouselShow" :wrap-around="model.length > 3" :transition="500" @slide-end="onSlideChange">
        <Slide v-for="(type, carouselIdx) in clone" :key="carouselIdx">
            <img class="carousel-image w-full max-w-md" :src="`/img/${type.img}.png`" :alt="type.name">
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>

    <div class="mb-8"></div>

    <div :key="currentIndex" v-if="clone.length > 0">
        <div
            class="w-full min-h-[15rem] rounded border-(gray-500 opacity-75) rounded-xl p-8 bg-(gray-200 opacity-75) transition-500 flex flex-col text-left ">
            <div class="mb-4">
                <p class="inline-block px-2 py-1 text-xs bg-slate-400 mb-1 font-regular text-white uppercase">
                    {{ modelType }} </p>
                <p class="text-sky-800 text-2xl font-semibold"> {{ clone[currentIndex].name }} </p>
            </div>


            <div class="carousel-text h-full">

                <div class="flex-1">
                    <p class="text-xs">Harga Mulai </p>
                    <p class="text-red text-xl font-semibold"> Rp. {{ clone[currentIndex].price }} ,- </p>

                </div>

                <div class="bg-slate-300" :class="dividerClass"></div>

                <div class="flex-1">
                    <p class="text-xs">Spesifikasi:</p>
                    <ul>
                        <li class="text-xs" v-for="(spec, specIndex) in clone[currentIndex].specs" :key="specIndex">{{ spec
                        }}
                        </li>
                    </ul>
                </div>

                <div class="bg-slate-300" :class="dividerClass"></div>

                <div class="flex-1 align-center justify-center">
                    <div v-if="clone[currentIndex].variants">
                        <p class="text-xs">Variant:</p>
                        <div class="text-center py-2 align-center">
                            <div v-for="(variant, variantIndex) in clone[currentIndex].variants" :key="variantIndex"
                                class="inline-block mr-2">
                                <button class=" rounded-full w-4 h-4 border-none mr-2 cursor-pointer hover:scale-125 "
                                    :class="{ 'scale-150': variant.href === clone[currentIndex].img }"
                                    :style="{ 'background-color': variant.color }"
                                    @click="clone[currentIndex].img = variant.href">
                                </button>
                                <p class="text-xs"> {{ variant.name }} </p>


                            </div>
                        </div>
                    </div>

                    <div class="mt-4 flex justify-center">
                        <button
                            class="p-2 w-full rounded-lg bg-gradient-to-r from-teal-500 via-blue-500 to-sky-500 animate-gradient-x border-none">
                            <div class="flex align-center justify-center">
                                <span class="inline-block i-mdi i-mdi-home text-2xl text-indigo-800 mr-2 text-white"></span>
                                <span
                                    class="uppercase text-base md:text-md text-white font-sans font-semibold tracking-wide">
                                    pesan sekarang</span>

                            </div>
                        </button>

                    </div>
                </div>
            </div>

        </div>



    </div>
</template>


<style scoped>
.carousel-wrapper {
    @apply flex w-full h-full;
    /*  h-[calc(100vh-4rem)] */
}

.carousel-text {
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

    .carousel-text {
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