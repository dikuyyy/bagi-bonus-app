<script setup lang="ts">
import AppPage from "@/components/AppPage.vue";
import {ref} from "vue";
import VInput from "@/components/VInput.vue";
import {EditIcon, PlusIcon} from "lucide-vue-next";
import VDialog from "@/components/VDialog.vue";
import {IForm} from '@/pages/bagiBonus/bagi-bonus';
import {useNotification} from "@kyvg/vue3-notification";
import {postBagiBonus} from "@/lib/api.ts";
import router from "@/router";

const form = ref<IForm[]>([
  {
    id: 1,
    value: '',
    label: 'Buruh A',
    name: 'buruh_a'
  },
  {
    id: 2,
    value: '',
    label: 'Buruh B',
    name: 'buruh_b'
  }]
);

const {notify} = useNotification()
const mode = ref<string>('CREATE');

const pembayaran = ref<number | null | string | any>(null);
const selectedItem = ref<any>();

const dialog = ref<boolean>(false);

const handleShowModalEdit = (item: IForm) => {
  selectedItem.value = JSON.parse(JSON.stringify(item));
  dialog.value = true;
  mode.value = 'EDIT'
}

const onSubmit = () => {
  if (mode.value === 'EDIT') {
    doEdit()
  } else {
    doSave();
  }
  dialog.value = false;
}

const doEdit = () => {
  let worker = form.value.find((item: IForm) => item.id === selectedItem.value.id);
  if (worker) {
    worker.label = selectedItem.value.label;
    worker.name = selectedItem.value.label.toLowerCase().replace(/ /g, '_');
  }
}

const doSave = () => {
  const newWorker: any = {
    id: form.value.length + 1,
    label: selectedItem.value.label,
    name: selectedItem.value.label.toLowerCase().replace(/ /g, '_'),
    value: selectedItem.value.value
  }

  form.value.push(newWorker);
}

const cleanedNumber = (value: any) => {
  const cleanedNumber = value.replace(/\./g, '');
  return parseInt(cleanedNumber, 10);
}

const percentageValue = (item: IForm | any) => {
  if (pembayaran.value !== null && typeof pembayaran.value === "string") {
    const result = cleanedNumber(pembayaran.value) * item.value / 100;
    return result.toLocaleString('id-ID')
  }
  return pembayaran.value;
}

const handleShowModalTambah = () => {
  selectedItem.value = {
    value: null,
    label: '',
    name: ''
  }

  mode.value = 'CREATE'
  dialog.value = true;
}

const onStore = () => {
  const countPercentage = form.value.reduce((acc, item) => {
    return acc + Number(item.value)
  }, 0)
  if (pembayaran.value == null) {
    notify({
      type: 'error',
      title: 'Terjadi Kesalahan',
      text: 'Silakan input terlebih dahulu pembayaran nya'
    })
  }
  if (countPercentage !== 100) {
    notify({
      type: 'error',
      title: 'Terjadi Kesalahan',
      text: 'Pembagian bonus masih salah'
    })
    return;
  }

  handlePostBagiBonus();
}

const handlePostBagiBonus = async () => {
  const item = form.value.map((item: any) => {
    return {
      nama: item.label,
      pembayaran: cleanedNumber(pembayaran.value) * item.value / 100,
      persentase: item.value
    }
  })
  const data: any = {
    pembayaran: cleanedNumber(pembayaran.value),
    item
  }

  return await postBagiBonus(data)
      .then(() => {
        notify({
          type: 'success',
          title: 'Berhasil',
          text: 'Data telah berhasil di tambahkan'
        })
      })
      .catch(() => {
        notify({
          type: 'error',
          title: 'Terjadi Kesalahan',
          text: 'Silakan hubungi admin'
        })
      })
      .finally(() => {
        clearAllField();
        router.push({
          name: 'bagi-bonus'
        })
      })
}

const clearAllField = () => {
  pembayaran.value = 0;
  for (let i = 0; i < form.value.length; i++) {
    form.value[i].value = 0;
  }
  return;
}

</script>

<template>
  <AppPage title="Bagi Bonus">
    <div class="mb-8">
      <VInput type="currency" name="pembayaran" v-model="pembayaran" label="Pembayaran"/>
    </div>
    <hr class="my-8">
    <div class="flex justify-end mt-4">
      <Button @click="handleShowModalTambah" type="submit"
              class="bg-green-500 text-white px-4 py-1 rounded-md flex gap-2">
        <PlusIcon/>
        <span>Tambah</span>
      </Button>
    </div>
    <div class="flex flex-col gap-5">
      <VInput mask="###" v-for="(item, index) in form" :key="index" :name="item.name" v-model="item.value"
              :label="item.label">
        <template v-slot:action>
          <EditIcon :size="16" class="cursor-pointer" @click="handleShowModalEdit(item)"/>
        </template>
        <template v-slot:description>
          Total setelah di persentase adalah: {{ percentageValue(item) }}
        </template>
      </VInput>
    </div>
    <div class="flex justify-end mt-4">
      <Button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded-md" @click="onStore">
        Submit
      </Button>
    </div>
    <VDialog v-model:modal="dialog" v-model:form="selectedItem" @submit="onSubmit" :mode="mode">
      <template v-slot:description>
        Silakan inputkan nama baru pada field di bawah ini
      </template>
      <template v-slot:content>
        <VInput :name="selectedItem.name" label="Masukkan Nama" v-model="selectedItem.label"></VInput>
      </template>
    </VDialog>
  </AppPage>
</template>