<script setup lang="ts">

import {Input} from "@/components/ui/input";
import {computed} from "vue";
import CurrencyInput from "@/components/ui/input/CurrencyInput.vue";

const props = defineProps<{
  modelValue: any;
  label: string;
  type?: string;
  mask?: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>()

const model = computed(({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value)
  }
}))

</script>

<template>
  <div class="flex gap-2 items-center">
    {{label}}
    <slot name="action"></slot>
  </div>
  <CurrencyInput v-if="type == 'currency'" v-model="model"></CurrencyInput>
  <Input type="text" v-model="model" v-else :data-maska="mask"/>
  <slot name="description"></slot>
</template>

<style scoped></style>