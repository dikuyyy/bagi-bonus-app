<script setup lang="ts">
import AppPage from "@/components/AppPage.vue";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import router from "@/router";
import {delBagiBonus, getBagiBonus} from "@/lib/api.ts";
import {onMounted, ref} from "vue";
import {EditIcon, EyeIcon, DeleteIcon} from "lucide-vue-next";
import DetailDialog from "@/pages/bagiBonus/DetailDialog.vue";
import {useNotification} from "@kyvg/vue3-notification";

const modal = ref<boolean>(false);
const rows = ref<Array<any>>([]);
const tempData = ref<any>({});

const {notify} = useNotification()
const fetchBagiBonus = async () => {
  return getBagiBonus()
      .then((res: any) => {
        rows.value = res.data;
      })
}

const formatCurrency = (val: number | string) => {
  return val.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
}

const handleShowDetail = (item: any) => {
  tempData.value = item;
  modal.value = true;
}

const handleEdit = (item: any) => {
  router.push({
    name: 'edit-bagi-bonus',
    params: {
      id: item.id
    }
  })
}

const handleDelete = (id: string | number) => {
  delBagiBonus(id)
      .then(() => {
        notify({
          type: 'success',
          title: 'Berhasil',
          text: 'Data berhasil di hapus'
        })
        fetchBagiBonus();
      })
}

onMounted(() => {
  fetchBagiBonus();
})

</script>

<template>
  <AppPage title="Bagi Bonus">
    <Card>
      <CardHeader>
        <CardTitle class="flex justify-between">
          <div>List Bagi Bonus</div>
          <button class="text-lg px-4 py-1 bg-blue-500 text-white rounded-md"
                  @click="() => router.push({name: 'tambah-bagi-bonus'})">Tambah
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]">
                No
              </TableHead>
              <TableHead>Total Pembayaran</TableHead>
              <TableHead>Jumlah Pegawai</TableHead>
              <TableHead>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(item, index) in rows" :key="index">
              <TableCell class="font-medium">
                {{ index + 1 }}
              </TableCell>
              <TableCell>{{ formatCurrency(item.jumlah_pembayaran) }}</TableCell>
              <TableCell>{{ item.jumlah_pekerja }}</TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <div class="bg-green-500 text-white rounded-md p-1 cursor-pointer" @click="handleEdit(item)">
                    <EditIcon class=""/>
                  </div>
                  <div class="bg-blue-500 text-white rounded-md p-1 cursor-pointer" @click="handleShowDetail(item)">
                    <EyeIcon class=""/>
                  </div>
                  <div class="bg-red-500 text-white rounded-md p-1 cursor-pointer" @click="handleDelete(item.id)">
                    <DeleteIcon class=""/>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AppPage>
  <DetailDialog :data="tempData" v-model:modal="modal"/>
</template>

<style scoped></style>