<script setup lang="ts">

import AppPage from "@/components/AppPage.vue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
</script>

<template>
  <AppPage title="Beranda">
    <Card>
      <CardHeader>
        <CardTitle>Halaman Utama</CardTitle>
      </CardHeader>
      <CardContent>
        Halo, selamat datang di aplikasi Bagi Bonus. Aplikasi ini dibuat untuk memudahkan user menghitung bonus berdasarkan dari persentase yang di inputkan.
        Terdapat 3 menu di halaman ini di antara nya
        <ul>
          <li>1. Menu Beranda</li>
          <li>2. Menu Hitung Bagi Bonus</li>
          <li>2. Menu Logs</li>
        </ul>
      </CardContent>
    </Card>
  </AppPage>
</template>

<style scoped></style>