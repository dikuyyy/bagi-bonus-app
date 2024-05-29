<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {computed} from "vue";

const props = defineProps<{
  modal: boolean;
  mode: string;
}>()

const emits = defineEmits<{
  (e: 'update:modal', value: boolean): void;
  (e: 'submit'): void;
}>()

const modal = computed({
  get() {
    return props.modal
  },
  set(value) {
    emits('update:modal', value);
  }
})
</script>

<template>
  <div class="hidden">
    <Dialog v-model:open="modal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <slot name="title"></slot>
          </DialogTitle>
          <DialogDescription>
            <slot name="description">
              Silakan inputkan nama baru pada field di bawah ini
            </slot>
          </DialogDescription>
        </DialogHeader>
        <slot name="content"></slot>
        <DialogFooter>
          <div class="flex justify-end">
            <button @click="emits('submit')">Save Changes</button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>