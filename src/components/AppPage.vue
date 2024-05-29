<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  title: string
}>()

const title = ref<string>(props.title);
</script>

<template>
  <div class="w-full">
    <div class="bg-white px-6 py-4 z-[-100] shadow-lg">
      <div class="text-xl">{{title}}</div>
    </div>
    <div class="px-6 pt-4">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>