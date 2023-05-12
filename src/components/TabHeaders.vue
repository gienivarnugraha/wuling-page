<template>
  <div v-if="useBreakpoint().is === 'smUp'" class="tab-pills">
    <ul class="flex flex-wrap -mb-px text-center list-none pl-0">
      <li class="mr-1 grow-1" v-for="(tab, index) in tabs" :key="index">
        <button
          class="tab-button"
          :class="{ 'active': activeTab === tab }" @click="changeTab(tab)">
          <span class="
          text-sm font-sans font-medium uppercase transition-500
          md:text-md
          ">
            {{ tab }}
          </span>
        </button>
      </li>
    </ul>
  </div>
  <div v-else class="tab-pills">
    <select name="" id="" class="select uppercase" @change="changeTab($event)">
      <option v-for="(tab, index) in tabs" :key="index" :value="tab"> {{ tab }} </option>
    </select>
  </div>
  <div class="tab-content" :key="activeTab">
    <slot :name="activeTab"></slot>
    <slot ></slot>
  </div>
</template>

<script setup>
import useBreakpoint from '../composables/breakpoints'

useBreakpoint()

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue', 'selected'])

const activeTab = ref('');

watch(
  () => props.modelValue,
  (newValue) => {
    activeTab.value = newValue;
  }
);

const changeTab = (tab) => {
  activeTab.value = tab instanceof Event ? tab.target.value : tab;
  emits('update:modelValue', activeTab.value);
  emits('selected', activeTab.value);
};


</script>

<style>
.tab-button.active {
  @apply border-(b-sky b-4) text-sky font-bold transition-500 -translate-y-1;
}

.tab-button.active > span {
  @apply text-sky font-bold ;
}

.tab-button{
  @apply inline-block w-full p-2 border-b-2 font-medium border-transparent rounded-t-lg hover:(text-gray-600 border-b-gray-100);
}

.tab-pills{
  @apply mb-4 border-b border-gray-200 bg-transparent px-4;
}

.tab-content {
  @apply p-4 w-full h-full;
}

.select {
  @apply inline-block w-full p-2 border-(b-sky-800 b-2 t-none l-none r-none) font-medium rounded-sm hover:(text-gray-600 border-b-gray-100);
}
</style>
