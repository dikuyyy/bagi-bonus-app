<script setup lang="ts">
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {computed} from "vue";

const props = defineProps<{
  modal: boolean;
  data: any;
}>()

const emits = defineEmits<{
  (e: 'update:modal', value: boolean): void;
}>()

const modal = computed({
  get() {
    return props.modal;
  },
  set(value) {
    emits('update:modal', value)
  }
})
</script>

<template>
  <Dialog v-model:open="modal">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Detail Bagi Bonus
        </DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-12">
          <div class="font-bold col-span-4">Total Pembayaran</div>
          <div class="col-span-8">{{data.jumlah_pembayaran}}</div>
        </div>
        <div class="grid grid-cols-12">
          <div class="font-bold col-span-4">Jumlah Pegawai</div>
          <div class="col-span-8">{{data.jumlah_pekerja}}</div>
        </div>
      </div>
      <hr/>
      <div class="font-bold">Informasi Pegawai</div>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2" v-for="(item, index) in data.bagi_bonus_item" :key="index">
          <div class="grid grid-cols-12">
            <div class="font-bold col-span-4">Nama Pegawai</div>
            <div class="col-span-8">{{item.nama}}</div>
          </div>
          <div class="grid grid-cols-12">
            <div class="font-bold col-span-4">Persentase</div>
            <div class="col-span-8">{{item.total_persentase}}</div>
          </div>
          <div class="grid grid-cols-12">
            <div class="font-bold col-span-4">Total Pembayaran</div>
            <div class="col-span-8">{{item.total_pembayaran}}</div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <div class="flex justify-end">
          <button @click="modal = false">Kembali</button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style></style>